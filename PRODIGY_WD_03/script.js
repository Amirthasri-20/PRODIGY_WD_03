const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X'; // Start with 'X'

// Function to handle clicks on the cells
function handleClick(e) {
    const cell = e.target;

    // Log the cell being clicked to debug
    console.log("Cell clicked", cell);

    // Check if the cell is already taken
    if (cell.textContent !== '') return;

    // Place current player's mark
    cell.textContent = currentPlayer;

    // Check for win or draw
    if (checkWin(currentPlayer)) {
        winnerMessage.textContent = ${currentPlayer} Wins!;
        message.classList.add('show');
        restartButton.style.display = 'block'; // Show the restart button
        disableBoard();
        return;
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        winnerMessage.textContent = 'It\'s a Draw!';
        message.classList.add('show');
        restartButton.style.display = 'block'; // Show the restart button
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to disable further clicks after the game ends
function disableBoard() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Function to check if the current player has won
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].textContent === player);
    });
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick); // Re-enable clicking
    });
    message.classList.remove('show');
    restartButton.style.display = 'none'; // Hide restart button
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
    console.log("Event listener attached to cell", cell); // Log when listener is attached
});
restartButton.addEventListener('click', restartGame);