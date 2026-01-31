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
  }

  isSunk() {
    let maxNumberOfHits = this.length;
    if (this.length === 0 && this.numberOfHits === this.length)
      return (this.isShipSunk = true);
  }
}

export class Gameboard {
  constructor(gameboardContainer, size) {
    this.gameboardContainer = gameboardContainer;
    this.size = size;
    this.squares = [];

    for (let row = 0; row < size; row++) {
      const rowArray = [];
      for (let col = 0; col < size; col++) {
        const square = new Div('board-cell', row, col).element;
        if (this.gameboardContainer) {
          this.gameboardContainer.appendChild(square);
        }
        rowArray.push(square);
      }
      this.squares.push(rowArray);
    }
  }

  dragShipsOnBoard() {
    // drag the Ships and place them on Gameboard
  }

  receiveAttack(coordinates) {
    let misses = 0;
    // Hits a ship?
    // If not misses++
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

loadDom();
