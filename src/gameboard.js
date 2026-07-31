import { Ship } from "./ship";

export const GameBoard = () => {
  const board = makeBoard();
  const hitHistory = new Set();
  let shipBuffer = [];

  const ships = {
    carrier: Ship(5),
    battleship: Ship(4),
    destroyer: Ship(3),
    submarine: Ship(3),
    patrolBoat: Ship(2),
  };

  const placeShip = (shipName, coordinates, direction) => {
    let [row, column] = coordinates;
    const shipLength = ships[shipName].length;

    shipBuffer = [];

    if (isOutOfBounds(row, column, shipLength, direction)) return false;
    if (isOverlapping(board, row, column, shipLength, direction)) return false;
    if (isAdjacent(board, row, column, shipLength, direction, ships))
      return false;

    for (let i = 0; i < shipLength; i++) {
      const r = direction === "h" ? row : row + i;
      const c = direction === "h" ? column + i : column;

      board[r][c] = ships[shipName];
      shipBuffer.push({ x: r, y: c });
    }

    return true;
  };

  const receiveAttack = (coordinates) => {
    const [r, c] = coordinates;

    if (hitHistory.has(`${r},${c}`)) return "invalid";

    hitHistory.add(`${r},${c}`);

    if (board[r][c] === null) {
      board[r][c] = "x";
      return "miss";
    } else {
      board[r][c].hit();
      return "hit";
    }
  };

  const allShipsSunk = () => {
    for (const ship of Object.values(ships)) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  return {
    get board() {
      return board;
    },
    get ships() {
      return ships;
    },
    get shipBuffer() {
      return shipBuffer;
    },
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

const isAdjacent = (board, row, column, shipLength, direction, ships) => {
  for (let i = -1; i <= shipLength; i++) {
    const r = direction === "h" ? row : row + i;
    const c = direction === "h" ? column + i : column;
    const up = direction === "h" ? board[r - 1]?.[c] : board[r]?.[c - 1];
    const down = direction === "h" ? board[r + 1]?.[c] : board[r]?.[c + 1];

    if (
      Object.values(ships).includes(up) ||
      Object.values(ships).includes(down)
    )
      return true;
  }

  return false;
};

const isOverlapping = (board, row, column, shipLength, direction) => {
  for (let i = 0; i < shipLength; i++) {
    const r = direction === "h" ? row : row + i;
    const c = direction === "h" ? column + i : column;

    if (board[r][c] !== null) return true;
  }
  return false;
};

const isOutOfBounds = (row, column, shipLength, direction) =>
  direction === "h" ? column + shipLength > 10 : row + shipLength > 10;

const makeBoard = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) board[i] = new Array(10).fill(null);
  return board;
};
