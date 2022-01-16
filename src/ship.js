export default function ship(length) {
  const shipArray = Array.from(Array(length), () => 0);

  const hit = (x) => {
    if (x < length) {
      shipArray[x] = 'H';
    }
    return shipArray;
  };

  const isSunk = () => shipArray.every((location) => location === 'H');

  return {
    length, shipArray, hit, isSunk,
  };
}

// module.exports = ship;
