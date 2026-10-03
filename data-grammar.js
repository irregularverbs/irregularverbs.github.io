/* ============================================================
   IRREGULARS — data-grammar.js
   Estructura de gramática (FASE 1: solo esqueleto, sin frases)
   ------------------------------------------------------------
   FASE 2 rellenará los `template`, `verbs`, `complements`, etc.
   ============================================================ */

const GRAMMAR_TOPICS = {

  /* ==========================================================
     SECCIÓN 1: TIEMPOS VERBALES
     ========================================================== */
  tenses: {
    label: "Tiempos Verbales",
    description: "Present, Past, Perfect y sus contrastes. De A2 a B1+.",
    icon: "📘",

    easy: {
      label: "Fácil",
      cefr: "A2",
      badge: "Present",
      description: "Present Simple y Present Continuous.",
      topics: ["presentSimple", "presentContinuous"],
      levels: {
        1: { label: "Afirmativas básicas" },
        2: { label: "Negativas" },
        3: { label: "Preguntas" },
        4: { label: "Contraste Present S/C" }
      }
    },

    medium: {
      label: "Medio",
      cefr: "A2+",
      badge: "Past",
      description: "Past Simple y Past Continuous.",
      topics: ["pastSimple", "pastContinuous"],
      levels: {
        1: { label: "Afirmativas básicas" },
        2: { label: "Negativas" },
        3: { label: "Preguntas" },
        4: { label: "Contraste Past S/C" }
      }
    },

    hard: {
      label: "Difícil",
      cefr: "B1",
      badge: "Present Perfect",
      description: "Present Perfect y contraste con Past Simple.",
      topics: ["presentPerfect", "pastVsPresentPerfect"],
      levels: {
        1: { label: "Present Perfect afirmativo" },
        2: { label: "for / since / ever / never" },
        3: { label: "Preguntas y negativas" },
        4: { label: "Contraste con Past Simple" }
      }
    },

    expert: {
      label: "Experto",
      cefr: "B1+",
      badge: "Past Perfect",
      description: "Past Perfect y contraste de los 4 tiempos.",
      topics: ["pastPerfect", "allTensesMix"],
      levels: {
        1: { label: "Past Perfect afirmativo" },
        2: { label: "before / after / already" },
        3: { label: "Narración compleja" },
        4: { label: "Mix de los 4 tiempos" }
      }
    },

    mastery: {
      label: "Maestría",
      cefr: "B1+",
      badge: "Todos los tiempos",
      description: "Examen final de tiempos verbales.",
      topics: ["allTensesMix"],
      levels: {
        1: { label: "Fácil mezclado" },
        2: { label: "Medio mezclado" },
        3: { label: "Difícil mezclado" },
        4: { label: "Experto mezclado" }
      }
    }
  },

  /* ==========================================================
     SECCIÓN 2: CONDICIONALES
     ========================================================== */
  conditionals: {
    label: "Condicionales",
    description: "Del tipo 0 al tipo 3. De A2+ a B1+.",
    icon: "🔀",

    easy: {
      label: "Fácil",
      cefr: "A2+",
      badge: "Condicional 0",
      description: "Verdades generales: If you heat water, it boils.",
      topics: ["cond0"],
      levels: {
        1: { label: "Estructura básica" },
        2: { label: "Negativas" },
        3: { label: "Preguntas" },
        4: { label: "Mix cond 0" }
      }
    },

    medium: {
      label: "Medio",
      cefr: "B1",
      badge: "Condicional 1",
      description: "Futuro real: If it rains, I will stay home.",
      topics: ["cond1"],
      levels: {
        1: { label: "If + presente, will + inf" },
        2: { label: "Negativas" },
        3: { label: "Variaciones (can, may, should)" },
        4: { label: "Mix cond 0 + 1" }
      }
    },

    hard: {
      label: "Difícil",
      cefr: "B1",
      badge: "Condicional 2",
      description: "Hipotético presente: If I had money, I would travel.",
      topics: ["cond2"],
      levels: {
        1: { label: "If + past simple, would + inf" },
        2: { label: "Negativas" },
        3: { label: "Could / might" },
        4: { label: "Mix cond 1 + 2" }
      }
    },

    expert: {
      label: "Experto",
      cefr: "B1+",
      badge: "Condicional 3",
      description: "Hipotético pasado: If I had known, I would have gone.",
      topics: ["cond3"],
      levels: {
        1: { label: "If + past perfect, would have + pp" },
        2: { label: "Negativas" },
        3: { label: "Could have / might have" },
        4: { label: "Mix cond 2 + 3" }
      }
    },

    mastery: {
      label: "Maestría",
      cefr: "B1+",
      badge: "Todos los condicionales",
      description: "Examen final de condicionales (0, 1, 2, 3).",
      topics: ["allCondsMix"],
      levels: {
        1: { label: "Mix fácil" },
        2: { label: "Mix medio" },
        3: { label: "Mix difícil" },
        4: { label: "Mix experto" }
      }
    }
  },

  /* ==========================================================
     SECCIÓN 3: MAESTRÍA GLOBAL
     ========================================================== */
  mastery: {
    label: "Maestría Global",
    description: "El examen final: tiempos + condicionales mezclados.",
    icon: "👑",

    global: {
      label: "Global",
      cefr: "B1+",
      badge: "Todo mezclado",
      description: "Tiempos verbales y condicionales en el mismo ejercicio.",
      topics: ["allTensesMix", "allCondsMix"],
      levels: {
        1: { label: "Fácil mezclado" },
        2: { label: "Medio mezclado" },
        3: { label: "Difícil mezclado" },
        4: { label: "Experto mezclado" }
      }
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = GRAMMAR_TOPICS;
}