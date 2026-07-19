export const Ship = (length) => {
  let hitCount = 0;

  return {
    get length() {
      return length;
    },
    hit() {
      hitCount++;
    },
    isSunk() {
      return hitCount >= length;
    },
  };
};
