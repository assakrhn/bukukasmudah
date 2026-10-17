// Service Worker Kas Mudah
// PENTING: ganti angka versi di bawah (v2 -> v3, dst.) setiap kali Anda mengubah file aplikasi
// atau menambah/mengganti file logo, agar pengguna mendapat versi terbaru.
const CACHE = 'kas-mudah-v3';

// File inti: wajib ada. Jika salah satu gagal diunduh, instalasi dibatalkan.
const CORE = ['./', './index.html', './manifest.json', './assets/favicon.svg'];

// File logo: opsional. Disimpan satu per satu; bila file belum diunggah, dilewati
// (tidak menggagalkan instalasi sehingga aplikasi tetap bisa dipakai offline).
const LOGOS = ['./assets/logo.svg', './assets/favicon.svg', './assets/logo-dompet.png', './assets/logo-koin.png'];

// Simpan semua file aplikasi saat pertama kali dibuka (precache)
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await Promise.allSettled(LOGOS.map((f) => cache.add(f)));
    await self.skipWaiting();
  })());
});

// Hapus cache versi lama
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Strategi: ambil dari cache dulu (cepat & offline), perbarui cache di latar belakang bila online
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });

    const net = fetch(req)
      .then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      })
      .catch(() => null);

    if (hit) {
      e.waitUntil(net);
      return hit;
    }
    const res = await net;
    if (res) return res;
    if (req.mode === 'navigate') {
      const fallback = await cache.match('./index.html');
      if (fallback) return fallback;
    }
    return Response.error();
  })());
});
