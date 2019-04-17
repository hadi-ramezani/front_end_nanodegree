/*
 * Create a list that holds all of your cards
 */
cardList = ["fa-diamond", "fa-diamond",
            "fa-paper-plane-o", "fa-paper-plane-o",
            "fa-anchor", "fa-anchor",
            "fa-bolt", "fa-bolt",
            "fa-cube", "fa-cube",
            "fa-leaf", "fa-leaf",
            "fa-bicycle", "fa-bicycle",
            "fa-bomb", "fa-bomb"];

// Initialize some variables that multiple functions need to access
const numMovesToLoseStar = 10;
let openCards = [];
let moveCounter = 0;
let matchCounter = 0;
let starsLeft = 3;
let timerInterval = null;
let elapsedTime = 0;

/**
 * Return the html content of a card by adding appropriate data-card and class name
 */
function createCardHTML(card) {
    return  `<li class="card" data-card=${card}>
                <i class="fa ${card}"></i>
            </li>`
}

/**
 * Start a game by first shuffling a list of cards and then creating the html content for the card deck. Also, start the
 timer.
 */
function startGame(cardList) {
    cardList = shuffle(cardList)
    cardsHTML = []
    for (const card of cardList) {
        cardsHTML.push(createCardHTML(card))
    };
    deck.innerHTML = cardsHTML.join('');
    moves.innerText = moveCounter;
    stopTimer()
    startTimer()
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Hide open cards if here was not match.
 */
function hideOpenCards(openCards) {
        setTimeout(function() {
            for (let card of openCards) {
                    card.classList.remove('open', 'show');
            };
        }, 500);
}

function showModal(){
    const modal = document.getElementById('myModal');
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    const playAgain = document.querySelector(".play-again");
    const gameSummary = document.querySelector(".game-summary");
    gameSummary.innerText = `Your game summary:
                             ${moveCounter} moves
                             ${starsLeft} stars
                             ${elapsedTime} seconds`
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };

    playAgain.onclick = function(event) {
        console.log(event);
        window.location.reload();
    };
}

function isMatch(openCards){
    if (openCards[0].dataset.card == openCards[1].dataset.card) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchCounter += 1;
        if (matchCounter == 8) {
            stopTimer()
            showModal()
            console.log("You won");
        };
        return true;
    };
    return false;
}

function incrementMoveCounter() {
    moveCounter = moveCounter + 1;
    moves.innerText = moveCounter;
}

function updateStars() {
    const stars = document.querySelector('.stars')
    const starsList = stars.getElementsByTagName("i");
    starsLeft = 3 - Math.floor(moveCounter / numMovesToLoseStar);
    for (let i = starsLeft; i < starsList.length; i++) {
        starsList[i].className = "fa fa-star-o";
    }
}

function displayCardSymbol(event) {
    const card = event.target;
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        card.classList.add('open', 'show');
        openCards.push(card);
        if (openCards.length == 2) {
            incrementMoveCounter();
            if (moveCounter % numMovesToLoseStar == 0) {
                updateStars();
            }
            if (!isMatch(openCards)) {
                hideOpenCards(openCards)
            };
            openCards = [];
        };
    };
}

function startTimer() {
  stopTimer();
  elapsedTime = 0;
  timerInterval = setInterval(changeTimerValue, 1000);
}

function changeTimerValue() {
      document.querySelector(".time").innerHTML = ` ${++elapsedTime} sec`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const moves = document.querySelector(".moves");
startGame(cardList);
deck.addEventListener('click', displayCardSymbol);
restart.addEventListener('click', window.location.reload);
