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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let openCards = [];
let moveCounter = 0;
let matchCounter = 0;

function createCardHTML(card) {
    return  `<li class="card" data-card=${card}>
                <i class="fa ${card}"></i>
            </li>`
}

function startGame(cardList) {
    cardList = shuffle(cardList)
    cardsHTML = []
    for (const card of cardList) {
        cardsHTML.push(createCardHTML(card))
    };
    deck.innerHTML = cardsHTML.join('');
    moves.innerText = moveCounter;
    updateStars();
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function hideOpenCards(openCards) {
        setTimeout(function() {
            for (let card of openCards) {
                    card.classList.remove('open', 'show');
            };
        }, 500);
}

function isMatch(openCards){
    if (openCards[0].dataset.card == openCards[1].dataset.card) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        matchCounter += 1;
        if (matchCounter == 8) {
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
    let starsLeft = 3 - Math.floor(moveCounter / 10);
    for (let i = starsLeft; i < starsList.length; i++) {
        console.log(i);
        starsList[i].className = "fa fa-star-o";
    }
}

function displayCardSymbol(event) {
    const card = event.target; /* make sure to only capture card click here */
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        card.classList.add('open', 'show');
        openCards.push(card);
        if (openCards.length == 2) {
            incrementMoveCounter();
            updateStars();
            if (!isMatch(openCards)) {
                hideOpenCards(openCards)
            };
            openCards = [];
        };
    };
}

const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const moves = document.querySelector(".moves");
//restart.addEventListener('click', startGame);
deck.addEventListener('click', displayCardSymbol);
startGame(cardList);
