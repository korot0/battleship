import { DisplayController } from "./displayController.js";
import { Player } from "./player.js";
import { ComputerController } from "./computerController.js";

export const GameController = () => {
  let gameOver = false;
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
    playerOne.placeFleetRandomly();
    playerTwo.placeFleetRandomly();
  };

  const _attack = (coordinates) => {
    if (gameOver) return;

    const response = attacker.attack(defender, coordinates);
    if (response === "invalid") return response;
    _checkWinCondition();
    if (gameOver) return response;
    _changeTurn();

    // INFO: Emulate computer thinking
    setTimeout(() => {
      const coordinates = computerController.chooseCoordinates();
      attacker.attack(defender, coordinates);
      displayController.renderShips(playerOne);
      _checkWinCondition();
      if (gameOver) return;
      _changeTurn();
    }, 1000);

    return response;
  };

  const _checkWinCondition = () => {
    if (defender.board.allShipsSunk()) _finishGame();
  };

  const _finishGame = () => {
    gameOver = true;
    // TODO: Call method to display play again screen
    displayController.disableBoards();
    displayController.announceWinner(attacker);
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
