const viewHighScore = document.getElementById("leaderboard");
const boxes = document.querySelectorAll(".box");
const homePage = document.querySelector("#homePage");
const highScoreDashboard = document.getElementById("highscore");
const gotToHomePageBtn = document.querySelector(".back");
const scoreSheet = document.querySelector(".done");
const clearHighScoreBtn = document.querySelector(".clear");
const scoreCard = document.querySelector(".score-card");
const startQuizBtn = document.querySelector(".start");
const quizPage = document.querySelector(".que");
const timeCount = document.querySelector("#timeCount");
const curQues = document.querySelector(".curQues");

const form = document.querySelector(".form");
const inputField = document.querySelector(".initialsInput");
const submitBtn = document.querySelector(".submit-btn");
const errorText = document.querySelector(".error");
const highScroresList = document.querySelector(".highScores");

const questionBox = document.querySelector(".que");
const question = document.querySelector(".que_text");
const options = document.querySelector(".option_list");
const answers = document.querySelectorAll(".option");

let ansStatus = document.createElement("p");
ansStatus.className = "option_status";

const DUMMY_QUESTIONS = [
  {
    questionText: "Commonly used data types DO NOT include:",
    option1: "1. strings",
    option2: "2. booleans",
    option3: "3. alerts",
    option4: "4. numbers",
    answer: 3,
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    option1: "1. numbers and strings",
    option2: "2. other arrays",
    option3: "3. booleans",
    option4: "4. all of the above",
    answer: 4,
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",

    option1: "1. commas",
    option2: "2. curly brackets",
    option3: "3. quotes",
    option4: "4. parentheses",
    answer: 3,
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",

    option1: "1. JavaScript",
    option2: "2.  terminal/bash",
    option3: "3.  for loops",
    option4: "4.  console.log",
    answer: 4,
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",

    option1: "1. break",
    option2: "2.  stop",
    option3: "3.  halt",
    option4: "4.  exit",
    answer: 1,
  },
];

const MAX_QUESTION = 5;
const SCORE_POINT = 100 / MAX_QUESTION;

let currentQues = {};
let correctAnswer = true;
let timer = 50;
let questionCounter = 0;
let availableQues = [];
let score = 0;
let timerHandler;

gotToHomePageBtn.addEventListener("click", () => {
  boxes.forEach((box) => (box.style.display = "none"));
  homePage.style.display = "block";
  reload();
});

startQuizBtn.addEventListener("click", () => {
  boxes.forEach((box) => (box.style.display = "none"));
  quizPage.style.display = "block";

  questionCounter = 0;
  availableQues = [...DUMMY_QUESTIONS];

  displayQuestion();
  timerFnc();
});

function displayQuestion() {
  if (availableQues.length === 0 || questionCounter > MAX_QUESTION) {
    boxes.forEach((box) => (box.style.display = "none"));
    scoreSheet.style.display = "block";
    scoreCard.innerText = `Your final score is ${score}%`;
    clearInterval(timerHandler);
    timeCount.textContent = "";
  }

  questionCounter++;
  curQues.innerHTML = `Question ${questionCounter} of ${MAX_QUESTION}`;
  const questionIdx = Math.floor(Math.random() * availableQues.length);
  currentQues = availableQues[questionIdx];
  question.innerText = currentQues.questionText;

  answers.forEach((answer) => {
    const number = answer.dataset["number"];
    answer.innerText = currentQues["option" + number];
  });

  availableQues.splice(questionIdx, 1);
  correctAnswer = true;
}

answers.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    if (!correctAnswer) return;

    correctAnswer = false;
    const chosenAns = e.target;
    const selectedAns = chosenAns.dataset["number"];

    questionBox.appendChild(ansStatus);
    const answerStatus = questionBox.querySelector(".option_status");
    answerStatus.textContent =
      selectedAns == currentQues.answer ? "Correct!" : "Incorrect!";

    ansStatus.textContent = answerStatus.textContent;

    if (ansStatus.textContent === "Correct!") {
      updateScore(SCORE_POINT);
      console.log(score);
    } else {
      timer -= 10;
    }

    setTimeout(() => {
      answerStatus.textContent = "";
      displayQuestion();
    }, 1000);
  });
});

function updateScore(eachScore) {
  score += eachScore;
}

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

inputField.addEventListener("keyup", () => {
  submitBtn.disabled = !inputField.value;
});

function addHighScore() {
  const person = {
    score: score,
    name: inputField.value,
  };

  highScores.push(person);

  highScores.sort((a, b) => {
    return b.person - a.person;
  });

  highScores.splice(7);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  boxes.forEach((box) => (box.style.display = "none"));
  highScoreDashboard.style.display = "block";

  highScroresList.innerHTML = highScores
    .map((score) => {
      return `<li class="highscore_list">${score.name.toUpperCase()} - ${
        score.score
      }%</li>`;
    })
    .join("");
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault;
  addHighScore();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputField.value = "";
});

clearHighScoreBtn.addEventListener("click", () => {
  localStorage.clear();
  highScroresList.innerHTML = "";
  highScores = [];
});

function reload() {
  reload = location.reload();
}

viewHighScore.addEventListener("click", () => {
  boxes.forEach((box) => (box.style.display = "none"));
  highScoreDashboard.style.display = "block";

  highScroresList.innerHTML = highScores
    .map((score) => {
      return `<li class="highscore_list">${score.name.toUpperCase()} - ${
        score.score
      }%</li>`;
    })
    .join("");
});

function timerFnc() {
  timerHandler = setInterval(timerr, 1000);

  function timerr() {
    timeCount.textContent = timer;
    timer--;

    if (timer <= 0) {
      clearInterval(timerHandler);
      timeCount.textContent = 0;
      boxes.forEach((box) => (box.style.display = "none"));
      scoreSheet.style.display = "block";
      scoreCard.innerText = `Your final score is ${score}%`;
    }
  }
}
