const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// ========== CSV 解析函数（原样保留） ==========
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

// ========== CSV 转义函数（原样保留） ==========
function csvEscape(s) {
    if (s == null) s = '';
    s = String(s);
    if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
        return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
}

// ========== 导入 mapping.csv 到 cmpDataJson ==========
function importMappingCsv(htmlContent) {
    const mappingCsvPath = path.join(__dirname, 'mapping.csv');
    if (!fs.existsSync(mappingCsvPath)) {
        console.log('跳过: 未找到 mapping.csv');
        return htmlContent;
    }

    console.log('找到 mapping.csv，正在导入...');
    const encoding = 'GBK';
    const buffer = fs.readFileSync(mappingCsvPath);
    const csvContent = iconv.decode(buffer, encoding);
    const rows = parseCSV(csvContent);

    // 表头：产品系列,基线型号,基线代码,经销型号,经销代码
    const jsonData = [];
    rows.forEach(row => {
        if (row.length >= 5 && row[1] && row[1].trim()) {
            jsonData.push({
                series: (row[0] || '').trim(),
                baseModel: (row[1] || '').trim(),
                baseCode: (row[2] || '').trim(),
                distModel: (row[3] || '').trim(),
                distCode: (row[4] || '').trim()
            });
        }
    });

    if (jsonData.length === 0) {
        console.log('警告: mapping.csv 无有效数据');
        return htmlContent;
    }

    // 紧凑格式：每个对象一行
    const lines = jsonData.map((item, i) => {
        const line = JSON.stringify(item);
        return i < jsonData.length - 1 ? line + ',' : line;
    });
    const jsonStr = '[' + lines.join('\n') + ']';

    // 替换 cmpDataJson
    const startMarker = '<script id="cmpDataJson" type="application/json">';
    const endMarker = '</script>';
    const startIdx = htmlContent.indexOf(startMarker);
    if (startIdx === -1) {
        console.log('警告: HTML中未找到 cmpDataJson，跳过');
        return htmlContent;
    }
    const endIdx = htmlContent.indexOf(endMarker, startIdx + startMarker.length);
    if (endIdx === -1) {
        console.log('警告: cmpDataJson 标签未闭合，跳过');
        return htmlContent;
    }

    htmlContent = htmlContent.substring(0, startIdx + startMarker.length) +
        '\n' + jsonStr + '\n    ' + htmlContent.substring(endIdx);

    console.log(`  - 导入 mapping.csv: ${jsonData.length} 条数据`);
    return htmlContent;
}

// ========== 主函数 ==========
function main() {
    console.log('=== CSV导入工具 ===\n');

    // 检查CSV文件是否存在
    const cameraCsvPath = path.join(__dirname, 'camera_data.csv');
    const accessoryCsvPath = path.join(__dirname, 'accessory_data.csv');

    if (!fs.existsSync(cameraCsvPath)) {
        console.log('错误: 未找到 camera_data.csv');
        console.log('请确保CSV文件在脚本同级目录下');
        process.exit(1);
    }

    if (!fs.existsSync(accessoryCsvPath)) {
        console.log('错误: 未找到 accessory_data.csv');
        console.log('请确保CSV文件在脚本同级目录下');
        process.exit(1);
    }

    console.log('找到CSV文件:');
    console.log(`  - camera_data.csv`);
    console.log(`  - accessory_data.csv\n`);

    // ===== 修改点：使用 iconv-lite 按 GBK 解码（假设来自 Windows 环境） =====
    // 如果文件实际是 UTF-8，可将 'GBK' 改为 'UTF-8'
    const encoding = 'GBK';

    const cameraBuffer = fs.readFileSync(cameraCsvPath);
    const accessoryBuffer = fs.readFileSync(accessoryCsvPath);

    const cameraCsv = iconv.decode(cameraBuffer, encoding);
    const accessoryCsv = iconv.decode(accessoryBuffer, encoding);

    const cameraData = parseCSV(cameraCsv);
    const accessoryData = parseCSV(accessoryCsv);

    console.log(`相机数据: ${cameraData.length} 条记录`);
    console.log(`配件数据: ${accessoryData.length} 条记录\n`);

    // 转换为JSON格式
    const jsonData = [];

    // 相机数据（25列格式）
    cameraData.forEach(row => {
        // 确保每行有25个字段
        while (row.length < 25) {
            row.push('');
        }
        jsonData.push({
            Count: 25,
            value: row.slice(0, 25)
        });
    });

    // 配件数据（9列格式）
    accessoryData.forEach(row => {
        // 确保每行有9个字段
        while (row.length < 9) {
            row.push('');
        }
        jsonData.push({
            Count: 9,
            value: row.slice(0, 9)
        });
    });

    console.log(`总数据条数: ${jsonData.length}\n`);

    // 格式化JSON（每个对象一行）
    const lines = ['['];
    for (let i = 0; i < jsonData.length; i++) {
        const line = JSON.stringify(jsonData[i]);
        if (i < jsonData.length - 1) {
            lines.push(line + ',');
        } else {
            lines.push(line);
        }
    }
    lines.push(']');

    const formattedJson = lines.join('\n');

    // 读取HTML文件
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // 替换嵌入数据
    const startMarker = '<script id="embeddedData" type="application/json">';
    const endMarker = '</script>';

    const startIdx = htmlContent.indexOf(startMarker);
    const endIdx = htmlContent.indexOf(endMarker, startIdx);

    if (startIdx === -1 || endIdx === -1) {
        console.log('错误: HTML文件中未找到嵌入数据');
        process.exit(1);
    }

    const newHtmlContent = htmlContent.substring(0, startIdx + startMarker.length) +
        '\n' + formattedJson + '\n    ' + htmlContent.substring(endIdx);

    // 导入 mapping.csv
    let finalHtml = importMappingCsv(newHtmlContent);

    // 备份原HTML文件
    const backupPath = path.join(__dirname, 'index_backup_' + Date.now() + '.html');
    fs.copyFileSync(htmlPath, backupPath);
    console.log(`原HTML已备份为: ${path.basename(backupPath)}\n`);

    // 写入新HTML（以 UTF-8 编码）
    fs.writeFileSync(htmlPath, finalHtml, 'utf-8');

    console.log('\n导入完成！');
    console.log(`HTML文件已更新: ${path.basename(htmlPath)}`);
}

// 运行主函数
main();