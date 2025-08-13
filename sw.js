const CACHE='yujen-pages-v1';
const CORE=[
  './index.html','./editor.html','./manifest.webmanifest',
  './icon-192.png','./icon-256.png','./icon-512.png','./apple-icon-180.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===location.origin){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{if(e.request.method==='GET'){caches.open(CACHE).then(c=>c.put(e.request,resp.clone()))}return resp})))}});