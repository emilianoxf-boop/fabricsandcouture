const CACHE='ffc-v2';
const ASSETS=['/','/index.html','/manifest.json','https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('api.anthropic.com')||e.request.url.includes('fonts.googleapis.com')||e.request.url.includes('fonts.gstatic.com'))return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));}return r;})));
});
