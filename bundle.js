(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const getNeighbours = require('./getNeighbours')
countAliveNeighbours = (cellRow, cellColumn, board) => {
    let arr = (getNeighbours(cellRow, cellColumn, board));
    return arr.filter(status => status === true).length
}
module.exports = countAliveNeighbours

},{"./getNeighbours":4}],2:[function(require,module,exports){
createBoard = (size) => {
let matrix = [];
for(let i=0; i<size; i++) {
    matrix[i] = new Array(size);
    matrix[i].fill();
}
return matrix
}
module.exports = createBoard

},{}],3:[function(require,module,exports){

function displayBoard (board) {
  for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
          if (board[x][y])
          document.getElementById("r" + x + "c" + y).style.background = "orange";
          else
          document.getElementById("r" + x + "c" + y).style.background = "blue";

      }  
  }
}

module.exports = displayBoard

},{}],4:[function(require,module,exports){
const indicesAreOutOfBounds = require('./indicesAreOutOfBounds')
getNeighbours = (cellRow, cellColumn, board) => {
    let neighbourArr = [];
    for(let r = -1; r <= 1; r ++){
        for(let c = -1; c <= 1; c ++){
            if (c === 0 && r === 0){
            } 
            else if (!indicesAreOutOfBounds(cellRow + r, cellColumn + c, board)){
                neighbourArr.push(board[cellRow + r][cellColumn + c])
            }
        }
    }
    return neighbourArr;
}
module.exports = getNeighbours

},{"./indicesAreOutOfBounds":6}],5:[function(require,module,exports){


const createBoard = require('./createBoard')
const nextBoard = require('./nextBoard')
const displayBoard = require('./displayBoard')

let size = 0;
const framesPerSecond = 15


function vars(){
size = document.getElementById("sizeField").value
board = createBoard(document.getElementById("sizeField").value)
}

let startBtn = document.getElementById("startBtn");
let clearBtn = document.getElementById("clearBtn");
let sizeField = document.getElementById("sizeField");

if(startBtn){
  startBtn.onclick = growCells;
}

if(clearBtn){
    clearBtn.onclick = clearGrid;
}
if(sizeField){
  //sizeField.oninput = growCells;
}

function growCells(){
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = (Math.random() >= 0.45)
    }
  }
}


document.addEventListener('DOMContentLoaded', vars(), drawGrid())
function drawGrid() {
  vars();
  for(var i = 0; i < size; i++) {
    for(var j = 0; j< size; j++) {
        var div = document.createElement("div");
        let boxSize = 16;
        div.id = "r" + i + "c" + j;
        div.style.width = boxSize + "px";
        div.style.height = boxSize + "px";
        div.style.background = "black";
        div.style.border = "solid";
        div.style.borderWidth = "1px"
        div.style.borderColor = "black"
        let width = ((boxSize * size) + (size * 2))  + "px";
        document.getElementById("container").style.width = width;
        document.getElementById("container").appendChild(div);
    }
  }
  
}

  function clearGrid(){
    for (let y = 0; y < board.length; y++) {
		for (let j = 0; j < board.length; j++) {
            var element = document.getElementById("r" + y + "c" + j);
            element.parentNode.removeChild(element);
		}
    
}
vars();
    drawGrid();
}


setInterval(() => {
  displayBoard(board)
  board = nextBoard(board)
}, 1000 / framesPerSecond)

},{"./createBoard":2,"./displayBoard":3,"./nextBoard":11}],6:[function(require,module,exports){
const isOutOfBounds = require('./isOutOfBounds')
indicesAreOutOfBounds = (rowIndex, columnIndex, array) => {
    if (isOutOfBounds(rowIndex, array)){
        return true;
    }
    if (isOutOfBounds(columnIndex, array)){
        return true
    }
    return false;
}
module.exports = indicesAreOutOfBounds

},{"./isOutOfBounds":7}],7:[function(require,module,exports){
isOutOfBounds = (index, array) => index < 0 || index > array.length - 1 ? true : false;
module.exports = isOutOfBounds

},{}],8:[function(require,module,exports){
isOverPopulated = (neighbourCount) => neighbourCount > 3 ? true : false;
module.exports = isOverPopulated

},{}],9:[function(require,module,exports){
isRessurectable = (neighbourCount) => neighbourCount == 3 ? true : false;
module.exports = isRessurectable

},{}],10:[function(require,module,exports){
isUnderPopulated = (neighbourCount) => neighbourCount < 2 ? true : false;
module.exports = isUnderPopulated

},{}],11:[function(require,module,exports){
const nextCellState = require('./nextCellState')
const countAliveNeighbours = require('./countAliveNeighbours')
nextBoard = (currentBoard) => {
    let newBoard = createBoard(currentBoard.length) 
    for (let r = 0; r < currentBoard.length; r++) {
      for (let c = 0; c < currentBoard.length; c++) {
        newBoard[r][c] = nextCellState(currentBoard[r][c], countAliveNeighbours(r, c, currentBoard))
      }
    }
    return newBoard;
}
module.exports = nextBoard

},{"./countAliveNeighbours":1,"./nextCellState":12}],12:[function(require,module,exports){
const isOverPopulated = require('./isOverPopulated')
const isUnderPopulated = require('./isUnderPopulated')
const isRessurectable = require('./isRessurectable')
nextCellState = (cellState, neighbourCount) => {
    if (isOverPopulated(neighbourCount) && cellState) {
        return false
    }
    if (isUnderPopulated(neighbourCount) && cellState) {
        return false
    }
    if (isRessurectable(neighbourCount) && !cellState) {
        return true
    }
    if (!isUnderPopulated(neighbourCount) && !isOverPopulated(neighbourCount) && cellState) {
        return true
    }
        else return false;
}
module.exports = nextCellState

},{"./isOverPopulated":8,"./isRessurectable":9,"./isUnderPopulated":10}]},{},[5]);
