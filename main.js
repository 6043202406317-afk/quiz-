// ===== 問題データ =====
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
    e: "2進数の10は 1×2¹ + 0×2⁰ = 2 です。"
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
    e: "RAMは電源を切ると内容が消える一時記憶装置です。"
  }
];

// ===== DOM =====
const rateEl = document.getElementById("rate");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const explanationEl = document.getElementById("explanation");

// ===== 状態 =====
let order = [];
let currentIndex = 0;
let hasCounted = false;
let correctCount = 0;
let answerCount = 0;

// ===== 出題順シャッフル =====
function shuffleOrder() {
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
  resultEl.textContent = "";
  explanationEl.textContent = "";

  const q = questions[order[currentIndex]];
  questionEl.textContent = q.q;
  choicesEl.innerHTML = "";

  // 選択肢を index 付きで生成
  let choices = q.c.map((text, index) => ({ text, index }));

  // 選択肢シャッフル
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  // 表示
  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => checkAnswer(choice.index, btn);
    choicesEl.appendChild(btn);
  });
}

// ===== 回答処理 =====
function checkAnswer(selectedIndex, btn) {
  const q = questions[order[currentIndex]];

  // 何回押してもOK（色と表示だけ変える）
  if (selectedIndex === q.a) {
    btn.style.background = "#b6f2c2";
    resultEl.textContent = "⭕ 正解！";
  } else {
    btn.style.background = "#f2b6b6";
    resultEl.textContent = "❌ 不正解";
  }

  // 正答率は最初の1回だけ
  if (!hasCounted) {
    hasCounted = true;
    answerCount++;

    if (selectedIndex === q.a) correctCount++;

    const rate = Math.round((correctCount / answerCount) * 100);
    rateEl.textContent = `正答率：${rate}%（${correctCount}/${answerCount}）`;
    explanationEl.textContent = "解説：" + q.e;
  }
}

// ===== 次の問題 =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= order.length) {
    shuffleOrder(); // 1周したら静かにリセット
  }
  showQuestion();
}

// ===== 初期化 =====
shuffleOrder();
showQuestion();
