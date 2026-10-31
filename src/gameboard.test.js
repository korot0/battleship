// TODO: Refactor
import { GameBoard } from "./gameboard";

let gameBoard;

beforeEach(() => {
  gameBoard = GameBoard();
});

describe("ship placement", () => {
  test.each([
    ["patrolBoat", [0, 0], "h"],
    ["submarine", [5, 6], "h"],
    ["destroyer", [7, 9], "v"],
    ["battleship", [9, 0], "h"],
  ])("Places %s at %s %s", (name, coordinates, direction) => {
    gameBoard.placeShip(name, coordinates, direction);

    const length = gameBoard.ships[name].length;
    let [row, column] = coordinates;

    if (direction === "h") {
      for (let i = 0; i < length; i++)
        expect(gameBoard.board[row][column + i]).toEqual(gameBoard.ships[name]);
    } else if (direction === "v") {
      for (let i = 0; i < length; i++)
        expect(gameBoard.board[row + i][column]).toEqual(gameBoard.ships[name]);
    }
  });

  test("rejects horizontal placement out of bounds", () => {
    expect(gameBoard.placeShip("carrier", [4, 6], "h")).toBe(false);
  });

  test("rejects vertical placement out of bounds", () => {
    expect(gameBoard.placeShip("carrier", [7, 7], "v")).toBe(false);
  });

  test("rejects overlapping ship placement", () => {
    gameBoard.placeShip("patrolBoat", [5, 5], "h");
    expect(gameBoard.placeShip("carrier", [5, 2], "h")).toBe(false);
  });

  test("allows adjacent placements", () => {
    gameBoard.placeShip("patrolBoat", [7, 3], "h");
    expect(gameBoard.placeShip("carrier", [8, 3], "h")).toBe(true);
  });
});

describe("attacking board", () => {
  beforeEach(() => {
    gameBoard.placeShip("carrier", [2, 3], "v");
  });

  test("attacking empty cell marks it with 'miss' and returns miss", () => {
    expect(gameBoard.receiveAttack([2, 1])).toBe("miss");
    expect(gameBoard.board[2][1]).toBe("miss");
  });

  test("registers a hit when attacking an occupied cell", () => {
    expect(gameBoard.receiveAttack([2, 3])).toBe("hit");
    expect(gameBoard.board[2][3].hitCount).toBe(1);
  });

  test("counts hits on different cells of the same ship", () => {
    gameBoard.receiveAttack([2, 3]);
    expect(gameBoard.receiveAttack([3, 3])).toBe("hit");
    expect(gameBoard.board[2][3].hitCount).toBe(2);
  });

  test("rejects attacking the same coordinate twice", () => {
    gameBoard.receiveAttack([2, 3]);
    expect(gameBoard.receiveAttack([2, 3])).toBe("invalid");
  });
});

describe("sunken ships", () => {
  test("ships are not sunk", () => {
    expect(gameBoard.allShipsSunk()).toBe(false);
  });

  test("all ships are sunk", () => {
    for (const ship of Object.values(gameBoard.ships))
      for (let i = 0; i < ship.length; i++) ship.hit([0, i]);

    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});

describe("places fleet randomly", () => {
  test("places every ship across its expected number of cells", () => {
    gameBoard.placeFleetRandomly();

    const cells = gameBoard.board.flat();

    for (const ship of Object.values(gameBoard.ships)) {
      const occupiedCells = cells.filter((cell) => cell === ship);

      expect(occupiedCells).toHaveLength(ship.length);
    }
  });
});
