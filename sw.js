// Guarda o jogo no aparelho para funcionar sem internet.
// Quando o jogo mudar, troque o número da versão para os aparelhos baixarem a nova.
const VERSAO = "corte-a-floresta-v6";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icone-192.png", "./icone-512.png",
  "./artes/algas.webp",
  "./artes/algas_especiais.webp",
  "./artes/arvores.webp",
  "./artes/arvores_extra.webp",
  "./artes/especiais_novo.webp",
  "./artes/fundo_abismo.webp",
  "./artes/fundo_arenito.webp",
  "./artes/fundo_aurora.webp",
  "./artes/fundo_basalto.webp",
  "./artes/fundo_betula.webp",
  "./artes/fundo_buraco.webp",
  "./artes/fundo_carvalho.webp",
  "./artes/fundo_cerejeira.webp",
  "./artes/fundo_cristalina.webp",
  "./artes/fundo_gelo.webp",
  "./artes/fundo_ilhas.webp",
  "./artes/fundo_kelp.webp",
  "./artes/fundo_lobby1.webp",
  "./artes/fundo_lobby2.webp",
  "./artes/fundo_lobby3.webp",
  "./artes/fundo_lobby4.webp",
  "./artes/fundo_lobby5.webp",
  "./artes/fundo_lua.webp",
  "./artes/fundo_manha.webp",
  "./artes/fundo_nebulosa.webp",
  "./artes/fundo_nevado.webp",
  "./artes/fundo_orbita.webp",
  "./artes/fundo_outono.webp",
  "./artes/fundo_pinheiro.webp",
  "./artes/fundo_porsol.webp",
  "./artes/fundo_praia.webp",
  "./artes/fundo_profundo.webp",
  "./artes/fundo_recife.webp",
  "./artes/fundo_rocha.webp",
  "./artes/fundo_saturno.webp",
  "./artes/fundo_tempestade.webp",
  "./artes/fundo_tropical.webp",
  "./artes/meteoros.webp",
  "./artes/meteoros_especiais.webp",
  "./artes/nuvens.webp",
  "./artes/nuvens_especiais.webp",
  "./artes/ovos1.webp",
  "./artes/ovos2.webp",
  "./artes/pets1.webp",
  "./artes/pets2.webp",
  "./artes/pets3.webp",
  "./artes/rochas_especiais.webp",
  "./artes/rochas_novas.webp"];

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
