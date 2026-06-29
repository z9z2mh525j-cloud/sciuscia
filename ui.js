/* ===== Sciuscià — componenti UI condivisi (card + aggiungi al carrello) ===== */

// Template di una card prodotto (usato in home e collezione)
function cardProdotto(p){
  const tag = p.nuovo
    ? `<span class="card-tag card-tag-nuovo">Nuovo</span>`
    : (p.tag ? `<span class="card-tag">${p.tag}</span>` : "");
  return `
    <article class="card">
      <a class="card-link" href="prodotto.html?id=${p.id}" aria-label="${p.nome}">
        <div class="card-img">
          ${tag}
          <span class="card-frase">${p.frase}</span>
          <span class="card-marchio">Sciuscià · Collezione 2026</span>
        </div>
      </a>
      <div class="card-corpo">
        <a class="card-link" href="prodotto.html?id=${p.id}">
          <h3 class="card-nome">${p.nome}</h3>
        </a>
        <p class="card-desc">${p.desc}</p>
        <div class="card-piede">
          <span class="card-prezzo">${euro(p.prezzo)}</span>
          <button class="card-aggiungi" data-aggiungi="${p.id}">Aggiungi</button>
        </div>
      </div>
    </article>`;
}

// Delego il click "aggiungi" da qualsiasi card o pagina prodotto
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-aggiungi]");
  if (!btn) return;
  const qtaInput = document.getElementById("qtaProdotto");
  const qta = qtaInput ? parseInt(qtaInput.value, 10) || 1 : 1;
  aggiungiAlCarrello(btn.dataset.aggiungi, qta);
});
