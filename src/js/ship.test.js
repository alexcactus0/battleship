const Ship = require('./logic.js');

test('Ship random number should be 1 after mocking Math.floor to be 0', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0);

  const ship = new Ship();
  expect(ship.length).toBe(1);

  Math.random.mockRestore();
});
