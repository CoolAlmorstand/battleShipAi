
function getHigestScoreTile(board){

    let higestScore = 0
    let col = null 
    let row = null

    for(let colArray of board.tiles){
        for(let tile of colArray){
            if(tile.score > higestScore){
            
                higestScore = tile.score
                col = tile.col
                row = tile.row
            }
        }
    }
    return {col, row}
}

module.exports = getHigestScoreTile
