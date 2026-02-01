const questions = [
  {
    q: "2進数1010を10進数にすると？",
    choices: ["8", "9", "10", "12"],
    answer: 2,
    exp: "1010(2) = 8 + 2 = 10"
  },
  {
    q: "CPUの役割はどれ？",
    choices: ["記憶", "制御と演算", "表示", "通信"],
    answer: 1,
    exp: "CPUは制御と演算を行う装置です。"
  }
];

let order = [];
let current = 0;
let solved = {};
let correctCount = 0;
let answeredCount = 0;

function startQuiz() {
  document.getElementById("home").classList.remove("active");
  document.getElementById("quiz").classList.add("active");
  shuffleOrder();
  showQuestion();
}

function shuffleOrder() {
  order = [...Array(questions.length).keys()];
  order.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  const q = questions[order[current]];
  document.getElementById("question").textContent = q.q;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("explanation").style.display = "none";

  const shuffled = q.choices.map((c, i) => ({ c, i }))
    .sort(() => Math.random() - 0.5);

  shuffled.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = item.c;
    btn.onclick = () => selectAnswer(btn, item.i);
    choicesDiv.appendChild(btn);
  });

  updateRate();
}

function selectAnswer(btn, index) {
  const qIndex = order[current];
  const q = questions[qIndex];

  if (!(qIndex in solved)) {
    solved[qIndex] = true;
    answeredCount++;
    if (index === q.answer) {
      correctCount++;
    }
  }

  document.querySelectorAll(".choice").forEach((b, i) => {
    if (i === q.answer) b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
  });

  const exp = document.getElementById("explanation");
  exp.textContent = q.exp;
  exp.style.display = "block";

  updateRate();
}

function updateRate() {
  const rate = answeredCount === 0 ? 0 :
    Math.round((correctCount / answeredCount) * 100);
  document.getElementById("rate").textContent =
    `正答率 ${rate}%（${correctCount} / ${answeredCount}）`;
}

function nextQuestion() {
  current++;
  if (current >= order.length) {
    shuffleOrder();
    current = 0;
  }
  showQuestion();
}

function prevQuestion() {
  current--;
  if (current < 0) current = order.length - 1;
  showQuestion();
}

function goHome() {
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("home").classList.add("active");
}
