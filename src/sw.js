const CACHE_NAME = "seiki-xkld-v1";
const urlsToCache = [
  "/",
  "/assets/css/templatemo-space-dynamic.css",
  "/assets/css/fontawesome.css",
  "/assets/css/animated.css",
  "/assets/css/owl.css",
  "/assets/images/logo.png",
  "/assets/images/banner-right-image.png",
  "/assets/images/about-left-image.png",
  "/assets/images/portfolio-image.png",
  "/assets/images/service-icon-01.png",
  "/assets/images/service-icon-02.png",
  "/assets/images/service-icon-03.png",
  "/assets/images/service-icon-04.png",
  "/assets/js/templatemo-custom.js",
  "/assets/js/animation.js",
  "/assets/js/tabs.js",
];

// Install service worker
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Update service worker
self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener("sync", function (event) {
  if (event.tag === "contact-form") {
    event.waitUntil(
      // Send any pending contact form data when online
      sendPendingContactForms()
    );
  }
});

function sendPendingContactForms() {
  return new Promise(function (resolve, reject) {
    // Implementation for sending offline form data
    resolve();
  });
}

// Push notification support
self.addEventListener("push", function (event) {
  const options = {
    body: event.data ? event.data.text() : "Thông báo mới từ SEIKI",
    icon: "/assets/images/logo.png",
    badge: "/assets/images/logo.png",
    tag: "seiki-notification",
    actions: [
      {
        action: "view",
        title: "Xem chi tiết",
        icon: "/assets/images/logo.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      "SEIKI - Xuất khẩu lao động Nhật Bản",
      options
    )
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("https://banhanxkld.id.vn/"));
  }
});
