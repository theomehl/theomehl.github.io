// Offline first assets
let coreAssets = [
	'/fonts/Figtree.woff2',
	'/fonts/Figtree-Italic.woff2',
	'/offline/',
	'/favicon.png',
]

// Listen for the install event
self.addEventListener('install', function (event) {
    // Activate immediately
	self.skipWaiting();

    // Cache the offline page 
    event.waitUntil(caches.open('app').then(function (cache) {
        for (let asset of coreAssets) {
			cache.add(new Request(asset));
		}
        return cache;
    }));
});

// Listen for request events
self.addEventListener('fetch', function (event) {

	// Get the request
	let request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    // HTML files - Network first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {
				return response;
			}).catch(function (error) {
				return caches.match('/offline/');
			})
		);
		return;
	}

	// Fonts and images - Cache first
	if (request.headers.get('Accept').includes('image') || request.url.includes('Figtree')) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {
					return response; 
				});
			})
		);
	}
});