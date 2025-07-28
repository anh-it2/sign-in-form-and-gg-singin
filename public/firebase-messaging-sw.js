// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAXCj-3sYnxSO0UPJw4IPSe6dhovDyrgJ4",
  authDomain: "notify-7abec.firebaseapp.com",
  projectId: "notify-7abec",
  storageBucket: "notify-7abec.firebasestorage.app",
  messagingSenderId: "613957802448",
  appId: "1:613957802448:web:81256159c4070e351e41d5",
  measurementId: "G-40G9N92V85"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image
  };

  await fetch(`${self.location.origin}/api/notify/saveNotification`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      title: notificationTitle,
      body: notificationOptions.body,
      image: notificationOptions.image ?? null
    })
  })

  // self.registration.showNotification(notificationTitle, notificationOptions)
  
});
// self.addEventListener('notificationclick',function(e) {
//   const urlToOpen = new URL('/',self.location.origin)
//   urlToOpen.searchParams.set('notify-title', e.notification.title)
//   urlToOpen.searchParams.set('notify-body',e.notification.body)
//   urlToOpen.searchParams.set('notify-image', e.notification.image)
//   e.notification.close()

//   e.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
//       for (const client of clientList) {
//         if (client.url === urlToOpen.href && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       return clients.openWindow(urlToOpen.href);
//     })
//   );
// })
