



const runTestButton = document.getElementById("enter-button")
const numberOfTestInputField= document.getElementById("number-of-test-input-field")
const progressText = document.getElementById("progress-text")
const avarageNumberOfShots = document.getElementById("avg-shots")
const avarageAccuracy = document.getElementById("avg-accuracy")

let testProgress = 0
let totalTest = 0
    

async function getTestId(){
    let response = await fetch("/getGameId")
    let data = await response.text()
    
    return data
}


async function updateProgress(){

    while (testProgress < totalTest){
        await new Promise(resolve => setTimeout(resolve, 10000))
        
        progress += await fetch("/get-test-progress", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: sessionStorage.getItem("test-id")
        })
    
async function startTest(){

    let testId = await getTestId()
    sessionStorage.setItem("test-id", testId)
    
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
    
runTestButton.addEventListener("click", () => {
    
    //check if input field has value
    let numberOfTest = numberOfTestInputField.value
    if(numberOfTest != null && numberOfTest.length > 0) ){
        startTest()
    }
}
    