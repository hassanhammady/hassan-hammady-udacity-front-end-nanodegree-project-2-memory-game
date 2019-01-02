            /* ----------------------------- used Variables  --------------------------------- */

document.addEventListener("DOMContentLoaded", initGame, true);          // Init game on DOM ready

document.querySelector(".restart").addEventListener("click", function() {           // Listen on restart button to restart the game
   initGame();
}, true);

const stars = document.querySelectorAll(".fa-star");        // Stars containers

let finalStars = 3;                         // Variable to store final stars

// Main & Modal containers
const mainContainer = document.querySelector(".container"); 
const modalContainer = document.querySelector(".modal");

const moves = document.querySelector(".moves");         // Selects moves span

const deck = document.getElementById("deck");       // Game deck

let cardList = null;            // Temporal opened card

let matchesCounter = 0;            // To count matched cards

let seconds = 0, minutes = 0, hours = 0, t;     // Variables for timer purposes

let spanTimer = document.querySelector(".timer");      // Span to show timer

       /*   ---------------------------------------------------------------------------------------------------------   */

                /* ---------------------- resets deck to start a new deck-----------------*/

function resetGame() {
	clearTimeout(t);                           // Clear timer and reset it 
	spanTimer.textContent = "00:00:00";
	seconds = 0, minutes = 0, hours = 0;
	timer();
	mainContainer.classList.remove("hidden");          // Show main container and hides modal
	modalContainer.classList.add("hidden");
	moves.textContent = "0";                       // Clear moves text
    
    // Reset stars
	stars[1].classList.add("fa-star"); 
	stars[1].classList.remove("fa-star-o");
	stars[2].classList.add("fa-star");
	stars[2].classList.remove("fa-star-o");
    stars[0].classList.add("fa-star"); 
	stars[0].classList.remove("fa-star-o");


	cardList = null;                               // Temporal card set to null to be able to compare again
	matchesCounter = 0;                            // Reset matches counter
}

                            /*---------------------- Initializes a new game ---------------------------------*/

function initGame() {
	resetGame();                                               // Clears board and variables to start a new game
	const cards = deck.querySelectorAll(".card");              // Gets HTML items
	const suffledCards = shuffle(Array.from(cards));           // Suffles the cards object to generate new deck
	deck.innerText = '';                                       // Clear previews deck

	// Iterates over suffledCards to create the new deck
	for (let i = 0; i < suffledCards.length; i++) {
		let card = suffledCards[i];
		card.classList.remove("show", "open", "match", "rubberBand", "shake");
		card.addEventListener("click", displayCard, true);
		deck.appendChild(card);
	}
}

                            /* ------------------------- timer function to start timer -------------------------------*/

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    spanTimer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

                        /*------------------------- To shuffle cards -------------------------- */

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
                    /*------------ Function  to show cards content and check equality of cards ------------*/

function displayCard (evt) {
    
    let card = evt.target                                           //the clicked card
    card.classList.add('open','show')                               // add open & show classes to the card
    if (!cardList) {                                                //check if the open card list contain acard 
        cardList = card ;
    } else {
    	deck.classList.add('disabled');                            // add disable class to prevent more than 2 cards to open 
        increaseMoveCounter()                                      // increase move counter 

        // check equality
        
        if (cardList.classList[1] === card.classList[1]) {         
            setTimeout(function() {lockMatch(card)},100)
        } else {
            cardList.classList.add("wrong", "shake");
            card.classList.add("wrong", "shake");
            setTimeout(function() {noMatch(card)},500)
    }
 }
}
                /*---------------------------------------- increase move counter function -------------------------------------------------*/

function increaseMoveCounter(){
    const currentMoves = +moves.textContent;
    moves.textContent = currentMoves + 1;
    toggleStars(currentMoves);

}
                /*------------------------------ lock card function in case of cards was match ------------------------------ */

function lockMatch(card){
    cardList.classList.add("match", "rubberBand");
    card.classList.add("match","rubberBand");
    cardList.classList.remove("open", "show");
    card.classList.remove("open", "show");
    deck.classList.remove("disabled");
    cardList = null;
    matchesCounter += 1;
    if (matchesCounter === 8) {
        showResult();
    }
}

            /*---------------------------- no match function in case of cards are not the same -----------------------------*/

function noMatch(card) {
        cardList.classList.remove("open", "show", "wrong", "shake");
        card.classList.remove("open", "show", "wrong", "shake");
        cardList = null
        deck.classList.remove("disabled");
}
                /*------------------------------- toggle star function ----------------------------------------------------- */ 

function toggleStars(x) {
	if (x === 12) {
		stars[2].classList.remove("fa-star");
		stars[2].classList.add("fa-star-o");
		finalStars = 2;
	} else if (x === 16) {
		stars[1].classList.remove("fa-star");
		stars[1].classList.add("fa-star-o");
		finalStars = 1;
	} else if (x ===20 ){
        stars[0].classList.remove("fa-star");
        stars[0].classList.add("fa-star-o");
        finalStars = 0;

    }
}
                /*-------------------------------------  in case of Won  ----------------------------------------------*/

                                /*----------------- show result function---------------------------- */

function showResult() {
	// Selects moves and time
	const finalMoves = moves.textContent;
	const finalTime = spanTimer.textContent;
    
	const finalMovesSpan = document.getElementById("finalMoves");          // Final moves span

	const finalStarsSpan = document.getElementById("finalStars");         // Final stars span

	const finalTimeSpan = document.getElementById("finalTime");          // Final time spam

	// Set results
    
	finalMovesSpan.textContent = finalMoves;
	finalStarsSpan.textContent = finalStars;
	finalTimeSpan.textContent = finalTime;

	clearTimeout(t);                     // Stops timer

	// Hide main container and show modal
    
	mainContainer.classList.add("hidden");
	modalContainer.classList.remove("hidden");
}
