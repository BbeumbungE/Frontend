/* eslint-disable */
// install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('font-cache').then((cache) => {
      return cache.addAll([
        // 여기에 폰트 파일의 URL을 추가합니다.
        'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindExtraBold.woff',
        'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindRegular.woff',
        'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff',
        // 필요한 다른 폰트 파일도 추가할 수 있습니다.
      ]);
    }),
  );
});

// activate event
self.addEventListener('activate', (e) => {
  // console.log('[Service Worker] actived', e);
});

// fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});

// update event
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
