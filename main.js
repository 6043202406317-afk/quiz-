let currentQuiz = [];
let currentIndex = 0;
let correctCount = 0;
let totalCount = 0;

// ===== 問題データ =====
const quizzes = {
  it: [
    {
      q: "CPUの役割は？",
      choices: ["演算と制御", "記憶", "通信", "保存"],
      answer: "演算と制御",
      exp: "CPUはコンピュータの中枢で演算と制御を行う"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      choices: ["N", "kg", "m", "s"],
      answer: "N",
      exp: "力の単位はニュートン(N)"
    }
  ],
  english: [
    {
      q: "appleの意味は？",
      choices: ["りんご", "犬", "本", "机"],
      answer: "りんご",
      exp: "appleはりんご"
    }
  ]
};

// ===== 開始 =====
function startQuiz(type) {
  currentQuiz = quizzes[type];
  currentIndex = 0;
  correctCount = 0;
  totalCount = 0;

  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  showQuestion();
}

// ===== 問題表示 =====
function showQuestion() {
  const q = currentQuiz[currentIndex];
  document.getElementById("question").textContent = q.q;
  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  // 選択肢シャッフル
  const shuffled = [...q.choices].sort(() => Math.random() - 0.5);

  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesDiv.appendChild(btn);
  });
}

// ===== 判定 =====
function checkAnswer(choice) {
  const q = currentQuiz[currentIndex];
  totalCount++;

  if (choice === q.answer) {
    correctCount++;
    document.getElementById("result").textContent = "⭕ 正解！";
  } else {
    document.getElementById("result").textContent = "❌ 不正解";
  }

  document.getElementById("explanation").textContent = q.exp;
  document.getElementById("rate").textContent =
    `正答率：${Math.round(correctCount / totalCount * 100)}%`;
}

// ===== 次へ =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= currentQuiz.length) {
    alert("終了！");
    goHome();
  } else {
    showQuestion();
  }
}

// ===== ホームに戻る =====
function goHome() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("home").style.display = "block";
}
