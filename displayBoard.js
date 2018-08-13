
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
