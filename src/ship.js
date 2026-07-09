export const Ship = (length) => {
  let hitCount = 0;
  let isDeployed = false;

  return {
    get length() {
      return length;
    },
    get isDeployed() {
      return isDeployed;
    },
    hit() {
      hitCount++;
    },
    isSunk() {
      return hitCount >= length;
    },
    deploy() {
      isDeployed = true;
    },
  };
};
