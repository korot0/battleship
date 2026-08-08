import { DisplayController } from "./displayController.js";
import { Player } from "./player.js";

export const GameController = () => {
  const displayController = DisplayController();

  // NOTE: Will need to add playerOne and playerTwo creation to function based on pvp or pvc
  const playerOne = Player(1, "Human");
  const playerTwo = Player(2, "Computer"); // WARN: Change to human
  let attacker = playerOne;
  let defender = playerTwo;

  const start = (mode) => {
    displayController.renderGrids();
    displayController.addAttackListeners(mode, _attack);
  };

  // WARN: dummy ship placement
  const placeDummyShips = () => {
    playerOne.placeShip("patrolBoat", [0, 0], "h");
    displayController.renderShip(playerOne);
    playerOne.placeShip("submarine", [5, 6], "h");
    displayController.renderShip(playerOne);
    playerOne.placeShip("destroyer", [7, 9], "v");
    displayController.renderShip(playerOne);
    playerOne.placeShip("battleship", [9, 0], "h");
    displayController.renderShip(playerOne);
    playerOne.placeShip("carrier", [2, 3], "v");
    displayController.renderShip(playerOne);

    playerTwo.placeShip("patrolBoat", [5, 6], "h");
    displayController.renderShip(playerTwo);
    playerTwo.placeShip("submarine", [1, 7], "v");
    displayController.renderShip(playerTwo);
    playerTwo.placeShip("destroyer", [3, 2], "v");
    displayController.renderShip(playerTwo);
    playerTwo.placeShip("battleship", [8, 2], "h");
    displayController.renderShip(playerTwo);
    playerTwo.placeShip("carrier", [1, 0], "h");
    displayController.renderShip(playerTwo);
  };

  // INFO: PRIVATE METHODS
  // TODO: Disable attacker's grid
  const _attack = (coordinates) => {
    if (!coordinates) return;

    const response = attacker.attack(defender, coordinates);

    // _changeTurn();
    return response;
  };

  const _changeTurn = () => {
    let temp = attacker;
    attacker = defender;
    defender = temp;
  };

  return {
    start,
    placeDummyShips,
  };
};
