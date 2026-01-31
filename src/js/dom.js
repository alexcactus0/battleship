import { Div, Ship, Gameboard } from './logic.js';

export default function loadDom() {
  const playerSide = new Div('playerSide').element;
  const playerTitle = new Div('playerTitle').element;

  const btns = new Div('btns').element;
  const rotateShipBtn = document.createElement('button');
  const randomizeBtn = document.createElement('button');
  randomizeBtn.textContent = 'Randomize';
  rotateShipBtn.textContent = 'Rotate';

  btns.append(rotateShipBtn, randomizeBtn);

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
  let isHorizontal = true;
  let draggedShip = null;
  let draggedShipEl = null;

  // generating 5 Ships with fixed lengths for each
  const availableLengths = [1, 2, 3, 4, 5];
  const ships = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * availableLengths.length);
    const chosenLength = availableLengths.splice(randomIndex, 1)[0];

    ships.push(new Ship(chosenLength));
  }

  const shipsContainer = new Div('shipsContainer').element;

  const destroyer = new Div('destroyer').element;
  const cruiser = new Div('cruiser').element;
  const submarine = new Div('submarine').element;
  const battleship = new Div('battleship').element;
  const carrier = new Div('carrier').element;

  ships.forEach((ship) => {
    const shipEl = new Div('ship').element;
    shipEl.classList.add('ship');
    shipEl.textContent = 'This Ship';
    shipEl.setAttribute('draggable', 'true');
    shipEl.style.cursor = 'grab';

    shipEl.draggable = true;

    shipEl.addEventListener('dragstart', () => {
      draggedShip = ship;
      draggedShipEl = shipEl;
    });

    shipEl.addEventListener('dragend', () => {
      board.squares.flat().forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.remove('invalid');
      });
    });

    switch (ship.length) {
      case 1:
        destroyer.appendChild(shipEl);
        break;
      case 2:
        cruiser.appendChild(shipEl);
        break;
      case 3:
        submarine.appendChild(shipEl);
        break;
      case 4:
        battleship.appendChild(shipEl);
        break;
      case 5:
        carrier.appendChild(shipEl);
        break;
    }
  });

  shipsContainer.append(destroyer, cruiser, submarine, battleship, carrier);

  const container = new Div('board').element;
  const board = new Gameboard(container, 10);

  board.squares.flat().forEach((square) => {
    square.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    square.addEventListener('mouseenter', () => {
      if (!draggedShip) return;

      board.squares.flat().forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.remove('invalid');
      });

      currentPlacement = [];

      const length = draggedShip.length;

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

      isValidPlace =
        currentPlacement.length === length &&
        currentPlacement.every((sq) => !sq.classList.contains('ship-placed'));

      currentPlacement.forEach((sq) => {
        sq.classList.add(isValidPlace ? 'highlight' : 'invalid');
      });
    });

    square.addEventListener('click', () => {
      if (!draggedShip) return;
      if (!isValidPlace) return;

      currentPlacement.forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.remove('invalid');
        sq.classList.add('ship-placed');
      });

      draggedShip.coordinates = currentPlacement.map((sq) => [
        Number(sq.dataset.y),
        Number(sq.dataset.x),
      ]);

      draggedShipEl.remove();

      // reset dragging
      draggedShip = null;
      draggedShipEl = null;
    });
  });

  playerSide.append(btns, shipsContainer, playerTitle, container);

  document.body.append(playerSide);
}
