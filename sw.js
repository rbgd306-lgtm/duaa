// Cache all app files for offline use
const CACHE_NAME = 'duaa-app-v1';
const FILES_TO_CACHE = [
  'index.html'
];

// Install event: cache all files
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate event: cleanup old caches
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
