const data = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["表示", "演算と制御", "記憶", "通信"],
      a: 1,
      e: "CPUは演算と制御を行います。"
    },
    {
      q: "RAMの特徴は？",
      c: ["電源を切っても残る", "一時的に使う", "補助記憶装置", "読み取り専用"],
      a: 1,
      e: "RAMは一時的に使われます。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["J", "N", "W", "kg"],
      a: 1,
      e: "力の単位はニュートン（N）です。"
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
let answered = new Set();
let correct = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz(type) {
  questions = shuffle([...data[type]]);
  index = 0;
  answered.clear();
  correct = 0;
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

  const area = document.getElementById("choices");
  area.innerHTML = "";

  shuffle(q.c.map((text, i) => ({ text, i }))).forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => selectAnswer(choice.i, btn);
    area.appendChild(btn);
  });

  updateStatus();
}

function selectAnswer(i, btn) {
  if (!answered.has(index)) {
    answered.add(index);
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
  const rate = answered.size === 0 ? 0 : Math.round((correct / answered.size) * 100);
  document.getElementById("status").textContent =
    `正答率 ${rate}%（${answered.size} / ${questions.length}）`;
}

function nextQuestion() {
  index = (index + 1) % questions.length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + questions.length) % questions.length;
  showQuestion();
}

function goHome() {
  showScreen("home");
}
