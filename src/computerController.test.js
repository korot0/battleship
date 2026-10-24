import { ComputerController } from "./computerController.js";
import { GameBoard } from "./gameboard.js";
import { Player } from "./player.js";

const computerController = ComputerController();
const player = Player(1, "computer");
const enemyBoard = GameBoard();

enemyBoard.placeShip("patrolBoat", [0, 0], "h");
enemyBoard.placeShip("submarine", [5, 6], "h");
enemyBoard.placeShip("destroyer", [7, 9], "v");
enemyBoard.placeShip("battleship", [9, 0], "h");
enemyBoard.placeShip("carrier", [2, 3], "v");

test("Attacks random cell", () => {
  expect(["miss", "hit"]).toContain(computerController.attack(player).res);
});

// test("Attacks adjacent cell after a succeful hit", () => {});
