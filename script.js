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

// ===== 状態 =====
let questions = [];
let order = [];
let index = 0;

let correct = 0;
let answered = 0;

let selectedMap = [];   // 選択した答え
let judgedMap = [];    // その問題を「次へ」で確定したか

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

  selectedMap = Array(questions.length).fill(null);
  judgedMap = Array(questions.length).fill(false);

  showScreen("quiz");
  showQuestion();
}

// ===== 画面切替 =====
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(name).classList.add("active");
}

// ===== 問題表示 =====
function showQuestion() {
  const q = questions[order[index]];
  document.getElementById("question").textContent = q.q;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("explanation").classList.add("hidden");

  let choices = q.c.map((t, i) => ({ t, i }));
  shuffle(choices);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.t;

    // 以前の選択は色を消す
    btn.onclick = () => selectAnswer(choice.i, btn);

    choicesDiv.appendChild(btn);
  });

  updateStatus();
}

// ===== 選択 =====
function selectAnswer(selected, btn) {
  const q = questions[order[index]];

  selectedMap[index] = selected;

  document.querySelectorAll("#choices button").forEach(b => {
    b.classList.remove("correct", "wrong");
  });

  if (selected === q.a) btn.classList.add("correct");
  else btn.classList.add("wrong");

  document.getElementById("explanation").textContent = "解説：" + q.e;
  document.getElementById("explanation").classList.remove("hidden");
}

// ===== 次の問題 =====
document.getElementById("next").onclick = () => {
  // ★ ここで問題数を確定させる
  if (!judgedMap[index]) {
    judgedMap[index] = true;
    answered++;

    const q = questions[order[index]];
    if (selectedMap[index] === q.a) {
      correct++;
    }
  }

  index = (index + 1) % order.length;
  showQuestion();
};

// ===== 前の問題 =====
document.getElementById("prev").onclick = () => {
  index = (index - 1 + order.length) % order.length;
  showQuestion();
};

// ===== ホーム =====
document.getElementById("homeBtn").onclick = () => {
  showScreen("home");
};

// ===== 正答率表示 =====
function updateStatus() {
  const rate = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  document.getElementById("status").textContent =
    `正答率：${rate}%（${correct} / ${answered}）`;
}

// ===== シャッフル =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
