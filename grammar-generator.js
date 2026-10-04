/* ============================================================
   IRREGULARS — grammar-generator.js
   Motor de generación de ejercicios de gramática.
   ------------------------------------------------------------
   - Aleatorio real (Math.random)
   - Hueco incluye auxiliar en negativas/preguntas
   - ~20% de ejercicios con 2 huecos
   - Metadata completa para feedback detallado
   - Generación bajo demanda + caché externa
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     SUJETOS
     ---------------------------------------------------------- */
  var SUBJECTS = {
    first_singular:  ["I"],
    second_singular: ["You"],
    third_singular:  [
      "He", "She", "Tom", "Laura", "Anna", "Daniel", "Sophie", "James",
      "Mia", "My sister", "My brother", "My father", "My mother",
      "My best friend", "The teacher", "The doctor", "The manager",
      "The chef", "My neighbour", "The student"
    ],
    first_plural:    ["We"],
    second_plural:   ["You"],
    third_plural:    [
      "They", "My friends", "My parents", "The students", "The children",
      "My colleagues", "The team", "My cousins", "The players", "The workers",
      "My neighbours", "The teachers", "The customers", "My brothers",
      "The doctors", "The tourists", "The singers", "The engineers",
      "The athletes", "The drivers"
    ]
  };

  /* ----------------------------------------------------------
     UTILIDADES
     ---------------------------------------------------------- */
  function rnd(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function isThirdSingular(subj) {
    return SUBJECTS.third_singular.indexOf(subj) !== -1;
  }

  /* ----------------------------------------------------------
     FORMAS VERBALES
     ---------------------------------------------------------- */
  function thirdPerson(base) {
    if (/(s|sh|ch|x|o)$/.test(base))   return base + "es";
    if (/[^aeiou]y$/.test(base))       return base.slice(0, -1) + "ies";
    return base + "s";
  }

  function ingForm(base) {
    if (/ie$/.test(base))                     return base.slice(0, -2) + "ying";
    if (/e$/.test(base) && !/ee$/.test(base)) return base.slice(0, -1) + "ing";
    if (/[^aeiou][aeiou][^aeiouwxy]$/.test(base) && base.length <= 4) {
      return base + base.slice(-1) + "ing";
    }
    return base + "ing";
  }

  function pastRegular(base) {
    if (/e$/.test(base))               return base + "d";
    if (/[^aeiou]y$/.test(base))       return base.slice(0, -1) + "ied";
    if (/[^aeiou][aeiou][^aeiouwxy]$/.test(base) && base.length <= 4) {
      return base + base.slice(-1) + "ed";
    }
    return base + "ed";
  }

  function pastForm(verb) {
    var irr = (typeof IRREGULAR_VERBS !== "undefined" && IRREGULAR_VERBS[verb]);
    if (irr) return irr.past.split("/")[0];
    return pastRegular(verb);
  }

  function participleForm(verb) {
    var irr = (typeof IRREGULAR_VERBS !== "undefined" && IRREGULAR_VERBS[verb]);
    if (irr) return irr.participle;
    return pastRegular(verb);
  }

  function isIrregular(verb) {
    return (typeof IRREGULAR_VERBS !== "undefined" && !!IRREGULAR_VERBS[verb]);
  }

  function beFor(subj) {
    if (subj === "I")          return "am";
    if (isThirdSingular(subj)) return "is";
    return "are";
  }

  function wasWereFor(subj) {
    if (subj === "I" || isThirdSingular(subj)) return "was";
    return "were";
  }

  function haveHasFor(subj) {
    return isThirdSingular(subj) ? "has" : "have";
  }

  /* ----------------------------------------------------------
     CONJUGACIONES COMPLETAS (auxiliar + verbo)
     ---------------------------------------------------------- */

  /* Afirmativo */
  function aff(tense, verb, subj) {
    switch (tense) {
      case "presentSimple":     return isThirdSingular(subj) ? thirdPerson(verb) : verb;
      case "presentContinuous": return beFor(subj) + " " + ingForm(verb);
      case "pastSimple":        return pastForm(verb);
      case "pastContinuous":    return wasWereFor(subj) + " " + ingForm(verb);
      case "presentPerfect":    return haveHasFor(subj) + " " + participleForm(verb);
      case "pastPerfect":       return "had " + participleForm(verb);
      default:                  return verb;
    }
  }

  /* Negativo — devuelve el auxiliar + verbo */
  function neg(tense, verb, subj) {
    switch (tense) {
      case "presentSimple": {
        var aux = isThirdSingular(subj) ? "doesn't" : "don't";
        return { aux: aux, verb: verb, full: aux + " " + verb };
      }
      case "presentContinuous": {
        var be = beFor(subj);
        return { aux: be + " not", verb: ingForm(verb), full: be + " not " + ingForm(verb) };
      }
      case "pastSimple": {
        return { aux: "didn't", verb: verb, full: "didn't " + verb };
      }
      case "pastContinuous": {
        var be2 = wasWereFor(subj);
        return { aux: be2 + " not", verb: ingForm(verb), full: be2 + " not " + ingForm(verb) };
      }
      case "presentPerfect": {
        var has = haveHasFor(subj);
        return { aux: has + " not", verb: participleForm(verb), full: has + " not " + participleForm(verb) };
      }
      case "pastPerfect": {
        return { aux: "had not", verb: participleForm(verb), full: "had not " + participleForm(verb) };
      }
      default:
        return { aux: "not", verb: verb, full: "not " + verb };
    }
  }

  /* Pregunta — devuelve auxiliar + sujeto + verbo */
  function q(tense, verb, subj) {
    switch (tense) {
      case "presentSimple": {
        var aux = isThirdSingular(subj) ? "Does" : "Do";
        return { aux: aux, verb: verb, full: aux + " " + subj.toLowerCase() + " " + verb };
      }
      case "presentContinuous": {
        var be = cap(beFor(subj));
        return { aux: be, verb: ingForm(verb), full: be + " " + subj.toLowerCase() + " " + ingForm(verb) };
      }
      case "pastSimple": {
        return { aux: "Did", verb: verb, full: "Did " + subj.toLowerCase() + " " + verb };
      }
      case "pastContinuous": {
        var be2 = cap(wasWereFor(subj));
        return { aux: be2, verb: ingForm(verb), full: be2 + " " + subj.toLowerCase() + " " + ingForm(verb) };
      }
      case "presentPerfect": {
        var has = cap(haveHasFor(subj));
        return { aux: has, verb: participleForm(verb), full: has + " " + subj.toLowerCase() + " " + participleForm(verb) };
      }
      case "pastPerfect": {
        return { aux: "Had", verb: participleForm(verb), full: "Had " + subj.toLowerCase() + " " + participleForm(verb) };
      }
      default:
        return { aux: "", verb: verb, full: subj + " " + verb };
    }
  }

  /* ----------------------------------------------------------
     ETIQUETAS LEGIBLES
     ---------------------------------------------------------- */
  var TENSE_LABELS = {
    presentSimple:     "Present Simple",
    presentContinuous: "Present Continuous",
    pastSimple:        "Past Simple",
    pastContinuous:    "Past Continuous",
    presentPerfect:    "Present Perfect",
    pastPerfect:       "Past Perfect"
  };

  /* ----------------------------------------------------------
     CONSTRUIR UN EJERCICIO — TIEMPOS VERBALES
     ---------------------------------------------------------- */
  function buildTenseExercise(topic, level, tense, subj, verb, comp, time, wantTwoHoles) {
    var isNegative = level.template === "negative";
    var isQuestion = level.template === "question";

    if (wantTwoHoles && (tense === "presentContinuous" || tense === "pastContinuous")) {
      // Dos huecos: "She ___ (be) ___ (work) here."
      var be = tense === "presentContinuous" ? beFor(subj) : wasWereFor(subj);
      return {
        sentence: subj + " ___ (be) ___ (" + verb + ") " + comp + " " + time + ".",
        answer: be + " " + ingForm(verb),
        altAnswers: [be + " " + ingForm(verb)],
        tense: tense,
        tenseLabel: TENSE_LABELS[tense],
        verb: verb,
        verbBase: verb,
        verbPast: pastForm(verb),
        verbParticiple: participleForm(verb),
        verbIng: ingForm(verb),
        isIrregular: isIrregular(verb),
        isNegative: false,
        isQuestion: false,
        auxUsed: be,
        hasAuxiliary: true,
        twoHoles: true
      };
    }

    if (wantTwoHoles && tense === "presentPerfect") {
      // "She ___ (have) ___ (work) here."
      var has = haveHasFor(subj);
      return {
        sentence: subj + " ___ (have) ___ (" + verb + ") " + comp + " " + time + ".",
        answer: has + " " + participleForm(verb),
        altAnswers: [has + " " + participleForm(verb)],
        tense: tense,
        tenseLabel: TENSE_LABELS[tense],
        verb: verb,
        verbBase: verb,
        verbPast: pastForm(verb),
        verbParticiple: participleForm(verb),
        verbIng: ingForm(verb),
        isIrregular: isIrregular(verb),
        isNegative: false,
        isQuestion: false,
        auxUsed: has,
        hasAuxiliary: true,
        twoHoles: true
      };
    }

    if (isNegative) {
      var n = neg(tense, verb, subj);
      // En continuos y perfectos, el auxiliar ya va fuera del hueco
      var continuoOPerfecto = (
        tense === "presentContinuous" || tense === "pastContinuous" ||
        tense === "presentPerfect" || tense === "pastPerfect"
      );

      if (continuoOPerfecto) {
        // "She ___ (not / work) here." → hueco = "is not working" (completo)
        // O más sencillo: "She ___ (not / work) here." → respuesta "is not working"
        return {
          sentence: subj + " ___ (not / " + verb + ") " + comp + " " + time + ".",
          answer: n.full,
          altAnswers: [n.full, n.full.replace(" not ", "n't ")],
          tense: tense,
          tenseLabel: TENSE_LABELS[tense],
          verb: verb,
          verbBase: verb,
          verbPast: pastForm(verb),
          verbParticiple: participleForm(verb),
          verbIng: ingForm(verb),
          isIrregular: isIrregular(verb),
          isNegative: true,
          isQuestion: false,
          auxUsed: n.aux,
          hasAuxiliary: true,
          twoHoles: false
        };
      }

      // Simple y past simple: el auxiliar va DENTRO del hueco
      return {
        sentence: subj + " ___ (not / " + verb + ") " + comp + " " + time + ".",
        answer: n.full,
        altAnswers: [n.full, n.full.replace(" not ", "n't ")],
        tense: tense,
        tenseLabel: TENSE_LABELS[tense],
        verb: verb,
        verbBase: verb,
        verbPast: pastForm(verb),
        verbParticiple: participleForm(verb),
        verbIng: ingForm(verb),
        isIrregular: isIrregular(verb),
        isNegative: true,
        isQuestion: false,
        auxUsed: n.aux,
        hasAuxiliary: true,
        twoHoles: false
      };
    }

    if (isQuestion) {
      var qq = q(tense, verb, subj);
      var continuoOPerfectoQ = (
        tense === "presentContinuous" || tense === "pastContinuous" ||
        tense === "presentPerfect" || tense === "pastPerfect"
      );

      if (continuoOPerfectoQ) {
        // "___ she ___ (work) here?" → respuesta = "Is working"
        return {
          sentence: "___ " + subj.toLowerCase() + " ___ (" + verb + ") " + comp + " " + time + "?",
          answer: qq.aux + " " + qq.verb,
          altAnswers: [qq.aux + " " + qq.verb],
          tense: tense,
          tenseLabel: TENSE_LABELS[tense],
          verb: verb,
          verbBase: verb,
          verbPast: pastForm(verb),
          verbParticiple: participleForm(verb),
          verbIng: ingForm(verb),
          isIrregular: isIrregular(verb),
          isNegative: false,
          isQuestion: true,
          auxUsed: qq.aux,
          hasAuxiliary: true,
          twoHoles: false
        };
      }

      // Simple y past simple: hueco en auxiliar y en verbo
      return {
        sentence: "___ " + subj.toLowerCase() + " ___ (" + verb + ") " + comp + " " + time + "?",
        answer: qq.aux + " " + qq.verb,
        altAnswers: [qq.aux + " " + qq.verb, qq.aux.toLowerCase() + " " + qq.verb],
        tense: tense,
        tenseLabel: TENSE_LABELS[tense],
        verb: verb,
        verbBase: verb,
        verbPast: pastForm(verb),
        verbParticiple: participleForm(verb),
        verbIng: ingForm(verb),
        isIrregular: isIrregular(verb),
        isNegative: false,
        isQuestion: true,
        auxUsed: qq.aux,
        hasAuxiliary: true,
        twoHoles: false
      };
    }

    /* AFIRMATIVO (defecto) */
    var correct = aff(tense, verb, subj);
    var continuoOPerfectoA = (
      tense === "presentContinuous" || tense === "pastContinuous" ||
      tense === "presentPerfect" || tense === "pastPerfect"
    );

    if (continuoOPerfectoA) {
      // El auxiliar va fuera del hueco: "She is ___ (work) here."
      var auxOut = tense === "presentContinuous" ? beFor(subj)
                 : tense === "pastContinuous"    ? wasWereFor(subj)
                 : tense === "presentPerfect"    ? haveHasFor(subj)
                 : "had";
      var verbForm = (tense === "presentContinuous" || tense === "pastContinuous")
                     ? ingForm(verb)
                     : participleForm(verb);
      return {
        sentence: subj + " " + auxOut + " ___ (" + verb + ") " + comp + " " + time + ".",
        answer: verbForm,
        altAnswers: [verbForm],
        tense: tense,
        tenseLabel: TENSE_LABELS[tense],
        verb: verb,
        verbBase: verb,
        verbPast: pastForm(verb),
        verbParticiple: participleForm(verb),
        verbIng: ingForm(verb),
        isIrregular: isIrregular(verb),
        isNegative: false,
        isQuestion: false,
        auxUsed: auxOut,
        hasAuxiliary: false,
        twoHoles: false
      };
    }

    // Simple y past simple → respuesta = solo verbo
    return {
      sentence: subj + " ___ (" + verb + ") " + comp + " " + time + ".",
      answer: correct,
      altAnswers: [correct],
      tense: tense,
      tenseLabel: TENSE_LABELS[tense],
      verb: verb,
      verbBase: verb,
      verbPast: pastForm(verb),
      verbParticiple: participleForm(verb),
      verbIng: ingForm(verb),
      isIrregular: isIrregular(verb),
      isNegative: false,
      isQuestion: false,
      auxUsed: null,
      hasAuxiliary: false,
      twoHoles: false
    };
  }

  /* ----------------------------------------------------------
     CONSTRUIR UN EJERCICIO — CONDICIONALES
     ---------------------------------------------------------- */
  function buildConditionalExercise(topic, level, subj, verb, comp, template, wantTwoHoles) {
    var subjLow = subj.toLowerCase();

    switch (template) {

      case "cond0": {
        var partA = isThirdSingular(subj) ? thirdPerson(verb) : verb;
        var hole = Math.floor(Math.random() * 2);
        if (hole === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + "), " + comp + ".",
            answer: partA,
            altAnswers: [partA],
            tense: "cond0",
            tenseLabel: "Condicional 0",
            verb: verb,
            verbBase: verb,
            verbPast: pastForm(verb),
            verbParticiple: participleForm(verb),
            verbIng: ingForm(verb),
            isIrregular: isIrregular(verb),
            isNegative: false,
            isQuestion: false,
            hasAuxiliary: false,
            twoHoles: false
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA + ", it ___ (" + verb + ").",
          answer: partA,
          altAnswers: [partA],
          tense: "cond0",
          tenseLabel: "Condicional 0",
          verb: verb,
          verbBase: verb,
          verbPast: pastForm(verb),
          verbParticiple: participleForm(verb),
          verbIng: ingForm(verb),
          isIrregular: isIrregular(verb),
          isNegative: false,
          isQuestion: false,
          hasAuxiliary: false,
          twoHoles: false
        };
      }

      case "cond1": {
        var partA1 = isThirdSingular(subj) ? thirdPerson(verb) : verb;
        var hole1 = Math.floor(Math.random() * 2);
        if (hole1 === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + "), " + comp + ".",
            answer: partA1,
            altAnswers: [partA1],
            tense: "cond1",
            tenseLabel: "Condicional 1",
            verb: verb,
            verbBase: verb,
            verbPast: pastForm(verb),
            verbParticiple: participleForm(verb),
            verbIng: ingForm(verb),
            isIrregular: isIrregular(verb),
            isNegative: false,
            isQuestion: false,
            hasAuxiliary: false,
            twoHoles: false
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA1 + ", " + subjLow + " ___ (" + verb + ").",
          answer: "will " + verb,
          altAnswers: ["will " + verb],
          tense: "cond1",
          tenseLabel: "Condicional 1",
          verb: verb,
          verbBase: verb,
          verbPast: pastForm(verb),
          verbParticiple: participleForm(verb),
          verbIng: ingForm(verb),
          isIrregular: isIrregular(verb),
          isNegative: false,
          isQuestion: false,
          hasAuxiliary: true,
          twoHoles: false
        };
      }

      case "cond2": {
        var partA2 = pastForm(verb);
        var hole2 = Math.floor(Math.random() * 2);
        if (hole2 === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + ") something, " + comp + ".",
            answer: partA2,
            altAnswers: [partA2],
            tense: "cond2",
            tenseLabel: "Condicional 2",
            verb: verb,
            verbBase: verb,
            verbPast: pastForm(verb),
            verbParticiple: participleForm(verb),
            verbIng: ingForm(verb),
            isIrregular: isIrregular(verb),
            isNegative: false,
            isQuestion: false,
            hasAuxiliary: false,
            twoHoles: false
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA2 + " something, " + subjLow + " ___ (" + verb + ").",
          answer: "would " + verb,
          altAnswers: ["would " + verb],
          tense: "cond2",
          tenseLabel: "Condicional 2",
          verb: verb,
          verbBase: verb,
          verbPast: pastForm(verb),
          verbParticiple: participleForm(verb),
          verbIng: ingForm(verb),
          isIrregular: isIrregular(verb),
          isNegative: false,
          isQuestion: false,
          hasAuxiliary: true,
          twoHoles: false
        };
      }

      case "cond3": {
        var partA3 = "had " + participleForm(verb);
        var hole3 = Math.floor(Math.random() * 2);
        if (hole3 === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + ") something, " + comp + ".",
            answer: partA3,
            altAnswers: [partA3],
            tense: "cond3",
            tenseLabel: "Condicional 3",
            verb: verb,
            verbBase: verb,
            verbPast: pastForm(verb),
            verbParticiple: participleForm(verb),
            verbIng: ingForm(verb),
            isIrregular: isIrregular(verb),
            isNegative: false,
            isQuestion: false,
            hasAuxiliary: true,
            twoHoles: false
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA3 + " something, " + subjLow + " ___ (" + verb + ").",
          answer: "would have " + participleForm(verb),
          altAnswers: ["would have " + participleForm(verb)],
          tense: "cond3",
          tenseLabel: "Condicional 3",
          verb: verb,
          verbBase: verb,
          verbPast: pastForm(verb),
          verbParticiple: participleForm(verb),
          verbIng: ingForm(verb),
          isIrregular: isIrregular(verb),
          isNegative: false,
          isQuestion: false,
          hasAuxiliary: true,
          twoHoles: false
        };
      }

      default:
        return buildConditionalExercise(topic, level, subj, verb, comp, "cond0", false);
    }
  }

  /* ----------------------------------------------------------
     GENERADOR PRINCIPAL
     ---------------------------------------------------------- */
  var TARGET_PER_COMBO = 187;

  function generateForTopic(secKey, diffKey, levelNum, count) {
    count = count || TARGET_PER_COMBO;
    var topic = GRAMMAR_TOPICS[secKey][diffKey];
    var level = topic.levels[levelNum];
    var templates = topic.templates || {};
    var allSubjects = SUBJECTS.first_singular
      .concat(SUBJECTS.second_singular)
      .concat(SUBJECTS.third_singular)
      .concat(SUBJECTS.first_plural)
      .concat(SUBJECTS.third_plural);

    var isCond = /^cond/.test(level.tenses[0]);
    var out = [];
    var seen = {};
    var attempts = 0;
    var MAX_ATTEMPTS = count * 40;

    while (out.length < count && attempts < MAX_ATTEMPTS) {
      attempts++;
      var verb = rnd(topic.verbs);
      var compList = topic.complements[verb] || ["something"];
      var comp = rnd(compList);

      var exercise;
      var wantTwoHoles = Math.random() < 0.2;

      if (isCond) {
        var condSubj = rnd(SUBJECTS.third_singular);
        var condTemplate = level.tenses[0]; // cond0 / cond1 / cond2 / cond3
        // Para mixes, elegir aleatoriamente entre los tipos disponibles
        if (level.tenses.length > 1) {
          condTemplate = rnd(level.tenses);
        }
        exercise = buildConditionalExercise(topic, level, condSubj, verb, comp, condTemplate, wantTwoHoles);
      } else {
        var subj = rnd(allSubjects);
        var tense = rnd(level.tenses);

        // Elegir plantilla y rellenar
        var template = rnd(templates[tense] || ["{S} {V} {C} {T}."]);
        var timeArr = (topic.times && topic.times[tense]) ? topic.times[tense] : [""];
        var time = rnd(timeArr);

        exercise = buildTenseExercise(topic, level, tense, subj, verb, comp, time, wantTwoHoles);

        // Aplicar la plantilla al ejercicio (variación estructural)
        exercise.sentence = applyTemplate(template, {
          S: subj,
          V: exercise.answer,       // se sobreescribe abajo
          Ving: ingForm(verb),
          Vpp: participleForm(verb),
          AUX: exercise.auxUsed || "",
          C: comp,
          T: time
        }, exercise, subj, verb, comp, time, tense);
      }

      if (!exercise || !exercise.sentence || seen[exercise.sentence]) continue;
      seen[exercise.sentence] = true;

      exercise.id = secKey + "-" + diffKey + "-" + levelNum + "-" + out.length;
      exercise.section = secKey;
      exercise.difficulty = diffKey;
      exercise.level = levelNum;
      exercise.rules = topic.rules || [];
      exercise.badge = topic.badge || "";
      exercise.cefr = topic.cefr || "";

      out.push(exercise);
    }

    return out;
  }

  /* ----------------------------------------------------------
     APLICAR PLANTILLA ESTRUCTURAL
     ---------------------------------------------------------- */
  function applyTemplate(template, parts, exercise, subj, verb, comp, time, tense) {
    // Si es negativa o pregunta, la plantilla no aplica igual; usamos la frase por defecto
    if (exercise.isNegative || exercise.isQuestion) {
      return exercise.sentence;
    }

    // Sustituir placeholders manteniendo el hueco
    var sentence = template;

    // Marcar el hueco del verbo
    var hueco = "___ (" + verb + ")";

    // Reemplazar {S} con sujeto
    sentence = sentence.replace(/\{S\}/g, subj);

    // Reemplazar {AUX} con auxiliar si lo hay
    if (exercise.hasAuxiliary && exercise.auxUsed) {
      sentence = sentence.replace(/\{AUX\}/g, exercise.auxUsed);
    } else {
      sentence = sentence.replace(/\{AUX\}\s*/g, "");
    }

    // Reemplazar {C} con complemento
    sentence = sentence.replace(/\{C\}/g, comp);

    // Reemplazar {T} con tiempo (si está vacío, quitar el espacio)
    if (time) {
      sentence = sentence.replace(/\{T\}/g, time);
    } else {
      sentence = sentence.replace(/\s*\{T\}/g, "");
    }

    // Reemplazar {V}, {Ving}, {Vpp} con el hueco
    sentence = sentence.replace(/\{V(ing|pp)?\}/g, hueco);

    return sentence;
  }

  /* ----------------------------------------------------------
     EXPONER API
     ---------------------------------------------------------- */
  window.GRAMMAR_GENERATOR = {
    generateForTopic: generateForTopic,
    SUBJECTS: SUBJECTS,
    TENSE_LABELS: TENSE_LABELS
  };

  // Compatibilidad con el código existente
  window.GRAMMAR_EXERCISES = {}; // se llena bajo demanda

  console.log("[GRAMMAR] Generador listo (bajo demanda)");
})();