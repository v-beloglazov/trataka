/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'trataka-cache-v1';
const urlsToCache = [
  '/',
  '/build/bundle.css',
  '/build/bundle.js',
  '/index.html',
  '/global.css',
  '/images/bg-mandala.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});
