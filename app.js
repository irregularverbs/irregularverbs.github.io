/* ============================================================
   IRREGULARS — app.js
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
    this.bindStaticHandlers();
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

  bindStaticHandlers() {
    const bind = (id, handler) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", handler);
    };

    const brand = document.querySelector(".brand");
    if (brand) brand.addEventListener("click", () => this.goHome());

    bind("nav-home",  () => this.goHome());
    bind("nav-stats", () => this.showStats());
    bind("install-btn", () => this.installPWA());

    bind("p-high",   () => this.setPriority("high"));
    bind("p-medium", () => this.setPriority("medium"));
    bind("p-low",    () => this.setPriority("low"));
    bind("p-all",    () => this.setPriority("all"));

    bind("m-2col", () => this.setMode("2col"));
    bind("m-3col", () => this.setMode("3col"));
    bind("m-both", () => this.setMode("both"));

    document.querySelectorAll(".limit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setLimit(Number(btn.dataset.limit));
      });
    });

    bind("start-session-btn", () => this.startSession());

    const form = document.getElementById("answer-form");
    if (form) form.addEventListener("submit", (e) => this.checkAnswer(e));

    bind("next-card-btn", () => this.nextCard());
    bind("exit-session-btn", () => this.confirmExit());
    bind("reset-stats-btn", () => this.resetStats());
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
    if (this.$["selected-priority-label"]) {
      this.$["selected-priority-label"].textContent = labels[priority] || priority;
    }
  }

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll(".tile--mode").forEach((el) => el.classList.remove("is-active"));
    const el = document.getElementById("m-" + mode);
    if (el) el.classList.add("is-active");

    const labels = { "2col": "2 Columnas", "3col": "3 Columnas", both: "Las Dos 🔥" };
    if (this.$["selected-mode-label"]) {
      this.$["selected-mode-label"].textContent = labels[mode] || mode;
    }
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
      const el = this.$(id);
      if (!el) return;
      el.classList.toggle("is-visible", id === viewId);
    });

    if (this.$["nav-home"])  this.$["nav-home"].classList.toggle("is-active", viewId === "view-home");
    if (this.$["nav-stats"]) this.$["nav-stats"].classList.toggle("is-active", viewId === "view-stats");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  goHome()     { this.showView("view-home"); this.updateStatsUI(); }
  showStats()  { this.showView("view-stats"); this.updateStatsUI(); }

  confirmExit() {
    const answered = this.sessionScore.correct + this.sessionScore.incorrect;
    if (answered === 0 || window.confirm("¿Salir de la sesión actual?")) {
      this.goHome();
    }
  }

  /* ---------- SESIÓN ---------- */
  startSession() {
    if (typeof ALL_EXERCISES === "undefined" || !Array.isArray(ALL_EXERCISES)) {
      this.showToast("Error cargando ejercicios", "is-fail");
      console.error("[IRREGULARS] ALL_EXERCISES no está definido");
      return;
    }

    const pool = this.buildExercisePool();
    if (pool.length === 0) {
      this.showToast("Sin ejercicios para esta combinación", "is-fail");
      return;
    }

    const limited = this.limit > 0 ? pool.slice(0, this.limit) : pool;

    this.exercises    = limited;
    this.currentIndex = 0;
    this.sessionScore = { correct: 0, incorrect: 0 };
    this.isFlipped    = false;

    if (this.$["flashcard"]) this.$["flashcard"].classList.remove("is-flipped");

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

    if (this.$["flashcard"]) this.$["flashcard"].classList.remove("is-flipped");

    const badge = this.$["card-type-badge"];
    if (badge) {
      if (ex.type === "past") {
        badge.textContent = "Pasado (2ª columna)";
        badge.classList.remove("is-participle");
      } else {
        badge.textContent = "Participio (3ª columna)";
        badge.classList.add("is-participle");
      }
    }

    if (this.$["card-verb-hint"]) this.$["card-verb-hint"].textContent = "verbo: " + ex.verb;
    if (this.$["card-sentence"])  this.$["card-sentence"].textContent  = ex.sentence;

    const input = this.$["answer-input"];
    if (input) {
      input.value = "";
      input.disabled = false;
      setTimeout(function () { input.focus(); }, 80);
    }

    const total = this.exercises.length;
    if (this.$["session-counter"]) {
      this.$["session-counter"].textContent = (this.currentIndex + 1) + " / " + total;
    }
    if (this.$["session-progress-bar"]) {
      this.$["session-progress-bar"].style.width = ((this.currentIndex / total) * 100) + "%";
    }
  }

  checkAnswer(event) {
    if (event) event.preventDefault();
    if (!this.currentExercise) return;

    const input = this.$["answer-input"];
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

    /* Fallo */
    this.stats.totalIncorrect += 1;
    this.stats.streak = 0;
    this.sessionScore.incorrect += 1;

    const verb = this.currentExercise.verb;
    this.stats.verbFailures[verb] = (this.stats.verbFailures[verb] || 0) + 1;
    this.saveStats();

    const info = IRREGULAR_VERBS[verb];
    if (this.$["feedback-correct-word"]) {
      this.$["feedback-correct-word"].textContent =
        "Respuesta: " + this.currentExercise.answer.toUpperCase();
    }
    if (this.$["mini-verb-title"]) this.$["mini-verb-title"].textContent = info.base.toUpperCase();
    if (this.$["mini-verb-es"])    this.$["mini-verb-es"].textContent    = info.es;
    if (this.$["mini-base"])       this.$["mini-base"].textContent       = info.base;
    if (this.$["mini-past"])       this.$["mini-past"].textContent       = info.past;
    if (this.$["mini-part"])       this.$["mini-part"].textContent       = info.participle;

    this.isFlipped = true;
    if (this.$["flashcard"]) this.$["flashcard"].classList.add("is-flipped");
  }

  nextCard() {
    if (!this.isFlipped) return;
    this.isFlipped = false;
    if (this.$["flashcard"]) this.$["flashcard"].classList.remove("is-flipped");

    const input = this.$["answer-input"];
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
    if (this.$["session-progress-bar"]) {
      this.$["session-progress-bar"].style.width = "100%";
    }
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
      const el = this.$[id];
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
      const prog = this.$["prog-" + p];
      const bar  = this.$["bar-" + p];
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

    const toast   = this.$["toast"];
    const content = this.$["toast-content"];
    const msg     = this.$["toast-msg"];
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
      if (this.$["install-btn"]) this.$["install-btn"].hidden = true;
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  bootApp();
}