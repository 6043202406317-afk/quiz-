const questions = [
  {
    q: "2進数の1010は10進数でいくつ？",
    choices: ["8", "9", "10", "12"],
    answer: 2,
    exp: "1010(2) = 8 + 2 = 10"
  }
];

let current = 0;
let answered = false;
let correct = 0;
let total = 0;

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.q;
  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";
  answered = false;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => checkAnswer(i);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(i) {
  if (!answered) {
    total++;
    if (i === questions[current].answer) {
      correct++;
      document.getElementById("result").textContent = "⭕ 正解";
    } else {
      document.getElementById("result").textContent = "❌ 不正解";
    }
    document.getElementById("explanation").textContent =
      questions[current].exp;
    answered = true;
    updateRate();
  }
}

function updateRate() {
  const rate = Math.round((correct / total) * 100);
  document.getElementById("rate").textContent =
    `正答率：${rate}%`;
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    document.getElementById("question").textContent = "";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("result").textContent = "";
    document.getElementById("explanation").textContent = "";
    return;
  }
  showQuestion();
}

showQuestion();
