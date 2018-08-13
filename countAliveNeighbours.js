const getNeighbours = require('./getNeighbours')
countAliveNeighbours = (cellRow, cellColumn, board) => {
    let arr = (getNeighbours(cellRow, cellColumn, board));
    return arr.filter(status => status === true).length
}
module.exports = countAliveNeighbours
