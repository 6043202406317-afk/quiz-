const data = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["記憶", "演算と制御", "表示", "通信"],
      a: 1,
      e: "CPUは演算と制御を行います。"
    },
    {
      q: "2進数の10は10進数でいくつ？",
      c: ["1", "2", "3", "4"],
      a: 1,
      e: "2進数の10は10進数で2です。"
    },
    {
      q: "RAMの特徴はどれ？",
      c: ["電源を切っても残る", "一時的に使う", "補助記憶装置", "読み取り専用"],
      a: 1,
      e: "RAMは一時的に使われる記憶装置です。"
    },
    {
      q: "OSの役割はどれ？",
      c: ["計算を行う", "機器や資源を管理する", "印刷する", "通信だけする"],
      a: 1,
      e: "OSはコンピュータ全体を管理します。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["J", "N", "W", "kg"],
      a: 1,
      e: "力の単位はニュートン(N)です。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      c: ["犬", "りんご", "本", "車"],
      a: 1,
      e: "apple は りんご です。"
    }
  ]
};

let questions = [];
let index = 0;
let answeredSet = new Set();
let correct = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz(type) {
  questions = shuffle([...data[type]]);
  index = 0;
  correct = 0;
  answeredSet.clear();
  showScreen("quiz");
  showQuestion();
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").textContent = "";

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  shuffle(q.c.map((t, i) => ({ t, i }))).forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.t;
    btn.onclick = () => selectAnswer(choice.i, btn);
    choices.appendChild(btn);
  });

  updateStatus();
}

function selectAnswer(i, btn) {
  if (!answeredSet.has(index)) {
    answeredSet.add(index);
    if (i === questions[index].a) correct++;
  }

  document.querySelectorAll(".choices button").forEach(b => {
    b.classList.remove("correct", "wrong");
  });

  btn.classList.add(i === questions[index].a ? "correct" : "wrong");
  document.getElementById("explanation").textContent = questions[index].e;
  updateStatus();
}

function updateStatus() {
  const rate =
    answeredSet.size === 0 ? 0 : Math.round((correct / answeredSet.size) * 100);
  document.getElementById("status").textContent =
    `正答率 ${rate}%（${answeredSet.size} / ${questions.length}）`;
}

function nextQuestion() {
  index++;
  if (index >= questions.length) {
    // 1周したらリセット
    index = 0;
    correct = 0;
    answeredSet.clear();
    questions = shuffle(questions);
  }
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + questions.length) % questions.length;
  showQuestion();
}

function goHome() {
  showScreen("home");
}
