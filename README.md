# ID-BOM — 海康机器人产品配单工具

> 面向海康机器人（Hikrobotics）工业视觉产品的 BOM（物料清单）在线配单系统，纯前端部署，打开即用。

## ✨ 功能特性

- 📷 **相机选型配单** — 选择相机型号后自动匹配电源、安装板、线缆、镜头罩、FA 镜头、扩展配件等完整 BOM
- 🔧 **配件数据管理** — 内置配件数据库，支持按类别、系列筛选
- 📋 **BOM 导出** — 一键导出配单结果为 CSV
- 📢 **公告管理** — 支持编辑和展示产品公告信息
- 🔗 **规格书速查** — 输入型号即可跳转海康机器人官网产品详情页
- 📊 **数据编辑器** — 独立的相机/配件数据管理界面，支持增删改查、搜索、CSV 导入导出

## 📁 项目结构

```
ID-BOM/
├── index.html              # 主页面 — BOM 配单工具（数据内嵌，可直接打开）
├── editor.html             # 数据编辑器 — 管理相机/配件数据
├── spec-mapping.js         # 规格书映射 — 产品型号 → 官网详情页 URL
├── import_csv.js           # 构建脚本 — 将 CSV 数据注入 index.html
├── camera_data.csv         # 相机产品数据源（25 列，含配件配置）
├── accessory_data.csv      # 配件产品数据源（9 列）
├── mapping.csv             # 产品系列映射（基线型号 ↔ 经销型号）
├── package.json            # 项目依赖声明
└── README.md               # 本文件
```

## 🚀 快速开始

### 方式一：直接使用（推荐）

`index.html` 是一个自包含的单文件应用，数据已内嵌，**直接用浏览器打开即可使用**，无需任何服务器或构建步骤。

### 方式二：从源码构建

如果你修改了 CSV 数据文件，需要重新构建 `index.html`。

```bash
# 1. 安装依赖
npm install

# 2. 执行构建（将 CSV 数据注入 index.html）
npm run build
```

构建脚本会：
1. 读取 `camera_data.csv`、`accessory_data.csv`（GBK 编码）
2. 转换为 JSON 并注入 `index.html` 的 `<script id="embeddedData">` 标签
3. 读取 `mapping.csv` 并注入 `index.html` 的 `<script id="cmpDataJson">` 标签
4. 自动备份原 `index.html` 为 `index_backup_<timestamp>.html`

## 📝 数据编辑器

浏览器打开 `editor.html` 即可使用数据编辑器，支持：

- 相机数据 / 配件数据双 Tab 切换
- 搜索过滤（型号、物料代码、描述）
- 单元格编辑、下拉选择、批量删除
- CSV 导入 / 导出
- 公告编辑
- 修改结果保存到 localStorage

> ⚠️ 编辑器的修改存储在浏览器 localStorage 中，清除浏览器数据会丢失。请定期使用「导出 CSV」功能备份。

## 🔗 规格书映射

`spec-mapping.js` 提供产品型号到海康机器人官网详情页的 URL 映射：

```javascript
// 获取型号对应的规格书/产品页链接
var url = getSpecUrl('MV-ID2013EM-05-RBN');
// → "https://www.hikrobotics.com/cn/machinevision/productdetail/?id=8379"
```

新增产品型号时，在 `spec-mapping.js` 的 `DOWNLOAD_URLS` 对象中添加一行即可。

## 🛠️ 技术栈

- **前端：** 原生 HTML/CSS/JavaScript（无框架依赖）
- **构建：** Node.js + iconv-lite（GBK 编码处理）
- **数据格式：** CSV（源数据）→ JSON（嵌入 HTML）
- **兼容性：** 现代浏览器（Chrome、Edge、Firefox、Safari）

## 📋 版本更新记录

### V1.2.1 (2026-08-19)
**公告系统增强 & 图片缓存**

- `index.html` — 配单工具
  - 新增公告浮动按钮：用户关闭每日自动弹窗后，仍可随时点击查阅公告内
  - 新增图片懒加载策略：图片进入可视区域才加载，提升初始页面加载速度；
  - 新增图片缓存策略：将图片缓存到本地，加快后续打开页面的速度

- 新增文件
  - `sw.js` — 通过 Service Worker 拦截图片请求，实现 Cache First（缓存优先） 策略

### V1.2 (2026-08-17)

**设备及配件图片预览 & 扩展配件逻辑修复**

- `index.html` — 配单工具
  - 新增图片预览功能：配单明细中的物料图片支持点击放大查看
  - 修复扩展配件标配/选配物料显示逻辑，确保分类正确

### V1.1.2 (2026-08-11)

**基线经销对照表 & 产品官网链接 & PAD/移动端适配**

- `index.html` — 配单工具
  - 新增「对照表」页面：支持基线型号与经销型号的双向查询，按产品系列筛选
  - 新增产品关联官网链接：输入型号可跳转海康机器人官网产品详情页（`spec-mapping.js`）
  - PAD 端及移动端响应式适配：配单配置面板 sticky 固定、明细表格横向滑动、弹窗全屏适配
  - 新增 `mapping.csv` 数据源，构建脚本同步支持注入 `cmpDataJson`

- 新增文件
  - `spec-mapping.js` — 产品型号 → 官网详情页 URL 映射
  - `mapping.csv` — 基线型号 ↔ 经销型号对照数据

### V1.1.1 (2026-08-07)

**移动端响应式布局适配**

- `index.html` — 配单工具
  - 移动端配单配置面板 sticky 固定顶部，配单明细表格横向滑动，互不干扰
  - 导航栏（配单表/对照表）移动端横排展示
  - 对照表列表支持横向滑动，型号和物料代码完整显示不截断
  - 选装配件弹窗改为 flex 布局，确认按钮固定底部不消失
  - 选装配件弹窗支持横向滑动，备注列自动换行
  - 双击物料行 = 选中 + 确认，一步完成选择

- `editor.html` — 数据编辑器
  - 移动端 Tab 栏变为左侧竖栏，内容区右侧展示
  - 桌面端保持原有上下布局不变

**新增文件**

- `README.md` — 项目说明文档
- `package.json` — 依赖声明

---

## 📄 License

未指定。
