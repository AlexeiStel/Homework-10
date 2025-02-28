const staticCacheName = "static-site-v1"; 
const dinamicCacheName = "dinamic-site-v1"; 

const ASSETS = [
    '/',
    'index.html',
    'offline.html',
    '/src/features/common/script.js'
]




self.addEventListener('install', async (e) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(ASSETS);
})    


//activate event
self.addEventListener('activate', async (e) => {
    const cachesKeysArr = await caches.keys();
    await Promise.all(cachesKeysArr.filter(key => key !== staticCacheName && key !== dinamicCacheName).map(key => caches.delete(key)));
})

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
})

async function cacheFirst(request) {
    const cached = await caches.match(request);
    try {
        return cached ?? await fetch(request)
           .then(response => {
            return networkFirst(request);
        });        
    } catch (error) {
        return networkFirst(request);
    }
}

async function networkFirst(request) {
    const cache = await caches.open(dinamicCacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        return cached ?? await caches.match('*');
    }
}