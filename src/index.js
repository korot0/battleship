import "./reset.css";
import "./styles.css";

// TODO: populate grids
const playerBoard = document.querySelector(".board--player > .board__grid");
const computerBoard = document.querySelector(".board--computer > .board__grid");

// NOTE: dummy cells
for (let index = 0; index < 100; index++) {
  const cell = document.createElement("div");
  cell.textContent = " ";
  cell.classList.add("cell");
  playerBoard.appendChild(cell);
}

for (let index = 0; index < 100; index++) {
  const cell = document.createElement("div");
  cell.textContent = " ";
  cell.classList.add("cell");
  computerBoard.appendChild(cell);
}
