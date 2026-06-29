/* Sciuscià — tema Shopify: interazioni leggere */
document.addEventListener("click", function (e) {
  // Selettore quantità nella pagina prodotto
  var box = e.target.closest(".qta-box");
  if (!box) return;
  var input = box.querySelector(".qta-input");
  if (!input) return;
  if (e.target.classList.contains("qta-piu")) {
    input.value = Math.max(1, (parseInt(input.value, 10) || 1) + 1);
  } else if (e.target.classList.contains("qta-meno")) {
    input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
  }
});
