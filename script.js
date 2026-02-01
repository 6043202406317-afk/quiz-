const data = {
  it: [
    { q: "CPUの役割は？", c: ["記憶", "演算", "表示", "印刷"], a: 1, e: "CPUは演算と制御を行います。" },
    { q: "2進数の10は？", c: ["1", "2", "3", "4"], a: 1, e: "10進数で2です。" },
    { q: "RAMの特徴は？", c: ["永続", "一時", "補助", "ROM"], a: 1, e: "RAMは一時記憶です。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["J", "W", "N", "kg"], a: 2, e: "ニュートンです。" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "本", "車"], a: 1, e: "りんごです。" }
  ]
};

let questions = [];
let index = 0;
let correct = 0;
let answered = 0;

function startQuiz(type) {
  questions = shuffle([...data[type]]);
  index = 0;
  correct = 0;
  answered = 0;
  updateRate();
  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").textContent = "";

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  shuffle(q.c.map((t,i)=>({t,i}))).forEach(o=>{
    const b = document.createElement("button");
    b.textContent = o.t;
    b.onclick = () => answer(o.i, b);
    choices.appendChild(b);
  });
}

function answer(i, btn) {
  const q = questions[index];

  // 色を一旦リセット
  document.querySelectorAll("#choices button").forEach(b=>{
    b.classList.remove("correct","wrong");
  });

  if (i === q.a) {
    btn.classList.add("correct");
    correct++;
  } else {
    btn.classList.add("wrong");
  }

  answered++;
  updateRate();
  document.getElementById("explanation").textContent = "解説：" + q.e;
}

function updateRate() {
  const rate = answered ? Math.round((correct/answered)*100) : 0;
  document.getElementById("rate").textContent =
    `正答率：${rate}%（${correct}/${answered}）`;
}

function nextQuestion() {
  index = (index + 1) % questions.length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + questions.length) % questions.length;
  showQuestion();
}

function goHome() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

/* メニュー */
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
  sideMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};
overlay.onclick = () => {
  sideMenu.classList.add("hidden");
  overlay.classList.add("hidden");
};

/* ダーク */
document.getElementById("darkBtn").onclick = () => {
  document.documentElement.classList.toggle("dark");
};

function shuffle(a) {
  return a.sort(()=>Math.random()-0.5);
}
