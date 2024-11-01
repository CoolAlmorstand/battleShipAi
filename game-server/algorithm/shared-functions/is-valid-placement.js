function isValidPlacement(col, row, orientation, ship, board){
    if(orientation == "horizontal"){
        //check if in bounce 
         if(col + ship - 1 >= board.tiles.length){
            return false
         }
         for(let offset = 0; offset < ship; offset++){
            if(board.tiles[col + offset][row].state == "miss"){
                return false
            }
         }
         return true
    }
    else {
        //check if in bounce 
        if(row + ship - 1 >= board.tiles[0].length){
            return false
        }
        for(let offset = 0; offset < ship; offset++){
            if(board.tiles[col][row + offset].state == "miss"){
                return false
            }
        }
        return true
    }
}

module.exports = isValidPlacement