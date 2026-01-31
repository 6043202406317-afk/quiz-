function initQuiz(questions) {
  const rateEl = document.getElementById("rate");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");
  const explanationEl = document.getElementById("explanation");

  let order = [...Array(questions.length).keys()].sort(() => Math.random() - 0.5);
  let index = 0;
  let counted = false;
  let correct = 0;
  let total = 0;

  window.nextQuestion = () => {
    index = (index + 1) % order.length;
    show();
  };

  function show() {
    counted = false;
    resultEl.textContent = "";
    explanationEl.textContent = "";

    const q = questions[order[index]];
    questionEl.textContent = q.q;
    choicesEl.innerHTML = "";

    q.c
      .map((text, i) => ({ text, i }))
      .sort(() => Math.random() - 0.5)
      .forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => {
          if (choice.i === q.a) {
            btn.style.background = "#b6f2c2";
            resultEl.textContent = "⭕ 正解";
          } else {
            btn.style.background = "#f2b6b6";
            resultEl.textContent = "❌ 不正解";
          }

          if (!counted) {
            counted = true;
            total++;
            if (choice.i === q.a) correct++;
            rateEl.textContent = `正答率：${Math.round(correct / total * 100)}%`;
            explanationEl.textContent = "解説：" + q.e;
          }
        };
        choicesEl.appendChild(btn);
      });
  }

  show();
}
