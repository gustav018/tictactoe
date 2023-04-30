 // Declaramos una variable que va a identificar al jugador
 let currentPlayer = "X";
 let gameEnd = false;
 let xwin = 0;
 let owin = 0;
 console.log(xwin)
 let boardHistory = [[]];//Declaramos una matris para guardar el estado del tablero
// dentro del script.js
const cells = document.querySelectorAll(".cells");
const DES = document.getElementById("span-desc");
// Obtén la ventana modal
const VICTORIAX = document.querySelector('.victoriaX');
const VICTORIAO = document.querySelector('.victoriaO');
const EMPATE = document.querySelector('.empate');

// creamos el vector con todas las convinaciones posibles para ganar
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// Funció para desacer jugada
DES.addEventListener('click', ()=>{
  undo()
}) 


cells.forEach(cell => {//recorremos los divs con la clase cell con un foreach
  cell.addEventListener("click", () => {//Una ves que recorremos agregamos un evento a cada click del div

        cell.style.transform = "translateY(-10px)";
            setTimeout(() => {
            cell.style.transform = "translateY(0)";
        }, 300);

    if (gameEnd) {//Primera condicion se verifica que el juego no haya terminado
      return;
    }
    if (cell.textContent === "") {//segunda condición se verifica si el contenido de la casilla esta vacio
      cell.textContent = currentPlayer;
      if (checkWin()) {
        winCount(currentPlayer);
        iconAnimate();
        resetGame();
        gameEnd = true;
      } else if (checkTie()) {
        EMPATE.style.display = 'flex'
        EMPATE.addEventListener("click", function() {
            this.style.display = "none";
          });
        gameEnd = true;
        iconAnimate();
        resetGame();
        RESET.classList.add("fa-solid fa-rotate");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
    // Guaramos la posición actual del tablero
    boardHistory.push([...cells].map(cell => cell.textContent))
        console.log(boardHistory);
  });
});

function checkWin() {
//en base a nuestra constante winConditions verificamos si la posición del tablero muestra alguna victoria.
  return winConditions.some((condition) => {
    return condition.every((index) => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkTie() {
//en base a nuestras celdas del tablero verificamos que todas las celdas estén ocupadas por alguna ficha.
  return Array.from(cells).every(cell => {
    return cell.textContent !== "";
  });
}

    // creamos una función para desacer una jugada
    function undo(){
      if (boardHistory.length > 1 && gameEnd != true) {
        // preguntamos si ya hay una jugada entonces eliminamos uno
        boardHistory.pop();
        console.log(boardHistory)

        // Restaurar el estado del tablero al elemento anterior de boardHistory
      let previousBoard = boardHistory[boardHistory.length - 1];
      [...cells].forEach((cell, i) => cell.textContent = previousBoard[i]);

      // Cambiar de jugador al que hizo la última jugada
      currentPlayer = (currentPlayer === "X") ? "O" : "X";
      }
    }
    // Evento para restablecer el juego
function resetGame() {
  const RESET = document.getElementById("icon-restart");
  RESET.addEventListener('click', ()=>{
      cells.forEach(cell => {
        cell.textContent = "";
        boardHistory = [];
        gameEnd = false;
      });
  })
}
function winCount(currentPlayer){
  if (currentPlayer === "X") {
        xwin ++;
        const XWIN = document.getElementById("win-x");
        XWIN.innerHTML = ` = ${xwin}`;
        // Mostrar mensaje
        VICTORIAX.style.display = 'flex'
        VICTORIAX.addEventListener("click", function() {
        this.style.display = "none";
      });
  } else if(currentPlayer === "O"){
        owin ++;
        const OWIN = document.getElementById("win-o");
        OWIN.innerHTML = ` = ${owin}`;
        // Mostrar mensaje
        VICTORIAO.style.display = 'flex'
        VICTORIAO.addEventListener("click", function() {
        this.style.display = "none";
        });
  }
}
function iconAnimate(){
  const ICONA = document.getElementById("icon-restart");
  ICONA.classList.add("fa-solid","fa-rotate","fa-spin");
  ICONA.addEventListener('click', ()=>{
    ICONA.className = "fa-solid fa-rotate";
  })
}