const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        statusDisplay.textContent = "It's a Draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = "Player X's Turn";
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

// Initial setup
resetGame();
