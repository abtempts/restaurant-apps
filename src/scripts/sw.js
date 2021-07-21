/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
const version = '1.0.0';
const CACHE_NAME = `mypwa-${version}`;
const assetsToCache = [
  '/restaurant-apps',
  '/restaurant-apps/dist/index.html',
  '/restaurant-apps/dist/manifest.json',
  // '/main.js',
  '/restaurant-apps/dist/defaultVendors~main~678f84af.bundle.js',
  '/restaurant-apps/dist/defaultVendors~main~d939e436.bundle.js',
  '/restaurant-apps/dist/main~29d6ecf2.bundle.js',
  '/restaurant-apps/dist/manifest.json',
  '/restaurant-apps/dist/icons/ico-128.png',
  '/restaurant-apps/dist/icons/ico-256.png',
  '/restaurant-apps/dist/icons/ico-32.png',
  '/restaurant-apps/dist/icons/ico-48.png',
  '/restaurant-apps/dist/icons/ico-512.png',
  '/restaurant-apps/dist/icons/ico-64.png',
  '/restaurant-apps/dist/icons/ico-72.png',
  '/restaurant-apps/dist/icons/ico-96.png',
  '/index.html',
];

self.addEventListener('install', (event) => {
  console.log('Installing service worker....');

  // menyimpan appshell ke caches API
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => caches.addAll(assetsToCache)),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activating service worker...');

  // menghapus caches lama
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cachesNames.filter((name) => name !== CACHE_NAME)
          .map((filteredName) => caches.delete(filteredName)),
      )),
  );
});
// /* eslint-disable no-restricted-globals */
// import 'regenerator-runtime';
// import CacheHelper from './utils/cache-helper';

// const { assets } = global.serviceWorkerOption;

// self.addEventListener('install', (event) => {
//   console.log('Breakpoint sw.js: install');
//   event.waitUntil(CacheHelper.cachingAppShell([...assets, './restaurant-apps/']));
// });

// self.addEventListener('activate', (event) => {
//   console.log('Breakpoint sw.js: active');
//   event.waitUntil(CacheHelper.deleteOldCache());
// });

// self.addEventListener('fetch', (event) => {
//   console.log('Breakpoint sw.js: fetch');
//   event.respondWith(CacheHelper.revalidateCache(event.request));
// });
