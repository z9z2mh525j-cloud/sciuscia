# Sciuscià 🌬️

Ventagli napoletani fatti a mano in bambù e cotone. L'estate napoletana verace, senza filtri — da Napoli a Capri. **Collezione 2026**.

Sito e-commerce statico in stile caprese: blu Mediterraneo, giallo limone e maioliche.

## Pagine

- `index.html` — Home con hero e sezione "Nuovi arrivi"
- `collezione.html` — Catalogo completo con filtri
- `prodotto.html` — Dettaglio prodotto (legge `?id=`)
- `checkout.html` — Cassa con form dati e animazione di successo

## File condivisi

- `common.js` — Catalogo prodotti + motore carrello (drawer condiviso)
- `ui.js` — Componente card prodotto
- `checkout.js` — Logica cassa e animazione di acquisto
- `styles.css` — Tutto lo stile caprese
- `assets/monogramma.svg` — Monogramma "vento" del brand

## Come avviarlo in locale

Essendo un sito statico, basta un qualsiasi server HTTP:

```bash
python3 -m http.server 4321
```

Poi apri http://localhost:4321

## Tecnologie

HTML, CSS e JavaScript vanilla. Nessuna dipendenza, nessun build step. Il carrello è persistente via `localStorage`.

---

Fatto cu ammore a Napoli.
