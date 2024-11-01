const getRowFiles = require("./get-row-files.js")


function startConnection(file, connection, tile){

    //check if tile is start of connection 
    if(connection.length){
        connection.startTile = tile
    }
    connections.tiles.push(tile)
}


function endConnection(file, connection, connectedHitTiles){
    
    //check if connection exits
    if(connection.length == 0){
        return 
    }
    
    connectedHitTiles.push({...connection})
    connection.startTile = null
    connection.length = 0
    connection.tiles = []
}

function getConnectedHitTilesOfFile(file, direction){
    
    let connectedHitTiles = []
    let connection = {
        startTile: null,
        direction: direction,
        length: 0,
        tiles: []
    }
    
    for(let tile of file){
        if(tile.state == "hit"){
            startConnection(file, connection, tile)
        }
        else {
            endConnection(file, connection, connectedHitTiles)
        }
    }
    
    endConnection(file, connection, connectedHitTiles)
    return connectedHitTiles
}


function getVerticalConnectedHitTiles(board){

    let colFile = board.tiles
    
    for(let file of colFile){
        connectedHitTiles.push(...getConnectedHitTilesOfFile(file, "vertical") )
    }
    
    return connectedHitTiles
}

function getHorizontalConnectedHitTiles(board){
    
    let connectedHitTiles = []
    let rowFile = getRowFiles(board)
    
    for(let file of rowFile){
        connectedHitTiles.push(...getConnectedHitTilesOfFile(file, "horizontal") )
    }
    
    return connectedHitTiles
}


function getConnectedHitTiles(board){
    
    let connectedHitTiles = []
    
    connectedHitTiles.push(...getVerticalConnectedHitTiles(board) )
    connectedHitTiles.push(...getHorizontalConnectedHitTiles(board) )
    
    return connectedHitTiles
}