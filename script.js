const data = {
  it: [
    {
      q: "CPUの主な役割は？",
      o: ["記憶", "演算", "表示", "印刷"],
      a: 1,
      e: "CPUは演算や制御を行う装置です。"
    },
    {
      q: "2進数の101は10進数でいくつ？",
      o: ["4", "5", "6", "7"],
      a: 1,
      e: "2進数101は10進数で5です。"
    },
    {
      q: "RAMの特徴として正しいものは？",
      o: ["電源を切っても残る", "一時的に使われる", "補助記憶装置", "読み取り専用"],
      a: 1,
      e: "RAMは一時的にデータを保存します。"
    },
    {
      q: "OSの役割は？",
      o: ["計算を行う", "機器や資源を管理する", "印刷のみ行う", "通信だけ行う"],
      a: 1,
      e: "OSはコンピュータ全体を管理します。"
    }
  ],

  physics: [
    { q:"力の単位は？", o:["N","J","W","Pa"], a:0, e:"力の単位はニュートン(N)です。" },
    { q:"速さの式は？", o:["距離÷時間","時間÷距離","距離×時間","力×距離"], a:0, e:"速さ＝距離÷時間" }
  ],

  english: [
    { q:"I ___ a pen.", o:["have","has","had","having"], a:0, e:"主語が I のときは have" },
    { q:"apple の複数形は？", o:["apples","applees","appls","apple"], a:0, e:"普通に s をつけます。" }
  ]
};

let subject, qs, idx = 0;
let answered = [];

function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}

function start(s){
  subject = s;
  qs = shuffle([...data[s]]);
  qs.forEach(q => q.o = shuffle(q.o));
  idx = 0;
  answered = [];
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  show();
}

function show(){
  const q = qs[idx];
  question.textContent = q.q;
  options.innerHTML = "";
  explain.textContent = "";

  q.o.forEach((opt, i) => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.className = "option";
    b.onclick = () => {
      if(answered[idx] === undefined){
        answered[idx] = (i === q.a);
      }
      b.classList.add(i === q.a ? "correct" : "wrong");
      explain.textContent = q.e;
      updateRate();
    };
    options.appendChild(b);
  });

  updateRate();
}

function updateRate(){
  const total = answered.filter(v => v !== undefined).length;
  const ok = answered.filter(v => v).length;
  rate.textContent = `正答率 ${total ? Math.round(ok/total*100) : 0}%（${ok}/${total}）`;
}

function nextQ(){
  if(idx < qs.length - 1){ idx++; show(); }
}

function prevQ(){
  if(idx > 0){ idx--; show(); }
}

function goHome(){
  quiz.classList.add("hidden");
  home.classList.remove("hidden");
}

function toggleMenu(){
  menu.classList.toggle("hidden");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}
