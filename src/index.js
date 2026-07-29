import "./reset.css";
import "./styles.css";

import { Player } from "./player.js";

// NOTE: populate dummy grids
const playerBoard = document.querySelector(".board-player > .board-grid");
const computerBoard = document.querySelector(".board-computer > .board-grid");

// NOTE: dummy cells
function createCells(parent) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.column = j;
      parent.appendChild(cell);

      cell.addEventListener("click", function () {
        logCellCoordinates(cell);
      });
    }
  }
}

createCells(playerBoard);
createCells(computerBoard);

function logCellCoordinates(cell) {
  console.log(`(${cell.dataset.row},${cell.dataset.column})`);
}

// NOTE: dummy game
const realPlayer = Player();
const computerPlayer = Player();

realPlayer.placeShip("patrolBoat", [0, 0], "h");
realPlayer.placeShip("submarine", [5, 6], "h");
realPlayer.placeShip("destroyer", [9, 9], "v");
realPlayer.placeShip("battleship", [9, 0], "h");
realPlayer.placeShip("carrier", [2, 3], "v");

// NOTE: this needs to be automated later
computerPlayer.placeShip("patrolBoat", [6, 5], "h");
computerPlayer.placeShip("submarine", [0, 6], "h");
computerPlayer.placeShip("destroyer", [5, 9], "v");
computerPlayer.placeShip("battleship", [8, 0], "h");
computerPlayer.placeShip("carrier", [0, 3], "v");
