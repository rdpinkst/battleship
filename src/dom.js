export default function dom() {
  const players = ['player', 'computer'];

  const renderBoard = (player) => {
    const player1 = document.querySelector(`.${player}`);

    for (let i = 0; i < 100; i += 1) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('grid');
      newDiv.dataset.index = i;
      player1.appendChild(newDiv);
    }
  };

  const boards = () => {
    for (let i = 0; i < players.length; i += 1) {
      renderBoard(players[i]);
    }
  };

  const boardIndex = (e) => e.target.dataset.index;

  const renderShip = (boardArray) => {
    boards();
    boardArray.map((vals, index) => {
      if (vals === 1) {
        const divBoard = document.querySelector(`[data-index = "${index}"]`);
        divBoard.classList.add('ship');
      }
    });
  };

  return {
    players, boards, boardIndex, renderShip,
  };
}
