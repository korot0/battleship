import { Gameboard } from "./gameboard";

// Ship placement tests
test("Placing ship(2) at (0,0)", () => {
  const gameboard = Gameboard();

  expect(gameboard.board[0][0]).toBe(true);
});
