# ID-BOM — 海康机器人产品配单工具

> 面向海康机器人（Hikrobotics）工业视觉产品的 BOM（物料清单）在线配单系统，纯前端部署，打开即用。

## 功能特性

- **相机选型配单** — 选择相机型号后自动匹配电源、安装板、线缆、镜头罩、FA 镜头、扩展配件等完整 BOM
- **配件数据管理** — 内置配件数据库，支持按类别、系列筛选
- **BOM 导出** — 一键导出配单结果为 CSV
- **公告管理** — 支持编辑和展示产品公告信息
- **规格书速查** — 输入型号即可跳转海康机器人官网产品详情页
- **数据编辑器** — 独立的相机/配件数据管理界面，支持增删改查、搜索、CSV 导入导出
- **快速搜索** — 全局搜索型号名称或物料代码，一键加入配单
- **系列总览** — 按产品系列浏览全部相机和关联配件
- **线缆筛选** — 按长度和材质快速筛选线缆配件
- **图片预览与缓存** — 缩略图秒开 + 原图按需加载，Service Worker 持久化缓存
- **多端适配** — PC / PAD / 移动端响应式布局

## 项目结构

```
ID-BOM/
├── index.html              # 主页面 — BOM 配单工具
├── editor.html             # 数据编辑器 — 管理相机/配件数据
├── scripts/                # JS 数据与逻辑文件
│   ├── camera_data.js      # 相机产品数据（IMG 列带 CAM/ 前缀）
│   ├── accessory_data.js   # 配件产品数据（IMG 列带 ACC/ 前缀）
│   ├── mapping_data.js     # 经销基线对照表
│   └── spec-mapping.js     # 产品型号 → 官网详情页 URL 映射
├── IMG/                    # 产品图片
│   ├── CAM/                # 相机原图（55 张）
│   │   └── THUMB/          # 相机缩略图 80x80
│   ├── ACC/                # 配件原图（110 张）
│   │   └── THUMB/          # 配件缩略图 80x80
│   └── PIC/                # 其他图片（QR 码等）
│       └── THUMB/          # 其他缩略图 120x120
├── import_csv.js           # 构建脚本 — CSV → JS 数据文件 + 缩略图
├── resize.js               # 图片工具 — 缩略图生成 / 图片尺寸调整
├── search-spec-url.py      # 工具脚本 — 从海康官网抓取产品链接
├── camera_data.csv         # 相机产品数据源（GBK 编码，26 列）
├── accessory_data.csv      # 配件产品数据源（GBK 编码，10 列）
├── mapping.csv             # 基线型号 ↔ 经销型号映射
├── package.json            # 项目依赖声明
└── README.md               # 本文件
```

## 快速开始

### 方式一：直接使用（推荐）

确保 `scripts/` 文件夹下的 JS 数据文件存在，直接用浏览器打开 `index.html` 即可使用，无需服务器或构建步骤。

### 方式二：更新数据

如果修改了 CSV 数据文件，需要重新生成 JS 数据文件和缩略图：

```bash
# 1. 安装依赖
npm install

# 2. 执行构建（CSV → JS 数据文件 + 缩略图）
npm run build
```

构建脚本 `import_csv.js` 会：
1. 读取 `camera_data.csv`、`accessory_data.csv`（GBK 编码）
2. 转换为 JSON，相机 IMG 列自动添加 `CAM/` 前缀，配件添加 `ACC/` 前缀
3. 生成 `scripts/camera_data.js`、`scripts/accessory_data.js`
4. 读取 `mapping.csv` 生成 `scripts/mapping_data.js`
5. 自动生成各目录下的缩略图（CAM/ACC: 80x80，PIC: 120x120）

### 数据流

```
camera_data.csv ─┐
                 ├── import_csv.js ──→ scripts/*.js ←── index.html 加载
accessory_data.csv ─┤                   ↓
mapping.csv ────────┘              IMG/*/THUMB/ (自动生成)
```

## 数据编辑器

浏览器打开 `editor.html` 即可使用数据编辑器，支持：

- 相机数据 / 配件数据双 Tab 切换
- 搜索过滤（型号、物料代码、描述）
- 单元格编辑、下拉选择、批量删除
- CSV 导入 / 导出
- 图片缩略图预览（与主页一致）
- 公告编辑
- 修改结果保存到 localStorage

> 编辑器的修改存储在浏览器 localStorage 中，清除浏览器数据会丢失。请定期使用「导出 CSV」功能备份。

## 图片管理

图片按产品类型分目录存放，每个目录下有独立的 THUMB 缩略图子目录：

| 目录 | 用途 | 缩略图尺寸 | 数据来源 |
|------|------|-----------|----------|
| `IMG/CAM/` | 相机原图 | 80x80 | `camera_data.csv` IMG 列 |
| `IMG/ACC/` | 配件原图 | 80x80 | `accessory_data.csv` IMG 列 |
| `IMG/PIC/` | QR 码等 | 120x120 | 手动维护 |

### 图片加载机制

1. **表格显示** — 加载缩略图（THUMB/），首屏秒开
2. **滚动到可视区域** — IntersectionObserver 后台预加载原图到浏览器缓存
3. **点击放大** — 直接显示已缓存的原图
4. **缩略图失败** — 自动降级加载原图

### 缩略图生成

```bash
# 自动生成缩略图（import_csv.js 会自动调用）
node resize.js --thumb

# 指定目录
node resize.js --thumb --dir ./IMG
```

### 图片尺寸调整

```bash
# 调整整个目录的图片尺寸
node resize.js -i ./OLD -o ./IMG -W 360 -H 360

# 覆盖原文件
node resize.js -i ./IMG -W 360 -H 360 -f
```

## 规格书映射

`scripts/spec-mapping.js` 提供产品型号到海康机器人官网详情页的 URL 映射：

```javascript
// 获取型号对应的规格书/产品页链接
var url = getSpecUrl('MV-ID2013EM-05-RBN');
// → "https://www.hikrobotics.com/cn/machinevision/productdetail/?id=8379"
```

新增产品型号时，运行 `python search-spec-url.py` 自动从海康官网抓取并更新映射。

## 技术栈

- **前端：** 原生 HTML/CSS/JavaScript（无框架依赖）
- **构建：** Node.js + iconv-lite + sharp
- **数据格式：** CSV（源数据）→ JS 全局变量（独立文件）
- **图片优化：** 缩略图按需生成，IntersectionObserver 懒加载
- **兼容性：** 现代浏览器（Chrome、Edge、Firefox、Safari）

## 版本更新记录

### V1.4 (2026-08-28)
**数据层重构 + 图片加载优化**

- 数据文件独立化：内嵌数据从 `index.html` 分离为独立 JS 文件（`scripts/camera_data.js`、`accessory_data.js`、`mapping_data.js`）
- 图片目录重组：`IMG/` 下按 `CAM/`、`ACC/`、`PIC/` 分类存放
- 缩略图系统：各目录下 `THUMB/` 子目录存放缩略图（CAM/ACC: 80x80，PIC: 120x120）
- 懒加载：移除全量预加载，改用 IntersectionObserver 按需加载原图，首次加载从 12MB 降至 ~176KB
- `import_csv.js` 重写为生成 JS 数据文件 + 缩略图
- `search-spec-url.py` 输出路径调整至 `scripts/`

### V1.3 (2026-08-21)
**系列总览 & 多端适配增强**

- 新增「系列表」页面：按产品系列分组浏览全部相机及关联配件
- 新增返回顶部按钮
- 优化扩展配件类型显示

### V1.2.1 (2026-08-19)
**公告系统增强 & 图片缓存**

- 新增公告浮动按钮
- 新增图片懒加载与本地缓存策略

### V1.2 (2026-08-17)
**设备及配件图片预览 & 扩展配件逻辑修复**

- 新增图片预览功能：配单明细中的物料图片支持点击放大查看
- 修复扩展配件标配/选配物料显示逻辑

### V1.1.2 (2026-08-11)
**基线经销对照表 & 产品官网链接 & PAD/移动端适配**

- 新增「对照表」页面
- 新增产品关联官网链接
- PAD 端及移动端响应式适配

### V1.1.1 (2026-08-07)
**移动端响应式布局适配**

- 移动端配单配置面板 sticky 固定
- 导航栏移动端横排展示
- 新增 README.md、package.json

---

## License

未指定。
