self.addEventListener('install', (event) => {
  event.waitUntil(
    // 캐시 이름 변경: currency-calculator-v1 -> currency-calculator-v2
    // 버전을 올려야 아이폰이 변경된 index.html을 새로 내려받습니다.
    caches.open('currency-calculator-v8').then((cache) => {
      return cache.addAll([
        '/returnmoney/',
        '/returnmoney/index.html',
        '/returnmoney/manifest.json',
        '/returnmoney/sw.js',
        'https://unpkg.com/@babel/standalone/babel.min.js',
        '/returnmoney/icon-192x192.png',
        '/returnmoney/icon-512x512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['currency-calculator-v8'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
