const input = document.querySelector(".input");
const input2 = document.querySelector(".input2");
const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");
const letters = document.querySelector(".letters");
let lives = document.querySelector(".lives");
let spanEl = document.getElementsByTagName("span");
const img = document.querySelector(".img");
const win = document.querySelector(".win");
const resBtn = document.querySelector(".hideRestartBtn");
const livesLeft = document.querySelector(".livesLeft");
const title = document.querySelector(".title");
const triesMade = document.querySelector(".triesMade");
const tries = document.querySelector(".tries");
let startGame = true;

window.onload = function () {
  input.focus();
};

let wordArray = [];
let lettersArray = [];
let wrongLettersArray = [];
let newElArray = [];
let newEl2Array = [];
let livesNo = "";
let imgMistake = 6;
let lastArray = [];
let word = "";
let wordChar = "";
let newEl = "";
let newEl2 = "";
let newNew = "";
let newNew2 = "";
let lettersPop = "";
btn.textContent = "START";

btn.addEventListener("click", function () {
  if (startGame === true) {
    word = input.value.toLowerCase();
    img.setAttribute("src", "images/pic.jpg");
    btn.textContent = "Try";
    wordChar = word.split("");
    livesLeft.textContent = "LIVES LEFT:";
    triesMade.textContent = "Wrong letters:";
    tries.textContent = "None yet";
    lives.textContent = word.length;
    livesNo = word.length;
    input.value = "";
    startGame = false;
    btn.classList.add("btn2");
    btn.classList.remove("btn");
    input.focus();

    createLetters(word, wordChar);
    tryyy(word, wordArray, lettersArray);

    function createLetters(word, wordChar) {
      for (let i = 0; i < word.length; i++) {
        wordArray.push(wordChar[i]);
        newEl = document.createElement("span");
        newEl.textContent = "?";
        letters.appendChild(newEl);
        newEl.classList.add("newElClass");
        newEl2 = document.createElement("span");
        newEl2.textContent = wordChar[i];
        letters.appendChild(newEl2);
        newEl2.classList.add("hidden", "newEl2Class");
        newEl2Array.push(newEl2.innerText);
      }
    }
  }
});

function tryyy(word, wordArray, lettersArray) {
  btn2.addEventListener("click", function () {
    if (startGame === false) {
      if (input.value.length !== 1) {
        alert("Please add one character");
      } else {
        newNew = document.querySelectorAll(".newEl2Class");
        newNew2 = document.querySelectorAll(".newElClass");

        for (let i = 0; i < wordArray.length; i++) {
          if (newNew[i].textContent == input.value.toLowerCase()) {
            newNew[i].classList.remove("hidden");
            newNew2[i].classList.add("hidden");
            title.innerText = "Correct!";
          }
        }
        input.focus();

        lettersArray.push(input.value.toLowerCase());
        lettersPop = lettersArray.pop();

        if (wordArray.includes(lettersPop)) {
          lastArray.push(lettersPop);

          if (
            newEl2Array.length === lastArray.length &&
            JSON.stringify(newEl2Array) == JSON.stringify(lastArray)
          ) {
            title.innerText = "You WON the Game!";
          }
        } else if (lives.innerText > 1) {
          console.log(lives);
          lives.innerText--;
          img.setAttribute("src", `images/pic${imgMistake}.jpg`);
          imgMistake--;
          title.innerText = "Not Correct!";
          wrongLettersArray.push(input.value);
          tries.textContent = wrongLettersArray;
        } else {
          console.log(lives);
          lives.innerText--;
          win.innerText = "You lost, baybe!";
          resBtn.removeAttribute("class", "hideRestartBtn");
          wrongLettersArray.push(input.value);
          tries.textContent = wrongLettersArray;
          if (lives.innerText <= 0) {
            lives.innerText = 0;
          }
        }
      }
    }
  });

  console.log(lives);
}

function gameRestart() {
  startGame = true;
  wordArray = [];
  lettersArray = [];
  newElArray = [];
  newEl2Array = [];
  wrongLettersArray = [];
  livesNo = "";
  imgMistake = 6;
  lastArray = [];
  letters.innerHTML = "";
  img.setAttribute("src", "");
  btn.textContent = "START";
  btn.classList.add("btn");
  btn.classList.remove("btn2");
  word = "";
  wordChar = "";
  newEl = "";
  newEl2 = "";
  newNew = "";
  newNew2 = "";
  lettersPop = "";
  win.textContent = "";
  resBtn.setAttribute("class", "hideRestartBtn");
  livesLeft.innerHTML = "";
  lives.innerHTML = "";
  triesMade.innerHTML = "";
  tries.innerHTML = "";
  input.value = "";
  title.innerText = "";
}
