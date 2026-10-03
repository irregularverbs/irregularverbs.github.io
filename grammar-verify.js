/* ============================================================
   IRREGULARS — grammar-verify.js
   Verificación de integridad antes de arrancar grammar.html
   ------------------------------------------------------------
   Niveles:
     A) Carga       → ¿existen los objetos globales?
     B) Contenido   → ¿tienen la forma esperada?
     C) Integridad  → ¿cada ejercicio tiene sentence/answer? (solo con ?debug=1)
   ============================================================ */

(function () {
  "use strict";

  var DEBUG = /[?&]debug=1/.test(window.location.search);

  var EXPECTED_SECTIONS = ["tenses", "conditionals", "mastery"];
  var EXPECTED_LEVELS   = [1, 2, 3, 4];

  // Dificultades esperadas por sección
  var EXPECTED_DIFFICULTIES = {
    tenses:       ["easy", "medium", "hard", "expert", "mastery"],
    conditionals: ["easy", "medium", "hard", "expert", "mastery"],
    mastery:      ["global"]
  };

  function fail(errors) {
    // Pantalla de error en lugar del splash
    var splash = document.getElementById("splash-screen");
    if (splash) splash.remove();

    var main = document.querySelector(".app-main") || document.body;
    var box = document.createElement("div");
    box.className = "verify-error";
    box.innerHTML =
      '<div class="verify-error__inner">' +
        '<div class="verify-error__badge">ERROR DE CARGA</div>' +
        '<h2 class="verify-error__title">No se pudo iniciar la app</h2>' +
        '<p class="verify-error__text">Faltan archivos o datos críticos. Detalle:</p>' +
        '<ul class="verify-error__list">' +
          errors.map(function (e) { return "<li>" + e + "</li>"; }).join("") +
        "</ul>" +
        '<button class="btn btn--primary" onclick="location.reload()">Reintentar</button>' +
      "</div>";
    main.parentNode.insertBefore(box, main);
  }

  function warn(msg) {
    console.warn("[GRAMMAR-VERIFY]", msg);
    if (typeof window !== "undefined" && window.__grammarWarnings) {
      window.__grammarWarnings.push(msg);
    }
  }

  function checkA() {
    var errors = [];
    if (typeof GRAMMAR_TOPICS === "undefined" || !GRAMMAR_TOPICS) {
      errors.push("Falta GRAMMAR_TOPICS (data-grammar.js no cargó)");
    }
    if (typeof GRAMMAR_EXERCISES === "undefined" || !GRAMMAR_EXERCISES) {
      errors.push("Falta GRAMMAR_EXERCISES (grammar-generator.js no cargó)");
    }
    if (typeof IrregularsApp === "undefined") {
      errors.push("Falta IrregularsApp (app.js no cargó)");
    }
    return errors;
  }

  function checkB() {
    var errors = [];
    var warnings = [];

    if (typeof GRAMMAR_TOPICS === "undefined") return { errors: errors, warnings: warnings };

    // Secciones esperadas
    EXPECTED_SECTIONS.forEach(function (sec) {
      if (!GRAMMAR_TOPICS[sec]) {
        errors.push("Falta la sección '" + sec + "' en GRAMMAR_TOPICS");
        return;
      }
      // Dificultades esperadas
      (EXPECTED_DIFFICULTIES[sec] || []).forEach(function (diff) {
        if (!GRAMMAR_TOPICS[sec][diff]) {
          errors.push("Falta la dificultad '" + sec + "." + diff + "'");
          return;
        }
        // Niveles
        EXPECTED_LEVELS.forEach(function (lvl) {
          if (sec === "mastery" && diff === "global") {
            // Maestría global: solo un bloque, sin niveles anidados obligatorios
            return;
          }
          if (!GRAMMAR_TOPICS[sec][diff].levels || !GRAMMAR_TOPICS[sec][diff].levels[lvl]) {
            warnings.push("Falta nivel " + lvl + " en " + sec + "." + diff + " (se usará placeholder)");
          }
        });
      });
    });

    return { errors: errors, warnings: warnings };
  }

  function checkC() {
    var errors = [];
    if (typeof GRAMMAR_EXERCISES === "undefined") return errors;

    Object.keys(GRAMMAR_EXERCISES).forEach(function (sec) {
      Object.keys(GRAMMAR_EXERCISES[sec] || {}).forEach(function (diff) {
        Object.keys(GRAMMAR_EXERCISES[sec][diff] || {}).forEach(function (lvl) {
          var list = GRAMMAR_EXERCISES[sec][diff][lvl];
          if (!Array.isArray(list)) {
            errors.push("GRAMMAR_EXERCISES." + sec + "." + diff + "." + lvl + " no es array");
            return;
          }
          list.forEach(function (ex, i) {
            if (!ex.sentence) errors.push(sec + "." + diff + "." + lvl + "[" + i + "] sin sentence");
            if (!ex.answer)   errors.push(sec + "." + diff + "." + lvl + "[" + i + "] sin answer");
          });
        });
      });
    });

    return errors;
  }

  window.__grammarVerify = function () {
    window.__grammarWarnings = [];

    var errorsA = checkA();
    if (errorsA.length) { fail(errorsA); return false; }

    var b = checkB();
    b.warnings.forEach(warn);
    if (b.errors.length) { fail(b.errors); return false; }

    if (DEBUG) {
      var errorsC = checkC();
      if (errorsC.length) { fail(errorsC); return false; }
      console.log("[GRAMMAR-VERIFY] Modo debug: integridad OK");
    }

    if (window.__grammarWarnings.length) {
      console.warn("[GRAMMAR-VERIFY] Advertencias:", window.__grammarWarnings);
    }

    console.log("[GRAMMAR-VERIFY] Verificación A+B " + (DEBUG ? "+C " : "") + "correcta");
    return true;
  };
})();