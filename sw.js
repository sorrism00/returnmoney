self.addEventListener('install', (event) => {
  event.waitUntil(
    // 캐시 명칭 버전을 v38로 상승시켜 단말기 캐시 완전 무효화
    caches.open('currency-calculator-v38').then((cache) => {
      return cache.addAll([
        '/returnmoney/',
        '/returnmoney/index.html',
        '/returnmoney/manifest.json',
        '/returnmoney/sw.js',
        'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.12/babel.min.js',
        '/returnmoney/icon-192x192.png',
        '/returnmoney/icon-512x512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['currency-calculator-v38'];
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
