// sw.js 파일 수정
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('currency-calculator-v1').then((cache) => {
      return cache.addAll([
        '/returnmoney/',
        '/returnmoney/index.html',
        '/returnmoney/manifest.json',
        '/returnmoney/sw.js',
        'https://unpkg.com/react@18/umd/react.production.min.js',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        'https://unpkg.com/@babel/standalone/babel.min.js',
        // 'https://cdn.tailwindcss.com', // 이 줄을 제거하거나 주석 처리
        'https://placehold.co/180x180/0f172a/fff?text=CC'
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
