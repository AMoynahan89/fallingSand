// Particle class
export class Particle {
    constructor(x, y, size, color, type, gravity = 1) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = type;
        this.gravity = gravity;
    }

    // Helper method for checking if a position is within grid boundaries
    withinBounds(grid, x, y) {
        return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
    }

    // Helper method to check if a cell is empty
    cellIsEmpty(grid, x, y) {
        return !grid.cells[y]?.[x];
    }

    // Helper method to move the particle
    move(grid, newX, newY) {
        if (this.withinBounds(grid, newX, newY) && this.cellIsEmpty(grid, newX, newY)) {
            grid.cells[newY][newX] = this;
            grid.cells[this.y][this.x] = null;
            this.x = newX;
            this.y = newY;
            return true;
        }
        return false;
    }

    update(grid) {
        throw new Error('Update method must be implemented in subclass')
    }
}








// Optional: Maintain Batch Rendering
// If you still want to use batch rendering for performance but need particles to have different colors, you can group particles by color and draw them in batches per color.

// Example: Batch by Color
// javascript
// Copy
// Edit
// draw(grid) {
//     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

//     const colorBatches = {};

//     // Group particles by color
//     for (const particle of grid.activeParticles) {
//         if (!colorBatches[particle.color]) {
//             colorBatches[particle.color] = [];
//         }
//         colorBatches[particle.color].push(particle);
//     }

//     // Draw each batch with the same color
//     for (const [color, particles] of Object.entries(colorBatches)) {
//         this.ctx.fillStyle = color; // Set the color for the batch
//         this.ctx.beginPath(); // Start a new path for this color

//         for (const particle of particles) {
//             this.ctx.rect(
//                 particle.x * this.cellSize,
//                 particle.y * this.cellSize,
//                 this.cellSize,
//                 this.cellSize
//             );
//         }

//         this.ctx.fill(); // Fill all particles of this color in one call
//     }
// }
// How This Works:
// Particles are grouped into "batches" based on their color.
// Each color is drawn in a single batch for all particles of that color.
// Performance Tradeoffs
// Drawing Each Particle Separately:

// Easier to implement and maintain.
// Slightly less efficient due to more individual draw calls (fillRect() for every particle).
// Batching by Color:

// More efficient for rendering large numbers of particles.
// Slightly more complex code but avoids redundant state changes for fillStyle.