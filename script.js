// ===== 問題データ =====
const data = {
  it: [
    { q: "CPUの役割はどれ？", c: ["記憶", "演算", "表示", "印刷"], a: 1, e: "CPUは演算や制御を行う装置です。" },
    { q: "2進数の10は10進数で？", c: ["1", "2", "3", "4"], a: 1, e: "10(2) = 2(10)" },
    { q: "RAMの特徴は？", c: ["電源を切っても残る", "一時記憶", "補助記憶", "読み取り専用"], a: 1, e: "RAMは一時記憶装置です。" },
    { q: "OSの役割は？", c: ["計算", "管理", "印刷", "通信のみ"], a: 1, e: "OSは全体を管理します。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["J", "W", "N", "kg"], a: 2, e: "力の単位はNです。" }
  ],
  english: [
    { q: "apple の意味は？", c: ["犬", "りんご", "本", "車"], a: 1, e: "apple は りんご です。" }
  ]
};

let questions = [];
let order = [];
let index = 0;

let correct = 0;
let answered = 0;
let answeredMap = [];

// ===== 教科選択 =====
document.querySelectorAll(".subjects button").forEach(btn => {
  btn.onclick = () => startQuiz(btn.dataset.subject);
});

function startQuiz(subject) {
  questions = data[subject];
  order = shuffle([...Array(questions.length).keys()]);
  index = 0;
  correct = 0;
  answered = 0;
  answeredMap = Array(questions.length).fill(null);

  showScreen("quiz");
  showQuestion();
}

// ===== 表示切替 =====
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(name).classList.add("active");
}

// ===== 問題表示 =====
function showQuestion() {
  document.getElementById("explanation").classList.add("hidden");
  document.getElementById("choices").innerHTML = "";

  const q = questions[order[index]];
  document.getElementById("question").textContent = q.q;

  let choices = q.c.map((t, i) => ({ t, i }));
  shuffle(choices);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.t;
    btn.onclick = () => answer(choice.i, btn);
    document.getElementById("choices").appendChild(btn);
  });

  updateStatus();
}

// ===== 回答 =====
function answer(selected, btn) {
  const q = questions[order[index]];

  document.querySelectorAll("#choices button").forEach(b => {
    b.classList.remove("correct", "wrong");
  });

  if (selected === q.a) btn.classList.add("correct");
  else btn.classList.add("wrong");

  if (answeredMap[index] === null) {
    answeredMap[index] = selected;
    answered++;
    if (selected === q.a) correct++;
  }

  document.getElementById("explanation").textContent = "解説：" + q.e;
  document.getElementById("explanation").classList.remove("hidden");

  updateStatus();
}

// ===== ステータス =====
function updateStatus() {
  const rate = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  document.getElementById("status").textContent =
    `正答率：${rate}%（${correct} / ${answered}）`;
}

// ===== ナビ =====
document.getElementById("next").onclick = () => {
  index = (index + 1) % order.length;
  showQuestion();
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + order.length) % order.length;
  showQuestion();
};

document.getElementById("homeBtn").onclick = () => {
  showScreen("home");
};

// ===== シャッフル =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
