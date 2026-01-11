self.addEventListener('install', (event) => {
  event.waitUntil(
    // 반응형 레이아웃 업데이트 반영 v14
    caches.open('currency-calculator-v14').then((cache) => {
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
  const cacheWhitelist = ['currency-calculator-v14'];
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
