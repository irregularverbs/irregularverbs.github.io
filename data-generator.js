/**
 * IRREGULARS — Generador de ejercicios contextuales
 * ------------------------------------------------
 * Genera >= 5.000 frases únicas a partir de IRREGULAR_VERBS.
 * No produce variaciones mecánicas: cada frase tiene contexto real.
 *
 * Estructura de salida de cada ejercicio:
 * {
 *   id:         number,
 *   verb:       "go",
 *   type:       "past" | "participle",
 *   answer:     "went",
 *   sentence:   "I ___ (go) to the beach yesterday.",
 *   es:         "ir",
 *   priority:   "high"
 * }
 *
 * Ampliar el contenido:
 *   - Añadir verbos en data-verbs.js  -> se generan solos.
 *   - Añadir entradas a COMPLEMENTS   -> más variedad por verbo.
 *   - Añadir plantillas a TEMPLATES   -> más estructuras sintácticas.
 */

/* ============================================================
 *  1. SUJETOS POR PERSONA GRAMATICAL
 *     (para concordancia correcta con have/has y con el auxiliar)
 * ============================================================ */
const SUBJECTS = {
  first:  ["I"],

  third:  [
    "She", "He", "My sister", "My brother", "My father", "My mother",
    "My best friend", "The teacher", "The manager", "The doctor",
    "The student", "My neighbor", "The chef", "The pilot", "The writer",
    "The engineer", "The singer", "My grandmother", "My grandfather",
    "The coach", "Laura", "Daniel", "Emma", "Oliver", "Sophie",
    "James", "Mia", "Noah", "Chloe", "Ethan"
  ],

  plural: [
    "We", "They", "My friends", "My parents", "The students", "The players",
    "The workers", "My cousins", "The children", "The tourists",
    "The customers", "My colleagues", "The neighbors", "The teachers",
    "The musicians", "The athletes", "The engineers", "The chefs",
    "The doctors", "The drivers"
  ]
};

/* ============================================================
 *  2. COMPLEMENTOS POR VERBO
 *     Cada verbo tiene sus propios complementos coherentes.
 *     Formato: { past: [...], participle: [...] }
 * ============================================================ */
const COMPLEMENTS = {
  /* ---------- PRIORIDAD ALTA ---------- */
  be: {
    past:       ["very tired", "at home", "at the office", "in a good mood", "at the beach", "late for class", "really happy", "at the station", "on vacation", "with my family"],
    participle: ["to London", "to Paris", "to Japan", "to New York", "to Rome", "to that restaurant", "to the mountains", "abroad", "to the countryside", "to Berlin"]
  },
  have: {
    past:       ["a great idea", "breakfast", "a lot of fun", "a long day", "a serious talk", "lunch with friends", "a terrible headache", "some free time", "a good reason", "a big surprise"],
    participle: ["many chances", "a lot of practice", "great results", "enough time", "the same problem", "three cups of coffee", "a wonderful experience", "some bad luck", "great success", "a few doubts"]
  },
  do: {
    past:       ["the homework", "the dishes", "the laundry", "some exercise", "the shopping", "a good job", "the cleaning", "the project", "some research", "the cooking"],
    participle: ["all the tasks", "the housework", "a great job", "the right thing", "everything on time", "more than expected", "the impossible", "all the paperwork", "the final report", "some serious work"]
  },
  say: {
    past:       ["hello", "goodbye", "the truth", "yes", "no", "nothing", "a few words", "thank you", "sorry", "something strange"],
    participle: ["that many times", "the same thing", "a white lie", "everything", "the right words", "nothing about it", "too much", "the truth", "something important", "goodbye"]
  },
  go: {
    past:       ["to school", "to the beach", "home", "to the market", "to the gym", "to the park", "to the cinema", "to work", "to the supermarket", "to a party"],
    participle: ["to London", "to Italy", "abroad", "to the mountains", "to that restaurant", "to Japan", "to the coast", "to New York", "to the countryside", "to Paris"]
  },
  get: {
    past:       ["a new phone", "a good grade", "a gift", "some help", "a cold", "a letter", "a promotion", "a new job", "a ticket", "some money"],
    participle: ["a lot of experience", "great results", "a new apartment", "a second chance", "bad news", "a fresh start", "many awards", "a nice surprise", "the right answer", "some good advice"]
  },
  make: {
    past:       ["a cake", "a mistake", "a decision", "dinner", "a plan", "a phone call", "a sandwich", "a mess", "a promise", "a great effort"],
    participle: ["a decision", "a lot of money", "a real difference", "serious progress", "a big mistake", "a good impression", "a new friend", "a strong case", "the right choice", "an interesting point"]
  },
  know: {
    past:       ["the answer", "her name", "the truth", "the way", "the rules", "the story", "the reason", "the city", "the recipe", "the problem"],
    participle: ["him for years", "her since school", "the truth all along", "that place very well", "the answer all along", "his family for a long time", "the reason already", "the whole story", "the city well", "the secret"]
  },
  think: {
    past:       ["about it", "carefully", "twice", "a lot", "the same way", "positively", "out loud", "hard", "for a moment", "about you"],
    participle: ["about this for days", "carefully", "the same thing many times", "about it constantly", "about the future", "seriously", "about that decision", "about the offer", "about the plan", "about everything"]
  },
  take: {
    past:       ["the bus", "a taxi", "some photos", "a break", "notes", "the train", "a walk", "the keys", "a day off", "care of it"],
    participle: ["many photos", "the wrong turn", "a lot of risks", "three flights", "the lead", "responsibility", "good care of it", "several days off", "the right path", "a big decision"]
  },
  see: {
    past:       ["a great film", "an old friend", "something strange", "the news", "a beautiful sunset", "him at the party", "a doctor", "that show", "the accident", "the surprise"],
    participle: ["that movie", "her before", "the same problem", "this many times", "better days", "the light", "the whole story", "the result", "worse situations", "him around"]
  },
  come: {
    past:       ["to the party", "back home", "very late", "to visit us", "to the meeting", "to my rescue", "by car", "to the wedding", "with bad news", "to apologize"],
    participle: ["to this city", "to that restaurant", "this far", "to the same conclusion", "back many times", "to the office", "to the meeting", "to this place", "to Italy", "across the truth"]
  },
  give: {
    past:       ["me a gift", "a great speech", "a hand", "the keys", "some advice", "him a chance", "the money back", "a hug", "a good reason", "a warning"],
    participle: ["a lot of help", "everything to us", "him many chances", "the same excuse", "all my energy", "an honest answer", "great advice", "a second thought", "some good ideas", "my full support"]
  },
  find: {
    past:       ["the keys", "a wallet", "the solution", "a new path", "some money", "the truth", "a treasure", "him at home", "a good deal", "the missing file"],
    participle: ["the solution", "a better way", "the answer", "new friends", "a great place", "what I was looking for", "a serious problem", "the perfect gift", "some strange clues", "the truth"]
  },
  tell: {
    past:       ["me a story", "the truth", "a joke", "her the news", "nothing", "a lie", "him the reason", "us everything", "the whole plan", "a secret"],
    participle: ["me everything", "the same story", "the truth", "her the news", "a funny joke", "him the reason", "so many lies", "something important", "all the details", "a secret"]
  },
  feel: {
    past:       ["tired", "much better", "nervous", "sick", "proud", "excited", "worried", "relaxed", "very happy", "surprised"],
    participle: ["like this before", "better lately", "so proud", "very tired", "more confident", "like a new person", "stronger than ever", "the same way", "a bit worried", "more energetic"]
  },
  leave: {
    past:       ["the house", "early", "the party", "the office", "a message", "the door open", "some money", "the car at home", "the lights on", "my umbrella"]
  ,
    participle: ["the door open", "some work unfinished", "the keys at home", "the office early", "many messages", "the window open", "the light on", "the tap running", "the house empty", "the bill unpaid"]
  },
  put: {
    past:       ["the book on the table", "the keys in the bag", "the milk in the fridge", "my shoes outside", "some sugar in the coffee", "the picture on the wall", "the money in the drawer", "the flowers in a vase", "the letter in the envelope", "the bag on the floor"],
    participle: ["everything in order", "the toys away", "the plates on the table", "the children to bed", "a lot of effort into it", "the files in the folder", "some money aside", "the plan into action", "the clothes in the wardrobe", "the record straight"]
  },
  bring: {
    past:       ["some snacks", "my umbrella", "good news", "the bill", "a gift", "a friend", "some water", "the children", "a camera", "two coffees"],
    participle: ["good news", "a lot of joy", "the wrong papers", "some questions", "too many problems", "a special gift", "the right tools", "great memories", "honor to the family", "the whole team"]
  },
  buy: {
    past:       ["a new jacket", "some fruit", "a car", "a coffee", "a present", "two tickets", "some bread", "a phone", "a bicycle", "a new laptop"],
    participle: ["a new car", "that jacket", "the wrong shoes", "too many things", "a nice gift", "a second phone", "some groceries", "a big house", "two tickets already", "the whole set"]
  },
  read: {
    past:       ["a great book", "the news", "an article", "the instructions", "her message", "the report", "a short story", "the menu", "two pages", "a poem"],
    participle: ["that novel", "the whole report", "her emails", "all the chapters", "that article", "the instructions carefully", "many books this year", "the terms carefully", "his message twice", "everything already"]
  },
  run: {
    past:       ["in the park", "five kilometers", "to catch the bus", "a marathon", "in the rain", "around the block", "very fast", "up the hill", "to the station", "with the ball"],
    participle: ["a marathon", "a full race", "in the rain before", "many kilometers", "this route", "for hours", "against the best", "in this city", "too many times", "out of time"]
  },
  eat: {
    past:       ["pizza", "too much", "a sandwich", "some fruit", "at the restaurant", "breakfast early", "a big cake", "sushi", "dinner with friends", "the whole cake"],
    participle: ["sushi", "there many times", "a lot today", "strange food", "the same thing", "too much sugar", "breakfast already", "some great dishes", "at that place", "nothing yet"]
  },
  drink: {
    past:       ["coffee", "a lot of water", "some juice", "tea", "two glasses of milk", "a beer", "a smoothie", "three cups of coffee", "lemonade", "hot chocolate"],
    participle: ["too much coffee", "enough water", "some good wine", "three cups today", "that tea", "too many sodas", "a lot of juice", "only water", "some strange drinks", "the whole bottle"]
  },
  write: {
    past:       ["a letter", "a long email", "a poem", "a short story", "her name", "a note", "a postcard", "three pages", "a message", "a list"],
    participle: ["three pages", "a novel", "many emails", "that letter", "the report", "several songs", "a long message", "the whole chapter", "some notes", "a good essay"]
  },
  speak: {
    past:       ["to the manager", "English", "with her", "loudly", "about the problem", "on the phone", "to the class", "in public", "to the police", "very clearly"],
    participle: ["to her many times", "English at work", "in public before", "to the manager", "about this", "the truth", "with the team", "at many events", "only English", "against the idea"]
  },
  break: {
    past:       ["a glass", "his phone", "the rules", "a window", "the silence", "a promise", "the record", "the chair", "a plate", "the news"],
    participle: ["the rules", "a promise", "his phone", "the silence", "the record", "the window", "the agreement", "a leg", "the law", "two plates"]
  },
  sleep: {
    past:       ["very well", "only four hours", "on the sofa", "late", "outside", "deeply", "without dreaming", "until noon", "in a hotel", "through the storm"],
    participle: ["badly lately", "in that bed", "through an earthquake", "on a plane", "eight hours straight", "outside before", "very little", "too much", "in this room", "enough"]
  },
  teach: {
    past:       ["English", "us a lesson", "history", "the class", "mathematics", "at that school", "grammar", "science", "in a small town", "art for years"],
    participle: ["English", "for many years", "at that school", "the same class", "many students", "abroad", "here before", "important lessons", "three subjects", "that subject"]
  },
  understand: {
    past:       ["the lesson", "the problem", "my point", "the question", "his feelings", "the reason", "the rule", "the assignment", "the joke", "the situation"],
    participle: ["everything", "the situation", "the whole story", "her decision", "the problem well", "the instructions", "the concept", "his point", "the main idea", "the warning"]
  },

  /* ---------- PRIORIDAD MEDIA ---------- */
  begin:      { past: ["the project", "to study", "the meeting", "her speech", "the course", "to cry", "the journey", "the game", "to laugh", "work early"], participle: ["a new course", "the project already", "a new life", "the meeting", "the procedure", "to understand", "a new chapter", "the journey", "a new business", "the healing"] },
  become:     { past: ["a doctor", "very popular", "a teacher", "famous", "a better person", "a manager", "quiet", "a real success", "stronger", "an engineer"], participle: ["much stronger", "a real expert", "famous", "a good friend", "a different person", "very successful", "an inspiration", "a leader", "independent", "the new symbol"] },
  catch:      { past: ["the early train", "a cold", "the ball", "the bus", "a fish", "the thief", "the train", "the last bus", "a fly", "the meaning"], participle: ["the criminal", "the wrong idea", "a serious cold", "the moment", "many fish", "the ball twice", "the meaning", "that song", "his attention", "the signal"] },
  choose:     { past: ["the red one", "a different path", "the blue dress", "a great option", "the wrong answer", "an easier task", "the second option", "another route", "a new career", "the cheapest one"], participle: ["a great option", "the wrong person", "the right path", "wisely", "the best solution", "the same thing", "a difficult path", "the long road", "the interesting one", "the whole team"] },
  fall:       { past: ["on the ice", "asleep on the sofa", "from the bike", "in love", "down the stairs", "off the ladder", "deeply asleep", "into the pool", "asleep in class", "on the floor"], participle: ["many times", "asleep", "in love before", "off the same bike", "into the same trap", "in a trap", "several times", "hard", "on the ice", "from the wall"] },
  fly:        { past: ["to Rome", "over the mountains", "to Madrid", "business class", "very high", "with a low-cost company", "to Berlin", "to Lisbon", "over the city", "kites in the park"], participle: ["business class", "many times", "to that city", "over the ocean", "long distances", "with that airline", "on that route", "over the Alps", "too often", "across the world"] },
  forget:     { past: ["my keys", "her birthday", "the password", "his name", "the appointment", "the ticket", "my phone", "the meeting", "the address", "some money"], participle: ["that name", "the password again", "my keys", "her birthday twice", "the appointment", "that day", "the promise", "the meeting", "the address", "everything"] },
  grow:       { past: ["tomatoes in the garden", "a lot last year", "vegetables", "very tall", "stronger", "flowers in the yard", "fast", "a beard", "a business", "impatient"], participle: ["so much since then", "a beautiful garden", "very quickly", "taller", "stronger", "many plants", "a successful company", "a long beard", "wiser", "into an adult"] },
  hear:       { past: ["a strange noise", "the news", "a great song", "his voice", "the alarm", "about it", "a scream", "some music", "the phone ring", "the truth"], participle: ["that song before", "about it already", "many rumors", "that story", "this name", "such a thing", "that joke", "these excuses", "so much noise", "great things"] },
  keep:       { past: ["the receipt", "the secret", "my promise", "the change", "the photo", "the money", "the letter", "the diary", "the phone", "his word"], participle: ["the secret for years", "all the letters", "every promise", "that photo", "his word", "many things", "her diary", "the ticket", "that gift", "the change"] },
  lose:       { past: ["the match", "my wallet", "the keys", "weight", "my phone", "the game", "patience", "my temper", "the ticket", "the bet"], participle: ["too much time", "the keys", "that match", "my patience", "many times", "a lot of money", "the game", "the way", "the same thing", "weight"] },
  meet:       { past: ["an old friend", "the new manager", "her family", "at the café", "at the station", "my future boss", "at a party", "in London", "at the airport", "at work"], participle: ["her twice", "so many people", "his family", "them before", "a lot of interesting people", "the right person", "the new boss", "many celebrities", "an old friend", "someone special"] },
  pay:        { past: ["the bill", "too much", "for the tickets", "in cash", "by card", "the rent", "for dinner", "the fine", "the debt", "for the coffee"], participle: ["the rent already", "too much for that", "in full", "all the bills", "a high price", "for everything", "the debt", "in cash", "half the amount", "the full price"] },
  ride:       { past: ["a bike to school", "a horse", "a motorcycle", "the bus to work", "a taxi home", "on the back of the bike", "through the park", "a scooter", "the train to Paris", "a camel"], participle: ["that bike", "a horse before", "this route", "a motorcycle", "many kilometers", "a camel", "that train", "a scooter around town", "in the rain", "the same bus"] },
  sell:       { past: ["the old car", "lemonade", "the house", "some furniture", "her bike", "the tickets", "his boat", "the paintings", "some clothes", "the shop"], participle: ["all the tickets", "the old house", "many paintings", "his car", "that company", "a lot of products", "the whole stock", "the business", "several cars", "the farm"] },
  send:       { past: ["an email", "a postcard", "the package", "some flowers", "a message", "the documents", "a gift", "the letter", "money", "the invitation"], participle: ["the package already", "many emails", "the report", "several messages", "the documents", "a lot of letters", "the invitation", "the money", "that postcard", "the application"] },
  sing:       { past: ["a beautiful song", "at the wedding", "in the shower", "at the concert", "a lullaby", "with the choir", "the national anthem", "a duet", "on stage", "that song"], participle: ["in a choir before", "that song", "at many events", "on stage", "several songs", "in public", "for the whole crowd", "the anthem", "a beautiful duet", "with great passion"] },
  sit:        { past: ["near the window", "on the bench", "in the garden", "at the café", "next to her", "under a tree", "on the grass", "in silence", "at the front", "in the corner"], participle: ["here for an hour", "in that seat", "on that bench", "in this chair", "there all morning", "at the same table", "in the garden", "in the car", "for too long", "next to her"] },
  stand:      { past: ["in line for an hour", "up to greet us", "near the door", "on the balcony", "under the rain", "at the back", "in front of the class", "by the window", "on a chair", "in silence"], participle: ["there all morning", "in that line", "by that door", "in front of the crowd", "under the rain", "on 