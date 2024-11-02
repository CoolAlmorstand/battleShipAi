function isSingleHitTile(board, tile){

    let edgeTiles = []
    
    let col = tile.col
    let row = tile.row

    //check if in bounce
    if(col > 0){
        if(board.tiles[col - 1][row].state == "hit"){
            return []
        }
        else if(board.tiles[col - 1][row].state == "unknown"){
            edgeTiles.push(board.tiles[col - 1][row])
        }
    }
    
    if(col < 8){
        if(board.tiles[col + 1][row].state == "hit"){
            return []
        }
        else if(board.tiles[col + 1][row].state == "unknown"){
            edgeTiles.push(board.tiles[col + 1][row])
        }
    }
    
    if(row > 0){
        if(board.tiles[col][row - 1].state == "hit"){
            return []
        }
        else if(board.tiles[col][row - 1].state == "unknown"){
            edgeTiles.push(board.tiles[col][row - 1])
        }
    }
    
    if(row < 6){
        if(board.tiles[col][row + 1].state == "hit"){
            return []
        }
        else if(board.tiles[col][row + 1].state == "unknown"){
            edgeTiles.push(board.tiles[col][row + 1])
        }
    }
    return edgeTiles
}


function getAdjacentTilesOfConnection(board, connection){
    
    let direction = connection.direction
    let edgeTiles = []
    
    for(let tile of connection.tiles){
        let col = tile.col
        let row = tile.row
        
        
        if (direction == "vertical"){
            //check if left adjacent tile is valid edgeTile 
            if(col > 0 && board.tiles[col - 1][row].state == "unknown"){
                edgeTiles.push(board.tiles[col - 1][row])
            }
            //check if right adjacent tile is valid edgeTile
            if(col < 8 && board.tiles[col + 1][row].state == "unknown"){
                edgeTiles.push(board.tiles[col + 1][row])
            }
        }
        
        if (direction == "horizontal"){
            //check if top adjacent tile is valid edgeTile 
            if(row > 0 && board.tiles[col][row - 1].state == "unknown"){
                edgeTiles.push(board.tiles[col][row - 1])
            }
            //check if bottom adjacent tile is valid edgeTile
            if(row < 6 && board.tiles[col][row + 1].state == "unknown"){
                edgeTiles.push(board.tiles[col][row + 1])
            }
        }
    }
    return edgeTiles
}


function getVerticalEdges(board, connection){
    
    let edgeTiles = []
    let startTile = connection.startTile
    let endTile = connection.endTile
    
    //check if tile above start tile is valid edge tile
    if(startTile.row > 0 && board.tiles[startTile.col][startTile.row - 1].state == "unknown" ){
        edgeTiles.push(board.tiles[startTile.col][startTile.row - 1])
    }
    
    //check if tile below endTile is valid EdgeTile
    if(endTile && endTile.row < 6 && board.tiles[endTile.col][endTile.row + 1].state == "unknown"){
        edgeTiles.push(board.tiles[endTile.col][endTile.row + 1])
    }
     //check if both ends of connection is not a valid edge tile
    if(edgeTiles.length == 0){
        edgeTiles = getAdjacentTilesOfConnection(board, connection)
    }
    
    return edgeTiles
}


function getHorizontalEdges(board, connection){
    
    let edgeTiles = []
    let startTile = connection.startTile
    let endTile = connection.endTile
    //check if tile left of start tile is valid edge tile
    if(startTile.col > 0 && board.tiles[startTile.col - 1][startTile.row].state == "unknown" ){
        edgeTiles.push(board.tiles[startTile.col - 1][startTile.row])
    }
    
    //check if tile right endTile is valid EdgeTile
    if(endTile && endTile.col < 8 && board.tiles[endTile.col + 1][endTile.row].state == "unknown"){
        edgeTiles.push(board.tiles[endTile.col + 1][endTile.row])
    }
     //check if both ends of connection is not a valid edge tile
    if(edgeTiles.length == 0){
        edgeTiles = getAdjacentTilesOfConnection(board, connection)
    }
    
    return edgeTiles
}


function getEdgesOfconnections(board, connectedHitTiles){
    
    let edgeTiles = []
    
    for(let connection of connectedHitTiles){
        
        //don't return edges if it belongs to connection 
        if(connection.length == 1){
            edgeTiles.push(...isSingleHitTile(board, connection.tiles[0]).filter(x => !edgeTiles.includes(x)) )
            connection.edgeTiles.push(...isSingleHitTile(board, connection.tiles[0]).filter(x => !edgeTiles.includes(x)) )
        }
        
        else if(connection.direction == "vertical"){
            edgeTiles.push(...getVerticalEdges(board, connection).filter(x => !edgeTiles.includes(x)) )
            connection.edgeTiles.push(...getVerticalEdges(board, connection).filter(x => !edgeTiles.includes(x)) )

        }
        
        else if(connection.direction == "horizontal"){
            edgeTiles.push(...getHorizontalEdges(board, connection).filter(x => !edgeTiles.includes(x)) )
            connection.edgeTiles.push(...getHorizontalEdges(board, connection).filter(x => !edgeTiles.includes(x)) )

        }
    }
    
    return edgeTiles
}

module.exports = getEdgesOfconnections