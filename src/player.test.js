import player from './player.js';
import gameBoard from './gameBoard.js';

test('if random works', () => {
  const playerC = player();
  const gameB = gameBoard();
  expect(playerC.computerPlay(gameB)).toBeLessThanOrEqual(99);
});
