// ===== 問題データ =====
const data = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["記憶", "演算", "表示", "印刷"],
      a: 1,
      e: "CPUは演算や制御を行う装置です。"
    },
    {
      q: "2進数の10は10進数でいくつ？",
      c: ["1", "2", "3", "4"],
      a: 1,
      e: "2進数の10は10進数で2です。"
    },
    {
      q: "RAMの特徴は？",
      c: ["電源を切っても残る", "一時記憶", "補助記憶", "読み取り専用"],
      a: 1,
      e: "RAMは一時的に使われる記憶装置です。"
    },
    {
      q: "OSの役割は？",
      c: ["計算のみ", "全体管理", "印刷", "通信"],
      a: 1,
      e: "OSはコンピュータ全体を管理します。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["J", "W", "N", "kg"],
      a: 2,
      e: "力の単位はニュートン(N)です。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      c: ["犬", "りんご", "本", "車"],
      a: 1,
      e: "apple は「りんご」です。"
    }
  ]
};

// ===== 状態 =====
let questions = [];
let order = [];
let index = 0;

let correctCount = 0;
let solvedCount = 0;
let answeredOnce = false;
let lastCorrect = false;

// ===== 開始 =====
function startQuiz(type) {
  questions = data[type];
  order = shuffle([...Array(questions.length).keys()]);
  index = 0;
  correctCount = 0;
  solvedCount = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  updateRate();
  showQuestion();
}

// ===== シャッフル =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== 表示 =====
function showQuestion() {
  answeredOnce = false;
  document.getElementById("explanation").classList.add("hidden");

  const q = questions[order[index]];
  document.getElementById("question").textContent = q.q;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  const shuffled = shuffle(
    q.c.map((text, i) => ({ text, i }))
  );

  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => checkAnswer(choice.i, btn);
    choices.appendChild(btn);
  });
}

// ===== 回答 =====
function checkAnswer(i, btn) {
  const q = questions[order[index]];

  btn.classList.remove("correct", "wrong");

  if (i === q.a) {
    btn.classList.add("correct");
    lastCorrect = true;
  } else {
    btn.classList.add("wrong");
    lastCorrect = false;
  }

  document.getElementById("explanation").textContent = "解説：" + q.e;
  document.getElementById("explanation").classList.remove("hidden");

  answeredOnce = true;
}

// ===== 次 =====
function nextQuestion() {
  if (answeredOnce) {
    solvedCount++;
    if (lastCorrect) correctCount++;
    updateRate();
  }

  index++;
  if (index >= order.length) {
    order = shuffle(order);
    index = 0;
  }
  showQuestion();
}

// ===== 前 =====
function prevQuestion() {
  if (index > 0) index--;
  showQuestion();
}

// ===== 正答率 =====
function updateRate() {
  let rate = solvedCount === 0 ? 0 :
    Math.round((correctCount / solvedCount) * 100);

  document.getElementById("rate").textContent =
    `正答率 ${rate}%（${correctCount} / ${solvedCount}）`;
}

// ===== ホーム =====
function goHome() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}
