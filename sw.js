self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('currency-calculator-v1').then((cache) => {
      return cache.addAll([
        '/returnmoney/', // PWA 시작 URL
        '/returnmoney/index.html',
        '/returnmoney/manifest.json',
        '/returnmoney/sw.js', // Service Worker 스크립트 자체도 캐시
        'https://unpkg.com/react@18/umd/react.production.min.js',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        'https://unpkg.com/@babel/standalone/babel.min.js',
        'https://cdn.tailwindcss.com',
        'https://placehold.co/180x180/0f172a/fff?text=CC' // PWA 아이콘도 캐시
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
