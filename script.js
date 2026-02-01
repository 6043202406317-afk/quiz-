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
      q: "RAMの特徴として正しいものは？",
      c: ["電源を切っても残る", "一時的に使われる", "補助記憶装置", "読み取り専用"],
      a: 1,
      e: "RAMは一時記憶装置です。"
    },
    {
      q: "OSの役割はどれ？",
      c: ["計算をする", "機器を管理する", "印刷する", "通信のみ行う"],
      a: 1,
      e: "OSはコンピュータ全体を管理します。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["J", "W", "N", "kg"],
      a: 2,
      e: "力の単位はニュートン(N)です。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      c: ["犬", "りんご", "本", "車"],
      a: 1,
      e: "apple は りんご です。"
    }
  ]
};

let questions = [];
let index = 0;
let answeredMap = [];
let correct = 0;
let answered = 0;

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

// 教科選択
document.querySelectorAll("[data-subject]").forEach(btn => {
  btn.onclick = () => startQuiz(btn.dataset.subject);
});

function startQuiz(type) {
  questions = shuffle(data[type]);
  answeredMap = new Array(questions.length).fill(null);
  index = 0;
  correct = 0;
  answered = 0;

  document.getElementById("home").classList.remove("active");
  document.getElementById("quiz").classList.add("active");

  showQuestion();
}

function showQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").classList.add("hidden");

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  shuffle(
    q.c.map((t, i) => ({ t, i }))
  ).forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.t;
    btn.onclick = () => answer(choice.i, btn);
    choicesDiv.appendChild(btn);
  });

  updateStatus();
}

function answer(selected, btn) {
  const q = questions[index];
  document.querySelectorAll("#choices button").forEach(b => {
    b.classList.remove("correct", "wrong");
  });

  btn.classList.add(selected === q.a ? "correct" : "wrong");

  if (answeredMap[index] === null) {
    answeredMap[index] = selected;
    answered++;
    if (selected === q.a) correct++;
  }

  const exp = document.getElementById("explanation");
  exp.textContent = "解説：" + q.e;
  exp.classList.remove("hidden");

  updateStatus();
}

function updateStatus() {
  const rate = answered ? Math.round((correct / answered) * 100) : 0;
  document.getElementById("status").textContent =
    `正答率：${rate}%（${answered} / ${questions.length}）`;
}

document.getElementById("next").onclick = () => {
  index = (index + 1) % questions.length;
  showQuestion();
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + questions.length) % questions.length;
  showQuestion();
};

document.getElementById("homeBtn").onclick = () => {
  document.getElementById("quiz").classList.remove("active");
  document.getElementById("home").classList.add("active");
};
