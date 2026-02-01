const quizData = {
  it: [
    { q: "CPUの役割は？", c: ["計算処理", "保存", "表示", "通信"], a: 0, e: "CPUは計算と制御を行う。" },
    { q: "2進数の1+1は？", c: ["1", "10", "11", "0"], a: 1, e: "2進数では10になる。" },
    { q: "RAMの特徴は？", c: ["揮発性", "永久保存", "低速", "外部記憶"], a: 0, e: "電源を切ると消える。" },
    { q: "OSの例は？", c: ["Windows", "USB", "CPU", "HDMI"], a: 0, e: "OSは基本ソフト。" }
  ],
  physics: [],
  english: []
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

/* クイズ開始 */
function startQuiz(s) {
  subject = s;
  index = 0;
  answered = {};
  correctCount = 0;
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

/* 表示 */
function showQuestion() {
  const data = quizData[subject][index];
  question.textContent = data.q;
  explanation.textContent = "";
  choices.innerHTML = "";

  const shuffled = data.c.map((v, i) => ({ v, i }))
    .sort(() => Math.random() - 0.5);

  shuffled.forEach(obj => {
    const btn = document.createElement("button");
    btn.textContent = obj.v;
    btn.className = "choice";

    btn.onclick = () => {
      explanation.textContent = data.e;

      document.querySelectorAll(".choice").forEach(b => {
        b.classList.remove("correct", "wrong");
      });

      if (!(index in answered)) {
        answered[index] = obj.i === data.a;
        if (answered[index]) correctCount++;
      }

      if (obj.i === data.a) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("wrong");
      }

      updateRate();
    };

    choices.appendChild(btn);
  });
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

function updateRate() {
  rate.textContent = `正答率: ${correctCount} / ${Object.keys(answered).length}`;
}

/* 設定 */
const menuBtn = document.getElementById("menuBtn");
const settings = document.getElementById("settings");
const darkToggle = document.getElementById("darkToggle");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  settings.style.display = settings.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
  settings.style.display = "none";
});

settings.addEventListener("click", e => e.stopPropagation());

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};
