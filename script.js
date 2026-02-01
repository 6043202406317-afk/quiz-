var questions = {
  it: [
    {
      q: "CPUの役割は？",
      c: ["計算処理", "保存", "通信"],
      a: 0,
      e: "CPUは計算や制御を行う装置です。"
    }
  ],
  physics: [
    {
      q: "力の単位は？",
      c: ["N", "J", "W"],
      a: 0,
      e: "力の単位はニュートンです。"
    }
  ],
  english: [
    {
      q: "appleの意味は？",
      c: ["りんご", "みかん", "ぶどう"],
      a: 0,
      e: "appleはりんごです。"
    }
  ]
};

var currentList = [];
var index = 0;
var answered = false;
var correctCount = 0;
var solvedCount = 0;

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
}

function startQuiz(subject) {
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  correctCount = 0;
  solvedCount = 0;
  index = 0;

  currentList = questions[subject].slice();
  shuffle(currentList);
  showQuestion();
}

function showQuestion() {
  answered = false;
  document.getElementById("explanation").style.display = "none";

  var q = currentList[index];
  document.getElementById("question").innerHTML = q.q;

  var choices = q.c.slice();
  shuffle(choices);

  var html = "";
  for (var i = 0; i < choices.length; i++) {
    html += '<button class="choice" onclick="selectChoice(' + i + ')">' + choices[i] + '</button>';
  }
  document.getElementById("choices").innerHTML = html;

  updateStatus();
}

function selectChoice(i) {
  if (answered) return;
  answered = true;

  var q = currentList[index];
  var buttons = document.getElementsByClassName("choice");

  solvedCount++;

  if (q.c[i] === q.c[q.a]) {
    buttons[i].className += " correct";
    correctCount++;
  } else {
    buttons[i].className += " wrong";
  }

  var ex = document.getElementById("explanation");
  ex.innerHTML = q.e;
  ex.style.display = "block";

  updateStatus();
}

function updateStatus() {
  var rate = solvedCount === 0 ? 0 : Math.round((correctCount / solvedCount) * 100);
  document.getElementById("status").innerHTML =
    "正答率 " + rate + "％（" + correctCount + " / " + solvedCount + "）";
}

function nextQuestion() {
  index++;
  if (index >= currentList.length) index = 0;
  showQuestion();
}

function prevQuestion() {
  index--;
  if (index < 0) index = currentList.length - 1;
  showQuestion();
}

function goHome() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("home").style.display = "block";
}
