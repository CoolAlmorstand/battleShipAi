
import {board} from "./shared-variables.js"
import {getImageOfState} from "../../helper-functions.js"
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


hitButton.addEventListener("click", () => {
    let selectedTile = board.selectedTile
    if (selectedTile == null){
        return
    }
    let col = parseInt(selectedTile.id[0])
    let row = parseInt(selectedTile.id[1])
    if(board.tiles[col][row].state == "hit"){
        return
    }
    if(board.selectedTile == board.moveTile){
        board.moveTile = null
    }
    highlightUndoButton()
    

    board.moves.push({
        col: col,
        row: row,
        previousState: board.tiles[col][row].state,
        newState: "hit"
    })
    board.tiles[col][row].state = "hit"
    selectedTile.style.backgroundImage = "url(/shared-images/select-water-hit.png)"
})


missButton.addEventListener("click", () => {
    let selectedTile = board.selectedTile
    if (selectedTile == null){
        return
    }
    let col = parseInt(selectedTile.id[0])
    let row = parseInt(selectedTile.id[1])
    if(board.tiles[col][row].state == "miss"){
        return
    }
    if(board.selectedTile == board.moveTile){
        board.moveTile = null
    }
    highlightUndoButton()
    board.moves.push({
        col: col,
        row: row,
        previousState: board.tiles[col][row].state,
        newState: "miss"
    })
    board.tiles[col][row].state = "miss"
    selectedTile.style.backgroundImage = "url(/shared-images/select-water-empty.png)"
})

undoButton.addEventListener("click", () => {
    if(board.moves.length < 1){
        return
    }
    let lastAction = boards.moves[board.moves.length - 1]
    let col = lastAction.col
    let row = lastAction.row
    let previousState = lastAction.previousState
    let uiTile = document.getElementById(`${col}${row}`)

    board.tiles[col][row].state = previousState
    uiTile.style.backgroundImage = `url("/shared-images/select-${getImageOfState(board.tiles[col][row].state)}")`
    if(board.selectedTile != null){
        board.selectedTile.style.backgroundImage = `url("/shared-images/${getImageOfState(board.tiles[col][row].state)}")`
    }
    board.selectedTile = uiTile
    board.actions.pop()
    
    undoButton.textContent = `undo: ${sharedVar.actions.length}`
    if(board.moves.length < 1){
        undoButton.style.height = "83%"
        undoButton.style.opacity = "0.5"
    }
})