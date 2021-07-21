/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const { assets } = global.serviceWorkerOption;

self.addEventListener('install', (event) => {
  console.log('Breakpoint sw.js: install');
  event.waitUntil(CacheHelper.cachingAppShell([...assets, './restaurant-apps/']));
});

self.addEventListener('activate', (event) => {
  console.log('Breakpoint sw.js: active');
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  console.log('Breakpoint sw.js: fetch');
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
