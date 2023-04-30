let currentPlayer = "X";
let gameEnd = false;

const cells = document.querySelectorAll(".cells");
const restablecerBoton = document.getElementById("restablecerBoton");

function updateCursor() {
  cells.forEach(cell => {
    if (cell.textContent === "") {
      cell.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><text x="0" y="35" font-size="40">${currentPlayer}</text></svg>') 16 16, auto`;
    } else {
      cell.style.cursor = "default";
    }
  });
}

function endGame(message) {
  gameEnd = true;
  alert(message);
  restablecerBoton.classList.remove("hidden");
}

function resetGame() {
  gameEnd = false;
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
  });
  updateCursor();
  restablecerBoton.classList.add("hidden");
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameEnd) {
      return;
    }
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;
      if (checkWin()) {
        endGame(currentPlayer + " es el ganador!");
      } else if (checkTie()) {
        endGame("Excelente juego, es un empate!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateCursor();
      }
    }
  });
});

restablecerBoton.addEventListener("click", resetGame);

updateCursor();

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkTie() {
  return Array.from(cells).every(cell => {
    return cell.textContent !== "";
  });
}
