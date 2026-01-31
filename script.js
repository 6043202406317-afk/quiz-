// ===== 問題 =====
const data = {
  it: [
    { q: "CPUの役割は？", c: ["記憶", "演算", "表示", "印刷"], a: 1, e: "CPUは演算と制御を行います。" },
    { q: "2進数の10は？", c: ["1", "2", "3", "4"], a: 1, e: "2進数10 = 10進数2" },
    { q: "RAMの特徴は？", c: ["永続", "一時", "補助記憶", "ROM"], a: 1, e: "RAMは一時記憶です。" },
    { q: "OSの役割は？", c: ["計算", "管理", "印刷", "通信"], a: 1, e: "OSは全体を管理します。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["J", "W", "N", "kg"], a: 2, e: "N（ニュートン）です。" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "本", "車"], a: 1, e: "りんごです。" }
  ]
};

let questions = [];
let index = 0;
let correct = 0;
let answered = 0;
let locked = false;

// ===== 開始 =====
function startQuiz(type) {
  questions = shuffle([...data[type]]);
  index = 0;
  correct = 0;
  answered = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

// ===== 表示 =====
function showQuestion() {
  locked = false;
  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";

  const q = questions[index];
  document.getElementById("question").textContent = q.q;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  const shuffled = shuffle(q.c.map((t, i) => ({ t, i })));
  shuffled.forEach(obj => {
    const btn = document.createElement("button");
    btn.textContent = obj.t;
    btn.onclick = () => checkAnswer(obj.i, btn);
    choices.appendChild(btn);
  });
}

// ===== 判定 =====
function checkAnswer(i, btn) {
  if (locked) return;
  locked = true;

  const q = questions[index];
  if (i === q.a) {
    btn.classList.add("correct");
    correct++;
  } else {
    btn.classList.add("wrong");
  }

  answered++;
  document.getElementById("rate").textContent =
    `正答率：${Math.round(correct / answered * 100)}%`;

  document.getElementById("explanation").textContent = "解説：" + q.e;
}

// ===== 移動 =====
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

// ===== メニュー =====
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

// ===== ダークモード =====
document.getElementById("darkBtn").onclick = () => {
  document.documentElement.classList.toggle("dark");
};

// ===== シャッフル =====
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
