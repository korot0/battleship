import { GameBoard } from "./gameboard";

const gameBoard = GameBoard();

// TODO: Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

describe("Ship placement", () => {
  test.each([
    ["patrolBoat", [1, 1], "h"],
    ["submarine", [5, 6], "h"],
    ["destroyer", [0, 7], "v"],
    ["battleship", [9, 0], "h"],
    ["carrier", [3, 4], "v"],
  ])("Places %s at %s %s", (shipName, coordinates, direction) => {
    gameBoard.placeShip(shipName, coordinates, direction);

    const length = gameBoard.ships[shipName].length;
    let [row, column] = coordinates;

    if (direction === "h") {
      for (let i = 0; i < length; i++) {
        expect(gameBoard.board[row][column + i]).toEqual(
          gameBoard.ships[shipName],
        );
      }
    } else if (direction === "v") {
      for (let i = 0; i < length; i++) {
        expect(gameBoard.board[row + i][column]).toEqual(
          gameBoard.ships[shipName],
        );
      }
    }
  });
});

// NOTE: Test an already active ship placement

// NOTE: Test out of bounds
test("rejects horizontal placement out of bounds", () => {});
test("rejects vertical placement out of bounds", () => {});

// NOTE: Test overlapping placement
test("rejects overlapping ship placement", () => {});

// NOTE: Test adjacent placement
test("rejects placement adjacent to another ship", () => {});

// TODO: Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

// TODO: Gameboards should keep track of missed attacks so they can display them properly.

// TODO: Gameboards should be able to report whether or not all of their ships have been sunk.
