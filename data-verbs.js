/**
 * IRREGULARS — Dataset maestro de verbos irregulares
 * -----------------------------------------------
 * Estructura de cada entrada:
 *   base:       infinitivo
 *   past:       pasado simple
 *   participle: participio pasado
 *   priority:   "high" | "medium" | "low" | "very-low"
 *   es:         traducción al español
 *
 * Este archivo es la ÚNICA fuente de verdad sobre los verbos.
 * Añadir nuevos verbos aquí los propaga automáticamente al resto de la app.
 */

const IRREGULAR_VERBS = {

  /* ============================================================
   *  🟢 PRIORIDAD ALTA  (30 verbos esenciales)
   * ============================================================ */
  be:         { base: "be",         past: "was/were",   participle: "been",       priority: "high", es: "ser / estar" },
  have:       { base: "have",       past: "had",        participle: "had",        priority: "high", es: "tener" },
  do:         { base: "do",         past: "did",        participle: "done",       priority: "high", es: "hacer" },
  say:        { base: "say",        past: "said",       participle: "said",       priority: "high", es: "decir" },
  go:         { base: "go",         past: "went",       participle: "gone",       priority: "high", es: "ir" },
  get:        { base: "get",        past: "got",        participle: "got",        priority: "high", es: "conseguir / obtener" },
  make:       { base: "make",       past: "made",       participle: "made",       priority: "high", es: "hacer / fabricar" },
  know:       { base: "know",       past: "knew",       participle: "known",      priority: "high", es: "saber / conocer" },
  think:      { base: "think",      past: "thought",    participle: "thought",    priority: "high", es: "pensar" },
  take:       { base: "take",       past: "took",       participle: "taken",      priority: "high", es: "tomar / llevar" },
  see:        { base: "see",        past: "saw",        participle: "seen",       priority: "high", es: "ver" },
  come:       { base: "come",       past: "came",       participle: "come",       priority: "high", es: "venir" },
  give:       { base: "give",       past: "gave",       participle: "given",      priority: "high", es: "dar" },
  find:       { base: "find",       past: "found",      participle: "found",      priority: "high", es: "encontrar" },
  tell:       { base: "tell",       past: "told",       participle: "told",       priority: "high", es: "decir / contar" },
  feel:       { base: "feel",       past: "felt",       participle: "felt",       priority: "high", es: "sentir" },
  leave:      { base: "leave",      past: "left",       participle: "left",       priority: "high", es: "dejar / irse" },
  put:        { base: "put",        past: "put",        participle: "put",        priority: "high", es: "poner" },
  bring:      { base: "bring",      past: "brought",    participle: "brought",    priority: "high", es: "traer" },
  buy:        { base: "buy",        past: "bought",     participle: "bought",     priority: "high", es: "comprar" },
  read:       { base: "read",       past: "read",       participle: "read",       priority: "high", es: "leer" },
  run:        { base: "run",        past: "ran",        participle: "run",        priority: "high", es: "correr" },
  eat:        { base: "eat",        past: "ate",        participle: "eaten",      priority: "high", es: "comer" },
  drink:      { base: "drink",      past: "drank",      participle: "drunk",      priority: "high", es: "beber" },
  write:      { base: "write",      past: "wrote",      participle: "written",    priority: "high", es: "escribir" },
  speak:      { base: "speak",      past: "spoke",      participle: "spoken",     priority: "high", es: "hablar" },
  break:      { base: "break",      past: "broke",      participle: "broken",     priority: "high", es: "romper" },
  sleep:      { base: "sleep",      past: "slept",      participle: "slept",      priority: "high", es: "dormir" },
  teach:      { base: "teach",      past: "taught",     participle: "taught",     priority: "high", es: "enseñar" },
  understand: { base: "understand", past: "understood", participle: "understood", priority: "high", es: "entender" },

  /* ============================================================
   *  🟡 PRIORIDAD MEDIA  (22 verbos frecuentes)
   * ============================================================ */
  begin:      { base: "begin",      past: "began",      participle: "begun",      priority: "medium", es: "empezar" },
  become:     { base: "become",     past: "became",     participle: "become",     priority: "medium", es: "convertirse en" },
  catch:      { base: "catch",      past: "caught",     participle: "caught",     priority: "medium", es: "atrapar / coger" },
  choose:     { base: "choose",     past: "chose",      participle: "chosen",     priority: "medium", es: "elegir" },
  fall:       { base: "fall",       past: "fell",       participle: "fallen",     priority: "medium", es: "caer" },
  fly:        { base: "fly",        past: "flew",       participle: "flown",      priority: "medium", es: "volar" },
  forget:     { base: "forget",     past: "forgot",     participle: "forgotten",  priority: "medium", es: "olvidar" },
  grow:       { base: "grow",       past: "grew",       participle: "grown",      priority: "medium", es: "crecer / cultivar" },
  hear:       { base: "hear",       past: "heard",      participle: "heard",      priority: "medium", es: "oír" },
  keep:       { base: "keep",       past: "kept",       participle: "kept",       priority: "medium", es: "guardar / mantener" },
  lose:       { base: "lose",       past: "lost",       participle: "lost",       priority: "medium", es: "perder" },
  meet:       { base: "meet",       past: "met",        participle: "met",        priority: "medium", es: "conocer / reunirse" },
  pay:        { base: "pay",        past: "paid",       participle: "paid",       priority: "medium", es: "pagar" },
  ride:       { base: "ride",       past: "rode",       participle: "ridden",     priority: "medium", es: "montar" },
  sell:       { base: "sell",       past: "sold",       participle: "sold",       priority: "medium", es: "vender" },
  send:       { base: "send",       past: "sent",       participle: "sent",       priority: "medium", es: "enviar" },
  sing:       { base: "sing",       past: "sang",       participle: "sung",       priority: "medium", es: "cantar" },
  sit:        { base: "sit",        past: "sat",        participle: "sat",        priority: "medium", es: "sentarse" },
  stand:      { base: "stand",      past: "stood",      participle: "stood",      priority: "medium", es: "estar de pie" },
  swim:       { base: "swim",       past: "swam",       participle: "swum",       priority: "medium", es: "nadar" },
  wear:       { base: "wear",       past: "wore",       participle: "worn",       priority: "medium", es: "llevar puesto" },
  win:        { base: "win",        past: "won",        participle: "won",        priority: "medium", es: "ganar" },

  /* ============================================================
   *  🟠 PRIORIDAD BAJA  (28 verbos avanzados)
   * ============================================================ */
  beat:       { base: "beat",       past: "beat",       participle: "beaten",     priority: "low", es: "vencer / latir" },
  bite:       { base: "bite",       past: "bit",        participle: "bitten",     priority: "low", es: "morder" },
  blow:       { base: "blow",       past: "blew",       participle: "blown",      priority: "low", es: "soplar" },
  build:      { base: "build",      past: "built",      participle: "built",      priority: "low", es: "construir" },
  cost:       { base: "cost",       past: "cost",       participle: "cost",       priority: "low", es: "costar" },
  cut:        { base: "cut",        past: "cut",        participle: "cut",        priority: "low", es: "cortar" },
  draw:       { base: "draw",       past: "drew",       participle: "drawn",      priority: "low", es: "dibujar" },
  drive:      { base: "drive",      past: "drove",      participle: "driven",     priority: "low", es: "conducir" },
  fight:      { base: "fight",      past: "fought",     participle: "fought",     priority: "low", es: "luchar" },
  hang:       { base: "hang",       past: "hung",       participle: "hung",       priority: "low", es: "colgar" },
  hide:       { base: "hide",       past: "hid",        participle: "hidden",     priority: "low", es: "esconder" },
  hit:        { base: "hit",        past: "hit",        participle: "hit",        priority: "low", es: "golpear" },
  hold:       { base: "hold",       past: "held",       participle: "held",       priority: "low", es: "sostener / celebrar" },
  hurt:       { base: "hurt",       past: "hurt",       participle: "hurt",       priority: "low", es: "herir / doler" },
  lend:       { base: "lend",       past: "lent",       participle: "lent",       priority: "low", es: "prestar" },
  let:        { base: "let",        past: "let",        participle: "let",        priority: "low", es: "permitir" },
  mean:       { base: "mean",       past: "meant",      participle: "meant",      priority: "low", es: "significar" },
  ring:       { base: "ring",       past: "rang",       participle: "rung",       priority: "low", es: "sonar / llamar" },
  rise:       { base: "rise",       past: "rose",       participle: "risen",      priority: "low", es: "elevarse / subir" },
  shine:      { base: "shine",      past: "shone",      participle: "shone",      priority: "low", es: "brillar" },
  shoot:      { base: "shoot",      past: "shot",       participle: "shot",       priority: "low", es: "disparar" },
  show:       { base: "show",       past: "showed",     participle: "shown",      priority: "low", es: "mostrar" },
  shut:       { base: "shut",       past: "shut",       participle: "shut",       priority: "low", es: "cerrar" },
  spend:      { base: "spend",      past: "spent",      participle: "spent",      priority: "low", es: "gastar / pasar" },
  steal:      { base: "steal",      past: "stole",      participle: "stolen",     priority: "low", es: "robar" },
  tear:       { base: "tear",       past: "tore",       participle: "torn",       priority: "low", es: "rasgar" },
  throw:      { base: "throw",      past: "threw",      participle: "thrown",     priority: "low", es: "lanzar" },
  wake:       { base: "wake",       past: "woke",       participle: "woken",      priority: "low", es: "despertar" },

  /* ============================================================
   *  🔴 PRIORIDAD MUY BAJA  (2 verbos poco frecuentes)
   * ============================================================ */
  lie:        { base: "lie",        past: "lied",       participle: "lied",       priority: "very-low", es: "mentir" },
  light:      { base: "light",      past: "lit",        participle: "lit",        priority: "very-low", es: "encender" }
};

/* Compatibilidad con módulos (por si más adelante se usa bundler) */
if (typeof module !== "undefined" && module.exports) {
  module.exports = IRREGULAR_VERBS;
}