// ===== 問題データ =====
const quizData = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["記憶", "演算", "表示", "印刷"],
      a: 1,
      e: "CPUは計算や制御を行います。"
    }
  ],
  physics: [
    {
      q: "速度の単位は？",
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
      e: "apple は りんご。"
    }
  ]
};

let questions = [];
let order = [];
let currentIndex = 0;
let correctCount = 0;
let answerCount = 0;
let hasCounted = false;

// ===== クイズ開始 =====
function startQuiz(type) {
  questions = quizData[type];
  correctCount = 0;
  answerCount = 0;

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  const body = document.getElementById("body");
  body.className = "";
  body.classList.add("bg-" + type);

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

  const div = document.getElementById("choices");
  div.innerHTML = "";

  let choices = q.c.map((text, index) => ({ text, index }));
  choices.sort(() => Math.random() - 0.5);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => checkAnswer(choice.index, btn);
    div.appendChild(btn);
  });
}

// ===== 回答 =====
function checkAnswer(selectedIndex, btn) {
  const q = questions[order[currentIndex]];

  if (selectedIndex === q.a) {
    btn.classList.add("correct");
    document.getElementById("result").textContent = "⭕ 正解！";
  } else {
    btn.classList.add("wrong");
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

// ===== 次へ =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= order.length) shuffle();
  showQuestion();
}

// ===== ホーム =====
function goHome() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("body").className = "";
}
