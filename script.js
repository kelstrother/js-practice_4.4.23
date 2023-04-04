// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🥳 Correct Number!'
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 90;
// document.querySelector('.guess').value = 10;
// console.log(document.querySelector(".guess").value);
// !    DEFINING THE SOLUTION TO THE GAME
let secretNumber = Math.trunc(Math.random() * 20) + 1;


// !CREATE VARIABLE TO HOLD THE SCORE
let score = 20;
// !    HIGHSCORE VARIABLE
let highScore = 0;
//! ADD LISTENER TO CHECK BUTTON
document.querySelector(".check").addEventListener("click", function () {
  //! CONVERTING THE RETURNED GUESS TO A NUMBER
  const guess = Number(document.querySelector(".guess").value);


  //! GAME LOGIC
  // !  IF THERE IS NO GUESS
  if (!guess) {
    document.querySelector(".message").textContent = "💩 You need to guess.";


    // !  IF THE GUESS IS CORRECT
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🤙 Most Excellent Guess!";
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.background = "#60b347";
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // !  IF THE GUESS IS TOO HIGH
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent =
        "👇 Ehh.. Try a lower number.";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent =
        "🥱 I Can not believe you guessed 20 times and still lost!";
         document.querySelector(".score").textContent = score * 0;
    }
    // !  IF THE GUESS IS TOO LOW
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent =
      "👆 You need to get HIGHER.";
      score--;
      document.querySelector(".score").textContent = score;
      // !  LOGIC FOR LOSING THE GAME WHEN SCORE REACHES 0
    } else {
      document.querySelector(".message").textContent =
        "🥱 I Can not believe you guessed 20 times and still lost!";
         document.querySelector(".score").textContent = score * 0;
    }
  }
});

// !    RESET TO INITIAL VALUES WHEN CLICKING AGAIN BUTTON
// MY WAY
// const playAgain = document.querySelector('.again');
// playAgain.addEventListener('click', function() {
//   window.location.reload();
// })

// JONAS'S WAY
document.querySelector('.again').addEventListener('click', function() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".message").textContent = " Start guessing..."
  document.querySelector(".score").textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector("body").style.background = "#222";
  document.querySelector(".number").style.width = "15rem";
})


