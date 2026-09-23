const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// ========== 通用配置 ==========
const encoding = 'GBK';

// ========== CSV 解析函数 ==========
/**
 * 解析 CSV 文本，返回去掉表头后的行数组（二维数组）
 *
 * 支持标准 CSV 语法：
 *   - 引号内可含逗号、换行、双引号（以 "" 转义）
 *   - 兼容 \r\n / \r / \n 三种行尾
 *   - 自动去掉 UTF-8 BOM
 *   - 跳过空行
 *
 * 注意：不能先按换行切行再逐行解析——物料描述/备注等字段里含真实换行，
 * 那样会把一行数据切碎（SC 数据里就有多处）。
 */
function parseCSV(csvContent) {
    const rows = [];
    let cur = [];
    let field = '';
    let inQuotes = false;

    // 去掉 BOM
    if (csvContent.charCodeAt(0) === 0xFEFF) csvContent = csvContent.slice(1);

    for (let i = 0; i < csvContent.length; i++) {
        const ch = csvContent[i];

        if (inQuotes) {
            if (ch === '"') {
                // "" 转义为一个引号，否则结束引号
                if (csvContent[i + 1] === '"') { field += '"'; i++; }
                else inQuotes = false;
            } else {
                field += ch;
            }
        } else if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            cur.push(field);
            field = '';
        } else if (ch === '\n' || ch === '\r') {
            if (ch === '\r' && csvContent[i + 1] === '\n') i++;
            cur.push(field);
            field = '';
            if (!(cur.length === 1 && cur[0] === '')) rows.push(cur); // 跳过空行
            cur = [];
        } else {
            field += ch;
        }
    }
    if (field || cur.length) {
        cur.push(field);
        if (!(cur.length === 1 && cur[0] === '')) rows.push(cur);
    }

    // 跳过表头
    return rows.slice(1);
}

// ========== 表格数据集定义 ==========
// 相机/配件 4 个数据集统一在这里声明，避免复制粘贴。
//   colCount : 数据列数（相机 26 / 配件 10）
//   imgCol   : 图片字段所在列（相机 25 / 配件 9）
//   imgDir   : 图片目录。CSV 里的图片字段若不含 '/'，自动补 `${imgDir}/` 前缀。
//              设为 null 表示原样保留（ID 系列沿用历史行为，
//              由前端 getImageHtml 按类型补 ID_CAM/ 或 ID_ACC/）。
//   required : true 时缺 CSV 直接退出；false 时缺 CSV 跳过并提示。
const TABLE_DATASETS = [
    {
        csv: 'id_camera_data.csv',
        out: 'id_camera_data.js',
        variable: 'IDBOM_CAMERA_DATA',
        colCount: 26,
        imgCol: 25,
        imgDir: null,
        required: true,
        label: 'ID相机',
        description: 'ID-BOM 相机产品数据\n * 数据来源：id_camera_data.csv（海康机器人相机产品清单）\n * 更新方式：修改 id_camera_data.csv 后运行 `node import_csv.js`'
    },
    {
        csv: 'id_accessory_data.csv',
        out: 'id_accessory_data.js',
        variable: 'IDBOM_ACCESSORY_DATA',
        colCount: 10,
        imgCol: 9,
        imgDir: null,
        required: true,
        label: 'ID配件',
        description: 'ID-BOM 配件产品数据\n * 数据来源：id_accessory_data.csv（海康机器人配件产品清单）\n * 更新方式：修改 id_accessory_data.csv 后运行 `node import_csv.js`'
    },
    {
        csv: 'sc_camera_data.csv',
        out: 'sc_camera_data.js',
        variable: 'SCBOM_CAMERA_DATA',
        colCount: 26,
        imgCol: 25,
        imgDir: 'SC_CAM',
        required: false,
        label: 'SC相机',
        description: 'SC-BOM 智能相机产品数据\n * 数据来源：sc_camera_data.csv（海康机器人智能相机产品清单）\n * 更新方式：修改 sc_camera_data.csv 后运行 `node import_csv.js`'
    },
    {
        csv: 'sc_accessory_data.csv',
        out: 'sc_accessory_data.js',
        variable: 'SCBOM_ACCESSORY_DATA',
        colCount: 10,
        imgCol: 9,
        imgDir: 'SC_ACC',
        required: false,
        label: 'SC配件',
        description: 'SC-BOM 配件产品数据\n * 数据来源：sc_accessory_data.csv（SC 智能相机配件产品清单）\n * 更新方式：修改 sc_accessory_data.csv 后运行 `node import_csv.js`'
    }
];

/**
 * 转换单个表格 CSV → JS 数据文件
 * 返回生成的记录数，CSV 不存在时返回 null
 */
function buildTableDataset(ds) {
    const csvPath = path.join(__dirname, ds.csv);
    if (!fs.existsSync(csvPath)) {
        if (ds.required) {
            console.error(`错误: 未找到 ${ds.csv}`);
            process.exit(1);
        }
        console.log(`\n跳过: 未找到 ${ds.csv}`);
        return null;
    }

    const csv = iconv.decode(fs.readFileSync(csvPath), encoding);
    const rows = parseCSV(csv);

    const jsonData = rows.map(row => {
        // 清理所有字段的 \r
        row = row.map(c => (c || '').replace(/\r/g, ''));
        while (row.length < ds.colCount) row.push('');

        // 图片字段：去掉历史遗留的 CAM/ 、ACC/ 前缀；
        // 若仍不含目录（裸文件名）且该数据集有约定目录，则补上，
        // 保证前端 getImageHtml 不会把 SC 的图错拼到 ID_CAM/ID_ACC/ 下。
        let imgVal = row[ds.imgCol].trim();
        imgVal = imgVal.replace(/^(CAM\/|ACC\/)/, '');
        if (imgVal && imgVal.indexOf('/') < 0 && ds.imgDir) {
            imgVal = ds.imgDir + '/' + imgVal;
        }
        row[ds.imgCol] = imgVal;

        return { Count: ds.colCount, value: row.slice(0, ds.colCount) };
    });

    console.log(`  ${ds.csv}: ${jsonData.length} 条记录`);
    writeDataJs(
        path.join(__dirname, 'scripts', ds.out),
        ds.variable,
        jsonData,
        ds.description
    );
    return jsonData.length;
}

// ========== 生成 JS 数据文件 ==========
function writeDataJs(filePath, variableName, jsonData, description) {
    if (jsonData.length === 0) {
        console.log(`  警告: ${variableName} 无数据，写入空数组`);
    }

    // 紧凑格式：每个对象一行
    const lines = jsonData.map((item, i) => {
        const line = JSON.stringify(item);
        return i < jsonData.length - 1 ? line + ',' : line;
    });

    const content = `/**\n * ${description}\n */\nvar ${variableName} = [\n${lines.join('\n')}\n];\n`;
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  写入 ${path.basename(filePath)}: ${jsonData.length} 条`);
}

// ========== 主函数 ==========
function main() {
    console.log('=== CSV导入工具（生成JS数据文件）===\n');

    const mappingCsvPath = path.join(__dirname, 'mapping.csv');

    // 确保 scripts/ 目录存在
    const scriptsDir = path.join(__dirname, 'scripts');
    if (!fs.existsSync(scriptsDir)) {
        fs.mkdirSync(scriptsDir, { recursive: true });
        console.log('创建 scripts/ 目录');
    }

    // ===== 1~4. 相机/配件数据（ID_CAM / ID_ACC / SC_CAM / SC_ACC）=====
    console.log('读取 CSV 文件:');
    const built = {};
    TABLE_DATASETS.forEach(ds => {
        built[ds.variable] = buildTableDataset(ds);
    });

    // ===== 5. 映射数据（mapping.csv）=====
    if (fs.existsSync(mappingCsvPath)) {
        console.log('\n读取 mapping.csv...');
        const mappingBuffer = fs.readFileSync(mappingCsvPath);
        const mappingCsv = iconv.decode(mappingBuffer, encoding);
        const mappingRows = parseCSV(mappingCsv);

        const mappingJsonData = [];
        mappingRows.forEach(row => {
            if (row.length >= 5 && row[1] && row[1].trim()) {
                mappingJsonData.push({
                    series: (row[0] || '').trim(),
                    baseModel: (row[1] || '').trim(),
                    baseCode: (row[2] || '').trim(),
                    distModel: (row[3] || '').trim(),
                    distCode: (row[4] || '').trim()
                });
            }
        });

        console.log(`  mapping.csv: ${mappingJsonData.length} 条记录`);
        writeDataJs(
            path.join(__dirname, 'scripts', 'mapping_data.js'),
            'IDBOM_MAPPING_DATA',
            mappingJsonData,
            'ID-BOM 经销基线对照表\n * 数据来源：mapping.csv（基线型号 ↔ 经销型号映射）\n * 更新方式：修改 mapping.csv 后运行 `node import_csv.js`'
        );
    } else {
        console.log('\n跳过: 未找到 mapping.csv');
    }

    // ===== 6. 产品动态（product_updates.csv）=====
    const productUpdatesCsvPath = path.join(__dirname, 'product_updates.csv');
    let productUpdatesJsonData = [];
    if (fs.existsSync(productUpdatesCsvPath)) {
        console.log('\n读取 product_updates.csv...');
        const productUpdatesBuffer = fs.readFileSync(productUpdatesCsvPath);
        const productUpdatesCsv = iconv.decode(productUpdatesBuffer, encoding);
        const productUpdatesRows = parseCSV(productUpdatesCsv);

        productUpdatesRows.forEach(row => {
            if (row.length >= 5 && row[0] && row[0].trim()) {
                productUpdatesJsonData.push({
                    id: (row[0] || '').trim(),
                    date: (row[1] || '').trim(),
                    productType: (row[2] || '').trim(),
                    type: (row[3] || '').trim(),
                    content: (row[4] || '').trim(),
                    series: (row[5] || '').trim(),
                    docName: (row[6] || '').trim(),
                    featured: (row[7] || '').trim()
                });
            }
        });

        console.log(`  product_updates.csv: ${productUpdatesJsonData.length} 条记录`);
        writeDataJs(
            path.join(__dirname, 'scripts', 'product_updates.js'),
            'IDBOM_PRODUCT_UPDATES',
            productUpdatesJsonData,
            'ID-BOM 产品动态数据\n * 数据来源：product_updates.csv（产品更新动态）\n * 更新方式：修改 product_updates.csv 后运行 `node import_csv.js`'
        );
    } else {
        console.log('\n跳过: 未找到 product_updates.csv');
    }

    // ===== 完成 =====
    console.log('\n导入完成！');
    console.log('已生成以下 JS 数据文件:');
    TABLE_DATASETS.forEach(ds => {
        const n = built[ds.variable];
        const name = ds.out.padEnd(21);
        console.log(n === null
            ? `  - ${name} (跳过：未找到 ${ds.csv})`
            : `  - ${name} (${ds.variable}, ${n} 条)`);
    });
    if (fs.existsSync(mappingCsvPath)) {
        console.log('  - mapping_data.js       (IDBOM_MAPPING_DATA)');
    }
    if (fs.existsSync(productUpdatesCsvPath)) {
        console.log('  - product_updates.js    (IDBOM_PRODUCT_UPDATES)');
    }

    console.log('\n刷新 index.html 即可加载最新数据。');
}

// 运行主函数
main();
