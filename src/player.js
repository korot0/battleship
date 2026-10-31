import { GameBoard } from "./gameboard";

export const Player = (id, type) => {
  const board = GameBoard();

  return {
    get id() {
      return id;
    },
    get type() {
      return type;
    },
    get board() {
      return board;
    },
    attack(oponent, coordinates) {
      return oponent.board.receiveAttack(coordinates);
    },
    placeShip(...args) {
      return board.placeShip(...args);
    },
    placeFleetRandomly() {
      return board.placeFleetRandomly();
    },
  };
};
