/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import '../styles/nav.css';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/App';
// import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import WebSocketInitiator from './utils/websocket-initiator';
import CONFIG from './globals/config';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

window.addEventListener('DOMContentLoaded', () => {
  app.renderPage();
  // swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});

try {
  navigator.serviceWorker
    .register('./dist/sw.js')
    .then(() => { console.log('Registered service worker!'); });
} catch (error) {
  console.log('Failed to register service worker', error);
}

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

self.addEventListener('fetch', (e) => {
  console.log('fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        console.log('retrieving from cache...');
        return response;
      }
      console.log('retrieving from URL...');
      return fetch(e.request).catch(() => {
        console.log('fetch request failed!');
      });
    }),
  );
});
