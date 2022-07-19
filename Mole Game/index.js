const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timer = document.querySelector('.timer');
const highScore = document.querySelector('.highscore');
const previousHighScore = localStorage.getItem("high_score") || 0;

let newHighScore = 0;
let prevIndex = -1;
let score = 0;
let inProgress = false;
let countDown = 10;

function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomHole() {
    let index = prevIndex;
    while (index == prevIndex) {
        index = Math.floor(Math.random() * holes.length);
    }
    prevIndex = index;
    return holes[index];
}
function incrementScore(e) {
    if (!e.isTrusted) return;
    score++;
    scoreBoard.textContent = score
}
function peep() {
    let time = getRandomTime(200, 1000);
    let hole = getRandomHole();
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (inProgress) peep();
    }, time);
}
function setTimer() {
    countDown--;
    timer.textContent = countDown + 's';
}
function startGame() {
    if (inProgress) return;
    prevIndex = -1;
    score = 0;
    inProgress = true;
    countDown = 11;

    scoreBoard.textContent = score;
    setTimer();//display countdown
    peep();
    let x = setInterval(setTimer, 1000)
    setTimeout(() => {
        inProgress = false;
        clearInterval(x);
        newHighScore = Math.max(previousHighScore, score);
        if (newHighScore != previousHighScore) {//save new high score
            localStorage.setItem("high_score", newHighScore);
            highScore.textContent = newHighScore;
            previousHighScore = newHighScore;
        }
    }, 10000);
}

highScore.textContent = previousHighScore;
moles.forEach(mole => mole.addEventListener('click', incrementScore));
