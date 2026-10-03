// IRREGULARS VERB DATA & 5,000+ UNIQUE EXERCISES
const IRREGULAR_VERBS_DATA = {
"be": { base: "be", past: "was/were", participle: "been", priority: "high", es: "ser / estar" },
"have": { base: "have", past: "had", participle: "had", priority: "high", es: "tener" },
"do": { base: "do", past: "did", participle: "done", priority: "high", es: "hacer" },
"say": { base: "say", past: "said", participle: "said", priority: "high", es: "decir" },
"go": { base: "go", past: "went", participle: "gone", priority: "high", es: "ir" },
"get": { base: "get", past: "got", participle: "got", priority: "high", es: "conseguir / obtener" },
"make": { base: "make", past: "made", participle: "made", priority: "high", es: "hacer / fabricar" },
"know": { base: "know", past: "knew", participle: "known", priority: "high", es: "saber / conocer" },
"think": { base: "think", past: "thought", participle: "thought", priority: "high", es: "pensar" },
"take": { base: "take", past: "took", participle: "taken", priority: "high", es: "tomar / llevar" },
"see": { base: "see", past: "saw", participle: "seen", priority: "high", es: "ver" },
"come": { base: "come", past: "came", participle: "come", priority: "high", es: "venir" },
"give": { base: "give", past: "gave", participle: "given", priority: "high", es: "dar" },
"find": { base: "find", past: "found", participle: "found", priority: "high", es: "encontrar" },
"tell": { base: "tell", past: "told", participle: "told", priority: "high", es: "decir / contar" },
"feel": { base: "feel", past: "felt", participle: "felt", priority: "high", es: "sentir" },
"leave": { base: "leave", past: "left", participle: "left", priority: "high", es: "dejar / salir" },
"put": { base: "put", past: "put", participle: "put", priority: "high", es: "poner" },
"bring": { base: "bring", past: "brought", participle: "brought", priority: "high", es: "traer" },
"buy": { base: "buy", past: "bought", participle: "bought", priority: "high", es: "comprar" },
"read": { base: "read", past: "read", participle: "read", priority: "high", es: "leer" },
"run": { base: "run", past: "ran", participle: "run", priority: "high", es: "correr" },
"eat": { base: "eat", past: "ate", participle: "eaten", priority: "high", es: "comer" },
"drink": { base: "drink", past: "drank", participle: "drunk", priority: "high", es: "beber" },
"write": { base: "write", past: "wrote", participle: "written", priority: "high", es: "escribir" },
"speak": { base: "speak", past: "spoke", participle: "spoken", priority: "high", es: "hablar" },
"break": { base: "break", past: "broke", participle: "broken", priority: "high", es: "romper" },
"sleep": { base: "sleep", past: "slept", participle: "slept", priority: "high", es: "dormir" },
"teach": { base: "teach", past: "taught", participle: "taught", priority: "high", es: "enseñar" },
"understand": { base: "understand", past: "understood", participle: "understood", priority: "high", es: "entender" },
​"begin": { base: "begin", past: "began", participle: "begun", priority: "medium", es: "empezar" },
"become": { base: "become", past: "became", participle: "become", priority: "medium", es: "convertirse en" },
"catch": { base: "catch", past: "caught", participle: "caught", priority: "medium", es: "atrapar / coger" },
"choose": { base: "choose", past: "chose", participle: "chosen", priority: "medium", es: "elegir" },
"fall": { base: "fall", past: "fell", participle: "fallen", priority: "medium", es: "caer" },
"fly": { base: "fly", past: "flew", participle: "flown", priority: "medium", es: "volar" },
"forget": { base: "forget", past: "forgot", participle: "forgotten", priority: "medium", es: "olvidar" },
"grow": { base: "grow", past: "grew", participle: "grown", priority: "medium", es: "crecer / cultivar" },
"hear": { base: "hear", past: "heard", participle: "heard", priority: "medium", es: "oír" },
"keep": { base: "keep", past: "kept", participle: "kept", priority: "medium", es: "mantener / guardar" },
"lose": { base: "lose", past: "lost", participle: "lost", priority: "medium", es: "perder" },
"meet": { base: "meet", past: "met", participle: "met", priority: "medium", es: "conocer / reunirse" },
"pay": { base: "pay", past: "paid", participle: "paid", priority: "medium", es: "pagar" },
"ride": { base: "ride", past: "rode", participle: "ridden", priority: "medium", es: "montar" },
"sell": { base: "sell", past: "sold", participle: "sold", priority: "medium", es: "vender" },
"send": { base: "send", past: "sent", participle: "sent", priority: "medium", es: "enviar" },
"sing": { base: "sing", past: "sang", participle: "sung", priority: "medium", es: "cantar" },
"sit": { base: "sit", past: "sat", participle: "sat", priority: "medium", es: "sentarse" },
"stand": { base: "stand", past: "stood", participle: "stood", priority: "medium", es: "estar de pie" },
"swim": { base: "swim", past: "swam", participle: "swum", priority: "medium", es: "nadar" },
"wear": { base: "wear", past: "wore", participle: "worn", priority: "medium", es: "llevar puesto" },
"win": { base: "win", past: "won", participle: "won", priority: "medium", es: "ganar" },
​"beat": { base: "beat", past: "beat", participle: "beaten", priority: "low", es: "vencer / latir" },
"bite": { base: "bite", past: "bit", participle: "bitten", priority: "low", es: "morder" },
"blow": { base: "blow", past: "blew", participle: "blown", priority: "low", es: "soplar" },
"build": { base: "build", past: "built", participle: "built", priority: "low", es: "construir" },
"cost": { base: "cost", past: "cost", participle: "cost", priority: "low", es: "costar" },
"cut": { base: "cut", past: "cut", participle: "cut", priority: "low", es: "cortar" },
"draw": { base: "draw", past: "drew", participle: "drawn", priority: "low", es: "dibujar" },
"drive": { base: "drive", past: "drove", participle: "driven", priority: "low", es: "conducir" },
"fight": { base: "fight", past: "fought", participle: "fought", priority: "low", es: "luchar" },
"hang": { base: "hang", past: "hung", participle: "hung", priority: "low", es: "colgar" },
"hide": { base: "hide", past: "hid", participle: "hidden", priority: "low", es: "esconder" },
"hit": { base: "hit", past: "hit", participle: "hit", priority: "low", es: "golpear" },
"hold": { base: "hold", past: "held", participle: "held", priority: "low", es: "sostener / celebrar" },
"hurt": { base: "hurt", past: "hurt", participle: "hurt", priority: "low", es: "herir / doler" },
"lend": { base: "lend", past: "lent", participle: "lent", priority: "low", es: "prestar" },
"let": { base: "let", past: "let", participle: "let", priority: "low", es: "permitir" },
"mean": { base: "mean", past: "meant", participle: "meant", priority: "low", es: "significar" },
"ring": { base: "ring", past: "rang", participle: "rung", priority: "low", es: "sonar / llamar" },
"rise": { base: "rise", past: "rose", participle: "risen", priority: "low", es: "elevarse / subir" },
"shine": { base: "shine", past: "shone", participle: "shone", priority: "low", es: "brillar" },
"shoot": { base: "shoot", past: "shot", participle: "shot", priority: "low", es: "disparar" },
"show": { base: "show", past: "showed", participle: "shown", priority: "low", es: "mostrar" },
"shut": { base: "shut", past: "shut", participle: "shut", priority: "low", es: "cerrar" },
"spend": { base: "spend", past: "spent", participle: "spent", priority: "low", es: "gastar / pasar" },
"steal": { base: "steal", past: "stole", participle: "stolen", priority: "low", es: "robar" },
"tear": { base: "tear", past: "tore", participle: "torn", priority: "low", es: "rasgar" },
"throw": { base: "throw", past: "threw", participle: "thrown", priority: "low", es: "lanzar" },
"wake": { base: "wake", past: "woke", participle: "woken", priority: "low", es: "despertar" },
​"lie": { base: "lie", past: "lied", participle: "lied", priority: "very-low", es: "mentir" },
"light": { base: "light", past: "lit", participle: "lit", priority: "very-low", es: "encender" }
};
​// Procedural & template-driven generator ensuring 5,000+ unique, context-rich exercises
function generateExercises() {
const list = [];
let idCounter = 1;
​// Context pools for rich sentence variety across domains
const contexts = {
subjects: [
"My mother", "The young engineer", "Our local manager", "Several experienced chefs", "An old friend",
"That clever student", "The clever detective", "My younger brother", "Our team captain", "The friendly neighbor",
"Sarah", "Marcus", "Elena", "David", "Jessica", "Alexander", "Dr. Harrison", "Professor Smith",
"The neighborhood kids", "My colleagues at the office", "The chief executive", "A famous traveler",
"The talented musician", "Our science teacher", "The delivery driver", "My roommate from college"
],
places: [
"at the central station", "in the quiet library", "near the historical museum", "across the busy avenue",
"inside the warm kitchen", "during the weekly meeting", "at the crowded airport terminal", "behind the old theater",
"on the sunny balcony", "throughout the botanical gardens", "at the local coffee shop", "near the coastal harbor",
"inside the science laboratory", "at the downtown bookstore", "during the evening conference", "on the mountain trail"
],
timeExpressions: [
"yesterday morning", "last weekend", "two days ago", "during the summer holidays", "prior to the conference",
"when the bell rang", "after the heavy rain", "before sunset", "while traveling abroad", "last Friday night",
"at the start of term", "during the final match", "shortly after midnight", "when nobody else was watching"
],
participleAdverbs: [
"already", "never before", "frequently", "recently", "just", "ever", "always", "by that time"
]
};
​// Verb template generator for Past (2col) and Participle (3col)
const verbsKeys = Object.keys(IRREGULAR_VERBS_DATA);
​verbsKeys.forEach(verbKey => {
const verbObj = IRREGULAR_VERBS_DATA[verbKey];
​// Generate Past tense exercises (~50 variations per verb)
for (let i = 0; i < 50; i++) {
const subj = contexts.subjects[(idCounter + i) % contexts.subjects.length];
const place = contexts.places[(idCounter * 3 + i) % contexts.places.length];
const time = contexts.timeExpressions[(idCounter * 7 + i) % contexts.timeExpressions.length];
​let sentence = ${subj} ___ (${verbKey}) ${place} ${time}.;
if (i % 3 === 0) {
sentence = When asked about it, ${subj} ___ (${verbKey}) ${place}.;
} else if (i % 3 === 1) {
sentence = Suddenly, ${subj} ___ (${verbKey}) ${time} without any warning.;
}
​list.push({
id: idCounter++,
verb: verbKey,
type: "past",
answer: verbObj.past.split('/')[0], // handle was/were primary
sentence: sentence,
priority: verbObj.priority
});
}
​// Generate Participle tense exercises (~50 variations per verb)
for (let i = 0; i < 50; i++) {
const subj = contexts.subjects[(idCounter + i) % contexts.subjects.length];
const adv = contexts.participleAdverbs[(idCounter * 2 + i) % contexts.participleAdverbs.length];
const place = contexts.places[(idCounter * 5 + i) % contexts.places.length];
​let aux = "have";
if (subj.startsWith("My mother") || subj.startsWith("Sarah") || subj.startsWith("Marcus") || subj.startsWith("Elena") || subj.startsWith("David") || subj.startsWith("Jessica") || subj.startsWith("Alexander") || subj.startsWith("Dr. Harrison") || subj.startsWith("Professor Smith") || subj.startsWith("Our local manager")) {
aux = "has";
}
​let sentence = ${subj} ${aux} ${adv} ___ (${verbKey}) ${place}.;
if (i % 2 === 0) {
sentence = Nobody believed ${subj} ${aux} ___ (${verbKey}) ${place} before.;
}
​list.push({
id: idCounter++,
verb: verbKey,
type: "participle",
answer: verbObj.participle,
sentence: sentence,
priority: verbObj.priority
});
}
});
​return list;
}
​const ALL_EXERCISES = generateExercises();