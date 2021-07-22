/* eslint-disable func-names */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
// import 'regenerator-runtime';
// import CacheHelper from './utils/cache-helper';

// const { assets } = global.serviceWorkerOption;

// try {
//   navigator.serviceWorker
//     .register('./dist/sw.js')
//     .then(() => { console.log('Registered service worker!'); });
// } catch (error) {
//   console.log('Failed to register service worker', error);
// }

// self.addEventListener('install', (event) => {
//   event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
// });
const cacheName = 'restaurant-apps-v1';
const filesToCache = [
  '/dist/defaultVendors~main~678f84af.bundle.js',
  '/dist/defaultVendors~main~d939e436.bundle.js',
  '/dist/main~29d6ecf2.bundle.js',
  '/dist/manifest.json',
  '/dist/icons/ico-128.png',
  '/dist/icons/ico-256.png',
  '/dist/icons/ico-32.png',
  '/dist/icons/ico-48.png',
  '/dist/icons/ico-512.png',
  '/dist/icons/ico-64.png',
  '/dist/icons/ico-72.png',
  '/dist/icons/ico-96.png',
  '/index.html',
];

const fetchFromMainServer = function (request, options = {}) {
  /* wrap over fetch. The problem with fetch here, it doesn't reject properly sometimes
  see if statement below */
  return fetch(request, options).then((fetchResponse) => {
    // console.log("fetchFromMainServer:", fetchResponse.ok, fetchResponse);
    // logInTheUI([request, options]);
    if ((!fetchResponse) || (!fetchResponse.ok)) {
      return Promise.reject('fetch failed');
    }
    return fetchResponse;
  });
};

const fetchFromCache = function (request) {
  return caches.open(CACHE_VERSION).then((cache) => cache.match(request).then((CacheResponse) => {
    // console.log("fetchFromCache:", CacheResponse.ok, CacheResponse);
    if ((!CacheResponse) || (!CacheResponse.ok)) {
      return Promise.reject('Not in Cache');
    }
    return CacheResponse;
  }));
};

self.addEventListener('install', (e) => {
  console.log('install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('caching app shell... (scripts)');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  /* fetchEvent interface FetchEvent
  see https://www.w3.org/TR/service-workers/#fetch-event-interface
  IMPORTANT: fetchEvent.respondWith must be called inside this handler immediately
  synchronously fetchEvent.respondWith must be called with a response object or a
  promise that resolves with a response object. if fetchEvent.respondWith is called
  later in a callback the browser will take over and asks the remote server directly, do not do that
  why have fetchEvent.respondWith( and not respond with the return value of the callback function ?
  -->
  It allows to do other thing before killing the service worker, like saving stuff in cache
  */
  const { request } = fetchEvent;// Request implements Body;
  // const requestClone = request.clone(); //no need to clone ?
  const { url } = request;
  if (logLater) {
    logLater.forEach(logInTheUI);
    logLater = undefined;
  }
  // logInTheUI(["fetch service worker " + SERVICE_WORKER_VERSION, fetchEvent]);
  // Needs to activate to handle fetch
  if (isLocalURL(url)) {
    // Normal Fetch

    if (request.method === 'POST') {
      // logInTheUI(["POST ignored", request]);
      return;
    }

    // logInTheUI(["Normal Fetch"]);
    fetchEvent.respondWith(
      fetchFromCache(request.clone()).then((cacheResponse) =>
        /* cannot use request again from here, use requestClone */
        // console.log(request, url);
        cacheResponse).catch((reason) =>
        // We don't have it in the cache, fetch it
        // logInTheUI(fetchEvent);
        fetchFromMainServer(request)).then((mainServerResponse) => {
        if (isAppPage(url)) {
          return mainServerResponse;
        }
        return latePutToCache(request, mainServerResponse).catch(
          (reason) =>
            /* failed to put in cache do not propagate catch, not important enough */
            mainServerResponse
          ,
        );
      })
        .catch((reason) => {
          if (isAppPage(url)) {
          // if it is the landing page that is asked
            return useOfflineAlternative();
          // todo if we are offline , display /offline directly
          }
          return Promise.reject(reason);
        }),
    );
  } else {
    // Peer to peer Fetch
    // console.log(SERVICE_WORKER_VERSION, "rtc fetch" url:", fetchEvent.request.url);
    // request, url are defined
    const { method } = request;
    const requestHeaders = request.headers;

    // logInTheUI(["Special Fetch"]);
    const customRequestObject = {
      header: {
        fileName: url.substring(url.indexOf('rtc/') + rtcLength),
        method,
      },
      body: '',
    };
    requestHeaders.forEach((value, key) => {
      // value, key correct order
      // is there a standard way to use Object.assign with Map like iterables ?
      // todo handle duplicates
      // https://fetch.spec.whatwg.org/#terminology-headers
      customRequestObject.header[key] = value;
    });

    // console.log(request);
    fetchEvent.respondWith(
      /* should provide the peer the full request */
      request.arrayBuffer().then((bodyAsArrayBuffer) => {
        const { bodyUsed } = request;
        if (bodyUsed && bodyAsArrayBuffer) {
          customRequestObject.body = bodyAsArrayBuffer;
        }
      }).catch((reason) => {
        /* console.log("no body sent, a normal GET or HEAD request has no body",
              reason); */
      }).then((notUsed) => fetchFromPeerToPeer(customRequestObject))
        .then((response) => {
          const responseInstance = new Response(response.body, {
            headers: response.header,
            status: response.header.status || 200,
            statusText: response.header.statusText || 'OK',
          });

          return responseInstance;
        })
        .catch((error) => {
          const responseInstance = new Response(`<html><p>${error}</p></html>`,
            {
              headers: {
                'Content-type': 'text/html',
              },
              status: 500,
              statusText: 'timedout',
            });

          return responseInstance;
        }),
    );
  }

  /* here we could do more with event.waitUntil() */
});
// self.addEventListener('activate', (event) => {
//   event.waitUntil(CacheHelper.deleteOldCache());
// });

self.addEventListener('activate', (e) => {
  console.log('activate');
  e.waitUntil(
    caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        console.log('removing old cache...', key);
        return caches.delete(key);
      }
    }))),
  );
  return self.clients.claim();
});

// self.addEventListener('fetch', (event) => {
//   // service worker bisa menampilkan, bahkan memanipulasi request yang dilakukan client
//   console.log(event.request);
//   // self.addEventListener('fetch', (event) => {
//   event.respondWith(CacheHelper.revalidateCache(event.request));
// });

// self.addEventListener('fetch', (e) => {
//   console.log('fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       if (response) {
//         console.log('retrieving from cache...');
//         return response;
//       }
//       console.log('retrieving from URL...');
//       return fetch(e.request).catch((e) => {
//         console.log('fetch request failed!');
//       });
//     }),
//   );
// });
