const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Grid size
const GRID_WIDTH = 80;  // 10 pixels per cell
const GRID_HEIGHT = 60;
const CELL_SIZE = 10;

// Create a 2D grid filled with null (empty cells)
let grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

function updateParticles() {
    // Start from the bottom row to avoid overwriting falling particles
    for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const particle = grid[y][x];
            if (!particle) continue;
            
            // Try to fall straight down
            if (y + 1 < GRID_HEIGHT && !grid[y + 1][x]) {
                grid[y + 1][x] = particle;
                grid[y][x] = null;
            }
            // Try to fall diagonally left
            else if (
                y + 1 < GRID_HEIGHT &&
                x - 1 >= 0 &&
                !grid[y + 1][x - 1]
            ) {
                grid[y + 1][x - 1] = particle;
                grid[y][x] = null;
            }
            // Try to fall diagonally right
            else if (
                y + 1 < GRID_HEIGHT &&
                x + 1 < GRID_WIDTH &&
                !grid[y + 1][x + 1]
            ) {
                grid[y + 1][x + 1] = particle;
                grid[y][x] = null;
            }
        }
    }
}

// Helper: Draw the grid
function drawGrid() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const cell = grid[y][x];
            ctx.fillStyle = cell ? cell.color : 'black';
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const x = Math.floor(mouseX / CELL_SIZE);
    const y = Math.floor(mouseY / CELL_SIZE);

    // Add a sand particle at the clicked position
    if (x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT) {
        grid[y][x] = { type: 'sand', color: 'yellow' };
    }
});

function gameLoop() {
    updateParticles(); // Update particle positions
    drawGrid();        // Redraw the grid
    requestAnimationFrame(gameLoop); // Loop
}

gameLoop();
