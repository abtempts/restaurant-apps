/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import '../styles/nav.css';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/App';
import swRegister from './utils/sw-register';
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
