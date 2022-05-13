import player from './player.js';
import gameBoard from './gameBoard.js';
import dom from './dom.js';

export default function gameLoop() {
  const humanPlayer = player();
  const computPlayer = player();

  const playerBoard = gameBoard();
  const computerBoard = gameBoard();

  const playerDom = dom();
  const computerDom = dom();

  playerDom.renderBoard('player');
  computerDom.renderBoard('computer');

  playerDom.directionButton();

  const turn = document.querySelector('#turn');
  const compBoard = document.querySelector('.computer');
  const startGame = document.querySelector('#start');
  const newGame = document.querySelector('#new-game');
  const winningPlayer = document.querySelector('#winner');

  const placeShip = () => {
    humanPlayer.humanPlacement(playerBoard, playerDom, computerBoard);
    startGame.addEventListener('click', playerTurn);
  };

  const winner = () => {
    if (playerBoard.allSunk()) {
      turn.textContent = '';
      winningPlayer.textContent = 'COMPUTER WINS';
      newGame.classList.remove('hide');
      compBoard.removeEventListener('click', playerAttack);
      newGame.addEventListener('click', restartGame);
    } else if (computerBoard.allSunk()) {
      turn.textContent = '';
      winningPlayer.textContent = 'YOU WINS';
      newGame.classList.remove('hide');
      compBoard.removeEventListener('click', playerAttack);
      newGame.addEventListener('click', restartGame);
    }
  };

  const playerAttack = (e) => {
    while (computerBoard.boardArray[humanPlayer.humanPlay(e)] === 1 || computerBoard.boardArray[humanPlayer.humanPlay(e)] === 0) {
      computerBoard.receivedAttack(humanPlayer.humanPlay(e));
      computerDom.shipHit(computerBoard.boardArray, 'computer');
      computerDom.shotMissed(computerBoard.boardArray, 'computer');
      compBoard.removeEventListener('click', playerAttack);

      winner();
      if (!computerBoard.allSunk()) {
        computerTurn();
      }
    }
  };

  const computerAttack = () => {
    playerBoard.receivedAttack(computPlayer.computerPlay(playerBoard));
    playerDom.shipHit(playerBoard.boardArray, 'player');
    playerDom.shotMissed(playerBoard.boardArray, 'player');
    winner();
    if (!playerBoard.allSunk()) {
      playerTurn();
    }
  };

  const playerTurn = () => {
    if (!startGame.classList.contains('hide')) {
      startGame.classList.add('hide');
    }
    turn.textContent = 'Attack your enemy!!';
    compBoard.addEventListener('click', playerAttack);
  };

  const computerTurn = () => {
    turn.textContent = 'Watch out, enemy fire coming!';
    setTimeout(computerAttack, 1500);
  };

  const restartGame = () => {
    const directionButton = document.querySelector('#boat-direction');
    for (let i = 0; i < playerBoard.boardArray.length; i += 1) {
      if (playerBoard.boardArray[i] !== 0) {
        playerBoard.boardArray[i] = 0;
      }
    }
    for (let i = 0; i < computerBoard.boardArray.length; i += 1) {
      if (computerBoard.boardArray[i] !== 0) {
        computerBoard.boardArray[i] = 0;
      }
    }

    console.log(playerBoard.boardArray);
    playerBoard.ships.splice(0, playerBoard.ships.length);
    computerBoard.ships.splice(0, computerBoard.ships.length);
    newGame.classList.add('hide');
    winningPlayer.textContent = '';
    playerDom.removeChild('player');
    computerDom.removeChild('computer');
    playerDom.renderBoard('player');
    directionButton.classList.remove('hide');
    computerDom.renderBoard('computer');
    placeShip();
  };

  return {
    playerTurn, computerAttack, winner, placeShip,
  };
}
