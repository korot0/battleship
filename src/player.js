import { GameBoard } from "./gameboard";

export const Player = () => {
  const board = GameBoard();
  return {
    get board() {
      return board;
    },
    attack(oponent, coordinates) {
      return oponent.board.receiveAttack(coordinates);
    },
    placeShip(...args) {
      return board.placeShip(...args);
    },
  };
};
