/**
 * Youth Soccer Coach Web App (6v6, Squad up to 12+)
 * Core Mission: Equal playing time for all kids who want to play.
 * Fast 1-tap status switching: Ready 🟢 | Taking Break / Rest ⏸️ | Out ❌
 */

// Formations for 6v6 (Goalie + 5 outfielders)
const FORMATIONS = {
  "2-2-1": {
    name: "2-2-1 (Balanced)",
    slots: [
      { id: "GK", label: "Goalie", short: "GK", top: "86%", left: "50%", posGroup: "GK" },
      { id: "LB", label: "Left Def", short: "LB", top: "66%", left: "28%", posGroup: "DEF" },
      { id: "RB", label: "Right Def", short: "RB", top: "66%", left: "72%", posGroup: "DEF" },
      { id: "LM", label: "Left Mid", short: "LM", top: "40%", left: "26%", posGroup: "MID" },
      { id: "RM", label: "Right Mid", short: "RM", top: "40%", left: "74%", posGroup: "MID" },
      { id: "ST", label: "Striker", short: "ST", top: "18%", left: "50%", posGroup: "FWD" }
    ]
  },
  "1-3-1": {
    name: "1-3-1 (Midfield Control)",
    slots: [
      { id: "GK", label: "Goalie", short: "GK", top: "86%", left: "50%", posGroup: "GK" },
      { id: "CB", label: "Center Def", short: "CB", top: "68%", left: "50%", posGroup: "DEF" },
      { id: "LM", label: "Left Wing", short: "LM", top: "42%", left: "20%", posGroup: "MID" },
      { id: "CM", label: "Center Mid", short: "CM", top: "44%", left: "50%", posGroup: "MID" },
      { id: "RM", label: "Right Wing", short: "RM", top: "42%", left: "80%", posGroup: "MID" },
      { id: "ST", label: "Striker", short: "ST", top: "18%", left: "50%", posGroup: "FWD" }
    ]
  },
  "2-1-2": {
    name: "2-1-2 (Attacking)",
    slots: [
      { id: "GK", label: "Goalie", short: "GK", top: "86%", left: "50%", posGroup: "GK" },
      { id: "LB", label: "Left Def", short: "LB", top: "66%", left: "30%", posGroup: "DEF" },
      { id: "RB", label: "Right Def", short: "RB", top: "66%", left: "70%", posGroup: "DEF" },
      { id: "CM", label: "Center Mid", short: "CM", top: "44%", left: "50%", posGroup: "MID" },
      { id: "LF", label: "Left Forward", short: "LF", top: "20%", left: "32%", posGroup: "FWD" },
      { id: "RF", label: "Right Forward", short: "RF", top: "20%", left: "68%", posGroup: "FWD" }
    ]
  },
  "1-2-1-1": {
    name: "1-2-1-1 (Diamond)",
    slots: [
      { id: "GK", label: "Goalie", short: "GK", top: "86%", left: "50%", posGroup: "GK" },
      { id: "CB", label: "Sweeper Def", short: "CB", top: "68%", left: "50%", posGroup: "DEF" },
      { id: "LM", label: "Left Mid", short: "LM", top: "46%", left: "25%", posGroup: "MID" },
      { id: "RM", label: "Right Mid", short: "RM", top: "46%", left: "75%", posGroup: "MID" },
      { id: "CAM", label: "Attacking Mid", short: "CAM", top: "32%", left: "50%", posGroup: "MID" },
      { id: "ST", label: "Striker", short: "ST", top: "16%", left: "50%", posGroup: "FWD" }
    ]
  }
};

// Global Default State
const DEFAULT_FALCONS_STATE = {
  teamName: "The Red Falcons",
  formation: "2-2-1",
  halfMinutes: 20,
  snackDuty: "Selbie Family",
  teamCaptain: "",
  players: [
    { id: "p1", name: "Fynn", number: 7, preferredPos: "ALL", active: true, notes: "Fast dribbler, high energy", status: "ready" },
    { id: "p2", name: "Elliot", number: 10, preferredPos: "MID", active: true, notes: "Great playmaker, good passes", status: "ready" },
    { id: "p3", name: "Alex", number: 4, preferredPos: "DEF", active: true, notes: "Solid defender, good clearing", status: "ready" },
    { id: "p4", name: "Dominic", number: 1, preferredPos: "GK", active: true, notes: "Loves playing goalie", status: "ready" },
    { id: "p5", name: "Indigo", number: 8, preferredPos: "MID", active: true, notes: "Strong runner, covers ground", status: "ready" },
    { id: "p6", name: "Reese", number: 3, preferredPos: "DEF", active: true, notes: "Stays back, protects goal", status: "ready" },
    { id: "p7", name: "Omar", number: 9, preferredPos: "FWD", active: true, notes: "Aggressive on attack", status: "ready" },
    { id: "p8", name: "Noah", number: 11, preferredPos: "MID", active: true, notes: "Good footwork", status: "ready" },
    { id: "p9", name: "Thatcher", number: 5, preferredPos: "DEF", active: true, notes: "Team player, focused", status: "ready" },
    { id: "p10", name: "Seamas", number: 6, preferredPos: "GK", active: true, notes: "Wants to try goalie", status: "ready" },
    { id: "p_mtm4qlwjffc", name: "Arius", number: 12, preferredPos: "MID", notes: "", status: "ready", active: true }
  ],
  startingLineup: {
    GK: "p10",
    LB: "p3",
    RB: "p6",
    LM: "p2",
    RM: "p5",
    ST: "p1"
  },
  halfLineups: {
    1: { GK: "p10", LB: "p3", RB: "p6", LM: "p2", RM: "p5", ST: "p1" },
    2: { GK: "p4", LB: "p9", RB: "p7", LM: "p8", RM: "p_mtm4qlwjffc", ST: "p1" }
  },
  match: {
    homeScore: 0,
    awayScore: 0,
    opponentName: "Wildcats",
    currentHalf: 1,
    halfSecondsElapsed: 0,
    totalSecondsElapsed: 0,
    isRunning: false,
    goals: [],
    events: []
  },
  playerSecondsPlayed: {
    p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0, p9: 0, p10: 0, p_mtm4qlwjffc: 0
  },
  pendingSwap: null
};

// Global App State
let state = JSON.parse(JSON.stringify(DEFAULT_FALCONS_STATE));

// Live Timer interval ref
let timerInterval = null;

// Sound Effects via Web Audio API
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playSound(type) {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'whistle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2600, audioCtx.currentTime);
      osc.frequency.setValueAtTime(3000, audioCtx.currentTime + 0.08);
      osc.frequency.setValueAtTime(2600, audioCtx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'goal') {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'triangle';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.2, audioCtx.currentTime + (idx * 0.08));
        g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        o.start(audioCtx.currentTime + (idx * 0.08));
        o.stop(audioCtx.currentTime + 0.7);
      });
    } else if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    }
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatMinutesBrief(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

// Normalize player status (ready, rest, out)
function getPlayerStatus(p) {
  if (!p) return 'out';
  if (p.status) return p.status;
  if (p.active === false) return 'out';
  return 'ready';
}

// Get player by ID
function getPlayer(id) {
  return state.players.find(p => p.id === id) || null;
}

// Players who want to play and are ready
function getReadyPlayers() {
  return state.players.filter(p => getPlayerStatus(p) === 'ready');
}

// Players taking a break or resting
function getRestingPlayers() {
  return state.players.filter(p => getPlayerStatus(p) === 'rest');
}

// Players absent/out
function getOutPlayers() {
  return state.players.filter(p => getPlayerStatus(p) === 'out');
}

// Highest jersey number
function getHighestJerseyNumber() {
  if (!state.players || state.players.length === 0) return 0;
  return Math.max(...state.players.map(p => p.number || 0), 0);
}

function getAuthHeaders() {
  const token = localStorage.getItem('falconCoachAuthToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function showLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) logoutBtn.style.display = 'none';
}

function hideLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) logoutBtn.style.display = 'inline-flex';
}

// Backend fetch (Supports both Node backend and static GitHub Pages)
async function fetchTeamData() {
  try {
    const res = await fetch('/api/team', {
      headers: getAuthHeaders()
    });
    if (res.status === 401) {
      showLoginModal();
      return;
    }
    if (res.ok) {
      hideLoginModal();
      const data = await res.json();
      if (data.teamName === "The Thunderbolts" || !data.teamName) {
        data.teamName = "The Red Falcons";
      }
      Object.assign(state, data);
      if (state.teamName === "The Thunderbolts" || !state.teamName) {
        state.teamName = "The Red Falcons";
      }
      
      // Ensure all players have a valid status and second count
      state.players.forEach(p => {
        if (!p.status) {
          p.status = p.active === false ? 'out' : 'ready';
        }
        if (state.playerSecondsPlayed[p.id] === undefined) {
          state.playerSecondsPlayed[p.id] = 0;
        }
      });

      renderAll();
      return;
    }
  } catch (e) {
    // Static hosting / GitHub Pages fallback
    console.info('Static mode: loading from localStorage or defaults.');
  }

  // Fallback for static GitHub Pages hosting
  const cachedToken = localStorage.getItem('falconCoachAuthToken');
  if (!cachedToken) {
    showLoginModal();
  } else {
    hideLoginModal();
  }
  const cached = localStorage.getItem('soccerCoachState');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed.teamName === "The Thunderbolts" || !parsed.teamName) {
        parsed.teamName = "The Red Falcons";
      }
      Object.assign(state, parsed);
    } catch (e) {}
  }
  renderAll();
}

// Backend save
async function saveTeamData() {
  try {
    localStorage.setItem('soccerCoachState', JSON.stringify(state));
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(state)
    });
    if (res.status === 401) {
      showLoginModal();
    }
  } catch (e) {
    console.warn('Backend save failed:', e);
  }
}

// Active Lineup helper
function getActiveFieldLineup() {
  const qSelect = document.getElementById('fieldQuarterSelect');
  const val = qSelect ? qSelect.value : 'start';
  if (val === 'start') {
    return state.startingLineup;
  }
  return state.quarterLineups[val] || state.startingLineup;
}

function setActiveFieldLineup(newLineup) {
  const qSelect = document.getElementById('fieldQuarterSelect');
  const val = qSelect ? qSelect.value : 'start';
  state.startingLineup = { ...newLineup };
  const currentQ = state.match.currentQuarter || 1;
  state.quarterLineups[currentQ] = { ...newLineup };
  if (val !== 'start') {
    state.quarterLineups[val] = { ...newLineup };
  }
  saveTeamData();
  renderFieldAndBench();
  updateTimerDisplay();
}

function getPlayersOnPitch(lineup) {
  const currentLineup = lineup || getActiveFieldLineup();
  const currentFormation = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const ids = [];
  currentFormation.slots.forEach(slot => {
    const pid = currentLineup[slot.id];
    if (pid) ids.push(pid);
  });
  return ids;
}

// -----------------------------------------------------------------------------
// ONE-TAP STATUS SWITCHER (CORE REQUIREMENT)
// -----------------------------------------------------------------------------

window.setPlayerStatus = function(playerId, newStatus) {
  const player = getPlayer(playerId);
  if (!player) return;

  const oldStatus = getPlayerStatus(player);
  
  // If user tapped the same status that is already active, toggle it!
  let resolvedStatus = newStatus;
  if (newStatus === oldStatus) {
    if (oldStatus === 'rest' || oldStatus === 'out') {
      resolvedStatus = 'ready'; // Toggling OFF rest/out returns to ready!
    } else if (oldStatus === 'ready') {
      resolvedStatus = 'rest'; // Toggling ready puts on break
    }
  } else if (newStatus === 'toggle-rest') {
    resolvedStatus = (oldStatus === 'rest') ? 'ready' : 'rest';
  } else if (newStatus === 'toggle-out') {
    resolvedStatus = (oldStatus === 'out') ? 'ready' : 'out';
  }

  player.status = resolvedStatus;
  player.active = resolvedStatus !== 'out';

  // If player was on the pitch and is now resting or out, sub them off immediately
  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const onPitchIds = new Set(getPlayersOnPitch(currentLineup));

  if (onPitchIds.has(playerId) && resolvedStatus !== 'ready') {
    // Find ready bench player with LEAST minutes
    const readyBench = getReadyPlayers().filter(p => !onPitchIds.has(p.id));
    if (readyBench.length > 0) {
      const subIn = [...readyBench].sort((a, b) => {
        return (state.playerSecondsPlayed[a.id] || 0) - (state.playerSecondsPlayed[b.id] || 0);
      })[0];

      // Find slot
      let slotKey = null;
      for (const [sId, pId] of Object.entries(currentLineup)) {
        if (pId === playerId) {
          slotKey = sId;
          break;
        }
      }

      if (slotKey && subIn) {
        currentLineup[slotKey] = subIn.id;
        setActiveFieldLineup(currentLineup);
        showToast(`⚡ ${player.name} resting. Auto-subbed in ${subIn.name}!`);
      }
    } else {
      showToast(`⏸️ ${player.name} resting. Please assign another player to their slot.`);
    }
  } else {
    const statusLabels = { ready: '🟢 Ready to Play', rest: '⏸️ Resting / Break', out: '❌ Out / Absent' };
    showToast(`${player.name} is now ${statusLabels[resolvedStatus]}`);
  }

  saveTeamData();
  renderAll();
  playSound('tap');
};

window.togglePlayerRest = function(playerId) {
  window.setPlayerStatus(playerId, 'toggle-rest');
};

// -----------------------------------------------------------------------------
// FIELD & BENCH RENDERING
// -----------------------------------------------------------------------------

function renderOnFieldPlayers() {
  const container = document.getElementById('onFieldPlayersList');
  if (!container) return;
  container.innerHTML = '';

  const formationConfig = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const currentLineup = getActiveFieldLineup();
  const currentQ = state.match.currentQuarter || 1;
  const isRunning = state.match.isRunning;

  formationConfig.slots.forEach(slot => {
    const assignedPlayerId = currentLineup[slot.id];
    const player = getPlayer(assignedPlayerId);
    const pStatus = player ? getPlayerStatus(player) : 'none';
    const seconds = player ? (state.playerSecondsPlayed[player.id] || 0) : 0;
    const isGK = slot.id === 'GK';

    const card = document.createElement('div');
    card.className = `on-field-row ${isGK ? 'is-gk-row' : ''}`;

    let posBadgeColor = '#3b82f6';
    let posTitle = slot.label;
    if (isGK) {
      posBadgeColor = '#f59e0b';
      posTitle = currentQ <= 2 ? 'Goalie (1st Half)' : 'Goalie (2nd Half)';
    } else if (slot.posGroup === 'FWD') {
      posBadgeColor = '#ef4444';
    } else if (slot.posGroup === 'MID') {
      posBadgeColor = '#10b981';
    }

    card.innerHTML = `
      <div class="on-field-left" style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
        <div class="pos-pill" style="background: ${posBadgeColor}; color: #000; font-weight: 900; font-size: 0.72rem; padding: 3px 6px; border-radius: 6px; flex-shrink: 0;">
          ${isGK ? '🧤 GK' : slot.short}
        </div>
        <div class="player-num-circle" style="width: 34px; height: 34px; font-size: 0.95rem; font-weight: 900; border-radius: 50%; background: #0f172a; border: 2px solid ${posBadgeColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${player ? (player.number || '★') : '+'}
        </div>
        <div class="player-text-block" style="min-width: 0; flex: 1;">
          <div class="player-name" style="font-weight: 800; font-size: 1.05rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${player ? player.name : `<span style="color:#94a3b8; font-style:italic;">[Unassigned ${slot.short}]</span>`}
          </div>
          <div class="player-sub-pos" style="font-size: 0.72rem; color: #94a3b8;">
            ${posTitle}
          </div>
        </div>
      </div>

      <div class="on-field-right" style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
        <div class="live-minutes-badge ${isRunning ? 'ticking' : ''}">
          <span id="slotPlayerTimer_${slot.id}" style="font-family: 'Outfit', monospace; font-weight: 800; font-size: 1rem; color: #34d399;">
            ${formatMinutesBrief(seconds)}
          </span>
        </div>
        <button class="btn btn-sm btn-sub-action" onclick="openSwapModal('${slot.id}', '${slot.label}', '${assignedPlayerId || ''}')" style="font-weight: 700; padding: 0.35rem 0.6rem;">
          <span>🔄</span> Sub Out
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderSoccerField() {
  renderOnFieldPlayers();
}

function renderBench() {
  const benchList = document.getElementById('benchPlayersList');
  const benchCountSpan = document.getElementById('benchCount');
  const statActiveField = document.getElementById('statActiveField');
  const statBenchCount = document.getElementById('statBenchCount');
  const statRestingCount = document.getElementById('statRestingCount');

  if (!benchList) return;
  benchList.innerHTML = '';

  const activeLineup = getActiveFieldLineup();
  const onPitchIds = new Set(getPlayersOnPitch(activeLineup));
  
  const readyPlayers = getReadyPlayers();
  const restingPlayers = getRestingPlayers();
  const outPlayers = getOutPlayers();

  const readyBench = readyPlayers.filter(p => !onPitchIds.has(p.id));
  const otherBench = [...restingPlayers, ...outPlayers].filter(p => !onPitchIds.has(p.id));

  // Sort ready bench by least minutes played (freshest first)
  readyBench.sort((a, b) => (state.playerSecondsPlayed[a.id] || 0) - (state.playerSecondsPlayed[b.id] || 0));

  const allBench = [...readyBench, ...otherBench];

  if (benchCountSpan) benchCountSpan.textContent = readyBench.length;
  if (statActiveField) statActiveField.textContent = onPitchIds.size;
  if (statBenchCount) statBenchCount.textContent = readyBench.length;
  if (statRestingCount) statRestingCount.textContent = restingPlayers.length + outPlayers.length;

  if (allBench.length === 0) {
    benchList.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 1rem;">All ready squad members are on the pitch!</div>`;
    return;
  }

  allBench.forEach(player => {
    const pStatus = getPlayerStatus(player);
    const seconds = state.playerSecondsPlayed[player.id] || 0;

    const card = document.createElement('div');
    card.className = `bench-player-row status-${pStatus}`;

    card.innerHTML = `
      <div class="bench-player-left" style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
        <div class="player-num-circle bench-circle" style="width: 32px; height: 32px; font-size: 0.9rem; font-weight: 900; border-radius: 50%; background: #0f172a; border: 2px solid #64748b; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${player.number || '★'}
        </div>
        <div class="player-text-block" style="min-width: 0; flex: 1;">
          <div class="player-name" style="font-weight: 800; font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${player.name}
          </div>
          <div class="player-sub-pos" style="font-size: 0.72rem; color: #94a3b8;">
            Played: <strong style="color: #34d399;">${formatMinutesBrief(seconds)}</strong> • ${player.preferredPos || 'SUB'}
          </div>
        </div>
      </div>

      <div class="bench-actions-group" style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
        <div class="status-pill-toggle" onclick="event.stopPropagation()">
          <button class="status-opt-btn opt-ready ${pStatus === 'ready' ? 'active' : ''}" onclick="setPlayerStatus('${player.id}', 'ready')" title="Ready to Play">🟢</button>
          <button class="status-opt-btn opt-rest ${pStatus === 'rest' ? 'active' : ''}" onclick="setPlayerStatus('${player.id}', 'rest')" title="Resting">⏸️</button>
          <button class="status-opt-btn opt-out ${pStatus === 'out' ? 'active' : ''}" onclick="setPlayerStatus('${player.id}', 'out')" title="Out">❌</button>
        </div>

        <button class="btn btn-sm btn-primary" onclick="openPlaceBenchPlayerModal('${player.id}', '${player.name}')" style="font-weight: 700; padding: 0.35rem 0.65rem;">
          <span>⚡</span> Sub IN
        </button>
      </div>
    `;

    benchList.appendChild(card);
  });
}

function renderFieldAndBench() {
  const homeScoreEl = document.getElementById('homeScoreDisplay');
  const awayScoreEl = document.getElementById('awayScoreDisplay');
  const homeNameEl = document.getElementById('scoreHomeName');
  const oppInput = document.getElementById('opponentNameInput');

  if (homeScoreEl) homeScoreEl.textContent = state.match.homeScore || 0;
  if (awayScoreEl) awayScoreEl.textContent = state.match.awayScore || 0;
  if (homeNameEl) homeNameEl.textContent = state.teamName || "The Red Falcons";
  if (oppInput) oppInput.value = state.match.opponentName || "Wildcats";

  updateTimerDisplay();
  renderSoccerField();
  renderBench();
  renderFieldSmartSubBanner();
  renderLiveMinutesTally();
  renderMatchEvents();
}

let currentSubOptionIndex = 0;

function generateSubOptions() {
  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const onFieldIds = new Set(getPlayersOnPitch(currentLineup));
  const gkPlayerId = currentLineup['GK']; // Active Goalie

  const readyPlayers = getReadyPlayers();
  // Goalies play 1 full half, so exclude the active goalkeeper from outfield 1-click sub rotation
  const onFieldOutfield = readyPlayers.filter(p => onFieldIds.has(p.id) && p.id !== gkPlayerId);
  const benchReady = readyPlayers.filter(p => !onFieldIds.has(p.id));

  if (onFieldOutfield.length === 0 || benchReady.length === 0) {
    return [];
  }

  // Sort outfield by minutes played descending (most played first)
  const sortedOutfield = [...onFieldOutfield].sort((a, b) => (state.playerSecondsPlayed[b.id] || 0) - (state.playerSecondsPlayed[a.id] || 0));
  // Sort bench by minutes played ascending (least played / freshest first)
  const sortedBench = [...benchReady].sort((a, b) => (state.playerSecondsPlayed[a.id] || 0) - (state.playerSecondsPlayed[b.id] || 0));

  const options = [];
  const seenPairs = new Set();

  function addOption(outPlayer, inPlayer, label) {
    const key = `${outPlayer.id}->${inPlayer.id}`;
    if (!seenPairs.has(key)) {
      seenPairs.add(key);
      options.push({
        outPlayer,
        inPlayer,
        label,
        outMins: formatMinutesBrief(state.playerSecondsPlayed[outPlayer.id] || 0),
        inMins: formatMinutesBrief(state.playerSecondsPlayed[inPlayer.id] || 0)
      });
    }
  }

  // 1. Primary Equal Time: Most Played Outfield ➔ Freshest Bench
  if (sortedOutfield[0] && sortedBench[0]) {
    addOption(sortedOutfield[0], sortedBench[0], 'Equal Time Rotation');
  }

  // 2. Position-specific matches (e.g. DEF for DEF, MID for MID, FWD for FWD)
  sortedBench.forEach(b => {
    const bPos = (b.preferredPos || '').toUpperCase();
    if (bPos && bPos !== 'ALL' && bPos !== 'GK') {
      const match = sortedOutfield.find(o => (o.preferredPos || '').toUpperCase() === bPos);
      if (match) {
        addOption(match, b, `Position Fit (${bPos})`);
      }
    }
  });

  // 3. Permutations of top outfielders & freshest bench
  for (let i = 0; i < sortedOutfield.length; i++) {
    for (let j = 0; j < sortedBench.length; j++) {
      addOption(sortedOutfield[i], sortedBench[j], 'Alternative Swap');
      if (options.length >= 8) break;
    }
    if (options.length >= 8) break;
  }

  return options;
}

window.cycleSubOption = function(direction = 1) {
  const options = generateSubOptions();
  if (options.length === 0) return;
  currentSubOptionIndex = (currentSubOptionIndex + direction + options.length) % options.length;
  renderFieldSmartSubBanner();
  playSound('tap');
};

window.selectSubOption = function(index) {
  currentSubOptionIndex = index;
  renderFieldSmartSubBanner();
  playSound('tap');
};

function renderFieldSmartSubBanner() {
  const banner = document.getElementById('fieldSmartSubBanner');
  if (!banner) return;

  const options = generateSubOptions();
  if (options.length === 0) {
    banner.innerHTML = '';
    return;
  }

  // Bound index
  if (currentSubOptionIndex >= options.length) {
    currentSubOptionIndex = 0;
  }

  const currentOption = options[currentSubOptionIndex];
  const { outPlayer, inPlayer, label, outMins, inMins } = currentOption;

  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const gkPlayerId = currentLineup['GK'];
  const gkPlayer = getPlayer(gkPlayerId);
  const gkName = gkPlayer ? gkPlayer.name : 'Goalkeeper';
  const halfStr = currentQ <= 2 ? '1st Half' : '2nd Half';

  // Build quick alternate chips (up to 4 quick options)
  let altChipsHtml = '';
  if (options.length > 1) {
    const altOptions = options.slice(0, 4);
    altChipsHtml = `
      <div class="sub-chips-container" style="margin-top: 0.6rem; display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center;">
        <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Quick Swaps:</span>
        ${altOptions.map((opt, idx) => {
          const isSelected = idx === currentSubOptionIndex;
          return `
            <button class="sub-chip-btn ${isSelected ? 'active' : ''}" onclick="selectSubOption(${idx})" style="
              background: ${isSelected ? '#3b82f6' : '#1e293b'};
              border: 1px solid ${isSelected ? '#60a5fa' : '#334155'};
              color: #fff;
              font-size: 0.75rem;
              padding: 3px 8px;
              border-radius: 6px;
              cursor: pointer;
              transition: all 0.15s ease;
            ">
              ${opt.outPlayer.name} (${opt.outMins}) ➔ ${opt.inPlayer.name} (${opt.inMins})
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  banner.innerHTML = `
    <div class="smart-sub-banner" style="margin-bottom: 0;">
      <div style="flex: 1; min-width: 260px;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
          <strong style="color: #a5b4fc; font-size: 0.9rem;">⚡ 1-Tap Sub Recommendation</strong>
          <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); color: #c7d2fe; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
            ${label} • Option ${currentSubOptionIndex + 1} of ${options.length}
          </span>
        </div>
        <div class="sub-suggestion-text" style="font-size: 0.95rem;">
          Sub Out: <strong style="color: #f87171;">#${outPlayer.number} ${outPlayer.name}</strong> (${outMins}) ➔ Sub In: <strong style="color: #34d399;">#${inPlayer.number} ${inPlayer.name}</strong> (${inMins})
          <span style="font-size: 0.75rem; color: #94a3b8; margin-left: 6px;">(🧤 ${gkName} in goal for ${halfStr})</span>
        </div>
        ${altChipsHtml}
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button class="btn btn-sm btn-secondary" onclick="cycleSubOption(1)" title="Shuffle to another substitution pairing" style="white-space: nowrap;">
          <span>🔄</span> Next Option
        </button>
        <button class="btn btn-sm btn-primary btn-glow" onclick="quickSwapPlayers('${outPlayer.id}', '${inPlayer.id}')" style="white-space: nowrap; font-weight: 800;">
          <span>⚡</span> Sub Now
        </button>
      </div>
    </div>
  `;
}

window.quickSwapPlayers = function(outId, inId) {
  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  let targetSlot = null;
  for (const [slotId, pid] of Object.entries(currentLineup)) {
    if (pid === outId) {
      targetSlot = slotId;
      break;
    }
  }
  if (targetSlot) {
    executeSlotAssignment(targetSlot, inId);
    playSound('tap');
    showToast(`⚡ Subbed ${getPlayer(inId)?.name} IN for ${getPlayer(outId)?.name}!`);
  }
};

// -----------------------------------------------------------------------------
// MODALS FOR ASSIGNING & PLACING PLAYERS
// -----------------------------------------------------------------------------

function openSwapModal(slotId, slotLabel, currentPlayerId) {
  state.pendingSwap = { type: 'slot', slotId, currentPlayerId };

  const modal = document.getElementById('swapModal');
  const title = document.getElementById('swapModalTitle');
  const sub = document.getElementById('swapModalSubtitle');
  const grid = document.getElementById('swapPlayersGrid');

  if (!modal || !grid) return;

  const currentPlayer = getPlayer(currentPlayerId);
  title.textContent = `Assign ${slotLabel} (${slotId})`;
  sub.textContent = currentPlayer
    ? `Current: ${currentPlayer.name} (#${currentPlayer.number}). Choose replacement or change status:`
    : `Select a player for ${slotLabel}:`;

  grid.innerHTML = '';

  // Quick Action: If there is an on-field player, allow 1-tap break/sub off
  if (currentPlayer) {
    const isCurrentResting = getPlayerStatus(currentPlayer) === 'rest';
    const breakBtn = document.createElement('button');
    breakBtn.className = isCurrentResting ? 'btn btn-success' : 'btn btn-subtle';
    breakBtn.style.gridColumn = '1 / -1';
    breakBtn.style.marginBottom = '0.5rem';
    breakBtn.innerHTML = isCurrentResting
      ? `<span>🟢</span> ${currentPlayer.name} is Ready to Play`
      : `<span>⏸️</span> ${currentPlayer.name} wants a break (Sub Off & Rest)`;
    breakBtn.addEventListener('click', () => {
      setPlayerStatus(currentPlayer.id, isCurrentResting ? 'ready' : 'rest');
      closeAllModals();
    });
    grid.appendChild(breakBtn);
  }

  const readyPlayers = getReadyPlayers();
  const restingPlayers = getRestingPlayers();
  const allAvailable = [...readyPlayers, ...restingPlayers];

  allAvailable.forEach(p => {
    const card = document.createElement('button');
    card.className = 'btn btn-outline';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.padding = '0.6rem';
    card.style.height = 'auto';

    const isCurrent = p.id === currentPlayerId;
    if (isCurrent) {
      card.style.borderColor = 'var(--primary)';
      card.style.background = 'rgba(16, 185, 129, 0.15)';
    }

    const playedSecs = state.playerSecondsPlayed[p.id] || 0;
    const pStatus = getPlayerStatus(p);

    card.innerHTML = `
      <strong style="font-size: 0.95rem;">#${p.number} ${p.name}</strong>
      <span style="font-size: 0.7rem; color: var(--text-muted);">${p.preferredPos} • ⏱️ ${formatMinutesBrief(playedSecs)}</span>
      ${pStatus === 'rest' ? '<span style="font-size: 0.65rem; color: #f59e0b; font-weight:800;">[Resting]</span>' : ''}
      ${isCurrent ? '<span style="font-size: 0.65rem; color: var(--primary); font-weight:800;">ON FIELD</span>' : ''}
    `;

    card.addEventListener('click', () => {
      if (pStatus === 'rest') {
        p.status = 'ready';
      }
      executeSlotAssignment(slotId, p.id);
      closeAllModals();
    });

    grid.appendChild(card);
  });

  const addCard = document.createElement('button');
  addCard.className = 'btn btn-primary';
  addCard.style.gridColumn = '1 / -1';
  addCard.style.padding = '0.6rem';
  addCard.innerHTML = `<span>➕</span> Add New Player to Squad`;
  addCard.addEventListener('click', () => {
    closeAllModals();
    openAddPlayerModal();
  });
  grid.appendChild(addCard);

  modal.classList.add('active');
}

function openPlaceBenchPlayerModal(playerId, playerName) {
  state.pendingSwap = { type: 'bench', playerId };

  const modal = document.getElementById('swapModal');
  const title = document.getElementById('swapModalTitle');
  const sub = document.getElementById('swapModalSubtitle');
  const grid = document.getElementById('swapPlayersGrid');

  if (!modal || !grid) return;

  title.textContent = `Sub ${playerName} On Pitch`;
  sub.textContent = `Select which position ${playerName} should take:`;

  grid.innerHTML = '';

  const formationConfig = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const currentLineup = getActiveFieldLineup();

  formationConfig.slots.forEach(slot => {
    const currentPlayerId = currentLineup[slot.id];
    const currentPlayer = getPlayer(currentPlayerId);
    const playedSecs = currentPlayer ? (state.playerSecondsPlayed[currentPlayer.id] || 0) : 0;

    const card = document.createElement('button');
    card.className = 'btn btn-outline';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.padding = '0.6rem';
    card.style.height = 'auto';

    card.innerHTML = `
      <span style="font-size: 0.75rem; font-weight: 800; color: var(--primary);">${slot.label} (${slot.short})</span>
      <strong style="font-size: 0.95rem; margin-top: 2px;">${currentPlayer ? currentPlayer.name : '[Empty]'}</strong>
      <span style="font-size: 0.7rem; color: var(--text-muted);">${currentPlayer ? `#${currentPlayer.number} • ⏱️ ${formatMinutesBrief(playedSecs)}` : ''}</span>
    `;

    card.addEventListener('click', () => {
      const player = getPlayer(playerId);
      if (player && player.status !== 'ready') {
        player.status = 'ready';
        player.active = true;
      }
      executeSlotAssignment(slot.id, playerId);
      closeAllModals();
    });

    grid.appendChild(card);
  });

  modal.classList.add('active');
}

function executeSlotAssignment(slotId, newPlayerId) {
  const currentLineup = { ...getActiveFieldLineup() };

  let previousSlotOfNewPlayer = null;
  for (const [sId, pId] of Object.entries(currentLineup)) {
    if (pId === newPlayerId && sId !== slotId) {
      previousSlotOfNewPlayer = sId;
      break;
    }
  }

  const outgoingPlayerId = currentLineup[slotId];

  if (previousSlotOfNewPlayer && outgoingPlayerId) {
    currentLineup[previousSlotOfNewPlayer] = outgoingPlayerId;
  } else if (previousSlotOfNewPlayer) {
    delete currentLineup[previousSlotOfNewPlayer];
  }

  currentLineup[slotId] = newPlayerId;

  setActiveFieldLineup(currentLineup);
  showToast(`✅ ${getPlayer(newPlayerId)?.name} assigned to ${slotId}`);
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
  state.pendingSwap = null;
}

// -----------------------------------------------------------------------------
// EQUAL TIME FAIR PLAY ALGORITHM (4 QUARTERS)
// -----------------------------------------------------------------------------

function autoBalanceQuarters() {
  const readyPlayers = getReadyPlayers();
  if (readyPlayers.length < 6) {
    alert("You need at least 6 ready players to balance a 6v6 match! Mark more players 'Ready' in Squad tab.");
    return;
  }

  const formationConfig = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const slotKeys = formationConfig.slots.map(s => s.id);
  const numQuarters = 4;

  const playCounts = {};
  const quartersPlayedBy = {};

  readyPlayers.forEach(p => {
    playCounts[p.id] = 0;
    quartersPlayedBy[p.id] = new Set();
  });

  const newQuarters = { 1: {}, 2: {}, 3: {}, 4: {} };
  const goalies = readyPlayers.filter(p => p.preferredPos === 'GK');

  for (let q = 1; q <= numQuarters; q++) {
    const qLineup = {};
    const assignedThisQ = new Set();

    // 1. Assign Goalie
    let gkAssigned = null;
    for (const gkCandidate of goalies) {
      if (!quartersPlayedBy[gkCandidate.id].has(q) && playCounts[gkCandidate.id] < 3) {
        gkAssigned = gkCandidate.id;
        break;
      }
    }
    if (!gkAssigned) {
      const sortedByPlay = [...readyPlayers].sort((a, b) => {
        const aSatLast = q > 1 && !quartersPlayedBy[a.id].has(q - 1);
        const bSatLast = q > 1 && !quartersPlayedBy[b.id].has(q - 1);
        if (aSatLast !== bSatLast) return aSatLast ? -1 : 1;
        return playCounts[a.id] - playCounts[b.id];
      });
      gkAssigned = sortedByPlay[0].id;
    }

    qLineup["GK"] = gkAssigned;
    assignedThisQ.add(gkAssigned);
    playCounts[gkAssigned]++;
    quartersPlayedBy[gkAssigned].add(q);

    // 2. Fill remaining outfield slots
    const outfieldSlots = slotKeys.filter(k => k !== "GK");

    outfieldSlots.forEach(slotId => {
      const candidates = readyPlayers
        .filter(p => !assignedThisQ.has(p.id))
        .sort((a, b) => {
          // Rule 1: Never sit 2 quarters in a row
          const aSatLast = q > 1 && !quartersPlayedBy[a.id].has(q - 1);
          const bSatLast = q > 1 && !quartersPlayedBy[b.id].has(q - 1);
          if (aSatLast !== bSatLast) return aSatLast ? -1 : 1;

          // Rule 2: Equal total quarters
          if (playCounts[a.id] !== playCounts[b.id]) {
            return playCounts[a.id] - playCounts[b.id];
          }

          // Rule 3: Position comfort
          const slotObj = formationConfig.slots.find(s => s.id === slotId);
          const aPref = a.preferredPos === slotObj?.posGroup ? 1 : 0;
          const bPref = b.preferredPos === slotObj?.posGroup ? 1 : 0;
          return bPref - aPref;
        });

      if (candidates.length > 0) {
        const chosen = candidates[0];
        qLineup[slotId] = chosen.id;
        assignedThisQ.add(chosen.id);
        playCounts[chosen.id]++;
        quartersPlayedBy[chosen.id].add(q);
      }
    });

    newQuarters[q] = qLineup;
  }

  state.quarterLineups = newQuarters;
  state.startingLineup = { ...newQuarters[1] };
  saveTeamData();
  renderAll();
  showToast(`⚡ 4 Quarters auto-balanced for ${readyPlayers.length} ready players!`);
}

function renderQuartersTab() {
  const formationConfig = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const readyPlayers = getReadyPlayers();

  for (let q = 1; q <= 4; q++) {
    const lineupContainer = document.getElementById(`qLineup${q}`);
    const benchContainer = document.getElementById(`qBench${q}`);
    if (!lineupContainer || !benchContainer) continue;

    lineupContainer.innerHTML = '';
    benchContainer.innerHTML = '';

    const qLineup = state.quarterLineups[q] || {};
    const onPitchIds = new Set();

    formationConfig.slots.forEach(slot => {
      const pid = qLineup[slot.id];
      const player = getPlayer(pid);
      if (pid) onPitchIds.add(pid);

      const row = document.createElement('div');
      row.className = 'q-player-row';
      row.title = `Click to swap ${slot.label}`;

      const posTag = `<span class="q-pos-tag" style="background: var(--pos-${slot.posGroup.toLowerCase()}); color: #000;">${slot.short}</span>`;
      const nameText = player ? `<strong>#${player.number} ${player.name}</strong>` : `<span style="color:var(--text-muted);">[Unassigned]</span>`;

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          ${posTag}
          <span>${nameText}</span>
        </div>
        <span style="font-size: 0.7rem; color: var(--text-muted);">${player ? player.preferredPos : ''}</span>
      `;

      row.addEventListener('click', () => {
        playSound('tap');
        const qSelect = document.getElementById('fieldQuarterSelect');
        if (qSelect) qSelect.value = String(q);
        openSwapModal(slot.id, `Q${q} ${slot.label}`, pid);
      });

      lineupContainer.appendChild(row);
    });

    const benchPlayers = readyPlayers.filter(p => !onPitchIds.has(p.id));
    const benchWrap = document.createElement('div');
    benchWrap.className = 'bench-chips-wrap';

    benchContainer.innerHTML = `<div class="bench-title-small">🪑 Ready Bench (${benchPlayers.length}):</div>`;
    benchPlayers.forEach(bp => {
      const chip = document.createElement('span');
      chip.className = 'bench-chip';
      chip.textContent = `#${bp.number} ${bp.name}`;
      benchWrap.appendChild(chip);
    });
    benchContainer.appendChild(benchWrap);
  }

  renderFairPlayTable();
}

function renderFairPlayTable() {
  const tbody = document.getElementById('fairPlayTableBody');
  const matrixTargetBadge = document.getElementById('matrixTargetBadge');
  if (!tbody) return;
  tbody.innerHTML = '';

  const readyPlayers = getReadyPlayers();
  const allPlayers = state.players;
  const quarterMins = state.quarterMinutes || 10;
  const totalMins = quarterMins * 4;

  const targetMinsPerPlayer = readyPlayers.length > 0 ? ((totalMins * 6) / readyPlayers.length).toFixed(0) : 0;
  if (matrixTargetBadge) matrixTargetBadge.textContent = `Target: ~${targetMinsPerPlayer} mins per ready player`;

  allPlayers.forEach(p => {
    const pStatus = getPlayerStatus(p);
    let qCount = 0;
    const qChecks = [];

    for (let q = 1; q <= 4; q++) {
      const qLineup = state.quarterLineups[q] || {};
      const slot = Object.entries(qLineup).find(([sId, pId]) => pId === p.id);
      if (slot) {
        qCount++;
        qChecks.push(`<span class="q-check active" title="Playing ${slot[0]}">${slot[0]}</span>`);
      } else {
        qChecks.push(`<span class="q-check bench" title="Bench">🪑</span>`);
      }
    }

    const estMins = qCount * quarterMins;
    const liveSecs = state.playerSecondsPlayed[p.id] || 0;

    let deltaHtml = `<span class="delta-even">0m</span>`;
    if (pStatus === 'ready') {
      const deltaSecs = liveSecs - (state.match.totalSecondsElapsed * 6 / Math.max(1, readyPlayers.length));
      if (deltaSecs > 60) {
        deltaHtml = `<span class="delta-plus">+${formatMinutesBrief(Math.abs(Math.round(deltaSecs)))}</span>`;
      } else if (deltaSecs < -60) {
        deltaHtml = `<span class="delta-minus">-${formatMinutesBrief(Math.abs(Math.round(deltaSecs)))}</span>`;
      }
    } else {
      deltaHtml = `<span style="color:var(--text-muted);">-</span>`;
    }

    const statusBadge = {
      ready: '<span class="badge badge-success">🟢 Ready</span>',
      rest: '<span class="badge" style="background:rgba(245,158,11,0.2); color:#fbbf24;">⏸️ Rest</span>',
      out: '<span class="badge" style="background:rgba(239,68,68,0.2); color:#f87171;">❌ Out</span>'
    }[pStatus];

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${p.number} ${p.name}</strong></td>
      <td>${statusBadge}</td>
      <td>${qChecks[0]}</td>
      <td>${qChecks[1]}</td>
      <td>${qChecks[2]}</td>
      <td>${qChecks[3]}</td>
      <td><strong>${qCount} / 4</strong> (${estMins}m)</td>
      <td><strong style="color: #34d399;">${formatMinutesBrief(liveSecs)}</strong></td>
      <td>${deltaHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

// -----------------------------------------------------------------------------
// LIVE MATCH TIMER & RUNNING EQUAL TIME LEADERBOARD (2 HALVES)
// -----------------------------------------------------------------------------

function toggleMatchTimer() {
  state.match.isRunning = !state.match.isRunning;
  const btn = document.getElementById('btnTimerToggle');
  const mBtn = document.getElementById('mobileTimerToggle');
  const currentHalf = state.match.currentHalf || 1;
  const halfName = currentHalf === 1 ? '1st Half' : '2nd Half';

  if (state.match.isRunning) {
    playSound('whistle');
    const txt = '⏸ Pause Timer';
    if (btn) { btn.textContent = txt; btn.className = 'btn btn-lg btn-danger'; }
    if (mBtn) { mBtn.textContent = '⏸ Pause'; mBtn.className = 'btn btn-sm btn-danger'; }
    startLiveTimerInterval();
    showToast(`⏱️ ${halfName} match timer running!`);
  } else {
    playSound('tap');
    const elapsed = state.match.halfSecondsElapsed || 0;
    const txt = elapsed === 0 ? `▶ Start ${halfName}` : '▶ Resume Timer';
    if (btn) { btn.textContent = txt; btn.className = 'btn btn-lg btn-success'; }
    if (mBtn) { mBtn.textContent = '▶ Start'; mBtn.className = 'btn btn-sm btn-success'; }
    stopLiveTimerInterval();
    showToast(`⏸ Timer paused at ${formatTime(elapsed)}`);
  }
  updateTimerDisplay();
  saveTeamData();
}

function startLiveTimerInterval() {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!state.match.isRunning) return;

    state.match.halfSecondsElapsed = (state.match.halfSecondsElapsed || 0) + 1;
    state.match.totalSecondsElapsed = (state.match.totalSecondsElapsed || 0) + 1;

    // Increment playing time for all players currently on the pitch
    const currentFormation = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
    const currentLineup = getActiveFieldLineup();
    const onFieldIds = [];
    currentFormation.slots.forEach(slot => {
      const pid = currentLineup[slot.id];
      if (pid) onFieldIds.push(pid);
    });

    onFieldIds.forEach(pid => {
      state.playerSecondsPlayed[pid] = (state.playerSecondsPlayed[pid] || 0) + 1;
    });

    updateTimerDisplay();
    renderLiveMinutesTally();

    const halfMaxSecs = (state.halfMinutes || 20) * 60;
    if (state.match.halfSecondsElapsed >= halfMaxSecs) {
      playSound('whistle');
      state.match.isRunning = false;
      stopLiveTimerInterval();
      const btn = document.getElementById('btnTimerToggle');
      const mBtn = document.getElementById('mobileTimerToggle');
      const currentHalf = state.match.currentHalf || 1;

      if (currentHalf === 1) {
        if (btn) { btn.textContent = '▶ Start 2nd Half'; btn.className = 'btn btn-lg btn-success'; }
        if (mBtn) { mBtn.textContent = '▶ Start 2H'; mBtn.className = 'btn btn-sm btn-success'; }
        showToast(`🔔 1ST HALF COMPLETE (Half-Time)! Great work. Time for break & 2nd half goalie check.`);
      } else {
        if (btn) { btn.textContent = '🏁 Full Time'; btn.className = 'btn btn-lg btn-subtle'; }
        if (mBtn) { mBtn.textContent = '🏁 Final'; mBtn.className = 'btn btn-sm btn-subtle'; }
        showToast(`🏁 FULL TIME! Final whistle! ⚽`);
      }
    }
  }, 1000);
}

function stopLiveTimerInterval() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const clock = document.getElementById('timerClockDisplay');
  const progress = document.getElementById('timerProgressFill');
  const period = document.getElementById('currentPeriodDisplay');
  const btn = document.getElementById('btnTimerToggle');
  const nextBtn = document.getElementById('btnNextHalf') || document.getElementById('btnNextQuarter');

  const mPeriod = document.getElementById('mobilePeriodDisplay');
  const mTime = document.getElementById('mobileTimeDisplay');
  const mScore = document.getElementById('mobileScoreDisplay');

  const elapsed = state.match.halfSecondsElapsed || 0;
  const timeStr = formatTime(elapsed);

  if (clock) clock.textContent = timeStr;
  if (mTime) mTime.textContent = timeStr;

  const halfMaxSecs = (state.halfMinutes || 20) * 60;
  const pct = Math.min(100, (elapsed / halfMaxSecs) * 100);
  if (progress) progress.style.width = `${pct}%`;

  const h = state.match.currentHalf || 1;
  const hStr = h === 1 ? '1ST HALF' : '2ND HALF';
  if (period) period.textContent = hStr;
  if (mPeriod) mPeriod.textContent = h === 1 ? '1H' : '2H';
  if (mScore) mScore.textContent = `${state.match.homeScore || 0} - ${state.match.awayScore || 0}`;

  if (nextBtn) {
    nextBtn.textContent = h === 1 ? '2nd Half ⏩' : 'Full Time 🏁';
  }

  const currentFormation = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const currentLineup = getActiveFieldLineup();

  currentFormation.slots.forEach(slot => {
    const pid = currentLineup[slot.id];
    const sec = pid ? (state.playerSecondsPlayed[pid] || 0) : 0;
    const formatted = formatTime(sec);

    const el = document.getElementById(`slotPlayerTimer_${slot.id}`);
    if (el) el.textContent = formatMinutesBrief(sec);
  });
}

function advanceToNextHalf() {
  stopLiveTimerInterval();
  state.match.isRunning = false;
  state.match.halfSecondsElapsed = 0;

  if ((state.match.currentHalf || 1) === 1) {
    state.match.currentHalf = 2;
    playSound('whistle');
    showToast(`⏩ Advanced to 2nd Half! Check your 2nd Half Goalie 🧤`);
  } else {
    alert(`🏁 Full Time! Final score: Red Falcons ${state.match.homeScore || 0} - ${state.match.awayScore || 0} ${state.match.opponentName || 'Wildcats'}`);
  }

  const btn = document.getElementById('btnTimerToggle');
  const mBtn = document.getElementById('mobileTimerToggle');
  if (btn) {
    btn.textContent = state.match.currentHalf === 2 ? `▶ Start 2nd Half` : `🏁 Full Time`;
    btn.className = 'btn btn-lg btn-success';
  }
  if (mBtn) {
    mBtn.textContent = state.match.currentHalf === 2 ? `▶ Start 2H` : `🏁 Final`;
    mBtn.className = 'btn btn-sm btn-success';
  }

  updateTimerDisplay();
  renderFieldAndBench();
  saveTeamData();
}

function resetMatch() {
  if (!confirm("Reset match clock, scores, and player minutes?")) return;
  stopLiveTimerInterval();
  state.match = {
    homeScore: 0,
    awayScore: 0,
    opponentName: state.match.opponentName || "Wildcats",
    currentHalf: 1,
    halfSecondsElapsed: 0,
    totalSecondsElapsed: 0,
    isRunning: false,
    goals: [],
    events: []
  };
  state.players.forEach(p => {
    state.playerSecondsPlayed[p.id] = 0;
  });
  const btn = document.getElementById('btnTimerToggle');
  const mBtn = document.getElementById('mobileTimerToggle');
  if (btn) {
    btn.textContent = '▶ Start 1st Half';
    btn.className = 'btn btn-lg btn-success';
  }
  if (mBtn) {
    mBtn.textContent = '▶ Start';
    mBtn.className = 'btn btn-sm btn-success';
  }
  updateTimerDisplay();
  renderAll();
  saveTeamData();
  showToast("↺ Match reset for 1st Half!");
}
  const btn = document.getElementById('btnTimerToggle');
  const mBtn = document.getElementById('mobileTimerToggle');
  if (btn) {
    btn.textContent = '▶ Start Timer';
    btn.className = 'btn btn-lg btn-success';
  }
  if (mBtn) {
    mBtn.textContent = '▶ Start';
    mBtn.className = 'btn btn-sm btn-success';
  }
  updateTimerDisplay();
  renderAll();
  saveTeamData();
  showToast("↺ Match reset!");
}

// -----------------------------------------------------------------------------
// LIVE MINUTES LEADERBOARD & EQUAL TIME SMART SUBS
// -----------------------------------------------------------------------------

function renderLiveMinutesTally() {
  const tallyCard = document.getElementById('liveMinutesTallyCard');
  if (!tallyCard) return;

  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const onFieldIds = new Set(getPlayersOnPitch(currentLineup));
  const gkPlayerId = currentLineup['GK'];

  const readyPlayers = getReadyPlayers();
  const allPlayers = state.players;

  const maxSecs = Math.max(...allPlayers.map(p => state.playerSecondsPlayed[p.id] || 0), 60);
  const targetPerReady = readyPlayers.length > 0 ? (state.match.totalSecondsElapsed * 6 / readyPlayers.length) : 0;

  // On-field outfield vs Bench ready players (exclude GK from outfield sub suggestion)
  const onFieldOutfield = readyPlayers.filter(p => onFieldIds.has(p.id) && p.id !== gkPlayerId);
  const benchReady = readyPlayers.filter(p => !onFieldIds.has(p.id));

  let mostPlayedOnField = null;
  if (onFieldOutfield.length > 0) {
    mostPlayedOnField = [...onFieldOutfield].sort((a, b) => {
      return (state.playerSecondsPlayed[b.id] || 0) - (state.playerSecondsPlayed[a.id] || 0);
    })[0];
  }

  let leastPlayedOnBench = null;
  if (benchReady.length > 0) {
    leastPlayedOnBench = [...benchReady].sort((a, b) => {
      return (state.playerSecondsPlayed[a.id] || 0) - (state.playerSecondsPlayed[b.id] || 0);
    })[0];
  }

  // Sort squad: On field first, then by minutes played descending
  const sortedSquad = [...allPlayers].sort((a, b) => {
    const aField = onFieldIds.has(a.id) ? 1 : 0;
    const bField = onFieldIds.has(b.id) ? 1 : 0;
    if (aField !== bField) return bField - aField;
    return (state.playerSecondsPlayed[b.id] || 0) - (state.playerSecondsPlayed[a.id] || 0);
  });

  // Smart sub banner
  let subBannerHtml = '';
  if (mostPlayedOnField && leastPlayedOnBench) {
    const mostMins = formatMinutesBrief(state.playerSecondsPlayed[mostPlayedOnField.id] || 0);
    const leastMins = formatMinutesBrief(state.playerSecondsPlayed[leastPlayedOnBench.id] || 0);

    subBannerHtml = `
      <div class="smart-sub-banner">
        <div>
          <strong style="color: #a5b4fc;">⚖️ Equal Time Smart Sub:</strong>
          <div class="sub-suggestion-text">
            Sub Out: <strong>${mostPlayedOnField.name}</strong> (#${mostPlayedOnField.number}, ${mostMins}) ➔ Sub In: <strong>${leastPlayedOnBench.name}</strong> (#${leastPlayedOnBench.number}, only ${leastMins})
          </div>
        </div>
        <button class="btn btn-sm btn-primary" onclick="quickSwapPlayers('${mostPlayedOnField.id}', '${leastPlayedOnBench.id}')">⚡ 1-Tap Swap</button>
      </div>
    `;
  }

  tallyCard.innerHTML = `
    <div class="tally-header">
      <div>
        <h3>⏱️ Live Playing Time Tracker (${readyPlayers.length} Active, ${allPlayers.length} Total)</h3>
        <p style="font-size: 0.75rem; color: var(--text-muted);">Running tally increments every second for on-pitch players to guarantee fair equal time.</p>
      </div>
      <span class="badge badge-success">⚖️ Equal Time Engine</span>
    </div>
    ${subBannerHtml}
    <div class="tally-grid" id="tallyGrid"></div>
  `;

  const grid = document.getElementById('tallyGrid');
  if (!grid) return;

  sortedSquad.forEach(p => {
    const isOnField = onFieldIds.has(p.id);
    const pStatus = getPlayerStatus(p);
    const seconds = state.playerSecondsPlayed[p.id] || 0;
    const meterPct = Math.min(100, (seconds / maxSecs) * 100);

    const isSubOut = mostPlayedOnField && p.id === mostPlayedOnField.id && isOnField;
    const isSubIn = leastPlayedOnBench && p.id === leastPlayedOnBench.id && !isOnField && pStatus === 'ready';

    const card = document.createElement('div');
    card.className = `tally-card ${isOnField ? 'on-field' : ''} ${isSubOut ? 'sub-out-suggested' : ''} ${isSubIn ? 'sub-in-suggested' : ''} status-${pStatus}`;

    let badgeText = isOnField ? '🟢 ON FIELD' : (pStatus === 'ready' ? '🪑 BENCH' : (pStatus === 'rest' ? '⏸️ REST' : '❌ OUT'));
    if (p.id === gkPlayerId) {
      badgeText = '🧤 GOALIE (1 Half)';
    } else if (isSubOut) {
      badgeText = '⚠️ MOST MINS';
    } else if (isSubIn) {
      badgeText = '⭐ LEAST MINS';
    }

    // Calculate Delta vs Target
    let deltaText = '';
    if (pStatus === 'ready' && targetPerReady > 0) {
      const diff = seconds - targetPerReady;
      if (diff > 45) {
        deltaText = `<span class="tally-target-delta delta-plus">+${formatMinutesBrief(Math.round(diff))}</span>`;
      } else if (diff < -45) {
        deltaText = `<span class="tally-target-delta delta-minus">-${formatMinutesBrief(Math.abs(Math.round(diff)))}</span>`;
      } else {
        deltaText = `<span class="tally-target-delta delta-even">Balanced</span>`;
      }
    }

    card.innerHTML = `
      <div class="tally-card-top">
        <div class="tally-player-info">
          <div class="tally-num-badge">${p.number}</div>
          <div>
            <div class="tally-name">${p.name}</div>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${p.preferredPos}</span>
          </div>
        </div>
        <span class="tally-status-badge status-${isOnField ? 'field' : pStatus}">${badgeText}</span>
      </div>

      <div class="tally-time-row">
        <span class="tally-mins-big">${formatMinutesBrief(seconds)}</span>
        ${deltaText}
      </div>

      <div class="tally-meter">
        <div class="tally-meter-fill" style="width: ${meterPct}%;"></div>
      </div>

      <!-- 1-Tap Status Selector on the Leaderboard (Toggles when tapped) -->
      <div class="status-pill-toggle">
        <button class="status-opt-btn opt-ready ${pStatus === 'ready' ? 'active' : ''}" onclick="setPlayerStatus('${p.id}', 'ready')">🟢 Ready</button>
        <button class="status-opt-btn opt-rest ${pStatus === 'rest' ? 'active' : ''}" onclick="setPlayerStatus('${p.id}', 'rest')">⏸️ Break</button>
        <button class="status-opt-btn opt-out ${pStatus === 'out' ? 'active' : ''}" onclick="setPlayerStatus('${p.id}', 'out')">❌ Out</button>
      </div>

      <div class="tally-actions-row">
        ${isOnField 
          ? `<button class="btn btn-sm btn-subtle" onclick="quickSubPlayerOut('${p.id}')">Sub Off 🪑</button>
             <button class="btn btn-sm btn-outline" style="border-color:#f59e0b; color:#fbbf24;" onclick="setPlayerStatus('${p.id}', 'rest')">⏸️ Rest</button>` 
          : (pStatus === 'ready' 
              ? `<button class="btn btn-sm btn-primary" onclick="openPlaceBenchPlayerModal('${p.id}', '${p.name}')">Sub On 🏃</button>
                 <button class="btn btn-sm btn-subtle" onclick="setPlayerStatus('${p.id}', 'rest')">⏸️ Rest</button>` 
              : `<button class="btn btn-sm btn-success" style="width:100%;" onclick="setPlayerStatus('${p.id}', 'ready')">🟢 Resume Playing</button>`)}
      </div>
    `;

    grid.appendChild(card);
  });
}

window.quickSubPlayerOut = function(playerId) {
  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const onFieldIds = new Set(getPlayersOnPitch(currentLineup));
  const readyBench = getReadyPlayers().filter(p => !onFieldIds.has(p.id));

  if (readyBench.length === 0) {
    alert("No ready bench players available to sub in!");
    return;
  }

  const subInPlayer = [...readyBench].sort((a, b) => {
    return (state.playerSecondsPlayed[a.id] || 0) - (state.playerSecondsPlayed[b.id] || 0);
  })[0];

  let targetSlot = null;
  for (const [slotId, pid] of Object.entries(currentLineup)) {
    if (pid === playerId) {
      targetSlot = slotId;
      break;
    }
  }

  if (targetSlot && subInPlayer) {
    executeSlotAssignment(targetSlot, subInPlayer.id);
    playSound('tap');
    showToast(`⚡ Subbed ${subInPlayer.name} IN for ${getPlayer(playerId)?.name}!`);
  }
};

function renderLiveMatchTab() {
  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const formationConfig = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];
  const readyPlayers = getReadyPlayers();

  // Scoreboard
  const homeScoreEl = document.getElementById('homeScoreDisplay');
  const awayScoreEl = document.getElementById('awayScoreDisplay');
  const homeNameEl = document.getElementById('scoreHomeName');
  const oppInput = document.getElementById('opponentNameInput');

  if (homeScoreEl) homeScoreEl.textContent = state.match.homeScore;
  if (awayScoreEl) awayScoreEl.textContent = state.match.awayScore;
  if (homeNameEl) homeNameEl.textContent = state.teamName;
  if (oppInput) oppInput.value = state.match.opponentName || "Wildcats";

  // Live Field Grid
  const liveGrid = document.getElementById('liveFieldGrid');
  if (liveGrid) {
    liveGrid.innerHTML = '';
    const onPitchIds = new Set();

    formationConfig.slots.forEach(slot => {
      const pid = currentLineup[slot.id];
      const player = getPlayer(pid);
      if (pid) onPitchIds.add(pid);

      const card = document.createElement('div');
      card.className = 'live-pos-card';
      const seconds = player ? (state.playerSecondsPlayed[player.id] || 0) : 0;

      card.innerHTML = `
        <span class="live-pos-label">${slot.label} (${slot.short})</span>
        <div class="live-pos-player">${player ? `#${player.number} ${player.name}` : '[Empty]'}</div>
        <span style="font-size: 0.7rem; color: #34d399; font-weight:700;">⏱️ ${formatMinutesBrief(seconds)}</span>
      `;

      card.addEventListener('click', () => {
        playSound('tap');
        openSwapModal(slot.id, `Live ${slot.label}`, pid);
      });

      liveGrid.appendChild(card);
    });

    // Live Bench Tags
    const benchTags = document.getElementById('liveBenchTags');
    if (benchTags) {
      benchTags.innerHTML = '';
      const benchPlayers = readyPlayers.filter(p => !onPitchIds.has(p.id));
      benchPlayers.forEach(bp => {
        const pill = document.createElement('div');
        pill.className = 'live-bench-pill';
        const seconds = state.playerSecondsPlayed[bp.id] || 0;
        pill.innerHTML = `<span>#${bp.number} ${bp.name}</span> <span style="font-size: 0.7rem; color: #34d399; font-weight:700;">⏱️ ${formatMinutesBrief(seconds)}</span>`;
        pill.addEventListener('click', () => {
          playSound('tap');
          openPlaceBenchPlayerModal(bp.id, bp.name);
        });
        benchTags.appendChild(pill);
      });
    }
  }

  renderLiveMinutesTally();
  renderMatchEvents();
  updateTimerDisplay();
}

function handleGoal(team, change) {
  if (team === 'home') {
    state.match.homeScore = Math.max(0, state.match.homeScore + change);
    if (change > 0) {
      playSound('goal');
      openGoalScorerModal();
    }
  } else {
    state.match.awayScore = Math.max(0, state.match.awayScore + change);
    if (change > 0) {
      state.match.events.unshift({
        time: formatTime(state.match.quarterSecondsElapsed),
        quarter: state.match.currentQuarter,
        text: `Opponent scored a goal (${state.match.homeScore} - ${state.match.awayScore})`
      });
    }
  }
  renderLiveMatchTab();
  saveTeamData();
}

function openGoalScorerModal() {
  const modal = document.getElementById('goalModal');
  const grid = document.getElementById('goalScorersGrid');
  if (!modal || !grid) return;

  grid.innerHTML = '';
  const currentQ = state.match.currentQuarter || 1;
  const currentLineup = state.quarterLineups[currentQ] || state.startingLineup;
  const onPitchIds = getPlayersOnPitch(currentLineup);

  getReadyPlayers().forEach(p => {
    const isOnField = onPitchIds.includes(p.id);
    const btn = document.createElement('button');
    btn.className = `btn ${isOnField ? 'btn-primary' : 'btn-outline'}`;
    btn.style.padding = '0.75rem';
    btn.innerHTML = `⚽ #${p.number} ${p.name} ${isOnField ? '' : '(Sub)'}`;

    btn.addEventListener('click', () => {
      state.match.events.unshift({
        time: formatTime(state.match.quarterSecondsElapsed),
        quarter: state.match.currentQuarter,
        text: `⚽ GOAL by #${p.number} ${p.name}! (${state.match.homeScore} - ${state.match.awayScore})`
      });
      showToast(`🎉 Goal recorded for ${p.name}! Great shot!`);
      closeAllModals();
      renderMatchEvents();
      saveTeamData();
    });

    grid.appendChild(btn);
  });

  modal.classList.add('active');
}

function renderMatchEvents() {
  const list = document.getElementById('matchEventsList');
  if (!list) return;

  if (!state.match.events || state.match.events.length === 0) {
    list.innerHTML = `<div class="empty-event-msg">No goals or events recorded yet. Cheer on the kids! 📣</div>`;
    return;
  }

  list.innerHTML = '';
  state.match.events.forEach(ev => {
    const row = document.createElement('div');
    row.className = 'event-row';
    row.innerHTML = `
      <span>${ev.text}</span>
      <span style="color: var(--text-muted); font-size: 0.75rem;">Q${ev.quarter} • ${ev.time}</span>
    `;
    list.appendChild(row);
  });
}

// -----------------------------------------------------------------------------
// SQUAD ROSTER MANAGEMENT TAB
// -----------------------------------------------------------------------------

function renderRosterTab() {
  const grid = document.getElementById('squadCardsGrid');
  const countBadge = document.getElementById('rosterCountBadge');
  if (!grid) return;

  grid.innerHTML = '';
  const readyCount = getReadyPlayers().length;
  const total = state.players.length;
  if (countBadge) countBadge.textContent = `${readyCount} Ready / ${total} Total`;

  state.players.forEach(p => {
    const pStatus = getPlayerStatus(p);
    const card = document.createElement('div');
    card.className = `squad-player-card status-${pStatus}`;

    const seconds = state.playerSecondsPlayed[p.id] || 0;

    card.innerHTML = `
      <div class="squad-card-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="bench-number" style="margin-bottom:0;">${p.number}</div>
          <div>
            <div class="squad-player-name">${p.name}</div>
            <span class="bench-pos-badge pos-${p.preferredPos}">${p.preferredPos}</span>
          </div>
        </div>
        <div class="squad-card-actions">
          <button class="btn btn-sm btn-outline" onclick="openEditPlayerModal('${p.id}')">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="deletePlayer('${p.id}')">🗑️</button>
        </div>
      </div>

      <div class="player-notes-text">${p.notes || 'No notes added.'}</div>

      <!-- 1-Tap Status Selector -->
      <div class="status-pill-toggle">
        <button class="status-opt-btn opt-ready ${pStatus === 'ready' ? 'active' : ''}" onclick="setPlayerStatus('${p.id}', 'ready')">🟢 Ready</button>
        <button class="status-opt-btn opt-rest ${pStatus === 'rest' ? 'active' : ''}" onclick="setPlayerStatus('${p.id}', 'rest')">⏸️ Break</button>
        <button class="status-opt-btn opt-out ${pStatus === 'out' ? 'active' : ''}" onclick="setPlayerStatus('${p.id}', 'out')">❌ Out</button>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--card-border); padding-top: 0.4rem; margin-top: 0.2rem;">
        <span style="font-size: 0.7rem; color: var(--text-muted);">Match Time:</span>
        <span style="font-size: 0.8rem; color: #34d399; font-weight: 800;">⏱️ ${formatMinutesBrief(seconds)}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openAddPlayerModal() {
  document.getElementById('modalTitle').textContent = 'Add Player to Squad';
  document.getElementById('formPlayerId').value = '';
  document.getElementById('formPlayerName').value = '';
  document.getElementById('formPlayerNumber').value = getHighestJerseyNumber() + 1;
  document.getElementById('formPlayerPos').value = 'MID';
  document.getElementById('formPlayerNotes').value = '';
  
  const readyRadio = document.querySelector('input[name="formPlayerStatus"][value="ready"]');
  if (readyRadio) readyRadio.checked = true;

  document.getElementById('playerModal').classList.add('active');
  setTimeout(() => {
    document.getElementById('formPlayerName')?.focus();
  }, 100);
}

window.openEditPlayerModal = function(id) {
  const p = getPlayer(id);
  if (!p) return;
  document.getElementById('modalTitle').textContent = `Edit ${p.name}`;
  document.getElementById('formPlayerId').value = p.id;
  document.getElementById('formPlayerName').value = p.name;
  document.getElementById('formPlayerNumber').value = p.number;
  document.getElementById('formPlayerPos').value = p.preferredPos || 'ALL';
  document.getElementById('formPlayerNotes').value = p.notes || '';

  const pStatus = getPlayerStatus(p);
  const statusRadio = document.querySelector(`input[name="formPlayerStatus"][value="${pStatus}"]`);
  if (statusRadio) statusRadio.checked = true;

  document.getElementById('playerModal').classList.add('active');
};

window.deletePlayer = function(id) {
  const p = getPlayer(id);
  if (!p) return;
  if (!confirm(`Remove ${p.name} from squad?`)) return;

  state.players = state.players.filter(pl => pl.id !== id);
  delete state.playerSecondsPlayed[id];
  saveTeamData();
  renderAll();
  showToast(`🗑️ Removed ${p.name} from squad.`);
};

// -----------------------------------------------------------------------------
// GAME DAY EXPORTER
// -----------------------------------------------------------------------------

function generateLineupExportText() {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  let text = `⚽ ${state.teamName.toUpperCase()} - GAME DAY LINEUP (${dateStr}) ⚽\n`;
  text += `🏟️ U8 6v6 Match vs ${state.match.opponentName || 'Opponent'}\n`;
  text += `🥤 Snack Duty: ${state.snackDuty || 'TBD'}\n\n`;

  text += `--- 4 QUARTER ROTATIONS ---\n`;
  for (let q = 1; q <= 4; q++) {
    const qLineup = state.quarterLineups[q] || {};
    const onPitch = [];
    const formationConfig = FORMATIONS[state.formation] || FORMATIONS["2-2-1"];

    formationConfig.slots.forEach(slot => {
      const p = getPlayer(qLineup[slot.id]);
      if (p) onPitch.push(`${slot.short}: ${p.name} (#${p.number})`);
    });

    const onPitchIds = new Set(getPlayersOnPitch(qLineup));
    const bench = getReadyPlayers().filter(p => !onPitchIds.has(p.id)).map(p => p.name);

    text += `Q${q}: [${onPitch.join(', ')}]\n`;
    text += `   Bench: ${bench.join(', ') || 'None'}\n\n`;
  }

  text += `Equal playing time for all! Let's have fun and play hard! Go ${state.teamName}! ⚡`;
  return text;
}

function renderToolsTab() {
  const textarea = document.getElementById('exportLineupText');
  const snackDisplay = document.getElementById('snackDutyDisplay');
  if (textarea) textarea.value = generateLineupExportText();
  if (snackDisplay) snackDisplay.textContent = state.snackDuty || 'Assigned per game';
}

// -----------------------------------------------------------------------------
// INITIALIZATION & EVENT LISTENERS
// -----------------------------------------------------------------------------

function renderAll() {
  document.getElementById('displayTeamName').textContent = state.teamName || "The Red Falcons";
  document.getElementById('settingTeamName').value = state.teamName || "The Red Falcons";
  document.getElementById('settingSnackDuty').value = state.snackDuty || "Selbie Family";
  const halfInput = document.getElementById('settingHalfMins') || document.getElementById('settingQuarterMins');
  if (halfInput) halfInput.value = state.halfMinutes || 20;
  document.getElementById('formationSelect').value = state.formation || "2-2-1";

  renderFieldAndBench();
  renderRosterTab();
  renderToolsTab();
}

document.addEventListener('DOMContentLoaded', () => {
  const cached = localStorage.getItem('soccerCoachState');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed.teamName === "The Thunderbolts" || !parsed.teamName) {
        parsed.teamName = "The Red Falcons";
      }
      Object.assign(state, parsed);
    } catch (e) {}
  }

  fetchTeamData();

  // Tab Navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('tap');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');

      if (target === 'fieldTab') renderFieldAndBench();
      if (target === 'rosterTab') renderRosterTab();
      if (target === 'toolsTab') renderToolsTab();
    });
  });

  // Mobile Buttons
  document.getElementById('mobileTimerToggle')?.addEventListener('click', toggleMatchTimer);
  document.getElementById('mobileQuickSubBtn')?.addEventListener('click', () => {
    // Navigate to live match tab
    document.querySelector('.tab-btn[data-tab="matchTab"]')?.click();
  });

  // Formation Change
  document.getElementById('formationSelect')?.addEventListener('change', (e) => {
    state.formation = e.target.value;
    saveTeamData();
    renderAll();
    showToast(`Formation updated to ${e.target.value}`);
  });

  document.getElementById('fieldQuarterSelect')?.addEventListener('change', () => {
    renderFieldAndBench();
  });

  document.getElementById('btnAutoBalanceQuarters')?.addEventListener('click', () => {
    autoBalanceQuarters();
  });

  // Timer Controls (2 Halves)
  document.getElementById('btnTimerToggle')?.addEventListener('click', toggleMatchTimer);
  document.getElementById('btnNextHalf')?.addEventListener('click', advanceToNextHalf);
  document.getElementById('btnNextQuarter')?.addEventListener('click', advanceToNextHalf);
  document.getElementById('btnTimerReset')?.addEventListener('click', resetMatch);

  document.getElementById('btnDeployQuarterLineup')?.addEventListener('click', () => {
    const currentQ = state.match.currentQuarter || 1;
    state.startingLineup = { ...(state.quarterLineups[currentQ] || state.startingLineup) };
    saveTeamData();
    renderAll();
    showToast(`📥 Quarter ${currentQ} schedule deployed to field!`);
  });

  // Scores
  document.getElementById('btnGoalHome')?.addEventListener('click', () => handleGoal('home', 1));
  document.getElementById('btnGoalHomeMinus')?.addEventListener('click', () => handleGoal('home', -1));
  document.getElementById('btnGoalAway')?.addEventListener('click', () => handleGoal('away', 1));
  document.getElementById('btnGoalAwayMinus')?.addEventListener('click', () => handleGoal('away', -1));

  document.getElementById('opponentNameInput')?.addEventListener('change', (e) => {
    state.match.opponentName = e.target.value;
    saveTeamData();
  });

  // Quick Add Player Form Submit
  document.getElementById('quickAddPlayerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('quickPlayerName');
    const name = nameInput.value.trim();
    if (!name) return;
    const numInput = document.getElementById('quickPlayerNumber');
    const numVal = parseInt(numInput.value, 10);
    const number = !isNaN(numVal) ? numVal : (getHighestJerseyNumber() + 1);
    const pos = document.getElementById('quickPlayerPos').value || 'MID';

    const newId = 'p_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 3);
    state.players.push({
      id: newId,
      name,
      number,
      preferredPos: pos,
      notes: '',
      status: 'ready',
      active: true
    });
    state.playerSecondsPlayed[newId] = 0;

    saveTeamData();
    renderAll();
    nameInput.value = '';
    numInput.value = '';
    nameInput.focus();
    playSound('tap');
    showToast(`✅ Added ${name} (#${number}) to squad!`);
  });

  // Player Modal Form Submit
  document.getElementById('playerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('formPlayerId').value;
    const name = document.getElementById('formPlayerName').value.trim();
    const number = parseInt(document.getElementById('formPlayerNumber').value, 10) || (getHighestJerseyNumber() + 1);
    const pos = document.getElementById('formPlayerPos').value;
    const notes = document.getElementById('formPlayerNotes').value.trim();
    const statusRadio = document.querySelector('input[name="formPlayerStatus"]:checked');
    const status = statusRadio ? statusRadio.value : 'ready';

    if (id) {
      const p = getPlayer(id);
      if (p) {
        p.name = name;
        p.number = number;
        p.preferredPos = pos;
        p.notes = notes;
        p.status = status;
        p.active = status !== 'out';
      }
    } else {
      const newId = 'p_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 3);
      state.players.push({
        id: newId,
        name,
        number,
        preferredPos: pos,
        notes,
        status,
        active: status !== 'out'
      });
      state.playerSecondsPlayed[newId] = 0;
    }

    saveTeamData();
    closeAllModals();
    renderAll();
    showToast(`✅ Player ${name} saved!`);
  });

  // Authentication Handlers
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const errorEl = document.getElementById('loginError');

    const username = usernameInput?.value.trim();
    const password = passwordInput?.value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('falconCoachAuthToken', data.token);
          if (errorEl) errorEl.style.display = 'none';
          hideLoginModal();
          fetchTeamData();
          showToast('⚽ Welcome Coach! The Red Falcons match room unlocked.');
          return;
        }
      }
      if (res.status === 401) {
        if (errorEl) {
          errorEl.textContent = 'Invalid username or password';
          errorEl.style.display = 'block';
        }
        return;
      }
    } catch (err) {
      // Offline / GitHub Pages static hosting fallback
    }

    // Static client-side validation for GitHub Pages
    if (username.toLowerCase() === 'coach' && password === 'redfalconsarethebest') {
      const token = 'falcon_coach_token_static_auth';
      localStorage.setItem('falconCoachAuthToken', token);
      if (errorEl) errorEl.style.display = 'none';
      hideLoginModal();
      fetchTeamData();
      showToast('⚽ Welcome Coach! The Red Falcons match room unlocked.');
    } else {
      if (errorEl) {
        errorEl.textContent = 'Invalid username or password';
        errorEl.style.display = 'block';
      }
    }
  });

  document.getElementById('btnLogout')?.addEventListener('click', async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('falconCoachAuthToken');
    showLoginModal();
    showToast('🔒 Logged out successfully.');
  });

  document.getElementById('btnOpenAddPlayerModal')?.addEventListener('click', openAddPlayerModal);
  document.getElementById('btnBenchAddPlayer')?.addEventListener('click', openAddPlayerModal);
  document.getElementById('btnClosePlayerModal')?.addEventListener('click', closeAllModals);
  document.getElementById('btnCancelPlayerModal')?.addEventListener('click', closeAllModals);
  document.getElementById('btnCloseSwapModal')?.addEventListener('click', closeAllModals);
  document.getElementById('btnCloseGoalModal')?.addEventListener('click', closeAllModals);

  // Settings Save
  document.getElementById('btnSaveTeamSettings')?.addEventListener('click', () => {
    state.teamName = document.getElementById('settingTeamName').value.trim() || state.teamName;
    state.snackDuty = document.getElementById('settingSnackDuty').value.trim() || state.snackDuty;
    const halfInput = document.getElementById('settingHalfMins') || document.getElementById('settingQuarterMins');
    state.halfMinutes = parseInt(halfInput?.value, 10) || 20;
    saveTeamData();
    renderAll();
    showToast("💾 Team settings saved!");
  });

  // Share / Copy Lineup
  const copyBtnAction = () => {
    const txt = generateLineupExportText();
    navigator.clipboard.writeText(txt).then(() => {
      showToast("📋 Lineup copied to clipboard for WhatsApp/SMS!");
    }).catch(() => {
      showToast("Lineup formatted below. Select and copy!");
    });
  };

  document.getElementById('btnShareLineup')?.addEventListener('click', copyBtnAction);
  document.getElementById('btnCopyExport')?.addEventListener('click', copyBtnAction);
  document.getElementById('btnRefreshExport')?.addEventListener('click', renderToolsTab);

  renderAll();
});
