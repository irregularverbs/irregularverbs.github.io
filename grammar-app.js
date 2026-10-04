/* ============================================================
   IRREGULARS — grammar-app.js
   Motor de grammar. Extiende IrregularsApp.
   ------------------------------------------------------------
   - Genera ejercicios bajo demanda
   - Cachea por combinación
   - Feedback detallado al fallar
   ============================================================ */

class GrammarApp extends IrregularsApp {

  constructor() {
    super();
    this.section    = "tenses";
    this.difficulty = "easy";
    this.level      = 1;
    this.includeAux = true;   // chip "Con auxiliares" por defecto
    this.poolCache  = {};
  }

  init() {
    this._statsKey = "irregulars_grammar_stats_v1";
    super.init();
    this.bindGrammarEvents();
    this.setSection("tenses");
    console.log("[GRAMMAR] GrammarApp iniciada");
  }

  cacheDom() {
    super.cacheDom();
    const extra = [
      "selected-difficulty-label", "selected-level-label",
      "difficulty-grid", "level-chips", "section-cards",
      "rules-title", "rules-cefr", "rules-desc", "rules-list",
      "aux-mode-btn",
      "prog-easy", "bar-easy",
      "prog-medium", "bar-medium",
      "prog-hard", "bar-hard",
      "prog-expert", "bar-expert",
      "feedback-your-answer", "feedback-explanation",
      "feedback-example", "feedback-time", "feedback-cefr", "feedback-level"
    ];
    extra.forEach((id) => { this.$[id] = document.getElementById(id); });
  }

  /* ----------------------------------------------------------
     EVENTOS
     ---------------------------------------------------------- */
  bindGrammarEvents() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;

      if (t.classList.contains("section-card")) {
        this.setSection(t.dataset.section);
        return;
      }
      if (t.classList.contains("difficulty-tile")) {
        this.setDifficulty(t.dataset.diff);
        return;
      }
      if (t.classList.contains("level-btn")) {
        this.setLevel(Number(t.dataset.level));
        return;
      }
      if (t.id === "aux-mode-btn") {
        this.toggleAuxMode();
        return;
      }
    });
  }

  toggleAuxMode() {
    this.includeAux = !this.includeAux;
    const btn = this.$["aux-mode-btn"];
    if (btn) {
      btn.textContent = this.includeAux ? "Con auxiliares" : "Solo verbo";
      btn.classList.toggle("is-active", this.includeAux);
    }
    this.poolCache = {}; // invalidar caché al cambiar de modo
    this.showToast(
      this.includeAux ? "Modo: Con auxiliares" : "Modo: Solo verbo",
      "is-info",
      1500
    );
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
    if (diffs.length) this.setDifficulty(diffs[0]);
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

    const levels = sec[difficulty].levels;
    if (!levels[this.level]) this.level = Number(Object.keys(levels)[0]);

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
     POOL — generación bajo demanda + caché
     ---------------------------------------------------------- */
  buildExercisePool() {
    const cacheKey = this.section + "|" + this.difficulty + "|" + this.level + "|" + this.includeAux;

    if (this.poolCache[cacheKey]) {
      return this.poolCache[cacheKey].slice();
    }

    if (!window.GRAMMAR_GENERATOR) {
      console.error("[GRAMMAR] GRAMMAR_GENERATOR no disponible");
      return [];
    }

    const pool = window.GRAMMAR_GENERATOR.generateForTopic(
      this.section, this.difficulty, this.level, 187
    );

    // Filtrar por modo auxiliares si está desactivado
    let filtered = pool;
    if (!this.includeAux) {
      filtered = pool.filter((ex) => !ex.hasAuxiliary);
      if (filtered.length < 50) filtered = pool; // fallback si hay muy pocos
    }

    this.poolCache[cacheKey] = filtered;
    console.log("[GRAMMAR] Generados " + pool.length + " ejercicios (" + filtered.length + " filtrados) para " + cacheKey);
    return filtered.slice();
  }

  /* ----------------------------------------------------------
     SESIÓN
     ---------------------------------------------------------- */
  startSession() {
    const pool = this.buildExercisePool();
    if (pool.length === 0) {
      this.showToast("Sin ejercicios para esta combinación", "is-fail");
      return;
    }

    const shuffled = pool.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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
     TARJETA — CARGA
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

    // Badge: sin pista del tiempo en nivel 3-4
    const badge = document.getElementById("card-type-badge");
    if (badge) {
      if (this.level <= 2 && ex.tenseLabel) {
        badge.textContent = ex.tenseLabel;
      } else {
        badge.textContent = "Gramática";
      }
    }

    const hint = document.getElementById("card-verb-hint");
    if (hint) hint.textContent = "Nivel " + this.level;

    const sent = document.getElementById("card-sentence");
    if (sent) sent.textContent = ex.sentence;

    const input = document.getElementById("answer-input");
    if (input) {
      input.value = "";
      input.disabled = false;
      setTimeout(() => input.focus(), 80);
    }

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

    /* FALLO */
    this.stats.totalIncorrect += 1;
    this.stats.streak = 0;
    this.sessionScore.incorrect += 1;
    this.saveStats();

    this.fillFeedback(input.value, this.currentExercise);

    this.isFlipped = true;
    const card = document.getElementById("flashcard");
    if (card) card.classList.add("is-flipped");
  }

  /* ----------------------------------------------------------
     FEEDBACK DETALLADO
     ---------------------------------------------------------- */
  fillFeedback(userAnswer, ex) {
    const fb = document.getElementById("feedback-correct-word");
    if (fb) fb.textContent = "Respuesta: " + (ex.answer || "").toUpperCase();

    // Tu respuesta
    const yours = document.getElementById("feedback-your-answer");
    if (yours) yours.textContent = "Tú escribiste: " + (userAnswer || "(vacío)");

    // Tiempo
    const timeEl = document.getElementById("feedback-time");
    if (timeEl) timeEl.textContent = ex.tenseLabel || "—";

    // CEFR
    const cefrEl = document.getElementById("feedback-cefr");
    if (cefrEl) cefrEl.textContent = ex.cefr || "—";

    // Nivel
    const lvlEl = document.getElementById("feedback-level");
    if (lvlEl) lvlEl.textContent = "Nivel " + (ex.level || "—");

    // Explicación del error
    const expl = document.getElementById("feedback-explanation");
    if (expl) {
      expl.textContent = this.buildErrorExplanation(userAnswer, ex);
    }

    // Ejemplo similar
    const example = document.getElementById("feedback-example");
    if (example) {
      example.textContent = this.buildExample(ex);
    }

    // Actualizar panel de reglas con las reglas del tema
    const list = this.$["rules-list"];
    if (list && ex.rules) {
      list.innerHTML = ex.rules.map((r) => "<li>" + r + "</li>").join("");
    }

    // Título y subtítulo
    const t = document.getElementById("mini-verb-title");
    if (t) t.textContent = (ex.verbBase || "").toUpperCase();
    const es = document.getElementById("mini-verb-es");
    if (es) es.textContent = ex.tenseLabel || "";

    // Mini-filas
    const b = document.getElementById("mini-base");
    if (b) b.textContent = ex.verbBase || "—";
    const p = document.getElementById("mini-past");
    if (p) p.textContent = ex.answer || "—";
    const pa = document.getElementById("mini-part");
    if (pa) pa.textContent = (ex.rules && ex.rules[0]) ? ex.rules[0] : "—";
  }

  buildErrorExplanation(userAnswer, ex) {
    const norm = (s) => this.normalize(s);
    const ua = norm(userAnswer);
    const correct = norm(ex.answer);

    // Comparaciones básicas
    if (ua === norm(ex.verbBase)) {
      return 'Escribiste el infinitivo "' + ex.verbBase + '". Necesitas la forma conjugada: "' + ex.answer + '".';
    }
    if (ua === norm(ex.verbPast) && norm(ex.answer) === norm(ex.verbParticiple)) {
      // coincide pasado y participio, no se puede discriminar
      return 'La respuesta correcta es "' + ex.answer + '". Revisa la forma verbal.';
    }
    if (ua === norm(ex.verbPast) && norm(ex.answer) !== norm(ex.verbPast)) {
      return 'Escribiste el pasado simple ("' + ex.verbPast + '"), pero aquí va otra forma: "' + ex.answer + '".';
    }
    if (ua === norm(ex.verbParticiple) && norm(ex.answer) !== norm(ex.verbParticiple)) {
      return 'Escribiste el participio ("' + ex.verbParticiple + '"), pero aquí va: "' + ex.answer + '".';
    }
    if (ua === norm(ex.verbIng) && norm(ex.answer) !== norm(ex.verbIng)) {
      return 'Escribiste la forma -ing ("' + ex.verbIng + '"), pero aquí va: "' + ex.answer + '".';
    }
    if (ua.indexOf(" ") === -1 && correct.indexOf(" ") !== -1) {
      return 'Falta el auxiliar. La respuesta completa es "' + ex.answer + '".';
    }
    if (ex.isNegative && ua.indexOf("not") === -1 && ua.indexOf("n't") === -1) {
      return 'Falta la negación. La respuesta correcta es "' + ex.answer + '".';
    }
    if (ex.isQuestion && ua.indexOf(norm(ex.auxUsed || "x")) === -1) {
      return 'Falta el auxiliar de pregunta ("' + (ex.auxUsed || "") + '"). Respuesta: "' + ex.answer + '".';
    }
    return 'La respuesta correcta es "' + ex.answer + '". Revisa la forma verbal y el auxiliar.';
  }

  buildExample(ex) {
    if (!ex.verbBase) return "";
    var v = ex.verbBase;
    var time = ex.tenseLabel || "";
    if (ex.isNegative) return "Ejemplo negativo: She doesn't " + v + " every day.";
    if (ex.isQuestion) return "Ejemplo: Does she " + v + " every day?";
    if (ex.hasAuxiliary) return "Ejemplo similar con el mismo tiempo.";
    return "Ejemplo: I " + (ex.answer || v) + " yesterday.";
  }

  /* ----------------------------------------------------------
     STATS — clave separada
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
      const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      const prog = document.getElementById("prog-" + diff);
      const bar  = document.getElementById("bar-" + diff);
      if (prog) prog.textContent = pct + "%";
      if (bar)  bar.style.width  = pct + "%";
    });
  }

  goHome() {
    this.showView("view-home");
    this.updateStatsUI();
  }

  showStats() {
    this.showView("view-stats");
    this.updateStatsUI();
  }
}

window.__grammarApp = new GrammarApp();