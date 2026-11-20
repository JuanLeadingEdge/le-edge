// Leading Edge (LE Edge) - OneSignal service worker for the home-screen app (WO-058).
// Scope /le-edge/. Loads OneSignal's worker, then sets the app icon badge from each push's "badge" value.
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

self.addEventListener('push', function (event) {
  try {
    var p = event.data ? event.data.json() : {};
    var extra = (p.custom && p.custom.a) || p.data || {};
    var n = Number(extra.badge);
    if (!isNaN(n) && self.navigator && self.navigator.setAppBadge) {
      event.waitUntil(n > 0 ? self.navigator.setAppBadge(n) : self.navigator.clearAppBadge());
    }
  } catch (e) { /* badge is best effort; the banner still shows */ }
});
