const data = {
  it: [
    { q: "CPUの役割は？", c: ["記憶", "演算", "表示", "印刷"], a: 1, e: "CPUは演算と制御を行います。" },
    { q: "2進数の10は？", c: ["1", "2", "3", "4"], a: 1, e: "10進数で2です。" },
    { q: "RAMの特徴は？", c: ["永続", "一時", "補助", "ROM"], a: 1, e: "RAMは一時記憶です。" }
  ],
  physics: [
    { q: "力の単位は？", c: ["J", "W", "N", "kg"], a: 2, e: "ニュートンです。" }
  ],
  english: [
    { q: "appleの意味は？", c: ["犬", "りんご", "本", "車"], a: 1, e: "りんごです。" }
  ]
};

let questions = [];
let index = 0;
let locked = false;

/* 開始 */
function startQuiz(type) {
  questions = shuffle([...data[type]]);
  index = 0;
  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

/* 表示 */
function showQuestion() {
  locked = false;
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("explanation").textContent = "";

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  shuffle(q.c.map((t,i)=>({t,i}))).forEach(o=>{
    const b = document.createElement("button");
    b.textContent = o.t;
    b.onclick = () => answer(o.i, b);
    choices.appendChild(b);
  });
}

/* 判定 */
function answer(i, btn) {
  if (locked) return;
  locked = true;
  const q = questions[index];

  if (i === q.a) btn.classList.add("correct");
  else btn.classList.add("wrong");

  document.getElementById("explanation").textContent = "解説：" + q.e;
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
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

/* メニュー */
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
  sideMenu.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};
overlay.onclick = () => {
  sideMenu.classList.add("hidden");
  overlay.classList.add("hidden");
};

/* ダークモード */
document.getElementById("darkBtn").onclick = () => {
  document.documentElement.classList.toggle("dark");
};

/* シャッフル */
function shuffle(a) {
  return a.sort(()=>Math.random()-0.5);
}
