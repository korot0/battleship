import { Ship } from "./ship";

test("Ship of length 5 is sunk after 5 hits", () => {
  const ship = Ship(5);

  for (let i = 0; i < 5; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBeTruthy();
});

test("Ship of length 5 is not sunk after 4 hits", () => {
  const ship = Ship(5);

  for (let i = 0; i < 4; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBeFalsy();
});
