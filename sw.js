/* ============================================================
   IRREGULARS — sw.js (v2: auto-limpieza + red primero)
   ============================================================ */

const VERSION = "irregulars-v2-" + Date.now(); // cambia siempre
const CACHE = "irregulars-v2";

/* ------------------------------------------------------------
   INSTALL — no precachea nada, solo se activa
   ------------------------------------------------------------ */
self.addEventListener("install", function (event) {
  self.skipWaiting(); // activar inmediatamente
});

/* ------------------------------------------------------------
   ACTIVATE — borra TODAS las cachés antiguas
   ------------------------------------------------------------ */
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          console.log("[SW] Borrando caché vieja:", key);
          return caches.delete(key);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ------------------------------------------------------------
   FETCH — red primero, caché solo como fallback offline
   ------------------------------------------------------------ */
self.addEventListener("fetch", function (event) {
  var req = event.request;

  // Solo GET
  if (req.method !== "GET") return;

  // Navegación: red primero, si falla → caché → index.html
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(function () {
        return caches.match("./index.html").then(function (r) {
          return r || new Response("Offline", { status: 503 });
        });
      })
    );
    return;
  }

  // Mismo origen: red primero, caché solo si falla
  var url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req).then(function (networkRes) {
        // Guardar copia para offline
        var copy = networkRes.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(req, copy).catch(function () {});
        });
        return networkRes;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || new Response("", { status: 503 });
        });
      })
    );
    return;
  }

  // Otros dominios: dejar pasar
});