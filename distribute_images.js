#!/usr/bin/env node

/**
 * 图片分发脚本
 * 
 * 功能：根据 id/sc camera/accessory 数据文件中的图片字段，
 *       将图片自动分发到对应的子目录：
 *       - ID相机图片 → IMG/ID_CAM/
 *       - ID配件图片 → IMG/ID_ACC/
 *       - SC相机图片 → IMG/SC_CAM/
 *       - SC配件图片 → IMG/SC_ACC/
 * 
 * 用法：
 *   node distribute_images.js                    # 扫描 IMG 根目录，分发到子目录
 *   node distribute_images.js --dir ./photos     # 指定源目录
 *   node distribute_images.js --dry-run          # 预览模式，不实际移动文件
 */

const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const IMG_DIR = path.join(SCRIPT_DIR, 'IMG');
const SUPPORTED_EXT = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'];

// ==================== 数据加载 ====================

function loadIdCameraImgNames() {
    const names = new Set();
    try {
        const src = fs.readFileSync(path.join(SCRIPT_DIR, 'scripts', 'id_camera_data.js'), 'utf8');
        const match = src.match(/IDBOM_CAMERA_DATA\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
            const data = eval(match[1]);
            data.forEach(r => {
                if (r.value && r.value[25]) {
                    const v = r.value[25].trim();
                    if (v) names.add(v.replace(/^(ID_CAM\/|ID_ACC\/)/, ''));
                }
            });
        }
    } catch (e) {
        console.error('读取 id_camera_data.js 失败:', e.message);
    }
    return names;
}

function loadIdAccessoryImgNames() {
    const names = new Set();
    try {
        const src = fs.readFileSync(path.join(SCRIPT_DIR, 'scripts', 'id_accessory_data.js'), 'utf8');
        const match = src.match(/IDBOM_ACCESSORY_DATA\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
            const data = eval(match[1]);
            data.forEach(r => {
                if (r.value && r.value[9]) {
                    const v = r.value[9].trim();
                    if (v) names.add(v.replace(/^(ID_CAM\/|ID_ACC\/)/, ''));
                }
            });
        }
    } catch (e) {
        console.error('读取 id_accessory_data.js 失败:', e.message);
    }
    return names;
}

function loadScCameraImgNames() {
    const names = new Set();
    try {
        const src = fs.readFileSync(path.join(SCRIPT_DIR, 'scripts', 'sc_camera_data.js'), 'utf8');
        const match = src.match(/SCBOM_CAMERA_DATA\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
            const data = eval(match[1]);
            data.forEach(r => {
                if (r.value && r.value[25]) {
                    const v = r.value[25].trim();
                    if (v) names.add(v.replace(/^(SC_CAM\/|SC_ACC\/)/, ''));
                }
            });
        }
    } catch (e) {
        console.error('读取 sc_camera_data.js 失败:', e.message);
    }
    return names;
}

function loadScAccessoryImgNames() {
    const names = new Set();
    try {
        const src = fs.readFileSync(path.join(SCRIPT_DIR, 'scripts', 'sc_accessory_data.js'), 'utf8');
        const match = src.match(/SCBOM_ACCESSORY_DATA\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
            const data = eval(match[1]);
            data.forEach(r => {
                if (r.value && r.value[9]) {
                    const v = r.value[9].trim();
                    if (v) names.add(v.replace(/^(SC_CAM\/|SC_ACC\/)/, ''));
                }
            });
        }
    } catch (e) {
        console.error('读取 sc_accessory_data.js 失败:', e.message);
    }
    return names;
}

// ==================== 文件扫描 ====================

function getImageFiles(dir) {
    const files = [];
    try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isFile() && SUPPORTED_EXT.includes(path.extname(fullPath).toLowerCase())) {
                files.push(fullPath);
            }
        }
    } catch (e) {
        console.error(`读取目录失败: ${dir}`, e.message);
    }
    return files;
}

// ==================== 主逻辑 ====================

function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const dirIdx = args.indexOf('--dir');
    const sourceDir = dirIdx >= 0 ? args[dirIdx + 1] : IMG_DIR;

    console.log('='.repeat(50));
    console.log('  图片分发工具');
    console.log('='.repeat(50));
    console.log(`源目录: ${sourceDir}`);
    console.log(`模式: ${dryRun ? '预览（不移动文件）' : '执行'}`);
    console.log();

    // 加载数据
    const idCamNames = loadIdCameraImgNames();
    const idAccNames = loadIdAccessoryImgNames();
    const scCamNames = loadScCameraImgNames();
    const scAccNames = loadScAccessoryImgNames();
    console.log(`数据匹配：ID_CAM ${idCamNames.size} 条，ID_ACC ${idAccNames.size} 条，SC_CAM ${scCamNames.size} 条，SC_ACC ${scAccNames.size} 条`);
    console.log();

    // 扫描源目录中的图片
    const files = getImageFiles(sourceDir);
    console.log(`找到 ${files.length} 个图片文件`);
    console.log();

    // 分发统计
    const stats = { idCam: 0, idAcc: 0, scCam: 0, scAcc: 0, shared: 0, skip: 0, unknown: 0 };

    for (const filePath of files) {
        const fileName = path.basename(filePath, path.extname(filePath));
        
        // 跳过已在子目录中的文件
        const relativePath = path.relative(sourceDir, filePath);
        if (relativePath.includes(path.sep)) {
            stats.skip++;
            continue;
        }

        // 相机：不共享
        let targetSubDirs = [];
        if (idCamNames.has(fileName)) {
            targetSubDirs = ['ID_CAM'];
            stats.idCam++;
        } else if (scCamNames.has(fileName)) {
            targetSubDirs = ['SC_CAM'];
            stats.scCam++;
        } else {
            // 配件：检查是否公共配件
            const inIdAcc = idAccNames.has(fileName);
            const inScAcc = scAccNames.has(fileName);
            if (inIdAcc && inScAcc) {
                targetSubDirs = ['ID_ACC', 'SC_ACC'];
                stats.shared++;
            } else if (inIdAcc) {
                targetSubDirs = ['ID_ACC'];
                stats.idAcc++;
            } else if (inScAcc) {
                targetSubDirs = ['SC_ACC'];
                stats.scAcc++;
            } else {
                stats.unknown++;
                continue;
            }
        }

        for (const targetSubDir of targetSubDirs) {
            const targetDir = path.join(IMG_DIR, targetSubDir);
            const targetPath = path.join(targetDir, path.basename(filePath));

            if (dryRun) {
                console.log(`[预览] ${fileName}${path.extname(filePath)} → ${targetSubDir}/`);
            } else {
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                try {
                    fs.copyFileSync(filePath, targetPath);
                    console.log(`[复制] ${fileName}${path.extname(filePath)} → ${targetSubDir}/`);
                } catch (e) {
                    console.error(`[失败] ${fileName}: ${e.message}`);
                }
            }
        }
    }

    console.log();
    console.log('='.repeat(50));
    console.log(`统计：`);
    console.log(`  ID相机图片: ${stats.idCam}`);
    console.log(`  ID配件图片: ${stats.idAcc}`);
    console.log(`  SC相机图片: ${stats.scCam}`);
    console.log(`  SC配件图片: ${stats.scAcc}`);
    console.log(`  公共配件（同时放入ID_ACC和SC_ACC）: ${stats.shared}`);
    console.log(`  跳过（已在子目录）: ${stats.skip}`);
    console.log(`  未匹配: ${stats.unknown}`);
    console.log('='.repeat(50));
}

main();
