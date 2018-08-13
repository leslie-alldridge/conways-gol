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
