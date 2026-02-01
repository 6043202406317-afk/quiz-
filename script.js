const data = {
  it: [
    {
      q: "CPUの役割はどれ？",
      c: ["記憶", "演算", "表示", "印刷"],
      a: 1,
      e: "CPUは演算や制御を行う装置です。"
    },
    {
      q: "2進数の10は10進数でいくつ？",
      c: ["1", "2", "3", "4"],
      a: 1,
      e: "2進数の10は10進数で2です。"
    },
    {
      q: "RAMの特徴は？",
      c: ["電源を切っても残る", "一時的に使う", "補助記憶", "読み取り専用"],
      a: 1,
      e: "RAMは一時的に使われます。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["J", "W", "N", "kg"],
      a: 2,
      e: "力の単位はNです。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      c: ["犬", "りんご", "本", "車"],
      a: 1,
      e: "apple は りんご。"
    }
  ]
};

let questions = [];
let index = 0;
let correct = 0;
let answered = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz(type) {
  questions = shuffle([...data[type]]);
  questions.forEach(q => q.c = shuffle(q.c));
  index = 0;
  correct = 0;
  answered = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").textContent = "";

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  q.c.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => checkAnswer(i, btn);
    choices.appendChild(btn);
  });

  updateRate();
}

function checkAnswer(i, btn) {
  const q = questions[index];
  answered++;

  if (i === q.a) {
    correct++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  document.getElementById("explanation").textContent = q.e;
  updateRate();
}

function updateRate() {
  const rate = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  document.getElementById("rate").textContent = `正答率：${rate}%`;
}

function nextQuestion() {
  if (index < questions.length - 1) {
    index++;
    showQuestion();
  }
}

function prevQuestion() {
  if (index > 0) {
    index--;
    showQuestion();
  }
}

function goHome() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}
