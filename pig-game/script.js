// !    ELEMENT VARIABLES
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// !    STARTING CONDITIONS
score0El.textContent = "0";
score1El.textContent = "0";
diceEl.classList.add("hidden");
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// !                        ROLL THE DICE

btnRoll.addEventListener("click", function () {
  // !    CREATE RANDOM NUMBER FOR DICE
  const dice = Math.trunc(Math.random() * 6) + 1;

  // !    DISPLAY THE DICE
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  // !    CHECK FOR ROLLED 1
  if (dice !== 1) {
    // !    ADD DICE TO CURRENT SCORE
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // !    SWITCH TO NEXT PLAYER
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
});