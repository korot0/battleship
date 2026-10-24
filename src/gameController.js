import { DisplayController } from "./displayController.js";
import { Player } from "./player.js";
import { ComputerController } from "./computerController.js";

export const GameController = () => {
  const displayController = DisplayController();

  // WARN: Will need to add playerOne and playerTwo creation to function based on pvp or pvc
  const playerOne = Player(1, "Human");
  const playerTwo = Player(2, "Computer");
  const computerController = ComputerController();
  let attacker = playerOne;
  let defender = playerTwo;

  const start = () => {
    displayController.renderGrids();
    displayController.addAttackListeners(_attack);
    displayController.toggleActiveGrid(attacker);
    displayController.renderShips(playerOne);
  };

  // WARN: dummy ship placement
  const placeDummyShips = () => {
    playerOne.placeShip("patrolBoat", [0, 0], "h");
    playerOne.placeShip("submarine", [5, 5], "h");
    playerOne.placeShip("destroyer", [7, 9], "v");
    playerOne.placeShip("battleship", [9, 0], "h");
    playerOne.placeShip("carrier", [2, 3], "v");

    playerTwo.placeShip("patrolBoat", [5, 6], "h");
    playerTwo.placeShip("submarine", [1, 7], "v");
    playerTwo.placeShip("destroyer", [3, 2], "v");
    playerTwo.placeShip("battleship", [8, 2], "h");
    playerTwo.placeShip("carrier", [1, 0], "h");
  };

  // INFO: PRIVATE METHODS
  const _attack = (coordinates) => {
    const response = attacker.attack(defender, coordinates);
    _changeTurn();

    // NOTE: Emulate computer thinking
    setTimeout(() => {
      const coordinates = computerController.chooseCoordinates();
      attacker.attack(defender, coordinates);
      displayController.renderShips(playerOne);
      _changeTurn();
    }, 1200);

    return response;
  };

  const _changeTurn = () => {
    [attacker, defender] = [defender, attacker];
    _toggleActiveGrids();
  };

  const _toggleActiveGrids = () => {
    displayController.toggleActiveGrid(attacker);
    displayController.toggleActiveGrid(defender);
  };

  return {
    start,
    placeDummyShips,
  };
};
