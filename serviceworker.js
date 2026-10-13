const CACHE_NAME = "coffee-pwa-v1";

const APP_SHELL = [
    "./",
    "./index.html",
    "./coffee-detail.html",
    "./manifest.json",
    "./css/style.css",
    "./javascript/coffees.js",
    "./javascript/app.js",
    "./javascript/coffee-detail.js",
    "./images/imagen1.jpg",
    "./images/imagen2.jpg",
    "./images/imagen3.jpg",
    "./images/imagen4.jpg",
    "./images/imagen5.jpg",
    "./images/imagen6.jpg",
    "./images/imagen7.jpg",
    "./images/imagen8.jpg",
    "./images/imagen9.jpg",
    "./images/imagen10.jpg",
    "./images/icons/icon-72x72.jpg",
    "./images/icons/icon-96x96.jpg",
    "./images/icons/icon-128x128.jpg",
    "./images/icons/icon-144x144.jpg",
    "./images/icons/icon-152x152.jpg",
    "./images/icons/icon-192x192.jpg",
    "./images/icons/icon-384x384.jpg",
    "./images/icons/icon-512x512.jpg",
    "./images/icons/icon-72x72.png",
    "./images/icons/icon-96x96.png",
    "./images/icons/icon-128x128.png",
    "./images/icons/icon-144x144.png",
    "./images/icons/icon-152x152.png",
    "./images/icons/icon-192x192.png",
    "./images/icons/icon-384x384.png",
    "./images/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            )
        )
    );
    self.clients.claim();
});

const isCacheableResponse = (response) =>
    response && response.status === 200 && response.type === "basic";

const saveResponse = (request, response) => {
    if (!isCacheableResponse(response)) {
        return response;
    }

    const responseToCache = response.clone();
    caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseToCache);
    });
    return response;
};

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    // Network-first para documentos: intenta obtener la versión más reciente.
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) =>
                    saveResponse(event.request, networkResponse)
                )
                .catch(() => caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || caches.match("./index.html");
                }))
        );
        return;
    }

    // Cache-first para CSS, JavaScript, imágenes y demás recursos estáticos.
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) =>
                saveResponse(event.request, networkResponse)
            );
        })
    );
});