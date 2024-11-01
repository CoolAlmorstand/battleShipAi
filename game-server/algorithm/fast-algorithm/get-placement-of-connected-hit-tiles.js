
const isValidPlacement = require("../shared-functions/is-valid-placement.js")


function getPlacementOfConnectedHitTiles(board, connection, ship){
    
    let validPlacements = []
    let startTile = connection.startTile
   
    if(connection.direction == "horizontal"){
        let range = (startTile.col + 1) <  ( (ship - connection.length) + 1) ? startTile.col + 1 : ( (ship - connection.length) + 1)
        
        for(let offset = 0; offset  < range; offset++){
            if(isValidPlacement(startTile.col - offset, startTile.row, "horizontal", ship, board)){
                let placement = {
                    ship: ship,
                    tile: board.tiles[startTile.col - offset][startTile.row],
                    direction: "horizontal"
                }
                
                validPlacements.push(placement)
            }
        }
    }
    
    if(connection.direction == "vertical"){
        let range = (startTile.row + 1) <  ( (ship - connection.length) + 1) ? startTile.row + 1 : ( (ship - connection.length) + 1)
        
        for(let offset = 0; offset  < range; offset++){
            if(isValidPlacement(startTile.col, startTile.row - offset, "vertical", ship, board)){
            
                let placement = {
                    ship: ship,
                    tile: board.tiles[startTile.col][startTile.row - offset],
                    direction: "vertical"
                }
                validPlacements.push(placement)
            }
        }
    }
    
    return validPlacements
}

function reverseDirectionOfconnectionTiles(board, connection){
    
    let newConnections = []
    
    for(let tile of connection.tiles){
    
        let reversedConnection = {
            startTile: tile,
            endTile: tile,
            direction: connection.direction == "horizontal" ? "horizontal" : "vertical",
            length: 1,
        }
        newConnections.push(reversedConnection)
    }
    
    return newConnections
}


function getPlacementOnHitTiles(board, connectedHitTiles){
    
    let validPlacements = []
    
    for(let connection of connectedHitTiles){
    
        for(let ship of board.activeShips){
        
            //check if connections has no Valif egde on both ends of the connection
            if(connection.edgeTiles.length > 2){
                
                for(let reversedConnection of reverseDirectionOfconnectionTiles(board, connection) ){
                    validPlacements.push(...getPlacementOfConnectedHitTiles(board, reversedConnection, ship) )
                }
            }
            
            else if (ship > connection.length){
                
                validPlacements.push(...getPlacementOfConnectedHitTiles(board, connection, ship))
            }
        }
    }
    
    return validPlacements
}

module.exports = getPlacementOnHitTiles

