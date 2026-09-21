# ID-BOM — 海康机器人产品配单工具

> 面向海康机器人（Hikrobotics）工业视觉产品的 BOM（物料清单）在线配单系统，纯前端部署，打开即用。

## 功能特性

- **ID/SC双线配单** — 支持ID系列和SC系列相机的产品配单，分别独立配置
- **相机选型配单** — 选择相机型号后自动匹配电源、安装板、线缆、镜头罩、FA镜头、扩展配件等完整BOM
- **配件数据管理** — 内置配件数据库，支持按类别、系列筛选
- **BOM导出** — 一键导出配单结果为CSV
- **公告管理** — 支持编辑和展示产品公告信息
- **规格书速查** — 输入型号即可跳转海康机器人官网产品详情页
- **数据编辑器** — 独立的相机/配件数据管理界面，支持增删改查、搜索、CSV导入导出
- **快速搜索** — 全局搜索型号名称或物料代码，一键加入配单
- **ID/SC系列表** — 按产品系列浏览全部相机和关联配件
- **ID/SC经销基线对照表** — 基线型号与经销型号映射查询
- **PDA智能终端选型** — 多维度筛选参数对比
- **线缆筛选** — 按长度和材质快速筛选线缆配件
- **图片预览与缓存** — 缩略图秒开 + 原图按需加载，Service Worker持久化缓存
- **多端适配** — PC / PAD / 移动端响应式布局

## 项目结构

```
ID-BOM/
├── index.html              # 主页面 — ID/SC BOM配单工具
├── editor.html             # 数据编辑器 — 管理相机/配件数据
├── scripts/                # JS数据与逻辑文件
│   ├── id_camera_data.js       # ID相机产品数据
│   ├── id_accessory_data.js    # ID配件产品数据
│   ├── sc_camera_data.js       # SC相机产品数据
│   ├── sc_accessory_data.js    # SC配件产品数据
│   ├── mapping_data.js         # 经销基线对照表
│   ├── pda_data.js             # PDA智能移动终端选型数据
│   ├── product_updates.js      # 产品动态数据
│   └── spec-mapping.js         # 产品型号 → 官网详情页 URL 映射
├── IMG/                    # 产品图片
│   ├── ID_CAM/             # ID相机原图
│   │   └── THUMB/          # ID相机缩略图 80x80
│   ├── ID_ACC/             # ID配件原图
│   │   └── THUMB/          # ID配件缩略图 80x80
│   ├── SC_CAM/             # SC相机原图
│   │   └── THUMB/          # SC相机缩略图 80x80
│   ├── SC_ACC/             # SC配件原图
│   │   └── THUMB/          # SC配件缩略图 80x80
│   └── PIC/                # 其他图片（QR码等）
│       └── THUMB/          # 其他缩略图 120x120
├── pdf/                    # 产品动态关联PDF文档
├── import_csv.js           # 构建脚本 — CSV → JS数据文件
├── resize.js               # 图片工具 — 缩略图生成 / 图片尺寸调整 / 自动分发
├── search-spec-url.py      # 工具脚本 — 从海康官网抓取产品链接
├── id_camera_data.csv      # ID相机产品数据源（GBK编码，26列）
├── id_accessory_data.csv   # ID配件产品数据源（GBK编码，10列）
├── mapping.csv             # 基线型号 ↔ 经销型号映射
├── product_updates.csv     # 产品动态数据源（GBK编码）
├── package.json            # 项目依赖声明
└── README.md               # 本文件
```

## 快速开始

### 方式一：直接使用（推荐）

确保 `scripts/` 文件夹下的JS数据文件存在，直接用浏览器打开 `index.html` 即可使用，无需服务器或构建步骤。

### 方式二：更新数据

如果修改了CSV数据文件，需要重新生成JS数据文件：

```bash
# 1. 安装依赖
npm install

# 2. 执行构建（CSV → JS数据文件）
npm run build
```

构建脚本 `import_csv.js` 会：
1. 读取 `id_camera_data.csv`、`id_accessory_data.csv`（GBK编码）
2. 转换为JSON，生成JS数据文件
3. 读取 `mapping.csv` 生成 `scripts/mapping_data.js`
4. 读取 `product_updates.csv` 生成 `scripts/product_updates.js`

### 数据流

```
id_camera_data.csv ──┐
                     ├── import_csv.js ──→ scripts/*.js ←── index.html 加载
id_accessory_data.csv┤
mapping.csv ─────────┤
product_updates.csv ─┘
```

## 数据编辑器

浏览器打开 `editor.html` 即可使用数据编辑器，支持：

- 相机数据 / 配件数据双Tab切换
- 搜索过滤（型号、物料代码、描述）
- 单元格编辑、下拉选择、批量删除
- CSV导入 / 导出
- 图片缩略图预览（与主页一致）
- 公告编辑
- 修改结果保存到localStorage

> 编辑器的修改存储在浏览器localStorage中，清除浏览器数据会丢失。请定期使用「导出CSV」功能备份。

## 图片管理

图片按产品类型分目录存放，每个目录下有独立的THUMB缩略图子目录：

| 目录 | 用途 | 缩略图尺寸 | 数据来源 |
|------|------|-----------|----------|
| `IMG/ID_CAM/` | ID相机原图 | 80x80 | `id_camera_data.csv` |
| `IMG/ID_ACC/` | ID配件原图 | 80x80 | `id_accessory_data.csv` |
| `IMG/SC_CAM/` | SC相机原图 | 80x80 | `sc_camera_data.csv` |
| `IMG/SC_ACC/` | SC配件原图 | 80x80 | `sc_accessory_data.csv` |
| `IMG/PIC/` | QR码等 | 120x120 | 手动维护 |

### 图片加载机制

1. **表格显示** — 加载缩略图（THUMB/），首屏秒开
2. **滚动到可视区域** — IntersectionObserver后台预加载原图到浏览器缓存
3. **点击放大** — 直接显示已缓存的原图
4. **缩略图失败** — 自动降级加载原图

### 缩略图生成

```bash
# 生成所有子目录缩略图
node resize.js --thumb

# 指定目录
node resize.js --thumb --dir ./IMG
```

### 图片尺寸调整（自动分发）

```bash
# 调整图片尺寸并自动分发到对应子目录
node resize.js -i ./OLD -o ./IMG -W 360 -H 360

# 覆盖已存在文件
node resize.js -i ./OLD -o ./IMG -W 360 -H 360 -f
```

图片会根据文件名自动匹配数据，分发到对应的 `ID_CAM/ID_ACC/SC_CAM/SC_ACC/PIC/` 目录。

## 规格书映射

`scripts/spec-mapping.js` 提供产品型号到海康机器人官网详情页的URL映射：

```javascript
// 获取型号对应的规格书/产品页链接
var url = getSpecUrl('MV-ID2013EM-05-RBN');
// → "https://www.hikrobotics.com/cn/machinevision/productdetail/?id=8379"
```

新增产品型号时，运行 `python search-spec-url.py` 自动从海康官网抓取并更新映射。

## 技术栈

- **前端：** 原生HTML/CSS/JavaScript（无框架依赖）
- **构建：** Node.js + iconv-lite + sharp
- **数据格式：** CSV（源数据）→ JS全局变量（独立文件）
- **图片优化：** 缩略图按需生成，IntersectionObserver懒加载
- **兼容性：** 现代浏览器（Chrome、Edge、Firefox、Safari）

## 版本更新记录

### V2.0 (2026-09-21)
**SC配单表 & ID/SC命名统一 & 项目清理**

- 新增SC配单表：支持SC系列相机的完整BOM配置
- 新增SC系列表：按SC产品系列浏览相机及关联配件
- 新增首页导航：7张功能卡片（ID配单表、SC配单表、ID系列表、SC系列表、对照表、PDA选型、产品动态）
- ID/SC命名规范统一：ID变量/元素/函数添加`id`前缀，与SC的`sc`前缀对齐
- 移除离线版下载功能（`Download/offline.html`及`downloadOffline`函数）

### V1.6.2 (2026-09-17)
**产品动态功能增强**

- 产品动态新增「精选」标识，精选项置顶显示（优先级高于日期）
- 产品动态新增文件关联功能，支持PDF、JPG、PNG等多种格式

### V1.6.1 (2026-09-16)
**EPE3T物料扩展配件更新**

- 物料194406782(EPE3T)扩展配件标签添加至ID2000XM/ID3040RM/ID3060RM系列相机
- 标识值设为1

### V1.6 (2026-09-14)
**新增产品动态页面**

- 新增「产品动态」页面，支持查看智能ID产品线市场动态
- 支持按产品类型、动态类型筛选
- 数据自动过滤，仅显示3个月内的动态
- 首页新增产品动态功能入口卡片

### V1.5 (2026-09-08)
**新增首页导航 & PDA选型功能**

- 新增「首页」模块导航页面，默认打开，展示四大功能入口卡片
- 新增「PDA」页面：智能移动终端选型工具
- 支持8维筛选：系列、IP防护等级、NFC、蓝牙、操作系统、屏幕尺寸、处理器、OCR、电池

### V1.4.3 (2026-09-07)
**镜头罩图片分类 & 图片目录整理**

- ID5000XM镜头罩图片按类型区分：半偏(H)、全偏(P)、全透(T)分别使用独立图片
- 清理IMG根目录散落图片，仅保留CAM/ACC/PIC子目录及缩略图

### V1.4.2 (2026-09-04)
**紫外灯板数据优化**

- 优化紫外灯板数据结构，按焦距分条维护，提升数据可维护性

### V1.4.1 (2026-09-01)
**离线版下载功能**

- 顶部栏新增「下载离线版」按钮，一键下载离线HTML文件

### V1.4 (2026-08-28)
**数据层重构 + 图片加载优化**

- 数据文件独立化：内嵌数据从`index.html`分离为独立JS文件
- 图片目录重组：`IMG/`下按`CAM/`、`ACC/`、`PIC/`分类存放
- 缩略图系统：各目录下`THUMB/`子目录存放缩略图
- 懒加载：改用IntersectionObserver按需加载原图，首次加载从12MB降至~176KB

### V1.3 (2026-08-21)
**系列总览 & 多端适配增强**

- 新增「系列表」页面：按产品系列分组浏览全部相机及关联配件
- 新增返回顶部按钮

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
- PAD端及移动端响应式适配

### V1.1.1 (2026-08-07)
**移动端响应式布局适配**

- 移动端配单配置面板sticky固定
- 导航栏移动端横排展示
- 新增README.md、package.json

---

## License

未指定。
