/* ============================================================
   IRREGULARS — Service Worker (sw.js)
   ------------------------------------------------------------
   Estrategia:
   - App shell: precache + cache-first
   - Navegación: network-first con fallback a index.html
   - Fuentes Google: stale-while-revalidate
   - Otros GET: cache-first con relleno en background
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURACIÓN
   ------------------------------------------------------------
   Cambia VERSION cada vez que modifiques app.js, styles.css o
   cualquier archivo del app shell para forzar la actualización.
   ------------------------------------------------------------ */
const VERSION = "irregulars-v1.0.2";
const CACHE_STATIC  = `${VERSION}-static`;
const CACHE_RUNTIME = `${VERSION}-runtime`;
const CACHE_FONTS   = `${VERSION}-fonts`;

/* Archivos críticos que deben estar cacheados sí o sí.
   Si cambias nombres de archivos, actualiza esta lista. */
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data-verbs.js",
  "./data-generator.js",
  "./manifest.json",
  "./icons/icon-192.png"
];

/* Dominios cuyas fuentes se cachean con stale-while-revalidate. */
const FONT_HOSTS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com"
];

/* ------------------------------------------------------------
   INSTALL — Precarga del app shell
   ------------------------------------------------------------ */
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_STATIC);
      try {
        await cache.addAll(PRECACHE_URLS);
      } catch (err) {
        // Si algún recurso falla (p. ej. desarrollo con rutas mal),
        // intentamos uno a uno para que el resto sí se cachee.
        console.warn("[SW] Precache parcial:", err);
        await Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch(() => null)
          )
        );
      }
      await self.skipWaiting();
    })()
  );
});

/* ------------------------------------------------------------
   ACTIVATE — Limpieza de cachés antiguas
   ------------------------------------------------------------ */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [CACHE_STATIC, CACHE_RUNTIME, CACHE_FONTS];
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !keep.includes(key))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

/* ------------------------------------------------------------
   FETCH — Enrutado por tipo de recurso
   ------------------------------------------------------------ */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  /* Solo manejamos GET */
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* 1) Navegación (documento HTML) → network-first con fallback offline */
  if (req.mode === "navigate") {
    event.respondWith(handleNavigation(req));
    return;
  }

  /* 2) Fuentes de Google → stale-while-revalidate */
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(handleFonts(req));
    return;
  }

  /* 3) Mismo origen → cache-first con relleno en background */
  if (url.origin === self.location.origin) {
    event.respondWith(handleSameOrigin(req));
    return;
  }

  /* 4) Resto → dejamos pasar sin interceptar */
});

/* ============================================================
   HANDLERS
   ============================================================ */

/* ---------- Navegación ---------- */
async function handleNavigation(req) {
  try {
    const network = await fetch(req);
    // Guardamos una copia fresca del HTML para futuras aperturas offline
    const cache = await caches.open(CACHE_STATIC);
    cache.put("./index.html", network.clone()).catch(() => {});
    return network;
  } catch (err) {
    // Offline: servimos index.html cacheado
    const cached =
      (await caches.match("./index.html")) ||
      (await caches.match("./"));
    if (cached) return cached;

    // Último recurso: respuesta mínima
    return new Response(
      "<!doctype html><meta charset='utf-8'><title>Offline</title><body style='font-family:sans-serif;background:#0a0a0c;color:#f4f4f7;display:flex;align-items:center;justify-content:center;height:100vh;margin:0'><div style='text-align:center'><h1 style='font-weight:800;letter-spacing:-0.02em'>Sin conexión</h1><p style='color:#7a7a89;font-size:14px'>Abre la app una vez con conexión para poder usarla offline.</p></div></body>",
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

/* ---------- Fuentes ---------- */
async function handleFonts(req) {
  const cache = await caches.open(CACHE_FONTS);
  const cached = await cache.match(req);

  const fetchPromise = fetch(req)
    .then((network) => {
      if (network && network.status === 200) {
        cache.put(req, network.clone()).catch(() => {});
      }
      return network;
    })
    .catch(() => cached); // sin red → devolvemos cacheado

  return cached || fetchPromise;
}

/* ---------- Mismo origen ---------- */
async function handleSameOrigin(req) {
  const cached = await caches.match(req, { ignoreSearch: false });
  if (cached) {
    // Relleno en background: si hay red, actualizamos la caché sin bloquear
    refreshInBackground(req);
    return cached;
  }

  try {
    const network = await fetch(req);
    if (network && network.status === 200 && network.type === "basic") {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(req, network.clone()).catch(() => {});
    }
    return network;
  } catch (err) {
    // Si es un asset crítico que no está en caché, devolvemos 503 vacío
    return new Response("", { status: 503, statusText: "Offline" });
  }
}

/* Relleno en background: no bloquea la respuesta al cliente. */
function refreshInBackground(req) {
  fetch(req)
    .then(async (network) => {
      if (network && network.status === 200 && network.type === "basic") {
        const cache = await caches.open(CACHE_STATIC);
        await cache.put(req, network.clone());
      }
    })
    .catch(() => {
      /* sin red → ignoramos, seguimos sirviendo cacheado */
    });
}

/* ============================================================
   MENSAJES DESDE LA APP
   ------------------------------------------------------------
   La app puede enviar { type: "SKIP_WAITING" } tras detectar
   una nueva versión disponible.
   ============================================================ */
self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
