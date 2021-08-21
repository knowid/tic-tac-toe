// winning conditions, classes declarations and UI elements
const x      = 'x',
      circle = 'circle',
      wins   = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    cellEl   = document.querySelectorAll("[data-c]"),
    text     = document.querySelector(".text"),
    modal    = document.getElementById("modal"),
    rePlay   = document.getElementById("rePlay");

// circle's turn
let circleTurn;

// starting the game
init();

// Event listener for play again button
rePlay.addEventListener("click", reStart);

// init game
function init() {
    // make circle's turn false at the beginning
    circleTurn = false;

    // add event listeners to the cells
    cellEl.forEach( cell => cell.addEventListener("click", eachCellClick, { once: true }) );
}

// each cell click handler function
function eachCellClick(e) {
    // targeted cell (click)
    const cell = e.target;

    // check for the turn and assign the class
    curClass = circleTurn ? circle : x;

    // place the related circle or X icon on the game board depending on the click
    placeIcon(cell, curClass);

    // check for who wins the game
    if(hasWon(curClass)) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    }

    // swap the turns between players
    swapPlayers();
}

// placeMark
function placeIcon(cell, classN) {
    cell.classList.add(classN);
}

// function that checks who wins the game
function hasWon(curClass) {
    return wins.some( combination => combination.every(index => cellEl[index].classList.contains(curClass)) );
}

// endGame
function endGame(draw) {
    // checks if it's draw and sets the text to the modal depending on the draw or wins
    if(draw) {
        text.innerText = 'Draw!!!';
    } else {
        text.innerText = `${circleTurn ? 'O\'s wins' : 'X\'s wins'}`;
    }

    // show the modal with game status
    modal.classList.add('show');
}

// Draw
function checkDraw() { /* checks whether if the game is draw */
    ce = Array.from(cellEl)
    return ce.every(cell => cell.classList.contains(x) || cell.classList.contains(circle) );
}

// swap the turns
function swapPlayers() {
    circleTurn = !circleTurn;
}

// restarts everything, by reloading the page
function reStart() {
    window.location.reload();
}