import { ComputerController } from "./computerController.js";
import { GameBoard } from "./gameboard.js";

const computerController = ComputerController();
const enemyBoard = GameBoard();

enemyBoard.placeShip("patrolBoat", [0, 0], "h");
enemyBoard.placeShip("submarine", [5, 6], "h");
enemyBoard.placeShip("destroyer", [7, 9], "v");
enemyBoard.placeShip("battleship", [9, 0], "h");
enemyBoard.placeShip("carrier", [2, 3], "v");

test("Attacks random cell", () => {
  expect(computerController.possibleIndexesLength).toBe(100);
  expect(["miss", "hit"]).toContain(
    computerController.attackRandomCoordinate(enemyBoard),
  );
  expect(computerController.possibleIndexesLength).toBe(99);
});
