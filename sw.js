const CACHE_NAME = "shae-cleaners-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./order.html",
  "./order.css",
  "./order.js",
  "./pesanan.html",
  "./pesanan.css",
  "./pesanan.js",
  "./promo.html",
  "./promo.css",
  "./promo.js",
  "./akun.html",
  "./akun.css",
  "./akun.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {

        if (cached) {
          return cached;
        }

        return fetch(event.request)
          .then(response => {

            if (
              !response ||
              response.status !== 200 ||
              response.type === "opaque"
            ) {
              return response;
            }

            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, copy);
              });

            return response;

          })
          .catch(() => {

            return caches.match("./index.html");

          });

      })
  );

});
