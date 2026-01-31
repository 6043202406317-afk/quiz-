const questions = [
  { q:"力の単位は？", c:["J","N","W","Pa"], a:1, e:"力の単位はニュートン。" },
  { q:"光の速さは約？", c:["3×10⁸m/s","3×10⁶m/s","300m/s","30m/s"], a:0, e:"真空中で約3×10⁸m/s。" }
];

initQuiz(questions);
function initQuiz(questions) {
  const rateEl = document.getElementById("rate");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");
  const explanationEl = document.getElementById("explanation");

  let order = [...Array(questions.length).keys()].sort(()=>Math.random()-0.5);
  let i = 0, counted=false, correct=0, total=0;

  window.nextQuestion = () => {
    i = (i+1) % order.length;
    show();
  };

  function show() {
    counted=false;
    resultEl.textContent="";
    explanationEl.textContent="";
    const q = questions[order[i]];
    questionEl.textContent=q.q;
    choicesEl.innerHTML="";

    q.c.map((t,idx)=>({t,idx}))
      .sort(()=>Math.random()-0.5)
      .forEach(c=>{
        const b=document.createElement("button");
        b.textContent=c.t;
        b.onclick=()=>{
          if(c.idx===q.a){
            b.style.background="#b6f2c2";
            resultEl.textContent="⭕ 正解";
          }else{
            b.style.background="#f2b6b6";
            resultEl.textContent="❌ 不正解";
          }
          if(!counted){
            counted=true;
            total++;
            if(c.idx===q.a) correct++;
            rateEl.textContent=`正答率：${Math.round(correct/total*100)}%`;
            explanationEl.textContent="解説："+q.e;
          }
        };
        choicesEl.appendChild(b);
      });
  }
  show();
}
