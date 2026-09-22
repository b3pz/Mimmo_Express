MIMMO EXPRESS V1.3

AVVIO:
Apri index.html con Chrome, Edge, Safari o Firefox.

MODALITÀ:
1. BINARI PUZZLE
   - puzzle a caduta
   - frecce sinistra/destra: sposta
   - freccia su: ruota
   - freccia giù: accelera
   - spazio: caduta immediata
   - elimina i guasti/segnali creando linee di almeno 3 colori uguali

2. LOCOMOTIVE MATCH
   - match-3 ferroviario
   - clicca/tocca due locomotive adiacenti per scambiarle
   - lo scambio resta valido solo se crea un match di 3+
   - completa l'obiettivo punti entro il numero di mosse

PROGRESSIONE:
- 100 livelli per modalità
- 20 stazioni x 5 livelli
- percorso separato e salvataggi separati per le due modalità
- partenza: ARDORE
- progressione Locride -> Calabria -> Toscana -> Firenze

DISPLAY:
- ottimizzato per landscape
- funziona anche in verticale / tablet / mobile

FIX V0.7.1:
- corretto click/tap del primo livello in entrambe le modalità
- livelli della mappa ora sono veri pulsanti
- rimosso wrapper JS che poteva interferire con startLevel
- overlay della mappa non intercettano più i tocchi


NOVITÀ V0.7.2:
- il percorso parte da Ardore
- tappe di vita di Mimmo integrate nella mappa e nei livelli
- milestones reali incluse: incontro a Locri, matrimonio a Firenze, trasferimento a Figline, nascita dei figli, arrivo dei nipoti
- eventi fantasiosi nel mezzo per romanzare il viaggio


NOVITÀ V0.9:
- sprite ferroviari veri anche in match-3
- animazioni di swipe, swap e sparizione dei pezzi
- tempi più leggibili per capire la mossa
- 4 in fila = bomba 3x3
- forma L/T = freccia rossa che pulisce riga o colonna in base alla direzione della mossa


NOVITÀ V1.0:
- animazioni avanzate: esplosione bomba, scia della freccia, swipe preview, swap leggibile, caduta più fluida dei pezzi
- effetti sonori: click, mossa, match, combo, bomba, freccia, super locomotiva, fischio treno
- tasto sound on/off
- HUD rifinita con icone e testi combo
- speciali aggiuntive: 5 in fila = super locomotiva
- combo speciali: bomba + freccia, freccia + freccia, super + altro pezzo/speciale


NOVITÀ V1.1:
- le tappe future non mostrano più i dettagli fino allo sblocco
- generati sfondi dedicati per ogni stazione/evento
- piccola cinemetica 2D tra un livello e l'altro
- timeline aggiornata con anni reali: 1987, 1988, 1991, 1997, 2008, 2018, 2022, 2023, 2024, 2025, 2026


V1.3 ANCORAGGIO PERSONE:
- corretti Giuseppe 1991 e Duccio 1997: i genitori sono Mimmo e sua moglie
- laurea Duccio corretta al 2021 con foto reale di riferimento
- Caty 2024, matrimonio Giuseppe/Kiki 2025 e Kiko 2026 ancorati a foto reali fornite
- Kiki definita correttamente come compagna/moglie di Giuseppe
- nessun gatto inserito


V1.4 GAMEPLAY
- Locomotive Match è progettato in orizzontale.
- Hint automatico dopo circa 5 secondi di inattività.
- Se non esistono mosse, la griglia viene rimescolata automaticamente.
- 4 in fila: freccia orizzontale/verticale.
- L/T: bomba ad area 3x3.
- 5 in fila: bomba colore che elimina tutti i pezzi del tipo con cui viene scambiata.
- Ostacoli ferroviari a 1/2 colpi dai livelli avanzati.
- Binari Puzzle completamente verticale, nuovi sprite e controlli touch/swipe.


V1.4.1:
- home page aggiornata con la nuova key art illustrata
- menu iniziale più coerente con il livello visivo del progetto


V1.4.2:
- la nuova home illustrata è ora realmente interattiva
- clic diretto sul pannello Binari Puzzle
- clic diretto sul pannello Locomotive Match
- Continua e Info sono cliccabili direttamente nell'immagine
- nessuna modifica/regressione alle meccaniche bomba, freccia, bomba colore, hint e ostacoli


V1.5 - Binari Puzzle rework:
- i vagoni bloccati usano lo stesso identico sprite dei pezzi che cadono
- lucchetto/catena solo come overlay: il collegamento colore/simbolo è immediato
- tutorial iniziale e pulsante ? per riaprirlo
- regola sempre visibile: stesso colore + stesso simbolo
- connettore grafico tra i due vagoni della coppia che cade
- HUD rinominato da GUASTI a BLOCCATI


MIMMO EXPRESS V2.2 — BINARI PUZZLE REBUILD
- Nuovo motore Binari Puzzle mobile-first
- 8x12, match di 4 identici: stesso colore + stesso simbolo
- coppie collegate, rotazione con wall-kick, ghost piece
- touch: swipe sinistra/destra, tap ruota, swipe giù, hard drop rapido
- desktop: frecce, spazio, Z/X
- vagoni bloccati, ostacoli, blocchi distruttibili, bonus e malus
- 100 livelli con progressione per fasce e 10 mondi visuali
- HUD minimale, niente grandi controlli touch
- game over e pausa in stile gioco
