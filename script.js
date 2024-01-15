"use strict";

const allGrid = document.querySelectorAll(".grid");
const winnerNote = document.querySelector(".winner-note");
const reset = document.querySelector(".button");
const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");

const winningConstellations = [
  [true, true, true, false, false, false, false, false, false],
  [false, false, false, true, true, true, false, false, false],
  [false, false, false, false, false, false, true, true, true],
  [true, false, false, true, false, false, true, false, false],
  [false, true, false, false, true, false, false, true, false],
  [false, false, true, false, false, true, false, false, true],
  [true, false, false, false, true, false, false, false, true],
  [false, false, true, false, true, false, true, false, false],
];

let round = true;
let board_X = [false, false, false, false, false, false, false, false, false];
let board_O = [false, false, false, false, false, false, false, false, false];

let xWins = false;
let oWins = false;

let xPlayerScore = 0;
let oPlayerScore = 0;

let roundCount = 0;

const resetDisplay = function () {
  roundCount = 0;
  reset.style.visibility = "hidden";
  winnerNote.textContent = "";
  xScore.textContent = `Player 'X': ${xPlayerScore}`;
  oScore.textContent = `Player 'O': ${oPlayerScore}`;
  allGrid.forEach((grid) => (grid.innerHTML = ""));
  allGrid.forEach((grid) => grid.addEventListener("click", handleClick));
  board_X = Array.from({ length: 9 }, () => false);
  board_O = Array.from({ length: 9 }, () => false);
};

const checkWin = function (side) {
  if (side === "x") {
    xWins = winningConstellations.some((constallation) =>
      constallation.every(function (element, index) {
        if (element) {
          return element === board_X[index];
        }
        return true;
      })
    );
  } else {
    oWins = winningConstellations.some((constallation) =>
      constallation.every(function (element, index) {
        if (element) {
          return element === board_O[index];
        }
        return true;
      })
    );
  }
};

const displayReset = function () {
  reset.style.visibility = "visible";
};

const displayWinner = function (side) {
  if (side === "x") {
    winnerNote.textContent = "Player 'X' Wins!";
    xPlayerScore += 1;
  } else {
    winnerNote.textContent = "Player 'O' Wins!";
    oPlayerScore += 1;
  }
  allGrid.forEach((grid) => grid.removeEventListener("click", handleClick));
  displayReset();
};

const handleClick = function (e) {
  if (round) {
    e.target.innerHTML = "<span>X</span>";
    board_X[e.target.id] = true;
    checkWin("x");

    if (xWins) {
      displayWinner("x");
    }
  } else {
    e.target.innerHTML = "<span>O</span>";
    board_O[e.target.id] = true;
    checkWin("o");

    if (oWins) {
      displayWinner("o");
    }
  }
  round = !round;

  roundCount += 1;
  if (roundCount === 9) {
    displayReset();
  }
};

allGrid.forEach((grid) => grid.addEventListener("click", handleClick));
reset.addEventListener("click", resetDisplay);
