// import {lancaster-stemmer} from 'lancaster-stemmer'

var data;
$.getJSON("intents.json", function (json) {
  data = json; // this will show the info it in firebug console
});

const MAXLEN = 15;
var inputs = [];
var context = {};
var repeat = false;
var get_dict = false;
var psswd = false;
var textbox = $("#textbox");
var input = $("#text-input");
var convo = $("#conversation");
var title_bar = $("#title-bar");
var panel = $("#panel");
var show_acc = false;
var main_bg = $("#container");
var sad_face = $("#sad-face");
var sent_messages = document.getElementsByClassName("sent");
var rec_messages = document.getElementsByClassName("received");
var quotes = [
  "'Spread love everywhere you go. Let no one ever come to you without leaving happier.' -Mother Teresa",
  "'When you reach the end of your rope, tie a knot in it and hang on.' -Franklin D. Roosevelt",
  "'Always remember that you are absolutely unique. Just like everyone else.' -Margaret Mead",
  "'Don't judge each day by the harvest you reap but by the seeds that you plant.' -Robert Louis Stevenson",
  "'The future belongs to those who believe in the beauty of their dreams.' -Eleanor Roosevelt",
  "'Tell me and I forget. Teach me and I remember. Involve me and I learn.' -Benjamin Franklin",
  "'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.' -Helen Keller",
  "'It is during our darkest moments that we must focus to see the light.' -Aristotle",
  "'Whoever is happy will make others happy too.' -Anne Frank",
  "'Do not go where the path may lead, go instead where there is no path and leave a trail.' -Ralph Waldo Emerson",
  "'You will face many defeats in life, but never let yourself be defeated.' -Maya Angelou",
  "'The greatest glory in living lies not in never falling, but in rising every time we fall.' -Nelson Mandela",
  "'In the end, it's not the years in your life that count. It's the life in your years.' -Abraham Lincoln",
  "'Never let the fear of striking out keep you from playing the game.' -Babe Ruth",
  "'Life is either a daring adventure or nothing at all.' -Helen Keller",
  "'Many of life's failures are people who did not realize how close they were to success when they gave up.' -Thomas A. Edison",
  "'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.' -Dr. Seuss",
  "'Success is not final; failure is not fatal: It is the courage to continue that counts.' -Winston S. Churchill",
  "'Success usually comes to those who are too busy to be looking for it.' -Henry David Thoreau",
  "'The way to get started is to quit talking and begin doing.' -Walt Disney",
  "'If you really look closely, most overnight successes took a long time.' -Steve Jobs",
  "'The secret of success is to do the common thing uncommonly well.' -John D. Rockefeller Jr.",
  "'I find that the harder I work, the more luck I seem to have.' -Thomas Jefferson",
  "'The real test is not whether you avoid this failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you learn from it; whether you choose to persevere.' -Barack Obama",
  "'You miss 100% of the shots you don't take.' -Wayne Gretzky",
  "'Whether you think you can or you think you can't, you're right.' -Henry Ford",
  "'I have learned over the years that when one's mind is made up, this diminishes fear.' -Rosa Parks",
  "'I alone cannot change the world, but I can cast a stone across the water to create many ripples.' -Mother Teresa",
  "'Nothing is impossible, the word itself says, ‘I'm possible!'' -Audrey Hepburn",
  "'The question isn't who is going to let me; it's who is going to stop me.' -Ayn Rand",
  "'The only person you are destined to become is the person you decide to be.' -Ralph Waldo Emerson",
  "'The greatest glory in living lies not in never falling, but in rising every time we fall.' -Nelson Mandela",
  "'The way to get started is to quit talking and begin doing.' -Walt Disney",
  "'Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.' -Steve Jobs",
  "'If life were predictable it would cease to be life, and be without flavor.' -Eleanor Roosevelt",
  "'If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.' -Oprah Winfrey",
  "'If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.' -James Cameron",
  "'Life is what happens when you're busy making other plans.' -John Lennon",
];
var labels = [
  "ability",
  "ability_like",
  "abm",
  "age",
  "apperance",
  "arty",
  "ask_ques",
  "bad",
  "bad_words",
  "bad_words_fil",
  "bawal",
  "bike_no",
  "bike_yes",
  "blank_response",
  "boring",
  "cancel",
  "code",
  "code_what",
  "compliment",
  "creator",
  "creator_opinion",
  "creator_opinion_dumb",
  "creator_opinion_grabe",
  "cringe",
  "crush",
  "crush_who",
  "design",
  "do_cats",
  "do_dogs",
  "domination",
  "doubt_creator",
  "doubt_smart",
  "edi",
  "existence",
  "existence_res",
  "existence_res2",
  "fav_anime",
  "fav_food",
  "fav_movie",
  "fav_movie_romcom",
  "fav_song",
  "fav_tv_show",
  "favorites",
  "gae",
  "goodbye",
  "greeting",
  "greeting_fil",
  "hbu",
  "hobby_sport",
  "how",
  "howru",
  "humss",
  "ict",
  "identity",
  "idk",
  "insult",
  "jk",
  "joke",
  "kpop",
  "language",
  "long",
  "long_sad",
  "long_wow",
  "made",
  "mura_ulit",
  "name",
  "name_amp",
  "oh",
  "okay",
  "price",
  "price_lang",
  "res_bad_howru",
  "res_good_howru",
  "sapakan",
  "say",
  "school",
  "school_",
  "smart",
  "soooo",
  "sorry",
  "source_code",
  "speak_tag",
  "stem",
  "sub_greeting",
  "tech",
  "thanks",
  "trashtalk",
  "welcome",
  "wews",
  "what_are",
  "why",
  "why_sad",
  "workout",
  "wow",
  "zatro",
];
var vocab = {
  "!": 1,
  "'m": 2,
  "'re": 3,
  "'s": 4,
  "...": 5,
  "22o": 6,
  500: 7,
  a: 8,
  abl: 9,
  abm: 10,
  about: 11,
  af: 12,
  ag: 13,
  ahhh: 14,
  akin: 15,
  ako: 16,
  alam: 17,
  allow: 18,
  am: 19,
  amp: 20,
  an: 21,
  ang: 22,
  anim: 23,
  ano: 24,
  anong: 25,
  any: 26,
  apocalyps: 27,
  apolog: 28,
  ar: 29,
  army: 30,
  ask: 31,
  aso: 32,
  attitud: 33,
  aw: 34,
  aw8: 35,
  awit: 36,
  awt: 37,
  ay: 38,
  ba: 39,
  bad: 40,
  badminton: 41,
  bakit: 42,
  bang: 43,
  basketbal: 44,
  baw: 45,
  beauty: 46,
  bitch: 47,
  blog: 48,
  bobo: 49,
  body: 50,
  bor: 51,
  bot: 52,
  bye: 53,
  cal: 54,
  can: 55,
  cancel: 56,
  cat: 57,
  caus: 58,
  cod: 59,
  com: 60,
  comp: 61,
  comput: 62,
  cre: 63,
  cring: 64,
  crush: 65,
  curs: 66,
  damn: 67,
  dat: 68,
  design: 69,
  di: 70,
  did: 71,
  diy: 72,
  do: 73,
  dog: 74,
  dumb: 75,
  dumbass: 76,
  dumbfuck: 77,
  e: 78,
  ed: 79,
  entertain: 80,
  ev: 81,
  fac: 82,
  fav: 83,
  favorit: 84,
  filipino: 85,
  fin: 86,
  find: 87,
  fk: 88,
  food: 89,
  footbal: 90,
  for: 91,
  forg: 92,
  from: 93,
  fuck: 94,
  futs: 95,
  g: 96,
  gaano: 97,
  gago: 98,
  gam: 99,
  garb: 100,
  gas: 101,
  gaw: 102,
  gawin: 103,
  gay: 104,
  ge: 105,
  geg: 106,
  get: 107,
  ginagaw: 108,
  ginamit: 109,
  ginaw: 110,
  github: 111,
  go: 112,
  good: 113,
  goodby: 114,
  grab: 115,
  gumaw: 116,
  gusto: 117,
  gwapo: 118,
  hah: 119,
  hahah: 120,
  hahahah: 121,
  handsom: 122,
  hap: 123,
  hav: 124,
  hbu: 125,
  he: 126,
  hel: 127,
  hello: 128,
  her: 129,
  hey: 130,
  hi: 131,
  hind: 132,
  how: 133,
  humss: 134,
  i: 135,
  ict: 136,
  idk: 137,
  if: 138,
  in: 139,
  input: 140,
  is: 141,
  it: 142,
  ito: 143,
  jok: 144,
  k: 145,
  ka: 146,
  kail: 147,
  kal: 148,
  kamust: 149,
  kant: 150,
  kat: 151,
  kataw: 152,
  kay: 153,
  kind: 154,
  kit: 155,
  know: 156,
  ko: 157,
  kpop: 158,
  kup: 159,
  la8r: 160,
  lang: 161,
  langu: 162,
  lat: 163,
  leav: 164,
  less: 165,
  lif: 166,
  lik: 167,
  liv: 168,
  lod: 169,
  long: 170,
  look: 171,
  mad: 172,
  magand: 173,
  magkano: 174,
  magmur: 175,
  magsalit: 176,
  magsalt: 177,
  mahilig: 178,
  malungkot: 179,
  mangyayar: 180,
  mat: 181,
  matalino: 182,
  may: 183,
  me: 184,
  meron: 185,
  mo: 186,
  mong: 187,
  mort: 188,
  movy: 189,
  much: 190,
  mukh: 191,
  must: 192,
  "n't": 193,
  na: 194,
  nagaw: 195,
  nagtatagalog: 196,
  nalang: 197,
  nam: 198,
  nandito: 199,
  nang: 200,
  nangyar: 201,
  nas: 202,
  nc: 203,
  ng: 204,
  nga: 205,
  ni: 206,
  nic: 207,
  nito: 208,
  no: 209,
  noic: 210,
  nop: 211,
  not: 212,
  obob: 213,
  of: 214,
  oh: 215,
  ohhh: 216,
  ok: 217,
  okay: 218,
  old: 219,
  on: 220,
  oo: 221,
  opin: 222,
  ov: 223,
  paano: 224,
  pag: 225,
  pagkain: 226,
  pakyu: 227,
  pal: 228,
  pang: 229,
  panget: 230,
  pass: 231,
  patawad: 232,
  patumbahin: 233,
  photograph: 234,
  piec: 235,
  po: 236,
  pog: 237,
  pre: 238,
  pric: 239,
  program: 240,
  pus: 241,
  putangin: 242,
  quest: 243,
  real: 244,
  reason: 245,
  robby: 246,
  robot: 247,
  romcom: 248,
  routin: 249,
  sa: 250,
  saan: 251,
  sad: 252,
  sakit: 253,
  salam: 254,
  sam: 255,
  sapak: 256,
  say: 257,
  sayo: 258,
  school: 259,
  see: 260,
  sery: 261,
  shit: 262,
  should: 263,
  show: 264,
  si: 265,
  sing: 266,
  sino: 267,
  siy: 268,
  smart: 269,
  so: 270,
  socc: 271,
  someth: 272,
  son: 273,
  song: 274,
  soooo: 275,
  sorry: 276,
  sourc: 277,
  speak: 278,
  stem: 279,
  stupid: 280,
  sukot: 281,
  suntukin: 282,
  sup: 283,
  swim: 284,
  taen: 285,
  tagalog: 286,
  tak: 287,
  talk: 288,
  tangin: 289,
  tanungin: 290,
  tel: 291,
  tf: 292,
  than: 293,
  thank: 294,
  that: 295,
  the: 296,
  thi: 297,
  think: 298,
  thought: 299,
  tingin: 300,
  to: 301,
  took: 302,
  totoo: 303,
  trash: 304,
  tru: 305,
  tv: 306,
  ug: 307,
  ugal: 308,
  ulol: 309,
  up: 310,
  us: 311,
  volleybal: 312,
  wag: 313,
  was: 314,
  wc: 315,
  we: 316,
  websit: 317,
  weh: 318,
  welcom: 319,
  wer: 320,
  wew: 321,
  what: 322,
  when: 323,
  wher: 324,
  who: 325,
  why: 326,
  wil: 327,
  workout: 328,
  world: 329,
  wow: 330,
  wowy: 331,
  writ: 332,
  wtf: 333,
  xd: 334,
  xdd: 335,
  ye: 336,
  yo: 337,
  you: 338,
  yung: 339,
  zatro: 340,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function text_to_int(words) {
  var retArray = [];
  for (let c of words) {
    if (c in vocab) {
      retArray.push(vocab[c]);
    }
  }

  return retArray;
}

function pad(array, maxlen) {
  if (array.length < maxlen) {
    var limit = maxlen - array.length;
    for (let i = 0; i < limit; ++i) {
      array.unshift(0);
    }
  } else if (array.length > maxlen) {
    for (let i = array.length; i > maxlen; --i) {
      array.pop();
    }
  }
  return array;
}

function gen_psswd(length) {
  let characs =
    " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  let pass = [];

  for (let i = 0; i < length; ++i) {
    pass.push(characs[Math.floor(Math.random() * characs.length)]);
  }

  let retPass = pass.toString();
  return retPass.replaceAll(",", "");
}

function show() {
  if (
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    textbox.css({ width: "200vmax" });
  } else {
    convo.css({ overflowY: "auto" });
    textbox.css({ width: "50vmax" });
  }
  for (let message of sent_messages) {
    message.style.transform = "scale(1)";
  }
  for (let message of rec_messages) {
    message.style.transform = "scale(1)";
  }

  input.css({ opacity: "1", visibility: "visible" });
  title_bar.css({ opacity: "1", visibility: "visible" });
}

function shrink() {
  convo.show(1500);
  textbox.css({ width: "50px" });
  convo.css({ overflowY: "hidden" });
  input.css({ opacity: "0", visibility: "hidden" });
  title_bar.css({ opacity: "0", visibility: "hidden" });
  for (let message of sent_messages) {
    message.style.transform = "scale(0)";
  }
  for (let message of rec_messages) {
    message.style.transform = "scale(0)";
  }
}

function submit() {
  let raw_input = input.val().toLowerCase();
  if (raw_input != "") {
    convo.append("<div class='sent clearfix'>" + raw_input + "</div>");

    if (raw_input === "9sdog") {
      $("#mouth").css({
        "border-color": "transparent transparent white transparent",
        "border-radius": "0 0 100px 100px",
      });

      convo.append("<div class='received clearfix'>Finally</div>");
      sad_face.css({ transform: "scale(0)" });
      textbox.css({ transform: "scale(0)" });

      setTimeout(function () {
        textbox.css({ display: "none" });
        sad_face.css({ display: "none" });
        main_bg.css({ background: "rgba(222,205,127,255)", overflowY: "auto" });
        setTimeout(function () {
          document.getElementsByTagName("TITLE")[0].innerHTML = "The Sophia";
          main_bg.append("<div id='container-play'></div>");
          $("#container-play").append("<div id='type-anim'></div>");

          var i = 0;
          var txt = "The Sophia";
          var speed = 175;
          setTimeout(function typeWriter() {
            if (i < txt.length) {
              document.getElementById("type-anim").innerHTML += txt.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
            }
          }, 1000);
          setTimeout(function () {
            $("#container-play").append(
              "<div id='table-play'><hr><strong>Success Rate</strong>	&nbsp	&nbsp	&nbsp Unknown<hr><strong>Attracts</strong>	&nbsp	&nbsp	&nbsp	&nbsp	&nbsp	&nbsp &nbsp Sophia (hopefully)<hr><strong>Requirements</strong>&nbsp &nbsp &nbsp everything you have<hr><strong>Prep Time</strong>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 2-3 months (I think)<hr><strong>Bummers</strong>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Target has a bf (huge bummer right there)<hr></div>"
            );
            setTimeout(function () {
              $("#container-play").append(
                "<div id='title-play'>T H E &nbsp P L A Y</div>"
              );
              $("#container-play").append(
                "<div class='content'><ol><li class='list'>During quarantine, chat with her as much as you can. But don't overdo it. Get to know her more, make her laugh, and show her that you are there.</li></ol></div>"
              );

              $("ol").append(
                "<li class='list'>When face to face classes are available, grab that opportunity to ask her to be her date. Do the m'lady challenge you've talked about. Hopefully she says yes.</li>"
              );

              $("ol").append(
                "<li class='list'>If there is practice for the prom, then be ONLY friendly with her in the said practices. Just be causal, chat with her and don't show a hint of shyness. Make sure she's comfortable as you are with her.</li>"
              );

              $("ol").append(
                "<li class='list'>If prom is nearby, ask her as implicitly as you can if you can go with her to the prom. You don't own any vehicle so you'll be the one to join them. Masyadong makapal ang mukha, pero hey, totally worth it.</li>"
              );

              $("ol").append(
                "<li class='list'>If the said vehicle is a service then fine, but if it's her mom, better. Ask Sophia what her mom likes. And once you go to her house, bring flowers for Sophia and a gift that Sophia said her mom will like. Once you see Sophia, say that she's stunningly beautiful, because let's face it, she always is. </li>"
              );

              $("ol").append(
                "<li class='list'>In the house or in the car, show that you are a gentleman and a respectful man. Smile often and show to her mom that you genuinely care about her daughter.</li>"
              );

              $("ol").append(
                "<li class='list'>At the prom, ask her if you can open the door car for her. It's old-fashioned but sweet.</li>"
              );

              $("ol").append(
                "<li class='list'>As you get out from the car, look at her and offer your elbow and say  &quotM'lady?&quot. She'll grab it guaranteed.</li>"
              );

              $("ol").append(
                "<li class='list'>Escort her inside and just have fun with her.</li>"
              );

              $("ol").append(
                "<li class='list'>If the dance part is nearby, ask her if she will be dancing with other boys. Now, if she says no, then just be with her, but of course space bro. If she says yes, then say to her that you will be dancing with others too. But, make her promise that you will be the one to dance with her at the last slow dance.</li>"
              );

              $("ol").append(
                "<li class='list'>In the slow dance, as you are dancing, say to her, &quotMay I?&quot And put both her hands on your shoulders and hers to your hips</li>"
              );

              $("ol").append(
                "<li class='list'> Look in her eyes, just concentrate on her, and dance slowly to the music.</li>"
              );

              $("ol").append(
                "<li class='list'> In the midst of the dance, while looking at her eyes, smile, and say, &quotSophia, you are legen- wait for it... dary. I'll miss you.&quot</li>"
              );
              $("#container-play").append(
                "<div id='msg' class='content'><hr><br>Sophia, alam kong meron ka ng iba, pero I just want to say what you are to me, one last time. And since yun nga aalis ka na RiSci, baka eto na lang yung chance na magawa ko ito. I know that you are now going to reject me XDD, but it's fine, you are worth failing for. Thank you for everything, and once again, I'll miss you.<br><br><br></div>"
              );
            }, 5000);
          }, 5000);
        }, 1000);
      }, 5000);
    } else if (raw_input == "!zatro") {
      convo.append(
        "<div class='received clearfix'>Hi! So, to basically understand what I am, do you know SimSimi? Well, I am like that, but since I am only made by one, I am not that 'advanced'. So, kausapin mo ako ng parang tao, okay? Just ask me anything!<br><br>COMMANDS:<br><ul><li>!acc - Show accuracy of model in your inputted words</li><br><li>!anim - Toggle background animation</li><br><li>!labels - Show every label that the bot is trained with</li><br><li>!quo - Just say a random quote</li><br><li>!dict - If accuracy is low, the model will get its output from the definition of a random word from your input <small>(Powered by <a href='https://dictionaryapi.dev/'>www.dictionaryapi.dev)</a></small></li><br><li>!cls - Clear textbox</li></ul>Mini Apps: <ul><li>!psswd - Generates a password for you</li><br></ul></div>"
      );
    } else if (raw_input == "!acc") {
      show_acc = true;
      convo.append(
        "<div class='received clearfix'>Accuracy will now be showing</div>"
      );
    } else if (raw_input == "!anim") {
      let squares = $(".squares");
      if (squares.is(":visible")) squares.hide();
      else squares.show();
    } else if (raw_input == "!labels") {
      convo.append("<div class='received clearfix'><ul id='labels'><ul></div>");
      for (let topic of labels) {
        $("#labels").append("<li>" + topic + "</li>");
      }
      convo.append(
        "<div class='received clearfix'>If you want to see the full data, go check out my github and see the <strong>intents.json</strong></div>"
      );
    } else if (raw_input == "!quo") {
      let quote = quotes[Math.floor(Math.random() * quotes.length)];
      quotes.splice(quotes.indexOf(quote), 1);
      convo.append("<div class='received clearfix'>" + quote + "</div>");
    } else if (raw_input == "!cls") {
      let msg = $(".clearfix");
      msg.hide();
    } else if (raw_input == "!dict") {
      convo.append("<div class='received clearfix'>Dictionary enabled</div>");
      get_dict = true;
    } else if (raw_input == "!psswd") {
      psswd = true;
      convo.append(
        "<div class='received clearfix'>Enter length of password</div>"
      );
    } else if (repeat) {
      if (raw_input == "stop") {
        convo.append("<div class='received clearfix'>ok</div>");
        inputs = [];
        repeat = false;
      } else {
        convo.append("<div class='received clearfix'>" + raw_input + "</div>");
      }
    } else {
      var count = 0;
      var response;
      inputs.push(raw_input);

      for (let elem of inputs) {
        if (elem == raw_input) {
          ++count;
        }
      }

      if (count == 5) {
        response =
          "If you repeat that word again, I will repeat every word you say until you say stop";
        convo.append("<div class='received clearfix'>" + response + "</div>");
      } else if (count == 6) {
        repeat = true;
      } else {
        if (psswd) {
          convo.append(
            "<div class='received clearfix'>" + gen_psswd(raw_input) + "</div>"
          );
          psswd = false;
        } else {
          tf.loadLayersModel("model/model.json").then((model) => {
            raw_input = raw_input.split(/\W+/);
            const word_array = [];
            for (let word of raw_input) {
              word_array.push(lancasterStemmer(word));
            }
            const encoded = text_to_int(word_array);
            const new_encoded = pad(encoded, MAXLEN);
            const values = model.predict(tf.tensor2d([new_encoded])).dataSync();
            var arr = Array.from(values);
            var result_index = arr.indexOf(Math.max(...arr));
            var tag = labels[result_index];

            if (arr[result_index] >= 0.8 || !get_dict) {
              for (let tg of data["intents"]) {
                if (tg["tag"] == tag) {
                  if ("context_set" in tg) {
                    context["123"] = tg["context_set"];
                  }
                  if (
                    "context_filter" != tg ||
                    ("123" in context &&
                      "context_filter" in tg &&
                      tg["context_filter"] == context["123"])
                  ) {
                    var responses = tg["responses"];
                  }
                  if (
                    Object.values(context).length == 0 ||
                    ("context_filter" in tg &&
                      !context["123"].includes(tg["context_filter"]))
                  ) {
                    console.log("hello");
                    arr.splice(result_index, 1);
                    result_index = arr.indexOf(Math.max(...arr));
                    tag = labels[result_index];
                    for (let tg of data["intents"]) {
                      if (tg["tag"] == tag) {
                        responses = tg["responses"];
                      }
                    }
                  }
                }
              }
              response =
                responses[Math.floor(Math.random() * responses.length)];
              printResponse();
            } else if (arr[result_index] < 0.8) {
              const getAnswer = async () => {
                const json_response = await $.getJSON(
                  "https://api.dictionaryapi.dev/api/v2/entries/en_US/" +
                    raw_input[Math.floor(Math.random() * raw_input.length)]
                );
                response = await json_response[0].meanings[0].definitions[0]
                  .definition;
                printResponse();
              };

              getAnswer();
            }

            function printResponse() {
              if (response !== undefined)
                convo.append(
                  "<div class='received clearfix'>" + response + "</div>"
                );
              if (show_acc) {
                convo.append(
                  "<div class='received clearfix'><small>" +
                    (arr[result_index] * 100).toFixed(2) +
                    "%</small></div>"
                );
              }

              convo.scrollTop(convo[0].scrollHeight);
            }
          });
        }
      }
    }

    input.val(null);
    convo.scrollTop(convo[0].scrollHeight);
  }
}
if (
  /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  textbox.css({ fontSize: "x-small" });
}

$(document).ready(function () {
  convo.hide();
  sad_face.click(function () {
    shrink();
  });
  textbox.click(function () {
    show();
  });
  input.keypress(function (e) {
    var key = e.which;
    if (key == 13) {
      submit();
    }
  });
  title_bar.click(function () {
    panel.slideToggle("slow");
  });
});
