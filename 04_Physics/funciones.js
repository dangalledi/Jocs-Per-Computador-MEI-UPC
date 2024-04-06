function getRandomInt(max) {
    return Math.floor(Math.random() * max );
}

function completeNumbre(number){
    return "0".repeat(6 - number.toString().length) + number.toString()
}