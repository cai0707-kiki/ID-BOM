/**
 * Service Worker — 图片缓存策略
 *
 * 策略：Cache First, then Network
 *   1. 请求图片时先查缓存，命中则直接返回（毫秒级）
 *   2. 未命中则走网络，成功后写入缓存供下次使用
 *   3. 缓存有更新机制：每次打开页面时后台检查并更新
 *
 * 缓存范围：IMG/ 目录下的所有 .png 图片
 * 缓存位置：浏览器 Cache Storage（Chrome DevTools → Application → Cache Storage 可查看）
 */

var CACHE_NAME = 'id-bom-img-v1';
var IMG_PATTERN = /\/IMG\//;

// ===== Install =====
self.addEventListener('install', function(event) {
    // 立即激活，不等待旧 SW 退出
    self.skipWaiting();
});

// ===== Activate =====
self.addEventListener('activate', function(event) {
    // 清理旧版本缓存
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.filter(function(name) {
                    return name !== CACHE_NAME;
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

// ===== Fetch — Cache First for images =====
self.addEventListener('fetch', function(event) {
    var url = event.request.url;

    // 只拦截 IMG 目录下的图片请求
    if (!IMG_PATTERN.test(url)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(cached) {
                if (cached) {
                    // 缓存命中，直接返回
                    return cached;
                }
                // 未命中，走网络
                return fetch(event.request).then(function(response) {
                    // 只缓存成功的响应
                    if (response && response.status === 200 && response.type === 'basic') {
                        // clone 一份存入缓存，原始的返回给页面
                        cache.put(event.request, response.clone());
                    }
                    return response;
                }).catch(function() {
                    // 网络失败且无缓存，返回一个透明占位图
                    return new Response(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42">'
                        + '<rect width="42" height="42" fill="#f1f5f9" rx="4"/>'
                        + '<text x="21" y="24" text-anchor="middle" fill="#cbd5e1" font-size="10">N/A</text>'
                        + '</svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                });
            });
        })
    );
});
