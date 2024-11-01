import {submitMove} from "../submit-moves.js"
import {board} from "./scripts/shared-variables.js"
import {generateBoardUi} from "../generate-board-ui.js"
import {generateBoard} from "../generate-board.js"
import "./scripts/action-buttons-functions.js"


function initializeGame(){
    fetch("/getGameId")
    .then(response => response.text())
    .then(data => {
        console.warn(`generate game id: ${data}`)
        sessionStorage.setItem("game-id", data)
    })
    
    let tilesContainer = document.getElementById("top-div")
    let enterButton = document.getElementById("enter-button")
    let ships = [2, 3, 3, 4, 5]
    
    generateBoard(ships, board)
    generateBoardUi(tilesContainer, board)
}

initializeGame()

enterButton.addEventListener("click", () =>
{
    let gameId = sessionStorage.getItem("game-id")
    submitMove(board, gameId)
})
