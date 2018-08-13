function displayBoard (board) {
 process.stdout.write('\x1B[2J\x1B[0f')
 for (let i = 0; i < board.length; i++) {
   const row = board[i]
   console.log(row.map(cell => (cell) ? 'o' : '.').join(' '))
 }
 console.log()
}
module.exports = displayBoard
