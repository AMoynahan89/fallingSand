import { Sand } from "./particles/sand.js";
import { Water } from "./particles/water.js";
import { Stone } from "./particles/stone.js";
import { Grid } from "./grid/grid.js";
import { Renderer } from "./renderer.js";
import { particleTypes } from "./particles/particle.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
export const ATOMIC_SIZE = 2;

// Grid size
const GRID_WIDTH = canvas.width / ATOMIC_SIZE;
const GRID_HEIGHT = canvas.height / ATOMIC_SIZE;

// Initialize grid and renderer
const grid = new Grid(GRID_WIDTH, GRID_HEIGHT);
const renderer = new Renderer(ctx);

// Handle particle types in toolbar
const toolbar = document.getElementById('toolbar');

particleTypes.forEach(({ pName, type}) => {
    const button = document.createElement('button');
    button.textContent = pName;
    button.onclick = () => setParticleType(type);
    button.classList.add('particle-button');
    toolbar.appendChild(button)
})

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

    const x = Math.floor(mouseX / ATOMIC_SIZE);
    const y = Math.floor(mouseY / ATOMIC_SIZE);

    if (selectedParticleType === 'sand') {
        grid.addParticle(new Sand(x, y));
    } else if (selectedParticleType === 'water') {
        grid.addParticle(new Water(x, y));
    } else if (selectedParticleType === 'stone') {
        grid.addParticle(new Stone(x, y))
    }

    setTimeout(deployParticles, 1); // Repeat
}

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