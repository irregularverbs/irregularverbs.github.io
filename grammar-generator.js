/* ============================================================
   IRREGULARS — grammar-generator.js
   Genera ejercicios de gramática desde GRAMMAR_TOPICS.
   ============================================================ */

(function () {
  "use strict";

  var SUBJECTS = {
    first_singular:   ["I"],
    second_singular:  ["You"],
    third_singular:   ["He", "She", "My sister", "My brother", "The teacher",
                       "Tom", "Laura", "My friend", "The manager", "Anna"],
    first_plural:     ["We"],
    second_plural:    ["You"],
    third_plural:     ["They", "My friends", "My parents", "The students",
                       "The children", "My colleagues", "The team"]
  };

  function pick(arr, seed) {
    return arr[((seed % arr.length) + arr.length) % arr.length];
  }

  function isThirdSingular(subj) {
    return SUBJECTS.third_singular.indexOf(subj) !== -1;
  }

  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function thirdPerson(base) {
    if (/(s|sh|ch|x|o)$/.test(base))   return base + "es";
    if (/[^aeiou]y$/.test(base))       return base.slice(0, -1) + "ies";
    return base + "s";
  }

  function ingForm(base) {
    if (/ie$/.test(base))                     return base.slice(0, -2) + "ying";
    if (/e$/.test(base) && !/ee$/.test(base)) return base.slice(0, -1) + "ing";
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

  function conjPresentSimple(verb, subj) {
    return isThirdSingular(subj) ? thirdPerson(verb) : verb;
  }

  function conjPresentContinuous(verb, subj) {
    return beFor(subj) + " " + ingForm(verb);
  }

  function conjPastSimple(verb, subj) {
    return pastForm(verb);
  }

  function conjPastContinuous(verb, subj) {
    return wasWereFor(subj) + " " + ingForm(verb);
  }

  function conjPresentPerfect(verb, subj) {
    return haveHasFor(subj) + " " + participleForm(verb);
  }

  function conjPastPerfect(verb, subj) {
    return "had " + participleForm(verb);
  }

  function conjByTense(tense, verb, subj) {
    switch (tense) {
      case "presentSimple":     return conjPresentSimple(verb, subj);
      case "presentContinuous": return conjPresentContinuous(verb, subj);
      case "pastSimple":        return conjPastSimple(verb, subj);
      case "pastContinuous":    return conjPastContinuous(verb, subj);
      case "presentPerfect":    return conjPresentPerfect(verb, subj);
      case "pastPerfect":       return conjPastPerfect(verb, subj);
      default:                  return verb;
    }
  }

  var TENSE_LABELS = {
    presentSimple:     "Present Simple",
    presentContinuous: "Present Continuous",
    pastSimple:        "Past Simple",
    pastContinuous:    "Past Continuous",
    presentPerfect:    "Present Perfect",
    pastPerfect:       "Past Perfect"
  };

  /* ---------- TIEMPOS VERBALES ---------- */
  function buildStandard(topic, level, tense, subj, verb, comp, time, seed) {
    var tpl = level.template;
    var timeStr = time ? " " + time : "";
    var subjLow = subj.toLowerCase();

    switch (tpl) {

      case "affirmative": {
        if (tense === "presentContinuous" || tense === "pastContinuous") {
          var aux = tense === "presentContinuous" ? beFor(subj) : wasWereFor(subj);
          return {
            sentence: subj + " " + aux + " ___ (" + verb + ") " + comp + timeStr + ".",
            answer: ingForm(verb),
            altAnswers: [ingForm(verb)]
          };
        }
        if (tense === "presentPerfect" || tense === "pastPerfect") {
          var aux2 = tense === "presentPerfect" ? haveHasFor(subj) : "had";
          return {
            sentence: subj + " " + aux2 + " ___ (" + verb + ") " + comp + timeStr + ".",
            answer: participleForm(verb),
            altAnswers: [participleForm(verb)]
          };
        }
        return {
          sentence: subj + " ___ (" + verb + ") " + comp + timeStr + ".",
          answer: conjByTense(tense, verb, subj),
          altAnswers: [conjByTense(tense, verb, subj)]
        };
      }

      case "negative": {
        if (tense === "presentContinuous" || tense === "pastContinuous") {
          var auxN = tense === "presentContinuous" ? (beFor(subj) + " not") : (wasWereFor(subj) + " not");
          return {
            sentence: subj + " " + auxN + " ___ (" + verb + ") " + comp + timeStr + ".",
            answer: ingForm(verb),
            altAnswers: [ingForm(verb)]
          };
        }
        if (tense === "presentPerfect" || tense === "pastPerfect") {
          var auxN2 = tense === "presentPerfect" ? (haveHasFor(subj) + " not") : "had not";
          return {
            sentence: subj + " " + auxN2 + " ___ (" + verb + ") " + comp + timeStr + ".",
            answer: participleForm(verb),
            altAnswers: [participleForm(verb)]
          };
        }
        var negAux = isThirdSingular(subj) ? "doesn't" : "don't";
        if (tense === "pastSimple") negAux = "didn't";
        return {
          sentence: subj + " " + negAux + " ___ (" + verb + ") " + comp + timeStr + ".",
          answer: verb,
          altAnswers: [verb]
        };
      }

      case "question": {
        if (tense === "presentContinuous" || tense === "pastContinuous") {
          var auxQ = tense === "presentContinuous" ? beFor(subj) : wasWereFor(subj);
          return {
            sentence: cap(auxQ) + " " + subjLow + " ___ (" + verb + ") " + comp + timeStr + "?",
            answer: ingForm(verb),
            altAnswers: [ingForm(verb)]
          };
        }
        if (tense === "presentPerfect" || tense === "pastPerfect") {
          var auxQ2 = tense === "presentPerfect" ? haveHasFor(subj) : "had";
          return {
            sentence: cap(auxQ2) + " " + subjLow + " ___ (" + verb + ") " + comp + timeStr + "?",
            answer: participleForm(verb),
            altAnswers: [participleForm(verb)]
          };
        }
        var qAux = isThirdSingular(subj) ? "Does" : "Do";
        if (tense === "pastSimple") qAux = "Did";
        return {
          sentence: qAux + " " + subjLow + " ___ (" + verb + ") " + comp + timeStr + "?",
          answer: verb,
          altAnswers: [verb]
        };
      }

      case "mixed": {
        var r = seed % 3;
        var tplMap = ["affirmative", "negative", "question"];
        return buildStandard(topic, { template: tplMap[r], tenses: level.tenses },
                             tense, subj, verb, comp, time, seed);
      }

      default:
        return {
          sentence: subj + " ___ (" + verb + ") " + comp + timeStr + ".",
          answer: verb,
          altAnswers: [verb]
        };
    }
  }

  /* ---------- CONDICIONALES ---------- */
  function buildConditional(topic, level, subj, verb, comp, template, seed) {
    var subjLow = subj.toLowerCase();
    var partA_present  = conjPresentSimple(verb, subj);
    var partA_past     = conjPastSimple(verb, subj);
    var partA_pastPerf = conjPastPerfect(verb, subj);
    var partB_wouldHave = "would have " + participleForm(verb);
    var hole = seed % 2;

    switch (template) {

      case "cond0": {
        if (hole === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + "), " + comp + ".",
            answer: partA_present,
            altAnswers: [partA_present]
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA_present + ", it ___ (" + verb + ").",
          answer: partA_present,
          altAnswers: [partA_present]
        };
      }

      case "cond0neg": {
        var negA = isThirdSingular(subj) ? "doesn't" : "don't";
        return {
          sentence: "If " + subjLow + " " + negA + " ___ (" + verb + "), " + comp + ".",
          answer: verb,
          altAnswers: [verb]
        };
      }

      case "cond0q": {
        return {
          sentence: "If " + subjLow + " ___ (" + verb + "), what happens?",
          answer: partA_present,
          altAnswers: [partA_present]
        };
      }

      case "cond0mix":
        return buildConditional(topic, level, subj, verb, comp,
                                seed % 2 === 0 ? "cond0" : "cond0neg", seed);

      case "cond1": {
        if (hole === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + "), " + comp + ".",
            answer: partA_present,
            altAnswers: [partA_present]
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA_present + ", " + subjLow + " ___ (" + verb + ") something.",
          answer: verb,
          altAnswers: [verb]
        };
      }

      case "cond1neg": {
        var negA1 = isThirdSingular(subj) ? "doesn't" : "don't";
        return {
          sentence: "If " + subjLow + " " + negA1 + " ___ (" + verb + "), " + comp + ".",
          answer: verb,
          altAnswers: [verb]
        };
      }

      case "cond1modal": {
        var modal = ["can", "may", "should"][seed % 3];
        return {
          sentence: "If " + subjLow + " " + partA_present + ", " + subjLow + " ___ (" + modal + ") " + verb + ".",
          answer: modal,
          altAnswers: [modal]
        };
      }

      case "condMix01":
        return buildConditional(topic, level, subj, verb, comp,
                                seed % 2 === 0 ? "cond0" : "cond1", seed);

      case "cond2": {
        if (hole === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + ") something, " + comp + ".",
            answer: partA_past,
            altAnswers: [partA_past]
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA_past + " something, " + subjLow + " ___ (" + verb + ").",
          answer: "would " + verb,
          altAnswers: ["would " + verb]
        };
      }

      case "cond2neg": {
        return {
          sentence: "If " + subjLow + " didn't ___ (" + verb + ") something, " + comp + ".",
          answer: verb,
          altAnswers: [verb]
        };
      }

      case "cond2modal": {
        var modal2 = ["could", "might"][seed % 2];
        return {
          sentence: "If " + subjLow + " " + partA_past + " something, " + subjLow + " ___ (" + modal2 + ") " + verb + ".",
          answer: modal2,
          altAnswers: [modal2]
        };
      }

      case "condMix12":
        return buildConditional(topic, level, subj, verb, comp,
                                seed % 2 === 0 ? "cond1" : "cond2", seed);

      case "cond3": {
        if (hole === 0) {
          return {
            sentence: "If " + subjLow + " ___ (" + verb + ") something, " + comp + ".",
            answer: partA_pastPerf,
            altAnswers: [partA_pastPerf]
          };
        }
        return {
          sentence: "If " + subjLow + " " + partA_pastPerf + " something, " + subjLow + " ___ (" + verb + ").",
          answer: partB_wouldHave,
          altAnswers: [partB_wouldHave]
        };
      }

      case "cond3neg": {
        return {
          sentence: "If " + subjLow + " hadn't ___ (" + verb + ") something, " + comp + ".",
          answer: participleForm(verb),
          altAnswers: [participleForm(verb)]
        };
      }

      case "cond3modal": {
        var modal3 = ["could have", "might have"][seed % 2];
        return {
          sentence: "If " + subjLow + " " + partA_pastPerf + " something, " + subjLow + " ___ (" + modal3 + ") helped.",
          answer: modal3,
          altAnswers: [modal3]
        };
      }

      case "condMix23":
        return buildConditional(topic, level, subj, verb, comp,
                                seed % 2 === 0 ? "cond2" : "cond3", seed);

      default:
        return {
          sentence: "If " + subjLow + " ___ (" + verb + ") something, " + comp + ".",
          answer: partA_present,
          altAnswers: [partA_present]
        };
    }
  }

  function isConditionalLevel(level) {
    return level.tenses && level.tenses[0] && /^cond/.test(level.tenses[0]);
  }

  /* ---------- GENERADOR ---------- */
  function generateForTopic(secKey, diffKey, levelNum, targetCount) {
    var topic = GRAMMAR_TOPICS[secKey][diffKey];
    var level = topic.levels[levelNum];
    var out = [];
    var seen = {};
    var attempts = 0;
    var MAX_ATTEMPTS = targetCount * 50;

    var allSubjects = SUBJECTS.first_singular
      .concat(SUBJECTS.second_singular)
      .concat(SUBJECTS.third_singular)
      .concat(SUBJECTS.first_plural)
      .concat(SUBJECTS.third_plural);

    var isCond = isConditionalLevel(level);

    while (out.length < targetCount && attempts < MAX_ATTEMPTS) {
      attempts++;
      var seed = attempts * 11 + levelNum * 17 + secKey.length + diffKey.length;

      var verb = pick(topic.verbs, seed);
      var compList = topic.complements[verb] || ["something"];
      var comp = pick(compList, seed * 3);

      var exercise;

      if (isCond) {
        var condSubj = pick(SUBJECTS.third_singular, seed * 7);
        exercise = buildConditional(topic, level, condSubj, verb, comp, level.template, seed);
      } else {
        var subj = pick(allSubjects, seed * 5);
        var tense = pick(level.tenses, seed * 11);
        var timesArr = (topic.times && topic.times[tense]) ? topic.times[tense] : [""];
        var time = pick(timesArr, seed * 13);
        exercise = buildStandard(topic, level, tense, subj, verb, comp, time, seed);
        exercise.tense = tense;
        exercise.tenseLabel = TENSE_LABELS[tense] || tense;
      }

      if (seen[exercise.sentence]) continue;
      seen[exercise.sentence] = true;

      out.push({
        id: secKey + "-" + diffKey + "-" + levelNum + "-" + out.length,
        section: secKey,
        difficulty: diffKey,
        level: levelNum,
        type: isCond ? "conditional" : (exercise.tense || "mixed"),
        tenseLabel: exercise.tenseLabel || (isCond ? topic.badge : "—"),
        sentence: exercise.sentence,
        answer: exercise.answer,
        altAnswers: exercise.altAnswers || [exercise.answer],
        rules: topic.rules || [],
        badge: topic.badge || ""
      });
    }

    return out;
  }

  /* ---------- GENERAR TODO ---------- */
  var EXERCISES = {};
  var TARGET = 100;

  Object.keys(GRAMMAR_TOPICS).forEach(function (secKey) {
    EXERCISES[secKey] = {};
    var sec = GRAMMAR_TOPICS[secKey];

    Object.keys(sec).forEach(function (diffKey) {
      if (diffKey === "label" || diffKey === "description" || diffKey === "icon") return;
      var diff = sec[diffKey];
      if (!diff || !diff.levels) return;

      EXERCISES[secKey][diffKey] = {};

      Object.keys(diff.levels).forEach(function (lvl) {
        var list = generateForTopic(secKey, diffKey, Number(lvl), TARGET);
        EXERCISES[secKey][diffKey][lvl] = list;
      });
    });
  });

  window.GRAMMAR_EXERCISES = EXERCISES;

  var total = 0;
  Object.keys(EXERCISES).forEach(function (sec) {
    Object.keys(EXERCISES[sec]).forEach(function (diff) {
      Object.keys(EXERCISES[sec][diff]).forEach(function (lvl) {
        total += EXERCISES[sec][diff][lvl].length;
      });
    });
  });
  console.log("[GRAMMAR] Ejercicios generados:", total);
})();