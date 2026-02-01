const quizzes = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["演算と制御", "記憶", "表示", "通信"],
      a: 0,
      e: "CPUは演算と制御を行います。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["N", "J", "W", "Pa"],
      a: 0,
      e: "力の単位はニュートン（N）です。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      c: ["りんご", "みかん", "ぶどう", "ばなな"],
      a: 0,
      e: "apple は りんご です。"
    }
  ]
};

let currentQuiz = [];
let index = 0;
let answered = new Set();
let correct = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz(type) {
  currentQuiz = shuffle([...quizzes[type]]);
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
  const q = currentQuiz[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").textContent = "";

  const choices = shuffle(q.c.map((text, i) => ({ text, i })));
  const area = document.getElementById("choices");
  area.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => select(choice.i, btn);
    area.appendChild(btn);
  });

  updateStatus();
}

function select(i, btn) {
  if (!answered.has(index)) {
    answered.add(index);
    if (i === currentQuiz[index].a) correct++;
  }

  document.querySelectorAll(".choices button").forEach(b => {
    b.classList.remove("correct", "wrong");
  });

  btn.classList.add(i === currentQuiz[index].a ? "correct" : "wrong");
  document.getElementById("explanation").textContent = currentQuiz[index].e;
  updateStatus();
}

function updateStatus() {
  const rate = answered.size === 0 ? 0 : Math.round((correct / answered.size) * 100);
  document.getElementById("status").textContent =
    `正答率 ${rate}%（${answered.size} / ${currentQuiz.length}）`;
}

function nextQuestion() {
  index = (index + 1) % currentQuiz.length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + currentQuiz.length) % currentQuiz.length;
  showQuestion();
}

function goHome() {
  showScreen("home");
}
