const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// ========== CSV 解析函数 ==========
function parseCSV(csvContent) {
    const lines = csvContent.split('\n').filter(line => line.trim() !== '');
    const data = [];

    // 跳过表头
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const row = [];
        let current = '';
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                if (inQuotes && j + 1 < line.length && line[j + 1] === '"') {
                    current += '"';
                    j++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                row.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        row.push(current);

        // 移除 BOM
        if (row[0] && row[0].charCodeAt(0) === 0xFEFF) {
            row[0] = row[0].substring(1);
        }

        data.push(row);
    }

    return data;
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

    const encoding = 'GBK';
    const cameraCsvPath = path.join(__dirname, 'camera_data.csv');
    const accessoryCsvPath = path.join(__dirname, 'accessory_data.csv');
    const mappingCsvPath = path.join(__dirname, 'mapping.csv');

    // 确保 scripts/ 目录存在
    const scriptsDir = path.join(__dirname, 'scripts');
    if (!fs.existsSync(scriptsDir)) {
        fs.mkdirSync(scriptsDir, { recursive: true });
        console.log('创建 scripts/ 目录');
    }

    // ===== 1. 相机数据 =====
    if (!fs.existsSync(cameraCsvPath)) {
        console.log('错误: 未找到 camera_data.csv');
        process.exit(1);
    }

    console.log('读取 CSV 文件:');
    const cameraBuffer = fs.readFileSync(cameraCsvPath);
    const cameraCsv = iconv.decode(cameraBuffer, encoding);
    const cameraRows = parseCSV(cameraCsv);

    const cameraJsonData = cameraRows.map(row => {
        // 清理所有字段的 \r
        row = row.map(c => (c || '').replace(/\r/g, ''));
        while (row.length < 26) row.push('');
        const imgVal = row[25].trim();
        row[25] = imgVal ? 'CAM/' + imgVal : '';
        return { Count: 26, value: row.slice(0, 26) };
    });

    console.log(`  camera_data.csv: ${cameraJsonData.length} 条记录`);
    writeDataJs(
        path.join(__dirname, 'scripts', 'camera_data.js'),
        'IDBOM_CAMERA_DATA',
        cameraJsonData,
        'ID-BOM 相机产品数据\n * 数据来源：camera_data.csv（海康机器人相机产品清单）\n * 更新方式：修改 camera_data.csv 后运行 `node import_csv.js`'
    );

    // ===== 2. 配件数据 =====
    if (!fs.existsSync(accessoryCsvPath)) {
        console.log('错误: 未找到 accessory_data.csv');
        process.exit(1);
    }

    const accessoryBuffer = fs.readFileSync(accessoryCsvPath);
    const accessoryCsv = iconv.decode(accessoryBuffer, encoding);
    const accessoryRows = parseCSV(accessoryCsv);

    const accessoryJsonData = accessoryRows.map(row => {
        // 清理所有字段的 \r
        row = row.map(c => (c || '').replace(/\r/g, ''));
        while (row.length < 10) row.push('');
        const imgVal = row[9].trim();
        row[9] = imgVal ? 'ACC/' + imgVal : '';

        return { Count: 10, value: row.slice(0, 10) };
    });

    console.log(`  accessory_data.csv: ${accessoryJsonData.length} 条记录`);
    writeDataJs(
        path.join(__dirname, 'scripts', 'accessory_data.js'),
        'IDBOM_ACCESSORY_DATA',
        accessoryJsonData,
        'ID-BOM 配件产品数据\n * 数据来源：accessory_data.csv（海康机器人配件产品清单）\n * 更新方式：修改 accessory_data.csv 后运行 `node import_csv.js`'
    );

    // ===== 3. 映射数据（mapping.csv）=====
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

    // ===== 完成 =====
    console.log('\n导入完成！');
    console.log('已生成以下 JS 数据文件:');
    console.log('  - camera_data.js    (IDBOM_CAMERA_DATA)');
    console.log('  - accessory_data.js (IDBOM_ACCESSORY_DATA)');
    if (fs.existsSync(mappingCsvPath)) {
        console.log('  - mapping_data.js   (IDBOM_MAPPING_DATA)');
    }

    // ===== 4. 生成缩略图 =====
    console.log('\n生成缩略图...');
    try {
        require('child_process').execSync('node resize.js --thumb', {
            cwd: __dirname,
            stdio: 'inherit'
        });
    } catch (e) {
        console.log('缩略图生成失败（可手动运行 node resize.js --thumb）');
    }

    console.log('\n刷新 index.html 即可加载最新数据。');
}

// 运行主函数
main();
