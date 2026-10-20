export const DisplayController = () => {
  const playerOneBoard = document.querySelector(
    ".board-playerOne > .board-grid",
  );

  const playerTwoBoard = document.querySelector(
    ".board-playerTwo > .board-grid",
  );

  const renderGrids = () => {
    _renderGrid(playerOneBoard);
    _renderGrid(playerTwoBoard);
  };

  // FIX: Too many things happening here!
  const addAttackListeners = (mode, callback) => {
    if (mode === "pvc") {
    } else {
      playerOneBoard.addEventListener("click", (e) => {
        const cells = _getCellEl(e);
        if (!cells) return;
        const coordinates = _getCoordinates(cells);
        const attackResponse = callback(coordinates);
        _renderAttackedCell(attackResponse, cells);
      });
      playerTwoBoard.addEventListener("click", (e) => {
        const cells = _getCellEl(e);
        if (!cells) return;
        const coordinates = _getCoordinates(cells);
        const attackResponse = callback(coordinates);
        _renderAttackedCell(attackResponse, cells);
      });
    }
  };

  const toggleActiveGrid = (player) => {
    _getCurrentGridEl(player).classList.toggle("disabled");
  };

  const renderShips = (player) => {
    const board = player.board.board;
    const boardEl = _getCurrentGridEl(player);

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] !== null) {
          boardEl.querySelector(
            `[data-row="${row}"][data-column="${col}"`,
          ).className = "ship";
        }
      }
    }
  }

  // INFO: PRIVATE METHODS
  const _getCurrentGridEl = (player) =>
    player.id === 1 ? playerOneBoard : playerTwoBoard;

  const _renderGrid = (parent) => {
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

  const _getCellEl = (e) => e.target.closest(`.board-grid > div`); // NOTE: Need 'closest' to prevent undefined results from clicking a gap.

  const _getCoordinates = (el) => [el.dataset.row, el.dataset.column];

  const _renderAttackedCell = (response, cells) => {
    if (response === "hit") {
      cells.className = "hit";
    } else if (response === "miss") {
      cells.className = "miss";
    } else {
      document.querySelector(".announcements").textContent =
        "Invalid shot, try again...";
    }
  };

  return {
    renderGrids,
    renderShips,
    addAttackListeners,
    toggleActiveGrid,
  };
};
