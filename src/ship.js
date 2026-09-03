export const Ship = (length) => {
  let hitCount = 0;
  let hitHistory = new Set();

  const _cellIsHit = (coordinates) => hitHistory.has(`${coordinates}`);

  return {
    get length() {
      return length;
    },
    get hitCount() {
      return hitCount;
    },
    hit(coordinates) {
      if (_cellIsHit(coordinates)) return false;

      hitHistory.add(`${coordinates}`);
      hitCount++;
      return true;
    },
    isSunk() {
      return hitCount >= length;
    },
  };
};
