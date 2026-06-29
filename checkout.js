/* ===== Sciuscià — logica checkout + animazione successo caprese ===== */

const SPEDIZIONE = 4.90;
const SOGLIA_GRATIS = 49;

function calcola(){
  const sub = totaleCarrello();
  const sped = sub >= SOGLIA_GRATIS || sub === 0 ? 0 : SPEDIZIONE;
  return { sub, sped, tot: sub + sped };
}

function renderRiepilogo(){
  const vuoto  = document.getElementById("checkoutVuoto");
  const layout = document.getElementById("checkoutLayout");

  if (carrello.length === 0){
    vuoto.hidden = false;
    layout.style.display = "none";
    return;
  }
  vuoto.hidden = true;
  layout.style.display = "";

  document.getElementById("riepilogoRighe").innerHTML = carrello.map(r => {
    const p = trovaProdotto(r.id);
    return `
      <div class="riep-riga">
        <span class="riep-mini">${iniziali(p)}<i>${r.qta}</i></span>
        <span class="riep-nome">${p.nome}</span>
        <span class="riep-prezzo">${euro(p.prezzo * r.qta)}</span>
      </div>`;
  }).join("");

  const { sub, sped, tot } = calcola();
  document.getElementById("subtotale").textContent = euro(sub);
  document.getElementById("spedizione").innerHTML = sped === 0
    ? `<span class="sped-ok">Gratis</span>` : euro(sped);
  document.getElementById("totaleFinale").textContent = euro(tot);
  document.getElementById("totalePaga").textContent = euro(tot);
}

renderRiepilogo();

/* ---------- Coriandoli capresi (forme nei colori del brand) ---------- */
function lanciaCoriandoli(){
  const cont = document.getElementById("coriandoli");
  const colori = ["#f3d016", "#f8e479", "#1f6fb2", "#46a0d8", "#fbf6e9", "#d98441"];
  cont.innerHTML = "";
  for (let i = 0; i < 60; i++){
    const s = document.createElement("span");
    s.className = "coriandolo";
    if (Math.random() < 0.5) s.classList.add("tondo");
    s.style.background = colori[Math.floor(Math.random() * colori.length)];
    s.style.left = Math.random() * 100 + "%";
    s.style.animationDelay = (Math.random() * 0.8) + "s";
    s.style.animationDuration = (2.4 + Math.random() * 2) + "s";
    const dim = 8 + Math.random() * 12;
    s.style.width = dim + "px";
    s.style.height = dim + "px";
    cont.appendChild(s);
  }
}

function mostraSuccesso(tot){
  const ord = "NA-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("numeroOrdine").textContent = ord;
  document.getElementById("successoTesto").textContent =
    `Grazie! 'O tuo ordine 'e ${euro(tot)} sta arrivanno. Te mannammo 'a mail cu 'o tracking. Mo' fatte vento!`;
  const ov = document.getElementById("successo");
  ov.classList.add("attivo");
  ov.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lanciaCoriandoli();
}

/* ---------- Submit ---------- */
document.getElementById("formCheckout").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()){
    form.reportValidity();
    mostraToast("Mancano 'e dati! Cuntrolla 'e campi");
    return;
  }
  const { tot } = calcola();

  // simulo elaborazione pagamento
  const btn = document.getElementById("btnPaga");
  btn.disabled = true;
  btn.textContent = "Sto elaboranno…";

  setTimeout(() => {
    mostraSuccesso(tot);
    // svuoto carrello dopo l'acquisto
    carrello = [];
    salvaCarrello();
    aggiornaCarrello();
  }, 900);
});
