

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
