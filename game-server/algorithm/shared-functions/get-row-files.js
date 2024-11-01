
function getRowFiles(board){

    let rowFiles = []
    for(let row = 0; row < 7; row++){
    
        let file = []
        for(let col = 0; col < 9; col++){
        
            file.push(board.tiles[col][row])
        }
        rowFiles.push(file)
    }
    return rowFiles
}

module.exports = getRowFiles