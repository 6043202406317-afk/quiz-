const quizzes = {
  it: [
    { q: "CPUの役割はどれ？", a: "演算と制御", c: ["表示", "演算と制御", "記憶", "通信"] }
  ],
  physics: [
    { q: "力の単位は？", a: "ニュートン", c: ["ジュール", "ワット", "ニュートン", "パスカル"] }
  ],
  english: [
    { q: "apple の意味は？", a: "りんご", c: ["犬", "りんご", "机", "走る"] }
  ]
};

let list = [];
let index = 0;
let answered = new Set();
let correct = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz(subject) {
  list = shuffle([...quizzes[subject]]);
  index = 0;
  answered.clear();
  correct = 0;
  switchScreen('quiz');
  showQuestion();
}

function showQuestion() {
  const q = list[index];
  document.getElementById("question").textContent = q.q;

  const choices = shuffle([...q.c]);
  const box = document.getElementById("choices");
  box.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => select(choice, q.a, btn);
    box.appendChild(btn);
  });

  updateStatus();
}

function select(choice, answer, btn) {
  if (answered.has(index)) return;

  answered.add(index);
  if (choice === answer) correct++;

  btn.style.background = choice === answer ? "#aaffaa" : "#ffaaaa";
  updateStatus();
}

function updateStatus() {
  const rate = answered.size === 0 ? 0 : Math.round((correct / answered.size) * 100);
  document.getElementById("status").textContent =
    `正答率 ${rate}%（${correct} / ${answered.size}）`;
}

function nextQuestion() {
  index = (index + 1) % list.length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + list.length) % list.length;
  showQuestion();
}

function goHome() {
  switchScreen('home');
}

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
