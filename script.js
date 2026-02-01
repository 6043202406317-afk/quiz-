const data = {
  it: [
    { q: "CPUの役割は？", c: ["計算", "保存", "表示", "通信"], a: 0, e: "CPUは計算と制御を行う。" },
    { q: "2進数10は？", c: ["1", "2", "3", "4"], a: 1, e: "10進数で2。" },
    { q: "RAMの特徴は？", c: ["一時記憶", "永久保存", "外部記憶", "ROM"], a: 0, e: "RAMは一時記憶。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["kg", "N", "J", "W"], a: 1, e: "力はN。" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "車", "本"], a: 1, e: "appleはりんご。" }
  ]
};

let subject = "";
let index = 0;
let answered = {};
let correct = 0;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const explanation = document.getElementById("explanation");
const rate = document.getElementById("rate");

function startQuiz(type) {
  subject = type;
  index = 0;
  answered = {};
  correct = 0;
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = data[subject][index];
  question.textContent = q.q;
  explanation.textContent = "";
  choices.innerHTML = "";

  q.c.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "choice";

    btn.onclick = () => {
      document.querySelectorAll(".choice").forEach(b =>
        b.classList.remove("correct", "wrong")
      );

      if (!(index in answered)) {
        answered[index] = true;
        if (i === q.a) correct++;
      }

      btn.classList.add(i === q.a ? "correct" : "wrong");
      explanation.textContent = q.e;
      updateRate();
    };

    choices.appendChild(btn);
  });
}

function updateRate() {
  const total = Object.keys(answered).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  rate.textContent = `正答率：${percent}%（${correct} / ${total}）`;
}

function nextQuestion() {
  index = (index + 1) % data[subject].length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + data[subject].length) % data[subject].length;
  showQuestion();
}

function goHome() {
  quiz.classList.add("hidden");
  home.classList.remove("hidden");
}

/* 設定 */
const menuBtn = document.getElementById("menuBtn");
const settings = document.getElementById("settings");
const darkBtn = document.getElementById("darkBtn");

menuBtn.onclick = (e) => {
  e.stopPropagation();
  settings.classList.toggle("hidden");
};

document.onclick = () => settings.classList.add("hidden");
settings.onclick = (e) => e.stopPropagation();

darkBtn.onclick = () => {
  document.body.classList.toggle("dark");
};
