// TODO: hunt-and-target: have to track sunken ships lengths

export const ComputerController = () => {
  const boardCoordinates = Array.from({ length: 100 }, (_, index) => [
    Math.floor(index / 10),
    index % 10,
  ]);

  const chooseCoordinates = () => {
    const randomCoordinates = pickRandomCoordinates(boardCoordinates);
    boardCoordinates.splice(randomCoordinates.index, 1);

    return randomCoordinates.coordinates;
  };

  return {
    chooseCoordinates,
  };
};

const pickRandomCoordinates = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomCoordinates = array[randomIndex];

  return {
    index: randomIndex,
    coordinates: randomCoordinates,
  };
};
