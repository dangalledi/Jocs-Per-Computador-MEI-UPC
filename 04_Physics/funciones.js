function getRandomInt(max) {
    return Math.random() * (max - 1) + 1;
}

function completeNumbre(number){
    return "0".repeat(6 - number.toString().length) + number.toString()
}