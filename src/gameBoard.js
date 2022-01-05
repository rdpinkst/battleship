const ship = require('./ship');

function gameBoard() {
  const boardArray = Array.from(Array(100), () => 0);
  const ships = [];

  const canPlace = (start, length, direction) => {
    let placeOk = true;

    switch (direction) {
      case 'vertical':
        for (let i = start; i < length; i += 10) {
          if (boardArray[i] !== 0) {
            placeOk = false;
            return;
          }
        }
        break;
      case 'horizontal':
        for (let i = start; i < length; i += 1) {
          if (boardArray[i] !== 0) {
            placeOk = false;
            return;
          }
        }
        break;
      default:
        console.log('Pick a direction of vertical or horizonal');
        break;
    }

    return placeOk;
  };

  const horizontalPlacement = (start, length) => {
    const ship1 = ship(length);
    const shipIndex = length - 1;
    if (Math.floor((start + shipIndex) / 10) === Math.floor(start / 10) && canPlace(start, length, 'horizontal')) {
      boardArray.fill(1, start, (start + length));
      for (let i = 0; i < length; i += 1) {
        ship1.shipArray[i] = start + i;
      }
    }
    ships.push(ship1);
    return boardArray;
  };

  const verticalPlacement = (start, length) => {
    const ship1 = ship(length);
    const shipIndex = length - 1;
    const finalIndex = start + (shipIndex * 10);
    let startShip = 0;

    for (let i = start; i <= finalIndex; i += 10) {
      if (start >= 0 || (start <= 99 && finalIndex <= 99) && canPlace(start, length, 'vertical')) {
        boardArray[i] = 1;
        ship1.shipArray[startShip] = i;
        startShip += 1;
      }
    }
    ships.push(ship1);
    return boardArray;
  };

  const receivedAttack = (location) => {
    if (boardArray[location] === 1) {
      boardArray[location] = 'H';
      ships.forEach((boat) => {
        if (boat.shipArray.includes(location)) {
          boat.hit(boat.shipArray.indexOf(location));
        }
      });
    } else {
      boardArray[location] = 'M';
    }
    return boardArray;
  };

  const allSunk = () => ships.every((boat) => boat.isSunk());

  return {
    boardArray,
    horizontalPlacement,
    verticalPlacement,
    receivedAttack,
    allSunk,
  };
}

module.exports = gameBoard;
