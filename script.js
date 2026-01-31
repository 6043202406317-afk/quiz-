// ===== 問題 =====
const data = {
  it: [
    { q: "CPUの役割は？", c: ["記憶", "演算", "表示", "印刷"], a: 1, e: "CPUは演算と制御を行う。" },
    { q: "2進数10は10進数で？", c: ["1", "2", "3", "4"], a: 1, e: "10₂ = 2₁₀" },
    { q: "RAMの特徴は？", c: ["電源で消える", "永久保存", "補助記憶", "ROM"], a: 0, e: "RAMは一時記憶。" },
    { q: "OSの役割は？", c: ["計算", "管理", "印刷", "通信"], a: 1, e: "OSは全体管理。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["J", "W", "N", "kg"], a: 2, e: "N（ニュートン）" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "本", "車"], a: 1, e: "りんご" }
  ]
};

// ===== 状態 =====
let questions = [];
let index = 0;
let correct = 0;
let answered = 0;
let answeredNow = false;

// ===== ユーティリティ =====
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ===== 開始 =====
function startQuiz(type) {
  questions = shuffle([...data[type]]);
  questions.forEach(q => {
    const zipped = q.c.map((c, i) => ({ c, i }));
    shuffle(zipped);
    q.c = zipped.map(z => z.c);
    q.a = zipped.findIndex(z => z.i === q.a);
  });

  index = 0;
  correct = 0;
  answered = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
}

// ===== 表示 =====
function showQuestion() {
  answeredNow = false;
  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";

  const q = questions[index];
  document.getElementById("question").textContent = q.q;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  q.c.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => checkAnswer(i, btn);
    choices.appendChild(btn);
  });
}

// ===== 判定 =====
function checkAnswer(i, btn) {
  if (answeredNow) return;
  answeredNow = true;

  const q = questions[index];
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(b => b.className = "");

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
  index++;
  if (index >= questions.length) {
    index = 0;
    shuffle(questions);
  }
  showQuestion();
}

function prevQuestion() {
  if (index > 0) index--;
  showQuestion();
}

function goHome() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

// ===== メニュー =====
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("menu").classList.toggle("hidden");
};

document.getElementById("darkToggle").onclick = () => {
  document.documentElement.classList.toggle("dark");
};
