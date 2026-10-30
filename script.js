
const $ = id => document.getElementById(id);

// Yulduzli fon
for (let i = 0; i < 80; i++) {
  const star = document.createElement("span");
  star.style.cssText = `
    position:fixed;
    left:${Math.random() * 100}%;
    top:${Math.random() * 100}%;
    width:${Math.random() * 3 + 1}px;
    height:${Math.random() * 3 + 1}px;
    background:#ffd21f;
    border-radius:50%;
    opacity:${Math.random() * 0.6 + 0.1};
    pointer-events:none;
    z-index:-1;
  `;
  $("stars").appendChild(star);
}

// Savollar
const questions = [
  {
    icon: "◈",
    title: "Hozir necha yoshdasan?",
    description: "Bu ma'lumot kelajak ssenariysini yoshingga moslashtirish uchun kerak.",
    type: "select",
    key: "age",
    options: ["13–16 yosh", "17–20 yosh", "21–25 yosh", "26–35 yosh", "36 yoshdan katta"]
  },
  {
    icon: "✦",
    title: "Qaysi mashg‘ulot senga ko‘proq yoqadi?",
    description: "Bo‘sh vaqtingda nimaga qiziqishingni tanla.",
    type: "select",
    key: "interest",
    options: ["Texnologiya va dasturlash", "San'at va dizayn", "Biznes va pul topish", "Sayohat va sarguzasht", "Ilm-fan va ta'lim", "Sport va faol hayot"]
  },
  {
    icon: "∞",
    title: "Hayotda sen uchun eng muhim narsa nima?",
    description: "Eng muhim deb hisoblagan bitta qadriyatni tanla.",
    type: "select",
    key: "priority",
    options: ["Moliyaviy erkinlik", "Oila va yaqinlar", "Bilim va rivojlanish", "Mashhurlik va obro‘", "Erkinlik va sayohat", "Tinch va baxtli hayot"]
  },
  {
    icon: "⚡",
    title: "Qiyin vaziyatga duch kelsang, nima qilasan?",
    description: "O‘zingga eng mos javobni tanla.",
    type: "select",
    key: "reaction",
    options: ["Darhol yechim izlayman", "Avval yaxshilab o‘ylayman", "Boshqalardan maslahat so‘rayman", "Biroz kutib, keyin harakat qilaman"]
  },
  {
    icon: "◇",
    title: "Tavakkal qilishga munosabating qanday?",
    description: "Yangi imkoniyat uchun tavakkal qilishga tayyormisan?",
    type: "select",
    key: "risk",
    options: ["Ha, yangi imkoniyatlarni yaxshi ko‘raman", "Kerak bo‘lsa tavakkal qilaman", "Xavfsiz yo‘lni afzal ko‘raman"]
  },
  {
    icon: "☼",
    title: "Qanday muhitda ishlashni yoqtirasan?",
    description: "Kelajakdagi faoliyating qanday bo‘lishini xohlaysan?",
    type: "select",
    key: "work",
    options: ["Yolg‘iz va mustaqil", "Jamoa bilan", "Rahbar sifatida", "Erkin jadval asosida", "Hali bilmayman"]
  },
  {
    icon: "✧",
    title: "Qaysi hayot tarzini tanlarding?",
    description: "O‘zingni qaysi kelajakda tasavvur qilasan?",
    type: "select",
    key: "lifestyle",
    options: ["Hashamatli va farovon hayot", "Oddiy, lekin baxtli hayot", "Dunyo bo‘ylab sayohatlar", "Katta yutuqlar va faoliyat", "Oila va osoyishtalik"]
  },
  {
    icon: "🌍",
    title: "Kelajakda qayerda yashashni xohlaysan?",
    description: "Orzuingdagi joyni tanla.",
    type: "select",
    key: "place",
    options: ["O‘zbekistonda", "Yevropada", "AQSH yoki Kanadada", "Osiyoda", "Turli mamlakatlarda", "Hali qaror qilmaganman"]
  },
  {
    icon: "⌛",
    title: "Maqsadingga erishish uchun qancha harakat qilasan?",
    description: "O‘zingni qaysi javobda ko‘rasan?",
    type: "select",
    key: "effort",
    options: ["Har kuni muntazam harakat qilaman", "Kayfiyatimga qarab harakat qilaman", "Katta maqsad bo‘lsa, bor kuchimni beraman", "Ba'zan boshlash qiyin bo‘ladi"]
  },
  {
    icon: "💫",
    title: "Eng katta orzuing nima?",
    description: "O‘z orzuingni yoz. Bu javob kelajak hikoyangda aks etadi.",
    type: "text",
    key: "dream",
    placeholder: "Masalan: dunyoga mashhur dasturchi bo‘lish..."
  }
];

let currentQuestion = 0;
let answers = {};
let userName = "";

// Ekran almashtirish
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Savolni chiqarish
function renderQuestion() {
  const q = questions[currentQuestion];

  $("questionCounter").textContent =
    `SAVOL ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  const percent = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  $("progressPercent").textContent = percent + "%";
  $("progressBar").style.width = percent + "%";

  $("questionIcon").textContent = q.icon;
  $("questionTitle").textContent = q.title;
  $("questionDescription").textContent = q.description;
  $("errorMessage").textContent = "";

  const area = $("answerArea");
  area.innerHTML = "";

  if (q.type === "select") {
    q.options.forEach(option => {
      const button = document.createElement("button");
      button.className = "answer-option";
      button.textContent = option;

      if (answers[q.key] === option) {
        button.classList.add("selected");
      }

      button.addEventListener("click", () => {
        answers[q.key] = option;

        area.querySelectorAll(".answer-option").forEach(item => {
          item.classList.remove("selected");
        });

        button.classList.add("selected");
      });

      area.appendChild(button);
    });
  }

  if (q.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 180;
    input.placeholder = q.placeholder;
    input.value = answers[q.key] || "";
    input.addEventListener("input", () => {
      answers[q.key] = input.value;
    });
    area.appendChild(input);
  }

  $("backBtn").style.visibility =
    currentQuestion === 0 ? "hidden" : "visible";

  $("nextBtn").textContent =
    currentQuestion === questions.length - 1
      ? "KELAJAGIMNI KO‘RISH ✦"
      : "KEYINGISI →";
}

// Boshlash
$("beginBtn").addEventListener("click", () => {
  userName = $("userName").value.trim();

  if (!userName) {
    $("userName").focus();
    $("userName").style.borderColor = "#ff5555";
    return;
  }

  $("userName").style.borderColor = "#8c6a0b";
  currentQuestion = 0;
  answers = {};

  renderQuestion();
  showScreen("quiz");
});

// Keyingi savol
$("nextBtn").addEventListener("click", () => {
  const q = questions[currentQuestion];
  const answer = answers[q.key];

  if (!answer || !answer.trim()) {
    $("errorMessage").textContent = "Iltimos, savolga javob ber!";
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    createFuture();
  }
});

// Orqaga qaytish
$("backBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

// Tahlil yordamchilari
function contains(value, words) {
  return words.some(word => value.toLowerCase().includes(word));
}

function getProfile() {
  const interest = answers.interest || "";
  const priority = answers.priority || "";
  const work = answers.work || "";
  const lifestyle = answers.lifestyle || "";

  if (contains(interest, ["texnologiya", "dasturlash"]) ||
      contains(interest, ["ilm-fan", "ta'lim"])) {
    return {
      title: "BILIM VA TEXNOLOGIYA IZLOVCHISI",
      description: "Javoblaring bilim olish, yangiliklarni o‘rganish va o‘z ustingda ishlashga moyilligingni ko‘rsatadi. Senga texnologiya, ta'lim yoki ilmiy izlanishlar bilan bog‘liq yo‘nalishlar mos kelishi mumkin.",
      career: "Dasturlash, muhandislik, ilm-fan, ta'lim yoki texnologik tadbirkorlik."
    };
  }

  if (contains(interest, ["biznes", "pul"])) {
    return {
      title: "TADBIRKOR VA MAQSADGA INTILUVCHI",
      description: "Javoblaring mustaqillik, imkoniyat va natijaga qiziqishingni ko‘rsatadi. Biznes, boshqaruv va moliya yo‘nalishlari senga qiziqarli bo‘lishi mumkin.",
      career: "Tadbirkorlik, menejment, moliya, marketing yoki savdo."
    };
  }

  if (contains(interest, ["san'at", "dizayn"])) {
    return {
      title: "IJODKOR VA G‘OYALAR YARATUVCHISI",
      description: "Sen yangi fikrlar, go‘zallik va o‘ziga xoslikni qadrlashing mumkin. Ijodiy faoliyat va dizayn yo‘nalishlari senga mos kelishi ehtimol.",
      career: "Grafik dizayn, arxitektura, media, san'at yoki ijodiy biznes."
    };
  }

  if (contains(interest, ["sayohat"])) {
    return {
      title: "KASHFIYOTCHI VA ERKIN RUH",
      description: "Javoblaring yangilik, harakat va turli tajribalarga qiziqishingni ko‘rsatadi. Senga xalqaro muhit va turli insonlar bilan ishlash yoqishi mumkin.",
      career: "Turizm, xalqaro aloqalar, media, tarjimonlik yoki logistika."
    };
  }

  if (contains(interest, ["sport"])) {
    return {
      title: "FAOL VA INTILUVCHAN SHAXS",
      description: "Sen faol hayot va harakatni qadrlashing mumkin. Intizom va muntazam mashg‘ulotlar senga ko‘plab imkoniyatlar yaratadi.",
      career: "Sport, murabbiylik, sog‘lom turmush, sport menejmenti."
    };
  }

  return {
    title: "O‘Z YO‘LINI IZLOVCHI",
    description: "Sen hali turli imkoniyatlarni o‘rganayotgan bo‘lishing mumkin. O‘zingga mos yo‘nalishni tajriba, qiziqish va bilim orqali aniqlashing mumkin.",
    career: "Turli sohalarni sinab ko‘rish, qiziqishlaringga mos kasbni tanlash."
  };
}

function getStrength() {
  const reaction = answers.reaction || "";
  const risk = answers.risk || "";
  const effort = answers.effort || "";

  if (contains(reaction, ["yechim"]) ||
      contains(effort, ["har kuni"])) {
    return "Muammoni hal qilish va muntazam harakat qilishga moyillik.";
  }

  if (contains(risk, ["imkoniyat"])) {
    return "Yangi imkoniyatlarni sinab ko‘rishga tayyorlik.";
  }

  if (contains(reaction, ["maslahat"])) {
    return "Boshqalar bilan fikr almashish va yordam so‘rash qobiliyati.";
  }

  return "O‘z qarorlaringni o‘ylab ko‘rish va ehtiyotkorlik bilan yo‘l tanlash.";
}

function getChallenge() {
  const effort = answers.effort || "";
  const risk = answers.risk || "";
  const reaction = answers.reaction || "";

  if (contains(effort, ["qiyin"])) {
    return "Ishni boshlashni ortga surmaslik. Kichik qadamlar bilan odat hosil qilish foydali.";
  }

  if (contains(risk, ["xavfsiz"])) {
    return "Ba'zan yangi imkoniyatlarni sinab ko‘rishdan qo‘rqmaslik kerak.";
  }

  if (contains(reaction, ["kutib"])) {
    return "Qaror qabul qilishni ortiqcha kechiktirmaslikka harakat qil.";
  }

  return "Maqsadlarni aniq belgilash va ularni oxirigacha davom ettirishga e'tibor ber.";
}

function getAdvice() {
  const priority = answers.priority || "";

  if (contains(priority, ["moliyaviy"])) {
    return "Moliyaviy savodxonlikni o‘rgan, daromad va xarajatlarni boshqarishni odat qil.";
  }

  if (contains(priority, ["oila"])) {
    return "Maqsadlaring sari intilarkan, yaqinlaring bilan munosabatlarga ham vaqt ajrat.";
  }

  if (contains(priority, ["bilim"])) {
    return "Har kuni yangi narsa o‘rgan. Bilim va amaliyot birgalikda katta imkoniyat yaratadi.";
  }

  if (contains(priority, ["mashhurlik"])) {
    return "Obro‘ ortidan quvishdan ko‘ra, haqiqiy mahorat va foydali ishlar yaratishga e'tibor ber.";
  }

  if (contains(priority, ["erkinlik"])) {
    return "Yangi tajribalarni sinab ko‘r, lekin kelajak uchun mustahkam reja ham tuz.";
  }

  return "O‘zing uchun muhim qadriyatlarni aniqlab, ularga mos hayot qurishga intil.";
}

// Kelajak hikoyalarini yaratish
function createFuture() {
  showScreen("loading");

  const loadingTexts = [
    "Javoblaring o‘rganilmoqda...",
    "Hayot yo‘nalishing aniqlanmoqda...",
    "Muqobil kelajak ssenariylari tayyorlanmoqda...",
    "Sening shaxsiy olaming yaratilmoqda..."
  ];

  let index = 0;
  $("loadingText").textContent = loadingTexts[0];

  const timer = setInterval(() => {
    index++;
    if (index < loadingTexts.length) {
      $("loadingText").textContent = loadingTexts[index];
    }
  }, 650);

  setTimeout(() => {
    clearInterval(timer);
    buildResult();
    showScreen("result");
  }, 2800);
}

function buildResult() {
  const profile = getProfile();
  const age = answers.age;
  const interest = answers.interest;
  const priority = answers.priority;
  const work = answers.work;
  const lifestyle = answers.lifestyle;
  const place = answers.place;
  const dream = answers.dream;

  const placeText = place === "Hali qaror qilmaganman"
    ? "o‘zingga mos yangi joylarni"
    : place;

  const lifestyleText = lifestyle.toLowerCase();

  const workText = work === "Hali bilmayman"
    ? "o‘zingga mos faoliyat turini"
    : work.toLowerCase() + " uslubini";

  $("resultName").textContent = userName.toUpperCase();
  $("profileTitle").textContent = profile.title;
  $("profileDescription").textContent = profile.description;
  $("career").textContent = profile.career;
  $("strength").textContent = getStrength();
  $("challenge").textContent = getChallenge();
  $("advice").textContent = getAdvice();

  $("future5").textContent =
    `Bu ssenariyda sen ${interest.toLowerCase()} yo‘nalishida yangi tajribalar orttirishing mumkin. ` +
    `O‘z qobiliyatlaringni rivojlantirib, ${workText} sinab ko‘rasan.`;

  $("future10").textContent =
    `O‘n yillik muqobil hayotingda sen ${priority.toLowerCase()} qadriyatiga ko‘proq e'tibor beradigan, ` +
    `${placeText} bilan bog‘liq yangi imkoniyatlarni izlaydigan inson sifatida tasavvur qilinasan.`;

  $("future20").textContent =
    `Yigirma yildan keyingi ushbu ssenariyda sen ${lifestyleText} tomon intilgan, ` +
    `o‘z tajribasi va qarorlari orqali hayotini shakllantirgan inson bo‘lishing mumkin. ` +
    `Bu yo‘l bugungi harakatlaringga bog‘liq.`;

  $("dreamTitle").textContent = dream;
  $("dreamText").textContent =
    `${userName}, sening orzuing — "${dream}". ` +
    `Bu orzuga erishish uchun uni aniq maqsadlarga ajratib, bugundan kichik qadamlar bilan boshlashing mumkin.`;

  // Natijani matn ko‘rinishida saqlash
  window.finalReport = `
PARALLEL LIFE — SHAXSIY KELAJAK SSENARIYSI

Ism: ${userName}
Yosh: ${age}

HAYOT YO‘NALISHI:
${profile.title}

TA'RIF:
${profile.description}

5 YILDAN KEYIN:
${$("future5").textContent}

10 YILDAN KEYIN:
${$("future10").textContent}

20 YILDAN KEYIN:
${$("future20").textContent}

KUCHLI TOMON:
${getStrength()}

E'TIBOR BERISH KERAK:
${getChallenge()}

MOS KASB YO‘NALISHLARI:
${profile.career}

HAYOTIY TAVSIYA:
${getAdvice()}

ENG KATTA ORZU:
${dream}

ESLATMA:
Bu aniq bashorat emas. Javoblarga asoslangan ijodiy ssenariy.
  `.trim();
}

// Qayta boshlash
$("restartBtn").addEventListener("click", () => {
  answers = {};
  currentQuestion = 0;
  $("userName").value = "";
  showScreen("welcome");
});

// Natijani nusxalash
$("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.finalReport);
    $("copyBtn").textContent = "NUSXALANDI ✓";
  } catch {
    const area = document.createElement("textarea");
    area.value = window.finalReport;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    $("copyBtn").textContent = "NUSXALANDI ✓";
  }

  setTimeout(() => {
    $("copyBtn").textContent = "NATIJANI NUSXALASH";
  }, 2000);
});
