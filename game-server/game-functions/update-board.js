

const sharedVar = require("./shared-variables.js")

function updateTileState(board, moves){
    
    let sinkTiles = 0
    for(let coordinate in moves){
    
        let col = parseInt(coordinate[0])
        let row = parseInt(coordinate[1])
        let newState = moves[coordinate]
        
        if(newState == "sink"){
            sinkTiles += 1
            board.tiles[col][row].state = "miss"
            continue 
        }
        
        board.tiles[col][row].state = newState
    }
    
    //remove ship from active ships
    if(board.activeShips.includes(sinkTiles)){
    
        board.activeShips.splice(board.activeShips.indexOf(sinkTiles), 1)
    }
}

function updateBoard(req){

    let data = JSON.parse(req.body)
    let gameId = data.gameId
    let board = sharedVar.boards[gameId]
    
    board.totalMoves += 1
    updateTileState(board, data.moves)
    
    return board
}
module.exports = updateBoard


