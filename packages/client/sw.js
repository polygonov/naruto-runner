const CACHE_NAME = 'naruto-runner-cache-v2';

const URLS = [
  '/',
]

this.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)

      .then(cache => {
        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
              if(!response
                || response.status !== 200
                || response.type !== 'basic'
                || event.request.url.startsWith('http')
                || event.request.url.startsWith('chrome-extension')) {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }
          );
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheKeeplist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});