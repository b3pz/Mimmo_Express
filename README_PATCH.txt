MIMMO EXPRESS V2.2.1 — BINARI ROOT HOTFIX

DIAGNOSI DAI TUOI SCREEN:
- Locomotive Match funziona.
- La mappa nuova funziona.
- Binari Puzzle viene renderizzato come HTML quasi grezzo: il CSS dedicato non viene caricato.
- Il nuovo motore Binari non parte correttamente se js/binari-v22.js non è raggiungibile.

Questa patch evita completamente le cartelle /css e /js:
  index.html
  binari-v22.css
  binari-v22.js

Tutti e tre i file vanno caricati nella ROOT del repository, accanto a:
  index.html
  game.js
  styles.css

L'index è già aggiornato per cercarli in root:
  binari-v22.css?v=221
  binari-v22.js?v=221

DOPO L'UPLOAD:
1. attendi GitHub Pages ~1 minuto
2. fai Ctrl+F5 / Cmd+Shift+R
3. apri Binari Puzzle
