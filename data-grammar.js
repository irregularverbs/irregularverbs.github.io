/* ============================================================
   IRREGULARS — data-grammar.js
   Contenido real de gramática (A2 → B1+)
   ============================================================ */

const GRAMMAR_TOPICS = {

  /* ==========================================================
     SECCIÓN 1: TIEMPOS VERBALES
     ========================================================== */
  tenses: {
    label: "Tiempos Verbales",
    description: "Present, Past, Perfect. De A2 a B1+.",
    icon: "📘",

    /* --------------------------------------------------------
       FÁCIL — Present Simple + Present Continuous (A2)
       -------------------------------------------------------- */
    easy: {
      label: "Fácil",
      cefr: "A2",
      badge: "Present",
      description: "Present Simple (rutinas) y Present Continuous (acciones ahora).",

      rules: [
        "Present Simple: 3ª persona singular → +s / +es (he works, she goes)",
        "Present Simple negativa: don't / doesn't + infinitivo",
        "Present Continuous: am / is / are + verbo-ing",
        "Contraste: I work every day · I am working right now"
      ],

      verbs: ["work", "study", "live", "play", "read", "write", "eat", "drink", "speak", "watch"],

      complements: {
        work:  ["in an office", "from home", "at a hospital", "in a bank", "at a school"],
        study: ["English", "medicine", "at university", "every evening", "with friends"],
        live:  ["in Madrid", "near the park", "with my parents", "in a small flat"],
        play:  ["football", "the guitar", "tennis", "with friends"],
        read:  ["the newspaper", "a novel", "before bed", "in the morning"],
        write: ["emails", "a diary", "poems", "in English"],
        eat:   ["breakfast", "at home", "pasta", "in the office"],
        drink: ["coffee", "water", "tea", "juice"],
        speak: ["English", "Spanish", "on the phone", "at work"],
        watch: ["TV", "films", "series", "the news"]
      },

      times: {
        presentSimple:     ["every day", "on Mondays", "in the morning", "at weekends", "usually", "always", "often"],
        presentContinuous: ["now", "right now", "at the moment", "today", "this week", "tonight"]
      },

      levels: {
        1: { label: "Afirmativas",                 tenses: ["presentSimple", "presentContinuous"], template: "affirmative" },
        2: { label: "Negativas",                   tenses: ["presentSimple", "presentContinuous"], template: "negative" },
        3: { label: "Preguntas",                   tenses: ["presentSimple", "presentContinuous"], template: "question" },
        4: { label: "Contraste Simple/Continuous", tenses: ["presentSimple", "presentContinuous"], template: "mixed" }
      }
    },

    /* --------------------------------------------------------
       MEDIO — Past Simple + Past Continuous (A2+)
       -------------------------------------------------------- */
    medium: {
      label: "Medio",
      cefr: "A2+",
      badge: "Past",
      description: "Past Simple (acciones terminadas) y Past Continuous (en progreso).",

      rules: [
        "Past Simple regulares: +ed (worked, played)",
        "Past Simple irregulares: 2ª columna (went, saw, ate)",
        "Past Simple negativa: didn't + infinitivo",
        "Past Continuous: was / were + verbo-ing",
        "Contraste: I was reading when the phone rang"
      ],

      verbs: ["work", "study", "play", "watch", "walk", "talk", "read", "write", "cook", "clean"],

      complements: {
        work:  ["in an office", "from home", "all day", "on a project"],
        study: ["English", "for the exam", "all night", "at the library"],
        play:  ["football", "in the park", "with friends", "for two hours"],
        watch: ["a film", "TV", "a match", "a documentary"],
        walk:  ["in the park", "home", "to school", "along the river"],
        talk:  ["to her", "on the phone", "with the manager", "for an hour"],
        read:  ["a book", "the news", "the instructions", "a magazine"],
        write: ["a letter", "an email", "a story", "in the notebook"],
        cook:  ["dinner", "pasta", "for the family", "something new"],
        clean: ["the kitchen", "the room", "the windows", "the car"]
      },

      times: {
        pastSimple:     ["yesterday", "last night", "last week", "two days ago", "in 2019", "on Monday"],
        pastContinuous: ["at 8 pm", "at that moment", "while", "when", "all morning"]
      },

      levels: {
        1: { label: "Afirmativas", tenses: ["pastSimple", "pastContinuous"], template: "affirmative" },
        2: { label: "Negativas",   tenses: ["pastSimple", "pastContinuous"], template: "negative" },
        3: { label: "Preguntas",   tenses: ["pastSimple", "pastContinuous"], template: "question" },
        4: { label: "Contraste",   tenses: ["pastSimple", "pastContinuous"], template: "mixed" }
      }
    },

    /* --------------------------------------------------------
       DIFÍCIL — Present Perfect (B1)
       -------------------------------------------------------- */
    hard: {
      label: "Difícil",
      cefr: "B1",
      badge: "Present Perfect",
      description: "Experiencias, resultados y contraste con Past Simple.",

      rules: [
        "Present Perfect: have / has + participio (3ª columna)",
        "Uso: experiencias sin tiempo específico, resultados presentes",
        "Marcadores: ever, never, already, yet, just, for, since",
        "Contraste: I have seen him (sin fecha) · I saw him yesterday (con fecha)"
      ],

      verbs: ["be", "have", "go", "see", "do", "eat", "write", "read", "meet", "visit"],

      complements: {
        be:    ["to London", "to New York", "abroad", "in that restaurant"],
        have:  ["a great idea", "many problems", "a lot of fun", "a headache"],
        go:    ["to Paris", "abroad", "to that museum", "shopping"],
        see:   ["that film", "him before", "the show", "a lot of changes"],
        do:    ["my homework", "the dishes", "a lot of work", "the shopping"],
        eat:   ["sushi", "in that restaurant", "a lot of sweets", "Thai food"],
        write: ["a letter", "three emails", "a book", "a report"],
        read:  ["that book", "the news", "many articles", "the instructions"],
        meet:  ["him before", "your sister", "many people", "the new manager"],
        visit: ["London", "the museum", "my parents", "that city"]
      },

      times: {
        presentPerfect: ["ever", "never", "already", "yet", "just", "this week", "this year", "recently"]
      },

      levels: {
        1: { label: "Afirmativas",               tenses: ["presentPerfect"], template: "affirmative" },
        2: { label: "Negativas + ever/never",    tenses: ["presentPerfect"], template: "negative" },
        3: { label: "Preguntas + already/yet",   tenses: ["presentPerfect"], template: "question" },
        4: { label: "Contraste con Past Simple", tenses: ["presentPerfect", "pastSimple"], template: "mixed" }
      }
    },

    /* --------------------------------------------------------
       EXPERTO — Past Perfect + Mix (B1+)
       -------------------------------------------------------- */
    expert: {
      label: "Experto",
      cefr: "B1+",
      badge: "Past Perfect",
      description: "Anterioridad en el pasado y contraste de los 4 tiempos.",

      rules: [
        "Past Perfect: had + participio (igual para todas las personas)",
        "Uso: acción anterior a otra acción pasada",
        "Marcadores: before, after, already, by the time",
        "Ejemplo: When I arrived, the film had already started"
      ],

      verbs: ["go", "see", "finish", "leave", "eat", "arrive", "start", "do", "write", "meet"],

      complements: {
        go:     ["to the party", "home", "to the cinema", "out"],
        see:    ["the film", "him before", "that show", "the news"],
        finish: ["the project", "dinner", "the report", "the meeting"],
        leave:  ["the office", "early", "the party", "the house"],
        eat:    ["lunch", "already", "at the restaurant", "everything"],
        arrive: ["late", "on time", "at the station", "before us"],
        start:  ["the meeting", "the film", "the class", "the project"],
        do:     ["the homework", "the shopping", "the cleaning", "everything"],
        write:  ["the email", "the report", "the letter", "the article"],
        meet:   ["the manager", "him before", "the client", "the team"]
      },

      times: {
        pastPerfect: ["before", "already", "by the time", "after"]
      },

      levels: {
        1: { label: "Past Perfect afirmativo", tenses: ["pastPerfect"], template: "affirmative" },
        2: { label: "before / after / already", tenses: ["pastPerfect"], template: "affirmative" },
        3: { label: "Narración compleja",       tenses: ["pastPerfect", "pastSimple"], template: "mixed" },
        4: { label: "Mix de los 4 tiempos",     tenses: ["presentSimple", "presentContinuous", "pastSimple", "pastPerfect"], template: "mixed" }
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

    /* --------------------------------------------------------
       FÁCIL — Condicional 0 (A2+)
       -------------------------------------------------------- */
    easy: {
      label: "Fácil",
      cefr: "A2+",
      badge: "Condicional 0",
      description: "Verdades generales: If you heat water, it boils.",

      rules: [
        "Estructura: If + presente simple, presente simple",
        "Uso: verdades generales, hechos científicos, rutinas",
        "Ejemplo: If it rains, the ground gets wet"
      ],

      verbs: ["rain", "study", "eat", "sleep", "exercise", "read", "drink", "work", "speak", "play"],

      complements: {
        rain:     ["the ground gets wet", "we stay at home", "the plants grow"],
        study:    ["you pass the exam", "you learn faster", "you get better grades"],
        eat:      ["you feel better", "you have energy", "you are happy"],
        sleep:    ["you feel rested", "you have energy", "you think clearly"],
        exercise: ["you feel great", "you get stronger", "you sleep better"],
        read:     ["you learn a lot", "you improve your English", "you relax"],
        drink:    ["you feel better", "you stay awake", "you relax"],
        work:     ["hard you succeed", "in a team you learn", "every day you improve"],
        speak:    ["English you improve", "slowly people understand", "clearly everyone listens"],
        play:     ["every day you improve", "with friends you have fun", "well you win"]
      },

      times: {
        general: [""]
      },

      levels: {
        1: { label: "Afirmativas básicas", tenses: ["cond0"], template: "cond0" },
        2: { label: "Negativas",           tenses: ["cond0"], template: "cond0neg" },
        3: { label: "Preguntas",           tenses: ["cond0"], template: "cond0q" },
        4: { label: "Mix cond 0",          tenses: ["cond0"], template: "cond0mix" }
      }
    },

    /* --------------------------------------------------------
       MEDIO — Condicional 1 (B1)
       -------------------------------------------------------- */
    medium: {
      label: "Medio",
      cefr: "B1",
      badge: "Condicional 1",
      description: "Futuro real: If it rains, I will stay home.",

      rules: [
        "Estructura: If + presente simple, will + infinitivo",
        "Uso: situaciones futuras posibles",
        "También: can, may, should en la parte principal",
        "Ejemplo: If you study, you will pass"
      ],

      verbs: ["rain", "study", "go", "have", "come", "finish", "see", "do", "get", "miss"],

      complements: {
        rain:   ["we will stay at home", "I will take an umbrella", "the match will be cancelled"],
        study:  ["you will pass", "you will learn a lot", "you will get a good grade"],
        go:     ["I will call you", "we will have fun", "she will be happy"],
        have:   ["I will lend you some", "we will celebrate", "you will enjoy it"],
        come:   ["I will tell him", "we will go together", "she will be surprised"],
        finish: ["we will go out", "I will call you", "you can relax"],
        see:    ["I will tell him", "you will understand", "we will talk"],
        do:     ["you will feel better", "I will help you", "it will be fine"],
        get:    ["I will be happy", "we will celebrate", "you will see"],
        miss:   ["you will regret it", "I will be sad", "we will miss you"]
      },

      times: {
        future: [""]
      },

      levels: {
        1: { label: "If + presente, will + inf", tenses: ["cond1"], template: "cond1" },
        2: { label: "Negativas",                 tenses: ["cond1"], template: "cond1neg" },
        3: { label: "Can / may / should",        tenses: ["cond1"], template: "cond1modal" },
        4: { label: "Mix cond 0 + 1",            tenses: ["cond0", "cond1"], template: "condMix01" }
      }
    },

    /* --------------------------------------------------------
       DIFÍCIL — Condicional 2 (B1)
       -------------------------------------------------------- */
    hard: {
      label: "Difícil",
      cefr: "B1",
      badge: "Condicional 2",
      description: "Hipotético presente: If I had money, I would travel.",

      rules: [
        "Estructura: If + pasado simple, would + infinitivo",
        "Uso: situaciones hipotéticas, imaginarias, improbables",
        "En el 'if' se usa 'were' con I/he/she/it (If I were you…)",
        "Ejemplo: If I had more time, I would learn guitar"
      ],

      verbs: ["have", "be", "know", "live", "go", "speak", "win", "find", "meet", "work"],

      complements: {
        have:  ["more time", "more money", "a car", "a bigger house"],
        be:    ["rich", "famous", "younger", "taller"],
        know:  ["the answer", "her name", "the truth", "the way"],
        live:  ["in Paris", "near the beach", "in another country", "abroad"],
        go:    ["to Japan", "around the world", "to that concert", "everywhere"],
        speak: ["Japanese", "five languages", "perfect English", "like a native"],
        win:   ["the lottery", "the competition", "a million euros", "the match"],
        find:  ["a treasure", "the perfect job", "a better solution", "the answer"],
        meet:  ["a celebrity", "the president", "my idol", "interesting people"],
        work:  ["less", "from home", "in a dream company", "abroad"]
      },

      times: {
        hypothetic: [""]
      },

      levels: {
        1: { label: "If + past, would + inf", tenses: ["cond2"], template: "cond2" },
        2: { label: "Negativas",              tenses: ["cond2"], template: "cond2neg" },
        3: { label: "Could / might",          tenses: ["cond2"], template: "cond2modal" },
        4: { label: "Mix cond 1 + 2",         tenses: ["cond1", "cond2"], template: "condMix12" }
      }
    },

    /* --------------------------------------------------------
       EXPERTO — Condicional 3 (B1+)
       -------------------------------------------------------- */
    expert: {
      label: "Experto",
      cefr: "B1+",
      badge: "Condicional 3",
      description: "Hipotético pasado: If I had known, I would have gone.",

      rules: [
        "Estructura: If + past perfect, would have + participio",
        "Uso: hipótesis sobre el pasado (ya no se puede cambiar)",
        "También: could have, might have",
        "Ejemplo: If I had studied, I would have passed"
      ],

      verbs: ["know", "study", "go", "see", "have", "be", "do", "come", "leave", "tell"],

      complements: {
        know:   ["the truth", "about it", "the answer", "earlier"],
        study:  ["more", "harder", "for the exam", "every day"],
        go:     ["to the party", "to the meeting", "earlier", "with them"],
        see:    ["the sign", "him", "the film", "the problem"],
        have:   ["more time", "enough money", "a car", "the chance"],
        be:     ["there", "more careful", "on time", "ready"],
        do:     ["the homework", "the project", "more", "things differently"],
        come:   ["earlier", "with us", "to the party", "on time"],
        leave:  ["earlier", "before the storm", "the office sooner", "the keys"],
        tell:   ["me", "the truth", "him earlier", "someone"]
      },

      times: {
        pastHypothetic: [""]
      },

      levels: {
        1: { label: "If + past perfect, would have + pp", tenses: ["cond3"], template: "cond3" },
        2: { label: "Negativas",                          tenses: ["cond3"], template: "cond3neg" },
        3: { label: "Could have / might have",            tenses: ["cond3"], template: "cond3modal" },
        4: { label: "Mix cond 2 + 3",                     tenses: ["cond2", "cond3"], template: "condMix23" }
      }
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = GRAMMAR_TOPICS;
}