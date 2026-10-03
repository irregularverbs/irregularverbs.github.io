/* ============================================================
   IRREGULARS — grammar-generator.js
   FASE 1: genera ejercicios PLACEHOLDER para que la navegación
   funcione. FASE 2 rellenará con contenido real.
   ============================================================ */

(function () {
  "use strict";

  // Genera N ejercicios placeholder por combinación sección/dificultad/nivel
  function makePlaceholder(secKey, diffKey, level, count) {
    var out = [];
    var topicLabel = "";
    try {
      topicLabel = GRAMMAR_TOPICS[secKey][diffKey].label + " · Nivel " + level;
    } catch (e) {
      topicLabel = secKey + " / " + diffKey + " / " + level;
    }

    for (var i = 0; i < count; i++) {
      out.push({
        id: (secKey + "-" + diffKey + "-" + level + "-" + (i + 1)),
        section: secKey,
        difficulty: diffKey,
        level: level,
        type: "placeholder",
        verb: "—",
        sentence: "Ejercicio " + (i + 1) + " de " + topicLabel + " (contenido en Fase 2).",
        answer: "placeholder",
        altAnswers: ["placeholder"],
        es: "—",
        priority: "high",
        rules: ["Contenido real llegará en la Fase 2."]
      });
    }
    return out;
  }

  var EXERCISES = {};
  var PLACEHOLDER_COUNT = 5; // solo 5 para Fase 1

  Object.keys(GRAMMAR_TOPICS).forEach(function (secKey) {
    EXERCISES[secKey] = {};
    var sec = GRAMMAR_TOPICS[secKey];
    Object.keys(sec).forEach(function (diffKey) {
      if (diffKey === "label" || diffKey === "description" || diffKey === "icon") return;
      var diff = sec[diffKey];
      if (!diff || !diff.levels) return;

      EXERCISES[secKey][diffKey] = {};
      Object.keys(diff.levels).forEach(function (lvl) {
        EXERCISES[secKey][diffKey][lvl] = makePlaceholder(
          secKey, diffKey, Number(lvl), PLACEHOLDER_COUNT
        );
      });
    });
  });

  window.GRAMMAR_EXERCISES = EXERCISES;
  console.log("[GRAMMAR] Placeholders generados (Fase 1):",
    Object.keys(EXERCISES).length, "secciones");
})();