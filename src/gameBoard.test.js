const gameBoard = require('./gameBoard');

test('array of length 100 created', () => {
  const gameB = gameBoard();
  expect(gameB.boardArray.length).toBe(100);
});

test('placing ships horizontally', () => {
  const gameB = gameBoard();
  expect(gameB.horizontalPlacement(4, 6).includes(1)).toBeTruthy();
});

test('placing ships vertically', () => {
  const gameB = gameBoard();
  expect(gameB.verticalPlacement(68, 4).includes(1)).toBeTruthy();
});

// test('ships not on top of eachother', () => {
//   const gameB = gameBoard();
//   gameB.horizontalPlacement(4, 6);
//   expect(gameB.cannotPlace().includes(-1)).toBeTruthy();
// });
