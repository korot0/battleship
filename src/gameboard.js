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
    const offset = direction === "h" ? column : row;
    const length = shipLength + offset;

    if (isOutOfBounds(row, column, shipLength, direction)) return false;

    if (direction === "h") {
      placeShipHorizontally(board, row, column, length, ships, shipName);
    } else if (direction === "v") {
      placeShipVertically(board, row, column, length, ships, shipName);
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

const isOutOfBounds = (row, column, shipLength, direction) => {
  let lastIndex;

  direction === "h"
    ? (lastIndex = column + shipLength - 1)
    : (lastIndex = row + shipLength - 1);

  return lastIndex > 9;
};

const placeShipHorizontally = (board, row, column, length, ships, shipName) => {
  for (column; column < length; column++) {
    board[row][column] = ships[shipName];
  }
};

const placeShipVertically = (board, row, column, length, ships, shipName) => {
  for (row; row < length; row++) {
    board[row][column] = ships[shipName];
  }
};

const makeBoard = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) board[i] = new Array(10).fill(null);
  return board;
};
