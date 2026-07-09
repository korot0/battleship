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
    let [row, column] = coordinates;
    const offset = direction === "h" ? column : row;
    const length = ships[shipName].length + offset;

    if (ships[shipName].isDeployed) return false;

    if (direction === "h") {
      for (column; column < length; column++) {
        board[row][column] = ships[shipName];
      }
    } else if (direction === "v") {
      for (row; row < length; row++) {
        board[row][column] = ships[shipName];
      }
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

const makeBoard = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) board[i] = new Array(10).fill(null);
  return board;
};
