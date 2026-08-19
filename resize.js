#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 支持的图片扩展名
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'];

/**
 * 递归获取所有图片文件路径
 */
function getImageFiles(dir, fileList = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getImageFiles(fullPath, fileList);
        } else if (stat.isFile() && SUPPORTED_EXT.includes(path.extname(fullPath).toLowerCase())) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

/**
 * 调整图片分辨率
 */
async function resizeImages(inputDir, outputDir, targetWidth, targetHeight, keepRatio, overwrite) {
    if (!fs.existsSync(inputDir)) {
        console.error(`输入目录不存在: ${inputDir}`);
        process.exit(1);
    }

    const isOverwrite = !outputDir;
    const outRoot = outputDir || inputDir;

    if (!isOverwrite && !fs.existsSync(outRoot)) {
        fs.mkdirSync(outRoot, { recursive: true });
    }

    const files = getImageFiles(inputDir);
    if (files.length === 0) {
        console.log('未找到任何支持的图片文件。');
        return;
    }

    console.log(`共找到 ${files.length} 张图片，开始处理...`);

    let processed = 0,
        skipped = 0,
        failed = 0;

    for (const srcPath of files) {
        const relDir = path.relative(inputDir, path.dirname(srcPath));
        const destDir = isOverwrite ? path.dirname(srcPath) : path.join(outRoot, relDir);
        const fileName = path.basename(srcPath);
        const destPath = path.join(destDir, fileName);

        if (!isOverwrite && !overwrite && fs.existsSync(destPath)) {
            console.log(`跳过已存在: ${destPath}`);
            skipped++;
            continue;
        }

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        try {
            const img = sharp(srcPath);
            const metadata = await img.metadata();

            let pipeline;
            if (keepRatio) {
                // 保持宽高比，不足部分用白色填充
                pipeline = img.resize(targetWidth, targetHeight, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 1 }  // ← 改为白色
                });
            } else {
                pipeline = img.resize(targetWidth, targetHeight, {
                    fit: 'fill'
                });
            }

            await pipeline.toFile(destPath);
            console.log(`已处理: ${srcPath} -> ${destPath} (${metadata.width}x${metadata.height} -> ${targetWidth}x${targetHeight})`);
            processed++;
        } catch (err) {
            console.error(`处理失败: ${srcPath}`, err.message);
            failed++;
        }
    }

    console.log(`\n处理完成！成功: ${processed}, 跳过: ${skipped}, 失败: ${failed}`);
}

// ---------- 命令行参数解析 ----------
const args = process.argv.slice(2);
let inputDir, outputDir, width, height, keepRatio = true,
    overwrite = false;

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-i' || arg === '--input') {
        inputDir = args[++i];
    } else if (arg === '-o' || arg === '--output') {
        outputDir = args[++i];
    } else if (arg === '-W' || arg === '--width') {
        width = parseInt(args[++i], 10);
    } else if (arg === '-H' || arg === '--height') {
        height = parseInt(args[++i], 10);
    } else if (arg === '--no-keep-ratio') {
        keepRatio = false;
    } else if (arg === '-f' || arg === '--force') {
        overwrite = true;
    } else if (arg === '-h' || arg === '--help') {
        console.log(`
用法: node resize.js -i <输入目录> -o <输出目录> -W <宽度> -H <高度> [选项]

选项:
  -i, --input         输入文件夹路径（必填）
  -o, --output        输出文件夹路径（不指定则覆盖原文件）
  -W, --width         目标宽度（像素，必填）
  -H, --height        目标高度（像素，必填）
  --no-keep-ratio     不保持宽高比（默认保持），图片将被拉伸至目标尺寸
  -f, --force         强制覆盖已存在的文件（默认跳过）
  -h, --help          显示此帮助信息

示例:
  node resize.js -i ./IMG -o ./NEW -W 360 -H 360
  node resize.js -i ./IMG -W 360 -H 360 --no-keep-ratio -f
        `);
        process.exit(0);
    }
}

if (!inputDir || !width || !height) {
    console.error('错误: 必须指定输入目录、宽度和高度。');
    console.log('使用 -h 查看帮助。');
    process.exit(1);
}

resizeImages(inputDir, outputDir, width, height, keepRatio, overwrite).catch(console.error);