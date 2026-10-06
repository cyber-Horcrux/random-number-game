// ---------------------------------------------------------------
// Notes (kept from the original):
// Math.random() gives a float from 0 (inclusive) to 1 (exclusive).
// Math.floor() rounds down to an integer.
// Range formula: Math.floor(Math.random() * (max - min + 1)) + min
// ---------------------------------------------------------------

const result = document.getElementById("result");
const attemptsText = document.getElementById("attempts");
const userInput = document.getElementById("userInput");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");

const min = 1;
const max = 10;

let randomNum;
let attempts;
let gameOver;

function newRound() {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts = 0;
    gameOver = false;
    userInput.value = "";
    userInput.disabled = false;
    checkBtn.disabled = false;
    attemptsText.textContent = "Attempts: 0";
    userInput.focus();
}

function setResult(message, type) {
    result.textContent = message;
    result.className = type || "";
}

function checkGuess() {
    if (gameOver) return;

    const raw = userInput.value.trim();
    const userNumber = Number(raw);

    // Reject empty, decimals, and out-of-range values
    if (raw === "" || !Number.isInteger(userNumber) || userNumber < min || userNumber > max) {
        setResult(`Please enter a whole number between ${min} and ${max}.`, "warn");
        return;
    }

    attempts++;
    attemptsText.textContent = "Attempts: " + attempts;

    if (userNumber === randomNum) {
        setResult(`You guessed it in ${attempts} ${attempts === 1 ? "try" : "tries"}! The number was ${randomNum}. 🎉`, "win");
        gameOver = true;
        userInput.disabled = true;
        checkBtn.disabled = true;
    } else if (userNumber < randomNum) {
        setResult("Too low! Try a higher number.", "lose");
    } else {
        setResult("Too high! Try a lower number.", "lose");
    }

    userInput.select();
}

checkBtn.onclick = checkGuess;

// Press Enter to check
userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkGuess();
});

resetBtn.onclick = function () {
    newRound();
    setResult("Game reset! Guess the new number.");
};

newRound();
