// ===== 問題データ =====
const questions = [
  {
    q: "HTMLでページのタイトルを指定するタグはどれ？",
    choices: ["<head>", "<title>", "<meta>", "<body>"],
    answer: 1,
    explanation: "<title>タグで指定します。"
  },
  {
    q: "JavaScriptで文字を表示する命令は？",
    choices: ["print()", "console.log()", "echo()", "write()"],
    answer: 1,
    explanation: "console.log() を使います。"
  }
];

let current = 0;
let correct = 0;
let answered = false;

// ===== 要素取得 =====
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const explanationEl = document.getElementById("explanation");
const rateEl = document.getElementById("rate");

// ===== 配列シャッフル =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ===== 問題表示 =====
function showQuestion() {
  answered = false;
  resultEl.textContent = "";
  explanationEl.textContent = "";
  choicesEl.innerHTML = "";

  const q = questions[current];
  questionEl.textContent = q.q;

  // 選択肢をシャッフル
  const shuffled = q.choices.map((text, index) => ({
    text,
    index
  }));
  shuffle(shuffled);

  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.style.display = "block";
    btn.style.margin = "10px 0";
    btn.onclick = () => checkAnswer(choice.index);
    choicesEl.appendChild(btn);
  });
}

// ===== 正誤判定 =====
function checkAnswer(selected) {
  if (answered) return;
  answered = true;

  const q = questions[current];

  if (selected === q.answer) {
    resultEl.textContent = "⭕ 正解！";
    correct++;
  } else {
    resultEl.textContent = "❌ 不正解";
  }

  explanationEl.textContent = q.explanation;
  updateRate();
}

// ===== 正答率 =====
function updateRate() {
  const rate = Math.round((correct / (current + 1)) * 100);
  rateEl.textContent = `正答率：${rate}%`;
}

// ===== 次の問題 =====
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    questionEl.textContent = "終了！";
    choicesEl.innerHTML = "";
    resultEl.textContent = "";
    explanationEl.textContent = `最終正答率：${Math.round((correct / questions.length) * 100)}%`;
  }
}

// ===== 初期表示 =====
showQuestion();
