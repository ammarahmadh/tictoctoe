// script.js
document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const gameStatus = document.getElementById("gameStatus");
  const restartButton = document.getElementById("restartButton");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.dataset.index = index;
      cellElement.addEventListener("click", onCellClick);
      gameBoard.appendChild(cellElement);
    });
  }

  function onCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (board[cellIndex] !== "" || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
      gameStatus.textContent = `Player ${currentPlayer} Wins!`;
      isGameActive = false;
    } else if (board.includes("")) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    } else {
      gameStatus.textContent = "It's a Draw!";
      isGameActive = false;
    }
  }

  function checkWinner() {
    return winningConditions.some(condition => {
      const [a, b, c] = condition;
      return (
        board[a] &&
        board[a] === board[b] &&
        board[b] === board[c]
      );
    });
  }

  restartButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    gameStatus.textContent = "Player X's Turn";
    createBoard();
  });

  createBoard();
});
