const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateSessionId() {
    let id = ""
    for(let x=0; x < 64; x++){
        id += letters[getRandomInt(0, 51)]
    }
    return id
}
module.exports = generateSessionId