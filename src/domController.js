export const DomController = () => {
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

  const renderShip = (player, boadElement) => {
    const shipCoordinates = player.board.shipBuffer;

    shipCoordinates.forEach((coordinate) => {
      boadElement.querySelector(
        `[data-row="${coordinate.x}"][data-column="${coordinate.y}"`,
      ).className = "ship";
    });
  };

  return {
    renderGrid,
    renderShip,
  };
};
