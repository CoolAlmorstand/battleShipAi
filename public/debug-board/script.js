import {board} from "./scripts/shared-variables.js"
import {generateBoardUi} from "../shared-functions/generate-board-ui.js"
import {generateBoard} from "../shared-functions/generate-board.js"
import "./scripts/action-buttons-functions.js"


function initializeGame(){

    fetch("/getGameId")
    .then(response => response.text())
    .then(data => {
        console.warn(`generate game id: ${data}`)
        sessionStorage.setItem("game-id", data)
    })
    
    const tileContainer = document.getElementById("top-div")
    const enterButton = document.getElementById("enter-button")
    generateBoard([2,3,3,4,5], board)
    generateBoardUi(tileContainer, board)
}


initializeGame()

