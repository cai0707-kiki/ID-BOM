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
    const cameraCsvPath = path.join(__dirname, 'id_camera_data.csv');
    const accessoryCsvPath = path.join(__dirname, 'id_accessory_data.csv');
    const mappingCsvPath = path.join(__dirname, 'mapping.csv');

    // 确保 scripts/ 目录存在
    const scriptsDir = path.join(__dirname, 'scripts');
    if (!fs.existsSync(scriptsDir)) {
        fs.mkdirSync(scriptsDir, { recursive: true });
        console.log('创建 scripts/ 目录');
    }

    // ===== 1. 相机数据 =====
    if (!fs.existsSync(cameraCsvPath)) {
        console.log('错误: 未找到 id_camera_data.csv');
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
        row[25] = imgVal ? imgVal.replace(/^(CAM\/|ACC\/)/, '') : '';
        return { Count: 26, value: row.slice(0, 26) };
    });

    console.log(`  id_camera_data.csv: ${cameraJsonData.length} 条记录`);
    writeDataJs(
        path.join(__dirname, 'scripts', 'id_camera_data.js'),
        'IDBOM_CAMERA_DATA',
        cameraJsonData,
        'ID-BOM 相机产品数据\n * 数据来源：id_camera_data.csv（海康机器人相机产品清单）\n * 更新方式：修改 id_camera_data.csv 后运行 `node import_csv.js`'
    );

    // ===== 2. 配件数据 =====
    if (!fs.existsSync(accessoryCsvPath)) {
        console.log('错误: 未找到 id_accessory_data.csv');
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
        row[9] = imgVal ? imgVal.replace(/^(CAM\/|ACC\/)/, '') : '';

        return { Count: 10, value: row.slice(0, 10) };
    });

    console.log(`  id_accessory_data.csv: ${accessoryJsonData.length} 条记录`);
    writeDataJs(
        path.join(__dirname, 'scripts', 'id_accessory_data.js'),
        'IDBOM_ACCESSORY_DATA',
        accessoryJsonData,
        'ID-BOM 配件产品数据\n * 数据来源：id_accessory_data.csv（海康机器人配件产品清单）\n * 更新方式：修改 id_accessory_data.csv 后运行 `node import_csv.js`'
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

    // ===== 4. 产品动态（product_updates.csv）=====
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
    console.log('  - id_camera_data.js    (IDBOM_CAMERA_DATA)');
    console.log('  - id_accessory_data.js (IDBOM_ACCESSORY_DATA)');
    if (fs.existsSync(mappingCsvPath)) {
        console.log('  - mapping_data.js      (IDBOM_MAPPING_DATA)');
    }
    if (fs.existsSync(productUpdatesCsvPath)) {
        console.log('  - product_updates.js   (IDBOM_PRODUCT_UPDATES)');
    }

    // ===== 5. 同步所有数据到 offline.html =====
    const offlineHtmlPath = path.join(__dirname, 'Download', 'offline.html');
    if (fs.existsSync(offlineHtmlPath)) {
        console.log('\n同步数据到 offline.html...');
        let offlineHtml = fs.readFileSync(offlineHtmlPath, 'utf-8');

        // 解析JS数组的辅助函数
        function parseJsArray(jsContent, varName) {
            const regex = new RegExp('var ' + varName + ' = \\[([\\s\\S]*?)\\];');
            const match = jsContent.match(regex);
            if (!match) return [];
            const arrayStr = '[' + match[1] + ']';
            return JSON.parse(arrayStr);
        }

        // 同步 embeddedData (相机+配件)
        const cameraJsPath = path.join(__dirname, 'scripts', 'id_camera_data.js');
        const accessoryJsPath = path.join(__dirname, 'scripts', 'id_accessory_data.js');
        if (fs.existsSync(cameraJsPath) && fs.existsSync(accessoryJsPath)) {
            const cameraJs = fs.readFileSync(cameraJsPath, 'utf-8');
            const accessoryJs = fs.readFileSync(accessoryJsPath, 'utf-8');
            const cameraData = parseJsArray(cameraJs, 'IDBOM_CAMERA_DATA');
            const accessoryData = parseJsArray(accessoryJs, 'IDBOM_ACCESSORY_DATA');
            const allData = [...cameraData, ...accessoryData];

            const embeddedLines = allData.map((item, i) => {
                const line = JSON.stringify(item);
                return i < allData.length - 1 ? line + ',' : line;
            });
            const embeddedStr = '[\n' + embeddedLines.map(l => '    ' + l).join('\n') + '\n]';

            const embeddedRegex = /<script id="embeddedData" type="application\/json">\s*\[[\s\S]*?\]\s*<\/script>/;
            if (offlineHtml.match(embeddedRegex)) {
                offlineHtml = offlineHtml.replace(embeddedRegex, '<script id="embeddedData" type="application/json">\n' + embeddedStr + '\n</script>');
                console.log('  已同步 embeddedData: ' + allData.length + ' 条 (相机' + cameraData.length + ' + 配件' + accessoryData.length + ')');
            }
        }

        // 同步 updatesData (产品动态)
        if (productUpdatesJsonData.length > 0) {
            const updatesLines = productUpdatesJsonData.map((item, i) => {
                const line = JSON.stringify(item);
                return i < productUpdatesJsonData.length - 1 ? line + ',' : line;
            });
            const updatesStr = '[\n' + updatesLines.join('\n') + '\n    ]';

            const updatesRegex = /var updatesData = \[[\s\S]*?\];/;
            if (offlineHtml.match(updatesRegex)) {
                offlineHtml = offlineHtml.replace(updatesRegex, 'var updatesData = ' + updatesStr + ';');
                console.log('  已同步 updatesData: ' + productUpdatesJsonData.length + ' 条');
            }
        }

        // 同步 mappingData (对照表)
        const mappingJsPath = path.join(__dirname, 'scripts', 'mapping_data.js');
        if (fs.existsSync(mappingJsPath)) {
            const mappingJs = fs.readFileSync(mappingJsPath, 'utf-8');
            const mappingData = parseJsArray(mappingJs, 'IDBOM_MAPPING_DATA');

            if (mappingData.length > 0) {
                const mappingLines = mappingData.map((item, i) => {
                    const line = JSON.stringify(item);
                    return i < mappingData.length - 1 ? line + ',' : line;
                });
                const mappingStr = '[\n' + mappingLines.join('\n') + '\n    ]';

                const mappingRegex = /var mappingData = \[[\s\S]*?\];/;
                if (offlineHtml.match(mappingRegex)) {
                    offlineHtml = offlineHtml.replace(mappingRegex, 'var mappingData = ' + mappingStr + ';');
                    console.log('  已同步 mappingData: ' + mappingData.length + ' 条');
                }
            }
        }

        fs.writeFileSync(offlineHtmlPath, offlineHtml, 'utf-8');
        console.log('  offline.html 更新完成');
    }

    console.log('\n刷新 index.html 即可加载最新数据。');
}

// 运行主函数
main();
