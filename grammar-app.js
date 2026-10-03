/* ============================================================
   IRREGULARS — grammar-app.js
   Motor de la página de gramática. Extiende IrregularsApp.
   ------------------------------------------------------------
   - Navegación: sección → dificultad → nivel
   - Panel de reglas dinámico
   - Override de buildExercisePool, loadCurrentCard, checkAnswer
   - Stats separadas de verbos (clave distinta en localStorage)
   ============================================================ */

class GrammarApp extends IrregularsApp {

  constructor() {
    super();
    this.section    = "tenses";
    this.difficulty = "easy";
    this.level      = 1;

    // Pool cacheado por combinación
    this.poolCache = {};
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  init() {
    // Antes de llamar al padre, forzamos la clave de stats de gramática
    this._statsKey = "irregulars_grammar_stats_v1";

    super.init();

    this.bindGrammarEvents();
    this.setSection("tenses");

    console.log("[GRAMMAR] GrammarApp iniciada");
  }

  /* ----------------------------------------------------------
     Sobrescribimos cacheDom para incluir IDs de grammar
     ---------------------------------------------------------- */
  cacheDom() {
    super.cacheDom();

    const extraIds = [
      "selected-difficulty-label", "selected-level-label",
      "difficulty-grid", "level-chips", "section-cards",
      "rules-title", "rules-cefr", "rules-desc", "rules-list",
      "prog-easy", "bar-easy",
      "prog-medium", "bar-medium",
      "prog-hard", "bar-hard",
      "prog-expert", "bar-expert"
    ];
    extraIds.forEach((id) => { this.$[id] = document.getElementById(id); });
  }

  /* ----------------------------------------------------------
     Delegación específica de grammar
     ---------------------------------------------------------- */
  bindGrammarEvents() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;

      // Sección
      if (t.classList.contains("section-card")) {
        this.setSection(t.dataset.section);
        return;
      }

      // Dificultad
      if (t.classList.contains("difficulty-tile")) {
        this.setDifficulty(t.dataset.diff);
        return;
      }

      // Nivel
      if (t.classList.contains("level-btn")) {
        this.setLevel(Number(t.dataset.level));
        return;
      }
    });
  }

  /* ----------------------------------------------------------
     SECCIÓN
     ---------------------------------------------------------- */
  setSection(section) {
    if (!GRAMMAR_TOPICS[section]) return;
    this.section = section;

    document.querySelectorAll(".section-card").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.section === section);
    });

    const diffs = this.getAvailableDifficulties();
    if (diffs.length) {
      this.setDifficulty(diffs[0]);
    }
  }

  getAvailableDifficulties() {
    const sec = GRAMMAR_TOPICS[this.section];
    if (!sec) return [];
    return Object.keys(sec).filter((k) =>
      k !== "label" && k !== "description" && k !== "icon" &&
      sec[k] && sec[k].levels
    );
  }

  /* ----------------------------------------------------------
     DIFICULTAD
     ---------------------------------------------------------- */
  setDifficulty(difficulty) {
    const sec = GRAMMAR_TOPICS[this.section];
    if (!sec || !sec[difficulty]) return;
    this.difficulty = difficulty;

    // Reset nivel si el actual no existe en esta dificultad
    const levels = sec[difficulty].levels;
    if (!levels[this.level]) {
      this.level = Number(Object.keys(levels)[0]);
    }

    this.renderDifficultyGrid();
    this.renderLevelChips();
    this.updateRulesPanel();

    const label = this.$["selected-difficulty-label"];
    if (label) label.textContent = sec[difficulty].label;

    const lvlLabel = this.$["selected-level-label"];
    if (lvlLabel) lvlLabel.textContent = "Nivel " + this.level;
  }

  renderDifficultyGrid() {
    const grid = this.$["difficulty-grid"];
    if (!grid) return;

    const sec = GRAMMAR_TOPICS[this.section];
    const diffs = this.getAvailableDifficulties();

    grid.innerHTML = diffs.map((key) => {
      const d = sec[key];
      const active = key === this.difficulty ? " is-active" : "";
      return (
        '<button type="button" class="difficulty-tile' + active + '" data-diff="' + key + '">' +
          '<span class="difficulty-tile__badge">' + (d.badge || d.label) + "</span>" +
          '<span class="difficulty-tile__title">' + d.label + "</span>" +
          '<span class="difficulty-tile__cefr">' + (d.cefr || "—") + "</span>" +
        "</button>"
      );
    }).join("");
  }

  /* ----------------------------------------------------------
     NIVEL
     ---------------------------------------------------------- */
  setLevel(level) {
    const sec = GRAMMAR_TOPICS[this.section];
    if (!sec || !sec[this.difficulty]) return;
    const levels = sec[this.difficulty].levels;
    if (!levels[level]) return;

    this.level = level;

    document.querySelectorAll(".level-btn").forEach((b) => {
      b.classList.toggle("is-active", Number(b.dataset.level) === level);
    });

    const label = this.$["selected-level-label"];
    if (label) label.textContent = "Nivel " + level;

    this.updateRulesPanel();
  }

  renderLevelChips() {
    const box = this.$["level-chips"];
    if (!box) return;

    const sec = GRAMMAR_TOPICS[this.section];
    const levels = sec[this.difficulty].levels;
    const keys = Object.keys(levels);

    box.innerHTML = keys.map((k) => {
      const active = Number(k) === this.level ? " is-active" : "";
      return (
        '<button type="button" class="chip level-btn' + active + '" data-level="' + k + '">' +
          "Nivel " + k +
        "</button>"
      );
    }).join("");
  }

  /* ----------------------------------------------------------
     PANEL DE REGLAS
     ---------------------------------------------------------- */
  updateRulesPanel() {
    const sec = GRAMMAR_TOPICS[this.section];
    if (!sec) return;
    const d = sec[this.difficulty];
    if (!d) return;
    const lvl = d.levels[this.level];
    if (!lvl) return;

    const title = this.$["rules-title"];
    const cefr  = this.$["rules-cefr"];
    const desc  = this.$["rules-desc"];
    const list  = this.$["rules-list"];

    if (title) title.textContent = sec.label + " · " + d.label;
    if (cefr)  cefr.textContent  = d.cefr || "—";
    if (desc)  desc.textContent  = d.description || "";

    if (list) {
      const rules = d.rules || [];
      let html = rules.map((r) => "<li>" + r + "</li>").join("");
      html += '<li><strong>Nivel ' + this.level + ":</strong> " + (lvl.label || "—") + "</li>";
      list.innerHTML = html;
    }
  }

  /* ----------------------------------------------------------
     MOTOR DE SESIÓN
     ---------------------------------------------------------- */
  buildExercisePool() {
    const cacheKey = this.section + "|" + this.difficulty + "|" + this.level;

    if (this.poolCache[cacheKey]) {
      return this.poolCache[cacheKey].slice();
    }

    const secData = (GRAMMAR_EXERCISES[this.section] || {})[this.difficulty] || {};
    const pool = secData[this.level] || [];

    this.poolCache[cacheKey] = pool;
    return pool.slice();
  }

  startSession() {
    const pool = this.buildExercisePool();
    if (pool.length === 0) {
      this.showToast("Sin ejercicios para esta combinación", "is-fail");
      return;
    }

    // Barajar el pool para que cada sesión sea distinta
    const shuffled = pool.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }

    const limited = this.limit > 0 ? shuffled.slice(0, this.limit) : shuffled;

    this.exercises    = limited;
    this.currentIndex = 0;
    this.sessionScore = { correct: 0, incorrect: 0 };
    this.isFlipped    = false;

    const card = document.getElementById("flashcard");
    if (card) card.classList.remove("is-flipped");

    this.showView("view-study");
    this.loadCurrentCard();
  }

  /* ----------------------------------------------------------
     CARGA DE TARJETA
     ---------------------------------------------------------- */
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

    // Badge de tipo
    const badge = document.getElementById("card-type-badge");
    if (badge) {
      const label = ex.tenseLabel || ex.badge || "Gramática";
      badge.textContent = label;
      badge.classList.toggle("is-participle", ex.type === "conditional");
    }

    // Hint superior (dificultad + nivel)
    const hint = document.getElementById("card-verb-hint");
    if (hint) hint.textContent = "Nivel " + this.level;

    // Frase
    const sent = document.getElementById("card-sentence");
    if (sent) sent.textContent = ex.sentence;

    // Input
    const input = document.getElementById("answer-input");
    if (input) {
      input.value = "";
      input.disabled = false;
      setTimeout(() => input.focus(), 80);
    }

    // Progreso
    const total = this.exercises.length;
    const counter = document.getElementById("session-counter");
    if (counter) counter.textContent = (this.currentIndex + 1) + " / " + total;

    const bar = document.getElementById("session-progress-bar");
    if (bar) bar.style.width = ((this.currentIndex / total) * 100) + "%";
  }

  /* ----------------------------------------------------------
     VALIDACIÓN
     ---------------------------------------------------------- */
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

    // Mapeamos dificultad a priorityStats (easy/medium/hard/expert)
    const pKey = this.difficulty;
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
      setTimeout(() => this.loadCurrentCard(), 420);
      return;
    }

    // FALLO
    this.stats.totalIncorrect += 1;
    this.stats.streak = 0;
    this.sessionScore.incorrect += 1;
    this.saveStats();

    const ex = this.currentExercise;
    const sec = GRAMMAR_TOPICS[this.section];
    const diff = sec[this.difficulty];

    // Respuesta correcta
    const fb = document.getElementById("feedback-correct-word");
    if (fb) fb.textContent = "Respuesta: " + (ex.answer || "").toUpperCase();

    // Título (nombre de la sección)
    const t = document.getElementById("mini-verb-title");
    if (t) t.textContent = (sec.label || "").toUpperCase();

    // Subtítulo (badge del tema)
    const es = document.getElementById("mini-verb-es");
    if (es) es.textContent = (diff.badge || diff.label || "");

    // Fila 1: Tiempo / etiqueta del tipo
    const b = document.getElementById("mini-base");
    if (b) b.textContent = ex.tenseLabel || "—";

    // Fila 2: Respuesta correcta
    const p = document.getElementById("mini-past");
    if (p) p.textContent = ex.answer || "—";

    // Fila 3: Primera regla del tema
    const pa = document.getElementById("mini-part");
    if (pa) {
      const rules = ex.rules || [];
      pa.textContent = rules.length ? rules[0] : "—";
    }

    this.isFlipped = true;
    const card = document.getElementById("flashcard");
    if (card) card.classList.add("is-flipped");
  }

  /* ----------------------------------------------------------
     STATS — clave separada de verbos
     ---------------------------------------------------------- */
  loadStats() {
    const KEY = "irregulars_grammar_stats_v1";
    try {
      const raw = localStorage.getItem(KEY);
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
      localStorage.setItem("irregulars_grammar_stats_v1", JSON.stringify(this.stats));
    } catch (e) {}
  }

  defaultStats() {
    return {
      totalAttempted: 0,
      totalCorrect:   0,
      totalIncorrect: 0,
      streak:         0,
      bestStreak:     0,
      verbFailures:   {},
      priorityStats: {
        easy:   { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard:   { correct: 0, total: 0 },
        expert: { correct: 0, total: 0 }
      }
    };
  }

  resetStats() {
    if (!window.confirm("¿Reiniciar todas las estadísticas de gramática?")) return;
    try { localStorage.removeItem("irregulars_grammar_stats_v1"); } catch (e) {}
    this.stats = this.defaultStats();
    this.updateStatsUI();
    this.showToast("Estadísticas reiniciadas", "is-neutral");
  }

  /* ----------------------------------------------------------
     STATS UI — adaptada a dificultades (no prioridades)
     ---------------------------------------------------------- */
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

    ["easy", "medium", "hard", "expert"].forEach((diff) => {
      const data = s.priorityStats[diff] || { correct: 0, total: 0 };
      const pct = data.total > 0
        ? Math.round((data.correct / data.total) * 100)
        : 0;
      const prog = document.getElementById("prog-" + diff);
      const bar  = document.getElementById("bar-" + diff);
      if (prog) prog.textContent = pct + "%";
      if (bar)  bar.style.width  = pct + "%";
    });
  }

  /* ----------------------------------------------------------
     NAVEGACIÓN — override para que "inicio" vuelva a config
     ---------------------------------------------------------- */
  goHome() {
    this.showView("view-home");
    this.updateStatsUI();
  }

  showStats() {
    this.showView("view-stats");
    this.updateStatsUI();
  }
}

/* ------------------------------------------------------------
   Instancia global
   ------------------------------------------------------------ */
window.__grammarApp = new GrammarApp();