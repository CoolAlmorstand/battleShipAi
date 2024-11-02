
const isValidPlacement = require("../shared-functions/is-valid-placement.js")
const generateResponse = require("../shared-functions/generate-response.js")
const getEdgesOfConnection = require("../shared-functions/get-edges-of-connection.js")
const getShipPlacementOnHitTiles = require("./get-placement-of-connected-hit-tiles.js")
const getConnectedHitTiles = require("../shared-functions/get-connected-hit-tiles.js")


function increaseScore(board, tile, ship, direction){
        
    let col = tile.col
    let row = tile.row
    
    for(let x = 0; x < ship; x++){
    
        if (direction == "horizontal"){
            board.tiles[col + x][row].score += 1
        }
        else {
            board.tiles[col][row + x].score += 1
        }
    }
}


function flattenScore(board, edgeTiles){

    if(edgeTiles.length == 0){
        return
    }
    
    for(let row of board.tiles){
        for(let tile of row){
            if(!edgeTiles.includes(tile)){
                tile.score = - 1
            }
        }
    }
}


function normalAlgo(board){

    for(let ship of board.activeShips){
        for(let col of board.tiles){
            for(let tile of col){
            
                if(isValidPlacement(tile.col, tile.row, "horizontal", ship, board) ) {
                    increaseScore(board, tile, ship, "horizontal")
                }
                
                if(isValidPlacement(tile.col, tile.row, "vertical", ship, board) ) {
                    increaseScore(board, tile, ship, "vertical")
                }
            }
        }
    }
}


function hasHitTileAlgo(board, connectedHitTiles){

    let edgeTiles = getEdgesOfConnection(board, connectedHitTiles)
    let validShipPlacements = getShipPlacementOnHitTiles(board, connectedHitTiles)
    
    for(let placement of validShipPlacements){
    
        increaseScore(board, placement.tile, placement.ship, placement.direction)
    }
        
    flattenScore(board, edgeTiles)
    return edgeTiles
}

function main(board){

    let connectedHitTiles = getConnectedHitTiles(board)
    let edgeTiles = []
    //check if theres a hitTile
    if(connectedHitTiles.length > 0){
        edgeTiles = hasHitTileAlgo(board, connectedHitTiles)
    }
    //run the algorithms normally 
    else{
        normalAlgo(board)
    }

    return generateResponse(board, edgeTiles)
}

module.exports = main