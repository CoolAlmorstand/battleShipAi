
const fastAlgorithm = require("./fast-algorithm/fast-algorithm.js")
const sharedVar = require("../game-functions/shared-variables.js")


function getAiMove(board){

    if (board.activeShips.length > 0){
    
        return fastAlgorithm(board)
    } 
    else {
        console.warn("game ended")
        console.warn(`total moves: ${board.totalMoves}`)
        console.warn(`accuracy : ${ ((17 / board.totalMoves) * 100).toFixed(2)}`)
        //return bruteForceAlgorithm(board)
    }
}

module.exports = getAiMove