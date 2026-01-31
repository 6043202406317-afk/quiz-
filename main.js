const questions = [
  {
    q: "CPUの役割はどれ？",
    c: ["記憶", "演算", "表示", "印刷"],
    a: 1,
    e: "CPUはコンピュータの中で計算や制御を行う装置です。"
  },
  {
    q: "2進数の10は10進数でいくつ？",
    c: ["1", "2", "3", "4"],
    a: 1,
    e: "2進数の10は 1×2¹ + 0×2⁰ = 2 になります。"
  },
  {
    q: "RAMの特徴として正しいものはどれ？",
    c: [
      "電源を切っても内容が残る",
      "読み書きが高速な一時記憶",
      "入力専用の装置",
      "補助記憶装置である"
    ],
    a: 1,
    e: "RAMは一時的にデータを保存する高速な記憶装置です。"
  }
];

// ===== 状態 =====
let currentIndex = 0;
let hasCounted = false;

let correctCount = 0;
let answerCount = 0;

// 出題順
let order = [];

// ===== シャッフル =====
function shuffle() {
  order = [...Array(questions.length).keys()];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  currentIndex = 0;
}

// ===== 問題表示 =====
function showQuestion() {
  hasCounted = false;

  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";

  const q = questions[order[currentIndex]];
  document.getElementById("question").textContent = q.q;

  const div = document.getElementById("choices");
  div.innerHTML = "";

  // 選択肢を
