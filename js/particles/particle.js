import { ATOMIC_SIZE } from '../main.js';

export class Particle {
    constructor(x, y, color, type, size = ATOMIC_SIZE, density = 1) {
        this.x = x; // X position (in grid units, not pixels)
        this.y = y; // Y position (in grid units, not pixels)
        this.vx = 0; // X-axis velocity
        this.vy = 0; // Y-axis velocity
        this.color = color; // Particle color as { r, g, b, a } (RGBA format)
        this.type = type; // Particle sub class
        this.size = size; // Particle size in pixels (e.g., 2x2)
        this.density = density; // Particle density (higher values sink)
        this.isActive = true; // Whether the particle is active (moving) or not
    }
    
    // Apply forces to the particle (e.g., gravity or wind)
    applyForce(fx, fy) {
        this.vx += fx; // Add horizontal force to velocity
        this.vy += fy; // Add vertical force to velocity
    }

    // Basic position update
    updatePosition() {
        this.x += this.vx;
        this.y += this.vy;

        // Apply friction-like effects
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
}





// // Helper method to move the particle
// // See if grid.cells could hold the size x size block of the particle
// // which can then be used for grid manipulation
// move(grid, newX, newY) {
//     const size = this.size;

//     // Check if the particle's new size x size block is within bounds and empty
//     for (let dy = 0; dy < size; dy++) {
//         for (let dx = 0; dx < size; dx++) {
//             const targetX = newX + dx;
//             const targetY = newY + dy;

    
//             if (this.withinBounds(grid, targetX, targetY)) {
//                 const targetCell = grid.cells[targetY][targetX]
    
//                 if (this.cellIsEmpty(grid, targetX, targetY)) {
//                     grid.cells[targetY][targetX] = this;
//                     grid.cells[this.y][this.x] = null;
//                     this.x = targetX;
//                     this.y = targetY;
//                     return true;
//                 }
                
//                 // Case 2: Target cell has a particle with lower density
//                else if (this.isMoreDense(grid, targetX, targetY)) {
//                     // Swap particles
//                     const currentX = this.x;
//                     const currentY = this.y;
    
//                     // Move the current particle into the target cell
//                     grid.cells[targetY][targetX] = this;
//                     this.x = targetX;
//                     this.y = targetY;
    
//                     // Move the target particle into the current particle's old position
//                     targetCell.x = currentX;
//                     targetCell.y = currentY;
//                     grid.cells[currentY][currentX] = targetCell;
    
//                     return true;
//                 }
//                 return false;
//             }
//         }
//     }
//     return false;
// }

// update(grid) {
//     if (this.move(grid, this.x, this.y + 1)) return; // Try moving down

//     this.specialBehavior(grid);
// }


// specialBehavior(grid) {        
//     throw new Error('Update method must be implemented in subclass')
// }

// // Helper method for checking if a position is within grid boundaries
// withinBounds(grid, x, y) {
//     return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
// }

// // Helper method to check if a cell is empty
// cellIsEmpty(grid, x, y) {
//     return !grid.cells[y]?.[x];
// }

// isMoreDense(grid, x, y) {
//     const targetCell = grid.cells[y]?.[x];
//     if (!targetCell) return false; // No target cell, so no density comparison
//     return targetCell.density < this.density;
// }