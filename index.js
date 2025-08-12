const board = document.getElementById("board");
let playerPositions = [0, 0];
let currentPlayer = 0;

// Snakes and Ladders mapping
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

// Create board numbers
function createBoard() {
    let cells = "";
    let number = 100;
    let reverse = true;
    for (let row = 0; row < 10; row++) {
        let rowCells = [];
        for (let col = 0; col < 10; col++) {
            rowCells.push(`<div class="cell" id="cell-${number}">${number}</div>`);
            number--;
        }
        if (reverse) {
            rowCells.reverse();
        }
        reverse = !reverse;
        cells += rowCells.join("");
    }
    board.innerHTML = cells;
}

// Roll Dice
function rollDice() {
    if (document.getElementById("winner").innerText !== "") return; // Game over check

    const dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = `🎲 Dice: ${dice}`;

    playerPositions[currentPlayer] += dice;

    if (playerPositions[currentPlayer] > 100) {
        playerPositions[currentPlayer] -= dice; // Can't move beyond 100
    }

    // Check for ladders
    if (ladders[playerPositions[currentPlayer]]) {
        playerPositions[currentPlayer] = ladders[playerPositions[currentPlayer]];
    }

    // Check for snakes
    if (snakes[playerPositions[currentPlayer]]) {
        playerPositions[currentPlayer] = snakes[playerPositions[currentPlayer]];
    }

    updateBoard();

    // Win check
    if (playerPositions[currentPlayer] === 100) {
        document.getElementById("winner").innerText = `🏆 Player ${currentPlayer + 1} Wins!`;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.getElementById("turn").innerText = `Player ${currentPlayer + 1}'s Turn`;
}

// Update board display
function updateBoard() {
    document.querySelectorAll(".player1, .player2").forEach(el => el.remove());

    playerPositions.forEach((pos, index) => {
        if (pos > 0) {
            const playerEl = document.createElement("div");
            playerEl.classList.add(index === 0 ? "player1" : "player2");
            document.getElementById(`cell-${pos}`).appendChild(playerEl);
        }
    });

    document.getElementById("p1-pos").innerText = `Player 1 Position: ${playerPositions[0]}`;
    document.getElementById("p2-pos").innerText = `Player 2 Position: ${playerPositions[1]}`;
}

// Initialize
createBoard();
updateBoard();
