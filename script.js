document.getElementById('start-btn').addEventListener('click', startGame);

let randomNumber;
let attemptsLeft = 6;
let maxAttempts = 6;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    randomNumber = Math.floor(Math.random() * 40) + 1;
    console.log('Random Number:', randomNumber);  
    attemptsLeft = maxAttempts;

    createGrid();
}

function createGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';  

    for (let i = 1; i <= 40; i++) {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = i;
        ball.addEventListener('click', () => handleGuess(i, ball));
        gridContainer.appendChild(ball);
    }
}

function handleGuess(number, ball) {
    if (attemptsLeft > 0) {
        if (number < randomNumber) {
            ball.classList.add('yellow');
            setMessage(`Number ${number} is too low!`);
        } else if (number > randomNumber) {
            ball.classList.add('red');
            setMessage(`Number ${number} is too high!`);
        } else {
            ball.classList.add('green');
            setMessage(`Congratulations! You guessed the correct number in ${maxAttempts - attemptsLeft + 1} attempts!`);
            disableAllButtons();
            document.getElementById('restart-btn').style.display = 'block';
        }

        attemptsLeft--;
        document.getElementById('attempts-left').textContent = attemptsLeft;

        if (attemptsLeft === 0 && number !== randomNumber) {
            setMessage(`You have no more attempts left. You lose! The correct number was ${randomNumber}.`);
            disableAllButtons();
            document.getElementById('restart-btn').style.display = 'block';
        }
    }
}

function setMessage(message) {
    document.getElementById('game-message').textContent = message;
}

function disableAllButtons() {
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => ball.style.pointerEvents = 'none');
}

// document.getElementById('restart-btn').addEventListener('click', () => {
//     document.getElementById('game-container').style.display = 'none';
//     document.getElementById('start-screen').style.display = 'block';
//     document.getElementById('game-message').textContent = '';
//     document.getElementById('restart-btn').style.display = 'none';
// });

document.getElementById('restart-btn').addEventListener('click', () => {
    window.location.reload(); 
});
