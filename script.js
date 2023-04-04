// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🥳 Correct Number!'
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 90;
// document.querySelector('.guess').value = 10;
// console.log(document.querySelector(".guess").value);
// !    DEFINING THE SOLUTION TO THE GAME
const secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector(".number").textContent = secretNumber;

// !CREATE VARIABLE TO HOLD THE SCORE
let score = 20;

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
