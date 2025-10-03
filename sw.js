self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('currency-calculator-v1').then((cache) => {
      // GitHub Pages 하위 디렉토리 경로에 맞게 모든 캐시 경로를 수정합니다.
      return cache.addAll([
        '/',             // PWA의 시작 URL (index.html이 있는 경로)
        '/index.html',
        '/manifest.json',
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
