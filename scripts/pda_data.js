// pda.js - PDA 智能移动终端选型数据
// 数据来源: 机器人PDA在售设备参数梳理
// 说明: 变体型号已继承基准型号参数，并覆盖自身差异参数

window.PDA_DATA = {
  paramOrder: ["性能/条码类别", "条码最小精度", "检测角度", "视场角度", "景深", "OCR", "处理器", "内存", "扩展卡槽", "操作系统", "SIM", "摄像头", "传感器", "显示屏", "触摸屏", "音频", "键盘", "NFC/工作频率", "协议标准", "读写距离", "电气特性/接口", "电池", "通信方式/移动通信", "Wi-Fi", "蓝牙", "定位", "结构/外形尺寸", "重量", "IP防护等级", "温度", "湿度", "跌落规格", "静电防护", "激光性能/激光安全等级", "波长", "脉冲宽度", "最大功率", "一般规范/软件", "认证"],
  models: [
    {
      sub: "MV-IDP5114/4&64/05FR",
      main: "MV-IDP5114",
      name: "IDP智能移动终端",
      intro: "MV-IDP5114智能移动终端基于Android 11.0操作系统，并搭载八核2.0GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.0 GHz处理器，基于Android 11.0操作系统\n3、5.5英寸显示屏，1440 × 720屏幕分辨率\n4、高防护工业及结构设计，IP68防护以及1.5米多次跌落\n5、5000 mAh大容量电池，确保长时间续航\n6、支持快速漫游功能，Wi-Fi性能强大",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "5 mil", "检测角度": "水平42°，垂直28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度360°", "景深": "Code39(5mil)：170 mm ~ 280 mm\nCode39(20mil)：80 mm ~ 1000 mm\nCode39(100mil)：0 ~ 3700 mm\nCode128(5mil)：170 mm ~ 280 mm\nCode128(15mil)：100 mm ~ 800 mm\nData Matrix(10mil)：165 mm ~ 310 mm\nData Matrix(167mil)：0 ~ 3100 mm", "OCR": "不支持", "处理器": "8核 2xA75 @2.0GHZ + 6xA55 @1.8GHZ", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android 11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器，可选配（电子罗盘、陀螺仪）", "显示屏": "5.5英寸IPS显示屏（1440×720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风（具有降噪功能）", "键盘": "音量+、-键、开关机键、2个侧扫描键、自定义按键", "NFC/工作频率": "不支持", "协议标准": "不支持", "读写距离": "不支持", "电气特性/接口": "Type-C（支持耳机），USB HighSpeed，OTG", "电池": "5000 mAh，可拆卸电池\n待机时间大于500 h\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B5/B8，TD-SCDMA B34/B39\n4G：FDD-LTE B1/B3/B5/B7/B8/B20，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "162.3 mm × 74.9 mm × 18.9mm", "重量": "273 g左右（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 55℃\n存储温度-30 ~ 60℃", "湿度": "0 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±15KV（空气放电），±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP3204/32G",
      main: "MV-IDP3204",
      name: "IDP智能移动终端",
      intro: "MV-IDP3204智能移动终端基于Android 13.0操作系统，并搭载八核2.0GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.0GHz处理器，基于Android 13.0操作系统\n3、4.0英寸显示屏，800 × 480屏幕分辨率\n4、高防护工业及结构设计，IP65防护以及1.5米多次跌落\n5、4850 mAh大容量电池，确保长时间续航，且支持快充\n6、支持快速漫游功能，Wi-Fi性能强大",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm \nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.0 GHz处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android 13.0", "SIM": "1个Nano-SIM卡槽", "摄像头": "后置摄像头：800万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "4.0英寸显示屏（800 × 480）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置单麦克风", "键盘": "正面：23个按键，1个电源键\n侧面：2个侧扫描键、1个自定义按键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "4850 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B3/B5/B8\n3G：WCDMA B1/B5/B8\n4G：TDD B34/B38/B39/B40/B41，FDD-LTE B1/B3/B5/B8", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "165.9 mm × 69.4 mm × 16.8 mm", "重量": "265 g（含电池）", "IP防护等级": "IP65", "温度": "工作温度-20 ~ 50℃\n存储温度-40 ~ 60℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±15KV（空气放电），±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP3204/64G",
      main: "MV-IDP3204",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm \nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.0 GHz处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android 13.0", "SIM": "1个Nano-SIM卡槽", "摄像头": "后置摄像头：800万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "4.0英寸显示屏（800 × 480）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置单麦克风", "键盘": "正面：23个按键，1个电源键\n侧面：2个侧扫描键、1个自定义按键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "4850 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B3/B5/B8\n3G：WCDMA B1/B5/B8\n4G：TDD B34/B38/B39/B40/B41，FDD-LTE B1/B3/B5/B8", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "165.9 mm × 69.4 mm × 16.8 mm", "重量": "265 g（含电池）", "IP防护等级": "IP65", "温度": "工作温度-20 ~ 50℃\n存储温度-40 ~ 60℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±15KV（空气放电），±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP3204/A/4&64",
      main: "MV-IDP3204",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm \nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.0 GHz处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android 13.0", "SIM": "1个Nano-SIM卡槽", "摄像头": "后置摄像头：800万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "4.0英寸显示屏（800 × 480）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置单麦克风", "键盘": "正面：23个按键，1个电源键\n侧面：2个侧扫描键、1个自定义按键", "NFC/工作频率": "不支持", "协议标准": "不支持", "读写距离": "不支持", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "4850 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B3/B5/B8\n3G：WCDMA B1/B5/B8\n4G：TDD B34/B38/B39/B40/B41，FDD-LTE B1/B3/B5/B8", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "165.9 mm × 69.4 mm × 16.8 mm", "重量": "265 g（含电池）", "IP防护等级": "IP65", "温度": "工作温度-20 ~ 50℃\n存储温度-40 ~ 60℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±15KV（空气放电），±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP3304/4&64",
      main: "MV-IDP3304",
      name: "IDP智能移动终端",
      intro: "MV-IDP3304智能移动终端基于Android 11.0操作系统，并搭载八核2.2GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.2GHz处理器，基于Android 11.0操作系统\n3、4.0英寸显示屏，480 × 800屏幕分辨率\n4、高防护工业及结构设计，IP67防护以及1.5米多次跌落\n5、5000 mAh大容量电池，确保长时间续航，且支持快充\n6、支持快速漫游功能，Wi-Fi性能强大",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "5 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：120 mm ~ 220 mm\nCode 39（25 mil）：70 mm ~ 750 mm \nCode 128（10 mil）：40 mm ~ 410 mm\nCode 128（100 mil）：0 ~ 2100 mm\nData Matrix（10 mil）：90 mm ~ 220 mm\nQR Code（20 mil）：45 mm ~ 400 mm \nQR Code（100 mil）：0 ~ 1400 mm", "OCR": "不支持", "处理器": "8核2.2 GHz高性能处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android 11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "后置摄像头：1300万像素（彩色变焦）\n前置摄像头：800万像素（彩色定焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "4.0英寸显示屏（800 × 480）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "正面：23个键盘按键，包括1个PTT机键\n侧面：2个侧扫描键，1个电源键，1个可编程键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO18092，ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type C", "电池": "5000 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B4/B5/B8\n4G：FDD-LTE B1/B2/B3/B4/B5/B7/B8/B20/B28a&b，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11a/b/g/n/ac/d/h/i/k/r/v/w", "蓝牙": "BT5.1，支持BLE", "定位": "GPS，北斗，GLONASS，Galileo，A-GPS", "结构/外形尺寸": "167.8 mm × 66 mm × 18.5 mm", "重量": "约267.5 g（含电池）", "IP防护等级": "IP67", "温度": "工作温度-10 ~ 50℃\n存储温度-40 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP3304/A/3&32",
      main: "MV-IDP3304",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "5 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：120 mm ~ 220 mm\nCode 39（25 mil）：70 mm ~ 750 mm \nCode 128（10 mil）：40 mm ~ 410 mm\nCode 128（100 mil）：0 ~ 2100 mm\nData Matrix（10 mil）：90 mm ~ 220 mm\nQR Code（20 mil）：45 mm ~ 400 mm \nQR Code（100 mil）：0 ~ 1400 mm", "OCR": "不支持", "处理器": "8核2.2 GHz高性能处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android 11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "4.0英寸显示屏（800 × 480）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "正面：23个键盘按键，包括1个PTT机键\n侧面：2个侧扫描键，1个电源键，1个可编程键", "NFC/工作频率": "不支持", "协议标准": "不支持", "读写距离": "不支持", "电气特性/接口": "Type C", "电池": "5000 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B4/B5/B8\n4G：FDD-LTE B1/B2/B3/B4/B5/B7/B8/B20/B28a&b，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11a/b/g/n/ac/d/h/i/k/r/v/w", "蓝牙": "BT5.1，支持BLE", "定位": "GPS，北斗，GLONASS，Galileo，A-GPS", "结构/外形尺寸": "167.8 mm × 66 mm × 18.5 mm", "重量": "约267.5 g（含电池）", "IP防护等级": "IP67", "温度": "工作温度-10 ~ 50℃\n存储温度-40 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP4104/4&64/DP/05NR",
      main: "MV-IDP4104/海康机器人",
      name: "IDP智能移动终端",
      intro: "MV-IDP4104智能移动终端基于Android 11.0操作系统，并搭载八核2.0GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.0GHz高性能处理器，基于Android 11.0操作系统\n3、4.0英寸显示屏，480 × 800屏幕分辨率\n4、高防护等级结构设计以及1.5米多次跌落\n5、5200 mAh大容量电池，确保长时间续航，且支持50 mAh备用电池\n6、支持快速漫游功能，Wi-Fi性能强大\n7、可选配NFC功能",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：33 mm ~ 100 mm\nCode 39（20 mil）：60 mm ~ 210 mm\nCode 128（3 mil）：40 mm ~ 80 mm\nCode 128（5 mil）：30 mm ~ 100 mm\nCode 128（10 mil）：30 mm ~ 135 mm\nData Matrix（5 mil）：50 mm ~ 80 mm\nData Matrix（10 mil）：30 mm ~ 100 mm\nQR Code（20 mil）：45 mm ~ 150 mm", "OCR": "后置摄像头和读码模组支持OCR字符（中文、英文和阿拉伯数字）识别", "处理器": "8核2.0 GHz高性能处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android V11.0", "SIM": "2个Nano-SIM卡槽", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "加速度传感器、光线传感器、距离传感器，可选配（电子罗盘、陀螺仪）", "显示屏": "4.0英寸显示屏（800 × 480）", "触摸屏": "电容式触摸、不支持手套模式", "音频": "内置扬声器，内置双麦克风（具有降噪功能）", "键盘": "音量+/–键，1个PTT机键，2个侧扫描键，正面37个键盘按键", "NFC/工作频率": "可选配（参数项不做呈现）", "协议标准": "可选配（参数项不做呈现）", "读写距离": "可选配（参数项不做呈现）", "电气特性/接口": "Type C", "电池": "5200 mAh，可拆卸电池\n支持50 mAh备份电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B3/B5/B8\n3G：WCDMA B1/B5/B8\n4G：FDD B1/B3/B5/B7/B8/B20/B28，TDD B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "208.1 mm × 74.6 mm × 67.7 mm", "重量": "约429 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-15 ~ 55℃\n存储温度-40 ~ 60℃", "湿度": "0 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±8KV（空气放电），±6KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5006/5G/4&64/05FR",
      main: "MV-IDP5006/5G",
      name: "IDP智能移动终端",
      intro: "MV-IDP5006/5G智能移动终端基于Android 14.0操作系统，并搭载八核2.6GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.6GHz处理器，基于Android 14.0操作系统\n3、6.0英寸显示屏，720 × 1560屏幕分辨率\n4、高防护等级及结构设计，IP67防护以及1.5米多次跌落\n5、5000 mAh大容量电池，确保长时间续航，且支持快充\n6、支持快速漫游功能，Wi-Fi性能强大",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "5 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：120 mm ~ 220 mm\nCode 39（25 mil）：70 mm ~ 750 mm \nCode 128（10 mil）：40 mm ~ 410 mm\nCode 128（100 mil）：0 ~ 2100 mm\nData Matrix（10 mil）：90 mm ~ 220 mm\nQR Code（20 mil）：45 mm ~ 400 mm \nQR Code（100 mil）：0 ~ 1400 mm", "OCR": "后置摄像头和读码模组支持OCR字符（中文、英文和阿拉伯数字）识别", "处理器": "8核最高2.6 GHz处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android 14.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "6.0英寸显示屏（720 × 1560）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风（具有降噪功能）", "键盘": "音量+、-键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B3/B5/B8\n3G：WCDMA B1/B5/B8\n4G：FDD B1/B3/B5/B7/B8/B20/B28，TDD B34/B38/B39/B40/B41\n5G：NR N1/3/5/7/8/20/28/38/40/41/77/78", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac/d/h/i/k/r/v/ac/ax", "蓝牙": "BT5.2", "定位": "GPS，北斗，GLONASS，Gallileo", "结构/外形尺寸": "165.4 mm × 77.6 mm × 14.9 mm", "重量": "约280 g（含电池）", "IP防护等级": "IP67", "温度": "工作温度-20 ~ 50℃\n存储温度-30 ~ 60℃", "湿度": "0 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±15KV（空气放电），±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5006/5G/A/4&64/05FR",
      main: "MV-IDP5006/5G",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "5 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：120 mm ~ 220 mm\nCode 39（25 mil）：70 mm ~ 750 mm \nCode 128（10 mil）：40 mm ~ 410 mm\nCode 128（100 mil）：0 ~ 2100 mm\nData Matrix（10 mil）：90 mm ~ 220 mm\nQR Code（20 mil）：45 mm ~ 400 mm \nQR Code（100 mil）：0 ~ 1400 mm", "OCR": "后置摄像头和读码模组支持OCR字符（中文、英文和阿拉伯数字）识别", "处理器": "8核最高2.6 GHz处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512 GB", "操作系统": "Android 14.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器", "显示屏": "6.0英寸显示屏（720 × 1560）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风（具有降噪功能）", "键盘": "音量+、-键、开关机键、2个侧扫描键", "NFC/工作频率": "不支持", "协议标准": "不支持", "读写距离": "不支持", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B3/B5/B8\n3G：WCDMA B1/B5/B8\n4G：FDD B1/B3/B5/B7/B8/B20/B28，TDD B34/B38/B39/B40/B41\n5G：NR N1/3/5/7/8/20/28/38/40/41/77/78", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac/d/h/i/k/r/v/ac/ax", "蓝牙": "BT5.2", "定位": "GPS，北斗，GLONASS，Gallileo", "结构/外形尺寸": "165.4 mm × 77.6 mm × 14.9 mm", "重量": "约280 g（含电池）", "IP防护等级": "IP67", "温度": "工作温度-20 ~ 50℃\n存储温度-30 ~ 60℃", "湿度": "0 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±15KV（空气放电），±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5102/3&64",
      main: "MV-IDP5102",
      name: "IDP智能移动终端",
      intro: "MV-IDP5102智能移动终端基于Android 11.0操作系统，最高搭载八核2.0GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、最高八核2.0GHz高性能处理器，基于Android 11.0操作系统\n3、5.0英寸显示屏，1520 × 720屏幕分辨率\n4、高防护工业及结构设计，IP68防护以及1.5米多次跌落\n5、4500 mAh大电池，确保长时间续航，且支持快充\n6、支持快速漫游功能，Wi-Fi性能强大\n7、可选配NFC功能",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm\nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.0 GHz高性能处理器", "内存": "RAM 3GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：200万像素（彩色定焦）\n后置摄像头：800万像素（彩色变焦）", "传感器": "加速度传感器、光线传感器、距离传感器", "显示屏": "5.0英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸、支持手套模式", "音频": "内置单扬声器；内置双麦克风（具有降噪功能）", "键盘": "音量+、- 键、开关机键、2个侧扫描键，2个预留按键", "NFC/工作频率": "可选配（参数项不做呈现）", "协议标准": "可选配（参数项不做呈现）", "读写距离": "可选配（参数项不做呈现）", "电气特性/接口": "Type-C（支持耳机），USB HighSpeed ，OTG", "电池": "4500 mAh，不可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B5/B8，TD-SCDMA B34/B39\n4G：FDD-LTE B1/B3/B5/B7/B8/B20，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS、北斗、GLONASS", "结构/外形尺寸": "133.7 mm × 64.6 mm × 16.7 mm（最厚处18.25 mm）", "重量": "200 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-10 ~ 55℃\n存储温度-30 ~ 60℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±8KV（空气放电），±6KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5102/4&64",
      main: "MV-IDP5102",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm\nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.0 GHz高性能处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：200万像素（彩色定焦）\n后置摄像头：800万像素（彩色变焦）", "传感器": "加速度传感器、光线传感器、距离传感器", "显示屏": "5.0英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸、支持手套模式", "音频": "内置单扬声器；内置双麦克风（具有降噪功能）", "键盘": "音量+、- 键、开关机键、2个侧扫描键，2个预留按键", "NFC/工作频率": "可选配（参数项不做呈现）", "协议标准": "可选配（参数项不做呈现）", "读写距离": "可选配（参数项不做呈现）", "电气特性/接口": "Type-C（支持耳机），USB HighSpeed ，OTG", "电池": "4500 mAh，不可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B5/B8，TD-SCDMA B34/B39\n4G：FDD-LTE B1/B3/B5/B7/B8/B20，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS、北斗、GLONASS", "结构/外形尺寸": "133.7 mm × 64.6 mm × 16.7 mm（最厚处18.25 mm）", "重量": "200 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-10 ~ 55℃\n存储温度-30 ~ 60℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±8KV（空气放电），±6KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5102/SE3&64",
      main: "MV-IDP5102",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm\nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "4核2.0 GHz高性能处理器", "内存": "RAM 3GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：200万像素（彩色定焦）\n后置摄像头：800万像素（彩色变焦）", "传感器": "加速度传感器、光线传感器、距离传感器", "显示屏": "5.0英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸、支持手套模式", "音频": "内置单扬声器；内置双麦克风（具有降噪功能）", "键盘": "音量+、- 键、开关机键、2个侧扫描键，2个预留按键", "NFC/工作频率": "可选配（参数项不做呈现）", "协议标准": "可选配（参数项不做呈现）", "读写距离": "可选配（参数项不做呈现）", "电气特性/接口": "Type-C（支持耳机），USB HighSpeed ，OTG", "电池": "4500 mAh，不可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B5/B8，TD-SCDMA B34/B39\n4G：FDD-LTE B1/B3/B5/B7/B8/B20，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE 802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS、北斗、GLONASS", "结构/外形尺寸": "133.7 mm × 64.6 mm × 16.7 mm（最厚处18.25 mm）", "重量": "200 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-10 ~ 55℃\n存储温度-30 ~ 60℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±8KV（空气放电），±6KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5104/4&64",
      main: "MV-IDP5104/机器人",
      name: "智能移动终端",
      intro: "MV-IDP5104/机器人智能移动终端基于Android 10.0操作系统，并搭载八核2.0GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.0GHz高性能处理器，基于Android 10.0操作系统\n3、5.5英寸显示屏，1440 × 720屏幕分辨率\n4、高防护工业及结构设计，IP68防护以及1.5米多次跌落\n5、4900 mAh容量电池，确保长时间续航\n6、支持快速漫游功能，Wi-Fi性能强大",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "4 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：90 mm ~ 170 mm\nCode 39（10 mil）：50 mm ~ 310 mm\nCode 128（25 mil）：40 mm ~ 700 mm\nData Matrix（10 mil）：65 mm ~ 200 mm\nQR Code（15 mil）：40 mm ~ 310 mm", "OCR": "不支持", "处理器": "8核2.0 GHz高性能处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512GB", "操作系统": "Android V10.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器、电子罗盘、陀螺仪", "显示屏": "5.5英寸IPS显示屏（1440 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置单扬声器；内置双麦克风（具有降噪功能）", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO15693、ISO14443A、ISO14443B", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "4900 mAh，不可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：CDMA EVDO BC0，WCDMA B1/B2/B4/B5/B8，TD-SCDMA B34/B39\n4G：FDD-LTE B1/B2/B3/B4/B5/B7/B8/B20，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "157 mm × 75 mm × 15 mm", "重量": "250 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 50℃\n存储温度-40 ~ 70℃", "湿度": "5% ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±8KV（空气放电），±6KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5104/AI4&64",
      main: "MV-IDP5104/机器人",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "4 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：90 mm ~ 170 mm\nCode 39（10 mil）：50 mm ~ 310 mm\nCode 128（25 mil）：40 mm ~ 700 mm\nData Matrix（10 mil）：65 mm ~ 200 mm\nQR Code（15 mil）：40 mm ~ 310 mm", "OCR": "后置摄像头和读码模组支持OCR字符（中文、英文和阿拉伯数字）识别", "处理器": "8核2.0 GHz高性能处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "TF卡，最大支持512GB", "操作系统": "Android V10.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器、电子罗盘、陀螺仪", "显示屏": "5.5英寸IPS显示屏（1440 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置单扬声器；内置双麦克风（具有降噪功能）", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO15693、ISO14443A、ISO14443B", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "4900 mAh，不可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：CDMA EVDO BC0，WCDMA B1/B2/B4/B5/B8，TD-SCDMA B34/B39\n4G：FDD-LTE B1/B2/B3/B4/B5/B7/B8/B20，TDD-LTE B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "157 mm × 75 mm × 15 mm", "重量": "250 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 50℃\n存储温度-40 ~ 70℃", "湿度": "5% ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±8KV（空气放电），±6KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5204/3&32",
      main: "MV-IDP5204",
      name: "IDP智能移动终端",
      intro: "MV-IDP5204智能移动终端基于Android 11.0操作系统，并搭载八核2.2GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.2GHz处理器，基于Android 11.0操作系统\n3、6.2英寸显示屏，1520 × 720屏幕分辨率\n4、高防护工业及结构设计，IP68防护以及1.5米多次跌落\n5、5000 mAh大容量电池，确保长时间续航，且支持快充\n6、支持快速漫游功能，Wi-Fi性能强大",
      apps: "智能制造、物流、仓储、零售、资产管理、企事业单位等",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm\nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.2 GHz处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器，电子罗盘、陀螺仪", "显示屏": "6.2英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO18092，ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，不可拆卸电池\n默认配9 V，1.67 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/ B5/B8\n4G：FDD-LTE B1/B2/B3/B5/B7/B8/B20/B28a&b，TDD-LTE：B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac，IEEE802.11 d/e/h/i/j/k/r/v", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "166.4 mm × 80.6 mm × 13.5 mm", "重量": "267 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 55℃\n存储温度-30 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5204/4&64",
      main: "MV-IDP5204",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm\nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.2 GHz处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器，电子罗盘、陀螺仪", "显示屏": "6.2英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO18092，ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，不可拆卸电池\n默认配9 V，1.67 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/ B5/B8\n4G：FDD-LTE B1/B2/B3/B5/B7/B8/B20/B28a&b，TDD-LTE：B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac，IEEE802.11 d/e/h/i/j/k/r/v", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "166.4 mm × 80.6 mm × 13.5 mm", "重量": "267 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 55℃\n存储温度-30 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5204/4&64/07ER",
      main: "MV-IDP5204",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "5 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（20 mil）：80 mm ~ 1000 mm\nCode 39（100 mil）：0 ~ 3700 mm\nCode 128（5 mil）：180 mm ~ 280 mm\nCode 128（15 mil）：100 mm ~ 800 mm\nData matrix（10 mil）：165 mm ~ 310 mm\nData matrix（167 mil）：0 ~ 3100 mm", "OCR": "不支持", "处理器": "8核2.2 GHz处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器，电子罗盘、陀螺仪", "显示屏": "6.2英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO18092，ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，不可拆卸电池\n默认配9 V，1.67 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/ B5/B8\n4G：FDD-LTE B1/B2/B3/B5/B7/B8/B20/B28a&b，TDD-LTE：B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac，IEEE802.11 d/e/h/i/j/k/r/v", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "166.4 mm × 80.6 mm × 13.5 mm", "重量": "267 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 55℃\n存储温度-30 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5204/4&64/DP",
      main: "MV-IDP5204",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（5 mil）：35 mm ~ 100mm\nCode 128（3 mil）：40 mm ~ 80mm\nCode 128（10mil）：30 mm ~ 135mm\nData Matrix（10 mil）：30 mm ~ 100mm\nQR Code（20 mil）：45 mm ~ 150mm", "OCR": "不支持", "处理器": "8核2.2 GHz处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器，电子罗盘、陀螺仪", "显示屏": "6.2英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "13.56 MHz", "协议标准": "ISO18092，ISO14443A/B，ISO15693", "读写距离": "3 cm以内", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，不可拆卸电池\n默认配9 V，1.67 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/ B5/B8\n4G：FDD-LTE B1/B2/B3/B5/B7/B8/B20/B28a&b，TDD-LTE：B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac，IEEE802.11 d/e/h/i/j/k/r/v", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "166.4 mm × 80.6 mm × 13.5 mm", "重量": "267 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 55℃\n存储温度-30 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5204/A/4&64",
      main: "MV-IDP5204",
      name: "",
      intro: "",
      features: "",
      apps: "",
      params: {"性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，Interleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code， MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417", "条码最小精度": "3 mil", "检测角度": "水平 42°，垂直 28°", "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度 360°", "景深": "Code 39（10 mil）：40 mm ~ 340 mm\nCode 39（25 mil）：70 mm ~ 480 mm \nCode 128（5 mil）：70 mm ~ 200 mm\nCode 128（100 mil）：0 ~ 1450 mm\nData Matrix（10 mil）：60 mm ~ 200 mm\nQR Code（20 mil）：45 mm ~ 370 mm\nQR Code（100 mil）：0 ~ 1000 mm", "OCR": "不支持", "处理器": "8核2.2 GHz处理器", "内存": "RAM 3GB，ROM 32GB", "扩展卡槽": "Micro SD卡，最大支持512GB", "操作系统": "Android V11.0", "SIM": "1个Nano-SIM卡槽，1个Nano-SIM/TF二选一卡槽，支持双卡双待", "摄像头": "后置摄像头：1300万像素（彩色变焦）", "传感器": "重力传感器、光线传感器、距离传感器，电子罗盘、陀螺仪", "显示屏": "6.2英寸显示屏（1520 × 720）", "触摸屏": "电容式触摸，支持手套模式", "音频": "内置扬声器，内置双麦克风", "键盘": "音量+、- 键、开关机键、2个侧扫描键", "NFC/工作频率": "不支持", "协议标准": "不支持", "读写距离": "不支持", "电气特性/接口": "Type-C，USB 2.0，OTG", "电池": "5000 mAh，不可拆卸电池\n默认配5 V、2 A适配器", "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/ B5/B8\n4G：FDD-LTE B1/B2/B3/B5/B7/B8/B20/B28a&b，TDD-LTE：B34/B38/B39/B40/B41", "Wi-Fi": "IEEE802.11 a/b/g/n/ac，IEEE802.11 d/e/h/i/j/k/r/v", "蓝牙": "BT5.0", "定位": "GPS，北斗，GLONASS", "结构/外形尺寸": "166.4 mm × 80.6 mm × 13.5 mm", "重量": "267 g（含电池）", "IP防护等级": "IP68", "温度": "工作温度-20 ~ 55℃\n存储温度-30 ~ 70℃", "湿度": "5 ~ 95%RH无冷凝", "跌落规格": "1.5 m水泥地防摔", "静电防护": "±12KV（空气放电）±8KV（接触放电）", "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫描助手、企业桌面等", "认证": "CCC，CTA，SRRC"}
    },
    {
      sub: "MV-IDP5304/4&64(国内标配)",
      main: "MV-IDP5304",
      name: "IDP智能移动终端",
      intro: "MV-IDP5304 型智能移动终端基于Android 14 操作系统，并搭载高性能八核2.2GHz处理器，运行速度全面提升。设备内置自主研发的深度学习算法，支持主流一维码和二维码。可满足智能制造、物流、仓储、零售、资产管理和企事业单位等多行业应用需求。",
      features: "1、采用自研深度学习算法，可高效读取行业疑难码，例如断帧、溢墨、欠墨、覆膜、污损码\n2、八核2.2 GHz处理器，基于Android 14操作系统，4G全网通蜂窝网络\n3、6英寸显示屏，1440 × 720屏幕分辨率\n4、前800W，后1300W高清摄像头\n5、高防护等级及结构设计，IP67防护以及1.5米多次跌落\n6、5000 mAh大容量电池确保长时间续航，且支持拆卸更换\n7、支持快速漫游功能，Wi-Fi性能强大\n8、NFC近场通讯功能\n9、可选配热启动备电等功能",
      apps: "智能制造、物流、仓储、零售、医疗、企事业单位等",
      params: {
        "性能/条码类别": "一维码：Code 11，Code 39，Code 93，Code 128，GS1，EAN，UPC-A，UPC-E，\nInterleaved 2 of 5，Codabar，Matrix 2 of 5，Industrial 2 of 5，Datalogic 2 of 5 (China Post)，MSI Plessey，Pharmacode\n矩阵式二维码：Data Matrix，QR Code，Micro QR Code，Aztec，Han Xin Code，MaxiCode，Data Matrix ECC140\n堆叠式二维码：MicroPDF，PDF417",
        "条码最小精度": "5 mil",
        "检测角度": "水平46°，垂直38°",
        "视场角度": "倾斜角度±60°，偏斜角度±45°，旋转角度360°",
        "景深": "Code 39（10 mil）：42 ~ 370 mm\nCode 39（25 mil）：90 ~ 730 mm\nCode 128（5 mil）：30 ~ 320 mm\nCode 128（100 mil）：250 ~ 4500 mm\nQR Code（20 mil）：10 ~ 610 mm\nQR Code（100 mil）：70 ~ 3200 mm\nData Matrix（10 mil）：30 ~ 290 mm",
        "OCR": "支持选配", "处理器": "8核2.2 GHz处理器", "内存": "RAM 4GB，ROM 64GB", "扩展卡槽": "Micro SD卡，最大可支持1TB", "操作系统": "Android 14",
        "SIM": "2个Nano-SIM卡槽，支持双卡双待（SIM卡2与Micro SD卡为二选一方式）",
        "摄像头": "前置摄像头：500万像素（彩色定焦）\n后置摄像头：1300万像素（彩色变焦）",
        "传感器": "光线距离传感器、重力传感器（G-sensor）", "显示屏": "6.0英寸高清全面屏（1440 × 720）", "触摸屏": "INCELL全贴合电容触摸屏，支持多点触控、被动笔签名", "音频": "内置2个麦克风、1个扬声器",
        "键盘": "侧面电源键×1，侧面扫描键×2，侧面音量键×2，侧面FN键×1", "NFC/工作频率": "13.56 MHz NFC", "协议标准": "ISO14443A/B，ISO15693", "读写距离": "3 cm以内",
        "电气特性/接口": "Type-C（支持耳机），USB 2.0 HighSpeed，OTG\n2PIN座充专用充电端口", "电池": "一体可拆卸式5000 mAh（4.4V）锂聚合物电池\n默认配5 V、2 A适配器",
        "通信方式/移动通信": "2G：GSM B2/B3/B5/B8\n3G：WCDMA B1/B2/B4/B5/B8\n4G：FDD-LTE B1/B2/B3/B4/B5/B7/B8/B20/B28，TDD-LTE B34/B38/B39/B40/B41",
        "Wi-Fi": "IEEE 802.11 a/b/g/n/ac/d/h/i/k/r/v/ac/ax", "蓝牙": "BT5.2（2.4 GHz ~ 2.48 GHz）", "定位": "GPS，北斗，GLONASS，Galileo",
        "结构/外形尺寸": "163.5 mm × 77.15 mm × 14.15 mm", "重量": "约275 g（含电池）", "IP防护等级": "IP67",
        "温度": "工作温度：-20℃ ~ 50℃\n存储温度：-30℃ ~ 60℃", "湿度": "0 ~ 95%RH无冷凝", "跌落规格": "1.5 m大理石台面8次跌落", "静电防护": "±12 KV（空气放电），±8 KV（接触放电）",
        "激光性能/激光安全等级": "Class 2", "波长": "650 nm", "脉冲宽度": "4 ms", "最大功率": "1 mW", "一般规范/软件": "扫码工具、企业桌面等", "认证": "CCC，CTA，SRRC"
      }
    },
  ]
};
