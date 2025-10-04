self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('currency-calculator-v1').then((cache) => {
      return cache.addAll([
        '/returnmoney/', // PWA 시작 URL
        '/returnmoney/index.html',
        '/returnmoney/manifest.json',
        '/returnmoney/sw.js', // Service Worker 스크립트 자체도 캐시
        'https://unpkg.com/@babel/standalone/babel.min.js',
        // 'https://unpkg.com/react@18.2.0/umd/react.production.min.js', // CORS 문제 우회를 위해 제거
        // 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js', // CORS 문제 우회를 위해 제거
        // 'https://cdn.tailwindcss.com', // 이전에 제거됨
        '/returnmoney/icon-192x192.png', // 새로 추가된 아이콘 캐시
        '/returnmoney/icon-512x512.png'  // 새로 추가된 아이콘 캐시
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
