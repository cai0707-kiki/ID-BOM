#!/usr/bin/env python3
"""
海康机器人：按具体型号去官网搜索，获取对应产品页链接，保存到 spec-mapping.js

工作流程：
  1. 从 index.html 提取所有相机具体型号
  2. 清洗型号：去掉 (国内标配)(国内中性) 等后缀和版本号
  3. 通过海康官网 API 搜索每个型号，获取产品页 URL
  4. 保存到 spec-mapping.js

用法：
  python3 search-spec-url.py                 # 全量扫描（默认ID 7000~10000）
  python3 search-spec-url.py --range 7000 15000  # 自定义扫描范围
  python3 search-spec-url.py --list          # 仅列出未匹配的型号
  python3 search-spec-url.py --workers 20    # 调整并发数
"""

import re
import json
import os
import sys
import time
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    import requests
except ImportError:
    print("请先安装依赖：pip install requests")
    sys.exit(1)

# ==================== 配置 ====================
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_HTML = os.path.join(SCRIPT_DIR, "index.html")
OUTPUT_JS  = os.path.join(SCRIPT_DIR, "scripts", "spec-mapping.js")

# 海康官网 API（可用，不会被 WAF 拦截）
API_URL = "https://www.hikrobotics.com/cn/Api/Foreground/Vision/VisionProductIntroduction"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}


# ==================== 型号清洗 ====================

def clean_model(raw):
    """
    清洗型号：去掉 (国内标配)(国内中性)(全球通中性) 等括号后缀，去掉版本号
    示例：
      MV-ID803M-03S-WBN-SR-U(国内标配) → MV-ID803M-03S-WBN-SR-U
      MV-ID2013EMI-05-RBN(国内标配)V2.0 → MV-ID2013EMI-05-RBN
      MV-ID3040RM-00C-NNN)              → MV-ID3040RM-00C-NNN
    """
    cleaned = re.sub(r'\([^)]*\)', '', raw).strip()
    cleaned = re.sub(r'\s*V?\d+(\.\d+)?$', '', cleaned).strip()
    # 去掉末尾残留的右括号
    cleaned = cleaned.rstrip(')')
    return cleaned


# ==================== index.html 解析 ====================

def extract_models_from_html(_html_path):
    """从 scripts/camera_data.js 中提取所有相机具体型号，清洗去重"""
    camera_js = os.path.join(SCRIPT_DIR, "scripts", "camera_data.js")
    with open(camera_js, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r'var\s+IDBOM_CAMERA_DATA\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        print("❌ 无法从 camera_data.js 中提取数据")
        return []

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError as e:
        print(f"❌ JSON 解析失败: {e}")
        return []

    models = {}  # cleaned → original（保留一个原始名用于日志）
    for item in data:
        row = item.get("value", item)
        if isinstance(row, list) and len(row) > 3:
            if row[0] and row[0].strip() == "相机" and row[3]:
                raw = row[3].strip()
                cleaned = clean_model(raw)
                if cleaned and cleaned.startswith("MV-") and cleaned not in models:
                    models[cleaned] = raw

    return models  # {cleaned_model: original_model}


# ==================== 海康 API 查询 ====================

def query_product(pid):
    """
    查询单个产品 ID，返回 (pid, productModel, productName) 或 None
    使用 VisionProductIntroduction API（GET，不会被 WAF 拦截）
    """
    try:
        resp = requests.get(API_URL, params={"id": pid}, headers=HEADERS, timeout=8)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "success" and data.get("data"):
                d = data["data"]
                model = d.get("productModel", "")
                name = d.get("productName", "")
                if model and model.startswith("MV-"):
                    return (pid, model, name)
    except Exception:
        pass
    return None


def scan_products(start, end, workers=15):
    """
    并发扫描产品 ID 范围，返回 {productModel: (pid, productName)}
    """
    ids = list(range(start, end + 1))
    products = {}
    done = 0

    print(f"🔍 扫描海康官网产品库 ID {start}~{end}（{len(ids)} 个，{workers} 并发）...")
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(query_product, pid): pid for pid in ids}
        for future in as_completed(futures):
            done += 1
            if done % 300 == 0:
                print(f"   进度 {done}/{len(ids)}，已找到 {len(products)} 个产品...")
            result = future.result()
            if result:
                pid, model, name = result
                products[model] = (pid, name)

    print(f"   扫描完成，共找到 {len(products)} 个产品")
    return products


# ==================== 匹配逻辑 ====================

def match_models(html_models, scanned_products):
    """
    将 index.html 中的清洗型号与扫描到的产品匹配
    html_models: {cleaned_model: original_model}
    scanned_products: {productModel: (pid, productName)}

    返回: matched {cleaned_model: (pid, productModel, productName)}, unmatched [cleaned_model]
    """
    matched = {}
    unmatched = []

    # 先建立扫描产品的反向索引（用于模糊匹配）
    scanned_list = list(scanned_products.items())

    for cleaned, original in html_models.items():
        # 1. 精确匹配：扫描到的产品型号 == 清洗后的型号
        if cleaned in scanned_products:
            pid, pname = scanned_products[cleaned]
            matched[cleaned] = (pid, cleaned, pname)
            continue

        # 2. 包含匹配：扫描到的型号包含清洗型号，或反过来
        found = False
        for scanned_model, (pid, pname) in scanned_list:
            if cleaned in scanned_model or scanned_model in cleaned:
                matched[cleaned] = (pid, scanned_model, pname)
                found = True
                break

        if not found:
            unmatched.append(cleaned)

    return matched, unmatched


# ==================== spec-mapping.js 读写 ====================

def load_existing_urls():
    """从 spec-mapping.js 中读取已有的 DOWNLOAD_URLS"""
    if not os.path.exists(OUTPUT_JS):
        return {}
    with open(OUTPUT_JS, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r'var\s+DOWNLOAD_URLS\s*=\s*\{([^}]*)\}', content, re.DOTALL)
    if not match:
        return {}
    urls = {}
    for line in match.group(1).split("\n"):
        m = re.match(r'\s*"([^"]+)"\s*:\s*"([^"]+)"', line)
        if m:
            urls[m.group(1)] = m.group(2)
    return urls


def save_to_spec_js(new_urls):
    """将新匹配的 URL 合并写入 spec-mapping.js 的 DOWNLOAD_URLS 中"""
    if not os.path.exists(OUTPUT_JS):
        print(f"❌ {OUTPUT_JS} 不存在，请先创建基础文件")
        return

    with open(OUTPUT_JS, "r", encoding="utf-8") as f:
        content = f.read()

    # 读取已有的
    existing = load_existing_urls()
    # 合并（新的覆盖旧的）
    merged = dict(existing)
    merged.update(new_urls)

    # 构建新的 DOWNLOAD_URLS 块
    lines = ["  var DOWNLOAD_URLS = {"]
    sorted_keys = sorted(merged.keys())
    for i, key in enumerate(sorted_keys):
        comma = "," if i < len(sorted_keys) - 1 else ""
        # 转义 URL 中的特殊字符
        lines.append(f'    "{key}": "{merged[key]}"{comma}')
    lines.append("  };")
    new_block = "\n".join(lines)

    # 替换
    content = re.sub(
        r'var\s+DOWNLOAD_URLS\s*=\s*\{[^}]*\};',
        new_block,
        content,
        flags=re.DOTALL
    )

    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(content)

    return len(merged)


# ==================== 主流程 ====================

def main():
    parser = argparse.ArgumentParser(description="海康机器人产品型号→官网链接 映射工具")
    parser.add_argument("--list", action="store_true", help="仅列出未匹配的型号")
    parser.add_argument("--range", nargs=2, type=int, metavar=("START", "END"),
                        help="产品ID扫描范围，默认 7000 10000")
    parser.add_argument("--workers", type=int, default=15, help="并发数，默认 15")
    args = parser.parse_args()

    scan_start, scan_end = args.range if args.range else (7000, 10000)

    print("=" * 55)
    print("  海康机器人：按型号搜索官网，获取产品页链接")
    print("=" * 55)

    # ──────────── 1. 从 index.html 提取型号 ────────────
    print(f"\n📖 从 index.html 提取相机型号...")
    html_models = extract_models_from_html(INDEX_HTML)  # {cleaned: original}
    print(f"   共 {len(html_models)} 个唯一型号（已清洗去重）")

    # 显示前5个示例
    for i, (cleaned, original) in enumerate(list(html_models.items())[:5]):
        suffix = f"  ←  {original}" if cleaned != original else ""
        print(f"   {cleaned}{suffix}")
    if len(html_models) > 5:
        print(f"   ...")

    # ──────────── 2. 加载已有映射 ────────────
    existing = load_existing_urls()
    print(f"\n📦 已有映射 {len(existing)} 条")

    # 找出未覆盖的
    uncovered = {k: v for k, v in html_models.items() if k not in existing}
    print(f"   未覆盖 {len(uncovered)} 个")

    if args.list:
        print(f"\n未覆盖的型号：")
        for cleaned, original in uncovered.items():
            tag = f"  ←  {original}" if cleaned != original else ""
            print(f"  {cleaned}{tag}")
        return

    if not uncovered:
        print("\n✅ 所有型号已覆盖，无需更新")
        return

    # ──────────── 3. 扫描海康官网 ────────────
    print(f"\n📡 开始扫描海康官网（约 {(scan_end - scan_start) * 0.08 / args.workers:.0f} 秒）...")
    scanned = scan_products(scan_start, scan_end, workers=args.workers)

    # ──────────── 4. 匹配 ────────────
    print(f"\n🔗 匹配型号...")
    matched, unmatched = match_models(uncovered, scanned)

    print(f"\n📊 匹配结果：")
    print(f"   匹配成功: {len(matched)}")
    print(f"   未匹配:   {len(unmatched)}")

    if not matched:
        print("\n⚠️ 无匹配结果，未写入文件")
        if unmatched:
            print(f"\n未匹配的型号（{len(unmatched)} 个）：")
            for bm in unmatched[:20]:
                print(f"  - {bm}")
            if len(unmatched) > 20:
                print(f"  ... 共 {len(unmatched)} 个")
        return

    # ──────────── 5. 构建 URL 映射并写入 ────────────
    new_urls = {}
    print(f"\n匹配详情：")
    for cleaned, (pid, scanned_model, pname) in sorted(matched.items()):
        url = f"https://www.hikrobotics.com/cn/machinevision/productdetail/?id={pid}"
        new_urls[cleaned] = url
        original = html_models[cleaned]
        tag = f" ({original})" if cleaned != original else ""
        print(f"  ✅ {cleaned}{tag}")
        print(f"     → {scanned_model} ({pname})")
        print(f"     {url}")

    total = save_to_spec_js(new_urls)
    print(f"\n✅ 已写入 {len(new_urls)} 条新映射到 {OUTPUT_JS}")
    print(f"   文件中映射总计 {total} 条")

    # ──────────── 6. 未匹配列表 ────────────
    if unmatched:
        print(f"\n❌ 未匹配的型号（{len(unmatched)} 个）：")
        for bm in unmatched:
            print(f"  - {bm}")
        print(f"\n提示：可尝试 --range 扩大扫描范围")
        print(f"  例: python3 search-spec-url.py --range 7000 15000")


if __name__ == "__main__":
    main()
