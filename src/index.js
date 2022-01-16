import './style.css';
// import { doc } from 'prettier';
import dom from './dom.js';
import gameBoard from './gameBoard.js';

const board = dom();
// document.addEventListener('DOMContentLoaded', board.boards);

const gameOne = gameBoard();

gameOne.verticalPlacement(0, 5);
gameOne.horizontalPlacement(3, 4);
gameOne.horizontalPlacement(9, 3);
gameOne.verticalPlacement(32, 3);
gameOne.horizontalPlacement(42, 2);
gameOne.verticalPlacement(26, 3);

// board.renderShip();

board.renderShip(gameOne.boardArray);
