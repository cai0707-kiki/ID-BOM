/**
 * Service Worker — 图片缓存策略（持久化版本）
 *
 * 策略：Cache First, then Network with Stale-While-Revalidate
 *   1. 请求图片时先查缓存，命中则立即返回（毫秒级）
 *   2. 后台异步检查图片是否有更新（每次请求时验证）
 *   3. 有更新则重新缓存，下次访问使用新版本
 *   4. 除非手动清除浏览器缓存，否则图片一直可用
 *
 * 缓存范围：IMG/ 目录下的所有 .png 图片
 * 缓存位置：浏览器 Cache Storage
 * 版本控制：修改 CACHE_VERSION 可强制刷新所有缓存
 */

var CACHE_VERSION = '1.0.0';
var CACHE_NAME = 'id-bom-img-' + CACHE_VERSION;

// ===== Install =====
self.addEventListener('install', function(event) {
    // 立即激活，不等待旧 SW 退出
    self.skipWaiting();
});

// ===== Activate =====
self.addEventListener('activate', function(event) {
    // 清理旧版本缓存（当版本号变更时）
    event.waitUntil(
        caches.keys().then(function(names) {
            var currentCacheName = CACHE_NAME;
            return Promise.all(
                names.filter(function(name) {
                    // 只删除不同版本的缓存，保留当前版本
                    return name !== currentCacheName && name.startsWith('id-bom-img-');
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        }).then(function() {
            // 立即控制所有客户端
            return self.clients.claim();
        })
    );
});

// ===== 辅助：判断是否为 IMG 目录图片 =====
function isImageRequest(url) {
    return /\/IMG\/.*\.(png|jpg|jpeg|webp)/i.test(url);
}

// ===== 辅助：从 URL 提取图片名称 =====
function getImageName(url) {
    var parts = url.split('/');
    return parts[parts.length - 1];
}

// ===== Fetch =====
self.addEventListener('fetch', function(event) {
    var url = event.request.url;

    // 只拦截 IMG 目录下的图片请求
    if (!isImageRequest(url)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(cached) {
                var fetchPromise = fetch(event.request).then(function(networkResponse) {
                    // 网络请求成功，更新缓存（为下次访问准备）
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(function() {
                    // 网络失败，且无缓存时返回占位图
                    if (!cached) {
                        return new Response(
                            '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42">'
                            + '<rect width="42" height="42" fill="#f1f5f9" rx="4"/>'
                            + '<text x="21" y="24" text-anchor="middle" fill="#cbd5e1" font-size="10">N/A</text>'
                            + '</svg>',
                            { headers: { 'Content-Type': 'image/svg+xml' } }
                        );
                    }
                    return cached;
                });

                // 如果有缓存，立即返回缓存（Cache First）
                if (cached) {
                    // 但后台依然发起网络请求更新缓存（Stale-While-Revalidate）
                    event.waitUntil(
                        fetchPromise.then(function(response) {
                            // 网络请求成功，已在上面的 fetchPromise 中更新缓存
                            // 这里只需要记录即可
                        }).catch(function() {
                            // 网络请求失败，不影响用户看到的缓存图片
                        })
                    );
                    return cached;
                }

                // 无缓存，走网络
                return fetchPromise;
            });
        })
    );
});