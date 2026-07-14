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

// TODO: Refactor
  const placeShip = (shipName, coordinates, direction) => {
    if (ships[shipName].isDeployed) return false;

    let [row, column] = coordinates;
    const shipLength = ships[shipName].length;

    if (isOutOfBounds(row, column, shipLength, direction)) return false;
    if (isOverlapping(board, row, column, shipLength, direction)) return false;
    if (isAdjacent(board, row, column, shipLength, direction, ships))
      return false;

    for (let i = 0; i < shipLength; i++) {
      const r = direction === "h" ? row : row + i;
      const c = direction === "h" ? column + i : column;

      board[r][c] = ships[shipName];
    }

    ships[shipName].deploy();
    return true;
  };

  // TODO: Gameboards should keep track of missed attacks so they can display them properly.
  const receiveAttack = (coordinate) => {};

  // TODO: Gameboards should be able to report whether or not all of their ships have been sunk.
  const allShipsSunk = () => {};

  return {
    get board() {
      return board;
    },
    get ships() {
      return ships;
    },
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

// TODO: Refactor
const isAdjacent = (board, row, column, shipLength, direction, ships) => {
  if (direction === "h") {
    for (let i = -1; i <= shipLength; i++) {
      const up = board[row - 1]?.[column + i];
      const down = board[row + 1]?.[column + i];

      if (
        Object.values(ships).includes(up) ||
        Object.values(ships).includes(down)
      )
        return true;
    }
  } else if (direction === "v") {
    for (let i = -1; i <= shipLength; i++) {
      const left = board[row + i]?.[column - 1];
      const right = board[row + i]?.[column + 1];

      if (
        Object.values(ships).includes(left) ||
        Object.values(ships).includes(right)
      )
        return true;
    }
  }
  return false;
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
