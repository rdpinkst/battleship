export default function dom() {
  const renderBoard = (player) => {
    const player1 = document.querySelector(`.${player}`);

    for (let i = 0; i < 100; i += 1) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('grid');
      newDiv.dataset.index = i;
      player1.appendChild(newDiv);
    }
  };

  const boardIndex = (e) => e.target.dataset.index;

  const renderShip = (boardArray, player) => {
    boardArray.map((vals, index) => {
      if (vals === 1) {
        const divBoard = document.querySelector(`.${player} > [data-index = "${index}"]`);
        divBoard.classList.add('ship');
      }
    });
  };

  const shipHit = (boardArray, player) => {
    boardArray.map((vals, index) => {
      if (vals === 'H') {
        const divBoard = document.querySelector(`.${player} > [data-index = "${index}"]`);
        if (player === 'player') {
          divBoard.classList.remove('ship');
        }
        divBoard.classList.add('hit');
        divBoard.textContent = 'X';
      }
    });
  };

  const shotMissed = (boardArray, player) => {
    boardArray.map((vals, index) => {
      if (vals === 'M') {
        const divBoard = document.querySelector(`.${player} > [data-index = "${index}"]`);
        divBoard.classList.add('missed');
        divBoard.textContent = 'O';
      }
    });
  };

  const directionButton = () => {
    const buttonDirection = document.querySelector('#boat-direction');

    buttonDirection.addEventListener('click', (e) => {
      if (e.target.textContent === 'Horizontal') {
        e.target.textContent = 'Vertical';
      } else {
        e.target.textContent = 'Horizontal';
      }
    });
  };

  const shipName = (shipSize) => {
    const domShip = document.querySelector('#turn');
    if (shipSize === 5) {
      domShip.textContent = 'Place your Aircraft Carrier';
    } else if (shipSize === 4) {
      domShip.textContent = 'Place your Battleship';
    } else if (shipSize === 3) {
      domShip.textContent = 'Place your Cruiser';
    } else if (shipSize === 2) {
      domShip.textContent = 'Place your Destroyer';
    } else if (shipSize === 1) {
      domShip.textContent = 'Place your Submarine';
    }
  };

  const showButton = (button) => {
    const btn = document.querySelector(`#${button}`);
    btn.classList.remove('hide');
  };

  const hideButton = (button) => {
    const btn = document.querySelector(`#${button}`);
    btn.classList.add('hide');
  };

  const removeChild = (parentnode) => {
    const parentNode = document.querySelector(`.${parentnode}`);

    while (parentNode.lastChild) {
      parentNode.removeChild(parentNode.lastChild);
    }
  };

  return {
    renderBoard,
    boardIndex,
    renderShip,
    shipHit,
    shotMissed,
    directionButton,
    shipName,
    showButton,
    hideButton,
    removeChild,
  };
}
