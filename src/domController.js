export const DomController = () => {
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

  const attachListeners = (playerOne, playerTwo) => {
    playerTwoBoard.addEventListener("click", (e) => {
      _handleCellClick(e, playerOne, playerTwo);
    });
  };

  // PRIVATE METHODS
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

  // NOTE: Doing too many things at once. Getting coordinates, attacking, and changing cell colors
  const _handleCellClick = (e, attacker, defender) => {
    const el = e.target.closest(`.board-grid > div`); // NOTE: Need 'closest' to prevent undefined results from clicking a gap.
    if (!el) return;

    const [r, c] = [el.dataset.row, el.dataset.column];

    // NOTE: this belongs to gameController
    const response = attacker.attack(defender, [r, c]);

    if (response === "hit") {
      el.className = "hit";
    } else if (response === "miss") {
      el.className = "miss";
    } else {
      document.querySelector(".announcements").textContent =
        "Invalid shot, try again...";
    }
  };

  return {
    renderGrids,
    renderShip,
    attachListeners,
  };
};
