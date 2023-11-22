const CACHE_NAME = 'v1_cache_JoseHernandezPWA';

var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024x1024.png',
    './img/favicon-512x512.png',
    './img/favicon-384x384.png',
    './img/favicon-256x256.png',
    './img/favicon-192x192.png',
    './img/favicon-128x128.png',
    './img/favicon-96x96.png',
    './img/favicon-64x64.png',
    './img/favicon-32x32.png',
    './img/favicon-16x16.png'
];

// Evento install
// Instalación del service worker

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => {
                self.skipWaiting();
            });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

// Evento activate
//Que la app funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {

                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        // Borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Activar cache
            self.clients.claim();
        })
    );
});

//Evento fetch

self.addEventListener('fetch', e => {
    e.responWith(
        caches.match(e.request)
        .then(res => {
            if(res) {
                return res;
            }
            return fetch(e.request);
        })
    );
});
