// ===== 問題データ =====
const quizData = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["記憶", "演算", "表示", "印刷"],
      a: 1,
      e: "CPUは計算や制御を行う装置です。"
    },
    {
      q: "2進数の10は10進数でいくつ？",
      c: ["1", "2", "3", "4"],
      a: 1,
      e: "2進数の10は10進数で2です。"
    }
  ],
  physics: [
    {
      q: "速度の単位はどれ？",
      c: ["m", "m/s", "kg", "N"],
      a: 1,
      e: "速度の単位は m/s です。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      c: ["犬", "りんご", "走る", "青い"],
      a: 1,
      e: "apple は「りんご」です。"
    }
  ]
};

// ===== 状態 =====
let questions = [];
let order = [];
let currentIndex = 0;
let correctCount = 0;
let answerCount = 0;
let hasCounted = false;

// ===== クイズ開始 =====
function startQuiz(type) {
  questions = quizData[type];

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  correctCount = 0;
  answerCount = 0;

  shuffle();
  showQuestion();
}

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

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  let choices = q.c.map((text, index) => ({ text, index }));

  // 選択肢シャッフル
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => checkAnswer(choice.index, btn);
    choicesDiv.appendChild(btn);
  });
}

// ===== 回答処理 =====
function checkAnswer(selectedIndex, btn) {
  const q = questions[order[currentIndex]];

  if (selectedIndex === q.a) {
    btn.style.background = "#b6f2c2";
    document.getElementById("result").textContent = "⭕ 正解！";
  } else {
    btn.style.background = "#f2b6b6";
    document.getElementById("result").textContent = "❌ 不正解";
  }

  if (!hasCounted) {
    hasCounted = true;
    answerCount++;
    if (selectedIndex === q.a) correctCount++;

    const rate = Math.round((correctCount / answerCount) * 100);
    document.getElementById("rate").textContent =
      `正答率：${rate}%（${correctCount}/${answerCount}）`;

    document.getElementById("explanation").textContent =
      "解説：" + q.e;
  }
}

// ===== 次の問題 =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= order.length) {
    shuffle(); // 1周したら何も表示せずリセット
  }
  showQuestion();
}

// ===== ホームに戻る =====
function backHome() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("home").style.display = "block";
}
