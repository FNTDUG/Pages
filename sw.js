self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (e) {
  var d = {};
  try {
    d = e.data ? e.data.json() : {};
  } catch (x) {
    d = { body: e.data ? e.data.text() : '' };
  }
  var opts = {
    body: d.body || '',
    icon: '/favicon-192.png',
    data: { url: d.url || '/' }
  };
  if (d.tag) opts.tag = d.tag;
  e.waitUntil(self.registration.showNotification(d.title || 'FNTD User Guide', opts));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var target = new URL((e.notification.data && e.notification.data.url) || '/', self.location.origin);
  if (target.origin !== self.location.origin) target = new URL('/', self.location.origin);
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url === target.href && 'focus' in list[i]) return list[i].focus();
    }
    return self.clients.openWindow(target.href);
  }));
});

self.addEventListener('pushsubscriptionchange', function (e) {
  var old = e.oldSubscription;
  var opts = old && old.options ? old.options : null;
  if (!opts) return;
  e.waitUntil(self.registration.pushManager.subscribe(opts).then(function (sub) {
    return fetch('/push/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sub: sub.toJSON(), replaces: old.endpoint })
    });
  }));
});
