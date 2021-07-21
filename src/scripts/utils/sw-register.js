import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Browser tidak mendukung Service Worker');
    return;
  }

  try {
    await navigator.serviceWorker.register('./restaurant-apps/sw.js');
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
  }

  if ('serviceWorker' in navigator) {
    console.log('Breakpoint 1');
    await runtime.register();
    console.log('Breakpoint 2');
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
