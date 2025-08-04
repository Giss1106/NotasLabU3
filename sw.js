self.addEventListener('install', (event) => {
    console.info("Service Worker installed");
});

self.addEventListener('activate', (event) => {
    console.info("Service Worker activated");
});