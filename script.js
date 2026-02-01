const questions = {
  info: [
    {
      q: "2進数で101は10進数でいくつ？",
      choices: ["3", "4", "5", "6"],
      answer: "5"
    },
    {
      q: "CPUの役割はどれ？",
      choices: ["記憶", "演算", "表示", "通信"],
      answer: "演算"
    }
    // ← ここに前までの問題をどんどん追加
  ]
};

let order = [];
let index = 0;
let answered = {}; // 回答済み記録
let correct = 0;

function startQuiz(subject) {
  order = [...questions[subject]];
  shuffle(order);
  index = 0;
  answered = {};
  correct = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
  updateStatus();
}

function showQuestion() {
  const q = order[index];
  document.getElementById("question").textContent = q.q;

  const choices = shuffle([...q.choices]);
  const area = document.getElementById("choices");
  area.innerHTML = "";

  choices.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c;
    btn.className = "choice";
    btn.onclick = () => selectAnswer(c);
    area.appendChild(btn);
  });
}

function selectAnswer(choice) {
  if (answered[index]) return; // 選び直し無効

  answered[index] = true;
  if (choice === order[index].answer) {
    correct++;
  }
  updateStatus();
}

function updateStatus() {
  const answeredCount = Object.keys(answered).length;
  const rate = answeredCount === 0 ? 0 : Math.round(correct / answeredCount * 100);
  document.getElementById("rate").textContent = rate + "%";
  document.getElementById("count").textContent =
    `(${answeredCount} / ${order.length})`;
}

function nextQuestion() {
  index = (index + 1) % order.length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + order.length) % order.length;
  showQuestion();
}

function goHome() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
