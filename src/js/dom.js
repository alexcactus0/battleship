import { Div, Ship, Gameboard } from './logic.js';

export default function loadDom() {
  const playerSide = new Div('playerSide').element;
  const playerTitle = new Div('playerTitle').element;

  const rotateShipBtn = document.createElement('button');
  const randomizeBtn = document.createElement('button');
  randomizeBtn.textContent = 'Randomize';
  rotateShipBtn.textContent = 'Rotate';

  rotateShipBtn.addEventListener('click', () => {
    isHorizontal = !isHorizontal;
  });

  // randomize helper
  function getPlacementSquares(row, col, length, isHorizontal) {
    const squares = [];

    for (let i = 0; i < length; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;

      const target = board.squares[r]?.[c];
      if (!target) return null;
      squares.push(target);
    }
    return squares;
  }
  // randomize helper
  function isValidPlacement(squares) {
    if (!squares) return false;

    return squares.every((sq) => !sq.classList.contains('ship-placed'));
  }
  // randomize helper
  function placeShipSquares(squares) {
    squares.forEach((sq) => sq.classList.add('ship-placed'));
  }

  randomizeBtn.addEventListener('click', () => {
    board.squares.flat().forEach((sq) => {
      sq.classList.remove('ship-placed');
      sq.classList.remove('highlight');
      sq.classList.remove('invalid');
    });

    for (let i = 0; i < 5; i++) {
      const ship = new Ship();
      let placed = false;

      while (!placed) {
        const isHorizontal = Math.random() < 0.5;

        const row = Math.floor(Math.random() * board.size);
        const col = Math.floor(Math.random() * board.size);

        const squares = getPlacementSquares(
          row,
          col,
          ship.length,
          isHorizontal,
        );

        if (isValidPlacement(squares)) {
          placeShipSquares(squares);
          placed = true;
        }
      }
    }
  });

  let currentPlacement = [];
  let isValidPlace = false;
  let shipIndex = 0;
  let isHorizontal = true;

  const ships = [];
  for (let i = 0; i < 5; i++) {
    ships.push(new Ship());
  }
  const container = new Div('board').element;
  const board = new Gameboard(container, 10);

  board.squares.flat().forEach((square) => {
    square.addEventListener('mouseenter', () => {
      if (shipIndex >= ships.length) return;

      board.squares.flat().forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.remove('invalid');
      });

      currentPlacement = [];

      const currentShip = ships[shipIndex];
      if (!currentShip) return;
      const length = currentShip.length;

      const row = Number(square.dataset.y);
      const col = Number(square.dataset.x);

      for (let i = 0; i < length; i++) {
        let target;

        if (isHorizontal) {
          target = board.squares[row]?.[col + i];
        } else {
          target = board.squares[row + i]?.[col];
        }

        if (target) currentPlacement.push(target);
      }

      isValidPlace = currentPlacement.length === length;

      currentPlacement.forEach((sq) => {
        sq.classList.add(isValidPlace ? 'highlight' : 'invalid');
      });
    });

    square.addEventListener('click', () => {
      if (shipIndex >= ships.length) return;
      if (!isValidPlace) return;

      const currentShip = ships[shipIndex];

      currentPlacement.forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.add('ship-placed');
      });

      currentShip.coordinates = currentPlacement.map((sq) => [
        Number(sq.dataset.y),
        Number(sq.dataset.x),
      ]);

      shipIndex++;
    });
  });

  playerSide.append(rotateShipBtn, randomizeBtn, playerTitle, container);

  document.body.append(playerSide);
}
