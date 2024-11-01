

export function generateBoard(ships, board){
    for(let col = 0; col < 9; col++){
    
        let file = []
        for(let row = 0; row < 7; row++){
        
            let tile = {
                col: col,
                row: row,
                state: "unknown",
                score: 0
            }
            file.push(tile)
        }
        board.tiles.push(file)
    }
    board.activeShips = ships
}