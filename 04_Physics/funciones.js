function getRandomInt(max) {
    return Math.floor(Math.random() * max );
}

function completeNumbre(number, max){
    return "0".repeat(max - number.toString().length) + number.toString()
}