//returns a 2d array
const sharedVar = require("./shared-variables.js")

function generateTiles(colSize, rowSize){

    let colArray = []
    let rowArray = []
    
    for(let col = 0; col < colSize; col++){
        for(let row = 0; row < rowSize; row++){
        
            const tile = {
                row: row,
                col: col,
                state: "unknown",
                score: 0
            }
            rowArray.push(tile)
        }
        colArray.push(rowArray)
        rowArray = []
    }
    return colArray
}

function generateBoard(colSize, rowSize, ships, gameId){

    const board = {
        activeShips: ships,
        totalMoves: 0,
        tiles: generateTiles(colSize, rowSize)
    }
    sharedVar.boards[gameId] = board
}


module.exports = generateBoard