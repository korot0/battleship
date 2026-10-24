import { ComputerController } from "./computerController.js";
test("Chooses every board coordinate without repeats", () => {
  const computerController = ComputerController();
  const coordinates = Array.from({ length: 100 }, () =>
    computerController.chooseCoordinates(),
  );

  expect(new Set(coordinates.map(([row, column]) => `${row},${column}`)).size)
    .toBe(100);
  for (const coordinate of coordinates) {
    expect(coordinate).toHaveLength(2);
    for (const value of coordinate) {
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(10);
    }
  }
});

// test("Attacks adjacent cell after a succeful hit", () => {});
