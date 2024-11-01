

const colText = document.getElementById("col-text-ui")
const rowText = document.getElementById("row-text-ui")
const scoreText = document.getElementById("score-text-ui")
const stateText = document.getElementById("state-text-ui")

export function updateMonitor(button, board){

    if(board.selectedTile == null) {
    
        colText.textContent = ""
        rowText.textContent = ""
        scoreText.textContent = ""
        stateText.textContent = ""
        return 
    }
    
    let col = parseInt(button.id[0])
    let row = parseInt(button.id[1])
    
    colText.textContent = `col: ${col}`
    rowText.textContent = `row: ${row}`
    scoreText.textContent = `score: ${board.tiles[col][row].score}`
    stateText.textContent = `state: ${board.tiles[col][row].state}`
}
