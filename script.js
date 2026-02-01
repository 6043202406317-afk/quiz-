const quizzes = {
  it: [
    {
      q: "CPUの役割はどれ？",
      a: "演算と制御",
      c: ["記憶", "表示", "通信", "演算と制御"],
      e: "CPUはコンピュータ全体の演算と制御を行います。"
    },
    {
      q: "2進数の10は10進数でいくつ？",
      a: "2",
      c: ["1", "2", "8", "10"],
      e: "2進数の10は10進数では2です。"
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
let answered = new Map(); // index → true/false
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
  btn.addEventListener("click", () => startQuiz(btn.dataset.subject));
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

  const exp = document.getElementById("explanation");
  exp.classList.add("hidden");
  exp.textContent = "";

  const box = document.getElementById("choices");
  box.innerHTML = "";

  shuffle([...q.c]).forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;

    btn.addEventListener("click", () => {
      if (answered.has(index)) return;

      const isCorrect = choice === q.a;
      answered.set(index, isCorrect);

      if (isCorrect) {
        btn.classList.add("correct");
        correct++;
      } else {
        btn.classList.add("wrong");
      }

      exp.textContent = q.e;
      exp.classList.remove("hidden");

      updateStatus();
    });

    box.appendChild(btn);
  });

  updateStatus();
}

function updateStatus() {
  const solved = answered.size;
  const rate = solved === 0 ? 0 : Math.round(correct / solved * 100);
  document.getElementById("status").textContent =
    `正答率 ${rate}%（${correct} / ${solved}）`;
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
