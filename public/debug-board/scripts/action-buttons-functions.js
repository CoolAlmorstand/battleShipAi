import {submitMove} from "../../shared-functions/submit-moves.js"
import {board} from "./shared-variables.js"
import {selectTile, getImageOfState} from "../../shared-functions/select-tile.js"

const hitButton = document.getElementById("hit-button")
const missButton = document.getElementById("miss-button")
const sinkButton = document.getElementById("sink-button")
const undoButton = document.getElementById("undo-button")
const enterButton = document.getElementById("enter-button")


function highlightUndoButton(){

    undoButton.style.height = "85%"
    undoButton.style.opacity = "1"
    undoButton.textContent = `undo: ${board.moves.length}`
}


function updateTileState(state){

    let selectedTile = board.selectedTile
    
    let col = parseInt(selectedTile.id[0])
    let row =  parseInt(selectedTile.id[1])
    
    let previousState = board.tiles[col][row].state

    if(state == previousState){
        return 
    }
    
    //check remove move tile if action is performed 
    if(board.selectedTile == board.moveTile && board.moveTile != null){
        board.moveTile = null
    }
    
    board.moves.push({
        col: col,
        row: row,
        previousState: previousState,
        newState: state
    })
    
    highlightUndoButton()
    
    board.tiles[col][row].state = state
    selectedTile.style.backgroundImage = `url("/shared-images/select-${getImageOfState(board.tiles[col][row].state)}")`
    
}


hitButton.addEventListener("click", () => {

    if(board.selectedTile != null){
        updateTileState("hit")
    }
})


missButton.addEventListener("click", () => {

    if(board.selectedTile != null){
        updateTileState("miss")
    }
})


undoButton.addEventListener("click", () => {

    if(board.moves.length < 1){
        return
    }

    let lastAction = board.moves[board.moves.length - 1]
    let col = lastAction.col
    let row = lastAction.row
    let previousState = lastAction.previousState
    let tileButton = document.getElementById(`${col}${row}`)

    board.tiles[col][row].state = previousState
    
    selectTile(tileButton, board)
    board.moves.pop()
    
    undoButton.textContent = `undo: ${board.moves.length}`
    
    if(board.moves.length < 1){
        undoButton.style.height = "83%"
        undoButton.style.opacity = "0.5"
    }
})

sinkButton.addEventListener("click", () => {
    
    if(board.selectedTile != null) {
        updateTileState("sink")
    }
})


enterButton.addEventListener("click", () => {

    if(board.moveTile != null){
        board.moveTile.style.backgroundImage = 'url("shared-images/water.png")'
    }
    
    let gameId = sessionStorage.getItem("game-id")
    submitMove(board, gameId, undoButton)
})