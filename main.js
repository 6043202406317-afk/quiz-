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

  // 選択肢を index 付きで作成
  let choices = q.c.map((text, index) => ({
    text,
    index
  }));

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
    div.appendChild(btn);
  });
}

// ===== 回答処理 =====
function checkAnswer(selectedIndex, btn) {
  const q = questions[order[currentIndex]];
  const result = document.getElementById("result");
  const exp = document.getElementById("explanation");

  // 正誤表示（何回押してもOK）
  if (selectedIndex === q.a) {
    btn.style.background = "#b6f2c2";
    result.textContent = "⭕ 正解！";
  } else {
    btn.style.background = "#f2b6b6";
    result.textContent = "❌ 不正解";
  }

  // 正答率は最初の1回だけ
  if (!hasCounted) {
    hasCounted = true;
    answerCount++;

    if (selectedIndex === q.a) {
      correctCount++;
    }

    const rate = Math.round((correctCount / answerCount) * 100);
    document.getElementById("rate").textContent =
      `正答率：${rate}%（${correctCount}/${answerCount}）`;

    exp.textContent = "解説：" + q.e;
  }
}

// ===== 次の問題 =====
function nextQuestion() {
  currentIndex++;

  if (currentIndex >= order.length) {
    shuffle(); // 1周したら静かにリセット
  }

  showQuestion();
}

// ===== 初期化 =====
shuffle();
showQuestion();
