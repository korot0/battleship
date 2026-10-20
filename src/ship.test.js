import { Ship } from "./ship";

let ship;

beforeEach(() => {
  ship = Ship(5);
});

test("Ship of length 5 is sunk after 5 hits", () => {
  for (let i = 0; i < 5; i++) {
    ship.hit([0, i]);
  }
  expect(ship.isSunk()).toBe(true);
});

test("Ship of length 5 is not sunk after 4 hits", () => {
  for (let i = 0; i < 4; i++) {
    ship.hit([0, i]);
  }
  expect(ship.isSunk()).toBe(false);
});

test("Calling hit() increments hitCount", () => {
  expect(ship.hitCount).toBe(0);
  ship.hit();
  expect(ship.hitCount).toBe(1);
  ship.hit();
  expect(ship.hitCount).toBe(2);
});
