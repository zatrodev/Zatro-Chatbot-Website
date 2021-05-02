// import {lancaster-stemmer} from 'lancaster-stemmer'

var data;
$.getJSON("intents.json", function (json) {
  data = json; // this will show the info it in firebug console
});

const MAXLEN = 15;
const yes_no = [
  "ar",
  "is",
  "do",
  "doe",
  "may",
  "can",
  "was",
  "wer",
  "did",
  "hav",
  "am",
  "wil
];
var memo = {};
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
  "full_access",
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
  access: 12,
  af: 13,
  ag: 14,
  ahhh: 15,
  akin: 16,
  ako: 17,
  alam: 18,
  allow: 19,
  am: 20,
  amp: 21,
  an: 22,
  ang: 23,
  anim: 24,
  ano: 25,
  anong: 26,
  any: 27,
  apocalyps: 28,
  apolog: 29,
  ar: 30,
  army: 31,
  ask: 32,
  aso: 33,
  attitud: 34,
  aw: 35,
  aw8: 36,
  awit: 37,
  awt: 38,
  ay: 39,
  ba: 40,
  bad: 41,
  badminton: 42,
  bakit: 43,
  bang: 44,
  basketbal: 45,
  baw: 46,
  beauty: 47,
  bitch: 48,
  blog: 49,
  bobo: 50,
  body: 51,
  bor: 52,
  bot: 53,
  bye: 54,
  cal: 55,
  can: 56,
  cancel: 57,
  cat: 58,
  caus: 59,
  cod: 60,
  com: 61,
  comp: 62,
  comput: 63,
  cre: 64,
  cring: 65,
  crush: 66,
  curs: 67,
  damn: 68,
  dat: 69,
  design: 70,
  di: 71,
  did: 72,
  diy: 73,
  do: 74,
  dog: 75,
  dumb: 76,
  dumbass: 77,
  dumbfuck: 78,
  e: 79,
  ed: 80,
  entertain: 81,
  ev: 82,
  fac: 83,
  fav: 84,
  favorit: 85,
  filipino: 86,
  fin: 87,
  find: 88,
  fk: 89,
  food: 90,
  footbal: 91,
  for: 92,
  forg: 93,
  from: 94,
  fuck: 95,
  ful: 96,
  futs: 97,
  g: 98,
  gaano: 99,
  gago: 100,
  gain: 101,
  gam: 102,
  garb: 103,
  gas: 104,
  gaw: 105,
  gawin: 106,
  gay: 107,
  ge: 108,
  geg: 109,
  get: 110,
  ginagaw: 111,
  ginamit: 112,
  ginaw: 113,
  github: 114,
  go: 115,
  good: 116,
  goodby: 117,
  grab: 118,
  gumaw: 119,
  gusto: 120,
  gwapo: 121,
  hah: 122,
  hahah: 123,
  hahahah: 124,
  handsom: 125,
  hap: 126,
  hav: 127,
  hbu: 128,
  he: 129,
  hel: 130,
  hello: 131,
  her: 132,
  hey: 133,
  hi: 134,
  hind: 135,
  how: 136,
  humss: 137,
  i: 138,
  ict: 139,
  idk: 140,
  if: 141,
  in: 142,
  input: 143,
  is: 144,
  it: 145,
  ito: 146,
  jok: 147,
  k: 148,
  ka: 149,
  kail: 150,
  kal: 151,
  kamust: 152,
  kant: 153,
  kat: 154,
  kataw: 155,
  kay: 156,
  kind: 157,
  kit: 158,
  know: 159,
  ko: 160,
  kpop: 161,
  kup: 162,
  la8r: 163,
  lang: 164,
  langu: 165,
  lat: 166,
  leav: 167,
  less: 168,
  lif: 169,
  lik: 170,
  liv: 171,
  lod: 172,
  long: 173,
  look: 174,
  mad: 175,
  magand: 176,
  magkano: 177,
  magmur: 178,
  magsalit: 179,
  magsalt: 180,
  mahilig: 181,
  malungkot: 182,
  mangyayar: 183,
  mat: 184,
  matalino: 185,
  may: 186,
  me: 187,
  meron: 188,
  mo: 189,
  mong: 190,
  mort: 191,
  movy: 192,
  much: 193,
  mukh: 194,
  must: 195,
  "n't": 196,
  na: 197,
  nagaw: 198,
  nagtatagalog: 199,
  nalang: 200,
  nam: 201,
  nandito: 202,
  nang: 203,
  nangyar: 204,
  nas: 205,
  nc: 206,
  ng: 207,
  nga: 208,
  ni: 209,
  nic: 210,
  nito: 211,
  no: 212,
  noic: 213,
  nop: 214,
  not: 215,
  obob: 216,
  of: 217,
  oh: 218,
  ohhh: 219,
  ok: 220,
  okay: 221,
  old: 222,
  on: 223,
  oo: 224,
  opin: 225,
  ov: 226,
  paano: 227,
  pag: 228,
  pagkain: 229,
  pakyu: 230,
  pal: 231,
  pang: 232,
  panget: 233,
  pass: 234,
  patawad: 235,
  patumbahin: 236,
  photograph: 237,
  piec: 238,
  po: 239,
  pog: 240,
  pre: 241,
  pric: 242,
  program: 243,
  pus: 244,
  putangin: 245,
  quest: 246,
  real: 247,
  reason: 248,
  robby: 249,
  robot: 250,
  romcom: 251,
  routin: 252,
  sa: 253,
  saan: 254,
  sad: 255,
  sakit: 256,
  salam: 257,
  sam: 258,
  sapak: 259,
  say: 260,
  sayo: 261,
  school: 262,
  see: 263,
  sery: 264,
  shit: 265,
  should: 266,
  show: 267,
  si: 268,
  sing: 269,
  sino: 270,
  siy: 271,
  smart: 272,
  so: 273,
  socc: 274,
  someth: 275,
  son: 276,
  song: 277,
  soooo: 278,
  sorry: 279,
  sourc: 280,
  speak: 281,
  stem: 282,
  stupid: 283,
  sukot: 284,
  suntukin: 285,
  sup: 286,
  swim: 287,
  taen: 288,
  tagalog: 289,
  tak: 290,
  talk: 291,
  tangin: 292,
  tanungin: 293,
  tel: 294,
  tf: 295,
  than: 296,
  thank: 297,
  that: 298,
  the: 299,
  thi: 300,
  think: 301,
  thought: 302,
  tingin: 303,
  to: 304,
  took: 305,
  totoo: 306,
  trash: 307,
  tru: 308,
  tv: 309,
  ug: 310,
  ugal: 311,
  ulol: 312,
  up: 313,
  us: 314,
  volleybal: 315,
  wag: 316,
  was: 317,
  wc: 318,
  we: 319,
  websit: 320,
  weh: 321,
  welcom: 322,
  wer: 323,
  wew: 324,
  what: 325,
  when: 326,
  wher: 327,
  who: 328,
  why: 329,
  wil: 330,
  workout: 331,
  world: 332,
  wow: 333,
  wowy: 334,
  writ: 335,
  wtf: 336,
  xd: 337,
  xdd: 338,
  ye: 339,
  yo: 340,
  you: 341,
  yung: 342,
  zatro: 343,
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
    textbox.css({ width: "1200px" });
  } else {
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
  convo.css({ overflowY: "auto" });
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
  let raw_input = input.val();
  if (raw_input != "") {
    convo.append("<div class='sent clearfix'>" + raw_input + "</div>");

    raw_input = raw_input.toLowerCase();
    if (raw_input == "!zatro") {
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

            if (
              arr[result_index] >= 0.95 ||
              (!get_dict && !yes_no.includes(word_array[0]))
            ) {
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
            } else if (arr[result_index] < 0.95) {
              if (yes_no.includes(word_array[0])) {
                let yes_response = ["All signs point to yes","Absolutely","My sources say yes","Mais oui","By all means","Yes, of course","Certainly",];
                let no_response = ["My sources say no","Unfortunately not","I find the idea undesirable", "Certainly not","Not on any account","I don't think so",];

                if (!(raw_input in memo)) {
                  memo[raw_input] = Math.floor(Math.random() * 2);
                }

                if (memo[raw_input] == 0) {
                  response =
                    yes_response[Math.floor(Math.random() * yes_response.length)];
                } else if (memo[raw_input] == 1) {
                  response =
                    no_response[Math.floor(Math.random() * yes_response.length)];
                }

                printResponse();
              } else {
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
