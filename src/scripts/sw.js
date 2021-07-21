/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
// import 'regenerator-runtime';
// import CacheHelper from './utils/cache-helper';

// const { assets } = global.serviceWorkerOption;

try {
  navigator.serviceWorker
    .register('./dist/sw.js')
    .then(() => { console.log('Registered service worker!'); });
} catch (error) {
  console.log('Failed to register service worker', error);
}

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

self.addEventListener('install', (e) => {
  console.log('install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('caching app shell...');
      return cache.addAll(filesToCache);
    }),
  );
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

self.addEventListener('fetch', (e) => {
  console.log('fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        console.log('retrieving from cache...');
        return response;
      }
      console.log('retrieving from URL...');
      return fetch(e.request).catch((e) => {
        console.log('fetch request failed!');
      });
    }),
  );
});
