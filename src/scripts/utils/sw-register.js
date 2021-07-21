// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker
    //   .register('./dist/sw.js')
    //   .then(() => { console.log('Registered service worker!'); });
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
