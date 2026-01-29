import { Div, Ship, Gameboard } from './logic.js';

export default function loadDom() {
  const playerSide = new Div('playerSide').element;
  const playerTitle = new Div('playerTitle').element;

  let currentPlacement = [];

  const ship = new Div('ship').element;
  ship.textContent = 'SHIP';
  ship.dataset.length = 3;

  const container = new Div('board').element;
  const board = new Gameboard(container, 10);

  board.squares.flat().forEach((square) => {
    square.addEventListener('mouseenter', () => {
      board.squares.flat().forEach((sq) => sq.classList.remove('highlight'));

      currentPlacement = [];

      const length = Number(ship.dataset.length);
      const row = Number(square.dataset.y);
      const col = Number(square.dataset.x);

      for (let i = 0; i < length; i++) {
        const target = board.squares[row]?.[col + i];
        if (target) {
          target.classList.add('highlight');
          currentPlacement.push(target);
        }
      }
    });

    square.addEventListener('click', () => {
      const length = Number(ship.dataset.length);

      if (currentPlacement.length !== length) return;

      currentPlacement.forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.add('ship-placed');
      });
    });
  });

  const ships = [];
  for (let i = 0; i < 5; i++) {
    ships.push(new Ship());
  }

  playerSide.append(playerTitle, container);

  document.body.append(ship, playerSide);
}
