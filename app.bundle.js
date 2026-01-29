/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/logic.js"
/*!*************************!*\
  !*** ./src/js/logic.js ***!
  \*************************/
(module) {

class Ship {
  constructor(numberOfHits = 0, isShipSunk = false) {
    const preferedLengths = [1, 2, 3, 4, 5];
    this.length =
      preferedLengths[Math.floor(Math.random * preferedLengths.length)];
    this.numberOfHits = numberOfHits;
    this.isShipSunk = isShipSunk;
  }

  hit() {
    this.numberOfHits++;
  }

  isSunk() {
    let maxNumberOfHits = 5;
    if (this.length === 0 && this.numberOfHits === 5)
      return (this.isShipSunk = true);
  }
}

module.exports = Ship;

class Gameboard {
  constructor(gameboardContainer, gameboardContent) {
    this.gameboardContainer = gameboardContainer;
    this.gameboardContent = gameboardContent;
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


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/logic.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM5Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRTVCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvanMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9mSGl0cyA9IDAsIGlzU2hpcFN1bmsgPSBmYWxzZSkge1xuICAgIGNvbnN0IHByZWZlcmVkTGVuZ3RocyA9IFsxLCAyLCAzLCA0LCA1XTtcbiAgICB0aGlzLmxlbmd0aCA9XG4gICAgICBwcmVmZXJlZExlbmd0aHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSAqIHByZWZlcmVkTGVuZ3Rocy5sZW5ndGgpXTtcbiAgICB0aGlzLm51bWJlck9mSGl0cyA9IG51bWJlck9mSGl0cztcbiAgICB0aGlzLmlzU2hpcFN1bmsgPSBpc1NoaXBTdW5rO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMubnVtYmVyT2ZIaXRzKys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgbGV0IG1heE51bWJlck9mSGl0cyA9IDU7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwICYmIHRoaXMubnVtYmVyT2ZIaXRzID09PSA1KVxuICAgICAgcmV0dXJuICh0aGlzLmlzU2hpcFN1bmsgPSB0cnVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKGdhbWVib2FyZENvbnRhaW5lciwgZ2FtZWJvYXJkQ29udGVudCkge1xuICAgIHRoaXMuZ2FtZWJvYXJkQ29udGFpbmVyID0gZ2FtZWJvYXJkQ29udGFpbmVyO1xuICAgIHRoaXMuZ2FtZWJvYXJkQ29udGVudCA9IGdhbWVib2FyZENvbnRlbnQ7XG4gIH1cblxuICBkcmFnU2hpcHNPbkJvYXJkKCkge1xuICAgIC8vIGRyYWcgdGhlIFNoaXBzIGFuZCBwbGFjZSB0aGVtIG9uIEdhbWVib2FyZFxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGxldCBtaXNzZXMgPSAwO1xuICAgIC8vIEhpdHMgYSBzaGlwP1xuICAgIC8vIElmIG5vdCBtaXNzZXMrK1xuICB9XG59XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKHBsYXllciA9IG51bGwsIGZyaWVuZCA9IG51bGwsIGNvbXB1dGVyID0gbnVsbCkge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMuZnJpZW5kID0gZnJpZW5kO1xuICAgIHRoaXMuY29tcHV0ZXIgPSBjb21wdXRlcjtcbiAgICB0aGlzLnBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9sb2dpYy5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=