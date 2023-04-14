const CACHE_NAME = 'naruto-runner-cache-v2'

const URLS = ['/']
const BLACKLISTED_URLS = ['/oauth?']

const isUrlBlacklisted = url =>
  BLACKLISTED_URLS.some(item => url.indexOf(item) !== -1)

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)

      .then(cache => {
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('fetch', event => {
  if (event.request.method === 'GET' && !isUrlBlacklisted(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response
        }

        const fetchRequest = event.request.clone()
        return fetch(fetchRequest)
          .then(response => {
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic' ||
              event.request.url.startsWith('http') ||
              event.request.url.startsWith('chrome-extension')
            ) {
              return response
            }

            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache)
            })
            return response
          })
          .catch(err => {
            console.log(err)
            throw err
          })
      })
    )
  }
})

self.addEventListener('activate', event => {
  const cacheKeeplist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})
