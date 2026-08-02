// 版本号：更新代码后改这里，会清除旧缓存重新缓存
const CACHE_NAME = 'ddl-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// 缓存优先：命中缓存直接返回，未命中才走网络
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(hit) {
      return hit || fetch(e.request);
    })
  );
});
