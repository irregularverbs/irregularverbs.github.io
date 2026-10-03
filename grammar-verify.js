/* ============================================================
   IRREGULARS — grammar-verify.js
   Verificación previa al arranque de grammar.html
   ------------------------------------------------------------
   Nivel A: ¿existen los objetos globales?
   Nivel B: ¿tienen la forma esperada?
   Nivel C: ¿cada ejercicio tiene sentence/answer? (?debug=1)
   ============================================================ */

(function () {
  "use strict";

  var DEBUG = /[?&]debug=1/.test(window.location.search);

  var EXPECTED_SECTIONS    = ["tenses", "conditionals"];
  var EXPECTED_DIFFICULTIES = {
    tenses:       ["easy", "medium", "hard", "expert"],
    conditionals: ["easy", "medium", "hard", "expert"]
  };
  var EXPECTED_LEVELS = [1, 2, 3, 4];

  /* ----------------------------------------------------------
     Pantalla de error (reemplaza al splash)
     ---------------------------------------------------------- */
  function fail(errors) {
    var splash = document.getElementById("splash-screen");
    if (splash) splash.remove();

    var box = document.createElement("div");
    box.className = "verify-error";
    box.innerHTML =
      '<div class="verify-error__inner">' +
        '<div class="verify-error__badge">ERROR DE CARGA</div>' +
        '<h2 class="verify-error__title">No se pudo iniciar la app</h2>' +
        '<p class="verify-error__text">Faltan archivos o datos críticos:</p>' +
        '<ul class="verify-error__list">' +
          errors.map(function (e) { return "<li>" + e + "</li>"; }).join("") +
        "</ul>" +
        '<button class="btn btn--primary" onclick="location.reload()">Reintentar</button>' +
      "</div>";
    document.body.appendChild(box);
  }

  /* ----------------------------------------------------------
     Nivel A — Objetos globales
     ---------------------------------------------------------- */
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
    if (typeof window.__grammarApp === "undefined") {
      errors.push("Falta __grammarApp (grammar-app.js no cargó)");
    }

    return errors;
  }

  /* ----------------------------------------------------------
     Nivel B — Forma esperada
     ---------------------------------------------------------- */
  function checkB() {
    var errors = [];
    var warnings = [];

    if (typeof GRAMMAR_TOPICS === "undefined") return { errors: errors, warnings: warnings };

    EXPECTED_SECTIONS.forEach(function (secKey) {
      if (!GRAMMAR_TOPICS[secKey]) {
        errors.push("Falta la sección '" + secKey + "' en GRAMMAR_TOPICS");
        return;
      }
      (EXPECTED_DIFFICULTIES[secKey] || []).forEach(function (diffKey) {
        if (!GRAMMAR_TOPICS[secKey][diffKey]) {
          errors.push("Falta la dificultad '" + secKey + "." + diffKey + "'");
          return;
        }
        EXPECTED_LEVELS.forEach(function (lvl) {
          var lvls = GRAMMAR_TOPICS[secKey][diffKey].levels;
          if (!lvls || !lvls[lvl]) {
            warnings.push("Falta nivel " + lvl + " en " + secKey + "." + diffKey);
          }
        });
      });
    });

    // Comprobar que GRAMMAR_EXERCISES tiene contenido real
    if (typeof GRAMMAR_EXERCISES !== "undefined") {
      EXPECTED_SECTIONS.forEach(function (secKey) {
        if (!GRAMMAR_EXERCISES[secKey]) {
          errors.push("GRAMMAR_EXERCISES no tiene la sección '" + secKey + "'");
        }
      });
    }

    return { errors: errors, warnings: warnings };
  }

  /* ----------------------------------------------------------
     Nivel C — Integridad de ejercicios (solo debug)
     ---------------------------------------------------------- */
  function checkC() {
    var errors = [];

    if (typeof GRAMMAR_EXERCISES === "undefined") return errors;

    Object.keys(GRAMMAR_EXERCISES).forEach(function (secKey) {
      Object.keys(GRAMMAR_EXERCISES[secKey] || {}).forEach(function (diffKey) {
        Object.keys(GRAMMAR_EXERCISES[secKey][diffKey] || {}).forEach(function (lvl) {
          var list = GRAMMAR_EXERCISES[secKey][diffKey][lvl];

          if (!Array.isArray(list)) {
            errors.push("GRAMMAR_EXERCISES." + secKey + "." + diffKey + "." + lvl + " no es array");
            return;
          }
          if (list.length === 0) {
            errors.push("GRAMMAR_EXERCISES." + secKey + "." + diffKey + "." + lvl + " está vacío");
            return;
          }

          list.forEach(function (ex, i) {
            var prefix = secKey + "." + diffKey + "." + lvl + "[" + i + "]";
            if (!ex.sentence) errors.push(prefix + " sin sentence");
            if (!ex.answer)   errors.push(prefix + " sin answer");
            if (!ex.altAnswers || !ex.altAnswers.length) {
              errors.push(prefix + " sin altAnswers");
            }
            if (ex.sentence && ex.sentence.indexOf("___") === -1) {
              errors.push(prefix + " sin hueco '___' en la frase");
            }
          });
        });
      });
    });

    return errors;
  }

  /* ----------------------------------------------------------
     Verificación pública
     ---------------------------------------------------------- */
  window.__grammarVerify = function () {
    var errorsA = checkA();
    if (errorsA.length) { fail(errorsA); return false; }

    var b = checkB();
    if (b.warnings.length) {
      b.warnings.forEach(function (w) { console.warn("[GRAMMAR-VERIFY]", w); });
    }
    if (b.errors.length) { fail(b.errors); return false; }

    if (DEBUG) {
      var errorsC = checkC();
      if (errorsC.length) { fail(errorsC); return false; }
      console.log("[GRAMMAR-VERIFY] Modo debug: integridad OK");
    }

    console.log("[GRAMMAR-VERIFY] Verificación OK" + (DEBUG ? " (A+B+C)" : " (A+B)"));
    return true;
  };
})();