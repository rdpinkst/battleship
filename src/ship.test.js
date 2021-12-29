const ships = require('./ship');

test('test ships length', () => {
  const ship = ships(4);
  expect(ship.length).toBe(4);
});

test('testing array made from length', () => {
  const ship = ships(6);
  expect(ship.shipArray).toEqual([0, 0, 0, 0, 0, 0]);
});

test('ship hit', () => {
  const ship = ships(4);
  expect(ship.hit(2)).toEqual([0, 1, 0, 0]);
});

test('ship hit', () => {
  const ship = ships(4);
  expect(ship.hit(5)).toEqual([0, 0, 0, 0]);
});

test('is ship suck', () => {
  const ship = ships(4);
  for (let i = 1; i <= 4; i += 1) {
    ship.hit(i);
  }
  expect(ship.isSunk()).toBeTruthy();
});
