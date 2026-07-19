import { GameBoard } from "./gameboard";

const gameBoard = GameBoard();

describe("Ship placement", () => {
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
    expect(gameBoard.placeShip("carrier", [4, 6], "h")).toBeFalsy();
  });

  test("rejects vertical placement out of bounds", () => {
    expect(gameBoard.placeShip("carrier", [7, 7], "v")).toBeFalsy();
  });

  test("rejects overlapping ship placement", () => {
    expect(gameBoard.placeShip("carrier", [5, 2], "h")).toBeFalsy();
  });

  test("rejects placement adjacent to another ship", () => {
    expect(gameBoard.placeShip("carrier", [8, 3], "h")).toBeFalsy();
  });

  test("rejects placement adjacent to another ship", () => {
    expect(gameBoard.placeShip("carrier", [1, 2], "v")).toBeFalsy();
  });
});

// TODO: Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

// TODO: Gameboards should keep track of missed attacks so they can display them properly.

// TODO: Gameboards should be able to report whether or not all of their ships have been sunk.
