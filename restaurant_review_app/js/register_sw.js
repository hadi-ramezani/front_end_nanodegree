// Register a service worker
if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js')
	.then(function() {
		console.log('Service Worker Registration was successful.');
	})
	.catch(function() {
		console.log('Service Worker Registration was unsuccessful!');
	});
}