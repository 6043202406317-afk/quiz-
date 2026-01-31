const quizData = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["記憶", "演算", "表示", "印刷"],
      a: 1,
      e: "CPUは計算や処理（演算）を行う装置です。"
    }
  ],
  physics: [
    {
      q: "速度の単位は？",
      c: ["m", "m/s", "kg", "N"],
      a: 1,
      e: "速度は距離÷時間なので m/s です。"
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

let questions = [];
let order = [];
let currentIndex = 0;
let correctCount = 0;
let answerCount = 0;
let hasAnswered = false;

function startQuiz(type) {
  questions = quizData[type];
  currentIndex = 0;
  correctCount = 0;
  answerCount = 0;

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("body").className = "bg-" + type;

  shuffle();
  showQuestion();
}

function shuffle() {
  order = [...Array(questions.length).keys()];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
}

function showQuestion() {
  hasAnswered = false;
  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";
  document.getElementById("rate").textContent = "";

  const q = questions[order[currentIndex]];
  document.getElementById("question").textContent = q.q;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.c
    .map((text, index) => ({ text, index }))
    .sort(() => Math.random() - 0.5)
    .forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => checkAnswer(choice.index, btn);
      choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
  if (hasAnswered) return;

  const q = questions[order[currentIndex]];

  if (selected === q.a) {
    btn.classList.add("correct");
    document.getElementById("result").textContent = "⭕ 正解";
    correctCount++;
  } else {
    btn.classList.add("wrong");
    document.getElementById("result").textContent = "❌ 不正解";
  }

  answerCount++;
  hasAnswered = true;

  const rate = Math.round((correctCount / answerCount) * 100);
  document.getElementById("rate").textContent =
    `正答率：${rate}%（${correctCount}/${answerCount}）`;

  document.getElementById("explanation").textContent = "解説：" + q.e;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= order.length) {
    alert("終了！");
    goHome();
  } else {
    showQuestion();
  }
}

function goHome() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("body").className = "";
}
