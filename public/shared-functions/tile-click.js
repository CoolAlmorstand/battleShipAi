
import {selectTile, deselectTile} from "./select-tile.js"
import {updateMonitor} from "./update-monitor.js"

export function tileClick(button, board){

    if(button == board.selectedTile){
        deselectTile(button, board)
    }
    
    else{
        selectTile(button, board)
    }
    
    updateMonitor(button, board)
}