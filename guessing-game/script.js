// !    DEFINING THE SOLUTION TO THE GAME
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// !CREATE VARIABLE TO HOLD THE SCORE
let score = 20;
// !    HIGHSCORE VARIABLE
let highScore = 0;

const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};
//! ADD LISTENER TO CHECK BUTTON
document.querySelector(".check").addEventListener("click", function () {
  //! CONVERTING THE RETURNED GUESS TO A NUMBER
  const guess = Number(document.querySelector(".guess").value);

  //! GAME LOGIC
  // !  IF THERE IS NO GUESS
  if (!guess) {
    displayMessage("💩 You need to guess.");

    // !  IF THE GUESS IS CORRECT
  } else if (guess === secretNumber) {
    displayMessage("💩 You need to guess.");
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector("body").style.background = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
    // !      REFACTORED LOGIC
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? "👇 Ehh.. Try a lower number."
          : "👆 You need to get HIGHER."
      );
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("🥱 20 guesses??!! LOSER!");
      document.querySelector(".score").textContent = 0;
    }
  }
  // !    RESET TO INITIAL VALUES WHEN CLICKING AGAIN BUTTON
  // JONAS'S WAY
  document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    displayMessage(" Start guessing...");
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.background = "#222";
    document.querySelector(".number").style.width = "15rem";
  });
  // ! FIRST ATTEMPT
  // const playAgain = document.querySelector('.again');
  // playAgain.addEventListener('click', function() {
  //   window.location.reload();
  // })
});

// !  IF THE GUESS IS TOO HIGH
// } else if (guess > secretNumber) {
//   if (score > 1) {
//     document.querySelector(".message").textContent =
//         "👇 Ehh.. Try a lower number."
//     score--;
//     document.querySelector(".score").textContent = score;
//   } else {
//     document.querySelector(".message").textContent =
//       "🥱 I Can not believe you guessed 20 times and still lost!";
//     document.querySelector(".score").textContent = score * 0;
//   }
// !  IF THE GUESS IS TOO LOW
// } else if (guess < secretNumber) {
//   if (score > 1) {
//     document.querySelector(".message").textContent =
//       "👆 You need to get HIGHER.";
//     score--;
//     document.querySelector(".score").textContent = score;
// !  LOGIC FOR LOSING THE GAME WHEN SCORE REACHES 0
//   } else {
//     document.querySelector(".message").textContent =
//       "🥱 I Can not believe you guessed 20 times and still lost!";
//     document.querySelector(".score").textContent = score * 0;
//   }
// }
