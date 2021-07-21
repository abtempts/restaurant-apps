/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const { assets } = global.serviceWorkerOption;

try {
  // navigator.serviceWorker.register('/restaurant-apps/dist/sw.js');
  console.log('Service worker registered');
} catch (error) {
  console.log('Failed to register service worker', error);
}

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  // service worker bisa menampilkan, bahkan memanipulasi request yang dilakukan client
  console.log(event.request);
  // self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
