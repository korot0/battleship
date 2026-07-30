import "./reset.css";
import "./styles.css";

import { Player } from "./player.js";
import { DomController } from "./domController.js";

// NOTE: Move this inside a module?
const realPlayerBoard = document.querySelector(".board-player > .board-grid");
const computerBoard = document.querySelector(".board-oponent > .board-grid");

// Initial setup
const domController = DomController();
domController.renderGrid(realPlayerBoard);
domController.renderGrid(computerBoard);

// NOTE: dummy game
const realPlayer = Player();
const computerPlayer = Player();

// Player turn
realPlayer.placeShip("patrolBoat", [0, 0], "h");
domController.renderShip(realPlayer, realPlayerBoard);

realPlayer.placeShip("submarine", [5, 6], "h");
domController.renderShip(realPlayer, realPlayerBoard);

realPlayer.placeShip("destroyer", [7, 9], "v");
domController.renderShip(realPlayer, realPlayerBoard);

realPlayer.placeShip("battleship", [9, 0], "h");
domController.renderShip(realPlayer, realPlayerBoard);

realPlayer.placeShip("carrier", [2, 3], "v");
domController.renderShip(realPlayer, realPlayerBoard);

// Computer turn
computerPlayer.placeShip("patrolBoat", [6, 5], "h");
domController.renderShip(computerPlayer, computerBoard);

computerPlayer.placeShip("submarine", [0, 6], "h");
domController.renderShip(computerPlayer, computerBoard);

computerPlayer.placeShip("destroyer", [5, 9], "v");
domController.renderShip(computerPlayer, computerBoard);

computerPlayer.placeShip("battleship", [8, 0], "h");
domController.renderShip(computerPlayer, computerBoard);

computerPlayer.placeShip("carrier", [0, 3], "v");
domController.renderShip(computerPlayer, computerBoard);
