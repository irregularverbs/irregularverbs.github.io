/* IRREGULARS — Generador de ejercicios (versión robusta y simple) */

(function () {
  "use strict";

  var FIRST  = ["I"];
  var THIRD  = ["She","He","My sister","My brother","My father","My mother","My best friend","The teacher","The manager","The doctor","The student","My neighbor","The chef","The pilot","The writer","The engineer","The singer","My grandmother","My grandfather","The coach","Laura","Daniel","Emma","Oliver","Sophie","James","Mia","Noah","Chloe","Ethan"];
  var PLURAL = ["We","They","My friends","My parents","The students","The players","The workers","My cousins","The children","The tourists","The customers","My colleagues","The neighbors","The teachers","The musicians","The athletes","The engineers","The chefs","The doctors","The drivers"];

  var TIMES = ["yesterday","last night","last week","last month","last year","last summer","last winter","two days ago","three weeks ago","an hour ago","a few minutes ago","on Monday","on Friday morning","in 2019","in the morning","in the afternoon","after lunch","before dinner","at midnight","during the weekend","during the holidays","after the meeting","before the trip","right after class","early in the morning","late at night","that day","that afternoon","that evening","one cold morning"];

  var PART_TIMES = ["many times","several times","before","already","twice","three times","this year","recently","so far","up to now","since 2018","lately","a few times","over the years","countless times","in my life","for years","in a long time"];

  var C = {
    be:["very tired","at home","at the office","in a good mood","at the beach","late for class","really happy","at the station","on vacation","with my family"],
    have:["a great idea","breakfast","a lot of fun","a long day","a serious talk","lunch with friends","a headache","some free time","a good reason","a big surprise"],
    do:["the homework","the dishes","the laundry","some exercise","the shopping","a good job","the cleaning","the project","some research","the cooking"],
    say:["hello","goodbye","the truth","yes","no","nothing","a few words","thank you","sorry","something strange"],
    go:["to school","to the beach","home","to the market","to the gym","to the park","to the cinema","to work","to the supermarket","to a party"],
    get:["a new phone","a good grade","a gift","some help","a cold","a letter","a promotion","a new job","a ticket","some money"],
    make:["a cake","a mistake","a decision","dinner","a plan","a phone call","a sandwich","a mess","a promise","a great effort"],
    know:["the answer","her name","the truth","the way","the rules","the story","the reason","the city","the recipe","the problem"],
    think:["about it","carefully","twice","a lot","the same way","positively","out loud","hard","for a moment","about you"],
    take:["the bus","a taxi","some photos","a break","notes","the train","a walk","the keys","a day off","care of it"],
    see:["a great film","an old friend","something strange","the news","a beautiful sunset","him at the party","a doctor","that show","the accident","the surprise"],
    come:["to the party","back home","very late","to visit us","to the meeting","to my rescue","by car","to the wedding","with bad news","to apologize"],
    give:["me a gift","a great speech","a hand","the keys","some advice","him a chance","the money back","a hug","a good reason","a warning"],
    find:["the keys","a wallet","the solution","a new path","some money","the truth","a treasure","him at home","a good deal","the missing file"],
    tell:["me a story","the truth","a joke","her the news","nothing","a lie","him the reason","us everything","the whole plan","a secret"],
    feel:["tired","much better","nervous","sick","proud","excited","worried","relaxed","very happy","surprised"],
    leave:["the house","early","the party","the office","a message","the door open","some money","the car at home","the lights on","my umbrella"],
    put:["the book on the table","the keys in the bag","the milk in the fridge","my shoes outside","the picture on the wall","the money in the drawer","the flowers in a vase","the letter in the envelope","the bag on the floor","the phone on the desk"],
    bring:["some snacks","my umbrella","good news","the bill","a gift","a friend","some water","the children","a camera","two coffees"],
    buy:["a new jacket","some fruit","a car","a coffee","a present","two tickets","some bread","a phone","a bicycle","a new laptop"],
    read:["a great book","the news","an article","the instructions","her message","the report","a short story","the menu","two pages","a poem"],
    run:["in the park","five kilometers","to catch the bus","a marathon","in the rain","around the block","very fast","up the hill","to the station","with the ball"],
    eat:["pizza","too much","a sandwich","some fruit","at the restaurant","breakfast early","a big cake","sushi","dinner with friends","the whole cake"],
    drink:["coffee","a lot of water","some juice","tea","two glasses of milk","a beer","a smoothie","three cups of coffee","lemonade","hot chocolate"],
    write:["a letter","a long email","a poem","a short story","her name","a note","a postcard","three pages","a message","a list"],
    speak:["to the manager","English","with her","loudly","about the problem","on the phone","to the class","in public","to the police","very clearly"],
    break:["a glass","his phone","the rules","a window","the silence","a promise","the record","the chair","a plate","the news"],
    sleep:["very well","only four hours","on the sofa","late","outside","deeply","without dreaming","until noon","in a hotel","through the storm"],
    teach:["English","us a lesson","history","the class","mathematics","at that school","grammar","science","in a small town","art for years"],
    understand:["the lesson","the problem","my point","the question","his feelings","the reason","the rule","the assignment","the joke","the situation"],
    begin:["the project","to study","the meeting","her speech","the course","to cry","the journey","the game","to laugh","work early"],
    become:["a doctor","very popular","a teacher","famous","a better person","a manager","quiet","a real success","stronger","an engineer"],
    catch:["the early train","a cold","the ball","the bus","a fish","the thief","the train","the last bus","a fly","the meaning"],
    choose:["the red one","a different path","the blue dress","a great option","the wrong answer","an easier task","the second option","another route","a new career","the cheapest one"],
    fall:["on the ice","asleep on the sofa","from the bike","in love","down the stairs","off the ladder","deeply asleep","into the pool","asleep in class","on the floor"],
    fly:["to Rome","over the mountains","to Madrid","business class","very high","to Berlin","to Lisbon","over the city","kites in the park","to Paris"],
    forget:["my keys","her birthday","the password","his name","the appointment","the ticket","my phone","the meeting","the address","some money"],
    grow:["tomatoes in the garden","a lot last year","vegetables","very tall","stronger","flowers in the yard","fast","a beard","a business","impatient"],
    hear:["a strange noise","the news","a great song","his voice","the alarm","about it","a scream","some music","the phone ring","the truth"],
    keep:["the receipt","the secret","my promise","the change","the photo","the money","the letter","the diary","the phone","his word"],
    lose:["the match","my wallet","the keys","weight","my phone","the game","patience","my temper","the ticket","the bet"],
    meet:["an old friend","the new manager","her family","at the cafe","at the station","my future boss","at a party","in London","at the airport","at work"],
    pay:["the bill","too much","for the tickets","in cash","by card","the rent","for dinner","the fine","the debt","for the coffee"],
    ride:["a bike to school","a horse","a motorcycle","the bus to work","a taxi home","through the park","a scooter","the train to Paris","a camel","around the lake"],
    sell:["the old car","lemonade","the house","some furniture","her bike","the tickets","his boat","the paintings","some clothes","the shop"],
    send:["an email","a postcard","the package","some flowers","a message","the documents","a gift","the letter","money","the invitation"],
    sing:["a beautiful song","at the wedding","in the shower","at the concert","a lullaby","with the choir","the national anthem","a duet","on stage","that song"],
    sit:["near the window","on the bench","in the garden","at the cafe","next to her","under a tree","on the grass","in silence","at the front","in the corner"],
    stand:["in line for an hour","up to greet us","near the door","on the balcony","under the rain","at the back","in front of the class","by the window","on a chair","in silence"],
    swim:["in the sea","across the lake","in the pool","with the fish","very fast","against the current","in the river","underwater","at night","for an hour"],
    wear:["a blue dress","a funny hat","a black suit","glasses","a red coat","a nice perfume","sports shoes","a tie","a costume","my new jeans"],
    win:["the competition","a small prize","the match","first place","a medal","the lottery","the race","the game","a big award","the bet"],
    beat:["the other team","the record","the champion","all the players","the enemy","my own record","the rival","the clock","the eggs","the mixture"],
    bite:["into the apple","his tongue","her nails","the sandwich","the dog","the cake","his lip","the fruit","the biscuit","the cheese"],
    blow:["out the candles","the whistle","the balloon","the kiss","strong winds","the leaves","smoke rings","the horn","the fire","soap bubbles"],
    build:["a small house","a sandcastle","a bridge","a new app","a business","a wall","a model ship","a website","a shelter","a fence"],
    cost:["too much","a fortune","only ten euros","a lot of money","three hundred dollars","less than expected","almost nothing","the same as before","a small fortune","more than planned"],
    cut:["the bread","his finger","the paper","the vegetables","some flowers","the cake","the rope","the grass","the onion","the cheese"],
    draw:["a nice picture","a map","a portrait","a line","some cartoons","a house","a flower","a graph","her attention","the curtains"],
    drive:["to the coast","very carefully","to the airport","through the city","for six hours","to work","to the mountains","back home","at night","in the rain"],
    fight:["for justice","in a competition","for the title","the fire","against the wind","his fear","for freedom","with his brother","against the best","back"],
    hang:["the picture","the coat","the lights","the laundry","the mirror","some decorations","the flag","the curtains","the plants","the painting"],
    hide:["the gift","behind the door","the money","under the bed","the truth","his feelings","the key","the letter","the evidence","the chocolate"],
    hit:["the ball hard","the target","the ground","the brakes","his head","the window","the jackpot","the drum","the wall","the road"],
    hold:["the baby","a meeting","the door","her hand","the rope","his breath","the umbrella","the key","the record","the trophy"],
    hurt:["his knee","my feelings","her back","his arm","no one","the dog","himself","his shoulder","nobody","his leg"],
    lend:["me a book","him some money","her a pen","us his car","the tools","his jacket","some clothes","his bike","me his phone","the notes"],
    let:["the children play","the door open","the dog out","her decide","the cat in","the fire burn","his hair grow","the chance pass","the water run","her speak"],
    mean:["something different","no harm","a lot to me","the opposite","what he said","nothing bad","a great deal","the same thing","serious trouble","a warning"],
    ring:["the bell","me twice","the doorbell","the alarm","his parents","the office","very loudly","the number","the phone","the school bell"],
    rise:["early","at six o'clock","slowly","to the occasion","from the chair","against expectations","above the clouds","quickly","from the ashes","to the challenge"],
    shine:["brightly","at the concert","in the sun","like a star","at the party","on stage","through the clouds","in the dark","with joy","at the event"],
    shoot:["a great photo","the ball","a video","at the target","some scenes","the arrow","a documentary","a goal","in the dark","the gun"],
    show:["me the way","his new project","the photos","the results","her the city","the tickets","the damage","his talent","the report","the way out"],
    shut:["the door","the window","the shop","his eyes","the laptop","the gate","the box","the curtains","the drawer","the door quietly"],
    spend:["the weekend at home","too much money","two hours there","the night studying","a lot of time","the day with family","some money on clothes","three weeks abroad","the whole afternoon","his salary"],
    steal:["my bike","the money","her bag","his wallet","the show","the idea","the car","the jewels","the plans","the painting"],
    tear:["the paper","his shirt","the envelope","the page","her dress","the letter","the poster","the ticket","the cloth","the bag"],
    throw:["the ball","the keys","a stone","the paper","the stick","a party","the trash","the coin","the frisbee","the bottle"],
    wake:["early","at dawn","late","suddenly","to the alarm","by the noise","very late","in the middle of the night","before the sunrise","to a strange sound"],
    lie:["to his parents","about the test","to the police","to her friend","on his CV","about the money","to the teacher","in court","about everything","to the boss"],
    light:["a candle","the fire","the match","the room","the fireplace","the torch","a cigarette","the path","the gas","the lamp"]
  };

  function pick(arr, i) {
    return arr[((i % arr.length) + arr.length) % arr.length];
  }

  function isThird(s) {
    for (var i = 0; i < THIRD.length; i++) if (THIRD[i] === s) return true;
    return false;
  }

  function generate() {
    var list = [];
    var seen = {};
    var id = 1;
    var TARGET = 30;

    var verbs = Object.keys(IRREGULAR_VERBS);

    for (var v = 0; v < verbs.length; v++) {
      var verb = verbs[v];
      var info = IRREGULAR_VERBS[verb];
      var comp = C[verb] || ["something"];

      // ---- PASADO ----
      var attempts = 0, generated = 0;
      while (generated < TARGET && attempts < TARGET * 10) {
        attempts++;
        var s, subjIdx = attempts % 3;
        if (subjIdx === 0)      s = pick(THIRD,  id + attempts);
        else if (subjIdx === 1) s = pick(FIRST,  id + attempts);
        else                    s = pick(PLURAL, id + attempts);

        var c  = pick(comp,   attempts + verb.length);
        var t  = pick(TIMES,  id * 3 + attempts);

        var variants = [
          s + " ___ (" + verb + ") " + c + " " + t + ".",
          t.charAt(0).toUpperCase() + t.slice(1) + ", " + s + " ___ (" + verb + ") " + c + ".",
          s + " ___ (" + verb + ") " + c + ".",
          "After everything, " + s + " ___ (" + verb + ") " + c + ".",
          s + " ___ (" + verb + ") " + c + ", and everyone noticed."
        ];
        var sentence = variants[attempts % variants.length];
        var hash = "P|" + sentence;
        if (seen[hash]) continue;
        seen[hash] = true;

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

      // ---- PARTICIPIO ----
      attempts = 0; generated = 0;
      while (generated < TARGET && attempts < TARGET * 10) {
        attempts++;
        var s2, idx2 = attempts % 3;
        if (idx2 === 0)      s2 = pick(THIRD,  id + attempts * 2);
        else if (idx2 === 1) s2 = pick(FIRST,  id + attempts * 2);
        else                 s2 = pick(PLURAL, id + attempts * 2);

        var c2 = pick(comp,        attempts + verb.length * 2);
        var t2 = pick(PART_TIMES,  id + attempts);
        var aux = isThird(s2) ? "has" : "have";

        var variants2 = [
          s2 + " " + aux + " ___ (" + verb + ") " + c2 + " " + t2 + ".",
          s2 + " " + aux + " never ___ (" + verb + ") " + c2 + " before.",
          s2 + " " + aux + " ___ (" + verb + ") " + c2 + ", and everyone is amazed.",
          "By now, " + s2 + " " + aux + " ___ (" + verb + ") " + c2 + "."
        ];
        var sentence2 = variants2[attempts % variants2.length];
        var hash2 = "Q|" + sentence2;
        if (seen[hash2]) continue;
        seen[hash2] = true;

        list.push({
          id: id++,
          verb: verb,
          type: "participle",
          answer: info.participle,
          altAnswers: [info.participle],
          sentence: sentence2,
          es: info.es,
          priority: info.priority
        });
        generated++;
      }
    }

    return list;
  }

  window.ALL_EXERCISES = generate();
  console.log("[IRREGULARS] Ejercicios generados:", window.ALL_EXERCISES.length);
})();