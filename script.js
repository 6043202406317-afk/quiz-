// ===== 問題データ =====
const data = {
  it: [
    { q: "CPUの役割は？", c: ["記憶", "演算", "表示", "印刷"], a: 1, e: "CPUは演算と制御を行います。" },
    { q: "2進数の10は？", c: ["1", "2", "3", "4"], a: 1, e: "10(2) = 2(10)" },
    { q: "RAMの特徴は？", c: ["永続", "一時記憶", "補助記憶", "ROM"], a: 1, e: "RAMは一時的な記憶です。" },
    { q: "OSの役割は？", c: ["計算", "管理", "印刷", "通信"], a: 1, e: "OSは全体を管理します。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["J", "W", "N", "kg"], a: 2, e: "ニュートン(N)" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "本", "車"], a: 1, e: "りんご" }
  ]
};

let subject = "";
let questions = [];
let index = 0;
let correct = 0;
let answered = 0;
let counted = false;

// ===== シャッフル =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ===== 開始 =====
function startQuiz(type) {
  subject = type;
  questions = [...data[type]];
  shuffle(questions);
  index = 0;
  correct = 0;
  answered = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
}

// ===== 表示 =====
function showQuestion() {
  counted = false;
  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";

  const q = questions[index];
  document.getElementById("question").textContent = q.q;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  let choiceArr = q.c.map((t, i) => ({ t, i }));
  shuffle(choiceArr);

  choiceArr.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.t;
    btn.onclick = () => checkAnswer(c.i, btn);
    choices.appendChild(btn);
  });
}

// ===== 判定 =====
function checkAnswer(i, btn) {
  if (counted) return;

  const q = questions[index];
  document.querySelectorAll("#choices button").forEach(b => b.className = "");

  if (i === q.a) {
    btn.classList.add("correct");
    document.getElementById("result").textContent = "⭕ 正解！";
    correct++;
  } else {
    btn.classList.add("wrong");
    document.getElementById("result").textContent = "❌ 不正解";
  }

  counted = true;
  answered++;

  const rate = Math.round((correct / answered) * 100);
  document.getElementById("rate").textContent = `正答率：${rate}%`;

  document.getElementById("explanation").textContent = "解説：" + q.e;
}

// ===== 移動 =====
function nextQuestion() {
  index++;
  if (index >= questions.length) {
    shuffle(questions);
    index = 0;
  }
  showQuestion();
}

function prevQuestion() {
  if (index > 0) {
    index--;
    showQuestion();
  }
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
  document.body.classList.toggle("dark");
};
