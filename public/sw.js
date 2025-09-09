/*
  Simple service worker for aggressive caching with offline support.
  Strategies:
  - HTML: network-first with fallback to cache
  - Static assets (images/fonts/videos): cache-first with stale-while-revalidate
  - API/JSON: stale-while-revalidate
*/

const VERSION = 'v1.0.0';
const HTML_CACHE = 'html-' + VERSION;
const ASSET_CACHE = 'assets-' + VERSION;
const DATA_CACHE = 'data-' + VERSION;

const ASSET_EXTS = [
  '.js','.css','.webp','.webp','.webp','.gif','.svg','.webp','.avif','.ico','.mp4','.pdf','.ttf','.otf','.woff','.woff2'
];

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(ASSET_CACHE).then((cache) => {
      // Precache a few must-have shell assets (best-effort)
      return cache.addAll([
        '/',
        '/b2b.svg',
        '/retro.webp'
      ].filter(Boolean)).catch(() => undefined);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![HTML_CACHE, ASSET_CACHE, DATA_CACHE].includes(k))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isAsset(url) {
  const u = new URL(url, self.location.href);
  return ASSET_EXTS.some((ext) => u.pathname.endsWith(ext)) || u.pathname.startsWith('/_next/');
}

function isData(url) {
  const u = new URL(url, self.location.href);
  return u.pathname.endsWith('.json') || u.pathname.startsWith('/api/');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Bypass non-GET
  if (request.method !== 'GET') return;

  if (isAsset(request.url)) {
    // Cache-first, update in background (stale-while-revalidate)
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const fetchAndPut = fetch(request).then((resp) => {
          if (resp && resp.status === 200) cache.put(request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || fetchAndPut;
      })
    );
    return;
  }

  if (isData(request.url)) {
    // Stale-while-revalidate for data
    event.respondWith(
      caches.open(DATA_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request).then((resp) => {
          if (resp && resp.status === 200) cache.put(request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // HTML/doc requests: network-first with fallback to cache
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          const resp = await fetch(request);
          const cache = await caches.open(HTML_CACHE);
          if (resp && resp.status === 200) cache.put(request, resp.clone());
          return resp;
        } catch (e) {
          const cache = await caches.open(HTML_CACHE);
          const cached = await cache.match(request);
          return cached || caches.match('/');
        }
      })()
    );
  }
});
