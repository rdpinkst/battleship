import gameBoard from './gameBoard.js';

test('array of length 100 created', () => {
  const gameB = gameBoard();
  expect(gameB.boardArray.length).toBe(100);
});

// test('can place function', () => {
//   const gameB = gameBoard();
//   gameB.horizontalPlacement(20, 5);
//   gameB.horizontalPlacement(55, 2);
//   expect(gameB.canPlace(0, 5, 'vertical')).toBeFalsy();
// });

test('placing ships horizontally', () => {
  const gameB = gameBoard();
  expect(gameB.horizontalPlacement(4, 6).includes(1)).toBeTruthy();
});

test('placing ships vertically', () => {
  const gameB = gameBoard();
  expect(gameB.verticalPlacement(68, 4).includes(1)).toBeTruthy();
});

test('attack recieved', () => {
  const gameB = gameBoard();
  gameB.verticalPlacement(68, 4);
  expect(gameB.receivedAttack(68).includes('H')).toBeTruthy();
});

test('all sunk', () => {
  const gameB = gameBoard();
  gameB.verticalPlacement(0, 3);
  gameB.horizontalPlacement(2, 4);
  gameB.receivedAttack(0);
  gameB.receivedAttack(10);
  gameB.receivedAttack(20);
  gameB.receivedAttack(2);
  gameB.receivedAttack(3);
  gameB.receivedAttack(4);
  gameB.receivedAttack(5);
  expect(gameB.allSunk()).toBeTruthy();
});
