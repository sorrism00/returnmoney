self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('currency-calculator-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json', // 매니페스트 파일도 캐시합니다.
        'https://unpkg.com/react@18/umd/react.production.min.js',
        'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
        'https://unpkg.com/@babel/standalone/babel.min.js',
        'https://cdn.tailwindcss.com',
        'https://placehold.co/180x180/0f172a/fff?text=CC' // 아이콘 이미지도 캐시합니다.
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
