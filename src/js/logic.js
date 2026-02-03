import loadDom from './dom';
import '../styles/main.css';

export function Div(className, row, col) {
  this.element = document.createElement('div');
  this.id = crypto.randomUUID();

  if (className) this.element.classList.add(className);
  if (row !== undefined) this.element.setAttribute('data-y', row);
  if (col !== undefined) this.element.setAttribute('data-x', col);

  this.row = row;
  this.col = col;
}

export class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
    this.isShipSunk = false;
    this.coordinates = [];
  }

  hit() {
    this.numberOfHits++;
    if (this.numberOfHits >= this.length) this.isShipSunk = true;
  }

  isSunk() {
    return this.isShipSunk;
  }
}

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [];
    this.missedShots = [];
    this.hitShots = [];
  }

  placeShip(ship, coordinates) {
    ship.coordinates = coordinates;
    this.ships.push(ship);
  }

  getShip(row, col) {
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];

      for (let j = 0; j < ship.coordinates.length; j++) {
        const [r, c] = ship.coordinates[j];

        if (r === row && c === col) {
          return ship;
        }
      }
    }

    return null;
  }

  receiveAttack([row, col]) {
    if (
      this.missedShots.some(([r, c]) => r === row && c === col) ||
      this.hitShots.some(([r, c]) => r === row && c === col)
    ) {
      return 'already-attacked';
    }

    const ship = this.ships.find((s) =>
      s.coordinates.some(([r, c]) => r === row && c === col),
    );

    if (!ship) {
      this.missedShots.push([row, col]);
      return 'miss';
    }

    ship.hit();
    this.hitShots.push([row, col]);

    if (ship.isShipSunk) return 'sunk';
    return 'hit';
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isShipSunk);
  }
}

class Player {
  constructor(player = null, friend = null, computer = null) {
    this.player = player;
    this.friend = friend;
    this.computer = computer;
    this.playerBoard = new Gameboard();
  }
}

export class Dialog {
  constructor(
    method,
    formId,
    modalTitle,
    hasLabel = true,
    labelText,
    labelFor,
    hasInput = true,
    inputType,
    inputName,
    inputID,
    submitClass,
    submitText,
    hasCancelBtn = true,
    cancelClass,
  ) {
    this.method = method;
    this.formId = formId;
    this.modalTitle = modalTitle;
    this.hasLabel = hasLabel;
    this.labelText = labelText;
    this.labelFor = labelFor;
    this.hasInput = hasInput;
    this.inputType = inputType;
    this.inputID = inputID;
    this.inputName = inputName;
    this.submitClass = submitClass;
    this.submitText = submitText;
    this.hasCancelBtn = hasCancelBtn;
    this.cancelClass = cancelClass;
  }

  render() {
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
    const title = document.createElement('h2');
    const label = document.createElement('label');
    const input = document.createElement('input');

    const modalBtns = new Div('modalBtns').element;
    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    form.method = this.method;
    form.id = this.formId;
    form.setAttribute('novalidate', '');

    title.textContent = this.modalTitle;

    if (this.hasLabel) {
      label.setAttribute('for', this.labelFor);
      label.textContent = this.labelText;

      form.appendChild(label);
    }

    if (this.hasInput) {
      input.type = this.inputType;
      input.id = this.inputID;
      input.name = this.inputName;

      form.appendChild(input);
    }

    submitBtn.setAttribute('data-create-modal', '');
    submitBtn.classList.add(this.submitClass);
    submitBtn.textContent = this.submitText;

    if (this.hasCancelBtn) {
      cancelBtn.setAttribute('data-close-modal', '');
      cancelBtn.classList.add(this.cancelClass);
      cancelBtn.textContent = 'Cancel';
      modalBtns.append(cancelBtn);
    }

    modalBtns.prepend(submitBtn);

    form.prepend(title);
    form.append(modalBtns);

    dialog.appendChild(form);
    return dialog;
  }
}

loadDom();
