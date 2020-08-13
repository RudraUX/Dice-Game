/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

init()


//document.querySelector('#current-' + activePlayer).textContent = dice

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' 

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        //get Random number
        const dice = Math.floor(Math.random() * 6) + 1;
        //Show the result
        let domDice = document.querySelector('.dice')
        domDice.style.display = 'block'
        domDice.src = 'dice-' + dice + '.png'

        //selecting the current
        let getCurrent = document.querySelector('#current-' + activePlayer)
        if (dice !== 1) {
            //we are doing this because if we add dice directly it will perform string cohesion
            roundScore += dice
            getCurrent.textContent = roundScore

        } else {
            nextPlayer()
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore
        //update the score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]
        //switch player
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false
        } else {
            nextPlayer()
        }
    }
})


function nextPlayer() {
    //next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    //resetting the value when we will be switching players
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    //using toggle to switch between classes
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none'

}

//if we put init() in the 2nd parameter it wil become IIFE but we don't
//want that we want event listener to call the function
document.querySelector('.btn-new').addEventListener('click', init)

//initializing 
function init() {
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0
    gamePlaying = true

    document.querySelector('.dice').style.display = 'none'

    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'

    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')

    document.querySelector('.player-0-panel').classList.add('active')
}
