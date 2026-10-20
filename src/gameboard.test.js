import { GameBoard } from "./gameboard";

const gameBoard = GameBoard();

describe("ship placement", () => {
  test.each([
    ["patrolBoat", [0, 0], "h"],
    ["submarine", [5, 6], "h"],
    ["destroyer", [7, 9], "v"],
    ["battleship", [9, 0], "h"],
  ])("Places %s at %s %s", (shipName, coordinates, direction) => {
    gameBoard.placeShip(shipName, coordinates, direction);

    const length = gameBoard.ships[shipName].length;
    let [row, column] = coordinates;

    if (direction === "h") {
      for (let i = 0; i < length; i++)
        expect(gameBoard.board[row][column + i]).toEqual(
          gameBoard.ships[shipName],
        );
    } else if (direction === "v") {
      for (let i = 0; i < length; i++)
        expect(gameBoard.board[row + i][column]).toEqual(
          gameBoard.ships[shipName],
        );
    }
  });

  test("rejects horizontal placement out of bounds", () => {
    expect(gameBoard.placeShip("carrier", [4, 6], "h")).toBe(false);
  });

  test("rejects vertical placement out of bounds", () => {
    expect(gameBoard.placeShip("carrier", [7, 7], "v")).toBe(false);
  });

  test("rejects overlapping ship placement", () => {
    expect(gameBoard.placeShip("carrier", [5, 2], "h")).toBe(false);
  });

  test("rejects placement adjacent te another ship", () => {
    expect(gameBoard.placeShip("carrier", [8, 3], "h")).toBe(false);
  });
});

describe("attacking board", () => {
  gameBoard.placeShip("carrier", [2, 3], "v");

  test("attacking empty cell marks it with 'miss' and returns miss", () => {
    expect(gameBoard.receiveAttack([2, 1])).toBe("miss");
    expect(gameBoard.board[2][1]).toBe("miss");
  });

  test("registers a hit when attacking an occupied cell", () => {
    expect(gameBoard.receiveAttack([2, 3])).toBe("hit");
    expect(gameBoard.board[2][3].hitCount).toBe(1);
  });

  test("registers a hit when attacking an occupied cell", () => {
    expect(gameBoard.receiveAttack([3, 3])).toBe("hit");
    expect(gameBoard.board[2][3].hitCount).toBe(2);
  });

  test("rejects a hit when attacking an occupied cell", () => {
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
