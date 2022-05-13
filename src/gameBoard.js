import ship from './ship.js';

export default function gameBoard() {
  const boardArray = Array.from(Array(100), () => 0);
  const ships = [];

  const canPlace = (start, length, direction) => {
    let placeOk = true;

    if (direction === 'vertical') {
      for (let i = start; i < (start + 10 * length); i += 10) {
        if (boardArray[i] !== 0) {
          placeOk = false;
          break;
        }
      }
    }
    if (direction === 'horizontal') {
      for (let i = start; i < (start + length); i += 1) {
        if (boardArray[i] !== 0) {
          placeOk = false;
          break;
        }
      }
    }

    return placeOk;
  };

  const horizontalPlacement = (start, length) => {
    const ship1 = ship(length);
    const shipIndex = length - 1;
    const placeShip = canPlace(start, length, 'horizontal');

    if (placeShip && (Math.floor((start + shipIndex) / 10) === Math.floor(start / 10))) {
      boardArray.fill(1, start, (start + length));
      for (let i = 0; i < length; i += 1) {
        ship1.shipArray[i] = start + i;
      }
      ships.push(ship1);
    } else {
      console.log('cannot place');
    }
    return boardArray;
  };

  const verticalPlacement = (start, length) => {
    const ship1 = ship(length);
    const shipIndex = length - 1;
    const finalIndex = start + (shipIndex * 10);
    let startShip = 0;
    const placeShip = canPlace(start, length, 'vertical');

    for (let i = start; i <= finalIndex; i += 10) {
      if (placeShip && (start >= 0 && finalIndex <= 99)) {
        boardArray[i] = 1;
        ship1.shipArray[startShip] = i;
        startShip += 1;
      } else {
        console.log('cannot place');
        break;
      }
    }
    if (ship1.length > 0) {
      ships.push(ship1);
    }
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
    } else if (boardArray[location] === 0) {
      boardArray[location] = 'M';
    }
    return boardArray;
  };

  const allSunk = () => ships.every((boat) => boat.isSunk());

  return {
    boardArray,
    ships,
    canPlace,
    horizontalPlacement,
    verticalPlacement,
    receivedAttack,
    allSunk,
  };
}
