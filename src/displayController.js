export const DisplayController = () => {
  const playerOneBoard = document.querySelector(
    ".board-playerOne > .board-grid",
  );
  const playerTwoBoard = document.querySelector(
    ".board-playerTwo > .board-grid",
  );

  const renderGrids = () => {
    renderGrid(playerOneBoard);
    renderGrid(playerTwoBoard);
  };

  const toggleActiveGrid = (player) => {
    _getCurrentGridEl(player).classList.toggle("disabled");
  };

  const renderShips = (player) => {
    const board = player.board.board;
    const boardEl = _getCurrentGridEl(player);
    const attackHistory = player.board.attackHistory;

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = board[row][col];
        const cellEl = boardEl.querySelector(
          `[data-row="${row}"][data-column="${col}"]`,
        );

        if (cell === "miss") {
          cellEl.className = "miss";
        } else if (cell !== null) {
          if (attackHistory.has(`${row},${col}`)) {
            cellEl.className = "hit";
          } else {
            cellEl.className = "ship";
          }
        } else {
          cellEl.className = "cell";
        }
      }
    }
  };

  const announceWinner = (player) => {
    const winner = player.id === 1 ? "Player one" : "Player two";
    document.querySelector(".announcements").textContent = `${winner} wins!`;
  };

  const disableBoards = () => {
    playerOneBoard.classList.add("disabled");
    playerTwoBoard.classList.add("disabled");
  };

  // WARN: Need to add listeners to playerOne if pvp
  const addAttackListeners = (callback) => {
    attachListeners(playerTwoBoard, callback);
  };

  const _getCurrentGridEl = (player) =>
    player.id === 1 ? playerOneBoard : playerTwoBoard;

  return {
    renderGrids,
    renderShips,
    addAttackListeners,
    toggleActiveGrid,
    announceWinner,
    disableBoards,
  };
};

const renderGrid = (parent) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.column = j;
      parent.appendChild(cell);
    }
  }
};

const attachListeners = (board, callback) => {
  board.addEventListener("click", (e) => {
    const cells = getCellEl(e);
    if (!cells) return;
    const coordinates = getCoordinates(cells);
    const attackResponse = callback(coordinates);
    renderAttackedCell(attackResponse, cells);
  });
};

const getCellEl = (e) => e.target.closest(`.board-grid > div`); // NOTE: Need 'closest' to prevent undefined results from clicking a gap.

const getCoordinates = (el) => [el.dataset.row, el.dataset.column];

const renderAttackedCell = (response, cells) => {
  if (response === "hit") {
    cells.className = "hit";
  } else if (response === "miss") {
    cells.className = "miss";
  } else {
    document.querySelector(".announcements").textContent =
      "Invalid shot, try again...";
  }
};
