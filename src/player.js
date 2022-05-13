export default function player() {
  const shipLengthArray = [5, 4, 3, 2, 2, 1, 1];
  let shipIndex = 0;

  const computerPlay = (board) => {
    let play = Math.floor(Math.random() * 100);
    while (board.boardArray[play] === 'H' || board.boardArray[play] === 'M') {
      play = Math.floor(Math.random() * 100);
    }
    return play;
  };

  const computerPlaceShip = (board) => {
    const direction = ['horizontal', 'vertical'];
    let placementDirection;
    let start;
    let shipInd;
    let count = 0;

    while (board.ships.length !== shipLengthArray.length) {
      placementDirection = Math.floor(Math.random() * 2);
      start = Math.floor(Math.random() * 100);
      shipInd = shipLengthArray[count] - 1;
      console.log(start);

      if (board.canPlace(start, shipLengthArray[count], direction[placementDirection]) && (Math.floor((start + shipInd) / 10) === Math.floor(start / 10)) && direction[placementDirection] === 'horizontal') {
        board.horizontalPlacement(start, shipLengthArray[count]);
        count += 1;
      } else if (board.canPlace(start, shipLengthArray[count], direction[placementDirection]) && (start >= 0 && (start + (shipInd * 10)) <= 99) && direction[placementDirection] === 'vertical') {
        board.verticalPlacement(start, shipLengthArray[count]);
        count += 1;
      }
    }
  };

  const humanPlay = (e) => parseInt(e.target.dataset.index, 10);

  const canPlaceHorizontal = (start, length) => {
    const lastIndex = length - 1;
    let placeOk = true;
    for (let i = start; i <= (start + lastIndex); i += 1) {
      const divBoard = document.querySelector(`.player > [data-index = "${i}"]`);
      if ((Math.floor((start + (length - 1)) / 10) === Math.floor(start / 10)) && divBoard.classList.contains('ship')) {
        placeOk = false;
        break;
      }
    }
    return placeOk;
  };

  const canPlaceVertical = (start, length) => {
    const lastIndex = start + ((length - 1) * 10);
    let placeOk = true;
    for (let i = start; i <= lastIndex; i += 10) {
      const divBoard = document.querySelector(`.player > [data-index = "${i}"]`);
      if (start >= 0 && lastIndex <= 99 && divBoard.classList.contains('ship')) {
        placeOk = false;
        break;
      }
    }
    return placeOk;
  };

  const mouseInHorizontal = (e) => {
    const numb = parseInt(e.target.dataset.index, 10);
    const place = canPlaceHorizontal(numb, shipLengthArray[shipIndex]);
    const directionButton = document.querySelector('#boat-direction');

    if (place && Math.floor((numb + (shipLengthArray[shipIndex] - 1)) / 10) === Math.floor(numb / 10) && directionButton.textContent === 'Horizontal') {
      for (let i = 0; i < shipLengthArray[shipIndex]; i += 1) {
        const divBoard = document.querySelector(`.player > [data-index = "${numb + i}"]`);
        divBoard.classList.add('ship');
      }
    } else if (directionButton.textContent === 'Horizontal') {
      e.target.classList.add('cannot-place');
    }
  };

  const mouseInVertical = (e) => {
    const numb = parseInt(e.target.dataset.index, 10);
    const shipInd = shipLengthArray[shipIndex] - 1;
    const finalIndex = numb + (shipInd * 10);
    const place = canPlaceVertical(numb, shipLengthArray[shipIndex]);
    const directionButton = document.querySelector('#boat-direction');

    if (place && numb >= 0 && finalIndex <= 99 && directionButton.textContent === 'Vertical') {
      for (let i = 0; i <= shipInd; i += 1) {
        const divBoard = document.querySelector(`.player > [data-index = "${numb + (i * 10)}"]`);
        divBoard.classList.add('ship');
      }
    } else if (directionButton.textContent === 'Vertical') {
      e.target.classList.add('cannot-place');
    }
  };

  const mouseOutHorizontal = (e) => {
    const numb = parseInt(e.target.dataset.index, 10);
    const directionButton = document.querySelector('#boat-direction');
    if ((Math.floor((numb + (shipLengthArray[shipIndex] - 1)) / 10) === Math.floor(numb / 10)) && directionButton.textContent === 'Horizontal') {
      for (let i = 0; i < shipLengthArray[shipIndex]; i += 1) {
        const divBoard = document.querySelector(`.player > [data-index = "${numb + i}"]`);
        if (divBoard.classList.contains('cannot-place')) {
          divBoard.classList.remove('cannot-place');
          break;
        } else if (directionButton.textContent === 'Horizontal') {
          divBoard.classList.remove('ship');
        }
      }
    } else if (directionButton.textContent === 'Horizontal') {
      e.target.classList.remove('cannot-place');
    }
  };

  const mouseOutVertical = (e) => {
    const numb = parseInt(e.target.dataset.index, 10);
    const shipInd = shipLengthArray[shipIndex] - 1;
    const finalIndex = numb + (shipInd * 10);
    const directionButton = document.querySelector('#boat-direction');
    if (numb >= 0 && finalIndex <= 99 && directionButton.textContent === 'Vertical') {
      for (let i = 0; i <= shipInd; i += 1) {
        const divBoard = document.querySelector(`.player > [data-index = "${numb + (i * 10)}"]`);
        if (divBoard.classList.contains('cannot-place')) {
          divBoard.classList.remove('cannot-place');
          break;
        } else {
          divBoard.classList.remove('ship');
        }
      }
    } else if (directionButton.textContent === 'Vertical') {
      e.target.classList.remove('cannot-place');
    }
  };

  const humanPlacement = (gameBoard, dom, compBoard) => {
    const directionButton = document.querySelector('#boat-direction');
    const playerBoard = document.querySelectorAll('.player > .grid');

    playerBoard.forEach((grid) => {
      dom.shipName(shipLengthArray[shipIndex]);
      grid.addEventListener('mouseenter', mouseInHorizontal);
      grid.addEventListener('mouseout', mouseOutHorizontal);
      grid.addEventListener('mouseenter', mouseInVertical);
      grid.addEventListener('mouseout', mouseOutVertical);
      grid.addEventListener('click', (e) => {
        const numb = parseInt(e.target.dataset.index, 10);
        if (directionButton.textContent === 'Horizontal') {
          if (gameBoard.canPlace(numb, shipLengthArray[shipIndex], 'horizontal') && Math.floor((numb + (shipLengthArray[shipIndex] - 1)) / 10) === Math.floor(numb / 10)) {
            gameBoard.horizontalPlacement(numb, shipLengthArray[shipIndex]);
            dom.renderShip(gameBoard.boardArray, 'player');
            grid.removeEventListener('mouseout', mouseOutHorizontal);
            grid.removeEventListener('mouseenter', mouseInHorizontal);
            shipIndex += 1;
            dom.shipName(shipLengthArray[shipIndex]);
          }
        } else {
          const shipInd = shipLengthArray[shipIndex] - 1;
          const finalIndex = numb + (shipInd * 10);
          if (gameBoard.canPlace(numb, shipLengthArray[shipIndex], 'vertical') && (numb >= 0 && finalIndex <= 99)) {
            gameBoard.verticalPlacement(numb, shipLengthArray[shipIndex]);
            dom.renderShip(gameBoard.boardArray, 'player');
            grid.removeEventListener('mouseout', mouseOutVertical);
            grid.removeEventListener('mouseenter', mouseInVertical);
            shipIndex += 1;
            dom.shipName(shipLengthArray[shipIndex]);
          }
        }
        console.log(gameBoard.ships.length);
        console.log(gameBoard.ships.length === shipLengthArray.length);
        if (gameBoard.ships.length === shipLengthArray.length) {
          hideButton(gameBoard);
          computerPlaceShip(compBoard);
          dom.showButton('start');
          shipIndex = 0;
        }
      });
    });
  };

  const hideButton = (gameBoard) => {
    const directionButton = document.querySelector('#boat-direction');

    removeListers();
    directionButton.classList.add('hide');
  };

  const removeListers = () => {
    const playerBoard = document.querySelectorAll('.player > .grid');

    playerBoard.forEach((grid) => {
      grid.removeEventListener('mouseout', mouseOutHorizontal);
      grid.removeEventListener('mouseenter', mouseInHorizontal);
      grid.removeEventListener('mouseenter', mouseInVertical);
      grid.removeEventListener('mouseout', mouseOutVertical);
    });
  };

  return {
    shipLengthArray, computerPlay, humanPlay, computerPlaceShip, humanPlacement, removeListers,
  };
}
