let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg1 = document.querySelector("#random");
let msg = document.querySelector("#msg");
let turn0 = true;
let player1Name, player2Name;
const startGameBtn = document.querySelector("#start-btn");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const usernameForm = document.querySelector("#username-form");
const gameSection = document.querySelector("main");
let nameChange = document.querySelector("#user-btn");
let winning_box = document.querySelector(".winning-box");

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

gameSection.classList.add("hide");
startGameBtn.addEventListener("click", () => {
  player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();

  if (player1Name === "" || player2Name === "" || player1Name === player2Name) {
    alert("Please enter both player names to start the game.");
  } else {
    usernameForm.classList.add("hide"); // Hide username form
    gameSection.classList.remove("hide"); // Show game section
    updateTurnIndicator(); // Update turn indicator
  }
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
    updateTurnIndicator();
  });
});

const disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const ShowWinner = (winner) => {
  msg.innerText = `CONGRATULATIONS! THE WINNER IS ${
    winner === "O" ? player1Name : player2Name
  }`;
  msg1.classList.remove("hide");
  disableBtn();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let position1 = boxes[pattern[0]].innerText;
    let position2 = boxes[pattern[1]].innerText;
    let position3 = boxes[pattern[2]].innerText;

    if (position1 != "" && position2 != "" && position3 != "") {
      if (position1 === position2 && position2 === position3) {
        ShowWinner(position1);
        return; // exit once winner is found
      }
    }
  }
  if (checkDraw()) {
    msg.innerText = "It's a Draw!";
    msg1.classList.remove("hide");
    disableBtn();
  }
};

const checkDraw = () => {
  let filled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      filled = false;
      break;
    }
  }
  return filled;
};
const resetGame = () => {
  turn0 = true;
  enableBtn();
  msg1.classList.add("hide");
  player1Input.value = "";
  player2Input.value = "";
  updateTurnIndicator();
};
const userChange = () => {
  turn0 = true;
  enableBtn();
  msg1.classList.add("hide");
  player1Input.value = "";
  player2Input.value = "";
  usernameForm.classList.remove("hide");
  gameSection.classList.add("hide");
};
const newGame = () => {
  turn0 = true;
  enableBtn();
  msg1.classList.add("hide");
  player1Input.value = "";
  player2Input.value = "";
  updateTurnIndicator();
};

nameChange.addEventListener("click", userChange);
resetbtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);

const updateTurnIndicator = () => {
  const turnIndicator = document.querySelector("#turn-indicator");
  if (turn0) {
    turnIndicator.innerText = `${player1Name}'s Turn (O)`;
    turnIndicator.classList.remove("X-turn");
    turnIndicator.classList.add("O-turn");
  } else {
    turnIndicator.innerText = `${player2Name}'s Turn (X)`;
    turnIndicator.classList.remove("O-turn");
    turnIndicator.classList.add("X-turn");
  }
};
