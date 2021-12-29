const ship = require('./ship');

function gameBoard() {
  const boardArray = Array.from(Array(100), () => 0);

  const horizontalPlacement = (start, length) => {
    const ship1 = ship(length);
    const shipIndex = length - 1;
    if (Math.floor((start + shipIndex) / 10) === Math.floor(start / 10)) {
      boardArray.fill(1, start, (start + length));
      for (let i = 0; i < length; i += 1) {
        ship1.shipArray[i] = start + i;
      }
    }
    return boardArray;
  };

  const verticalPlacement = (start, length) => {
    const ship1 = ship(length);
    const shipIndex = length - 1;
    const finalIndex = start + (shipIndex * 10);
    let startShip = 0;

    for (let i = start; i <= finalIndex; i += 10) {
      if (start >= 0 && start <= 99 && finalIndex <= 99) {
        boardArray[i] = 1;
        ship1.shipArray[startShip] = i;
        startShip += 1;
      }
    }
    return boardArray;
  };

  const cannotPlace = (start) => {
    if (start) {
      boardArray[start - 10] = -1;
      boardArray[start - 1] = -1;
      boardArray[start + 1] = -1;
    }
  };

  return {
    boardArray,
    horizontalPlacement,
    verticalPlacement,
  };
}

module.exports = gameBoard;
