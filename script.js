const quizzes = {
  it: [
    {
      q: "CPUの役割はどれ？",
      a: "演算と制御",
      c: ["記憶", "表示", "通信", "演算と制御"],
      e: "CPUはコンピュータ全体の演算と制御を行う中枢装置です。"
    },
    {
      q: "2進数の 10 は10進数でいくつ？",
      a: "2",
      c: ["1", "2", "10", "8"],
      e: "2進数の10は、10進数では2です。"
    },
    {
      q: "OSの役割として正しいものは？",
      a: "ハードウェアとソフトの仲介",
      c: ["計算のみ行う", "通信専用", "記憶装置", "ハードウェアとソフトの仲介"],
      e: "OSはアプリとハードウェアの橋渡しをします。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      a: "ニュートン",
      c: ["ワット", "ジュール", "ニュートン", "パスカル"],
      e: "力の単位はニュートン(N)です。"
    }
  ],
  english: [
    {
      q: "apple の意味は？",
      a: "りんご",
      c: ["犬", "机", "りんご", "走る"],
      e: "apple は「りんご」という意味です。"
    }
  ]
};

let list = [];
let index = 0;
let answered = new Set();
let correct = 0;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");

function switchScreen(show) {
  home.classList.remove("active");
  quiz.classList.remove("active");
  show.classList.add("active");
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

document.querySelectorAll("[data-subject]").forEach(btn => {
  btn.addEventListener("click", () => {
    startQuiz(btn.dataset.subject);
  });
});

function startQuiz(subject) {
  list = shuffle([...quizzes[subject]]);
  index = 0;
  answered.clear();
  correct = 0;
  switchScreen(quiz);
  showQuestion();
}

function showQuestion() {
  const q = list[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").classList.add("hidden");

  document.getElementById("count").textContent =
    `問題 ${index + 1} / ${list.length}`;

  const box = document.getElementById("choices");
  box.innerHTML = "";

  shuffle([...q.c]).forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(choice, q));
    box.appendChild(btn);
  });

  updateStatus();
}

function selectAnswer(choice, q) {
  if (answered.has(index)) return;

  answered.add(index);
  if (choice === q.a) correct++;

  const exp = document.getElementById("explanation");
  exp.textContent = q.e;
  exp.classList.remove("hidden");

  updateStatus();
}

function updateStatus() {
  const rate = answered.size === 0 ? 0 : Math.round(correct / answered.size * 100);
  document.getElementById("status").textContent =
    `正答率 ${rate}%（${correct} / ${answered.size}）`;
}

document.getElementById("next").onclick = () => {
  index = (index + 1) % list.length;
  showQuestion();
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + list.length) % list.length;
  showQuestion();
};

document.getElementById("homeBtn").onclick = () => {
  switchScreen(home);
};
