/* ============================================================
   IRREGULARS — sw.js (v3)
   Red primero, caché como fallback offline. Auto-limpieza.
   Soporta index.html y grammar.html.
   ============================================================ */

const CACHE = "irregulars-v3";

/* ------------------------------------------------------------
   INSTALL — activar inmediatamente
   ------------------------------------------------------------ */
self.addEventListener("install", function () {
  self.skipWaiting();
});

/* ------------------------------------------------------------
   ACTIVATE — borrar todas las cachés antiguas
   ------------------------------------------------------------ */
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE) {
            console.log("[SW] Borrando caché vieja:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ------------------------------------------------------------
   FETCH — red primero, caché como fallback
   ------------------------------------------------------------ */
self.addEventListener("fetch", function (event) {
  var req = event.request;

  // Solo GET
  if (req.method !== "GET") return;

  var url = new URL(req.url);

  // Ignorar peticiones a otros orígenes (fuentes Google, etc.)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navegación (HTML)
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(function (res) {
        // Guardar copia actualizada
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(req, copy).catch(function () {});
        });
        return res;
      }).catch(function () {
        // Fallback offline: intentar la misma URL en caché,
        // y si no, servir el HTML correspondiente.
        return caches.match(req).then(function (cached) {
          if (cached) return cached;
          var fallback = /grammar\.html/.test(req.url)
            ? "./grammar.html"
            : "./index.html";
          return caches.match(fallback).then(function (r) {
            return r || new Response("Offline", {
              status: 503,
              headers: { "Content-Type": "text/plain" }
            });
          });
        });
      })
    );
    return;
  }

  // Recursos estáticos (CSS, JS, imágenes, fuentes locales)
  event.respondWith(
    fetch(req).then(function (res) {
      // Solo cachear respuestas válidas
      if (!res || res.status !== 200 || res.type === "opaque") {
        return res;
      }
      var copy = res.clone();
      caches.open(CACHE).then(function (cache) {
        cache.put(req, copy).catch(function () {});
      });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || new Response("", { status: 503 });
      });
    })
  );
});

/* ------------------------------------------------------------
   MENSAJES — permitir que el cliente pida skipWaiting
   ------------------------------------------------------------ */
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});