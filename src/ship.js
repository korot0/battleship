export const Ship = (length) => {
  let hitCount = 0;

  const hit = () => {
    hitCount++;
  };

  const isSunk = () => length === hitCount;

  return {
    hit,
    isSunk
  };
};
