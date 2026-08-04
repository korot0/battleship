import { DisplayController } from "./displayController.js";
import { Player } from "./player.js";

export const GameController = () => {
  // Initial setup
  const displayController = DisplayController();

  const playerOne = Player(1, "Human");
  const playerTwo = Player(2, "Computer");
  let attacker = playerOne;
  let defender = playerTwo;

  const start = (mode) => {
    displayController.renderGrids();
    displayController.addAttackListeners(mode, attack);
  };

  const attack = (coordinates) => {
    if (!coordinates) return;

    const response = attacker.attack(defender, coordinates);
    displayController.renderAttackedCell(response);
  };

  return {
    start,
  };
};
