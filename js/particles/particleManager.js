import { CANVAS_WIDTH, CANVAS_HEIGHT, ATOMIC_SIZE } from '../main.js';

export class ParticleManager {
    constructor(ctx) {
        this.ctx = ctx; // Store the canvas rendering context
        this.activeParticles = []; // List of currently active (moving) particles
        this.inactiveParticles = []; // List of inactive (stationary) particles
        // Initialize a 2D grid (spatial partitioning)
        this.spatialGrid = Array.from(
            { length: Math.ceil(CANVAS_HEIGHT / ATOMIC_SIZE) },
            () => Array.from({ length: Math.ceil(CANVAS_WIDTH / ATOMIC_SIZE) }, () => [])
        );
    }
    
    // Add a particle to the simulation
    addParticle(particle) {
        this.activeParticles.push(particle);
    }
    
    // Update all active particles
    updateParticles() {
        for (const particle of this.activeParticles) {
            console.log(particle);
            particle.applyForce(0, 0.1); // Apply gravity (0.1 force downward)
            particle.update(); // Update particle position
        }
    }

    // Find a particle at a specific grid position
    findParticleAt(x, y) {
        return this.activeParticles.find(
            (p) => Math.floor(p.x) === x && Math.floor(p.y) === y
        );
    }

    // Draw all particles on the canvas
    drawParticles() {
        // Create an empty image data buffer for the entire canvas
        const imageData = this.ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
        const data = imageData.data; // Access the raw pixel data array

        // Iterate over all particles and draw them onto the image data
        for (const particle of this.activeParticles) {
            const startX = Math.floor(particle.x * ATOMIC_SIZE); // Convert grid X to pixel X
            const startY = Math.floor(particle.y * ATOMIC_SIZE); // Convert grid Y to pixel Y

            // Fill a size x size block for the particle
            for (let dy = 0; dy < particle.size; dy++) {
                for (let dx = 0; dx < particle.size; dx++) {
                    const pixelX = startX + dx; // Pixel position X
                    const pixelY = startY + dy; // Pixel position Y

                    // Ensure the pixel is within the canvas boundaries
                    if (pixelX >= 0 && pixelX < CANVAS_WIDTH && pixelY >= 0 && pixelY < CANVAS_HEIGHT) {
                        const pixelIndex = (pixelY * CANVAS_WIDTH + pixelX) * 4; // Calculate index in RGBA array

                        // Set the particle's color in the image data buffer
                        data[pixelIndex] = particle.color.r;     // Red
                        data[pixelIndex + 1] = particle.color.g; // Green
                        data[pixelIndex + 2] = particle.color.b; // Blue
                        data[pixelIndex + 3] = particle.color.a; // Alpha (opacity)
                    }
                }
            }
        }

        // Render the updated image data to the canvas
        this.ctx.putImageData(imageData, 0, 0);
    }
    
}





// // Move a particle to the inactive list
// moveToInactive(particle) {
//     const index = this.activeParticles.indexOf(particle);
//     if (index !== -1) {
//         this.activeParticles.splice(index, 1); // Remove from active
//         this.inactiveParticles.push(particle); // Add to inactive
//     }
// }

// // Find a particle at a specific grid position
// findParticleAt(x, y) {
//     return this.activeParticles.find(
//         (p) => Math.floor(p.x) === x && Math.floor(p.y) === y
//     );
// }