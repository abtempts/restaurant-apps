import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    console.log('Breakpoint 1');
    await runtime.register();
    console.log('Breakpoint 2');
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
