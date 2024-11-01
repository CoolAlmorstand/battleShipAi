import {tileClick} from "./tile-click.js"

function addTile(tileContainer, board, col, row){

    let button = document.createElement("button")

    button.id = `${col}${row}`
    button.classList.add("tiles-button")
    button.addEventListener("click", tileClick.bind(null, button, board))

    tileContainer.append(button)
}

export function generateBoardUi(tileContainer, board){
    for(let row = 0; row < 7; row++){
        for(let col = 0; col < 9; col++){
            addTile(tileContainer, board, col, row)
        }
    }
}


