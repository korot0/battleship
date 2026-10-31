import { Ship } from "./ship";

export const GameBoard = () => {
  const board = makeBoard();
  const attackHistory = new Set();

  const fleet = {
    carrier: Ship(5),
    battleship: Ship(4),
    destroyer: Ship(3),
    submarine: Ship(3),
    patrolBoat: Ship(2),
  };

  const placeShip = (name, coordinates, direction) => {
    let [row, column] = coordinates;
    const shipLength = fleet[name].length;

    if (isOutOfBounds(row, column, shipLength, direction)) return false;
    if (isOverlapping(board, row, column, shipLength, direction)) return false;
    // if (isAdjacent(board, row, column, shipLength, direction, ships)) return false;

    for (let i = 0; i < shipLength; i++) {
      const r = direction === "h" ? row : row + i;
      const c = direction === "h" ? column + i : column;

      board[r][c] = fleet[name];
    }

    return true;
  };

  const receiveAttack = (coordinates) => {
    const [r, c] = coordinates;
    const key = `${r},${c}`;

    if (attackHistory.has(key)) return "invalid";

    attackHistory.add(key);

    if (board[r][c] === null) {
      board[r][c] = "miss";
      return "miss";
    } else {
      board[r][c].hit();
      return "hit";
    }
  };

  const allShipsSunk = () => {
    for (const ship of Object.values(fleet)) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  const placeFleetRandomly = () => {
    for (const key of Object.keys(fleet)) {
      let isPlaced = false;

      while (!isPlaced) {
        const coordinates = pickRandomCoordinate();
        const direction = pickRandomDirection();
        isPlaced = placeShip(key, coordinates, direction);
      }
    }
  };

  return {
    get board() {
      return board;
    },
    get ships() {
      return fleet;
    },
    get attackHistory() {
      return attackHistory;
    },
    placeShip,
    receiveAttack,
    allShipsSunk,
    placeFleetRandomly,
  };
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

const pickRandomCoordinate = () => {
  const r = Math.floor(Math.random() * 10);
  const c = Math.floor(Math.random() * 10);

  return [r, c];
};

const pickRandomDirection = () =>
  Math.floor(Math.random() * 2) === 1 ? "v" : "h";

// const isAdjacent = (board, row, column, shipLength, direction, ships) => {
//   for (let i = -1; i <= shipLength; i++) {
//     const r = direction === "h" ? row : row + i;
//     const c = direction === "h" ? column + i : column;
//     const up = direction === "h" ? board[r - 1]?.[c] : board[r]?.[c - 1];
//     const down = direction === "h" ? board[r + 1]?.[c] : board[r]?.[c + 1];
//
//     if (
//       Object.values(ships).includes(up) ||
//       Object.values(ships).includes(down)
//     )
//       return true;
//   }
//
//   return false;
// };
