
const getHighestScoreTile = require("./get-highest-score-tile.js")


function clearPreviousScore(board){
    
    for(let row of board.tiles){
        for(let tile of row){
            tile.score = 0
        }
    }
}

function generateResponse(board, edgeTiles){

    let response = {
        edgeTiles: edgeTiles,
        higestScoreTile: getHighestScoreTile(board),
        tilesScore: []
    }
    
    
    for(let col of board.tiles){
    
        let file = []
        for(let tile of col){
            let responseTile = {
                col: tile.col,
                row: tile.row,
                score: tile.score
            }
            file.push(responseTile)
        }
        response.tilesScore.push(file)
    }
    clearPreviousScore(board)
    return response
}

module.exports = generateResponse