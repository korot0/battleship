import { Ship } from "./ship";

export const GameBoard = () => {
  const board = makeBoard();

  const ships = {
    carrier: Ship(5),
    battleship: Ship(4),
    destroyer: Ship(3),
    submarine: Ship(3),
    patrolBoat: Ship(2),
  };

  const placeShip = (shipName, coordinates, direction) => {
    if (ships[shipName].isDeployed) return false;

    let [row, column] = coordinates;
    const shipLength = ships[shipName].length;

    if (isOutOfBounds(row, column, shipLength, direction)) return false;
    if (isOverlapping(board, row, column, shipLength, direction)) return false;

    for (let i = 0; i < shipLength; i++) {
      const r = direction === "h" ? row : row + i;
      const c = direction === "h" ? column + i : column;

      board[r][c] = ships[shipName];
    }

    ships[shipName].deploy();
    return true;
  };

  return {
    placeShip,
    get board() {
      return board;
    },
    get ships() {
      return ships;
    },
  };
};

const isOutOfBounds = (row, column, shipLength, direction) =>
  direction === "h" ? column + shipLength > 10 : row + shipLength > 10;

const isOverlapping = (board, row, column, shipLength, direction) => {
  for (let i = 0; i < shipLength; i++) {
    const r = direction === "h" ? row : row + i;
    const c = direction === "h" ? column + i : column;

    if (board[r][c] !== null) return true;
  }
  return false;
};

const makeBoard = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) board[i] = new Array(10).fill(null);
  return board;
};
