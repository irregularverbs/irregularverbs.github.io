/* ============================================================
   IRREGULARS — app.js (con delegación de eventos)
   ============================================================ */

class IrregularsApp {
  constructor() {
    this.priority = "high";
    this.mode     = "2col";
    this.limit    = 25;

    this.exercises       = [];
    this.currentIndex    = 0;
    this.currentExercise = null;
    this.isFlipped       = false;
    this.sessionScore    = { correct: 0, incorrect: 0 };

    this.stats = this.loadStats();
    this.$ = {};
  }

  init() {
    this.cacheDom();
    this.bindGlobalDelegation();
    this.startSplashTimer();
    this.setupKeyboard();
    this.updateStatsUI();
    console.log("[IRREGULARS] App iniciada");
  }

  cacheDom() {
    const ids = [
      "splash-screen", "splash-progress",
      "view-home", "view-study", "view-stats",
      "nav-home", "nav-stats", "install-btn",
      "selected-priority-label", "selected-mode-label",
      "session-counter", "session-progress-bar",
      "flashcard", "card-type-badge", "card-verb-hint", "card-sentence",
      "answer-form", "answer-input",
      "feedback-correct-word",
      "mini-verb-title", "mini-verb-es",
      "mini-base", "mini-past", "mini-part",
      "stat-total", "stat-accuracy", "stat-streak", "stat-best-streak",
      "prog-high", "bar-high",
      "prog-medium", "bar-medium",
      "prog-low", "bar-low",
      "toast", "toast-content", "toast-msg"
    ];
    ids.forEach((id) => { this.$[id] = document.getElementById(id); });
  }

  /**
   * UN solo listener en document captura TODOS los clics.
   * No importa cuándo se cree el botón: si está en el DOM cuando
   * se pulsa, funciona.
   */
  bindGlobalDelegation() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("button, .brand, .chip, .tile");
      if (!t) return;

      const id = t.id;

      // Marca
      if (t.classList.contains("brand")) { this.goHome(); return; }

      // Navegación
      if (id === "nav-home")  { this.goHome(); return; }
      if (id === "nav-stats") { this.showStats(); return; }
      if (id === "install-btn") { this.installPWA(); return; }

      // Prioridad
      if (id === "p-high")   { this.setPriority("high"); return; }
      if (id === "p-medium") { this.setPriority("medium"); return; }
      if (id === "p-low")    { this.setPriority("low"); return; }
      if (id === "p-all")    { this.setPriority("all"); return; }

      // Modo
      if (id === "m-2col") { this.setMode("2col"); return; }
      if (id === "m-3col") { this.setMode("3col"); return; }
      if (id === "m-both") { this.setMode("both"); return; }

      // Límite
      if (t.classList.contains("limit-btn")) {
        this.setLimit(Number(t.dataset.limit));
        return;
      }

      // Comenzar sesión
      if (id === "start-session-btn") { this.startSession(); return; }

      // Botón "Continuar practicando" (dorso tarjeta)
      if (id === "next-card-btn") { this.nextCard(); return; }

      // Salir de sesión
      if (id === "exit-session-btn") { this.confirmExit(); return; }

      // Reiniciar stats
      if (id === "reset-stats-btn") { this.resetStats(); return; }
    });

    // Submit del formulario (no es click, es submit)
    document.addEventListener("submit", (e) => {
      if (e.target && e.target.id === "answer-form") {
        this.checkAnswer(e);
      }
    });
  }

  startSplashTimer() {
    const splash   = this.$["splash-screen"];
    const progress = this.$["splash-progress"];
    if (!splash) return;

    setTimeout(() => { if (progress) progress.style.width = "60%";  }, 150);
    setTimeout(() => { if (progress) progress.style.width = "100%"; }, 350);

    const hide = () => {
      splash.classList.add("is-hidden");
      setTimeout(() => { if (splash.parentNode) splash.remove(); }, 500);
    };

    setTimeout(hide, 700);
    setTimeout(hide, 2000);
  }

  setupKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const study = this.$["view-study"];
      if (!study || !study.classList.contains("is-visible")) return;
      if (this.isFlipped) {
        e.preventDefault();
        this.nextCard();
      }
    });
  }

  /* ---------- CONFIGURACIÓN ---------- */
  setPriority(priority) {
    this.priority = priority;
    document.querySelectorAll(".tile--priority").forEach((el) => el.classList.remove("is-active"));
    const el = document.getElementById("p-" + priority);
    if (el) el.classList.add("is-active");

    const labels = { high: "Alta", medium: "Media", low: "Baja", all: "Todo 🔥" };
    const label = document.getElementById("selected-priority-label");
    if (label) label.textContent = labels[priority] || priority;
  }

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll(".tile--mode").forEach((el) => el.classList.remove("is-active"));
    const el = document.getElementById("m-" + mode);
    if (el) el.classList.add("is-active");

    const labels = { "2col": "2 Columnas", "3col": "3 Columnas", both: "Las Dos 🔥" };
    const label = document.getElementById("selected-mode-label");
    if (label) label.textContent = labels[mode] || mode;
  }

  setLimit(limit) {
    this.limit = Number(limit);
    document.querySelectorAll(".limit-btn").forEach((btn) => btn.classList.remove("is-active"));
    const active = document.querySelector('.limit-btn[data-limit="' + this.limit + '"]');
    if (active) active.classList.add("is-active");
  }

  /* ---------- NAVEGACIÓN ---------- */
  showView(viewId) {
    ["view-home", "view-study", "view-stats"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle("is-visible", id === viewId);
    });

    const navHome = document.getElementById("nav-home");
    const navStats = document.getElementById("nav-stats");
    if (navHome)  navHome.classList.toggle("is-active", viewId === "view-home");
    if (navStats) navStats.classList.toggle("is-active", viewId === "view-stats");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  goHome()    { this.showView("view-home"); this.updateStatsUI(); }
  showStats() { this.showView("view-stats"); this.updateStatsUI(); }

  confirmExit() {
    const answered = this.sessionScore.correct + this.sessionScore.incorrect;
    if (answered === 0 || window.confirm("¿Salir de la sesión actual?")) {
      this.goHome();
    }
  }

  /* ---------- SESIÓN ---------- */
  startSession() {
    console.log("[IRREGULARS] startSession pulsado");
    console.log("[IRREGULARS] ALL_EXERCISES:", typeof ALL_EXERCISES, ALL_EXERCISES ? ALL_EXERCISES.length : "null");

    if (typeof ALL_EXERCISES === "undefined" || !Array.isArray(ALL_EXERCISES)) {
      this.showToast("Error cargando ejercicios", "is-fail");
      return;
    }

    const pool = this.buildExercisePool();
    console.log("[IRREGULARS] pool después de filtrar:", pool.length, "prioridad:", this.priority, "modo:", this.mode);

    if (pool.length === 0) {
      this.showToast("Sin ejercicios para esta combinación", "is-fail");
      return;
    }

    const limited = this.limit > 0 ? pool.slice(0, this.limit) : pool;

    this.exercises    = limited;
    this.currentIndex = 0;
    this.sessionScore = { correct: 0, incorrect: 0 };
    this.isFlipped    = false;

    const card = document.getElementById("flashcard");
    if (card) card.classList.remove("is-flipped");

    this.showView("view-study");
    this.loadCurrentCard();
  }

  buildExercisePool() {
    const failures = this.stats.verbFailures || {};
    const self = this;

    let filtered = ALL_EXERCISES.filter(function (ex) {
      if (!self.matchesPriority(ex)) return false;
      if (!self.matchesMode(ex))     return false;
      return true;
    });

    filtered.sort(function (a, b) {
      const fA = failures[a.verb] || 0;
      const fB = failures[b.verb] || 0;
      if (fA !== fB) return fB - fA;
      return Math.random() - 0.5;
    });

    return filtered;
  }

  matchesPriority(ex) {
    const p = this.priority;
    if (p === "all")  return true;
    if (p === "low")  return ex.priority === "low" || ex.priority === "very-low";
    return ex.priority === p;
  }

  matchesMode(ex) {
    const m = this.mode;
    if (m === "both") return true;
    if (m === "2col") return ex.type === "past";
    if (m === "3col") return ex.type === "participle";
    return true;
  }

  /* ---------- TARJETA ---------- */
  loadCurrentCard() {
    if (this.currentIndex >= this.exercises.length) {
      this.finishSession();
      return;
    }

    const ex = this.exercises[this.currentIndex];
    this.currentExercise = ex;
    this.isFlipped = false;

    const card = document.getElementById("flashcard");
    if (card) card.classList.remove("is-flipped");

    const badge = document.getElementById("card-type-badge");
    if (badge) {
      if (ex.type === "past") {
        badge.textContent = "Pasado (2ª columna)";
        badge.classList.remove("is-participle");
      } else {
        badge.textContent = "Participio (3ª columna)";
        badge.classList.add("is-participle");
      }
    }

    const hint = document.getElementById("card-verb-hint");
    if (hint) hint.textContent = "verbo: " + ex.verb;

    const sent = document.getElementById("card-sentence");
    if (sent) sent.textContent = ex.sentence;

    const input = document.getElementById("answer-input");
    if (input) {
      input.value = "";
      input.disabled = false;
      setTimeout(function () { input.focus(); }, 80);
    }

    const total = this.exercises.length;
    const counter = document.getElementById("session-counter");
    if (counter) counter.textContent = (this.currentIndex + 1) + " / " + total;

    const bar = document.getElementById("session-progress-bar");
    if (bar) bar.style.width = ((this.currentIndex / total) * 100) + "%";
  }

  checkAnswer(event) {
    if (event) event.preventDefault();
    if (!this.currentExercise) return;

    const input = document.getElementById("answer-input");
    if (!input) return;

    const userVal = this.normalize(input.value);

    if (userVal.length === 0) {
      this.showToast("Escribe una respuesta", "is-neutral");
      input.focus();
      return;
    }

    this.stats.totalAttempted += 1;

    const pKey = this.currentExercise.priority;
    if (!this.stats.priorityStats[pKey]) {
      this.stats.priorityStats[pKey] = { correct: 0, total: 0 };
    }
    this.stats.priorityStats[pKey].total += 1;

    if (this.isCorrect(userVal, this.currentExercise)) {
      this.stats.totalCorrect += 1;
      this.stats.priorityStats[pKey].correct += 1;
      this.stats.streak += 1;
      if (this.stats.streak > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.streak;
      }
      this.sessionScore.correct += 1;
      this.saveStats();

      this.showToast("¡Correcto!", "is-ok");
      input.disabled = true;
      this.currentIndex += 1;
      const self = this;
      setTimeout(function () { self.loadCurrentCard(); }, 420);
      return;
    }

    this.stats.totalIncorrect += 1;
    this.stats.streak = 0;
    this.sessionScore.incorrect += 1;

    const verb = this.currentExercise.verb;
    this.stats.verbFailures[verb] = (this.stats.verbFailures[verb] || 0) + 1;
    this.saveStats();

    const info = IRREGULAR_VERBS[verb];
    const fb = document.getElementById("feedback-correct-word");
    if (fb) fb.textContent = "Respuesta: " + this.currentExercise.answer.toUpperCase();

    const t = document.getElementById("mini-verb-title");
    if (t) t.textContent = info.base.toUpperCase();

    const es = document.getElementById("mini-verb-es");
    if (es) es.textContent = info.es;

    const b = document.getElementById("mini-base");
    if (b) b.textContent = info.base;

    const p = document.getElementById("mini-past");
    if (p) p.textContent = info.past;

    const pa = document.getElementById("mini-part");
    if (pa) pa.textContent = info.participle;

    this.isFlipped = true;
    const card = document.getElementById("flashcard");
    if (card) card.classList.add("is-flipped");
  }

  nextCard() {
    if (!this.isFlipped) return;
    this.isFlipped = false;
    const card = document.getElementById("flashcard");
    if (card) card.classList.remove("is-flipped");

    const input = document.getElementById("answer-input");
    if (input) {
      input.value = "";
      input.disabled = false;
      setTimeout(function () { input.focus(); }, 120);
    }
  }

  finishSession() {
    const ok = this.sessionScore.correct;
    const fail = this.sessionScore.incorrect;
    this.showToast("Sesión completada · " + ok + " aciertos · " + fail + " fallos", "is-info", 3200);
    const bar = document.getElementById("session-progress-bar");
    if (bar) bar.style.width = "100%";
    const self = this;
    setTimeout(function () { self.goHome(); }, 900);
  }

  /* ---------- VALIDACIÓN ---------- */
  normalize(str) {
    return String(str || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  isCorrect(userVal, ex) {
    const candidates = [ex.answer].concat(ex.altAnswers || []);
    for (let i = 0; i < candidates.length; i++) {
      if (this.normalize(candidates[i]) === userVal) return true;
    }
    return false;
  }

  /* ---------- ESTADÍSTICAS ---------- */
  defaultStats() {
    return {
      totalAttempted: 0,
      totalCorrect:   0,
      totalIncorrect: 0,
      streak:         0,
      bestStreak:     0,
      verbFailures:   {},
      priorityStats: {
        high:       { correct: 0, total: 0 },
        medium:     { correct: 0, total: 0 },
        low:        { correct: 0, total: 0 },
        "very-low": { correct: 0, total: 0 }
      }
    };
  }

  loadStats() {
    try {
      const raw = localStorage.getItem("irregulars_stats_v1");
      if (!raw) return this.defaultStats();
      const parsed = JSON.parse(raw);
      const base = this.defaultStats();
      return {
        totalAttempted: parsed.totalAttempted || 0,
        totalCorrect:   parsed.totalCorrect   || 0,
        totalIncorrect: parsed.totalIncorrect || 0,
        streak:         parsed.streak         || 0,
        bestStreak:     parsed.bestStreak     || 0,
        verbFailures:   parsed.verbFailures   || {},
        priorityStats:  Object.assign({}, base.priorityStats, parsed.priorityStats || {})
      };
    } catch (e) {
      return this.defaultStats();
    }
  }

  saveStats() {
    try {
      localStorage.setItem("irregulars_stats_v1", JSON.stringify(this.stats));
    } catch (e) {}
  }

  updateStatsUI() {
    const s = this.stats;
    if (!s) return;

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set("stat-total", s.totalAttempted);
    const acc = s.totalAttempted > 0
      ? Math.round((s.totalCorrect / s.totalAttempted) * 100)
      : 0;
    set("stat-accuracy", acc + "%");
    set("stat-streak", s.streak);
    set("stat-best-streak", s.bestStreak);

    ["high", "medium", "low"].forEach((p) => {
      const data = s.priorityStats[p] || { correct: 0, total: 0 };
      const pct = data.total > 0
        ? Math.round((data.correct / data.total) * 100)
        : 0;
      const prog = document.getElementById("prog-" + p);
      const bar  = document.getElementById("bar-" + p);
      if (prog) prog.textContent = pct + "%";
      if (bar)  bar.style.width  = pct + "%";
    });
  }

  resetStats() {
    if (!window.confirm("¿Reiniciar todas las estadísticas?")) return;
    try { localStorage.removeItem("irregulars_stats_v1"); } catch (e) {}
    this.stats = this.defaultStats();
    this.updateStatsUI();
    this.showToast("Estadísticas reiniciadas", "is-neutral");
  }

  /* ---------- TOAST ---------- */
  showToast(message, variant, duration) {
    variant  = variant  || "is-ok";
    duration = duration || 2000;

    const toast   = document.getElementById("toast");
    const content = document.getElementById("toast-content");
    const msg     = document.getElementById("toast-msg");
    if (!toast || !content || !msg) return;

    content.classList.remove("is-ok", "is-fail", "is-info", "is-neutral");
    content.classList.add(variant);
    msg.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, duration);
  }

  /* ---------- PWA ---------- */
  installPWA() {
    const prompt = window.__deferredInstallPrompt;
    if (!prompt) return;
    prompt.prompt();
    prompt.userChoice.then((c) => {
      if (c && c.outcome === "accepted") this.showToast("App instalada", "is-info");
      window.__deferredInstallPrompt = null;
      const btn = document.getElementById("install-btn");
      if (btn) btn.hidden = true;
    }).catch(function () {});
  }
}

/* ---------- ARRANQUE ---------- */
const app = new IrregularsApp();

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  window.__deferredInstallPrompt = e;
  const btn = document.getElementById("install-btn");
  if (btn) btn.hidden = false;
});

function bootApp() {
  try {
    app.init();
  } catch (err) {
    console.error("[IRREGULARS] Error en init:", err);
    const splash = document.getElementById("splash-screen");
    if (splash) splash.remove();
  }
}

/* Espera SIEMPRE a DOMContentLoaded, sin excepciones */
if (document.readyState === "complete" || document.readyState === "interactive") {
  // El DOM ya está listo
  setTimeout(bootApp, 0);
} else {
  document.addEventListener("DOMContentLoaded", bootApp);
}