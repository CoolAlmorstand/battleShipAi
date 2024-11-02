
import {tileClick} from "./tile-click.js"


async function flashSelectOutile(button){

    for (let x = 0; x < 3; x++) {
        button.style.backgroundImage = "url('/shared-images/water-move-tile.png')"
        await new Promise(resolve => setTimeout(resolve, 250))
        button.style.backgroundImage = "url('/shared-images/select-water-move-tile.png')"
        await new Promise(resolve => setTimeout(resolve, 250))
    }
}

function removeSinkTiles(board){

    for(let row of board.tiles){
        for(let tile of row){
        
            if(tile.state == "sink"){
                tile.state = "miss"
            }
        }
    }
}

function setAsMoveTile(response, board){

    let {col, row} = response.higestScoreTile
    let tileButton = document.getElementById(`${col}${row}`)
    
    board.moveTile = tileButton
    tileClick(tileButton, board)
    flashSelectOutile(tileButton)
}
    

function highlightEdgeTiles(edgeTiles){
    
    for(let tile of edgeTiles){
    
        let col = tile.col
        let row = tile.row
        let tileButton = document.getElementById(`${col}${row}`)
        
        tileButton.style.backgroundImage = 'url("/shared-images/water-edge-tile.png")'
    }
}

function processResponse(response, board, undoButton){
    
    board.moves = []
    removeSinkTiles(board)
    
    undoButton.textContent = "undo"
    undoButton.style.height = "83%"
    undoButton.style.opacity = "0.5"

    response = JSON.parse(response)
    
    for(let col = 0; col < 9; col++){
        for(let row = 0; row < 7; row++){
            board.tiles[col][row].score = response.tilesScore[col][row].score
        }
    }
    
    board.edgeTiles = response.edgeTiles
    //highlightEdgeTiles(board.edgeTiles)
    setAsMoveTile(response, board)
}


function pakageMoves(moves){

    let moveData = {
        gameId: sessionStorage.getItem("game-id"),
        moves: {}
    }
    
    for(let move of moves){
    
        let col = move.col
        let row = move.row
        moveData.moves[`${col}${row}`] = move.newState
    }
    return moveData
}


export function submitMove(board, gameId, undoButton){

    let moveData = JSON.stringify(pakageMoves(board.moves))
    
    fetch('/submitMove', {
        method: 'POST',
        headers: {'Content-Type': 'text/plain' },
        body: moveData
    })
    .then(response => response.text())
    .then(responseData => {
        processResponse(responseData, board, undoButton)
    })
    .catch((error) => 
    {
        console.error('Error:', error);
    });
}