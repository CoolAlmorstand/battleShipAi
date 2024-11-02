export function getImageOfState(state) {

    switch (state) {
        case "unknown":
            return "water.png"
            
        case "miss":
            return "water-empty.png"
            
        case "hit":
            return "water-hit.png"
            
        case "sink":
            return"water-sink-tile.png"
            
        default:
            return "err"
    }
}


function highlightButton(){

    const buttons = document.getElementsByClassName("function-buttons")
    
    for(let button of buttons){
    
        if(button.id == "undo-button"){
            continue
        }
        
        button.style.height = "85%"
        button.style.opacity = "1"
    }
}

function removeHighlightButton(){

    const buttons = document.getElementsByClassName("function-buttons")
    
    for(let button of buttons){
    
        if(button.id == "undo-button"){
            continue
        }
        
        button.style.height = "83%"
        button.style.opacity = "0.5"
    }
}



function outlineTile(button, board){

    if(button == board.moveTile){
        button.style.backgroundImage = 'url("/shared-images/select-water-move-tile.png")'
        return
    }
    
    let col = parseInt(button.id[0])
    let row = parseInt(button.id[1])

    button.style.backgroundImage = `url("/shared-images/select-${getImageOfState(board.tiles[col][row].state)}")`
}


function removeTileOutline(button, board){
    
    if(button == board.moveTile){
        button.style.backgroundImage = 'url("/shared-images/water-move-tile.png")'
        return
    }
    
    let col = parseInt(button.id[0])
    let row = parseInt(button.id[1])

    button.style.backgroundImage = `url("/shared-images/${getImageOfState(board.tiles[col][row].state)}")`
}


export function selectTile(button, board){
    
    if(board.selectedTile != null){
        removeTileOutline(board.selectedTile, board)
    }
    
    outlineTile(button, board)
    board.selectedTile = button

    if(board.isDebugBoard){
        highlightButton()
    }
}


export function deselectTile(button, board){

    removeTileOutline(button, board)
    board.selectedTile = null
    if(board.isDebugBoard){
        removeHighlightButton()
    }
}