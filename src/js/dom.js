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
    if (!isHorizontal) rotateText.textContent = 'Orientation: Vertical';
    else {
      rotateText.textContent = 'Orientation: Horizontal';
    }
  });

  // randomize Btn helper
  function getPlacementSquares(row, col, length, isHorizontal) {
    const squares = [];

    for (let i = 0; i < length; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;

      const target = playerSquares[r]?.[c];
      if (!target) return null;
      squares.push(target);
    }
    return squares;
  }
  // randomize Btn helper
  function isValidPlacement(squares) {
    if (!squares) return false;

    return squares.every((sq) => !sq.classList.contains('ship-placed'));
  }
  // randomize Btn helper
  function placeShipSquares(squares) {
    squares.forEach((sq) => sq.classList.add('ship-placed'));
  }
  // ranomize helper
  function clearBoard() {
    playerSquares.flat().forEach((sq) => {
      sq.classList.remove('ship-placed', 'highlight', 'invalid');
    });
  }
  // randomize Btn helper
  function clearShipCoordinates() {
    ships.forEach((ship) => {
      ship.coordinates = [];
      ship.numberOfHits = 0;
      ship.isShipSunk = false;
    });
  }

  // randomize Btn helper (rebuilds ships UI)
  function renderShips() {
    shipsContainer.innerHTML = '';

    const destroyer = new Div('destroyer').element;
    const cruiser = new Div('cruiser').element;
    const submarine = new Div('submarine').element;
    const battleship = new Div('battleship').element;
    const carrier = new Div('carrier').element;

    ships.forEach((ship) => {
      const shipEl = new Div('ship').element;
      shipEl.classList.add('ship');
      // shipEl.textContent = 'This Ship';
      shipEl.setAttribute('draggable', 'true');
      shipEl.style.cursor = 'grab';

      shipEl.draggable = true;

      shipEl.addEventListener('dragstart', () => {
        draggedShip = ship;
        draggedShipEl = shipEl;
      });

      shipEl.addEventListener('dragend', () => {
        playerSquares.flat().forEach((sq) => {
          sq.classList.remove('highlight');
          sq.classList.remove('invalid');
        });
      });

      switch (ship.length) {
        case 1:
          (destroyer.appendChild(shipEl), (shipEl.textContent = 'Destroyer'));
          break;
        case 2:
          (cruiser.appendChild(shipEl), (shipEl.textContent = 'Cruiser'));
          break;
        case 3:
          (submarine.appendChild(shipEl), (shipEl.textContent = 'Submarine'));
          break;
        case 4:
          (battleship.appendChild(shipEl), (shipEl.textContent = 'Battleship'));
          break;
        case 5:
          (carrier.appendChild(shipEl), (shipEl.textContent = 'Carrier'));
          break;
      }
    });

    shipsContainer.append(destroyer, cruiser, submarine, battleship, carrier);
  }

  randomizeBtn.addEventListener('click', () => {
    clearBoard();
    clearShipCoordinates();

    renderShips();

    playerBoard.ships = [];

    ships.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const randomHorizontal = Math.random() < 0.5;

        const row = Math.floor(Math.random() * playerBoard.size);
        const col = Math.floor(Math.random() * playerBoard.size);

        const squares = getPlacementSquares(
          row,
          col,
          ship.length,
          randomHorizontal,
        );

        if (isValidPlacement(squares)) {
          placeShipSquares(squares);

          ship.coordinates = squares.map((sq) => [
            Number(sq.dataset.y),
            Number(sq.dataset.x),
          ]);
          playerBoard.placeShip(ship, ship.coordinates);

          placed = true;
        }
      }
    });

    shipsContainer.innerHTML = '';
    draggedShip = null;
    draggedShipEl = null;
  });

  let currentPlacement = [];
  let isValidPlace = false;
  let isHorizontal = true;
  let draggedShip = null;
  let draggedShipEl = null;

  const rotateText = new Div('rotateText').element;
  rotateText.textContent = 'Orientation: Horizontal';
  playerTitle.append(rotateText, btns);

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
    // shipEl.textContent = 'This Ship';
    shipEl.setAttribute('draggable', 'true');
    shipEl.style.cursor = 'grab';

    shipEl.draggable = true;

    shipEl.addEventListener('dragstart', () => {
      draggedShip = ship;
      draggedShipEl = shipEl;
    });

    shipEl.addEventListener('dragend', () => {
      playerSquares.flat().forEach((sq) => {
        sq.classList.remove('highlight');
        sq.classList.remove('invalid');
      });
    });

    switch (ship.length) {
      case 1:
        (destroyer.appendChild(shipEl), (shipEl.textContent = 'Destroyer'));
        break;
      case 2:
        (cruiser.appendChild(shipEl), (shipEl.textContent = 'Cruiser'));
        break;
      case 3:
        (submarine.appendChild(shipEl), (shipEl.textContent = 'Submarine'));
        break;
      case 4:
        (battleship.appendChild(shipEl), (shipEl.textContent = 'Battleship'));
        break;
      case 5:
        (carrier.appendChild(shipEl), (shipEl.textContent = 'Carrier'));
        break;
    }
  });

  shipsContainer.append(destroyer, cruiser, submarine, battleship, carrier);

  const container = new Div('board').element;
  const playerBoard = new Gameboard(10);
  const playerSquares = createBoardUI(container, 10);

  function createBoardUI(container, size) {
    const squares = [];

    for (let row = 0; row < size; row++) {
      const rowArr = [];
      for (let col = 0; col < size; col++) {
        const square = new Div('board-cell', row, col).element;
        container.appendChild(square);
        rowArr.push(square);
      }
      squares.push(rowArr);
    }

    return squares;
  }

  playerSquares.flat().forEach((square) => {
    square.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    square.addEventListener('mouseenter', () => {
      if (!draggedShip) return;

      playerSquares.flat().forEach((sq) => {
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
          target = playerSquares[row]?.[col + i];
        } else {
          target = playerSquares[row + i]?.[col];
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

      playerBoard.placeShip(draggedShip, draggedShip.coordinates);

      draggedShipEl.remove();

      // reset dragging
      draggedShip = null;
      draggedShipEl = null;
    });
  });

  const startBtnContainer = new Div('startCon').element;
  const startGameBtn = document.createElement('button');
  startGameBtn.textContent = 'Start Game';
  startBtnContainer.appendChild(startGameBtn);

  let computerBoard = null;
  let computerSquares = null;
  let computerContainer = null;

  startGameBtn.addEventListener('click', () => {
    if (shipsContainer.querySelector('.ship')) {
      alert('Place all your ships first');
      return;
    }

    rotateShipBtn.remove();
    randomizeBtn.remove();
    shipsContainer.remove();
    startGameBtn.remove();

    if (computerBoard) return;

    const computerSide = new Div('computerSide').element;
    const computerTitle = new Div('computerTitle').element;
    computerTitle.textContent = 'Computer Board';

    computerContainer = new Div('computerBoard').element;
    computerSide.append(computerTitle, computerContainer);
    document.body.appendChild(computerSide);

    computerBoard = new Gameboard(10);
    computerSquares = createBoardUI(computerContainer, 10);

    placeComputerShips();

    enableComputerAttacks();

    resetGameBtn();
  });

  function resetGameBtn() {
    const resetBtn = new Div('resetBtn').element;
    resetBtn.textContent = 'Reset Game';

    resetBtn.addEventListener('click', () => {});
  }

  function getPlacementSquaresOnUI(squares, row, col, length, isHorizontal) {
    const placement = [];

    for (let i = 0; i < length; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;

      const target = squares[r]?.[c];
      if (!target) return null;

      placement.push(target);
    }

    return placement;
  }

  function placeComputerShips() {
    const lengths = [1, 2, 3, 4, 5];

    lengths.forEach((length) => {
      const ship = new Ship(length);
      let placed = false;

      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        const placementSquares = getPlacementSquaresOnUI(
          computerSquares,
          row,
          col,
          length,
          isHorizontal,
        );

        if (!placementSquares) continue;

        const ok = placementSquares.every(
          (sq) => !sq.classList.contains('computer-ship'),
        );

        if (!ok) continue;

        placementSquares.forEach((sq) => sq.classList.add('computer-ship'));

        const coords = placementSquares.map((sq) => [
          Number(sq.dataset.y),
          Number(sq.dataset.x),
        ]);

        computerBoard.placeShip(ship, coords);

        placed = true;
      }
    });
  }

  function enableComputerAttacks() {
    computerSquares.flat().forEach((square) => {
      square.addEventListener('click', () => {
        if (!playerTurn) return;

        const row = Number(square.dataset.y);
        const col = Number(square.dataset.x);

        const result = computerBoard.receiveAttack([row, col]);

        if (result === 'already-attacked') return;

        if (result === 'miss') {
          square.classList.add('miss');
          playerTurn = false;
          setTimeout(computerMove, 500); // A Timeout before the comp attacks
        } else {
          square.classList.add('hit');
          if (result === 'sunk') console.log('You sunk a computer ship!');
        }

        if (computerBoard.allShipsSunk()) {
          alert('You win!');
        }
      });
    });
  }

  function computerMove() {
    let row;
    let col;
    let result;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      result = playerBoard.receiveAttack([row, col]);
    } while (result === 'already-attacked'); // chatgpt Loop

    const square = playerSquares[row][col];

    if (result === 'miss') {
      square.classList.add('miss');
      playerTurn = true;
    } else {
      square.classList.add('hit');
      if (result === 'sunk') console.log('computer sunk a ship!');
      setTimeout(computerMove, 500);
    }

    if (playerBoard.allShipsSunk()) {
      alert('Computer wins!');
    }
  }

  let playerTurn = true;

  playerSide.append(shipsContainer, playerTitle, container, startBtnContainer);

  document.body.append(playerSide);
}
