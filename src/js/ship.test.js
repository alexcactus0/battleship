import { Ship, Gameboard, Div } from './logic.js';

describe('Ship class', () => {
  test('Ship registers hits and sinks correctly', () => {
    const ship = new Ship(2);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.numberOfHits).toBe(1);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.numberOfHits).toBe(2);
    expect(ship.isSunk()).toBe(true);
  });
});

describe('Gameboard class', () => {
  test('placeShip stores ships correctly', () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];

    board.placeShip(ship, coords);

    expect(board.ships.length).toBe(1);
    expect(board.ships[0].coordinates).toEqual(coords);
  });

  test('getShip returns correct ship at coordinates', () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    const coords = [
      [1, 1],
      [1, 2],
    ];
    board.placeShip(ship, coords);

    expect(board.getShip(1, 1)).toBe(ship);
    expect(board.getShip(1, 2)).toBe(ship);
    expect(board.getShip(0, 0)).toBeNull();
  });

  test('receiveAttack marks hits, misses, and sunk ships correctly', () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    const coords = [[0, 0]];
    board.placeShip(ship, coords);

    // Miss
    expect(board.receiveAttack([1, 1])).toBe('miss');
    expect(board.missedShots).toContainEqual([1, 1]);

    // Hit
    expect(board.receiveAttack([0, 0])).toBe('sunk');
    expect(board.hitShots).toContainEqual([0, 0]);

    // Already attacked
    expect(board.receiveAttack([0, 0])).toBe('already-attacked');
    expect(board.receiveAttack([1, 1])).toBe('already-attacked');
  });

  test('allShipsSunk returns true only when all ships are sunk', () => {
    const board = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    board.placeShip(ship1, [[0, 0]]);
    board.placeShip(ship2, [[1, 1]]);

    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack([0, 0]);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack([1, 1]);
    expect(board.allShipsSunk()).toBe(true);
  });
});

describe('Div class', () => {
  test('Div creates element with correct class and attributes', () => {
    const div = new Div('my-class', 2, 3);
    expect(div.element.tagName).toBe('DIV');
    expect(div.element.classList.contains('my-class')).toBe(true);
    expect(div.element.getAttribute('data-y')).toBe('2');
    expect(div.element.getAttribute('data-x')).toBe('3');
    expect(div.row).toBe(2);
    expect(div.col).toBe(3);
  });

  test('Div generates unique id', () => {
    const div1 = new Div();
    const div2 = new Div();
    expect(div1.id).not.toBe(div2.id);
  });
});
