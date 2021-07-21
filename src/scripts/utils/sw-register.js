// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    // runtime.register();
    // navigator.serviceWorker.register('dist/sw.js');
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
