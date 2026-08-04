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

  const renderShip = (player) => {
    const boardEl = player.id === 1 ? playerOneBoard : playerTwoBoard;
    const shipCoordinates = player.board.shipBuffer;

    shipCoordinates.forEach((coordinate) => {
      boardEl.querySelector(
        `[data-row="${coordinate.x}"][data-column="${coordinate.y}"`,
      ).className = "ship";
    });
  };

  const renderAttackedCell = (el, response) => {
    if (response === "hit") {
      el.className = "hit";
    } else if (response === "miss") {
      el.className = "miss";
    } else {
      document.querySelector(".announcements").textContent =
        "Invalid shot, try again...";
    }
  };

  const addAttackListeners = (mode, callback) => {
    if (mode === "pvc") {
    } else {
      playerOneBoard.addEventListener("click", (e) => {
        callback(_handleCellSelection(e));
      });
      playerTwoBoard.addEventListener("click", (e) => {
        callback(_handleCellSelection(e));
      });
    }
  };

  // INFO: PRIVATE METHODS
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

  const _handleCellSelection = (e) => {
    const el = e.target.closest(`.board-grid > div`); // NOTE: Need 'closest' to prevent undefined results from clicking a gap.

    return !el ? null : _getCoordinates(el);
  };

  const _getCoordinates = (el) => [el.dataset.row, el.dataset.column];

  return {
    renderGrids,
    renderShip,
    renderAttackedCell,
    addAttackListeners,
  };
};
