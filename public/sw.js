// Hand-written service worker (no Workbox/next-pwa dependency — consistent
// with the project's minimal-dependency approach, see DECISIONS.md #8-9, 19).
//
// Strategy:
// - Navigations (HTML pages): network-first, falling back to cache, falling
//   back to a static /offline page if nothing is cached yet.
// - Same-origin static assets (_next/static/*, icons, manifest): cache-first,
//   since hashed build assets never change content under the same URL.
// - Everything else (cross-origin, API-ish): pass through to the network.
//
// CACHE_VERSION must be bumped whenever precached content should be
// refreshed — there's no build-time asset hashing wired into this file
// (no bundler plugin), so it's a manual bump. See DECISIONS.md.
const CACHE_VERSION = "v1";
const CACHE_NAME = `book-library-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("book-library-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.json"
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first with cache + offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(
          () =>
            caches.match(request).then((cached) => cached) ||
            caches.match("/offline")
        )
    );
    return;
  }

  // Hashed static assets: cache-first.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
      )
    );
    return;
  }

  // Everything else: try cache, fall back to network.
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
