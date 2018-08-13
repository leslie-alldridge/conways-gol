

const createBoard = require('./createBoard')
const nextBoard = require('./nextBoard')
const displayBoard = require('./displayBoard')

let size = 0;
const framesPerSecond = 15
let growth = 0;
let cellWidth = 0;

function vars(){
size = document.getElementById("sizeField").value
board = createBoard(document.getElementById("sizeField").value)
growth = document.getElementById("growthField").value
cellWidth = document.getElementById("pixelField").value
}

let startBtn = document.getElementById("startBtn");
let clearBtn = document.getElementById("clearBtn");
let sizeField = document.getElementById("sizeField");
let growthBtn = document.getElementById("growthBtn");
let pixelBtn = document.getElementById("pixelBtn");
let pixelField = document.getElementById("pixelField");

if(growthBtn){
  growthBtn.onclick = growCells
}

if(startBtn){
  startBtn.onclick = growCells;
}

if(clearBtn){
    clearBtn.onclick = clearGrid;
}
if(pixelBtn){
  pixelBtn.onclick = clearGrid;
  
}

function growCells(){
  vars();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = (Math.random() >= growth)
    }
  }
}


document.addEventListener('DOMContentLoaded', vars(), drawGrid())
function drawGrid() {
  vars();
  for(var i = 0; i < size; i++) {
    for(var j = 0; j< size; j++) {
        var div = document.createElement("div");
        let cellWidth = pixelField.value;
        div.id = "r" + i + "c" + j;
        div.style.width = cellWidth + "px";
        div.style.height = cellWidth + "px";
        div.style.background = "black";
        div.style.border = "solid";
        div.style.borderWidth = "1px"
        div.style.borderColor = "black"
        let width = ((cellWidth * size) + (size * 2))  + "px";
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
