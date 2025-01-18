const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Grid size
const GRID_WIDTH = 80;  // 10 pixels per cell
const GRID_HEIGHT = 60;
const CELL_SIZE = 10;

// Create a 2D grid filled with null (empty cells)
let grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

// State for mouse interactions
let mouseIsDown = false;
let mouseX = 0;
let mouseY = 0;

// Update the mouse position
function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

//Mouse events
canvas.addEventListener('mousedown', (event) => { 
    mouseIsDown = true;
    updateMousePosition(event);
    deployParticles() 
});
canvas.addEventListener('mouseup', () => { mouseIsDown = false });
canvas.addEventListener('mousemove', updateMousePosition);

// Deploy sand particles
function deployParticles() {
    if (!mouseIsDown) return;

    const x = Math.floor(mouseX / CELL_SIZE);
    const y = Math.floor(mouseY / CELL_SIZE);

    if (x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT) {
        grid[y][x] = { type: 'sand', color: 'yellow' };
    }

    setTimeout(deployParticles, 25); // Repeat every 50ms
}

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
            else { fallDiagonally(particle, x, y) }
        }
    }
}

function fallDiagonally(particle, x, y) {
    const fallDir = Math.random() < 0.5 ? 0 : 1; // 50% chance for 0 or 1
    if (fallDir === 0) {
        // Try to fall diagonally left
        if (
            y + 1 < GRID_HEIGHT &&
            x - 1 >= 0 &&
            !grid[y + 1][x - 1]
        ) {
            grid[y + 1][x - 1] = particle;
            grid[y][x] = null;
        }
    }
    else {
        // Try to fall diagonally right
        if (
            y + 1 < GRID_HEIGHT &&
            x + 1 < GRID_WIDTH &&
            !grid[y + 1][x + 1]
        ) {
            grid[y + 1][x + 1] = particle;
            grid[y][x] = null;
        }
    }
}

// Draw the grid
function drawGrid() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const cell = grid[y][x];
            ctx.fillStyle = cell ? cell.color : 'black';
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}


function gameLoop() {
    updateParticles(); // Update particle positions
    drawGrid();        // Redraw the grid
    requestAnimationFrame(gameLoop); // Loop
}

gameLoop();
