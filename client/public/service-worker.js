/* eslint-disable */
// install event
self.addEventListener('install', (e) => {
  console.log('[Service Worker] installed');
});

// activate event
self.addEventListener('activate', (e) => {
  // console.log('[Service Worker] actived', e);
});

// fetch event
self.addEventListener('fetch', (e) => {
  // console.log(`[Service Worker] fetched resource ${e.request.url}`);
});

// update event
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
