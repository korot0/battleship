// Allowed sizes: How to handle wrong size?
//  1x5
//  1x4
//  2x3
//  1x2

export const Ship = (length) => {
  let hitCount = 0;

  const hit = () => {
    hitCount++;
  };

  const isSunk = () => length === hitCount;

  return {
    hit,
    isSunk,
  };
};
