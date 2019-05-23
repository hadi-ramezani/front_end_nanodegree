// a variable to hold the cache name
const staticCacheName = "restaurant_static_v1";

// On install event, cache the assets we want
self.addEventListener('install', function(event) {
    const urlsToCache = [
        '/',
        '/index.html',
        '/restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
    ];
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// Take control of the network requests
// The code from https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('fetch', function(event) {
   event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function(response) {
                    // Check if we received a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(staticCacheName).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;

                }
            );
        })
   );
});
// Listen to activate events to update the caches and delete the old ones
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant_') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
       })
    );
});
