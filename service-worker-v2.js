const CACHE = 'palacelus-pwa-v14';
const CORE = [
  '/',
  '/store.html?v=2',
  '/styles.css',
  '/script.js?sw=v14',
  '/manifest-v2.webmanifest',
  '/pwa-ok-192.png',
  '/pwa-ok-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(async cache => {
        for (const url of CORE) {
          try { await cache.add(new Request(url,{cache:'reload'})); } catch (_) {}
        }
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, {cache:'no-store'})
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || caches.match('/'))
    );
    return;
  }

  if (url.origin === self.location.origin && url.pathname === '/script.js') {
    const fresh = new Request('/script.js?sw=v14', {cache:'reload'});
    event.respondWith(
      fetch(fresh, {cache:'no-store'})
        .then(response => response)
        .catch(() => caches.match('/script.js?sw=v14'))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request, {cache:'no-store'})
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
