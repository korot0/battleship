// TODO: hunt-and-target: have to track sunken ships lengths

export const ComputerController = () => {
  const boardCoordinates = Array.from({ length: 100 }, (_, index) => [
    Math.floor(index / 10),
    index % 10,
  ]);

  const attack = (enemyBoard) => {
    return _attackRandomCoordinate(enemyBoard);
  };

  // const visitedCoordinates = new Set();
  // const currentTargets = [];
  // let hunting = false;

  // const attack = (enemyBoard) => {
  //   if (hunting) {
  //     const target = _pickRandomCoordinates(currentTargets);
  //     enemyBoard.receiveAttack(target.coordinates);
  //     currentTargets.splice(target.index, 1);
  //   } else {
  //     const currentAttack = _attackRandomCoordinate(enemyBoard);
  //     const [r, c] = currentAttack.coordinates;
  //
  //     if (currentAttack.res === "hit") {
  //       hunting = true;
  //       _addSurroundingTargets(r, c);
  //     } else {
  //       visitedCoordinates.add(`${r},${c}`);
  //     }
  //   }
  // };

  // const _addSurroundingTargets = (r, c) => {
  //   if (!visitedCoordinates.has(`${r},${c - 1}`))
  //     currentTargets.push([r, c - 1]);
  //   if (!visitedCoordinates.has(`${r},${c + 1}`))
  //     currentTargets.push([r, c + 1]);
  //   if (!visitedCoordinates.has(`${r - 1},${c}`))
  //     currentTargets.push([r - 1, c]);
  //   if (!visitedCoordinates.has(`${r + 1},${c}`))
  //     currentTargets.push([r + 1, c]);
  // };

  // NOTE: Private helpers
  const _attackRandomCoordinate = (enemyBoard) => {
    const randomCoordinates = _pickRandomCoordinates(boardCoordinates);
    boardCoordinates.splice(randomCoordinates.index, 1);

    return {
      res: enemyBoard.receiveAttack(randomCoordinates.coordinates),
      coordinates: randomCoordinates.coordinates,
    };
  };

  const _pickRandomCoordinates = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomCoordinates = array[randomIndex];

    return {
      index: randomIndex,
      coordinates: randomCoordinates,
    };
  };

  return {
    attack,
  };
};
