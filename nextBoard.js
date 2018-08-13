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
