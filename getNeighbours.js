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
