// NOTE: Only 5 ships per gameboard allowed
// NOTE: Cannot place ships next to each other

export const Gameboard = () => {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(0));

  const placeShip = (length, direction, ship, x, y) => {
    // TODO: Populate array with ship
    // TODO: Check boundaries
    // TODO: Check that ship is not placed next to another ship
  };

  return {
    get board() {
      return grid;
    },
    placeShip,
  };
};
