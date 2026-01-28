let easyParagraphs = [];
let mediumParagraphs = [];
let hardParagraphs = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let clockTime = 60;
let clockIntervalId = 0;
const textArea = document.querySelector("#textarea");
const input = document.querySelector("#quote-input");
const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");
const accuracy = document.querySelector("#accuracy");
const time = document.querySelector("#time");
const wordperminute = document.querySelector("#wordperminute");

async function loadTextData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    easyParagraphs = data.easy;
    mediumParagraphs = data.medium;
    hardParagraphs = data.hard;
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}
function loadParagraph(paragraph, textarea) {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  let characters = [...paragraph[randomNumber].text];
  characters.forEach((char) => {
    let span = document.createElement("span");
    span.innerText = char;
    span.classList.add("text-neutral-500");
    textarea.append(span);
  });
}
function ShowResults(correctAnswers, wrongAnswers, totaltyped) {
  clearInterval(clockIntervalId);
  input.disabled = true;
  const totalTyped = correctAnswers + wrongAnswers;
  const acc =
    totaltyped === 0 ? 0 : Math.round((correctAnswers / totalTyped) * 100);
  accuracy.innerText = acc + "%";
  wordperminute.innerText = totalTyped / 5 / 1;
}
input.addEventListener("input", (e) => {
  const typed = e.target.value;
  const spans = textArea.querySelectorAll("span");
  if (spans.length < typed.length) {
    ShowResults(correctAnswers, wrongAnswers, typed.length);
    return;
  }
  correctAnswers = 0;
  wrongAnswers = 0;
  spans.forEach((span, index) => {
    span.classList.remove("text-neutral-500", "text-green-500", "text-red-500");
    const typedChar = typed[index];
    if (!typedChar) {
      span.classList.add("text-neutral-500");
    } else if (typedChar === span.innerText) {
      correctAnswers++;
      span.classList.add("text-green-500");
    } else {
      wrongAnswers++;
      span.classList.add("text-red-500");
    }
  });
});
function startTimer(params) {
  if (clockTime <= 0) {
    clockTime = 0;
    clearInterval(clockIntervalId);
    ShowResults(correctAnswers, wrongAnswers, typed.length);
    return;
  }
  clockTime--;
  time.innerText = `0:${clockTime.toString().padStart(2, "0")}`;
}
easyBtn.addEventListener("click", (e) => {
  resetTest();
  easyBtn.classList.add("border-blue-400");
  loadParagraph(easyParagraphs, textArea);
  clockIntervalId = setInterval(startTimer, 1000);
});
mediumBtn.addEventListener("click", (e) => {
  resetTest();
  mediumBtn.classList.add("border-blue-400");
  loadParagraph(mediumParagraphs, textArea);
  clockIntervalId = setInterval(startTimer, 1000);
});
hardBtn.addEventListener("click", (e) => {
  resetTest();
  hardBtn.classList.add("border-blue-400");
  loadParagraph(hardParagraphs, textArea);
  clockIntervalId = setInterval(startTimer, 1000);
});
function resetTest() {
  clearInterval(clockIntervalId);
  clockTime = 60;
  textArea.innerText = "";
  timerStarted = false;
  input.value = "";
  input.disabled = false;
  time.innerText = "0:60";
  accuracy.innerText = "--";
  wordperminute.innerText = "--";
  easyBtn.classList.remove("border-blue-400");
  mediumBtn.classList.remove("border-blue-400");
  hardBtn.classList.remove("border-blue-400");
}

loadTextData();
