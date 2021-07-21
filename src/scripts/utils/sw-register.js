// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    // await runtime.register();
    console.log('sw-register.js breakpoint1');
    navigator.serviceWorker.register('https://abtempts.github.io/restaurant-apps/dist/sw.js');
    console.log('sw-register.js breakpoint2');
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
