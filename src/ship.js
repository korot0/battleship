export const Ship = (length) => {
  let hitCount = 0;

  return {
    get length() {
      return length;
    },
    get hitCount() {
      return hitCount;
    },
    hit() {
      hitCount++;
      return true;
    },
    isSunk() {
      return hitCount >= length;
    },
  };
};
