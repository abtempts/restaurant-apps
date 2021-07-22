/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
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
const version = '1.0.0';
const CACHE_NAME = `restaurant-apps-${version}`;
const assetsToCache = [
  '/restaurant-apps/dist/defaultVendors~main~678f84af.bundle.js',
  '/restaurant-apps/dist/defaultVendors~main~d939e436.bundle.js',
  '/restaurant-apps/dist/main~29d6ecf2.bundle.js',
  '/restaurant-apps/dist/manifest.json',
  '/restaurant-apps/dist/icons/ico-32.png',
  '/restaurant-apps/dist/icons/ico-48.png',
  '/restaurant-apps/dist/icons/ico-64.png',
  '/restaurant-apps/dist/icons/ico-72.png',
  '/restaurant-apps/dist/icons/ico-96.png',
  '/restaurant-apps/dist/icons/ico-128.png',
  '/restaurant-apps/dist/icons/ico-256.png',
  '/restaurant-apps/dist/icons/ico-512.png',
  '/restaurant-apps/index.html',
];

// this.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll([
//         '/',
//         '/dist/defaultVendors~main~678f84af.bundle.js',
//         '/dist/defaultVendors~main~d939e436.bundle.js',
//         '/dist/main~29d6ecf2.bundle.js',
//         '/dist/manifest.json',
//         // '/dist/icons/ico-128.png',
//         // '/dist/icons/ico-256.png',
//         // '/dist/icons/ico-32.png',
//         // '/dist/icons/ico-48.png',
//         // '/dist/icons/ico-512.png',
//         // '/dist/icons/ico-64.png',
//         // '/dist/icons/ico-72.png',
//         // '/dist/icons/ico-96.png',
//         // '/index.html'
//       ]);
//     }),
//   );
// });
// var APP_PREFIX = 'ApplicationName_'     // Identifier for this app (this needs to be consistent across every cache update)
// var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
// var CACHE_NAME = APP_PREFIX + VERSION
// const URLS = [ // Add URL you want to cache in this list.
//   '/{repository}/', // If you have separate JS/CSS files,
//   '/{repository}/index.html', // add path to those files here
// ];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log(`fetch request : ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log(`responding with cache : ${e.request.url}`);
        return request;
      } // if there are no cache, try fetching request
      console.log(`file is not cached, fetching : ${e.request.url}`);
      return fetch(e.request);

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    }),
  );
});

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log(`installing cache : ${CACHE_NAME}`);
      return cache.addAll(assetsToCache);
    }),
  );
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      const cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf('restaurant-apps');
      });
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log(`deleting cache : ${keyList[i]}`);
          return caches.delete(keyList[i]);
        }
      }));
    }),
  );
});

// self.addEventListener('install', (e) => {
//   console.log('install');
//   e.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       console.log('caching app shell...(/)');
//       return cache.addAll(filesToCache);
//     }),
//   );
// });

// // self.addEventListener('activate', (event) => {
// //   event.waitUntil(CacheHelper.deleteOldCache());
// // });

// self.addEventListener('activate', (e) => {
//   console.log('activate');
//   e.waitUntil(
//     caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
//       if (key !== cacheName) {
//         console.log('removing old cache...', key);
//         return caches.delete(key);
//       }
//     }))),
//   );
//   return self.clients.claim();
// });

// // self.addEventListener('fetch', (event) => {
// //   // service worker bisa menampilkan, bahkan memanipulasi request yang dilakukan client
// //   console.log(event.request);
// //   // self.addEventListener('fetch', (event) => {
// //   event.respondWith(CacheHelper.revalidateCache(event.request));
// // });

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
