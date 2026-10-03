/**
 * IRREGULARS — Generador de ejercicios contextuales
 * ------------------------------------------------
 * Genera >= 5.000 frases únicas a partir de IRREGULAR_VERBS.
 */

/* ============================================================
   SUJETOS
   ============================================================ */
const SUBJECTS = {
  first: ["I"],
  third: [
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
   COMPLEMENTOS POR VERBO
   ============================================================ */
const COMPLEMENTS = {
  be: {
    past: ["very tired", "at home", "at the office", "in a good mood", "at the beach", "late for class", "really happy", "at the station", "on vacation", "with my family"],
    participle: ["to London", "to Paris", "to Japan", "to New York", "to Rome", "to that restaurant", "to the mountains", "abroad", "to the countryside", "to Berlin"]
  },
  have: {
    past: ["a great idea", "breakfast", "a lot of fun", "a long day", "a serious talk", "lunch with friends", "a terrible headache", "some free time", "a good reason", "a big surprise"],
    participle: ["many chances", "a lot of practice", "great results", "enough time", "the same problem", "three cups of coffee", "a wonderful experience", "some bad luck", "great success", "a few doubts"]
  },
  do: {
    past: ["the homework", "the dishes", "the laundry", "some exercise", "the shopping", "a good job", "the cleaning", "the project", "some research", "the cooking"],
    participle: ["all the tasks", "the housework", "a great job", "the right thing", "everything on time", "more than expected", "the impossible", "all the paperwork", "the final report", "some serious work"]
  },
  say: {
    past: ["hello", "goodbye", "the truth", "yes", "no", "nothing", "a few words", "thank you", "sorry", "something strange"],
    participle: ["that many times", "the same thing", "a white lie", "everything", "the right words", "nothing about it", "too much", "the truth", "something important", "goodbye"]
  },
  go: {
    past: ["to school", "to the beach", "home", "to the market", "to the gym", "to the park", "to the cinema", "to work", "to the supermarket", "to a party"],
    participle: ["to London", "to Italy", "abroad", "to the mountains", "to that restaurant", "to Japan", "to the coast", "to New York", "to the countryside", "to Paris"]
  },
  get: {
    past: ["a new phone", "a good grade", "a gift", "some help", "a cold", "a letter", "a promotion", "a new job", "a ticket", "some money"],
    participle: ["a lot of experience", "great results", "a new apartment", "a second chance", "bad news", "a fresh start", "many awards", "a nice surprise", "the right answer", "some good advice"]
  },
  make: {
    past: ["a cake", "a mistake", "a decision", "dinner", "a plan", "a phone call", "a sandwich", "a mess", "a promise", "a great effort"],
    participle: ["a decision", "a lot of money", "a real difference", "serious progress", "a big mistake", "a good impression", "a new friend", "a strong case", "the right choice", "an interesting point"]
  },
  know: {
    past: ["the answer", "her name", "the truth", "the way", "the rules", "the story", "the reason", "the city", "the recipe", "the problem"],
    participle: ["him for years", "her since school", "the truth all along", "that place very well", "the answer all along", "his family for a long time", "the reason already", "the whole story", "the city well", "the secret"]
  },
  think: {
    past: ["about it", "carefully", "twice", "a lot", "the same way", "positively", "out loud", "hard", "for a moment", "about you"],
    participle: ["about this for days", "carefully", "the same thing many times", "about it constantly", "about the future", "seriously", "about that decision", "about the offer", "about the plan", "about everything"]
  },
  take: {
    past: ["the bus", "a taxi", "some photos", "a break", "notes", "the train", "a walk", "the keys", "a day off", "care of it"],
    participle: ["many photos", "the wrong turn", "a lot of risks", "three flights", "the lead", "responsibility", "good care of it", "several days off", "the right path", "a big decision"]
  },
  see: {
    past: ["a great film", "an old friend", "something strange", "the news", "a beautiful sunset", "him at the party", "a doctor", "that show", "the accident", "the surprise"],
    participle: ["that movie", "her before", "the same problem", "this many times", "better days", "the light", "the whole story", "the result", "worse situations", "him around"]
  },
  come: {
    past: ["to the party", "back home", "very late", "to visit us", "to the meeting", "to my rescue", "by car", "to the wedding", "with bad news", "to apologize"],
    participle: ["to this city", "to that restaurant", "this far", "to the same conclusion", "back many times", "to the office", "to the meeting", "to this place", "to Italy", "across the truth"]
  },
  give: {
    past: ["me a gift", "a great speech", "a hand", "the keys", "some advice", "him a chance", "the money back", "a hug", "a good reason", "a warning"],
    participle: ["a lot of help", "everything to us", "him many chances", "the same excuse", "all my energy", "an honest answer", "great advice", "a second thought", "some good ideas", "my full support"]
  },
  find: {
    past: ["the keys", "a wallet", "the solution", "a new path", "some money", "the truth", "a treasure", "him at home", "a good deal", "the missing file"],
    participle: ["the solution", "a better way", "the answer", "new friends", "a great place", "what I was looking for", "a serious problem", "the perfect gift", "some strange clues", "the truth"]
  },
  tell: {
    past: ["me a story", "the truth", "a joke", "her the news", "nothing", "a lie", "him the reason", "us everything", "the whole plan", "a secret"],
    participle: ["me everything", "the same story", "the truth", "her the news", "a funny joke", "him the reason", "so many lies", "something important", "all the details", "a secret"]
  },
  feel: {
    past: ["tired", "much better", "nervous", "sick", "proud", "excited", "worried", "relaxed", "very happy", "surprised"],
    participle: ["like this before", "better lately", "so proud", "very tired", "more confident", "like a new person", "stronger than ever", "the same way", "a bit worried", "more energetic"]
  },
  leave: {
    past: ["the house", "early", "the party", "the office", "a message", "the door open", "some money", "the car at home", "the lights on", "my umbrella"],
    participle: ["the door open", "some work unfinished", "the keys at home", "the office early", "many messages", "the window open", "the light on", "the tap running", "the house empty", "the bill unpaid"]
  },
  put: {
    past: ["the book on the table", "the keys in the bag", "the milk in the fridge", "my shoes outside", "some sugar in the coffee", "the picture on the wall", "the money in the drawer", "the flowers in a vase", "the letter in the envelope", "the bag on the floor"],
    participle: ["everything in order", "the toys away", "the plates on the table", "the children to bed", "a lot of effort into it", "the files in the folder", "some money aside", "the plan into action", "the clothes in the wardrobe", "the record straight"]
  },
  bring: {
    past: ["some snacks", "my umbrella", "good news", "the bill", "a gift", "a friend", "some water", "the children", "a camera", "two coffees"],
    participle: ["good news", "a lot of joy", "the wrong papers", "some questions", "too many problems", "a special gift", "the right tools", "great memories", "honor to the family", "the whole team"]
  },
  buy: {
    past: ["a new jacket", "some fruit", "a car", "a coffee", "a present", "two tickets", "some bread", "a phone", "a bicycle", "a new laptop"],
    participle: ["a new car", "that jacket", "the wrong shoes", "too many things", "a nice gift", "a second phone", "some groceries", "a big house", "two tickets already", "the whole set"]
  },
  read: {
    past: ["a great book", "the news", "an article", "the instructions", "her message", "the report", "a short story", "the menu", "two pages", "a poem"],
    participle: ["that novel", "the whole report", "her emails", "all the chapters", "that article", "the instructions carefully", "many books this year", "the terms carefully", "his message twice", "everything already"]
  },
  run: {
    past: ["in the park", "five kilometers", "to catch the bus", "a marathon", "in the rain", "around the block", "very fast", "up the hill", "to the station", "with the ball"],
    participle: ["a marathon", "a full race", "in the rain before", "many kilometers", "this route", "for hours", "against the best", "in this city", "too many times", "out of time"]
  },
  eat: {
    past: ["pizza", "too much", "a sandwich", "some fruit", "at the restaurant", "breakfast early", "a big cake", "sushi", "dinner with friends", "the whole cake"],
    participle: ["sushi", "there many times", "a lot today", "strange food", "the same thing", "too much sugar", "breakfast already", "some great dishes", "at that place", "nothing yet"]
  },
  drink: {
    past: ["coffee", "a lot of water", "some juice", "tea", "two glasses of milk", "a beer", "a smoothie", "three cups of coffee", "lemonade", "hot chocolate"],
    participle: ["too much coffee", "enough water", "some good wine", "three cups today", "that tea", "too many sodas", "a lot of juice", "only water", "some strange drinks", "the whole bottle"]
  },
  write: {
    past: ["a letter", "a long email", "a poem", "a short story", "her name", "a note", "a postcard", "three pages", "a message", "a list"],
    participle: ["three pages", "a novel", "many emails", "that letter", "the report", "several songs", "a long message", "the whole chapter", "some notes", "a good essay"]
  },
  speak: {
    past: ["to the manager", "English", "with her", "loudly", "about the problem", "on the phone", "to the class", "in public", "to the police", "very clearly"],
    participle: ["to her many times", "English at work", "in public before", "to the manager", "about this", "the truth", "with the team", "at many events", "only English", "against the idea"]
  },
  break: {
    past: ["a glass", "his phone", "the rules", "a window", "the silence", "a promise", "the record", "the chair", "a plate", "the news"],
    participle: ["the rules", "a promise", "his phone", "the silence", "the record", "the window", "the agreement", "a leg", "the law", "two plates"]
  },
  sleep: {
    past: ["very well", "only four hours", "on the sofa", "late", "outside", "deeply", "without dreaming", "until noon", "in a hotel", "through the storm"],
    participle: ["badly lately", "in that bed", "through an earthquake", "on a plane", "eight hours straight", "outside before", "very little", "too much", "in this room", "enough"]
  },
  teach: {
    past: ["English", "us a lesson", "history", "the class", "mathematics", "at that school", "grammar", "science", "in a small town", "art for years"],
    participle: ["English", "for many years", "at that school", "the same class", "many students", "abroad", "here before", "important lessons", "three subjects", "that subject"]
  },
  understand: {
    past: ["the lesson", "the problem", "my point", "the question", "his feelings", "the reason", "the rule", "the assignment", "the joke", "the situation"],
    participle: ["everything", "the situation", "the whole story", "her decision", "the problem well", "the instructions", "the concept", "his point", "the main idea", "the warning"]
  },
  begin: {
    past: ["the project", "to study", "the meeting", "her speech", "the course", "to cry", "the journey", "the game", "to laugh", "work early"],
    participle: ["a new course", "the project already", "a new life", "the meeting", "the procedure", "to understand", "a new chapter", "the journey", "a new business", "the healing"]
  },
  become: {
    past: ["a doctor", "very popular", "a teacher", "famous", "a better person", "a manager", "quiet", "a real success", "stronger", "an engineer"],
    participle: ["much stronger", "a real expert", "famous", "a good friend", "a different person", "very successful", "an inspiration", "a leader", "independent", "the new symbol"]
  },
  catch: {
    past: ["the early train", "a cold", "the ball", "the bus", "a fish", "the thief", "the train", "the last bus", "a fly", "the meaning"],
    participle: ["the criminal", "the wrong idea", "a serious cold", "the moment", "many fish", "the ball twice", "the meaning", "that song", "his attention", "the signal"]
  },
  choose: {
    past: ["the red one", "a different path", "the blue dress", "a great option", "the wrong answer", "an easier task", "the second option", "another route", "a new career", "the cheapest one"],
    participle: ["a great option", "the wrong person", "the right path", "wisely", "the best solution", "the same thing", "a difficult path", "the long road", "the interesting one", "the whole team"]
  },
  fall: {
    past: ["on the ice", "asleep on the sofa", "from the bike", "in love", "down the stairs", "off the ladder", "deeply asleep", "into the pool", "asleep in class", "on the floor"],
    participle: ["many times", "asleep", "in love before", "off the same bike", "into the same trap", "in a trap", "several times", "hard", "on the ice", "from the wall"]
  },
  fly: {
    past: ["to Rome", "over the mountains", "to Madrid", "business class", "very high", "with a low-cost company", "to Berlin", "to Lisbon", "over the city", "kites in the park"],
    participle: ["business class", "many times", "to that city", "over the ocean", "long distances", "with that airline", "on that route", "over the Alps", "too often", "across the world"]
  },
  forget: {
    past: ["my keys", "her birthday", "the password", "his name", "the appointment", "the ticket", "my phone", "the meeting", "the address", "some money"],
    participle: ["that name", "the password again", "my keys", "her birthday twice", "the appointment", "that day", "the promise", "the meeting", "the address", "everything"]
  },
  grow: {
    past: ["tomatoes in the garden", "a lot last year", "vegetables", "very tall", "stronger", "flowers in the yard", "fast", "a beard", "a business", "impatient"],
    participle: ["so much since then", "a beautiful garden", "very quickly", "taller", "stronger", "many plants", "a successful company", "a long beard", "wiser", "into an adult"]
  },
  hear: {
    past: ["a strange noise", "the news", "a great song", "his voice", "the alarm", "about it", "a scream", "some music", "the phone ring", "the truth"],
    participle: ["that song before", "about it already", "many rumors", "that story", "this name", "such a thing", "that joke", "these excuses", "so much noise", "great things"]
  },
  keep: {
    past: ["the receipt", "the secret", "my promise", "the change", "the photo", "the money", "the letter", "the diary", "the phone", "his word"],
    participle: ["the secret for years", "all the letters", "every promise", "that photo", "his word", "many things", "her diary", "the ticket", "that gift", "the change"]
  },
  lose: {
    past: ["the match", "my wallet", "the keys", "weight", "my phone", "the game", "patience", "my temper", "the ticket", "the bet"],
    participle: ["too much time", "the keys", "that match", "my patience", "many times", "a lot of money", "the game", "the way", "the same thing", "weight"]
  },
  meet: {
    past: ["an old friend", "the new manager", "her family", "at the café", "at the station", "my future boss", "at a party", "in London", "at the airport", "at work"],
    participle: ["her twice", "so many people", "his family", "them before", "a lot of interesting people", "the right person", "the new boss", "many celebrities", "an old friend", "someone special"]
  },
  pay: {
    past: ["the bill", "too much", "for the tickets", "in cash", "by card", "the rent", "for dinner", "the fine", "the debt", "for the coffee"],
    participle: ["the rent already", "too much for that", "in full", "all the bills", "a high price", "for everything", "the debt", "in cash", "half the amount", "the full price"]
  },
  ride: {
    past: ["a bike to school", "a horse", "a motorcycle", "the bus to work", "a taxi home", "on the back of the bike", "through the park", "a scooter", "the train to Paris", "a camel"],
    participle: ["that bike", "a horse before", "this route", "a motorcycle", "many kilometers", "a camel", "that train", "a scooter around town", "in the rain", "the same bus"]
  },
  sell: {
    past: ["the old car", "lemonade", "the house", "some furniture", "her bike", "the tickets", "his boat", "the paintings", "some clothes", "the shop"],
    participle: ["all the tickets", "the old house", "many paintings", "his car", "that company", "a lot of products", "the whole stock", "the business", "several cars", "the farm"]
  },
  send: {
    past: ["an email", "a postcard", "the package", "some flowers", "a message", "the documents", "a gift", "the letter", "money", "the invitation"],
    participle: ["the package already", "many emails", "the report", "several messages", "the documents", "a lot of letters", "the invitation", "the money", "that postcard", "the application"]
  },
  sing: {
    past: ["a beautiful song", "at the wedding", "in the shower", "at the concert", "a lullaby", "with the choir", "the national anthem", "a duet", "on stage", "that song"],
    participle: ["in a choir before", "that song", "at many events", "on stage", "several songs", "in public", "for the whole crowd", "the anthem", "a beautiful duet", "with great passion"]
  },
  sit: {
    past: ["near the window", "on the bench", "in the garden", "at the café", "next to her", "under a tree", "on the grass", "in silence", "at the front", "in the corner"],
    participle: ["here for an hour", "in that seat", "on that bench", "in this chair", "there all morning", "at the same table", "in the garden", "in the car", "for too long", "next to her"]
  },
  stand: {
    past: ["in line for an hour", "up to greet us", "near the door", "on the balcony", "under the rain", "at the back", "in front of the class", "by the window", "on a chair", "in silence"],
    participle: ["there all morning", "in that line", "by that door", "in front of the crowd", "under the rain", "on that bridge", "next to him", "outside for hours", "at the station", "through it all"]
  },
  swim: {
    past: ["in the sea", "across the lake", "in the pool", "with the fish", "very fast", "against the current", "in the river", "underwater", "at night", "for an hour"],
    participle: ["in this pool", "in the ocean", "many times", "in the lake", "against strong currents", "with dolphins", "here before", "very far", "at this beach", "across that river"]
  },
  wear: {
    past: ["a blue dress", "a funny hat", "a black suit", "glasses", "a red coat", "a nice perfume", "sports shoes", "a tie", "a costume", "my new jeans"],
    participle: ["that coat", "that dress", "the same thing", "these shoes", "a uniform", "glasses for years", "his hat", "expensive clothes", "that ring", "the same jacket"]
  },
  win: {
    past: ["the competition", "a small prize", "the match", "first place", "a medal", "the lottery", "the race", "the game", "a big award", "the bet"],
    participle: ["three medals", "the championship", "several awards", "that game", "the first place", "the lottery", "many matches", "the competition", "the bet", "the title"]
  },
  beat: {
    past: ["the other team", "the record", "the champion", "all the players", "the enemy", "my own record", "the rival", "the clock", "the eggs", "the mixture"],
    participle: ["that team twice", "the record", "the best player", "all the competitors", "the previous champion", "the challenge", "the same team", "every opponent", "the record twice", "the heat"]
  },
  bite: {
    past: ["into the apple", "his tongue", "her nails", "the sandwich", "the dog", "the cake", "his lip", "the fruit", "the biscuit", "the cheese"],
    participle: ["into something hard", "his tongue", "her nails before", "the same apple", "into that cake", "the sandwich", "by a dog", "into the fruit", "his lip", "the whole biscuit"]
  },
  blow: {
    past: ["out the candles", "the whistle", "the balloon", "the kiss", "strong winds", "the leaves", "smoke rings", "the horn", "the fire", "soap bubbles"],
    participle: ["all the balloons", "the candles already", "the whistle", "the roof off", "many bubbles", "his cover", "the opportunity", "the whole house down", "the horn", "the lights"]
  },
  build: {
    past: ["a small house", "a sandcastle", "a bridge", "a new app", "a business", "a wall", "a model ship", "a website", "a shelter", "a fence"],
    participle: ["a solid reputation", "many houses", "a new life", "that bridge", "a strong team", "a great career", "a whole city", "this company", "a nice garden", "several apps"]
  },
  cost: {
    past: ["too much", "a fortune", "only ten euros", "a lot of money", "three hundred dollars", "less than expected", "almost nothing", "the same as before", "a small fortune", "more than planned"],
    participle: ["a lot of money", "us a great deal", "the whole budget", "a small fortune", "nothing so far", "too much already", "several months", "a lot of time", "the same as before", "us the contract"]
  },
  cut: {
    past: ["the bread", "his finger", "the paper", "the vegetables", "some flowers", "the cake", "the rope", "the grass", "the onion", "the cheese"],
    participle: ["the paper carefully", "his finger", "the cake already", "some vegetables", "the rope", "the grass", "the bread", "the onion", "the whole cheese", "my hair"]
  },
  draw: {
    past: ["a nice picture", "a map", "a portrait", "a line", "some cartoons", "a house", "a flower", "a graph", "her attention", "the curtains"],
    participle: ["many sketches", "a plan", "a beautiful portrait", "several cartoons", "the whole map", "a clear line", "a big crowd", "a lot of attention", "the curtains", "some charts"]
  },
  drive: {
    past: ["to the coast", "very carefully", "to the airport", "through the city", "for six hours", "to work", "to the mountains", "back home", "at night", "in the rain"],
    participle: ["this route", "many times", "that car", "long distances", "through the storm", "abroad", "in heavy traffic", "for hours", "only at night", "that truck"]
  },
  fight: {
    past: ["for justice", "in a competition", "for the title", "the fire", "against the wind", "his fear", "for freedom", "with his brother", "against the best", "back"],
    participle: ["many battles", "for this cause", "against fear", "hard", "against the odds", "for the same thing", "his whole life", "against the current", "back", "in many wars"]
  },
  hang: {
    past: ["the picture", "the coat", "the lights", "the laundry", "the mirror", "some decorations", "the flag", "the curtains", "the plants", "the painting"],
    participle: ["the lights", "the laundry", "that picture", "the decorations", "the coat", "everything in place", "the flag", "the curtains", "the plants", "the painting"]
  },
  hide: {
    past: ["the gift", "behind the door", "the money", "under the bed", "the truth", "his feelings", "the key", "the letter", "the evidence", "the chocolate"],
    participle: ["the evidence", "the money", "his feelings for years", "the truth", "the gift", "the whole treasure", "the secret", "the key", "behind the tree", "the surprise"]
  },
  hit: {
    past: ["the ball hard", "the target", "the ground", "the brakes", "his head", "the window", "the jackpot", "the drum", "the wall", "the road"],
    participle: ["a new record", "the target", "the ball hard", "the nail", "the jackpot", "a low point", "the ground", "rock bottom", "the same spot", "the wall"]
  },
  hold: {
    past: ["the baby", "a meeting", "the door", "her hand", "the rope", "his breath", "the umbrella", "the key", "the record", "the trophy"],
    participle: ["that position for years", "the record", "his breath", "many meetings", "the same job", "the trophy", "the lead all race", "the title", "the door open", "the rope"]
  },
  hurt: {
    past: ["his knee", "my feelings", "her back", "his arm", "no one", "the dog", "himself", "his shoulder", "nobody", "his leg"],
    participle: ["no one", "many people", "his knee", "her feelings", "the cause", "the team", "himself", "his arm", "his back", "nobody"]
  },
  lend: {
    past: ["me a book", "him some money", "her a pen", "us his car", "the tools", "his jacket", "some clothes", "his bike", "me his phone", "the notes"],
    participle: ["that novel", "money to friends", "his car before", "many books", "the tools", "his bike", "several things", "his jacket", "money to him", "the notes"]
  },
  let: {
    past: ["the children play", "the door open", "the dog out", "her decide", "the cat in", "the fire burn", "his hair grow", "the chance pass", "the water run", "her speak"],
    participle: ["us decide", "the door open", "the dog out", "the children play", "the chance slip", "the fire burn", "the water run", "the bird go", "him choose", "the moment pass"]
  },
  mean: {
    past: ["something different", "no harm", "a lot to me", "the opposite", "what he said", "nothing bad", "a great deal", "the same thing", "serious trouble", "a warning"],
    participle: ["every word", "no harm", "a lot to her", "the same thing", "serious business", "nothing like that", "a great deal to him", "every sentence", "the exact opposite", "the whole world to me"]
  },
  ring: {
    past: ["the bell", "me twice", "the doorbell", "the alarm", "his parents", "the office", "very loudly", "the number", "the phone", "the school bell"],
    participle: ["the alarm already", "the bell twice", "several times", "her mobile", "the office", "the doorbell", "the same number", "his parents", "the emergency line", "the whole town"]
  },
  rise: {
    past: ["early", "at six o'clock", "slowly", "to the occasion", "from the chair", "against expectations", "above the clouds", "quickly", "from the ashes", "to the challenge"],
    participle: ["sharply", "to the top", "from nothing", "to the occasion", "against all odds", "to the challenge", "above expectations", "from the ashes", "very quickly", "from the ground"]
  },
  shine: {
    past: ["brightly", "at the concert", "in the sun", "like a star", "at the party", "on stage", "through the clouds", "in the dark", "with joy", "at the event"],
    participle: ["on stage before", "in that role", "through it all", "so bright", "at many events", "like a diamond", "on that tour", "in that scene", "brighter than ever", "at the ceremony"]
  },
  shoot: {
    past: ["a great photo", "the ball", "a video", "at the target", "some scenes", "the arrow", "a documentary", "a goal", "in the dark", "the gun"],
    participle: ["many videos", "a great scene", "the winning goal", "several photos", "a whole movie", "at the target", "in the studio", "three goals", "a documentary", "from close range"]
  },
  show: {
    past: ["me the way", "his new project", "the photos", "the results", "her the city", "the tickets", "the damage", "his talent", "the report", "the way out"],
    participle: ["real courage", "the photos", "great progress", "the whole plan", "his talent", "many results", "the way", "the project", "the evidence", "how it works"]
  },
  shut: {
    past: ["the door", "the window", "the shop", "his eyes", "the laptop", "the gate", "the box", "the curtains", "the drawer", "the door quietly"],
    participle: ["the shop already", "the windows", "the door", "his eyes", "the box", "the gate", "the curtains", "the laptop", "the drawer", "everything down"]
  },
  spend: {
    past: ["the weekend at home", "too much money", "two hours there", "the night studying", "a lot of time", "the day with family", "some money on clothes", "three weeks abroad", "the whole afternoon", "his salary"],
    participle: ["hours on this", "too much money", "a lot of time", "the night working", "the whole week", "a fortune on that", "several years abroad", "his savings", "the entire day", "too much energy"]
  },
  steal: {
    past: ["my bike", "the money", "her bag", "his wallet", "the show", "the idea", "the car", "the jewels", "the plans", "the painting"],
    participle: ["my heart", "the money", "the idea", "the show", "his wallet", "the diamond", "the plans", "the whole treasure", "the painting", "the car"]
  },
  tear: {
    past: ["the paper", "his shirt", "the envelope", "the page", "her dress", "the letter", "the poster", "the ticket", "the cloth", "the bag"],
    participle: ["the paper", "his shirt", "the envelope", "the pages", "her dress", "the letter", "the poster", "the ticket", "the cloth", "the whole bag"]
  },
  throw: {
    past: ["the ball", "the keys", "a stone", "the paper", "the stick", "a party", "the trash", "the coin", "the frisbee", "the bottle"],
    participle: ["the ball", "a great party", "many stones", "the keys", "the trash", "the whole thing away", "the frisbee", "some coins", "the bottle", "a spectacular party"]
  },
  wake: {
    past: ["early", "at dawn", "late", "suddenly", "to the alarm", "by the noise", "very late", "in the middle of the night", "before the sunrise", "to a strange sound"],
    participle: ["early", "at dawn", "up too late", "suddenly", "by a loud noise", "in a cold sweat", "to a new reality", "up before the alarm", "to terrible news", "at the right moment"]
  },
  lie: {
    past: ["to his parents", "about the test", "to the police", "to her friend", "on his CV", "about the money", "to the teacher", "in court", "about everything", "to the boss"],
    participle: ["to me before", "about many things", "to his parents", "in court", "on his CV", "about the money", "to the police", "to all of us", "too many times", "about that"]
  },
  light: {
    past: ["a candle", "the fire", "the match", "the room", "the fireplace", "the torch", "a cigarette", "the path", "the gas", "the lamp"],
    participle: ["a candle", "the fire", "the fireplace", "many matches", "the whole room", "the torch", "the candles", "the lamps", "the path", "the gas stove"]
  }
};

/* ============================================================
   TIEMPOS Y PLANTILLAS
   ============================================================ */
const TIME_PAST = [
  "yesterday", "last night", "last week", "last month", "last year",
  "last summer", "last winter", "two days ago", "three weeks ago",
  "an hour ago", "a few minutes ago", "on Monday", "on Friday morning",
  "in 2019", "in the morning", "in the afternoon", "after lunch",
  "before dinner", "at midnight", "during the weekend",
  "during the holidays", "when I was a child", "when we were younger",
  "after the meeting", "before the trip", "right after class",
  "early in the morning", "late at night", "that day", "that afternoon"
];

const PAST_TEMPLATES = [
  "{s} ___ ({v}) {c} {t}.",
  "{t}, {s} ___ ({v}) {c}.",
  "{s} ___ ({v}) {c}, and everyone noticed.",
  "After everything happened, {s} ___ ({v}) {c}.",
  "{s} ___ ({v}) {c}."
];

const PARTICIPLE_TEMPLATES = [
  "{s} {aux} ___ ({v}) {c}.",
  "{s} {aux} never ___ ({v}) {c} before.",
  "{s} {aux} ___ ({v}) {c}, and everyone is amazed.",
  "By now, {s} {aux} ___ ({v}) {c}."
];

/* ============================================================
   HELPERS
   ============================================================ */
function pick(arr, i) {
  return arr[i % arr.length];
}

function subjectPool(key) {
  if (key === "third")  return SUBJECTS.third;
  if (key === "plural") return SUBJECTS.plural;
  return SUBJECTS.first;
}

function auxFor(subject) {
  if (subject === "I" || subject === "We" || subject === "They") return "have";
  const thirdSingulars = [
    "She", "He", "My sister", "My brother", "My father", "My mother",
    "My best friend", "The teacher", "The manager", "The doctor",
    "The student", "My neighbor", "The chef", "The pilot", "The writer",
    "The engineer", "The singer", "My grandmother", "My grandfather",
    "The coach", "Laura", "Daniel", "Emma", "Oliver", "Sophie",
    "James", "Mia", "Noah", "Chloe", "Ethan"
  ];
  return thirdSingulars.includes(subject) ? "has" : "have";
}

/* ============================================================
   GENERADOR PRINCIPAL
   ============================================================ */
function generateExercises() {
  const list = [];
  const seen = new Set();
  let id = 1;
  const TARGET_PER_TYPE = 30;

  Object.keys(IRREGULAR_VERBS).forEach((verb) => {
    const info = IRREGULAR_VERBS[verb];
    const comp = COMPLEMENTS[verb] || { past: ["something"], participle: ["something"] };

    /* ----- PASADO ----- */
    let attempts = 0;
    let generated = 0;
    while (generated < TARGET_PER_TYPE && attempts < TARGET_PER_TYPE * 8) {
      attempts++;
      const subjKey = attempts % 3 === 0 ? "third" : (attempts % 3 === 1 ? "first" : "plural");
      const s = pick(subjectPool(subjKey), id + attempts + verb.length);
      const c = pick(comp.past, attempts + verb.charCodeAt(0));
      const t = pick(TIME_PAST, id * 3 + attempts);
      const tpl = pick(PAST_TEMPLATES, id + attempts);

      const sentence = tpl
        .replace("{s}", s)
        .replace("{v}", verb)
        .replace("{c}", c)
        .replace("{t}", t);

      const hash = "P|" + sentence;
      if (seen.has(hash)) continue;
      seen.add(hash);

      list.push({
        id: id++,
        verb: verb,
        type: "past",
        answer: info.past.split("/")[0],
        altAnswers: info.past.split("/"),
        sentence: sentence,
        es: info.es,
        priority: info.priority
      });
      generated++;
    }

    /* ----- PARTICIPIO ----- */
    attempts = 0;
    generated = 0;
    while (generated < TARGET_PER_TYPE && attempts < TARGET_PER_TYPE * 8) {
      attempts++;
      const subjKey = attempts % 3 === 0 ? "third" : (attempts % 3 === 1 ? "first" : "plural");
      const s = pick(subjectPool(subjKey), id + attempts + verb.length * 2);
      const c = pick(comp.participle, attempts + verb.charCodeAt(0) * 2);
      const tpl = pick(PARTICIPLE_TEMPLATES, id + attempts);
      const aux = auxFor(s);

      const sentence = tpl
        .replace("{s}", s)
        .replace("{v}", verb)
        .replace("{c}", c)
        .replace("{aux}", aux);

      const hash = "Q|" + sentence;
      if (seen.has(hash)) continue;
      seen.add(hash);

      list.push({
        id: id++,
        verb: verb,
        type: "participle",
        answer: info.participle,
        altAnswers: [info.participle],
        sentence: sentence,
        es: info.es,
        priority: info.priority
      });
      generated++;
    }
  });

  return list;
}

/* ============================================================
   EXPORTACIÓN
   ============================================================ */
const ALL_EXERCISES = generateExercises();
console.log("[IRREGULARS] Ejercicios generados:", ALL_EXERCISES.length);