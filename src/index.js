import "./reset.css";
import "./styles.css";

import { DomController } from "./domController.js";
import { Player } from "./player.js";

// Initial setup
const domController = DomController();
domController.renderGrids();

// NOTE: Flow: User drags ship to the board -> A listener from the dom calls the gameController to place the ship -> gameController tells domController to render it

// TODO: GameController
const playerOne = Player(1, "Human");
const playerTwo = Player(2, "Computer");

// NOTE: This smells funny...
domController.attachListeners(playerOne, playerTwo);

// Ship placement sim
if (true) {
  playerOne.placeShip("patrolBoat", [0, 0], "h");
  domController.renderShip(playerOne);
  playerOne.placeShip("submarine", [5, 6], "h");
  domController.renderShip(playerOne);
  playerOne.placeShip("destroyer", [7, 9], "v");
  domController.renderShip(playerOne);
  playerOne.placeShip("battleship", [9, 0], "h");
  domController.renderShip(playerOne);
  playerOne.placeShip("carrier", [2, 3], "v");
  domController.renderShip(playerOne);

  playerTwo.placeShip("patrolBoat", [5, 6], "h");
  domController.renderShip(playerTwo);
  playerTwo.placeShip("submarine", [0, 7], "v");
  domController.renderShip(playerTwo);
  playerTwo.placeShip("destroyer", [3, 2], "v");
  domController.renderShip(playerTwo);
  playerTwo.placeShip("battleship", [8, 0], "h");
  domController.renderShip(playerTwo);
  playerTwo.placeShip("carrier", [0, 0], "h");
  domController.renderShip(playerTwo);
}

// Game flow
let currentPlayer = playerOne;
