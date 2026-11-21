const V='p2p-v1',CORE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok&&(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>hit);return hit||net}))});
