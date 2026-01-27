let easyParagraphs = [];
let mediumParagraphs = [];
let hardParagraphs = [];
const textArea = document.querySelector("#textarea");
const input = document.querySelector("#quote-input");
const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");

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
input.addEventListener("input", (e) => {
  const typed = e.target.value;
  const spans = textArea.querySelectorAll("span");
  spans.forEach((span, index) => {
    span.classList.remove("text-neutral-500", "text-green-500", "text-red-500");
    const typedChar = typed[index];
    if (!typedChar) {
      span.classList.add("text-neutral-500");
    } else if (typedChar === span.innerText) {
      span.classList.add("text-green-500");
    } else {
      span.classList.add("text-red-500");
    }
  });
});

easyBtn.addEventListener("click", (e) => {
  textArea.innerHTML = "";
  loadParagraph(easyParagraphs, textArea);
});
mediumBtn.addEventListener("click", (e) => {
  textArea.innerHTML = "";
  loadParagraph(mediumParagraphs, textArea);
});
hardBtn.addEventListener("click", (e) => {
  textArea.innerHTML = "";
  loadParagraph(hardParagraphs, textArea);
});

loadTextData();
