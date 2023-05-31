this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('beer-app-cache').then((cache) => {
      return cache.addAll(['/', '/index.html', '/manifest.json']);
    })
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== 'beer-app-cache')
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
