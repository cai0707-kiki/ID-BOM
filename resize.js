#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 支持的图片扩展名
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'];

// PIC 专用文件名（不含扩展名）
const PIC_NAMES = ['dmv', 'mvlab', 'wmv'];

/**
 * 从 camera_data.js / accessory_data.js 提取 IMG 文件名集合
 */
function getDataImgNames() {
    const camNames = new Set();
    const accNames = new Set();

    // 读取 camera_data.js
    try {
        const camSrc = fs.readFileSync(path.join(__dirname, 'scripts', 'camera_data.js'), 'utf8');
        const camMatch = camSrc.match(/IDBOM_CAMERA_DATA\s*=\s*(\[[\s\S]*?\]);/);
        if (camMatch) {
            const camData = eval(camMatch[1]);
            camData.forEach(r => {
                const v = (r.value[25] || '').trim();
                if (v) camNames.add(v.replace(/^(CAM\/|ACC\/)/, ''));
            });
        }
    } catch (e) {}

    // 读取 accessory_data.js
    try {
        const accSrc = fs.readFileSync(path.join(__dirname, 'scripts', 'accessory_data.js'), 'utf8');
        const accMatch = accSrc.match(/IDBOM_ACCESSORY_DATA\s*=\s*(\[[\s\S]*?\]);/);
        if (accMatch) {
            const accData = eval(accMatch[1]);
            accData.forEach(r => {
                const v = (r.value[9] || '').trim();
                if (v) accNames.add(v.replace(/^(CAM\/|ACC\/)/, ''));
            });
        }
    } catch (e) {}

    return { camNames, accNames };
}

/**
 * 根据文件名判断目标子目录：CAM / ACC / PIC
 */
function resolveSubDir(nameNoExt, camNames, accNames) {
    if (PIC_NAMES.includes(nameNoExt.toLowerCase())) return 'PIC';
    if (camNames.has(nameNoExt)) return 'CAM';
    if (accNames.has(nameNoExt)) return 'ACC';
    // 默认放 ACC
    return 'ACC';
}

/**
 * 递归获取所有图片文件路径
 */
function getImageFiles(dir, fileList = []) {
    let items;
    try {
        items = fs.readdirSync(dir);
    } catch (e) {
        return fileList;
    }
    for (const item of items) {
        const fullPath = path.join(dir, item);
        try {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                getImageFiles(fullPath, fileList);
            } else if (stat.isFile() && SUPPORTED_EXT.includes(path.extname(fullPath).toLowerCase())) {
                fileList.push(fullPath);
            }
        } catch (e) {
            // 跳过无法访问的文件（权限错误、断链等）
        }
    }
    return fileList;
}

/**
 * 调整图片分辨率（自动按文件名分发到 CAM/ACC/PIC 子目录）
 */
async function resizeImages(inputDir, outputDir, targetWidth, targetHeight, keepRatio, overwrite) {
    if (!fs.existsSync(inputDir)) {
        console.error(`输入目录不存在: ${inputDir}`);
        process.exit(1);
    }

    const { camNames, accNames } = getDataImgNames();
    console.log(`数据匹配：CAM ${camNames.size} 条，ACC ${accNames.size} 条`);

    const outRoot = outputDir || inputDir;

    const files = getImageFiles(inputDir);
    if (files.length === 0) {
        console.log('未找到任何支持的图片文件。');
        return;
    }

    console.log(`共找到 ${files.length} 张图片，开始处理...\n`);

    let processed = 0, skipped = 0, failed = 0;
    const destMap = {};

    for (const srcPath of files) {
        const fileName = path.basename(srcPath);
        const nameNoExt = path.basename(srcPath, path.extname(srcPath));

        // 判断目标子目录
        const subDir = resolveSubDir(nameNoExt, camNames, accNames);
        const destDir = path.join(outRoot, subDir);
        const destPath = path.join(destDir, fileName);

        if (!overwrite && fs.existsSync(destPath)) {
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
                pipeline = img.resize(targetWidth, targetHeight, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 1 }
                });
            } else {
                pipeline = img.resize(targetWidth, targetHeight, {
                    fit: 'fill'
                });
            }

            await pipeline.toFile(destPath);
            destMap[subDir] = (destMap[subDir] || 0) + 1;
            processed++;
        } catch (err) {
            console.error(`  失败: ${fileName} -> ${subDir}/ - ${err.message}`);
            failed++;
        }
    }

    console.log(`\n处理完成！成功: ${processed}, 跳过: ${skipped}, 失败: ${failed}`);
    for (const [dir, count] of Object.entries(destMap)) {
        console.log(`  ${dir}/: ${count} 张`);
    }
}

/**
 * 生成缩略图（各自目录下 THUMB/，CAM/ACC: 80x80, PIC: 120x120）
 */
async function generateThumbs(imgRoot) {
    const sources = [
        { dir: path.join(imgRoot, 'CAM'), size: 80, label: 'CAM' },
        { dir: path.join(imgRoot, 'ACC'), size: 80, label: 'ACC' },
        { dir: path.join(imgRoot, 'PIC'), size: 120, label: 'PIC' }
    ];

    let total = 0, done = 0, skipped = 0;

    for (const s of sources) {
        if (!fs.existsSync(s.dir)) continue;
        const files = fs.readdirSync(s.dir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
        total += files.length;
    }

    console.log(`共 ${total} 张图片，生成缩略图...\n`);

    for (const s of sources) {
        if (!fs.existsSync(s.dir)) continue;

        const thumbDir = path.join(s.dir, 'THUMB');
        if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

        const files = fs.readdirSync(s.dir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

        for (const file of files) {
            const src = path.join(s.dir, file);
            const dest = path.join(thumbDir, file);

            if (fs.existsSync(dest)) {
                skipped++;
                continue;
            }

            try {
                await sharp(src)
                    .resize(s.size, s.size, {
                        fit: 'contain',
                        background: { r: 241, g: 245, b: 249, alpha: 1 }
                    })
                    .png()
                    .toFile(dest);
                done++;
                if (done % 20 === 0) console.log(`  进度 ${done}/${total - skipped}...`);
            } catch (err) {
                console.error(`  失败: ${s.label}/${file} - ${err.message}`);
            }
        }
    }

    console.log(`\n完成！新生成 ${done} 张，跳过 ${skipped} 张`);
    for (const s of sources) {
        const thumbDir = path.join(s.dir, 'THUMB');
        if (fs.existsSync(thumbDir)) {
            console.log(`  ${s.label}/THUMB: ${fs.readdirSync(thumbDir).length} files`);
        }
    }
}

// ---------- 命令行参数解析 ----------
const args = process.argv.slice(2);

// 检查是否为 --thumb 模式
const thumbIdx = args.indexOf('--thumb');
if (thumbIdx !== -1) {
    const dirIdx = args.indexOf('--dir');
    const imgRoot = (dirIdx !== -1 && args[dirIdx + 1]) ? args[dirIdx + 1] : path.join(__dirname, 'IMG');
    generateThumbs(imgRoot).catch(console.error);
} else {
    let inputDir, outputDir, width, height, keepRatio = true, overwrite = false;

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
用法:
  node resize.js --thumb [--dir <图片根目录>]          生成缩略图
  node resize.js -i <输入目录> -o <输出目录> -W <宽度> -H <高度> [选项]  调整图片尺寸并自动分发

缩略图选项:
  --thumb             生成缩略图模式
  --dir               图片根目录（默认 ./IMG）， CAM/ACC → 80x80, PIC → 120x120

resize 选项:
  -i, --input         输入文件夹路径（必填）
  -o, --output        输出文件夹路径（不指定则覆盖原文件）
  -W, --width         目标宽度（像素，必填）
  -H, --height        目标高度（像素，必填）
  --no-keep-ratio     不保持宽高比（默认保持），图片将被拉伸至目标尺寸
  -f, --force         强制覆盖已存在的文件（默认跳过）
  -h, --help          显示此帮助信息

图片自动分发规则:
  dmv/mvlab/wmv.png   → IMG/PIC/
  camera_data.js 中的文件名 → IMG/CAM/
  accessory_data.js 中的文件名 → IMG/ACC/
  其他 → IMG/ACC/（默认）

示例:
  node resize.js --thumb
  node resize.js --thumb --dir ./IMG
  node resize.js -i ./raw_photos -o ./IMG -W 360 -H 360
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
}