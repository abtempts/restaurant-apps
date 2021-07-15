const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    NotifHelper.sendNotification({
      title: 'Notification from WebSocket',
      options: {
        body: message.data,
        icon: 'icon/ico-128.png',
        image: 'https://source.unsplash.com/random/800x600',
        vibrate: [100, 50, 100],
      },
    });
  },
};

export default WebSocketInitiator;
