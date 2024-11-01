const path = require('path')
const express = require('express');

const generateBoard = require("./game-server/game-functions/generate-board.js")
const sharedVar = require("./game-server/game-functions/shared-variables.js")
const getAiMove = require("./game-server/algorithm/get-ai-move.js")
const getId = require("./game-server/game-functions/generate-id.js")
const updateBoard = require("./game-server/game-functions/update-board.js")

const app = express()
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.text())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/main-manu/main-manu.html"))
})
app.get("/getGameId", (req, res) => {
    let gameId = getId()
    generateBoard(9, 7, [2,3,3,4,5], gameId)
    res.send(gameId)
})
app.post("/submitMove", (req, res) => {
    let board = updateBoard(req)
    let move = getAiMove(board)
    res.send(move)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});