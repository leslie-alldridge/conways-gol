createBoard = (size) => {
let matrix = [];
for(let i=0; i<size; i++) {
    matrix[i] = new Array(size);
    matrix[i].fill();
}
return matrix
}
module.exports = createBoard
