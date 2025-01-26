import { Sand } from "./particles/sand.js";
import { Water } from "./particles/water.js";
import { Stone } from "./particles/stone.js";
import { ParticleManager } from "./particles/particleManager.js";

// Main configuration
const canvas = document.getElementById('canvas'); // Get the canvas element
const ctx = canvas.getContext('2d'); // Get the 2D rendering context
export const ATOMIC_SIZE = 2; // The size of a single particle in pixels (2x2 particle blocks)
export const CANVAS_WIDTH = canvas.width; // Canvas width in pixels
export const CANVAS_HEIGHT = canvas.height; // Canvas height in pixels

const particleTypes = [
    { pName: 'sand', type: 'sand'},
    { pName: 'water', type: 'water'},
    { pName: 'stone', type: 'stone'},
];


// Initialize the game
const particleManager = new ParticleManager(ctx);

// Handle particle types in toolbar
const toolbar = document.getElementById('toolbar');

particleTypes.forEach(({ pName, type}) => {
    const button = document.createElement('button');
    button.textContent = pName;
    button.onclick = () => setParticleType(type);
    button.classList.add('particle-button');
    toolbar.appendChild(button)
})

// Allow UI to set the selected particle type
let selectedParticleType = 'sand'; // Default particle type
function setParticleType(type) {
    selectedParticleType = type;
}
window.setParticleType = setParticleType;

// State for mouse interactions
let mouseX = 0;
let mouseY = 0;

// Mouse events
let mouseIsDown = false;
canvas.addEventListener('mousedown', (event) => { 
    mouseIsDown = true;
    deployParticles(event);
    updateMousePosition(event);
});
canvas.addEventListener('mouseup', () => { mouseIsDown = false });
canvas.addEventListener('mousemove', updateMousePosition);

// Update the mouse position
function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

// Add particles at the mouse position
function deployParticles(event) {
    if (!mouseIsDown) return; // Skip if the mouse is not pressed
    const x = Math.floor(mouseX / ATOMIC_SIZE); // Mouse X -> Grid X
    const y = Math.floor(mouseY / ATOMIC_SIZE);  // Mouse Y -> Grid Y

    // Create a particle at the mouse position based on the selected type
    if (selectedParticleType === 'sand') {
        particleManager.addParticle(new Sand(x, y, ATOMIC_SIZE));
    } else if (selectedParticleType === 'water') {
        particleManager.addParticle(new Water(x, y, ATOMIC_SIZE));
    } else if (selectedParticleType === 'stone') {
        particleManager.addParticle(new Stone(x, y, ATOMIC_SIZE))
    }
    setTimeout(deployParticles, 0); // Repeat
}


// Main game loop
function gameLoop() {
    particleManager.updateParticles(); // Update active particles
    particleManager.drawParticles(); // Draw all particles
    requestAnimationFrame(gameLoop); // Schedule the next frame
}

gameLoop();