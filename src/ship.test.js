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

test("Attacking a ship's coordinate", () => {
  expect(ship.hit([0, 1])).toBe(true);
});

test("Attacking a ship's coordinate twice", () => {
  expect(ship.hit([1, 1])).toBe(true);
  expect(ship.hit([1, 1])).toBe(false);
});
