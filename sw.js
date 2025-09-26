const CACHE_NAME = 'gerenciador-funerario-v1';
// Lista de arquivos essenciais para o funcionamento offline do app
const URLS_TO_CACHE = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
  'https://cdn.tailwindcss.com', // Cache do Tailwind CSS
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' // Cache do Font Awesome
];

// Evento de instalação: chamado quando o Service Worker é registrado pela primeira vez
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto. Adicionando arquivos do App Shell.');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Evento de fetch: chamado toda vez que a página tenta buscar um recurso (arquivo, imagem, etc.)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o recurso for encontrado no cache, retorna ele
        if (response) {
          return response;
        }
        // Se não, busca na rede
        return fetch(event.request);
      })
  );
});