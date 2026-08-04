import "./reset.css";
import "./styles.css";

import { GameController } from "./gameController.js";

const game = GameController();
game.start("pvp");

// Ship placement sim
// playerOne.placeShip("patrolBoat", [0, 0], "h");
// domController.renderShip(playerOne);
// playerOne.placeShip("submarine", [5, 6], "h");
// domController.renderShip(playerOne);
// playerOne.placeShip("destroyer", [7, 9], "v");
// domController.renderShip(playerOne);
// playerOne.placeShip("battleship", [9, 0], "h");
// domController.renderShip(playerOne);
// playerOne.placeShip("carrier", [2, 3], "v");
// domController.renderShip(playerOne);
//
// playerTwo.placeShip("patrolBoat", [5, 6], "h");
// domController.renderShip(playerTwo);
// playerTwo.placeShip("submarine", [0, 7], "v");
// domController.renderShip(playerTwo);
// playerTwo.placeShip("destroyer", [3, 2], "v");
// domController.renderShip(playerTwo);
// playerTwo.placeShip("battleship", [8, 0], "h");
// domController.renderShip(playerTwo);
// playerTwo.placeShip("carrier", [0, 0], "h");
// domController.renderShip(playerTwo);
