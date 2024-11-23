const board = document.getElementById('game-board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null); 
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6],            
];
function initializeBoard() {
  board.innerHTML = ''; 
  gameState.fill(null); 
  message.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}
function checkGameStatus() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      message.textContent = `Player ${currentPlayer} wins!`;
      board.querySelectorAll('.cell').forEach(cell => cell.classList.add('taken'));
      return true;
    }
  }

  if (!gameState.includes(null)) {
    message.textContent = 'It\'s a draw!';
    return true;
  }

  return false;
}
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] !== null || cell.classList.contains('taken')) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkGameStatus()) return;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  initializeBoard();
});

board.addEventListener('click', handleCellClick);
initializeBoard();
