const quizData = {
  it: [
    { q: "CPUの役割は？", c: ["計算処理", "保存", "表示", "通信"], a: 0, e: "CPUは計算と制御を行う。" },
    { q: "2進数の10は？", c: ["1", "2", "3", "4"], a: 1, e: "10は10進数で2。" },
    { q: "RAMの特徴は？", c: ["一時記憶", "永久保存", "外部記憶", "読み取り専用"], a: 0, e: "RAMは一時的に使われる。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["kg", "N", "J", "W"], a: 1, e: "力の単位はN。" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "車", "本"], a: 1, e: "appleはりんご。" }
  ]
};

let subject = "";
let index = 0;
let answered = {};
let correctCount = 0;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const explanation = document.getElementById("explanation");
const rate = document.getElementById("rate");

function startQuiz(s) {
  subject = s;
  index = 0;
  answered = {};
  correctCount = 0;
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = quizData[subject][index];
  question.textContent = q.q;
  explanation.textContent = "";
  choices.innerHTML = "";

  q.c.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "choice";

    btn.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach(b => {
        b.classList.remove("correct", "wrong");
      });

      if (!(index in answered)) {
        answered[index] = i === q.a;
        if (answered[index]) correctCount++;
      }

      if (i === q.a) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }

      explanation.textContent = q.e;
      updateRate();
    });

    choices.appendChild(btn);
  });
}

function updateRate() {
  const total = Object.keys(answered).length;
  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  rate.textContent = `正答率：${percent}%（${correctCount} / ${total}）`;
}

function nextQuestion() {
  index = (index + 1) % quizData[subject].length;
  showQuestion();
}

function prevQuestion() {
  index = (index - 1 + quizData[subject].length) % quizData[subject].length;
  showQuestion();
}

function goHome() {
  quiz.classList.add("hidden");
  home.classList.remove("hidden");
}

/* 設定 */
const menuBtn = document.getElementById("menuBtn");
const settings = document.getElementById("settings");
const darkToggle = document.getElementById("darkToggle");

menuBtn.onclick = (e) => {
  e.stopPropagation();
  settings.style.display =
    settings.style.display === "block" ? "none" : "block";
};

document.onclick = () => {
  settings.style.display = "none";
};

settings.onclick = (e) => e.stopPropagation();

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};
