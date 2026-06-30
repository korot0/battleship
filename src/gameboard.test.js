import { GameBoard } from "./gameboard";

// TODO: Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

// NOTE: Test out of bounds
test("rejects horizontal placement out of bounds", () => {});
test("rejects vertical placement out of bounds", () => {});

// NOTE: Test placement
test("places ship of length 2 at (0,0)", () => {});
test("places ship of length 3 vertically at (2,1)", () => {});
test("places ship of length 3 at (0,7)", () => {});
test("places ship of length 4 at (8,0)", () => {});
test("places ship of length 5 vertically at (3,7)", () => {});

// NOTE: Test overlapping placement
test("rejects overlapping ship placement", () => {});

// NOTE: Test adjacent placement
test("rejects placement adjacent to another ship", () => {});

// TODO: Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

// TODO: Gameboards should keep track of missed attacks so they can display them properly.

// TODO: Gameboards should be able to report whether or not all of their ships have been sunk.
