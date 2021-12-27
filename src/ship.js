function ship(length) {
  const shipArray = Array.from(Array(length), () => 0);

  const hit = (x) => {
    const indexX = x - 1;
    if (indexX < length) {
      shipArray[indexX] = 1;
    }
    return shipArray;
  };

  const isSunk = () => shipArray.every((location) => location > 0);

  return {
    length, shipArray, hit, isSunk,
  };
}

module.exports = ship;
