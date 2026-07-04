importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyCy2dUVbcTuDOOlZYxPpVG0QZ_ndBkOPSQ",
  authDomain: "star-chat-eccce.firebaseapp.com",
  databaseURL: "https://star-chat-eccce-default-rtdb.firebaseio.com",
  projectId: "star-chat-eccce",
  storageBucket: "star-chat-eccce.firebasestorage.app",
  messagingSenderId: "1038533846042",
  appId: "1:1038533846042:web:1284cea0d75961bdb05da3"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  const title = n.title || 'Star Chat';
  const options = {
    body: n.body || 'New notification',
    icon: 'logo.png',
    badge: 'logo.png',
    data: payload.data || {},
    vibrate: [200,100,200]
  };
  self.registration.showNotification(title, options);
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){ if('focus' in c) return c.focus(); }
    if(clients.openWindow) return clients.openWindow('/');
  }));
});
