
const $ = s=>document.querySelector(s);
const $$ = s=>[...document.querySelectorAll(s)];
const ROUTE_TRAIN_SVG=`<svg viewBox="0 0 180 90" aria-hidden="true"><g stroke="#17365c" stroke-width="5" stroke-linejoin="round"><rect x="25" y="35" width="92" height="34" rx="9" fill="#e64545"/><rect x="105" y="20" width="43" height="49" rx="8" fill="#e64545"/><rect x="116" y="29" width="22" height="16" rx="3" fill="#c9f2ff"/><rect x="37" y="44" width="22" height="12" rx="3" fill="#c9f2ff"/><rect x="65" y="44" width="18" height="12" rx="3" fill="#c9f2ff"/><rect x="88" y="44" width="15" height="12" rx="3" fill="#ffd457"/><path d="M148 49l24 13-24 10z" fill="#ffd457"/><path d="M42 35V20h18v15M37 20h28" fill="#17365c" stroke-linecap="round"/><circle cx="51" cy="73" r="13" fill="#27384f"/><circle cx="51" cy="73" r="5" fill="#aebdce" stroke="none"/><circle cx="111" cy="73" r="13" fill="#27384f"/><circle cx="111" cy="73" r="5" fill="#aebdce" stroke="none"/><circle cx="143" cy="73" r="11" fill="#27384f"/><circle cx="143" cy="73" r="4" fill="#aebdce" stroke="none"/></g><circle cx="151" cy="52" r="6" fill="#fff09b"/></svg>`;

// Ogni tappa importante ha DUE narrazioni distinte per lo stesso evento:
// "beats" (Locomotive Match) racconta il lato emotivo/familiare, "beatsFalling"
// (Binari Puzzle) racconta il lato pratico/organizzativo dello stesso momento.
// Così chi gioca a entrambe le modalità non rivede mai la stessa scena due volte.
const SCENES = [
 {name:"Ardore",area:"Locride",year:1987,img:"assets/stations/clean/st01_ardore.jpg",cine:"assets/cinematics/cine_ardore.png",type:"railway",summary:"Nel 1987 nasce il sogno ferroviario di Mimmo.",
 beats:[
   "1987 • Ad Ardore tutto comincia: Mimmo scopre il fascino dei treni e dei binari.",
   "Tra mare e rotaie, ogni passaggio di locomotiva accende la sua immaginazione.",
   "Una piccola stazione e un grande sogno: la ferrovia entra nel suo cuore.",
   "Le giornate ad Ardore hanno già il rumore del suo futuro.",
   "Da Ardore parte il viaggio che cambierà tutta la famiglia."
 ],
 beatsFalling:[
   "1987 • Ad Ardore Mimmo impara a riconoscere ogni segnale e ogni scambio della piccola stazione.",
   "Osserva i capistazione al lavoro e memorizza orari e manovre come fossero un gioco.",
   "Ogni vagone allineato sui binari è una piccola vittoria che lo avvicina al suo sogno.",
   "Impara che in ferrovia ogni pezzo deve trovare il suo posto esatto, al momento giusto.",
   "Da Ardore parte anche il suo primo, vero apprendistato da ferroviere."
 ]},
 {name:"Bovalino",area:"Locride",year:1987,img:"assets/stations/clean/st02_bovalino.jpg",cine:"assets/stations/clean/st02_bovalino.jpg",summary:"I primi sogni sui binari diventano sempre più reali.",
 summaryMatch:"Tappa dopo tappa, il cuore di Mimmo si affeziona sempre di più alla ferrovia.",
 summaryFalling:"Mimmo impara a memorizzare orari e coincidenze come un vero professionista."},
 {name:"Locri",area:"Locride",year:1987,img:"assets/stations/clean/st03_locri.jpg",cine:"assets/cinematics/cine_locri_1987.png",type:"love",summary:"A Locri Mimmo conosce Ada, la donna che diventerà sua moglie.",
 beats:[
   "1987 • A Locri Mimmo incontra Ada, la ragazza che gli cambia il viaggio e il cuore.",
   "Tra uno sguardo e un sorriso nasce una simpatia che sa già di destino.",
   "\"Scusi, che treno c'è per Roccella?\" chiede Ada vicino alla banchina. \"Il prossimo passa tra due minuti, gliel'accompagno io\" risponde Mimmo — e da lì non le toglie più gli occhi di dosso.",
   "Le passeggiate trasformano la tappa di Locri in una storia d'amore.",
   "Locri resta per sempre la stazione in cui Mimmo non viaggia più da solo, accanto ad Ada."
 ],
 beatsFalling:[
   "1987 • Il turno di Mimmo fa tappa a Locri, tra orari da rispettare e treni da far correre puntuali.",
   "Tra una manovra e l'altra nota sempre la stessa ragazza vicino ai binari: si chiama Ada, gliel'ha detto il capostazione.",
   "\"Fa sempre questo turno?\" chiede Ada un giorno, quasi per caso. \"Da oggi sì\" risponde Mimmo, e da quel giorno i suoi turni a Locri non sono più un caso.",
   "Il lavoro lo porta a Locri quasi ogni giorno: non è più solo un caso.",
   "Locri diventa la tappa fissa del suo percorso, per lavoro e per il cuore — con Ada che lo aspetta in banchina."
 ]},
 {name:"Gioiosa Ionica",area:"Locride",year:1988,img:"assets/stations/clean/st04_gioiosa.jpg",cine:"assets/stations/clean/st04_gioiosa.jpg",summary:"Nel 1988 l'amore cresce e prende coraggio.",
 summaryMatch:"L'amore tra Mimmo e la sua ragazza cresce ad ogni incontro.",
 summaryFalling:"Mimmo organizza i turni per ritagliarsi sempre più tempo per lei."},
 {name:"Siderno",area:"Locride",year:1988,img:"assets/stations/clean/st05_siderno.jpg",cine:"assets/cinematics/cine_siderno_1988.png",summary:"Le promesse diventano progetto di vita.",
 summaryMatch:"Le promesse fatte piano piano diventano un progetto di vita insieme.",
 summaryFalling:"Comincia a pianificare il futuro con la stessa precisione di un orario ferroviario."},
 {name:"Firenze S.M.N.",area:"Firenze",year:1988,img:"assets/stations/clean/st06_firenze_matrimonio.jpg",cine:"assets/cinematics/cine_matrimonio_1988.png",type:"wedding",summary:"Nel 1988 Mimmo si sposa a Firenze.",
 beats:[
   "1988 • Firenze accoglie Mimmo e la donna della sua vita per il grande giorno.",
   "Il matrimonio rende questa stazione il simbolo della loro unione.",
   "Tra sorrisi, promesse e binari, il viaggio prende una rotta nuova.",
   "Da questo momento ogni partenza ha un ritorno speciale da vivere insieme.",
   "Santa Maria Novella custodisce il ricordo del loro sì."
 ],
 beatsFalling:[
   "1988 • Mimmo organizza il viaggio verso Firenze: biglietti, orari, coincidenze, tutto calcolato al minuto.",
   "Il giorno del matrimonio anche i binari sembrano allinearsi apposta per lui.",
   "Tra parenti, valigie e un treno da non perdere, la giornata corre a mille.",
   "Nessun ritardo, nessun imprevisto: solo la tratta più importante della sua vita.",
   "Da Santa Maria Novella riparte un uomo sposato, pronto per la prossima destinazione insieme a lei."
 ]},
 {name:"Figline Valdarno",area:"Toscana",year:1989,img:"assets/stations/clean/st07_figline.jpg",cine:"assets/cinematics/cine_figline_1989.png",summary:"La famiglia si trasferisce a Figline e mette radici.",
 summaryMatch:"La nuova casa a Figline diventa il nido della famiglia appena nata.",
 summaryFalling:"Mimmo organizza il trasloco e i nuovi turni nella tratta toscana."},
 {name:"Valdarno",area:"Toscana",year:1990,img:"assets/stations/clean/st08_valdarno.jpg",cine:"assets/cinematics/cine_figline_1989.png",summary:"Nuova casa, nuove abitudini, nuova rotta di vita.",
 summaryMatch:"Nuove abitudini, nuovi vicini, una vita che pian piano si costruisce insieme.",
 summaryFalling:"Mimmo studia le nuove tratte toscane come fossero un livello da completare."},
 {name:"Figline Valdarno",area:"Toscana",year:1991,img:"assets/stations/clean/st09_giuseppe.jpg",cine:"assets/cinematics/cine_giuseppe_1991_correct.png",type:"baby",summary:"Nel 1991 nasce Giuseppe.",
 beats:[
   "1991 • Una grande notizia corre più veloce di un espresso: nasce Giuseppe.",
   "La casa si riempie di gioia, stanchezza e meraviglia.",
   "Mimmo capisce che questo è il viaggio più bello di tutti.",
   "Tra lavoro e famiglia, ogni giornata prende un senso nuovo.",
   "Figline custodisce il primo grande capitolo dei figli."
 ],
 beatsFalling:[
   "1991 • Mimmo studia i turni con più attenzione che mai: adesso c'è un figlio ad aspettarlo a casa.",
   "Ogni cambio di orario viene incastrato per non perdere un solo momento con Giuseppe.",
   "Il lavoro in ferrovia diventa un mezzo, non più un fine: tutto è per la famiglia.",
   "Impara a fare le valigie in fretta, per tornare a casa un minuto prima.",
   "Figline custodisce i primi passi di Giuseppe e i turni più organizzati di Mimmo."
 ]},
 {name:"Firenze S.M.N.",area:"Firenze",year:1993,img:"assets/stations/clean/st10_turni.jpg",summary:"I turni in ferrovia diventano il cuore della sua vita lavorativa.",
 summaryMatch:"Anche nei turni più duri, il pensiero di Mimmo torna sempre alla sua famiglia.",
 summaryFalling:"I turni diventano il cuore della sua vita lavorativa: notturni, festivi, sempre puntuale."},
 {name:"Valdarno",area:"Toscana",year:1997,img:"assets/stations/clean/st11_duccio.jpg",cine:"assets/cinematics/cine_duccio_1997_correct.png",type:"baby",summary:"Nel 1997 nasce Duccio.",
 beats:[
   "1997 • Arriva anche Duccio e la famiglia si allarga ancora.",
   "Due figli significano doppia gioia e mille ricordi da costruire.",
   "Mimmo divide il suo tempo tra turni, casa e sogni per il futuro.",
   "Ogni ritorno a casa è più bello con i bambini ad aspettarlo.",
   "Il Valdarno diventa il paesaggio della crescita della famiglia."
 ],
 beatsFalling:[
   "1997 • Con due figli, Mimmo diventa un maestro nell'incastrare turni, ferie e permessi.",
   "Ogni orario di lavoro viene ora pensato in funzione della famiglia che cresce.",
   "Impara a organizzare tutto al minuto: in casa come in stazione.",
   "Le sue giornate diventano un vero e proprio orario ferroviario, preciso al minuto.",
   "Il Valdarno diventa la tratta fissa tra il lavoro e i suoi due ragazzi."
 ]},
 {name:"Toscana",area:"Toscana",year:2000,img:"assets/stations/clean/st12_toscana.jpg",cine:"assets/cinematics/cine_toscana_2000.png",summary:"Anni di crescita, lavoro e avventure romanzate tra binari e famiglia.",
 summaryMatch:"Anni di crescita in famiglia, tra risate, compiti e cene tutti insieme.",
 summaryFalling:"Anni di lavoro e di esperienza: Mimmo conosce ormai ogni scambio a memoria."},
 {name:"Figline Valdarno",area:"Toscana",year:2008,img:"assets/stations/clean/st13_lucky.jpg",cine:"assets/cinematics/cine_lucky_2008.png",type:"pet",summary:"Nel 2008 arriva Lucky, il primo Yorkshire.",
 beats:[
   "2008 • In casa arriva Lucky e porta allegria a tutta la famiglia.",
   "Piccolo, vivace e sempre presente: Lucky diventa subito uno di casa.",
   "Tra giochi e corse, la casa guadagna un nuovo compagno di viaggio.",
   "Ogni ritorno di Mimmo dai turni ha adesso anche quattro zampette ad aspettarlo.",
   "Lucky entra a pieno titolo nella storia della famiglia."
 ],
 beatsFalling:[
   "2008 • Un nuovo membro sale a bordo della famiglia: Lucky, piccolo e pieno di energia.",
   "Mimmo aggiunge una nuova tappa fissa ai suoi giri: la passeggiata prima e dopo il turno.",
   "Organizza gli orari anche per lui, tra una manovra in stazione e una in giardino.",
   "Lucky impara ad aspettarlo puntuale come un treno, ogni sera alla stessa ora.",
   "Anche i più piccoli hanno bisogno di orari precisi: Mimmo lo sa bene."
 ]},
 {name:"Figline Valdarno",area:"Toscana",year:2018,img:"assets/stations/clean/st15_boris.jpg",cine:"assets/cinematics/cine_boris_2018.png",type:"pet",summary:"Nel 2018 arriva Boris; Lucky resta un ricordo speciale.",
 beats:[
   "2018 • Boris entra in famiglia e porta una nuova energia in casa.",
   "Il ricordo di Lucky resta vivo, ma il viaggio continua anche con Boris.",
   "Un altro piccolo Yorkshire si unisce alle giornate della famiglia.",
   "Le passeggiate e i momenti semplici diventano ancora più pieni.",
   "Anche Boris conquista un posto speciale nel grande viaggio di Mimmo."
 ],
 beatsFalling:[
   "2018 • Un altro Yorkshire sale a bordo: Boris porta con sé una nuova routine di casa.",
   "Mimmo ritrova gli stessi gesti di anni prima: cibo, passeggiate, orari da rispettare.",
   "Il ricordo di Lucky resta un binario parallelo, mai davvero lasciato.",
   "Organizzare la giornata con un cane in casa è un po' come gestire una piccola stazione.",
   "Boris si aggiunge alla lista delle piccole grandi responsabilità quotidiane di Mimmo."
 ]},
 {name:"Figline Valdarno",area:"Toscana",year:2020,img:"assets/stations/clean/st14_ferrovia.jpg",cine:"assets/cinematics/cine_kiki_2020.png",type:"love",summary:"Nel 2020 Kiki entra nella vita di Giuseppe: è la sua compagna e futura moglie.",
 beats:[
   "2020 • Giuseppe incontra Kiki, la sua compagna e futura moglie: nasce una nuova storia d'amore in famiglia.",
   "Tra giornate semplici e nuovi progetti, Mimmo osserva tutto con orgoglio.",
   "Anche questa tappa diventa una stazione importante del grande viaggio.",
   "Kiki porta una ventata di gioia e futuro nella famiglia.",
   "Il viaggio di Mimmo adesso guarda anche alla nuova generazione."
 ],
 beatsFalling:[
   "2020 • Giuseppe porta a casa nuove abitudini: adesso c'è Kiki nei suoi programmi settimanali.",
   "Mimmo osserva suo figlio organizzarsi la vita esattamente come faceva lui alla sua età.",
   "Le cene di famiglia si allungano di un posto a tavola, con calma e naturalezza.",
   "Ogni weekend diventa un piccolo orario condiviso tra lavoro, famiglia e la nuova arrivata.",
   "Kiki si inserisce nei ritmi della famiglia come una tappa che ormai sembrava scritta."
 ]},
 {name:"Firenze",area:"Firenze",year:2021,img:"assets/stations/clean/st16_laurea.jpg",cine:"assets/cinematics/clean/cine_duccio_2021_photo.jpg",type:"graduation",summary:"Nel 2021 Duccio si laurea: un grande traguardo di famiglia.",
 beats:[
   "2021 • Duccio si laurea: l'emozione in famiglia è impossibile da nascondere.",
   "Anni di studio, sacrifici e piccoli grandi traguardi arrivano a compimento.",
   "Mimmo guarda suo figlio con gli occhi lucidi, orgoglioso oltre le parole.",
   "Firenze, la stessa città del matrimonio, festeggia un altro capitolo importante.",
   "Un altro sogno di famiglia, coltivato insieme, taglia il traguardo."
 ],
 beatsFalling:[
   "2021 • Duccio organizza l'ultimo esame con la stessa precisione di un orario ferroviario.",
   "Mimmo lo aiuta a fare i conti tra impegni, viaggi e sessioni di studio.",
   "Ogni corso completato è una tappa raggiunta, esattamente come una stazione sulla mappa.",
   "Il giorno della laurea, tutta la famiglia organizza insieme il viaggio verso Firenze.",
   "Un altro traguardo raggiunto puntuale, proprio come piace a Mimmo."
 ]},
 {name:"Firenze S.M.N.",area:"Firenze",year:2023,img:"assets/stations/clean/st17_pensione.jpg",cine:"assets/cinematics/cine_pensione_2023.png",type:"retire",summary:"Nel 2023 arriva la pensione del babbo.",
 beats:[
   "2023 • Dopo una lunga vita sui binari, arriva la pensione di Mimmo.",
   "Si chiude un capitolo enorme fatto di turni, partenze e responsabilità.",
   "Santa Maria Novella resta il simbolo di una carriera vissuta con orgoglio.",
   "La stazione saluta il suo ferroviere, ma la storia continua in famiglia.",
   "La pensione non è una fine: è una nuova tratta da vivere."
 ],
 beatsFalling:[
   "2023 • L'ultimo turno di Mimmo viene segnato sul calendario come una tratta speciale.",
   "Consegna divisa, orari e consegne di servizio dopo una vita passata sui binari.",
   "Il capostazione lo saluta con una stretta di mano che vale quanto una medaglia.",
   "Per la prima volta, Mimmo può scegliere lui stesso i propri orari.",
   "La pensione è la sua ultima, meritata manovra: cambiare binario, non fermarsi."
 ]},
 {name:"Figline Valdarno",area:"Toscana",year:2024,img:"assets/stations/clean/st18_caty.jpg",cine:"assets/cinematics/clean/cine_caty_2024_photo.jpg",type:"grandchild",summary:"Nel 2024 nasce Caty, la prima nipote.",
 beats:[
   "2024 • Nasce Caty: Mimmo diventa nonno e il cuore trova spazio per un amore nuovo.",
   "La prima nipote porta in casa un'euforia che nessuno sapeva di aspettare così tanto.",
   "Ogni sorriso di Caty ripaga anni di turni e sacrifici.",
   "Mimmo la tiene in braccio con la stessa emozione di quando nacquero Giuseppe e Duccio.",
   "Con Caty, il viaggio di famiglia si allunga di una generazione."
 ],
 beatsFalling:[
   "2024 • Con l'arrivo di Caty, anche i nonni imparano nuovi orari da rispettare.",
   "Mimmo si organizza per esserci ad ogni visita, incastrando impegni come tessere di un puzzle.",
   "Passeggini, biberon, pisolini: una nuova logistica entra nella vita di tutti.",
   "Ogni weekend diventa una tratta dedicata a stare vicino alla piccola di casa.",
   "Caty aggiunge una fermata bellissima e imprevista al percorso della famiglia."
 ]},
 {name:"Toscana",area:"Toscana",year:2025,img:"assets/stations/clean/st19_matrimonio_giuseppe.jpg",cine:"assets/cinematics/clean/cine_matrimonio_2025_photo.jpg",type:"wedding",summary:"Nel 2025 arriva il matrimonio di Giuseppe.",
 beats:[
   "2025 • Giuseppe sposa Kiki: il cerchio si chiude, la storia d'amore di famiglia continua.",
   "Mimmo rivede se stesso, giovane sposo a Firenze, negli occhi di suo figlio.",
   "La stessa gioia del 1988 torna a riempire la famiglia, ancora più grande ora.",
   "Tra abbracci e brindisi, un'altra pagina bellissima si scrive nella storia di Mimmo Express.",
   "Il viaggio che iniziò ad Ardore arriva fin qui: a un altro grande sì di famiglia."
 ],
 beatsFalling:[
   "2025 • Giuseppe organizza il matrimonio con la stessa cura con cui Mimmo organizzava i suoi turni.",
   "Liste, orari, invitati da coordinare: un'altra giornata da far correre alla perfezione.",
   "Mimmo dà una mano con l'esperienza di chi ha già affrontato la sua, di giornata importante.",
   "Nessun imprevisto ferma la festa: tutto arriva puntuale, proprio come piace in famiglia.",
   "Da questa tappa in poi, il viaggio di famiglia prosegue in due coppie, non più una sola."
 ]},
 {name:"Figline Valdarno",area:"Toscana",year:2026,img:"assets/stations/clean/st20_kiko.jpg",cine:"assets/cinematics/clean/cine_kiko_2026_photo.jpg",type:"family",summary:"Nel 2026 nasce Kiko e il viaggio arriva ai due nipoti.",
 beats:[
   "2026 • Con la nascita di Kiko, Mimmo diventa ancora più nonno nel cuore.",
   "Caty e Kiko riempiono la famiglia di nuove storie, sorrisi e futuro.",
   "Il viaggio partito da Ardore arriva fino ai nipoti e continua oltre.",
   "Ogni tappa precedente trova qui un significato ancora più grande.",
   "Da Ardore al 2026, Mimmo Express racconta una vita piena d'amore."
 ],
 beatsFalling:[
   "2026 • Con l'arrivo di Kiko, la famiglia ha bisogno di orari nuovi, tutti da reinventare.",
   "Mimmo osserva Giuseppe organizzare notti e turni proprio come faceva lui anni prima.",
   "Ogni tratta percorsa in questi anni sembra aver preparato proprio questo momento.",
   "Caty e Kiko diventano i nuovi passeggeri più importanti del viaggio di famiglia.",
   "Da Ardore fino a qui: un'unica, lunga tratta piena di fermate che valeva la pena fare."
 ]},
];
const MODES = {
 falling:{name:"Binari Puzzle",key:"falling",subtitle:"stile classico a caduta"},
 match:{name:"Locomotive Match",key:"match",subtitle:"stile avventura match-3"},
};
let selectedMode="falling";
function progKey(mode){return "mimmo_v13_"+mode+"_unlocked"}
function scoreKey(mode){return "mimmo_v13_"+mode+"_scores"}
function getUnlocked(mode){return Math.max(1,Math.min(100,parseInt(localStorage.getItem(progKey(mode))||"1")))}
function setUnlocked(mode,n){localStorage.setItem(progKey(mode),String(Math.max(1,Math.min(100,n))))}
function getScores(mode){try{return JSON.parse(localStorage.getItem(scoreKey(mode))||"{}")}catch(e){return {}}}
function setScores(mode,o){localStorage.setItem(scoreKey(mode),JSON.stringify(o))}
function placeSoundToggle(screenId){
 const btn=document.getElementById("soundToggle");
 if(!btn) return;
 btn.classList.remove("sound-inline");

 if(screenId==="mapScreen"){
   const target=document.querySelector("#mapScreen .map-head > div:last-child");
   if(target){ target.prepend(btn); btn.classList.add("sound-inline"); return; }
 }
 if(screenId==="fallGame"){
   const target=document.querySelector("#fallGame .fall-header");
   if(target){ target.appendChild(btn); btn.classList.add("sound-inline"); return; }
 }
 if(screenId==="matchGame"){
   const target=document.querySelector("#matchGame .hud-col.right");
   const mapBtn=document.getElementById("matchMap");
   if(target){ target.insertBefore(btn,mapBtn||null); btn.classList.add("sound-inline"); return; }
 }

 const app=document.getElementById("app");
 if(app) app.appendChild(btn);
}
function show(id){
 $$(".screen").forEach(s=>s.classList.remove("active"));
 $("#"+id).classList.add("active");
 document.body.dataset.screen=id;
 placeSoundToggle(id);
 if(window.MimmoLives) window.MimmoLives.placeWidget(id);
 document.body.classList.toggle('boss-level-active',(id==='fallGame'||id==='matchGame')&&isBossLevel(currentLevel));
}
function stationFor(level){return SCENES[Math.floor((level-1)/5)]}
function within(level){return (level-1)%5+1}
function stationTitle(level){ const st = stationFor(level); return st.year ? `${st.name} • ${st.year}` : st.name; }
function stationTag(st){ return st.year ? `${st.area} • ${st.year}` : st.area; }
// mode: 'falling' (Binari Puzzle, angolo pratico/organizzativo) o 'match'
// (Locomotive Match, angolo emotivo/familiare). Senza mode, torna il testo
// generico (usato ad es. nei tooltip della mappa).
function storyFor(level,mode){
 const st=stationFor(level);
 const w=within(level)-1;
 const arr = mode==='falling' ? (st.beatsFalling||st.beats) : mode==='match' ? (st.beats||st.beatsFalling) : (st.beats||st.beatsFalling);
 if(arr && arr[w]) return arr[w];
 const base = mode==='falling' ? (st.summaryFalling||st.summary) : mode==='match' ? (st.summaryMatch||st.summary) : st.summary;
 const generic=[
   `Arrivo a ${st.name}: ${base}`,
   `La corsa continua a ${st.name}: ${base.toLowerCase()}`,
   `Tra piccoli imprevisti e grandi sogni, ${base.toLowerCase()}`,
   `Mimmo tiene la rotta a ${st.name}: ${base.toLowerCase()}`,
   `Tappa conclusiva a ${st.name}: ${base}`
 ];
 return generic[w] || base;
}
function updateStoryBoxes(level,mode){
 const f=document.getElementById('fStory'); if(f) f.textContent=storyFor(level,'falling');
 const m=document.getElementById('mStory'); if(m) m.textContent=storyFor(level,'match');
 const cap=document.getElementById('routeMilestone'); if(cap) cap.textContent=stationFor(level).summary;
}


// Icone disegnate nello stesso stile "flat, contorno spesso" del resto del gioco
// (stessi colori e stessa grafia dei treni/simboli in ROUTE_TRAIN_SVG e drawSymbol),
// al posto delle emoji generiche: un badge circolare colorato con un piccolo glifo bianco.
function svgBadge(bg, glyph){
 return `<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="${bg}" stroke="#17365c" stroke-width="3"/>${glyph}</svg>`;
}
const ICON_GLYPH = {
 train:'<g fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"><rect x="12" y="16" width="20" height="11" rx="3"/><rect x="16" y="11" width="8" height="7" rx="1.5"/><circle cx="17" cy="30" r="2.4" fill="#fff" stroke="none"/><circle cx="27" cy="30" r="2.4" fill="#fff" stroke="none"/><path d="M32 21h4l-4 3z" fill="#fff" stroke="none"/></g>',
 heart:'<path d="M22 32c-6-4.4-11-8.6-11-14a6 6 0 0 1 11-3.3A6 6 0 0 1 33 18c0 5.4-5 9.6-11 14z" fill="#fff" stroke="#17365c" stroke-width="1.6"/>',
 rings:'<g fill="none" stroke="#fff" stroke-width="3"><circle cx="17" cy="24" r="7"/><circle cx="27" cy="24" r="7"/></g>',
 bottle:'<g fill="#fff" stroke="none"><rect x="18" y="10" width="8" height="5" rx="1.5"/><path d="M16 15h12l-1.5 17a3 3 0 0 1-3 2.6h-3a3 3 0 0 1-3-2.6z"/></g>',
 paw:'<g fill="#fff"><ellipse cx="22" cy="27" rx="7" ry="6"/><ellipse cx="13" cy="18" rx="3" ry="3.6"/><ellipse cx="20" cy="13" rx="3" ry="3.6"/><ellipse cx="28" cy="13" rx="3" ry="3.6"/><ellipse cx="31" cy="18" rx="3" ry="3.6"/></g>',
 medal:'<g fill="none" stroke="#fff" stroke-width="2.6"><path d="M16 10l6 9 6-9" stroke-linejoin="round"/><circle cx="22" cy="27" r="8" fill="#fff" stroke="#17365c"/></g><path d="M22 22l1.8 3.6 4 .5-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.5z" fill="#ffd457" stroke="none"/>',
 family:'<g fill="#fff"><circle cx="15" cy="16" r="3.2"/><circle cx="29" cy="16" r="3.2"/><circle cx="22" cy="22" r="2.6"/><path d="M9 32c0-5 4-8 6-8s6 3 6 8zM23 32c0-4.4 3.6-7 5.6-7s5.4 2.6 5.4 7z" opacity=".92"/></g>',
 cap:'<g fill="#fff"><path d="M22 11 8 17l14 6 14-6z"/><path d="M14 20v6c0 2.6 3.6 4.6 8 4.6s8-2 8-4.6v-6l-8 3.4z" opacity=".92"/></g><circle cx="34" cy="18" r="1.6" fill="#fff"/><path d="M34 18v8" stroke="#fff" stroke-width="1.6"/>',
 rattle:'<g fill="#fff" stroke="none"><circle cx="24" cy="16" r="7"/><circle cx="21" cy="13" r="1.4" fill="#17365c"/><circle cx="27" cy="13" r="1.4" fill="#17365c"/><circle cx="24" cy="18" r="1.4" fill="#17365c"/><rect x="16" y="24" width="5" height="12" rx="2.4" transform="rotate(-28 16 24)"/></g>',
 cap_boss:'<g fill="#fff"><path d="M9 26c0-8 6-13 13-13s13 5 13 13z"/><rect x="8" y="26" width="28" height="5" rx="2.4"/></g><circle cx="22" cy="19" r="2.6" fill="#ffd457"/>',
 grump:'<g fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M13 19l6 2M31 19l-6 2"/><path d="M14 29q8-5 16 0"/></g><circle cx="16" cy="24" r="2" fill="#fff"/><circle cx="28" cy="24" r="2" fill="#fff"/>',
 warn:'<path d="M22 9l14 24H8z" fill="#fff" stroke="#17365c" stroke-width="1.6" stroke-linejoin="round"/><rect x="20.4" y="19" width="3.2" height="8" rx="1.4" fill="#17365c"/><circle cx="22" cy="30.5" r="1.7" fill="#17365c"/>',
 trophy:'<g fill="#fff"><path d="M15 12h14v7a7 7 0 0 1-14 0z"/><rect x="20" y="26" width="4" height="5"/><rect x="16" y="31" width="12" height="3" rx="1.3"/></g><path d="M15 14h-3a4 4 0 0 0 4 5M29 14h3a4 4 0 0 1-4 5" fill="none" stroke="#fff" stroke-width="2"/>'
};
const ACT_ICONS = {
 railway:{svg:svgBadge('#2f9fe8',ICON_GLYPH.train),cls:'act-move'},
 love:{svg:svgBadge('#e45778',ICON_GLYPH.heart),cls:'act-pulse'},
 wedding:{svg:svgBadge('#d54883',ICON_GLYPH.rings),cls:'act-pulse-gold'},
 baby:{svg:svgBadge('#42a562',ICON_GLYPH.bottle),cls:'act-bounce'},
 pet:{svg:svgBadge('#dc922d',ICON_GLYPH.paw),cls:'act-wiggle'},
 retire:{svg:svgBadge('#2676b8',ICON_GLYPH.medal),cls:'act-rise'},
 family:{svg:svgBadge('#7b5fd3',ICON_GLYPH.family),cls:'act-pulse'},
 graduation:{svg:svgBadge('#9a4fab',ICON_GLYPH.cap),cls:'act-rise'},
 grandchild:{svg:svgBadge('#e64545',ICON_GLYPH.rattle),cls:'act-bounce'}
};
function genericToast(text,ms=1900){
 let el=document.getElementById('genericToast');
 if(!el){ el=document.createElement('div'); el.id='genericToast'; el.className='life-toast'; document.body.appendChild(el); }
 el.textContent=text; el.classList.add('show');
 clearTimeout(genericToast._t);
 genericToast._t=setTimeout(()=>el.classList.remove('show'),ms);
}

// Cinematica di stazione: mostrata SOLO al passaggio da una stazione alla successiva
// (non ad ogni singolo livello). Le tappe con "beats" (i grandi eventi della vita di Mimmo)
// diventano una piccola scena a più atti con icona animata e biglietto di "capitolo completato";
// le tappe minori restano uno slide singolo e veloce.
function playStationCinematic(mode, stationIndex, done){
 const st = SCENES[Math.max(0,Math.min(SCENES.length-1,stationIndex))];
 const isFinale = currentLevel===100;
 const isMilestone = !!(st.beats && st.type);
 // Stessa tappa, due racconti diversi: Binari Puzzle vede il lato pratico/organizzativo
 // (beatsFalling), Locomotive Match il lato emotivo/familiare (beats) — mai la stessa scena due volte.
 const beatsForMode = mode==='falling' ? (st.beatsFalling||st.beats) : (st.beats||st.beatsFalling);
 const acts = isMilestone ? [beatsForMode[0], beatsForMode[2], beatsForMode[4]] : [mode==='falling' ? (st.summaryFalling||st.summary) : (st.summaryMatch||st.summary)];
 const icon = ACT_ICONS[st.type] || ACT_ICONS.railway;

 const root = document.getElementById('cinematicScreen');
 const bg = document.getElementById('cineBg');
 const scene = document.getElementById('cineScene');
 const y = document.getElementById('cineYear');
 const s = document.getElementById('cineStation');
 const t = document.getElementById('cineTitle');
 const tx = document.getElementById('cineText');
 const dots = document.getElementById('cineActs');
 const badge = document.getElementById('cineVictory');
 const btn = document.getElementById('cineContinue');
 const note = root.querySelector('.cine-note');
 const iconEl = document.getElementById('cineActIcon');

 if(bg) bg.style.backgroundImage = `url("${st.img}")`;
 if(scene){
   scene.onerror = ()=>{ scene.onerror=null; scene.src = st.img; };
   scene.src = st.cine || st.img; scene.alt = `Scena di ${st.name}`;
 }
 if(y) y.textContent = st.year || 'Mimmo Express';
 if(s) s.textContent = st.name;
 if(badge) badge.classList.remove('show');
 if(dots){ dots.innerHTML = acts.map((_,i)=>`<span class="cine-dot-act" data-i="${i}"></span>`).join(''); }
 if(iconEl){ iconEl.innerHTML = icon.svg; iconEl.className = 'cine-act-icon '+icon.cls; }
 root.classList.toggle('cine-milestone', isMilestone);
 show('cinematicScreen');
 playSfx('whistle');

 let finished=false, idx=0;
 const cleanup=()=>{ clearTimeout(timer); root.onclick=null; if(btn) btn.onclick=null; };
 const finish=()=>{ if(finished) return; finished=true; cleanup(); done(); };

 const renderAct=(i)=>{
   idx=i;
   const card=root.querySelector('.cine-card');
   if(card){ card.classList.remove('cine-in'); void card.offsetWidth; card.classList.add('cine-in'); }
   const last = i===acts.length-1;
   if(t) t.textContent = isFinale ? 'Gran finale del viaggio' : (isMilestone ? `Capitolo ${i+1} di ${acts.length}` : 'Tra una stazione e l\'altra');
   if(tx) tx.textContent = acts[i];
   if(dots) dots.querySelectorAll('.cine-dot-act').forEach((d,j)=>d.classList.toggle('on',j<=i));
   if(iconEl){ iconEl.style.animation='none'; void iconEl.offsetWidth; iconEl.style.animation=''; }
   const wrap = document.querySelector('.cine-train-wrap');
   if(wrap){ wrap.style.animation='none'; wrap.offsetHeight; wrap.style.animation='cinetrain 2.6s ease-in-out forwards'; }

   if(last && isMilestone){
     // atto finale delle tappe importanti: si ferma su un biglietto di "capitolo completato"
     if(badge) badge.classList.add('show');
     if(note) note.textContent = 'tocca "Continua" per proseguire il viaggio';
     if(btn) btn.textContent = 'Continua ▶';
     root.onclick = null;
     if(btn) btn.onclick = (ev)=>{ ev.stopPropagation(); finish(); };
     return;
   }
   if(note) note.textContent = isMilestone ? 'tocca per continuare la scena' : 'tocca per continuare';
   if(btn) btn.textContent = isMilestone ? 'Avanti ▶' : 'Continua ▶';
   const advance=(ev)=>{ if(ev) ev.stopPropagation(); if(i<acts.length-1) renderAct(i+1); else finish(); };
   clearTimeout(timer);
   timer = setTimeout(advance, isMilestone?5200:4200);
   root.onclick = advance;
   if(btn) btn.onclick = advance;
 };
 let timer;
 renderAct(0);
}


function locomotiveSvg(color="#e43d3d", type=0){
 const accent = type%2 ? "#173c78" : "#2a2a2a";
 return `<svg viewBox="0 0 100 80" aria-hidden="true">
  <rect x="12" y="30" width="60" height="28" rx="7" fill="${color}" stroke="#18345a" stroke-width="4"/>
  <rect x="57" y="16" width="22" height="42" rx="5" fill="${color}" stroke="#18345a" stroke-width="4"/>
  <rect x="62" y="22" width="12" height="12" rx="2" fill="#bff0ff"/>
  <rect x="18" y="36" width="17" height="12" rx="2" fill="#bff0ff"/>
  <rect x="38" y="36" width="14" height="12" rx="2" fill="#bff0ff"/>
  <rect x="79" y="42" width="11" height="8" rx="2" fill="${accent}"/>
  <circle cx="28" cy="63" r="9" fill="#26354d"/><circle cx="28" cy="63" r="4" fill="#a7b7c8"/>
  <circle cx="65" cy="63" r="9" fill="#26354d"/><circle cx="65" cy="63" r="4" fill="#a7b7c8"/>
  <path d="M12 58 L4 66 H16 Z" fill="${accent}"/>
 </svg>`
}

const FALL_SPRITES = Array.from({length:5}, (_,i)=>`assets/sprites_v2/fall_piece_${i}.png?v=22`);
const FALL_FAULT_SPRITES = Array.from({length:5}, (_,i)=>`assets/sprites/dr_fault_${i}.svg`);
const FALL_LOCK_OVERLAY = 'assets/sprites/dr_lock_overlay.svg';
const MATCH_SPRITES = [
 "assets/sprites_v2/piece_locomotive.png?v=22",
 "assets/sprites_v2/piece_carriage.png?v=22",
 "assets/sprites_v2/piece_signal.png?v=22",
 "assets/sprites_v2/piece_ticket.png?v=22",
 "assets/sprites_v2/piece_clock.png?v=22",
 "assets/sprites_v2/piece_suitcase.png?v=22",
 "assets/sprites_v2/piece_cap.png?v=22"
];
const SPECIAL_SPRITES = {
 area:"assets/sprites_v2/special_bomb.png?v=22",
 row:"assets/sprites_v2/special_arrow_row.png?v=22",
 col:"assets/sprites_v2/special_arrow_col.png?v=22",
 colorbomb:"assets/sprites_v2/special_colorbomb.png?v=22"
};
const FLOOR_SPRITES={1:'assets/sprites_v2/floor_crack_1.png?v=22',2:'assets/sprites_v2/floor_crack_2.png?v=22',3:'assets/sprites_v2/floor_crack_3.png?v=22'};
const EVENT_SPRITES={bonusMove:'assets/sprites_v2/bonus_move.png?v=22',bonusRepair:'assets/sprites_v2/bonus_repair.png?v=22',malusDelay:'assets/sprites_v2/malus_delay.png?v=22',malusDamage:'assets/sprites_v2/malus_damage.png?v=22'};
function blockerSpriteFor(hp){
 const world=mWorldConfig?.world||0;
 const crate=(world%3===2 || world>=6);
 return crate ? `assets/sprites_v2/obstacle_crate_${hp>1?2:1}.png` : `assets/sprites_v2/obstacle_barrier_${hp>1?2:1}.png`;
}

function svgData(mark,bg='#e94e55',fg='#ffffff'){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="5" y="8" width="90" height="84" rx="22" fill="${bg}"/><circle cx="50" cy="50" r="35" fill="rgba(255,255,255,.18)"/><text x="50" y="61" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" font-weight="900" fill="${fg}">${mark}</text></svg>`;
 return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}
const MATCH_FALLBACKS=[svgData('🚂','#e64545'),svgData('▰','#2484cf'),svgData('●','#35ae68'),svgData('T','#e7b631','#5b3900'),svgData('◷','#7b52c9'),svgData('▣','#dc5596'),svgData('★','#185b9e')];
function installImageFallback(img,type=0){
 if(!img) return;
 img.onerror=()=>{ img.onerror=null; img.src=MATCH_FALLBACKS[type%MATCH_FALLBACKS.length]; img.dataset.fallback='1'; };
}

const IMG_CACHE = {};
function loadSprite(src){
 if(!IMG_CACHE[src]){
  const img=new Image();
  img.onerror=()=>console.warn('[Mimmo Express] asset non caricato:',src);
  img.src=src; IMG_CACHE[src]=img;
 }
 return IMG_CACHE[src];
}
[FALL_SPRITES,FALL_FAULT_SPRITES,[FALL_LOCK_OVERLAY],MATCH_SPRITES,Object.values(SPECIAL_SPRITES),Object.values(FLOOR_SPRITES),Object.values(EVENT_SPRITES),["assets/sprites_v2/obstacle_barrier_1.png?v=22","assets/sprites_v2/obstacle_barrier_2.png?v=22","assets/sprites_v2/obstacle_crate_1.png?v=22","assets/sprites_v2/obstacle_crate_2.png?v=22"]].flat().forEach(loadSprite);


let soundEnabled = JSON.parse(localStorage.getItem('mimmo_sound_enabled') || 'true');
let audioCtx = null;
function ensureAudio(){
  if(!soundEnabled) return null;
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}
function setSoundEnabled(v){
  soundEnabled = !!v;
  localStorage.setItem('mimmo_sound_enabled', JSON.stringify(soundEnabled));
  const btn = document.getElementById('soundToggle');
  if(btn){ btn.textContent = soundEnabled ? '🔊' : '🔇'; btn.classList.toggle('off', !soundEnabled); }
}
function playTone(freq=440, dur=.08, type='sine', vol=.04, delay=0){
  const ctx = ensureAudio(); if(!ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t+.01); g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t+dur+.02);
}
function playSfx(name){
  if(!soundEnabled) return;
  if(name==='click'){ playTone(660,.045,'square',.035); }
  else if(name==='move'){ playTone(440,.05,'triangle',.03); playTone(554,.05,'triangle',.025,.035); }
  else if(name==='match'){ playTone(523,.07,'sine',.04); playTone(659,.09,'sine',.03,.04); }
  else if(name==='combo'){ playTone(523,.06,'triangle',.04); playTone(659,.07,'triangle',.035,.04); playTone(784,.10,'triangle',.03,.09); }
  else if(name==='bomb'){ playTone(180,.08,'sawtooth',.06); playTone(110,.16,'triangle',.05,.04); }
  else if(name==='arrow'){ playTone(920,.05,'square',.04); playTone(720,.08,'square',.035,.04); }
  else if(name==='super'){ playTone(784,.06,'triangle',.04); playTone(988,.08,'triangle',.035,.05); playTone(1175,.11,'triangle',.03,.1); }
  else if(name==='whistle'){ playTone(740,.18,'sine',.03); playTone(880,.22,'sine',.028,.18); }
}
window.addEventListener('pointerdown', ()=>ensureAudio(), {once:true});
setTimeout(()=>setSoundEnabled(soundEnabled), 0);

/* HOME */
function chooseMode(mode){
 selectedMode=mode;
 buildMap(mode);
 show("mapScreen");
}
$("#fallMode").onclick=()=>chooseMode("falling");
$("#matchMode").onclick=()=>chooseMode("match");
$("#continueBtn").onclick=()=>chooseMode(localStorage.getItem("mimmo_last_mode")||"falling");
document.querySelectorAll('[data-home-mode]').forEach(btn=>btn.addEventListener('click',()=>chooseMode(btn.dataset.homeMode)));
document.querySelectorAll('[data-home-action="continue"]').forEach(btn=>btn.addEventListener('click',()=>chooseMode(localStorage.getItem("mimmo_last_mode")||"falling")));
document.querySelectorAll('[data-home-action="info"]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById('aboutBtn')?.click()));
$("#aboutBtn").onclick=()=>alert("Mimmo Express V2.1\nDue giochi, 100 livelli ciascuno, mondi scoperti uno alla volta, missioni vere, ostacoli e bonus ferroviari.\nIl viaggio parte da Ardore e sale attraverso la storia di Mimmo.");
$("#backHome").onclick=()=>show("homeScreen");
placeSoundToggle("homeScreen");
const soundToggleEl=document.getElementById("soundToggle"); if(soundToggleEl){ soundToggleEl.onclick=()=>{ setSoundEnabled(!soundEnabled); playSfx("click"); }; }

/* MAP — V2 vertical journey */
const V2_NODE_POS=[[50,84],[66,66],[38,49],[64,31],[48,13]];
let mapViewWorldV21=null;
function buildMap(mode, requestedWorld=null){
 localStorage.setItem("mimmo_last_mode",mode);
 const unlocked=getUnlocked(mode);
 const currentWorld=Math.min(SCENES.length-1,Math.floor((Math.max(1,unlocked)-1)/5));
 if(requestedWorld===null || requestedWorld===undefined) mapViewWorldV21=currentWorld;
 else mapViewWorldV21=Math.max(0,Math.min(currentWorld,requestedWorld));

 $("#mapModeTitle").textContent=MODES[mode].name;
 $("#mapModeSub").textContent=MODES[mode].subtitle+" • il prossimo mondo si scopre scollinando • 100 livelli";
 const route=$("#route"); route.innerHTML=""; route.classList.add('route-v2','route-v21');

 const si=mapViewWorldV21, st=SCENES[si], first=si*5+1,last=first+4;
 const completed=unlocked>last, current=unlocked>=first&&unlocked<=last;
 const sec=document.createElement('section');
 sec.className=`world-card-v2 world-card-v21${completed?' completed':''}${current?' current-world':''}`;
 sec.dataset.world=si+1;
 sec.style.backgroundImage=`linear-gradient(180deg,rgba(5,31,65,.02),rgba(5,31,65,.66)),url("${st.img}")`;
 sec.innerHTML=`<div class="world-horizon-v21"></div>
  <div class="world-secret-v21">${completed && si<SCENES.length-1?'🚂 La tratta continua oltre la collina':'⛰️ Il futuro è oltre la collina'}</div>
  <div class="world-head-v2"><span class="world-number-v2">MONDO ${si+1}</span><b>${si+1}. ${st.name}</b><small>${stationTag(st)} • livelli ${first}-${last}</small></div>
  <svg class="world-track-v2" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path class="world-track-shadow-v2" d="M50,88 C52.7,84.3 68,72.5 66,66 C64,59.5 38.3,54.8 38,49 C37.7,43.2 62.3,37 64,31 C65.7,25 50.7,16 48,13"/>
    <path class="world-track-rail-v2" d="M50,88 C52.7,84.3 68,72.5 66,66 C64,59.5 38.3,54.8 38,49 C37.7,43.2 62.3,37 64,31 C65.7,25 50.7,16 48,13"/>
  </svg>
  <div class="world-caption-v2">${st.summary}</div>`;
 for(let i=0;i<5;i++){
   const lv=first+i,node=document.createElement('button'); node.type='button'; node.dataset.level=lv;
   const isUnlocked=lv<=unlocked, boss=isBossLevel(lv);
   node.className='level-node-v2 '+(lv<unlocked?'done':lv===unlocked?'current':'locked')+(boss?' boss-node':'');
   node.style.left=V2_NODE_POS[i][0]+'%'; node.style.top=V2_NODE_POS[i][1]+'%';
   const bossBadge=boss?`<i class="boss-node-badge">${lv===100?'🏆':'⚡'}</i>`:'';
   node.innerHTML=isUnlocked?`<span>${lv}</span>${lv<unlocked?'<i>✓</i>':bossBadge}`:`<span>?</span>${bossBadge}`;
   node.disabled=!isUnlocked; node.title=isUnlocked?storyFor(lv,mode):'Livello bloccato';
   if(isUnlocked){const go=(ev)=>{ev.preventDefault();ev.stopPropagation();startLevel(mode,lv)};node.addEventListener('click',go);node.addEventListener('touchend',go,{passive:false});}
   sec.appendChild(node);
 }
 if(current){
   const idx=Math.max(0,Math.min(4,unlocked-first)),tr=document.createElement('div'); tr.className='train-marker-v2';tr.innerHTML=ROUTE_TRAIN_SVG;
   tr.style.left=V2_NODE_POS[idx][0]+'%';tr.style.top=(V2_NODE_POS[idx][1]-7)+'%';sec.appendChild(tr);
 }
 if(completed){const badge=document.createElement('div');badge.className='world-complete-v2';badge.textContent='✓ MONDO COMPLETATO';sec.appendChild(badge)}
 route.appendChild(sec);

 const nav=document.createElement('div');nav.className='world-nav-v21';
 const prev=document.createElement('button');prev.type='button';prev.textContent='← Tappa precedente';prev.disabled=si<=0;prev.onclick=()=>buildMap(mode,si-1);nav.appendChild(prev);
 if(si<currentWorld){const now=document.createElement('button');now.type='button';now.textContent='Torna al mondo attuale →';now.onclick=()=>buildMap(mode,currentWorld);nav.appendChild(now);}
 route.appendChild(nav);
 // Su schermi piccoli la card di una stazione è più alta dell'area visibile:
 // centrarla (block:'center') tagliava sempre la parte alta con il nome della
 // stazione. Se la card non entra tutta, la allineiamo in alto invece di centrarla.
 setTimeout(()=>{
   const scroller = route.closest('.map-scroll') || route.parentElement;
   const viewportH = scroller ? scroller.clientHeight : window.innerHeight;
   sec.scrollIntoView({block: sec.offsetHeight > viewportH ? 'start' : 'center'});
 },60);
}
$("#resetMap").onclick=()=>{
 if(confirm("Azzerare i progressi di questa modalità?")){setUnlocked(selectedMode,1);setScores(selectedMode,{});buildMap(selectedMode)}
}

/* FALLING GAME */
const FCOLS=8,FROWS=12,FCELL=60,FColors=["#ed3c4c","#188be7","#36ba54","#f2c02e","#934ed1"];
let fboard=[],fpiece=null,frun=false,flock=false,fscore=0,fobstacles=0,fcombo=1,fdrop=650,flast=0,fstart=0,currentLevel=1;
const fcanvas=$("#fallCanvas"),fctx=fcanvas.getContext("2d");

// Livelli boss: l'ultimo livello di ogni stazione (5, 10, 15 ... 100) è più difficile
// e "impersona" un piccolo antagonista ricorrente della vita di Mimmo, a rotazione;
// il livello 100 è il gran finale, il più duro di tutti.
const BOSSES=[
 {id:'capo',name:'Il Capo del Deposito',icon:svgBadge('#0b448d',ICON_GLYPH.cap_boss),line:'"Mimmo, quella tratta non si libera da sola!" Il capo controlla ogni mossa: oggi bisogna dimostrargli di che pasta è fatto.'},
 {id:'giampy',name:'Giampy, il vicino di casa',icon:svgBadge('#dc922d',ICON_GLYPH.grump),line:'Giampy bussa ancora per lamentarsi del cancello. Stavolta Mimmo non si lascia distrarre da niente.'},
 {id:'guasto',name:'Guasto sui binari',icon:svgBadge('#e45757',ICON_GLYPH.warn),line:'Un guasto improvviso rischia di far accumulare ritardo su tutta la linea: va risolto subito, senza perdere la calma.'}
];
function isBossLevel(level){ return level%5===0; }
function bossForLevel(level){
 if(level===100) return {id:'finale',name:'La Grande Sfida Finale',icon:svgBadge('#ffd457',ICON_GLYPH.trophy),line:'Tutto il viaggio di Mimmo Express, da Ardore fino a qui, porta a questo ultimo grande traguardo.'};
 const stationIndex=Math.floor((level-1)/5);
 return BOSSES[stationIndex%BOSSES.length];
}
function bossDifficultyMult(level){ return level===100?1.35:1.22; }
function showBossIntro(mode,level,onStart){
 const boss=bossForLevel(level), isFinale=level===100;
 let el=document.getElementById('bossOverlay');
 if(!el){ el=document.createElement('div'); el.id='bossOverlay'; el.className='life-overlay boss-overlay'; document.body.appendChild(el); }
 el.innerHTML=`<div class="life-overlay-card boss-overlay-card${isFinale?' boss-finale':''}">
   <div class="boss-overlay-icon">${boss.icon}</div>
   <div class="boss-overlay-tag">${isFinale?'GRAN FINALE':'LIVELLO BOSS'}</div>
   <h2>${boss.name}</h2>
   <p>${boss.line}</p>
   <p class="boss-overlay-note">Livello più impegnativo del solito: circa +${Math.round((bossDifficultyMult(level)-1)*100)}% di difficoltà.</p>
   <div class="life-overlay-actions"><button type="button" class="big-btn" id="bossStartBtn">${isFinale?'Affrontala! 🏆':'Sfida accettata ▶'}</button></div>
 </div>`;
 el.classList.add('show');
 document.getElementById('bossStartBtn').onclick=()=>{ el.classList.remove('show'); el.innerHTML=''; onStart(); };
}
function startLevel(mode,level){
 if(window.MimmoLives && window.MimmoLives.getLives()<=0 && !window.MimmoLives.isRelax()){
   window.MimmoLives.showLockedOverlay({onResume:()=>startLevel(mode,level),onExit:()=>{selectedMode=mode;buildMap(mode);show('mapScreen')}});
   return;
 }
 if(isBossLevel(level)){ showBossIntro(mode,level,()=>startLevelCore(mode,level)); return; }
 startLevelCore(mode,level);
}
function startLevelCore(mode,level){
 selectedMode=mode;
 currentLevel=level;
 localStorage.setItem("mimmo_last_mode",mode);
 const st=stationFor(level);
 const targetId = mode==="falling" ? "fallGame" : "matchGame";
 const target = document.getElementById(targetId);
 const layout = target ? target.querySelector(".game-layout") : null;
 if(layout) layout.style.backgroundImage=`linear-gradient(rgba(2,17,37,.2),rgba(2,17,37,.2)),url("${st.img}")`;
 const ids=["gameStation","gameStation2","gameStation3"];
 ids.forEach(id=>{const el=document.getElementById(id); if(el) el.textContent=stationTitle(level);});
 const levelEl=document.getElementById("gameLevel"); if(levelEl) levelEl.textContent=level;
 updateStoryBoxes(level);
 show(targetId);
 if(mode==="falling") startFalling(level); else startMatch(level);
}
function fempty(){return Array.from({length:FROWS},()=>Array(FCOLS).fill(null))}
function startFalling(level){
 fboard=fempty();fscore=0;fcombo=1;frun=true;flock=false;fstart=performance.now();
 const difficulty=Math.floor((level-1)/10),count=Math.min(28,5+Math.floor(level*.25));
 fdrop=Math.max(260,840-level*5);
 fobstacles=count;placeSignals(count, level<10?3:4);spawnF();updateFHud();
 if(level===1 && localStorage.getItem('mimmo_v15_fall_tutorial')!=='seen') setTimeout(()=>showFallTutorial(true),120);
}
function placeSignals(n,colorCount){
 let tries=0;
 while(n>0&&tries++<3000){
  const r=4+Math.floor(Math.random()*(FROWS-4)),c=Math.floor(Math.random()*FCOLS);
  if(!fboard[r][c]){fboard[r][c]={color:Math.floor(Math.random()*colorCount),signal:true};n--}
 }
}
function spawnF(){
 const cc=currentLevel<10?3:4,a=Math.floor(Math.random()*cc),b=Math.floor(Math.random()*cc);
 fpiece={r:0,c:3,o:0,cells:[{dr:0,dc:0,color:a},{dr:0,dc:1,color:b}]};
 if(!fvalid(fpiece.r,fpiece.c,fpiece.cells)){frun=false;$("#fMessage").textContent="Corsa terminata — riprova"; playSfx("bomb");}
 updateNextPreview(a,b);
}
function updateNextPreview(a,b){
 $("#nextPreview").innerHTML=`<img src="${FALL_SPRITES[a]}" alt="Primo vagone"><span style="font-weight:1000;color:#9a6a00;align-self:center">—</span><img src="${FALL_SPRITES[b]}" alt="Secondo vagone">`;
}
function fvalid(r,c,cells){return cells.every(p=>{let rr=r+p.dr,cc=c+p.dc;return rr>=0&&rr<FROWS&&cc>=0&&cc<FCOLS&&!fboard[rr][cc]})}
function fmove(dr,dc){if(!frun||flock)return false;if(fvalid(fpiece.r+dr,fpiece.c+dc,fpiece.cells)){fpiece.r+=dr;fpiece.c+=dc;return true}return false}
function frotate(){
 if(!frun||flock)return;
 let old=fpiece.cells.map(x=>({...x})), oldo=fpiece.o;
 if(fpiece.o===0){fpiece.cells[1].dr=1;fpiece.cells[1].dc=0;fpiece.o=1}
 else if(fpiece.o===1){fpiece.cells[1].dr=0;fpiece.cells[1].dc=-1;fpiece.o=2}
 else if(fpiece.o===2){fpiece.cells[1].dr=-1;fpiece.cells[1].dc=0;fpiece.o=3}
 else{fpiece.cells[1].dr=0;fpiece.cells[1].dc=1;fpiece.o=0}
 if(!fvalid(fpiece.r,fpiece.c,fpiece.cells)){
   if(fvalid(fpiece.r,fpiece.c-1,fpiece.cells))fpiece.c--;
   else if(fvalid(fpiece.r,fpiece.c+1,fpiece.cells))fpiece.c++;
   else{fpiece.cells=old;fpiece.o=oldo}
 }
}
function fhard(){if(!frun||flock)return;while(fmove(1,0))fscore++;flockPiece()}
function flockPiece(){fpiece.cells.forEach(p=>fboard[fpiece.r+p.dr][fpiece.c+p.dc]={color:p.color,signal:false});resolveF()}
function matchesF(){
 let s=new Set();
 for(let r=0;r<FROWS;r++){let c=0;while(c<FCOLS){if(!fboard[r][c]){c++;continue}let col=fboard[r][c].color,e=c+1;while(e<FCOLS&&fboard[r][e]&&fboard[r][e].color===col)e++;if(e-c>=3)for(let x=c;x<e;x++)s.add(r+","+x);c=e}}
 for(let c=0;c<FCOLS;c++){let r=0;while(r<FROWS){if(!fboard[r][c]){r++;continue}let col=fboard[r][c].color,e=r+1;while(e<FROWS&&fboard[e][c]&&fboard[e][c].color===col)e++;if(e-r>=3)for(let x=r;x<e;x++)s.add(x+","+c);r=e}}
 return [...s].map(v=>v.split(",").map(Number))
}
function gravityF(){for(let c=0;c<FCOLS;c++){let w=FROWS-1;for(let r=FROWS-1;r>=0;r--)if(fboard[r][c]){if(w!==r){fboard[w][c]=fboard[r][c];fboard[r][c]=null}w--}}}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function resolveF(){
 flock=true;fcombo=1;
 while(true){
   const m=matchesF();if(!m.length)break;
   let kill=0;m.forEach(([r,c])=>{if(fboard[r][c]?.signal)kill++});
   await sleep(80);
   m.forEach(([r,c])=>fboard[r][c]=null);
   playSfx(kill?"bomb":"match");
   fobstacles-=kill;fscore+=m.length*100*fcombo+kill*500;fcombo++;gravityF();drawF();updateFHud();await sleep(130);
 }
 fcombo=Math.max(1,fcombo-1);
 if(fobstacles<=0){completeLevel("falling");return}
 flock=false;spawnF();updateFHud()
}
function completeLevel(mode){
 if(mode==="falling")frun=false;
 else mrun=false;
 const scores=getScores(mode),old=scores[currentLevel]||0,newScore=mode==="falling"?fscore:mscore;
 if(newScore>old){scores[currentLevel]=newScore;setScores(mode,scores)}
 setUnlocked(mode,Math.max(getUnlocked(mode),Math.min(100,currentLevel+1)));
 if(window.MimmoLives){
   if(within(currentLevel)===5){
     const stationIndex=Math.floor((currentLevel-1)/5);
     window.MimmoLives.stationToast(window.MimmoLives.awardStationBonusOnce(mode,stationIndex));
   }
   const nextStationIndex=Math.floor((Math.min(100,currentLevel+1)-1)/5);
   const nextSt=SCENES[nextStationIndex];
   if(within(currentLevel)===5 && nextSt && nextSt.beats) window.MimmoLives.awardNarrativeBonusOnce(nextStationIndex);
 }
 const msg=mode==="falling"?$("#fMessage"):$("#mMessage");
 const nextLevel=Math.min(100,currentLevel+1);
 const enteringNewStation = within(currentLevel)===5 || currentLevel===100;
 msg.textContent=currentLevel===100?"GRAN FINALE COMPLETATO!":"Tratta completata! Prossima tappa: "+stationFor(nextLevel).name+".";
 if(enteringNewStation){
   const stIdx = Math.floor((nextLevel-1)/5);
   playStationCinematic(mode, stIdx, ()=>{selectedMode=mode;buildMap(mode);show("mapScreen")});
 } else {
   genericToast('✅ Tratta completata! Si prosegue verso '+stationFor(nextLevel).name+'.');
   selectedMode=mode;buildMap(mode);show("mapScreen");
 }
}
function updateFHud(){
 $("#fScore").textContent=String(fscore).padStart(7,"0");$("#fLevel").textContent=currentLevel;$("#fSignals").textContent=fobstacles;
 const sp=Math.min(4,1+Math.floor((840-fdrop)/150));$$("#fSpeed i").forEach((x,i)=>x.classList.toggle("on",i<sp));
 $("#fMessage").textContent=fobstacles>0?`Libera ${fobstacles} vagoni bloccati abbinando stesso colore e simbolo`:"Tratta libera!";
 const fStory=document.getElementById("fStory"); if(fStory && !fStory.textContent) fStory.textContent=storyFor(currentLevel,'falling');
}
function wagon(r,c,obj,ghost=false,active=false){
 const x=c*FCELL,y=r*FCELL; fctx.save(); fctx.globalAlpha=ghost?0.27:1;
 if(active){
   const pulse=.62+.20*Math.sin(performance.now()/130);
   fctx.shadowColor=`rgba(255,222,90,${pulse})`; fctx.shadowBlur=16;
   fctx.fillStyle='rgba(255,226,86,.14)';
   fctx.beginPath(); fctx.roundRect(x+3,y+3,54,54,12); fctx.fill();
 }
 const base=loadSprite(FALL_SPRITES[obj.color]);
 if(base.complete) fctx.drawImage(base,x+4,y+4,52,52);
 else { fctx.fillStyle=FColors[obj.color]; fctx.fillRect(x+8,y+8,44,44); }
 if(active){
   fctx.shadowBlur=0; fctx.strokeStyle='#ffe05a'; fctx.lineWidth=3;
   fctx.beginPath(); fctx.roundRect(x+5,y+5,50,50,10); fctx.stroke();
 }
 if(obj.signal){
   fctx.fillStyle='rgba(4,14,28,.20)'; fctx.fillRect(x+4,y+4,52,52);
   const lock=loadSprite(FALL_LOCK_OVERLAY);
   if(lock.complete) fctx.drawImage(lock,x+4,y+4,52,52);
 }
 fctx.restore();
}
function drawF(){
 fctx.clearRect(0,0,fcanvas.width,fcanvas.height);
 let g=fctx.createLinearGradient(0,0,0,fcanvas.height);g.addColorStop(0,"#10294c");g.addColorStop(1,"#040c1a");fctx.fillStyle=g;fctx.fillRect(0,0,fcanvas.width,fcanvas.height);
 fctx.strokeStyle="#ffffff13";for(let c=1;c<FCOLS;c++){fctx.beginPath();fctx.moveTo(c*FCELL,0);fctx.lineTo(c*FCELL,720);fctx.stroke()}for(let r=1;r<FROWS;r++){fctx.beginPath();fctx.moveTo(0,r*FCELL);fctx.lineTo(480,r*FCELL);fctx.stroke()}
 fboard.forEach((row,r)=>row.forEach((o,c)=>o&&wagon(r,c,o)));
 if(fpiece&&frun){
   let gr=fpiece.r;while(fvalid(gr+1,fpiece.c,fpiece.cells))gr++;
   fpiece.cells.forEach(p=>wagon(gr+p.dr,fpiece.c+p.dc,{color:p.color},true));
   // Connettore visibile: i due vagoni sono un unico pezzo che cade.
   const a=fpiece.cells[0],b=fpiece.cells[1];
   const ax=(fpiece.c+a.dc)*FCELL+FCELL/2, ay=(fpiece.r+a.dr)*FCELL+FCELL/2;
   const bx=(fpiece.c+b.dc)*FCELL+FCELL/2, by=(fpiece.r+b.dr)*FCELL+FCELL/2;
   fctx.save(); fctx.strokeStyle='#f4d36b'; fctx.lineWidth=8; fctx.lineCap='round'; fctx.beginPath(); fctx.moveTo(ax,ay); fctx.lineTo(bx,by); fctx.stroke(); fctx.strokeStyle='#34445d'; fctx.lineWidth=3; fctx.beginPath(); fctx.moveTo(ax,ay); fctx.lineTo(bx,by); fctx.stroke(); fctx.restore();
   fpiece.cells.forEach(p=>wagon(fpiece.r+p.dr,fpiece.c+p.dc,{color:p.color},false,true));
 }
}
function ftick(t){if(window.MIMMO_BINARI_V22){requestAnimationFrame(ftick);return;}if(frun&&!flock&&t-flast>fdrop){if(!fmove(1,0))flockPiece();flast=t}drawF();requestAnimationFrame(ftick)}
requestAnimationFrame(ftick);

function showFallTutorial(show=true){
 const box=document.getElementById('fallTutorial'); if(!box) return;
 box.classList.toggle('show',!!show); box.setAttribute('aria-hidden',show?'false':'true');
}
function closeFallTutorial(){ localStorage.setItem('mimmo_v15_fall_tutorial','seen'); showFallTutorial(false); }
const fallHelp=document.getElementById('fallHelp'); if(fallHelp) fallHelp.onclick=()=>showFallTutorial(true);
const fallTutorialClose=document.getElementById('fallTutorialClose'); if(fallTutorialClose) fallTutorialClose.onclick=closeFallTutorial;
const fallTutorialOk=document.getElementById('fallTutorialOk'); if(fallTutorialOk) fallTutorialOk.onclick=closeFallTutorial;

/* Falling controls */
document.addEventListener("keydown",e=>{
 if(!$("#fallGame").classList.contains("active")||window.MIMMO_BINARI_V22)return;
 if(["ArrowLeft","ArrowRight","ArrowDown","ArrowUp"," "].includes(e.key))e.preventDefault();
 if(e.key==="ArrowLeft"){fmove(0,-1);playSfx("move")}else if(e.key==="ArrowRight"){fmove(0,1);playSfx("move")}else if(e.key==="ArrowDown"){if(!fmove(1,0))flockPiece()}else if(e.key==="ArrowUp"){frotate();playSfx("click")}else if(e.key===" "){fhard();playSfx("move")}
})
$$("[data-f]").forEach(b=>b.onclick=()=>{let a=b.dataset.f;playSfx(a==="rot"?"click":"move");if(a==="left")fmove(0,-1);if(a==="right")fmove(0,1);if(a==="rot")frotate();if(a==="drop")fhard()});
// Touch/pen gestures on the vertical board
let fPointer=null;
fcanvas.addEventListener('pointerdown', ev=>{ if(!frun||flock) return; fPointer={x:ev.clientX,y:ev.clientY}; fcanvas.setPointerCapture?.(ev.pointerId); ev.preventDefault(); });
fcanvas.addEventListener('pointerup', ev=>{
 if(!fPointer||!frun||flock) return;
 const dx=ev.clientX-fPointer.x, dy=ev.clientY-fPointer.y; fPointer=null; ev.preventDefault();
 if(Math.abs(dx)<14 && Math.abs(dy)<14){ frotate(); playSfx('click'); return; }
 if(Math.abs(dy)>Math.abs(dx) && dy>42){ if(dy>105) fhard(); else { const steps=Math.min(4,Math.max(1,Math.round(dy/38))); for(let i=0;i<steps;i++) if(!fmove(1,0)){flockPiece();break;} } playSfx('move'); return; }
 if(Math.abs(dx)>24){ const steps=Math.min(3,Math.max(1,Math.round(Math.abs(dx)/45))); const dir=dx>0?1:-1; for(let i=0;i<steps;i++) fmove(0,dir); playSfx('move'); }
});
fcanvas.addEventListener('contextmenu', ev=>ev.preventDefault());

$("#fallMap").onclick=()=>{selectedMode="falling";buildMap("falling");show("mapScreen")}


/* MATCH-3 — V1.4 */
const MC=8,MR=8,MTYPES=7;
let mboard=[],mFloor=[],mselected=null,mmoves=0,mscore=0,mtarget=0,mrun=false,mbusy=false,mlastSwapDir='row';
let mTurns=0;
let mVisual={clearing:new Set(), born:null, swipe:null, swap:null, spawnOffsets:{}, hint:null};
let mHintTimer=null;
let mPool=[0,1,2,3,4],mWorldConfig=null,mMission=null;
let mStats={clearedByType:Array(7).fill(0),specialsMade:0,blockersBroken:0,floorsBroken:0};
const MATCH_POOLS=[
 [0,1,2,3],        // Ardore: very readable
 [0,1,2,3,4],      // Bovalino: clock enters
 [0,1,2,3,4,5],    // Locri: suitcase enters
 [0,1,2,3,4,5,6],  // Gioiosa onward: full set
 [0,1,2,3,4,5,6]
];
const MATCH_THEMES=[
 {name:'Ardore • Partenza',accent:'#2f9fe8',soft:'#e6f6ff'},
 {name:'Bovalino • Segnali',accent:'#e45757',soft:'#fff0e8'},
 {name:'Locri • Binari fragili',accent:'#7b5fd3',soft:'#f2eeff'},
 {name:'Gioiosa • Orari stretti',accent:'#9a4fab',soft:'#faedff'},
 {name:'Siderno • Merci e casse',accent:'#dc922d',soft:'#fff4da'},
 {name:'Firenze • Grande stazione',accent:'#d54883',soft:'#ffeaf3'},
 {name:'Valdarno • Scambi',accent:'#42a562',soft:'#ebf9ee'},
 {name:'Rete nazionale',accent:'#2676b8',soft:'#e9f3ff'}
];
function getMatchWorldConfig(level){
 const world=Math.floor((level-1)/5),step=(level-1)%5,theme=MATCH_THEMES[Math.min(MATCH_THEMES.length-1,world%MATCH_THEMES.length)];
 const pool=MATCH_POOLS[Math.min(MATCH_POOLS.length-1,world)];
 let blockers=world===0?0:(world===1?2+Math.floor((step+1)/2):Math.min(10,2+Math.floor(world*.55)+Math.floor(step/2)));
 const hp=world<3?1:(world<8?(step>=3?2:1):2);
 let floorCells=world<2?0:(world===2?3+step:Math.min(9,2+Math.floor((world-2)*.55)+Math.floor(step/2)));
 const floorHp=world<5?1:(world<11?2:3);
 const eventEvery=world<2?0:Math.max(4,6-Math.floor(world/6));
 let moves=Math.max(20,34-Math.floor(world/2)-Math.floor(step/2));
 let target=Math.round((1250+level*135)*(1+Math.min(.20,world*.012)));
 const isBoss=isBossLevel(level);
 if(isBoss){
   const mult=bossDifficultyMult(level);
   blockers=Math.min(14,Math.ceil((blockers||1)*mult));
   floorCells=Math.min(14,Math.ceil((floorCells||1)*mult*.8));
   moves=Math.max(14,Math.round(moves/ (1+(mult-1)*.6) ));
   target=Math.round(target*mult);
 }
 return {world,step,pool,blockers,hp,floorCells,floorHp,eventEvery,moves,target,isBoss,...theme};
}
function getMissionForLevel(level,cfg){
 const w=cfg.world,s=cfg.step,scale=1+Math.floor(w/4);
 if(w===0){
   return [
    {title:'Partenza da Ardore',reqs:[{kind:'score',count:1200}],desc:'Raggiungi 1.200 punti e prendi confidenza con gli scambi.'},
    {title:'Prime carrozze',reqs:[{kind:'collect',type:1,count:8}],desc:'Raccogli 8 carrozze blu.'},
    {title:'Segnali in ordine',reqs:[{kind:'collect',type:2,count:8}],desc:'Raccogli 8 segnali.'},
    {title:'Prima speciale',reqs:[{kind:'specials',count:1}],desc:'Crea almeno 1 pezzo speciale.'},
    {title:'Saluto ad Ardore',reqs:[{kind:'collect',type:3,count:8},{kind:'specials',count:1}],desc:'Raccogli 8 biglietti e crea una speciale.'}
   ][s];
 }
 if(w===1){
   return [
    {title:'Segnali di Bovalino',reqs:[{kind:'blockers',count:2}],desc:'Rimuovi 2 ostacoli ferroviari.'},
    {title:'Linea libera',reqs:[{kind:'blockers',count:3}],desc:'Rimuovi 3 ostacoli ferroviari.'},
    {title:'Controllo segnali',reqs:[{kind:'collect',type:2,count:8},{kind:'blockers',count:2}],desc:'Raccogli 8 segnali e rimuovi 2 ostacoli.'},
    {title:'Manovra speciale',reqs:[{kind:'specials',count:2},{kind:'blockers',count:2}],desc:'Crea 2 speciali e libera 2 ostacoli.'},
    {title:'Partenza per Locri',reqs:[{kind:'blockers',count:4},{kind:'collect',type:1,count:8}],desc:'Rimuovi 4 ostacoli e raccogli 8 carrozze.'}
   ][s];
 }
 if(w===2){
   return [
    {title:'Binari di Locri',reqs:[{kind:'fragile',count:2}],desc:'Rompi 2 caselle di binario fragile.'},
    {title:'Manutenzione',reqs:[{kind:'fragile',count:3},{kind:'collect',type:3,count:6}],desc:'Libera 3 binari e raccogli 6 biglietti.'},
    {title:'Scambio difficile',reqs:[{kind:'fragile',count:4}],desc:'Libera 4 caselle fragili.'},
    {title:'Combo sui binari',reqs:[{kind:'fragile',count:3},{kind:'specials',count:2}],desc:'Libera 3 binari e crea 2 speciali.'},
    {title:'Locri completata',reqs:[{kind:'fragile',count:5},{kind:'blockers',count:2}],desc:'Libera 5 binari e 2 ostacoli.'}
   ][s];
 }
 const targetType=(w+s)%7;
 const templates=[
   {title:'Raccolta ferroviaria',reqs:[{kind:'collect',type:targetType,count:8+scale*2}],desc:`Raccogli ${8+scale*2} ${pieceName(targetType)}.`},
   {title:'Manutenzione linea',reqs:[{kind:'blockers',count:Math.min(cfg.blockers,3+scale)},{kind:'fragile',count:Math.min(cfg.floorCells,2+scale)}],desc:'Libera ostacoli e caselle danneggiate.'},
   {title:'Speciali in servizio',reqs:[{kind:'specials',count:2+Math.min(2,scale)}],desc:`Crea ${2+Math.min(2,scale)} pezzi speciali.`},
   {title:'Trasporto misto',reqs:[{kind:'collect',type:targetType,count:6+scale*2},{kind:'blockers',count:Math.min(cfg.blockers,2+scale)}],desc:'Raccogli il carico e libera la linea.'},
   {title:'Capolinea del mondo',reqs:[{kind:'specials',count:2+scale},{kind:'fragile',count:Math.min(cfg.floorCells,3+scale)},{kind:'score',count:Math.round(cfg.target*.65)}],desc:'Completa una missione mista per sbloccare il mondo successivo.'}
 ];
 return templates[s];
}
const PIECE_NAMES=['locomotive','carrozze','segnali','biglietti','orologi','valigie','berretti'];
function pieceName(type){return PIECE_NAMES[type]||'pezzi'}
function makeTile(type=null, special=null, blocker=0){
 if(type===null || type===undefined) type=mPool[Math.floor(Math.random()*mPool.length)];
 return {type, special, blocker:blocker||0};
}
function cloneTile(t){ return t ? {type:t.type, special:t.special||null, blocker:t.blocker||0} : null; }
function tileKey(r,c){ return `${r},${c}`; }
function flashMatchFx(text){
 const el=$("#matchFxText"); if(!el) return;
 let icon=''; if(text.startsWith('BONUS')) icon=EVENT_SPRITES.bonusMove; else if(text.startsWith('MALUS')) icon=EVENT_SPRITES.malusDelay;
 el.innerHTML=icon?`<img src="${icon}" alt=""> <span>${text}</span>`:`<span>${text}</span>`;
 el.classList.add('show'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'), 850);
}
function boardCellMetrics(r,c){ const board=$("#matchBoard"); const cell=board?.querySelector(`.match-tile[data-r="${r}"][data-c="${c}"]`); if(!board||!cell)return null; const br=board.getBoundingClientRect(),cr=cell.getBoundingClientRect(); return {cx:cr.left-br.left+cr.width/2,cy:cr.top-br.top+cr.height/2,width:cr.width,height:cr.height}; }
function clearFxLayer(){ const layer=$("#matchFxLayer"); if(layer)layer.innerHTML=''; }
function spawnBurstAt(r,c){ const layer=$("#matchFxLayer"),m=boardCellMetrics(r,c); if(!layer||!m)return; const d=document.createElement('div');d.className='fx-burst';d.style.left=m.cx+'px';d.style.top=m.cy+'px';layer.appendChild(d);setTimeout(()=>d.remove(),520); }
function spawnBeam(r,c,dir){ const layer=$("#matchFxLayer"),board=$("#matchBoard"),m=boardCellMetrics(r,c);if(!layer||!board||!m)return;const d=document.createElement('div');d.className='fx-beam '+dir;if(dir==='row'){d.style.left='8px';d.style.top=(m.cy-7)+'px';d.style.width=(board.clientWidth-16)+'px'}else{d.style.left=(m.cx-7)+'px';d.style.top='8px';d.style.height=(board.clientHeight-16)+'px'}layer.appendChild(d);setTimeout(()=>d.remove(),450);}
function triggerSwipePreview(r,c,dx,dy){mVisual.swipe={r,c,dx,dy};renderM()}
function clearSwipePreview(){if(mVisual.swipe){mVisual.swipe=null;renderM()}}
function countBlockersM(){let n=0;for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)if(mboard[r][c]?.blocker>0)n++;return n}
function countFragileCellsM(){let n=0;for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)if((mFloor[r]?.[c]||0)>0)n++;return n}
function seedFragileCells(level){
 const cfg=mWorldConfig||getMatchWorldConfig(level);mFloor=Array.from({length:MR},()=>Array(MC).fill(0));if(!cfg.floorCells)return;
 const patterns=[[[1,2],[1,5],[3,3],[4,4],[6,2],[6,5]],[[2,1],[2,3],[2,5],[5,2],[5,4],[5,6]],[[1,1],[1,6],[3,2],[3,5],[6,1],[6,6]],[[2,2],[2,5],[4,3],[4,4],[5,2],[5,5]]];
 const coords=[...patterns[cfg.step%patterns.length]];for(let r=1;r<MR-1;r++)for(let c=1;c<MC-1;c++)if(!coords.some(([rr,cc])=>rr===r&&cc===c))coords.push([r,c]);
 let placed=0;for(const[r,c]of coords){if(placed>=cfg.floorCells)break;if(mboard[r][c]?.blocker)continue;mFloor[r][c]=cfg.floorHp;placed++;}
}
function damageFragileCells(clear){
 if(!clear.length)return 0;const hit=new Set();const ortho=[[0,0],[1,0],[-1,0],[0,1],[0,-1]];
 clear.forEach(([r,c])=>ortho.forEach(([dr,dc])=>{const rr=r+dr,cc=c+dc;if(rr>=0&&rr<MR&&cc>=0&&cc<MC&&(mFloor[rr]?.[cc]||0)>0)hit.add(tileKey(rr,cc))}));
 let broken=0,cracked=0;hit.forEach(k=>{const[r,c]=k.split(',').map(Number);mFloor[r][c]=Math.max(0,mFloor[r][c]-1);if(mFloor[r][c]===0)broken++;else cracked++});
 mStats.floorsBroken+=broken;
 if(broken)flashMatchFx('BINARIO LIBERATO!');else if(cracked)flashMatchFx('BINARIO INCRINATO!'); return broken;
}
function seedMatchBlockers(level){
 const cfg=mWorldConfig||getMatchWorldConfig(level); if(!cfg.blockers)return;
 const patterns=[
   [[3,3],[3,4],[4,3],[4,4],[2,3],[5,4]],
   [[2,2],[2,5],[5,2],[5,5],[3,3],[4,4]],
   [[1,3],[2,3],[3,3],[4,4],[5,4],[6,4]],
   [[2,1],[2,3],[2,5],[5,2],[5,4],[5,6]],
   [[1,1],[1,6],[3,3],[4,4],[6,1],[6,6]]
 ];
 const base=patterns[cfg.step%patterns.length],coords=[];
 base.forEach(p=>coords.push(p));
 for(let r=1;r<MR-1;r++)for(let c=1;c<MC-1;c++)if(!coords.some(([rr,cc])=>rr===r&&cc===c))coords.push([r,c]);
 let placed=0;
 for(const [r,c] of coords){if(placed>=cfg.blockers)break;const tile=mboard[r][c];if(!tile||tile.blocker)continue;tile.blocker=(cfg.hp===2&&placed%3===0)?2:1;placed++;}
}
function canUseCell(r,c){const t=mboard[r]?.[c];return !!t&&!(t.blocker>0)}
function missionRequirementProgress(req){
 if(req.kind==='score')return Math.min(req.count,mscore);
 if(req.kind==='collect')return Math.min(req.count,mStats.clearedByType[req.type]||0);
 if(req.kind==='specials')return Math.min(req.count,mStats.specialsMade);
 if(req.kind==='blockers')return Math.min(req.count,mStats.blockersBroken);
 if(req.kind==='fragile')return Math.min(req.count,mStats.floorsBroken);
 return 0;
}
function missionProgressRatio(){if(!mMission?.reqs?.length)return 0;return mMission.reqs.reduce((a,r)=>a+missionRequirementProgress(r)/r.count,0)/mMission.reqs.length}
function missionProgressText(){if(!mMission)return '';return mMission.reqs.map(r=>{
 const p=missionRequirementProgress(r),label=r.kind==='score'?'punti':r.kind==='collect'?pieceName(r.type):r.kind==='specials'?'speciali':r.kind==='blockers'?'ostacoli':'binari';return `${p}/${r.count} ${label}`
}).join(' • ')}
function matchObjectiveMet(){return !!mMission&&mMission.reqs.every(r=>missionRequirementProgress(r)>=r.count)}
function applyBlockerDamage(clear){
 const ortho=[[1,0],[-1,0],[0,1],[0,-1]],damage=new Set();
 clear.forEach(([r,c])=>ortho.forEach(([dr,dc])=>{const rr=r+dr,cc=c+dc;if(rr>=0&&rr<MR&&cc>=0&&cc<MC&&mboard[rr][cc]?.blocker>0)damage.add(tileKey(rr,cc))}));
 let broken=0,cracked=0;damage.forEach(k=>{const [r,c]=k.split(',').map(Number),t=mboard[r][c];t.blocker=Math.max(0,t.blocker-1);if(t.blocker===0)broken++;else cracked++});
 mStats.blockersBroken+=broken;
 if(broken)flashMatchFx('OSTACOLO LIBERATO!');else if(cracked)flashMatchFx('OSTACOLO DANNEGGIATO!'); return broken;
}
function sameType(a,b){return a&&b&&!a.blocker&&!b.blocker&&a.special!=='colorbomb'&&b.special!=='colorbomb'&&a.type===b.type}
function findMatchGroups(){
 const groups=[];
 for(let r=0;r<MR;r++){let c=0;while(c<MC){const base=mboard[r][c];let e=c+1;while(base&&e<MC&&sameType(base,mboard[r][e]))e++;if(base&&!base.blocker&&base.special!=='colorbomb'&&e-c>=3)groups.push({dir:'row',cells:Array.from({length:e-c},(_,i)=>[r,c+i])});c=e}}
 for(let c=0;c<MC;c++){let r=0;while(r<MR){const base=mboard[r][c];let e=r+1;while(base&&e<MR&&sameType(base,mboard[e][c]))e++;if(base&&!base.blocker&&base.special!=='colorbomb'&&e-r>=3)groups.push({dir:'col',cells:Array.from({length:e-r},(_,i)=>[r+i,c])});r=e}}
 const set=new Set();groups.forEach(g=>g.cells.forEach(([r,c])=>set.add(tileKey(r,c))));return{groups,cells:[...set].map(v=>v.split(',').map(Number))}
}
function findIntersections(groups){const count={};groups.forEach(g=>g.cells.forEach(([r,c])=>{const k=tileKey(r,c);count[k]=(count[k]||0)+1}));return Object.keys(count).filter(k=>count[k]>1).map(v=>v.split(',').map(Number))}
function renderM(){
 const b=$("#matchBoard");if(!b)return;b.innerHTML='';
 mboard.forEach((row,r)=>row.forEach((tile,c)=>{const d=document.createElement('div'),k=tileKey(r,c);d.className='match-tile';d.dataset.r=r;d.dataset.c=c;if(tile.blocker>0)d.classList.add('blocked');if(tile.special)d.classList.add('special-tile');if(mselected&&mselected.r===r&&mselected.c===c)d.classList.add('selected');if(mVisual.clearing.has(k))d.classList.add('clearing');if(mVisual.born===k)d.classList.add('special-born');if(mVisual.hint&&(tileKey(mVisual.hint.a.r,mVisual.hint.a.c)===k||tileKey(mVisual.hint.b.r,mVisual.hint.b.c)===k))d.classList.add('hinted');if(mVisual.swipe&&mVisual.swipe.r===r&&mVisual.swipe.c===c){d.classList.add('swipe-preview');d.style.transform=`translate(${mVisual.swipe.dx}px,${mVisual.swipe.dy}px) scale(.94)`}if(mVisual.swap&&((mVisual.swap.a.r===r&&mVisual.swap.a.c===c)||(mVisual.swap.b.r===r&&mVisual.swap.b.c===c))){d.classList.add('swapping');const isA=mVisual.swap.a.r===r&&mVisual.swap.a.c===c,sign=isA?1:-1;d.style.transform=`translate(${mVisual.swap.dx*sign}px,${mVisual.swap.dy*sign}px)`}
 const floorHp=mFloor[r]?.[c]||0;if(floorHp)d.classList.add('has-fragile-cell');
 const spawnOffset=mVisual.spawnOffsets[k]||0;d.innerHTML=`<img class="base-piece" src="${MATCH_SPRITES[tile.type]}" alt="${pieceName(tile.type)}">${floorHp?`<div class="floor-overlay"><img src="${FLOOR_SPRITES[Math.min(3,floorHp)]}" alt="binario fragile"></div><div class="floor-hp">${floorHp}</div>`:''}${tile.special?`<img class="special-overlay" src="${SPECIAL_SPRITES[tile.special]}" alt="bonus ${tile.special}">`:''}${tile.blocker?`<div class="blocker-overlay"><img src="${blockerSpriteFor(tile.blocker)}" alt="ostacolo ferroviario"></div>`:''}`;installImageFallback(d.querySelector('.base-piece'),tile.type);d.addEventListener('click',()=>pickM(r,c));attachSwipe(d,r,c);b.appendChild(d);if(spawnOffset>0){d.classList.add('falling-in');d.style.transform=`translateY(${-Math.min(240,spawnOffset*22)}px)`;requestAnimationFrame(()=>{d.style.transform='translateY(0)';d.style.opacity='1'})}}));mVisual.spawnOffsets={}
}
function resetHintTimer(){clearTimeout(mHintTimer);if(mVisual.hint){mVisual.hint=null;renderM()}if(mrun&&!mbusy)mHintTimer=setTimeout(showHint,5200)}
function findHintMove(){
 const dirs=[[0,1],[1,0]];
 for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)for(const[dr,dc]of dirs){const rr=r+dr,cc=c+dc;if(rr>=MR||cc>=MC||!canUseCell(r,c)||!canUseCell(rr,cc))continue;const a=mboard[r][c],b=mboard[rr][cc];if(a.special||b.special)return{a:{r,c},b:{r:rr,c:cc}};[mboard[r][c],mboard[rr][cc]]=[mboard[rr][cc],mboard[r][c]];const ok=findMatchGroups().groups.length>0;[mboard[r][c],mboard[rr][cc]]=[mboard[rr][cc],mboard[r][c]];if(ok)return{a:{r,c},b:{r:rr,c:cc}}}
 return null
}
async function shuffleMatchBoard(){
 if(mbusy||!mrun)return;mbusy=true;mVisual.hint=null;flashMatchFx('RIMESCOLAMENTO!');playSfx('combo');
 const coords=[],vals=[];for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)if(canUseCell(r,c)){coords.push([r,c]);vals.push(cloneTile(mboard[r][c]))}
 for(let attempt=0;attempt<80;attempt++){for(let i=vals.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[vals[i],vals[j]]=[vals[j],vals[i]]}coords.forEach(([r,c],i)=>mboard[r][c]=cloneTile(vals[i]));if(!findMatchGroups().groups.length&&findHintMove())break}
 renderM();await sleep(350);mbusy=false;resetHintTimer()
}
function showHint(){if(!mrun||mbusy)return;const hint=findHintMove();if(!hint){shuffleMatchBoard();return}mVisual.hint=hint;flashMatchFx('PROVA QUESTA MOSSA');renderM()}
function attachSwipe(el,r,c){let sx=0,sy=0,active=false;el.addEventListener('touchstart',ev=>{resetHintTimer();const t=ev.changedTouches[0];sx=t.clientX;sy=t.clientY;active=true;triggerSwipePreview(r,c,0,0)},{passive:true});el.addEventListener('touchmove',ev=>{if(!active)return;const t=ev.changedTouches[0],dx=Math.max(-18,Math.min(18,t.clientX-sx)),dy=Math.max(-18,Math.min(18,t.clientY-sy));triggerSwipePreview(r,c,dx,dy)},{passive:true});el.addEventListener('touchend',ev=>{if(!active)return;active=false;const t=ev.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;clearSwipePreview();if(Math.abs(dx)<16&&Math.abs(dy)<16){pickM(r,c);return}let nr=r,nc=c;if(Math.abs(dx)>=Math.abs(dy))nc+=dx>0?1:-1;else nr+=dy>0?1:-1;if(nr>=0&&nr<MR&&nc>=0&&nc<MC&&canUseCell(r,c)&&canUseCell(nr,nc))handleSwap({r,c},{r:nr,c:nc})},{passive:true})}
function adjacent(a,b){return Math.abs(a.r-b.r)+Math.abs(a.c-b.c)===1}
function applyMatchWorldTheme(level){
 const cfg=mWorldConfig||getMatchWorldConfig(level),game=document.getElementById('matchGame');
 if(game){game.style.setProperty('--match-accent',cfg.accent);game.style.setProperty('--match-soft',cfg.soft);game.dataset.matchWorld=String(cfg.world+1);}
 const chip=document.getElementById('matchWorldChip');if(chip)chip.textContent=`MONDO ${cfg.world+1} • ${stationFor(level).name}`;
}
function startMatch(level){
 mrun=true;mbusy=false;mselected=null;mscore=0;mTurns=0;mlastSwapDir='row';clearFxLayer();mVisual={clearing:new Set(),born:null,swipe:null,swap:null,spawnOffsets:{},hint:null};
 mWorldConfig=getMatchWorldConfig(level);mPool=[...mWorldConfig.pool];mmoves=mWorldConfig.moves;mtarget=mWorldConfig.target;mMission=getMissionForLevel(level,mWorldConfig);
 mStats={clearedByType:Array(7).fill(0),specialsMade:0,blockersBroken:0,floorsBroken:0};applyMatchWorldTheme(level);
 let safety=0;do{mboard=Array.from({length:MR},()=>Array.from({length:MC},()=>makeTile()));seedMatchBlockers(level);seedFragileCells(level);safety++}while(findMatchGroups().groups.length&&safety<80);
 renderM();updateMHud();flashMatchFx(`MISSIONE • ${mMission.title}`);resetHintTimer();
}
async function pickM(r,c){if(!mrun||mbusy||!canUseCell(r,c))return;resetHintTimer();playSfx('click');if(!mselected){mselected={r,c};renderM();return}const b={r,c};if(!adjacent(mselected,b)){mselected=b;renderM();return}const a=mselected;mselected=null;await handleSwap(a,b)}
async function handleSwap(a,b){
 if(!mrun||mbusy||!canUseCell(a.r,a.c)||!canUseCell(b.r,b.c))return;resetHintTimer();mbusy=true;playSfx('move');mlastSwapDir=a.r===b.r?'row':'col';mVisual.swap={a,b,dx:(b.c-a.c)*34,dy:(b.r-a.r)*34};renderM();await sleep(140);const ta=cloneTile(mboard[a.r][a.c]),tb=cloneTile(mboard[b.r][b.c]);
 if(ta.special&&tb.special){[mboard[a.r][a.c],mboard[b.r][b.c]]=[tb,ta];mVisual.swap=null;renderM();mmoves--;await resolveSpecialCombo(a,b,ta,tb);return finishMove()}
 [mboard[a.r][a.c],mboard[b.r][b.c]]=[mboard[b.r][b.c],mboard[a.r][a.c]];mVisual.swap=null;renderM();await sleep(90);let found=findMatchGroups();
 if(!found.groups.length&&(ta.special||tb.special)){mmoves--;await resolveSpecialNormal(a,b,ta,tb);return finishMove()}
 if(!found.groups.length){playSfx('click');mVisual.swap={a:b,b:a,dx:(a.c-b.c)*34,dy:(a.r-b.r)*34};renderM();await sleep(120);[mboard[a.r][a.c],mboard[b.r][b.c]]=[mboard[b.r][b.c],mboard[a.r][a.c]];mVisual.swap=null;renderM();mbusy=false;resetHintTimer();return}
 mmoves--;await resolveM(b,found);finishMove()
}
function maybeTriggerRailEvent(){
 const cfg=mWorldConfig||getMatchWorldConfig(currentLevel);if(!cfg.eventEvery||mTurns===0||mTurns%cfg.eventEvery!==0)return;
 if(window.MimmoLives && Math.random()<.07){window.MimmoLives.addTicket(1);playSfx('super');return;}
 const roll=Math.random();
 if(roll<.34){mmoves++;flashMatchFx('BONUS • +1 MOSSA');playSfx('combo');return;}
 if(roll<.60){
   const targets=[];for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)if(mboard[r][c]?.blocker>0)targets.push({kind:'block',r,c});
   for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)if((mFloor[r]?.[c]||0)>0)targets.push({kind:'floor',r,c});
   if(targets.length){const t=targets[Math.floor(Math.random()*targets.length)];if(t.kind==='block'){const before=mboard[t.r][t.c].blocker;mboard[t.r][t.c].blocker=Math.max(0,before-1);if(before>0&&mboard[t.r][t.c].blocker===0)mStats.blockersBroken++;}else{const before=mFloor[t.r][t.c];mFloor[t.r][t.c]=Math.max(0,before-1);if(before>0&&mFloor[t.r][t.c]===0)mStats.floorsBroken++;}flashMatchFx('BONUS • MANUTENZIONE');playSfx('match');renderM();return;}
   mmoves++;flashMatchFx('BONUS • +1 MOSSA');return;
 }
 if(roll<.82&&mmoves>6){mmoves--;flashMatchFx('MALUS • RITARDO -1 MOSSA');playSfx('click');return;}
 const free=[];for(let r=1;r<MR-1;r++)for(let c=1;c<MC-1;c++)if(!mboard[r][c]?.blocker&&(mFloor[r]?.[c]||0)===0)free.push([r,c]);
 if(free.length){const[r,c]=free[Math.floor(Math.random()*free.length)];mFloor[r][c]=1;flashMatchFx('MALUS • BINARIO DANNEGGIATO');playSfx('click');renderM();}
}
function finishMove(){mbusy=false;mTurns++;maybeTriggerRailEvent();updateMHud();if(matchObjectiveMet()){completeLevel('match');return}if(mmoves<=0){mrun=false;clearTimeout(mHintTimer);$("#mMessage").textContent='Mosse finite — riprova il livello';matchDefeat();return}if(!findHintMove())shuffleMatchBoard();else resetHintTimer()}
function matchDefeat(){
 if(!window.MimmoLives){return}
 const result=window.MimmoLives.loseLife();
 if(result.lives<=0 && !window.MimmoLives.isRelax()){
   window.MimmoLives.showLockedOverlay({onResume:()=>startMatch(currentLevel),onExit:()=>{selectedMode='match';buildMap('match');show('mapScreen')}});
 } else {
   window.MimmoLives.showDefeatOverlay({title:'Mosse finite',text:'La missione non è stata completata in tempo. Riprova questa tratta.',onRetry:()=>startMatch(currentLevel),onExit:()=>{selectedMode='match';buildMap('match');show('mapScreen')}});
 }
}
function specialQueue(pos,sp,targetType=null){const q=new Set();if(sp==='area'){for(let rr=Math.max(0,pos.r-1);rr<=Math.min(MR-1,pos.r+1);rr++)for(let cc=Math.max(0,pos.c-1);cc<=Math.min(MC-1,pos.c+1);cc++)q.add(tileKey(rr,cc));spawnBurstAt(pos.r,pos.c);playSfx('bomb')}else if(sp==='row'){for(let cc=0;cc<MC;cc++)q.add(tileKey(pos.r,cc));spawnBeam(pos.r,pos.c,'row');playSfx('arrow')}else if(sp==='col'){for(let rr=0;rr<MR;rr++)q.add(tileKey(rr,pos.c));spawnBeam(pos.r,pos.c,'col');playSfx('arrow')}else if(sp==='colorbomb'){for(let rr=0;rr<MR;rr++)for(let cc=0;cc<MC;cc++)if(mboard[rr][cc]&&!mboard[rr][cc].blocker&&(targetType===null||mboard[rr][cc].type===targetType))q.add(tileKey(rr,cc));playSfx('super')}return q}
async function resolveSpecialNormal(a,b,ta,tb){const spTile=ta.special?ta:tb,spPos=ta.special?b:a,other=ta.special?tb:ta,sp=spTile.special,target=other.type;let q=specialQueue(spPos,sp,sp==='colorbomb'?target:null);flashMatchFx(sp==='colorbomb'?'BOMBA COLORE!':sp==='area'?'BOMBA 3×3!':'FRECCIA!');await clearQueueAndCascade(q)}
async function resolveSpecialCombo(a,b,ta,tb){
 const q=new Set(),sa=ta.special,sb=tb.special,center=b;flashMatchFx('SUPER COMBO!');playSfx('combo');
 if(sa==='colorbomb'&&sb==='colorbomb'){for(let r=0;r<MR;r++)for(let c=0;c<MC;c++)if(!mboard[r][c]?.blocker)q.add(tileKey(r,c))}
 else if(sa==='colorbomb'||sb==='colorbomb'){const other=sa==='colorbomb'?tb:ta,target=other.type;for(let r=0;r<MR;r++)for(let c=0;c<MC;c++){const t=mboard[r][c];if(t&&!t.blocker&&t.type===target){q.add(tileKey(r,c));if(other.special==='row'||other.special==='col'){const qq=specialQueue({r,c},other.special);qq.forEach(k=>q.add(k))}else if(other.special==='area'){const qq=specialQueue({r,c},'area');qq.forEach(k=>q.add(k))}}}}
 else if((sa==='row'||sa==='col')&&(sb==='row'||sb==='col')){specialQueue(center,'row').forEach(k=>q.add(k));specialQueue(center,'col').forEach(k=>q.add(k))}
 else if(sa==='area'&&sb==='area'){for(let rr=Math.max(0,center.r-2);rr<=Math.min(MR-1,center.r+2);rr++)for(let cc=Math.max(0,center.c-2);cc<=Math.min(MC-1,center.c+2);cc++)q.add(tileKey(rr,cc));spawnBurstAt(center.r,center.c)}
 else {const arrow=(sa==='row'||sa==='col')?sa:sb,areaPos=center;for(let offset=-1;offset<=1;offset++){const p=arrow==='row'?{r:Math.max(0,Math.min(MR-1,areaPos.r+offset)),c:areaPos.c}:{r:areaPos.r,c:Math.max(0,Math.min(MC-1,areaPos.c+offset))};specialQueue(p,arrow).forEach(k=>q.add(k))}}
 q.add(tileKey(a.r,a.c));q.add(tileKey(b.r,b.c));await clearQueueAndCascade(q)
}
function activateSpecialAt(r,c,q){const t=mboard[r]?.[c];if(!t||!t.special)return;if(t.special==='colorbomb')return;specialQueue({r,c},t.special,t.type).forEach(k=>q.add(k))}
function decideSpecial(spawnCoord,groups){
 const intersections=findIntersections(groups);
 const allCells=new Set(groups.flatMap(g=>g.cells.map(([r,c])=>tileKey(r,c))));
 const choose=(g)=>{ if(spawnCoord&&allCells.has(tileKey(spawnCoord.r,spawnCoord.c))) return {r:spawnCoord.r,c:spawnCoord.c}; if(intersections.length) return {r:intersections[0][0],c:intersections[0][1]}; const mid=g.cells[Math.floor(g.cells.length/2)]; return {r:mid[0],c:mid[1]}; };
 const five=groups.find(g=>g.cells.length>=5);if(five){const p=choose(five),base=mboard[p.r][p.c];return{r:p.r,c:p.c,special:'colorbomb',type:base.type}}
 if(intersections.length){const p={r:intersections[0][0],c:intersections[0][1]},base=mboard[p.r][p.c];return{r:p.r,c:p.c,special:'area',type:base.type}}
 const four=groups.find(g=>g.cells.length>=4);if(four){const p=choose(four),base=mboard[p.r][p.c];return{r:p.r,c:p.c,special:four.dir==='row'?'row':'col',type:base.type}}
 return null
}
function registerClearedTiles(cells){cells.forEach(([r,c])=>{const t=mboard[r]?.[c];if(t&&!t.blocker&&Number.isInteger(t.type))mStats.clearedByType[t.type]=(mStats.clearedByType[t.type]||0)+1})}
async function clearQueueAndCascade(q){let work=new Set(q),changed=true;while(changed){const n=work.size;[...work].forEach(k=>{const[r,c]=k.split(',').map(Number);activateSpecialAt(r,c,work)});changed=work.size!==n}mVisual.clearing=new Set(work);renderM();await sleep(270);const clear=[...work].map(v=>v.split(',').map(Number));applyBlockerDamage(clear);damageFragileCells(clear);const real=clear.filter(([r,c])=>mboard[r][c]&&!mboard[r][c].blocker);registerClearedTiles(real);mscore+=real.length*145;real.forEach(([r,c])=>mboard[r][c]=null);mVisual.clearing=new Set();collapseAndRefill();renderM();await sleep(280);let found=findMatchGroups();if(found.groups.length){playSfx('combo');await resolveM({r:0,c:0},found)}}
function collapseAndRefill(){const spawn={};for(let c=0;c<MC;c++){const vals=[];for(let r=MR-1;r>=0;r--)if(mboard[r][c]!==null)vals.push(cloneTile(mboard[r][c]));let rr=MR-1;vals.forEach((v,i)=>{mboard[rr][c]=v;spawn[tileKey(rr,c)]=i;rr--});while(rr>=0){mboard[rr][c]=makeTile();spawn[tileKey(rr,c)]=rr+2;rr--}}mVisual.spawnOffsets=spawn}
async function resolveM(spawnCoord,firstFound=null){let chain=1,found=firstFound||findMatchGroups();while(found.groups.length){if(chain>1)playSfx('combo');else playSfx('match');const special=decideSpecial(spawnCoord,found.groups);if(special){mStats.specialsMade++;}if(special)flashMatchFx(special.special==='colorbomb'?'BOMBA COLORE CREATA!':special.special==='area'?'BOMBA 3×3 CREATA!':'FRECCIA CREATA!');let q=new Set(found.cells.map(([r,c])=>tileKey(r,c)));if(special)q.delete(tileKey(special.r,special.c));let changed=true;while(changed){const n=q.size;[...q].forEach(k=>{const[r,c]=k.split(',').map(Number);activateSpecialAt(r,c,q)});changed=q.size!==n}mVisual.clearing=new Set(q);renderM();await sleep(270);const clear=[...q].map(v=>v.split(',').map(Number));applyBlockerDamage(clear);damageFragileCells(clear);const real=clear.filter(([r,c])=>mboard[r][c]&&!mboard[r][c].blocker);registerClearedTiles(real);mscore+=(real.length+(special?1:0))*130*chain+(special?(special.special==='colorbomb'?900:550):0);real.forEach(([r,c])=>mboard[r][c]=null);if(special)mboard[special.r][special.c]={type:special.type,special:special.special,blocker:0};mVisual.clearing=new Set();mVisual.born=special?tileKey(special.r,special.c):null;collapseAndRefill();renderM();await sleep(290);mVisual.born=null;found=findMatchGroups();spawnCoord=special?{r:special.r,c:special.c}:spawnCoord;chain++}clearFxLayer()}
function updateMHud(){
 const cfg=mWorldConfig||getMatchWorldConfig(currentLevel),ratio=missionProgressRatio();
 $("#mScore").textContent=String(mscore).padStart(7,'0');
 $("#mLevel").textContent=currentLevel;
 $("#mMoves").textContent=mmoves;
 $("#mTarget").textContent=Math.round(ratio*100)+'%';
 $("#mProgress").style.width=Math.min(100,ratio*100)+'%';
 const progress=missionProgressText();
 $("#mMessage").textContent=mMission?mMission.title:cfg.name;
 const detail=document.getElementById('mMissionDetail'); if(detail)detail.textContent=progress;
 const bar=document.getElementById('mMissionBar'); if(bar)bar.style.width=Math.min(100,ratio*100)+'%';
 const mobile=document.getElementById('mMissionMobile'); if(mobile)mobile.textContent=`🎯 ${mMission?.title||'Missione'} • ${progress}`;
 const mStory=document.getElementById('mStory');if(mStory)mStory.textContent=storyFor(currentLevel,'match');
}
$("#matchMap").onclick=()=>{clearTimeout(mHintTimer);selectedMode='match';buildMap('match');show('mapScreen')}

show("homeScreen");

