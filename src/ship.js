// Allowed sizes: How to handle wrong size?
//  1x5
//  1x4
//  2x3
//  1x2

export const Ship = (length) => {
  let hitCount = 0;
  let active = false;

  const hit = () => {
    hitCount++;
  };

  const isSunk = () => length === hitCount;

  const toggleActive = () => (active = !active);

  const isActive = () => active;

  return {
    hit,
    isSunk,
    toggleActive,
    isActive,
  };
};
