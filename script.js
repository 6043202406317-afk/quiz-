// ===== 問題 =====
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
      c: [
        "電源を切っても残る",
        "一時的に使われる",
        "補助記憶装置",
        "読み取り専用"
      ],
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

// ===== 状態 =====
let questions = [];
let order = [];
let index = 0;

let correct = 0;
let answered = 0;
let counted = false;

// ===== シャッフル =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ===== 開始 =====
function startQuiz(type) {
  questions = data[type];
  order = [...Array(questions.length).keys()];
  shuffle(order);

  index = 0;
  correct = 0;
  answered = 0;

  document.getElementById("rate").textContent = "正答率：--%";

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
}

// ===== 表示 =====
function showQuestion() {
  counted = false;

  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";

  const q = questions[order[index]];
  document.getElementById("question").textContent = q.q;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  let choices = q.c.map((text, i) => ({ text, index: i }));
  shuffle(choices);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => checkAnswer(choice.index, btn);
    choicesDiv.appendChild(btn);
  });
}

// ===== 判定 =====
function checkAnswer(selected, btn) {
  const q = questions[order[index]];

  document.querySelectorAll("#choices button").forEach(b => {
    b.classList.remove("correct", "wrong");
  });

  if (selected === q.a) {
    btn.classList.add("correct");
    document.getElementById("result").textContent = "⭕ 正解！";
  } else {
    btn.classList.add("wrong");
    document.getElementById("result").textContent = "❌ 不正解";
  }

  if (!counted) {
    counted = true;
    answered++;
    if (selected === q.a) correct++;

    const rate = Math.round((correct / answered) * 100);
    document.getElementById("rate").textContent =
      `正答率：${rate}%（${correct}/${answered}）`;

    document.getElementById("explanation").textContent =
      "解説：" + q.e;
  }
}

// ===== 次 / 前 =====
function nextQuestion() {
  index++;
  if (index >= order.length) {
    shuffle(order);
    index = 0;
  }
  showQuestion();
}

function prevQuestion() {
  if (index > 0) {
    index--;
    showQuestion();
  }
}

// ===== ホーム =====
function goHome() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}
