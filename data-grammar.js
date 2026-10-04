/* ============================================================
   IRREGULARS — data-grammar.js
   Contenido de gramática A2 → B1+
   ------------------------------------------------------------
   Estructura por tema:
     - label, cefr, badge, description
     - rules:      reglas que se muestran al fallar
     - verbs:      verbos disponibles
     - complements: 6 complementos por verbo
     - times:      marcadores por tiempo (12 cada uno)
     - templates:  plantillas estructurales (3-4 por nivel)
     - levels:     configuración por nivel (1-4)
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
        work:  ["in an office", "from home", "at a hospital", "in a bank", "at a school", "in a restaurant"],
        study: ["English", "medicine", "at university", "every evening", "with friends", "for an exam"],
        live:  ["in Madrid", "near the park", "with my parents", "in a small flat", "in the city centre", "abroad"],
        play:  ["football", "the guitar", "tennis", "with friends", "in a team", "every weekend"],
        read:  ["the newspaper", "a novel", "before bed", "in the morning", "on the train", "a magazine"],
        write: ["emails", "a diary", "poems", "in English", "to my friends", "every day"],
        eat:   ["breakfast", "at home", "pasta", "in the office", "with my family", "healthy food"],
        drink: ["coffee", "water", "tea", "juice", "in the morning", "after lunch"],
        speak: ["English", "Spanish", "on the phone", "at work", "with clients", "every day"],
        watch: ["TV", "films", "series", "the news", "with my family", "in the evening"]
      },

      times: {
        presentSimple: [
          "every day", "on Mondays", "in the morning", "at weekends",
          "usually", "always", "often", "sometimes",
          "twice a week", "every summer", "after work", "in the evening"
        ],
        presentContinuous: [
          "now", "right now", "at the moment", "today",
          "this week", "tonight", "this morning", "these days",
          "at the moment", "currently", "just now", "this year"
        ]
      },

      templates: {
        presentSimple: [
          "{S} {V} {C} {T}.",
          "{T}, {S} {V} {C}.",
          "{S} {V} {C} because it is important.",
          "{S} {V} {C}, and everyone notices."
        ],
        presentContinuous: [
          "{S} {AUX} {Ving} {C} {T}.",
          "{T}, {S} {AUX} {Ving} {C}.",
          "{S} {AUX} {Ving} {C} at the moment.",
          "{S} {AUX} {Ving} {C}, and it looks great."
        ]
      },

      levels: {
        1: { label: "Afirmativas básicas",          tenses: ["presentSimple", "presentContinuous"] },
        2: { label: "Negativas",                    tenses: ["presentSimple", "presentContinuous"] },
        3: { label: "Preguntas",                    tenses: ["presentSimple", "presentContinuous"] },
        4: { label: "Contraste Simple/Continuous",  tenses: ["presentSimple", "presentContinuous"] }
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
        work:  ["in an office", "from home", "all day", "on a project", "at the office", "last weekend"],
        study: ["English", "for the exam", "all night", "at the library", "with friends", "very hard"],
        play:  ["football", "in the park", "with friends", "for two hours", "a match", "tennis"],
        watch: ["a film", "TV", "a match", "a documentary", "the news", "a series"],
        walk:  ["in the park", "home", "to school", "along the river", "for an hour", "with the dog"],
        talk:  ["to her", "on the phone", "with the manager", "for an hour", "about work", "at the meeting"],
        read:  ["a book", "the news", "the instructions", "a magazine", "for an hour", "in bed"],
        write: ["a letter", "an email", "a story", "in the notebook", "to my friend", "for two hours"],
        cook:  ["dinner", "pasta", "for the family", "something new", "a cake", "last night"],
        clean: ["the kitchen", "the room", "the windows", "the car", "all morning", "the bathroom"]
      },

      times: {
        pastSimple: [
          "yesterday", "last night", "last week", "two days ago",
          "in 2019", "on Monday", "last summer", "three weeks ago",
          "this morning", "an hour ago", "last year", "the day before"
        ],
        pastContinuous: [
          "at 8 pm", "at that moment", "while I was reading", "when the phone rang",
          "all morning", "all evening", "at midnight", "at that time",
          "when she arrived", "while we were talking", "at noon", "at sunset"
        ]
      },

      templates: {
        pastSimple: [
          "{S} {V} {C} {T}.",
          "{T}, {S} {V} {C}.",
          "{S} {V} {C}, and then went home.",
          "{S} {V} {C} because it was important."
        ],
        pastContinuous: [
          "{S} {AUX} {Ving} {C} {T}.",
          "{T}, {S} {AUX} {Ving} {C}.",
          "{S} {AUX} {Ving} {C} when something happened.",
          "While {S} {AUX} {Ving} {C}, I called."
        ]
      },

      levels: {
        1: { label: "Afirmativas básicas", tenses: ["pastSimple", "pastContinuous"] },
        2: { label: "Negativas",           tenses: ["pastSimple", "pastContinuous"] },
        3: { label: "Preguntas",           tenses: ["pastSimple", "pastContinuous"] },
        4: { label: "Contraste Simple/Cont", tenses: ["pastSimple", "pastContinuous"] }
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
        be:    ["to London", "to New York", "abroad", "in that restaurant", "on TV", "at that place"],
        have:  ["a great idea", "many problems", "a lot of fun", "a headache", "a good time", "enough time"],
        go:    ["to Paris", "abroad", "to that museum", "shopping", "on holiday", "to the beach"],
        see:   ["that film", "him before", "the show", "a lot of changes", "that place", "the news"],
        do:    ["my homework", "the dishes", "a lot of work", "the shopping", "the cleaning", "everything"],
        eat:   ["sushi", "in that restaurant", "a lot of sweets", "Thai food", "at that place", "something new"],
        write: ["a letter", "three emails", "a book", "a report", "many articles", "to the manager"],
        read:  ["that book", "the news", "many articles", "the instructions", "that novel", "the report"],
        meet:  ["him before", "your sister", "many people", "the new manager", "a famous person", "the team"],
        visit: ["London", "the museum", "my parents", "that city", "the castle", "the old town"]
      },

      times: {
        presentPerfect: [
          "ever", "never", "already", "yet",
          "just", "this week", "this year", "recently",
          "so far", "up to now", "lately", "many times"
        ]
      },

      templates: {
        presentPerfect: [
          "{S} {AUX} {Vpp} {C} {T}.",
          "{T}, {S} {AUX} {Vpp} {C}.",
          "{S} {AUX} never {Vpp} {C} before.",
          "{S} {AUX} {Vpp} {C}, and everyone is amazed."
        ]
      },

      levels: {
        1: { label: "Afirmativas",              tenses: ["presentPerfect"] },
        2: { label: "Negativas + ever/never",   tenses: ["presentPerfect"] },
        3: { label: "Preguntas + already/yet",  tenses: ["presentPerfect"] },
        4: { label: "Contraste con Past Simple", tenses: ["presentPerfect", "pastSimple"] }
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
        go:     ["to the party", "home", "to the cinema", "out", "on a trip", "to the meeting"],
        see:    ["the film", "him before", "that show", "the news", "the problem", "the sign"],
        finish: ["the project", "dinner", "the report", "the meeting", "the work", "the homework"],
        leave:  ["the office", "early", "the party", "the house", "the keys", "the door open"],
        eat:    ["lunch", "already", "at the restaurant", "everything", "dinner", "the cake"],
        arrive: ["late", "on time", "at the station", "before us", "early", "at the airport"],
        start:  ["the meeting", "the film", "the class", "the project", "the work", "the race"],
        do:     ["the homework", "the shopping", "the cleaning", "everything", "the dishes", "the laundry"],
        write:  ["the email", "the report", "the letter", "the article", "the note", "the message"],
        meet:   ["the manager", "him before", "the client", "the team", "the new boss", "her family"]
      },

      times: {
        pastPerfect: [
          "before", "already", "by the time", "after",
          "when I arrived", "by then", "earlier", "just before",
          "the day before", "by 8pm", "before she came", "already by then"
        ],
        mix: [
          "yesterday", "last week", "now", "at the moment",
          "every day", "in 2019", "right now", "last night",
          "usually", "already", "before", "this morning"
        ]
      },

      templates: {
        pastPerfect: [
          "{S} {AUX} {Vpp} {C} {T}.",
          "By the time we arrived, {S} {AUX} {Vpp} {C}.",
          "{S} {AUX} {Vpp} {C}, and everyone noticed.",
          "When I called, {S} {AUX} {Vpp} {C}."
        ],
        mix: [
          "{S} {V} {C} {T}.",
          "{S} {AUX} {Ving} {C} {T}.",
          "{S} {AUX} {Vpp} {C} {T}."
        ]
      },

      levels: {
        1: { label: "Past Perfect afirmativo",  tenses: ["pastPerfect"] },
        2: { label: "before / after / already", tenses: ["pastPerfect"] },
        3: { label: "Narración compleja",       tenses: ["pastPerfect", "pastSimple"] },
        4: { label: "Mix de los 4 tiempos",     tenses: ["presentSimple", "presentContinuous", "pastSimple", "pastPerfect"] }
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
        rain:     ["the ground gets wet", "we stay at home", "the plants grow", "everything is wet", "people use umbrellas", "the streets get empty"],
        study:    ["you pass the exam", "you learn faster", "you get better grades", "you improve", "you feel proud", "you succeed"],
        eat:      ["you feel better", "you have energy", "you are happy", "you grow", "you stay healthy", "you feel full"],
        sleep:    ["you feel rested", "you have energy", "you think clearly", "you work better", "you are happier", "you stay healthy"],
        exercise: ["you feel great", "you get stronger", "you sleep better", "you lose weight", "you are healthier", "you have more energy"],
        read:     ["you learn a lot", "you improve your English", "you relax", "you travel mentally", "you get smarter", "you enjoy it"],
        drink:    ["water you feel better", "coffee you stay awake", "tea you relax", "juice you get vitamins", "milk you sleep well", "a lot you feel full"],
        work:     ["hard you succeed", "in a team you learn", "every day you improve", "well you get promoted", "smart you save time", "with passion you enjoy it"],
        speak:    ["English you improve", "slowly people understand", "clearly everyone listens", "often you get fluent", "with natives you learn", "every day you get better"],
        play:     ["every day you improve", "with friends you have fun", "well you win", "a sport you stay fit", "for hours you get tired", "in a team you learn"]
      },

      times: { general: [""] },

      templates: {
        cond0: [
          "If {S} ___ ({V}), {C}.",
          "{C} if {S} ___ ({V}).",
          "If {S} ___ ({V}), {C}, and that is true."
        ]
      },

      levels: {
        1: { label: "Afirmativas básicas", tenses: ["cond0"] },
        2: { label: "Negativas",           tenses: ["cond0"] },
        3: { label: "Preguntas",           tenses: ["cond0"] },
        4: { label: "Mix cond 0",          tenses: ["cond0"] }
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
        rain:   ["we will stay at home", "I will take an umbrella", "the match will be cancelled", "we will watch a film", "the garden will grow", "we will stay inside"],
        study:  ["you will pass", "you will learn a lot", "you will get a good grade", "you will feel proud", "you will succeed", "your parents will be happy"],
        go:     ["I will call you", "we will have fun", "she will be happy", "we will see everything", "you will love it", "I will tell him"],
        have:   ["I will lend you some", "we will celebrate", "you will enjoy it", "I will help you", "we will share it", "you will be fine"],
        come:   ["I will tell him", "we will go together", "she will be surprised", "we will meet at 8", "I will cook dinner", "you will see everyone"],
        finish: ["we will go out", "I will call you", "you can relax", "we will celebrate", "I will let you know", "you will be free"],
        see:    ["I will tell him", "you will understand", "we will talk", "I will call you", "we will meet soon", "I will let you know"],
        do:     ["you will feel better", "I will help you", "it will be fine", "we will finish faster", "you will succeed", "everything will be okay"],
        get:    ["I will be happy", "we will celebrate", "you will see", "I will tell you", "we will go out", "you will be surprised"],
        miss:   ["you will regret it", "I will be sad", "we will miss you", "you will lose it", "you will be sorry", "we will notice"]
      },

      times: { future: [""] },

      templates: {
        cond1: [
          "If {S} ___ ({V}), {C}.",
          "{C} if {S} ___ ({V}).",
          "If {S} ___ ({V}), {C}, I promise."
        ]
      },

      levels: {
        1: { label: "If + presente, will + inf", tenses: ["cond1"] },
        2: { label: "Negativas",                 tenses: ["cond1"] },
        3: { label: "Can / may / should",        tenses: ["cond1"] },
        4: { label: "Mix cond 0 + 1",            tenses: ["cond0", "cond1"] }
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
        have:  ["more time", "more money", "a car", "a bigger house", "a lot of friends", "a different job"],
        be:    ["rich", "famous", "younger", "taller", "happier", "somewhere else"],
        know:  ["the answer", "her name", "the truth", "the way", "the secret", "the password"],
        live:  ["in Paris", "near the beach", "in another country", "abroad", "in a big city", "in the mountains"],
        go:    ["to Japan", "around the world", "to that concert", "everywhere", "on a safari", "to the moon"],
        speak: ["Japanese", "five languages", "perfect English", "like a native", "French fluently", "Chinese"],
        win:   ["the lottery", "the competition", "a million euros", "the match", "the prize", "the race"],
        find:  ["a treasure", "the perfect job", "a better solution", "the answer", "a good deal", "my keys"],
        meet:  ["a celebrity", "the president", "my idol", "interesting people", "a hero", "the perfect partner"],
        work:  ["less", "from home", "in a dream company", "abroad", "for myself", "on something I love"]
      },

      times: { hypothetic: [""] },

      templates: {
        cond2: [
          "If {S} ___ ({V}) something, {C}.",
          "{C} if {S} ___ ({V}) something.",
          "If {S} ___ ({V}) something, {C}, honestly."
        ]
      },

      levels: {
        1: { label: "If + past, would + inf", tenses: ["cond2"] },
        2: { label: "Negativas",              tenses: ["cond2"] },
        3: { label: "Could / might",          tenses: ["cond2"] },
        4: { label: "Mix cond 1 + 2",         tenses: ["cond1", "cond2"] }
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
        know:   ["the truth", "about it", "the answer", "earlier", "the risks", "the details"],
        study:  ["more", "harder", "for the exam", "every day", "the night before", "with a tutor"],
        go:     ["to the party", "to the meeting", "earlier", "with them", "to that concert", "on that trip"],
        see:    ["the sign", "him", "the film", "the problem", "the warning", "the message"],
        have:   ["more time", "enough money", "a car", "the chance", "the right tools", "a plan B"],
        be:     ["there", "more careful", "on time", "ready", "braver", "smarter"],
        do:     ["the homework", "the project", "more", "things differently", "my best", "the right thing"],
        come:   ["earlier", "with us", "to the party", "on time", "by train", "prepared"],
        leave:  ["earlier", "before the storm", "the office sooner", "the keys", "a message", "the door open"],
        tell:   ["me", "the truth", "him earlier", "someone", "her everything", "the whole story"]
      },

      times: { pastHypothetic: [""] },

      templates: {
        cond3: [
          "If {S} ___ ({V}) something, {C}.",
          "{C} if {S} ___ ({V}) something.",
          "If {S} ___ ({V}) something, {C}, but it is too late now."
        ]
      },

      levels: {
        1: { label: "If + past perfect, would have + pp", tenses: ["cond3"] },
        2: { label: "Negativas",                          tenses: ["cond3"] },
        3: { label: "Could have / might have",            tenses: ["cond3"] },
        4: { label: "Mix cond 2 + 3",                     tenses: ["cond2", "cond3"] }
      }
    }
  }
};

/* Compatibilidad con bundlers */
if (typeof module !== "undefined" && module.exports) {
  module.exports = GRAMMAR_TOPICS;
}