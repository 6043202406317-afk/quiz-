const data = {
  it: [
    { q: "CPUの役割は？", c: ["計算", "保存", "表示", "通信"], a: 0, e: "CPUは計算と制御を行う。" },
    { q: "2進数10は？", c: ["1", "2", "3", "4"], a: 1, e: "10進数で2。" },
    { q: "RAMの特徴は？", c: ["一時記憶", "永久保存", "外部記憶", "ROM"], a: 0, e: "RAMは一時記憶。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["kg", "N", "J", "W"], a: 1, e: "力の単位はN。" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "車", "本"], a: 1, e: "appleはりんご。" }
  ]
};

let subject = "";
let questions = [];
let index = 0;
let answered = {};
let correct = 0;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const explanation = document.getElementById("explanation");
const rate = document.getElementById("rate");

/* シャッフル関数 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* 開始 */
function startQuiz(type) {
  subject = type;
  questions = [...data[type]];
  shuffle(questions);          // ★問題ランダム
  index = 0;
  answered = {};
  correct = 0;

  home.classList.add("hidden");
  quiz.classList.remove("hidden");

  showQuestion();
}

/* 表示 */
function showQuestion() {
  const q = questions[index];
  question.textContent = q.q;
  explanation.textContent = "";
  choices.innerHTML = "";

  // 選択肢を index 付きでシャッフル
  const choiceList = q.c.map((text, i) => ({ text, i }));
  shuffle(choiceList);         // ★選択肢ランダム

  choiceList.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    btn.className = "choice";

    btn.onclick = () => {
      document.querySelectorAll(".choice").forEach(b =>
        b.classList.remove("correct", "wrong")
      );

      if (!(index in answered)) {
        answered[index] = true;
        if (item.i === q.a) correct++;
      }

      btn.classList.add(item.i === q.a ? "correct" : "wrong");
      explanation.textContent = q.e;
      updateRate();
    };

    choices.appendChild(btn);
  });
}

/* 正答率 */
function updateRate() {
  const total = Object.keys(answered).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  rate.textContent = `正答率：${percent}%`;
}

/* 移動 */
function nextQuestion() {
  index = (index + 1) % questions.length;
  showQuestion();
}
function prevQuestion() {
  index = (index - 1 + questions.length) % questions.length;
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
settings.onclick = e => e.stopPropagation();
darkBtn.onclick = () => document.body.classList.toggle("dark");
