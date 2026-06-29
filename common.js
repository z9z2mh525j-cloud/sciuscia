/* ===== Sciuscià — catalogo + motore carrello condiviso (tutte le pagine) ===== */

// Catalogo. "nuovo" = appena uscito (mostrato in home). "uscita" = data per ordinare.
const PRODOTTI = [
  {
    id: "sfaccimm",
    nome: "Ch Sfaccimm 'e Cavr",
    frase: "CH SFACCIMM E CAVR",
    desc: "Il manifesto della collezione. Quello che pensi quando 'o sole spacca 'e ppietre.",
    dettaglio: "Il ventaglio che ha dato il nome a tutto. La frase più verace di Napoli, stampata a mano in giallo limone su blu Mediterraneo. Quando alle tre del pomeriggio 'o caldo nun te fa raggiunà, questo è l'unico amico ca te capisce.",
    caratteristiche: ["Stecche in bambù naturale", "Tela 100% cotone", "Apertura 23 cm", "Serigrafia a mano"],
    prezzo: 24.90,
    tag: "Best seller",
    nuovo: true,
    uscita: "2026-06-20",
    colore: "Blu Mediterraneo"
  },
  {
    id: "jamm",
    nome: "Jamme Bell'",
    frase: "JAMME BELL'",
    desc: "Per chi non sta maje fermo. Spiaggia, aperitivo, e po' se vede.",
    dettaglio: "Lo spirito di chi non si ferma mai. Dalla spiaggia all'aperitivo senza guardare l'orologio. Leggerissimo, sta dint''a borsa e nun pesa. 'O ventaglio 'e chi se gode 'a vita.",
    caratteristiche: ["Stecche in bambù naturale", "Tela 100% cotone", "Apertura 23 cm", "Ultraleggero"],
    prezzo: 22.90,
    tag: null,
    nuovo: true,
    uscita: "2026-06-18",
    colore: "Blu Mediterraneo"
  },
  {
    id: "capa",
    nome: "Tien' 'a Capa Fresca",
    frase: "TIEN' 'A CAPA FRESCA",
    desc: "Consiglio 'e nonna in formato ventaglio. Refrigerio garantito.",
    dettaglio: "Il consiglio della nonna che vale per la testa e per la vita. Mantieni la calma e fatti vento. Un classico intramontabile per chi sa che 'a fretta nun porta maje cosa bbona.",
    caratteristiche: ["Stecche in bambù naturale", "Tela 100% cotone", "Apertura 23 cm", "Serigrafia a mano"],
    prezzo: 22.90,
    tag: "Novità",
    nuovo: true,
    uscita: "2026-06-22",
    colore: "Blu notte"
  },
  {
    id: "vesuvio",
    nome: "Sotto 'o Vesuvio",
    frase: "SOTTO 'O VESUVIO",
    desc: "Omaggio 'a montagna nosta. Blu notte e limone, comm''o cielo 'e sera.",
    dettaglio: "Un omaggio alla montagna che ci guarda da sempre. Tonalità blu notte come il cielo di Napoli quando cala il sole sul golfo. Il più elegante della collezione, per chi vuole portarsi un pezzo 'e casa addó va.",
    caratteristiche: ["Stecche in bambù naturale", "Tela 100% cotone", "Apertura 23 cm", "Edizione raffinata"],
    prezzo: 26.90,
    tag: null,
    nuovo: false,
    uscita: "2026-05-30",
    colore: "Blu notte"
  },
  {
    id: "uagliu",
    nome: "Uagliù, Che Calore",
    frase: "UAGLIÙ CHE CALORE",
    desc: "L'estate napoletana riassunta in tre parole. Verace al 100%.",
    dettaglio: "Tre parole e hai detto tutto. L'estate al Sud non si spiega, si vive. Questo ventaglio è la colonna sonora di luglio: ironico, diretto, e ti rinfresca pure.",
    caratteristiche: ["Stecche in bambù naturale", "Tela 100% cotone", "Apertura 23 cm", "Serigrafia a mano"],
    prezzo: 22.90,
    tag: null,
    nuovo: false,
    uscita: "2026-05-28",
    colore: "Blu Mediterraneo"
  },
  {
    id: "ammore",
    nome: "Fatto Cu Ammore",
    frase: "FATTO CU AMMORE",
    desc: "Il più romantico. Perfetto 'a regalo a chi te fa battere 'o core.",
    dettaglio: "Il più dolce di tutti. Perché a Napoli ogni cosa bella si fa cu ammore. Perfetto da regalare a chi ti fa battere il cuore: arriva in scatola caprese col bigliettino dove scrivi tu 'a frase.",
    caratteristiche: ["Stecche in bambù naturale", "Tela 100% cotone", "Apertura 23 cm", "Confezione regalo inclusa"],
    prezzo: 24.90,
    tag: "Regalo",
    nuovo: false,
    uscita: "2026-05-20",
    colore: "Blu Mediterraneo"
  }
];

const euro = n => "€" + n.toFixed(2).replace(".", ",");
const trovaProdotto = id => PRODOTTI.find(p => p.id === id);

// Iniziali del prodotto, usate come "etichetta" nelle miniature
const iniziali = p => p.nome
  .split(/\s+/)
  .filter(w => w.replace(/[^a-zA-Zàèéìòù]/g, "").length > 2)
  .slice(0, 2)
  .map(w => w[0].toUpperCase())
  .join("");

/* ---------- Stato carrello ---------- */
let carrello = JSON.parse(localStorage.getItem("sciuscia_carrello") || "[]");
function salvaCarrello(){ localStorage.setItem("sciuscia_carrello", JSON.stringify(carrello)); }

function aggiungiAlCarrello(id, qta = 1){
  const r = carrello.find(x => x.id === id);
  if (r) r.qta += qta;
  else carrello.push({ id, qta });
  salvaCarrello(); aggiornaCarrello();
  const p = trovaProdotto(id);
  mostraToast(`«${p.nome}» aggiunto al carrello`);
  apriCarrello();
}
function cambiaQta(id, delta){
  const r = carrello.find(x => x.id === id);
  if (!r) return;
  r.qta += delta;
  if (r.qta <= 0) carrello = carrello.filter(x => x.id !== id);
  salvaCarrello(); aggiornaCarrello();
}
function eliminaDalCarrello(id){
  carrello = carrello.filter(x => x.id !== id);
  salvaCarrello(); aggiornaCarrello();
}
function totaleCarrello(){
  return carrello.reduce((s, r) => s + trovaProdotto(r.id).prezzo * r.qta, 0);
}
function qtaTotale(){ return carrello.reduce((s, r) => s + r.qta, 0); }

/* ---------- Markup condiviso (drawer + overlay + toast) iniettato in ogni pagina ---------- */
function iniettaChrome(){
  if (document.getElementById("carrello")) return;
  const html = `
    <div class="overlay" id="overlay"></div>
    <aside class="carrello" id="carrello" aria-hidden="true">
      <div class="carrello-onde" aria-hidden="true"></div>
      <div class="carrello-testa">
        <div>
          <span class="carrello-kicker">Sciuscià</span>
          <h3>'O tuo carrello</h3>
        </div>
        <button class="carrello-chiudi" id="chiudiCarrello" aria-label="Chiudi">✕</button>
      </div>
      <div class="carrello-corpo" id="carrelloCorpo"></div>
      <div class="carrello-piede" id="carrelloPiede">
        <div class="carrello-spedizione" id="carrelloSpedizione"></div>
        <div class="carrello-totale">
          <span>Totale</span>
          <strong id="carrelloTotale">€0,00</strong>
        </div>
        <a class="btn btn-primario btn-block" href="checkout.html">Vai 'a cassa →</a>
      </div>
    </aside>
    <div class="toast" id="toast"></div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  document.getElementById("chiudiCarrello").addEventListener("click", chiudiCarrello);
  document.getElementById("overlay").addEventListener("click", chiudiCarrello);

  // delega eventi quantità/elimina dentro il drawer
  document.getElementById("carrelloCorpo").addEventListener("click", e => {
    if (e.target.dataset.piu)  cambiaQta(e.target.dataset.piu, +1);
    if (e.target.dataset.meno) cambiaQta(e.target.dataset.meno, -1);
    const del = e.target.closest("[data-del]");
    if (del) eliminaDalCarrello(del.dataset.del);
  });
}

const drawer  = () => document.getElementById("carrello");
const overlay = () => document.getElementById("overlay");
function apriCarrello(){ drawer().classList.add("attivo"); overlay().classList.add("attivo"); }
function chiudiCarrello(){ drawer().classList.remove("attivo"); overlay().classList.remove("attivo"); }

function aggiornaCarrello(){
  // badge in tutte le icone carrello
  document.querySelectorAll(".carrello-conta").forEach(el => el.textContent = qtaTotale());

  const corpo = document.getElementById("carrelloCorpo");
  const piede = document.getElementById("carrelloPiede");
  if (!corpo) return;

  if (carrello.length === 0){
    corpo.innerHTML = `
      <div class="carrello-vuoto">
        ${MONOGRAMMA}
        'O carrello è vacante.<br>
        <a href="collezione.html" class="link-blu">Scigli 'nu ventaglio</a> e rinfrescati!
      </div>`;
    if (piede) piede.style.display = "none";
    return;
  }
  if (piede) piede.style.display = "block";

  corpo.innerHTML = carrello.map(r => {
    const p = trovaProdotto(r.id);
    return `
      <div class="riga">
        <div class="riga-mini">${iniziali(p)}</div>
        <div class="riga-info">
          <div class="riga-nome">${p.nome}</div>
          <div class="riga-prezzo">${euro(p.prezzo)} · ${p.colore}</div>
          <div class="riga-qta">
            <button data-meno="${p.id}">−</button>
            <span>${r.qta}</span>
            <button data-piu="${p.id}">+</button>
          </div>
        </div>
        <button class="riga-elimina" data-del="${p.id}" aria-label="Elimina">✕</button>
      </div>`;
  }).join("");

  const tot = totaleCarrello();
  document.getElementById("carrelloTotale").textContent = euro(tot);
  const sped = document.getElementById("carrelloSpedizione");
  if (sped){
    if (tot >= 49) sped.innerHTML = `<span class="sped-ok">Spedizione gratis sbloccata!</span>`;
    else sped.innerHTML = `Aggiungi <strong>${euro(49 - tot)}</strong> e 'a spedizione è gratis`;
  }
}

/* ---------- Toast ---------- */
let toastTimer;
function mostraToast(msg){
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("attivo");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("attivo"), 2600);
}

/* ---------- Monogramma "vento" accanto al logo ---------- */
const MONOGRAMMA = `
  <svg class="logo-mono" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
    <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
    <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
  </svg>`;
function iniettaMonogramma(){
  document.querySelectorAll(".logo").forEach(l => {
    if (l.querySelector(".logo-mono")) return;
    l.insertAdjacentHTML("afterbegin", MONOGRAMMA);
  });
}

/* ---------- Avvio comune ---------- */
document.addEventListener("DOMContentLoaded", () => {
  iniettaMonogramma();
  iniettaChrome();
  aggiornaCarrello();
  document.querySelectorAll("[data-apri-carrello]").forEach(b =>
    b.addEventListener("click", apriCarrello));
});
