// Guarda o jogo no aparelho para funcionar sem internet.
// Quando o jogo mudar, troque o número da versão para os aparelhos baixarem a nova.
const VERSAO = "corte-a-floresta-v13";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icone-192.png", "./icone-512.png",
  "./algas.webp",
  "./algas_especiais.webp",
  "./arvores.webp",
  "./arvores_extra.webp",
  "./especiais_novo.webp",
  "./fundo_abismo.webp",
  "./fundo_arenito.webp",
  "./fundo_aurora.webp",
  "./fundo_basalto.webp",
  "./fundo_betula.webp",
  "./fundo_buraco.webp",
  "./fundo_carvalho.webp",
  "./fundo_cerejeira.webp",
  "./fundo_cristalina.webp",
  "./fundo_gelo.webp",
  "./fundo_ilhas.webp",
  "./fundo_kelp.webp",
  "./fundo_lobby1.webp",
  "./fundo_lobby2.webp",
  "./fundo_lobby3.webp",
  "./fundo_lobby4.webp",
  "./fundo_lobby5.webp",
  "./fundo_lua.webp",
  "./fundo_manha.webp",
  "./fundo_nebulosa.webp",
  "./fundo_nevado.webp",
  "./fundo_orbita.webp",
  "./fundo_outono.webp",
  "./fundo_pinheiro.webp",
  "./fundo_porsol.webp",
  "./fundo_praia.webp",
  "./fundo_profundo.webp",
  "./fundo_recife.webp",
  "./fundo_rocha.webp",
  "./fundo_saturno.webp",
  "./fundo_tempestade.webp",
  "./fundo_tropical.webp",
  "./meteoros.webp",
  "./meteoros_especiais.webp",
  "./nuvens.webp",
  "./nuvens_especiais.webp",
  "./ovos1.webp",
  "./ovos2.webp",
  "./pets1.webp",
  "./pets2.webp",
  "./pets3.webp",
  "./rochas_especiais.webp",
  "./rochas_novas.webp"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// primeiro tenta a internet (para pegar a versão nova); sem internet, usa a guardada
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(VERSAO).then((c) => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
