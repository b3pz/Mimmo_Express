/* Mimmo Express — sistema vite condiviso (Binari Puzzle + Locomotive Match)
   -------------------------------------------------------------------------
   Regola d'oro: si perde una vita SOLO per una vera sconfitta di livello
   (griglia piena in Binari Puzzle, mosse finite senza missione completata
   in Locomotive Match). Uscire, mettere in pausa, sbagliare una mossa,
   ruotare un pezzo, tornare al menu: nessuna di queste azioni tocca le vite.
*/
(() => {
  'use strict';

  const MAX_LIVES = 5;
  const REGEN_MS = 20 * 60 * 1000; // 1 vita ogni 20 minuti fino al massimo
  const LK = {
    lives: 'mimmo_life_count',
    last: 'mimmo_life_lastRefillAt',
    tickets: 'mimmo_life_tickets',
    relax: 'mimmo_life_relax',
    stationBonus: 'mimmo_life_stationBonus',
    narrativeBonus: 'mimmo_life_narrativeBonus'
  };

  function readInt(key, fallback) {
    const v = parseInt(localStorage.getItem(key), 10);
    return Number.isFinite(v) ? v : fallback;
  }
  function readSet(key) {
    try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
    catch (e) { return new Set(); }
  }
  function writeSet(key, set) { localStorage.setItem(key, JSON.stringify([...set])); }

  function isRelax() { return localStorage.getItem(LK.relax) === '1'; }
  function setRelax(v) {
    localStorage.setItem(LK.relax, v ? '1' : '0');
    refreshWidget();
  }

  // Applica il rigenero passivo delle vite in base al tempo trascorso, poi
  // ritorna lo stato corrente {lives, msToNext}.
  function sync() {
    let lives = readInt(LK.lives, MAX_LIVES);
    lives = Math.max(0, Math.min(MAX_LIVES, lives));
    let last = readInt(LK.last, 0);
    if (lives < MAX_LIVES) {
      if (!last) { last = Date.now(); localStorage.setItem(LK.last, String(last)); }
      const elapsed = Date.now() - last;
      const gained = Math.floor(elapsed / REGEN_MS);
      if (gained > 0) {
        lives = Math.min(MAX_LIVES, lives + gained);
        last = lives >= MAX_LIVES ? 0 : last + gained * REGEN_MS;
        localStorage.setItem(LK.lives, String(lives));
        localStorage.setItem(LK.last, String(last));
      }
    } else if (last) {
      localStorage.setItem(LK.last, '0');
    }
    const msToNext = lives >= MAX_LIVES ? 0 : Math.max(0, REGEN_MS - (Date.now() - readInt(LK.last, Date.now())));
    return { lives, msToNext };
  }

  function getLives() { return sync().lives; }
  function getMax() { return MAX_LIVES; }
  function getTickets() { return readInt(LK.tickets, 0); }
  function nextRegenMs() { return sync().msToNext; }

  function setLives(n) {
    const clamped = Math.max(0, Math.min(MAX_LIVES, n));
    localStorage.setItem(LK.lives, String(clamped));
    if (clamped >= MAX_LIVES) localStorage.setItem(LK.last, '0');
    else if (!readInt(LK.last, 0)) localStorage.setItem(LK.last, String(Date.now()));
    refreshWidget();
    return clamped;
  }

  function addLife(n = 1) {
    const cur = sync().lives;
    return setLives(cur + n);
  }

  function addTicket(n = 1) {
    const cur = getTickets();
    localStorage.setItem(LK.tickets, String(cur + n));
    flashToast(`🎟️ +${n} Biglietto Extra`);
    refreshWidget();
  }

  function useTicket() {
    const tickets = getTickets();
    const lives = sync().lives;
    if (tickets <= 0 || lives >= MAX_LIVES) return false;
    localStorage.setItem(LK.tickets, String(tickets - 1));
    addLife(1);
    flashToast('🎟️ Biglietto usato: +1 vita');
    return true;
  }

  // Da chiamare SOLO su una vera sconfitta di livello.
  function loseLife() {
    if (isRelax()) { refreshWidget(); return { lives: MAX_LIVES, lost: false }; }
    const cur = sync().lives;
    if (cur <= 0) return { lives: 0, lost: false };
    const next = setLives(cur - 1);
    return { lives: next, lost: true };
  }

  function stationKey(mode, stationIndex) { return `${mode}:${stationIndex}`; }

  // Ricompensa di fine stazione (5 livelli completati). Una tantum per stazione/modalità.
  function awardStationBonusOnce(mode, stationIndex) {
    const given = readSet(LK.stationBonus);
    const key = stationKey(mode, stationIndex);
    if (given.has(key)) return null;
    given.add(key); writeSet(LK.stationBonus, given);
    const cur = sync().lives;
    if (cur < MAX_LIVES) { addLife(1); return { type: 'life' }; }
    addTicket(1); return { type: 'ticket' };
  }

  // Ricompensa una tantum al raggiungimento di una tappa narrativa (stazione con
  // un ricordo di famiglia associato).
  function awardNarrativeBonusOnce(stationIndex) {
    const given = readSet(LK.narrativeBonus);
    const key = String(stationIndex);
    if (given.has(key)) return false;
    given.add(key); writeSet(LK.narrativeBonus, given);
    addTicket(1);
    return true;
  }

  // Ricompensa per 3 stelle (Binari Puzzle) — non è una tantum: premia l'abilità.
  function awardStarsBonus(stars) {
    if (stars >= 3) addTicket(1);
  }

  function fmtCountdown(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60), s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  /* ---------------------------- UI: widget ---------------------------- */
  let widgetEl = null, panelOpen = false, tickHandle = null;

  function ensureWidget() {
    if (widgetEl) return widgetEl;
    widgetEl = document.createElement('div');
    widgetEl.id = 'lifeWidget';
    widgetEl.className = 'life-widget';
    widgetEl.innerHTML = `
      <button type="button" class="life-pill" id="lifeWidgetBtn" aria-label="Vite e biglietti">
        <span class="life-hearts" id="lifeHearts"></span>
        <span class="life-ticket-chip" id="lifeTicketChip">🎟️ 0</span>
      </button>
      <div class="life-panel" id="lifePanel" aria-hidden="true">
        <div class="life-panel-hearts" id="lifePanelHearts"></div>
        <div class="life-panel-row" id="lifePanelCountdown"></div>
        <button type="button" class="life-ticket-btn" id="lifeUseTicketBtn">🎟️ Usa un Biglietto Extra</button>
        <label class="life-relax-row">
          <input type="checkbox" id="lifeRelaxToggle"> Modalità Relax (vite infinite)
        </label>
        <div class="life-panel-note">Si perde una vita solo perdendo davvero un livello — mai per errore o per essere tornati al menu.</div>
      </div>`;
    document.body.appendChild(widgetEl);
    widgetEl.querySelector('#lifeWidgetBtn').addEventListener('click', (ev) => {
      ev.stopPropagation();
      panelOpen = !panelOpen;
      widgetEl.querySelector('#lifePanel').classList.toggle('open', panelOpen);
    });
    document.addEventListener('click', (ev) => {
      if (panelOpen && widgetEl && !widgetEl.contains(ev.target)) {
        panelOpen = false;
        widgetEl.querySelector('#lifePanel').classList.remove('open');
      }
    });
    widgetEl.querySelector('#lifeUseTicketBtn').addEventListener('click', () => { useTicket(); refreshWidget(); });
    const relaxToggle = widgetEl.querySelector('#lifeRelaxToggle');
    relaxToggle.checked = isRelax();
    relaxToggle.addEventListener('change', () => setRelax(relaxToggle.checked));
    if (!tickHandle) tickHandle = setInterval(refreshWidget, 1000);
    return widgetEl;
  }

  function heartsMarkup(lives, small) {
    let out = '';
    for (let i = 0; i < MAX_LIVES; i++) out += `<span class="${i < lives ? 'heart on' : 'heart'}">${i < lives ? '❤️' : '🤍'}</span>`;
    return out;
  }

  function refreshWidget() {
    if (!widgetEl) return;
    const { lives, msToNext } = sync();
    const relax = isRelax();
    const compact = widgetEl.classList.contains('life-inline');
    const heartsHtml = relax ? '<span class="heart on">❤️</span><span class="life-infinite">∞</span>' : heartsMarkup(lives);
    widgetEl.querySelector('#lifeHearts').innerHTML = compact ? `<span class="heart on">❤️</span><b class="life-count">${relax ? '∞' : lives}</b>` : heartsHtml;
    const chip = widgetEl.querySelector('#lifeTicketChip');
    const tk = getTickets();
    chip.textContent = compact ? (tk > 0 ? `🎟️${tk}` : '') : `🎟️ ${tk}`;
    chip.style.display = (compact && tk === 0) ? 'none' : '';
    widgetEl.querySelector('#lifePanelHearts').innerHTML = relax ? '<span class="life-infinite-big">❤️ ∞ — Modalità Relax attiva</span>' : heartsMarkup(lives);
    const cd = widgetEl.querySelector('#lifePanelCountdown');
    cd.textContent = relax ? 'Vite infinite: nessuna attesa.' : (lives >= MAX_LIVES ? 'Vite al completo.' : `🚦 Prossima vita tra ${fmtCountdown(msToNext)}`);
    const ticketBtn = widgetEl.querySelector('#lifeUseTicketBtn');
    ticketBtn.disabled = relax || getTickets() <= 0 || lives >= MAX_LIVES;
  }

  /* ---------------------------- UI: toast ---------------------------- */
  let toastEl = null, toastTimer = null;
  function flashToast(text) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'life-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = text;
    toastEl.classList.remove('show'); void toastEl.offsetWidth; toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  /* ---------------------------- UI: overlays ---------------------------- */
  function buildOverlayShell() {
    let el = document.getElementById('lifeOverlay');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'lifeOverlay';
    el.className = 'life-overlay';
    document.body.appendChild(el);
    return el;
  }

  function hideOverlay() {
    const el = document.getElementById('lifeOverlay');
    if (el) { el.classList.remove('show'); el.innerHTML = ''; }
  }

  // Sconfitta con almeno una vita rimasta: semplice prompt di retry.
  function showDefeatOverlay({ title, text, onRetry, onExit }) {
    const el = buildOverlayShell();
    const { lives } = sync();
    el.innerHTML = `
      <div class="life-overlay-card">
        <div class="life-overlay-hearts">${heartsMarkup(lives)}</div>
        <h2>${title}</h2>
        <p>${text}</p>
        <div class="life-overlay-actions">
          <button type="button" class="big-btn" id="lifeRetryBtn">Riprova</button>
          <button type="button" class="small-btn" id="lifeExitBtn">Torna al percorso</button>
        </div>
      </div>`;
    el.classList.add('show');
    el.querySelector('#lifeRetryBtn').onclick = () => { hideOverlay(); onRetry && onRetry(); };
    el.querySelector('#lifeExitBtn').onclick = () => { hideOverlay(); onExit && onExit(); };
  }

  // Vite a zero: si aspetta, si usa un biglietto, oppure si torna al menu.
  function showLockedOverlay({ onResume, onExit }) {
    const el = buildOverlayShell();
    const render = () => {
      const { lives, msToNext } = sync();
      if (lives > 0) { hideOverlay(); onResume && onResume(); return; }
      const tickets = getTickets();
      el.innerHTML = `
        <div class="life-overlay-card">
          <div class="life-overlay-hearts">${heartsMarkup(0)}</div>
          <h2>🚦 Mimmo deve aspettare il prossimo treno</h2>
          <p>Nuova vita tra <b>${fmtCountdown(msToNext)}</b></p>
          <div class="life-overlay-actions">
            ${tickets > 0 ? `<button type="button" class="big-btn" id="lifeTicketNowBtn">🎟️ Usa Biglietto Extra (${tickets})</button>` : ''}
            <button type="button" class="small-btn" id="lifeExitBtn2">Torna al percorso</button>
          </div>
        </div>`;
      el.classList.add('show');
      const tb = el.querySelector('#lifeTicketNowBtn');
      if (tb) tb.onclick = () => { useTicket(); hideOverlay(); onResume && onResume(); };
      el.querySelector('#lifeExitBtn2').onclick = () => { hideOverlay(); onExit && onExit(); };
    };
    render();
    const iv = setInterval(() => {
      if (!document.getElementById('lifeOverlay') || !document.getElementById('lifeOverlay').classList.contains('show')) { clearInterval(iv); return; }
      render();
    }, 1000);
  }

  function stationToast(reward) {
    if (!reward) return;
    flashToast(reward.type === 'life' ? '🚉 STAZIONE COMPLETATA! +1 vita' : '🚉 STAZIONE COMPLETATA! +1 🎟️ Biglietto Extra');
  }

  document.addEventListener('DOMContentLoaded', () => { ensureWidget(); refreshWidget(); });
  if (document.readyState !== 'loading') { ensureWidget(); refreshWidget(); }

  // Sposta il widget nel punto giusto per ogni schermata, così non copre mai
  // le altre HUD (stessa idea di placeSoundToggle in game.js).
  function placeWidget(screenId) {
    const el = ensureWidget();
    el.classList.remove('life-inline');
    if (screenId === 'mapScreen') {
      const target = document.querySelector('#mapScreen .map-head > div:last-child');
      if (target) { target.prepend(el); el.classList.add('life-inline'); refreshWidget(); return; }
    }
    if (screenId === 'fallGame') {
      const topbar = document.querySelector('#fallGame .bp-topbar');
      const actions = topbar && topbar.querySelector('.bp-actions');
      if (topbar && actions) { topbar.insertBefore(el, actions); el.classList.add('life-inline'); refreshWidget(); return; }
    }
    if (screenId === 'matchGame') {
      const col = document.querySelector('#matchGame .hud-col.left');
      if (col) { col.insertBefore(el, col.firstChild); el.classList.add('life-inline'); refreshWidget(); return; }
    }
    document.body.appendChild(el);
    refreshWidget();
  }

  window.MimmoLives = {
    MAX_LIVES, getLives, getMax, getTickets, nextRegenMs, isRelax, setRelax,
    loseLife, addLife, addTicket, useTicket,
    awardStationBonusOnce, awardNarrativeBonusOnce, awardStarsBonus, stationToast,
    showDefeatOverlay, showLockedOverlay, hideOverlay, flashToast, refreshWidget, placeWidget
  };
})();
