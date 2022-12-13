(function(){
var gameVars = {
    secretVar: Math.floor(Math.random() * (10 - 1) + 1),
    guessVar: undefined,
    totalGuesses: 0,
    guessHist: [],
    userName: undefined,
    users: {}
}

function populateUsers(){ // add keys/values from localStorage to users object proprty
    let i = 0
    while (i <localStorage.length){ 
        var localKey = localStorage.key(i)
        var localVal = localStorage.getItem(localKey)
        gameVars.users[localKey] = localVal
        i++
    }
}

function guess(){
    gameVars.guessVar = parseInt(prompt('Enter a number betweeen 1 and 10')) // takes in input from prompt and converts it to a number type
    while (gameVars.guessVar !== gameVars.guessVar || gameVars.guessVar > 10 || gameVars.guessVar < 1){ // checks for NaN or out of bounds input
        gameVars.guessVar = parseInt(prompt('Your guess was not a number between 1 and 10, please try again')) // requests a new input
    }
    gameVars.guessHist.push(gameVars.guessVar) // pushes current guess to history
}

function checkGuess(){
    if (gameVars.guessVar === gameVars.secretVar){ // if user guesses correctly
        victoryMessage() // displays appropriate victory message
        gameVars.users[gameVars.userName] = gameVars.totalGuesses // assigns their userName within the user obj to their score for this game
        localStorage.setItem(gameVars.userName, gameVars.totalGuesses) // sets userName and score to localStorage
        populateUsers()
    } else { // ternary, informs user if they are too high or low
        (gameVars.guessVar > gameVars.secretVar ? alert(`You\'re too high, ${gameVars.userName}`) : alert(`You\'re too low, ${gameVars.userName}`))
    }
}

function victoryMessage(){
    if(!gameVars.users[gameVars.userName]){ // if current userName has not played before
        alert(`You got it, ${gameVars.userName}! It took you ${gameVars.totalGuesses} guess(es).\n Your guesses were: ${gameVars.guessHist}`)
    } else if (gameVars.users[gameVars.userName] == gameVars.totalGuesses){ // if current user's totalGuesses ties their previous score
        alert(`You got it, ${gameVars.userName}! It took you ${gameVars.totalGuesses} guess(es). 
        \n You tied your previous result!
        \n Your guesses were: ${gameVars.guessHist}`)
    } else {
        (gameVars.users[gameVars.userName] < gameVars.totalGuesses ? // ternary to check current totalGuesses against previous for current user
            alert(`You got it, ${gameVars.userName}! It took you ${gameVars.totalGuesses} guess(es), 
            which is ${gameVars.totalGuesses - gameVars.users[gameVars.userName]} more than last time.
            \n Your guesses were: ${gameVars.guessHist}`):
            alert(`You got it, ${gameVars.userName}! It took you ${gameVars.totalGuesses} guess(es), 
            which is ${gameVars.users[gameVars.userName] - gameVars.totalGuesses} fewer than last time.
            \n Your guesses were: ${gameVars.guessHist}`))
    }
}

function keepGuessing(){ // main game function
    while (gameVars.guessVar !== gameVars.secretVar){ // runs while user's guess is incorrect
    guess() // aquires and validates user's guess input
    gameVars.totalGuesses++ // increments user's current score
    checkGuess() // checks user's guess input against the winning value
    }
}

function resetGame(){ // resets game values to default
    gameVars.secretVar = Math.floor(Math.random() * (10 - 1) + 1)
    gameVars.guessVar = undefined
    gameVars.totalGuesses = 0
    gameVars.guessHist = []
    gameVars.userName = prompt('What\'s your name?')
    populateUsers()
}

function playAgain(){
    resetGame()
    keepGuessing()
}
})()