import { Sand } from "./particles/sand.js";
import { Water } from "./particles/water.js";
import { Grid } from "./grid/grid.js";
import { Renderer } from "./renderer.js";  

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 2;

// Grid size
const GRID_WIDTH = canvas.width / CELL_SIZE;
const GRID_HEIGHT = canvas.height / CELL_SIZE;

// Create a 2D grid filled with null (empty cells)
// let grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));
// let activeParticles = []; // Track particles that are active

// Initialize grid and renderer
const grid = new Grid(GRID_WIDTH, GRID_HEIGHT);
const renderer = new Renderer(ctx, CELL_SIZE);
let selectedParticleType = 'sand'; // Default particle type

// State for mouse interactions
let mouseX = 0;
let mouseY = 0;

// Mouse events
let mouseIsDown = false;
canvas.addEventListener('mousedown', (event) => { 
    mouseIsDown = true;
    deployParticles();
    // updateMousePosition(event);
});
canvas.addEventListener('mouseup', () => { mouseIsDown = false });
canvas.addEventListener('mousemove', updateMousePosition);

// Update the mouse position
function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

// Deploy particles
function deployParticles() {
    if (!mouseIsDown) return;

    const x = Math.floor(mouseX / CELL_SIZE);
    const y = Math.floor(mouseY / CELL_SIZE);
    // // const inBounds = return x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT && !grid[y][x]
    // const inBounds = (x, y) => x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT && !grid[y][x];
    // if (inBounds) {
    //     const particle = new Particle(x, y, 'yellow');
    //     grid[y][x] = particle;
    // }

    if (selectedParticleType === 'sand') {
        grid.addParticle(new Sand(x, y));
    } else if (selectedParticleType === 'water') {
        grid.addParticle(new Water(x, y));
    }

    setTimeout(deployParticles, 5); // Repeat
}

// // Update particles (only the active ones)
// function updateParticles() {
//     for (let i = activeParticles.length - 1; i >= 0; i--) {
//         const particle = activeParticles[i];

//         // Call the particle's update method
//         particle.update(grid);

//         // If the particle reaches the bottom, remove it from the active list
//         if (particle.y >= GRID_HEIGHT - 1) {
//             activeParticles.splice(i, 1); // Remove particle from active list
//         }
//     }
// }


// Allow UI to set the selected particle type
function setParticleType(type) {
    selectedParticleType = type;
}
window.setParticleType = setParticleType; // Expose globally for HTML buttons


// Main game loop
function gameLoop() {
    grid.updateParticles(); // Update active particles
    renderer.draw(grid); // Draw particles
    requestAnimationFrame(gameLoop); // Loop
}

gameLoop();
