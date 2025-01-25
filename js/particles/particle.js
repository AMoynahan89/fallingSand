import { ATOMIC_SIZE } from "../main.js";

export const particleTypes = [
    { pName: 'sand', type: 'sand'},
    { pName: 'water', type: 'water'},
    { pName: 'stone', type: 'stone'},
];

export class Particle {
    constructor(x, y, color, type, size = ATOMIC_SIZE, density = 1, gravity = 1) {
        this.x = x;
        this.y = y;
        this.color = {
            r: color.r || 0,
            g: color.g || 0,
            b: color.b || 0,
            a: color.a !== undefined ? color.a : 255,
        };
        this.type = type;
        this.size = size;
        this.density = density;
        this.gravity = gravity;
    }
    
    // Helper method to move the particle
    // See if grid.cells could hold the size x size block of the particle
    // which can then be used for grid manipulation
    move(grid, newX, newY) {
        const size = this.size;

        // Check if the particle's new size x size block is within bounds and empty
        for (let dy = 0; dy < size; dy++) {
            for (let dx = 0; dx < size; dx++) {
                const targetX = newX + dx;
                const targetY = newY + dy;

        
                if (this.withinBounds(grid, targetX, targetY)) {
                    const targetCell = grid.cells[targetY][targetX]
        
                    if (this.cellIsEmpty(grid, targetX, targetY)) {
                        grid.cells[targetY][targetX] = this;
                        grid.cells[this.y][this.x] = null;
                        this.x = targetX;
                        this.y = targetY;
                        return true;
                    }
                    
                    // Case 2: Target cell has a particle with lower density
                   else if (this.isMoreDense(grid, targetX, targetY)) {
                        // Swap particles
                        const currentX = this.x;
                        const currentY = this.y;
        
                        // Move the current particle into the target cell
                        grid.cells[targetY][targetX] = this;
                        this.x = targetX;
                        this.y = targetY;
        
                        // Move the target particle into the current particle's old position
                        targetCell.x = currentX;
                        targetCell.y = currentY;
                        grid.cells[currentY][currentX] = targetCell;
        
                        return true;
                    }
                    return false;
                }
            }
        }
        return false;
    }
    
    update(grid) {
        if (this.move(grid, this.x, this.y + 1)) return; // Try moving down

        this.specialBehavior(grid);
    }
    
    
    specialBehavior(grid) {        
        throw new Error('Update method must be implemented in subclass')
    }

    // Helper method for checking if a position is within grid boundaries
    withinBounds(grid, x, y) {
        return x >= 0 && x < grid.width && y >= 0 && y < grid.height;
    }
    
    // Helper method to check if a cell is empty
    cellIsEmpty(grid, x, y) {
        return !grid.cells[y]?.[x];
    }

    isMoreDense(grid, x, y) {
        const targetCell = grid.cells[y]?.[x];
        if (!targetCell) return false; // No target cell, so no density comparison
        return targetCell.density < this.density;
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

        
    //             if (!this.withinBounds(grid, targetX, targetY)) {
    //                 console.warn(`Out of bounds: targetX=${targetX}, targetY=${targetY}`);
    //                 return false; // Block movement if any part is out of bounds
    //             }
        
    //             const targetCell = grid.cells[targetY]?.[targetX];
    //             if (targetCell && !this.isMoreDense(grid, targetX, targetY)) {
    //                 return false; // Block movement if the cell is occupied by a denser particle
    //             }
    //         }
    //     }

    //     for (let dy = 0; dy < size; dy++) {
    //         for (let dx = 0; dx < size; dx++) {
    //             grid.cells[this.y + dy][this.x + dx] = null;
    //         }
    //     }

    //     for (let dy = 0; dy < size; dy++) {
    //         for (let dx = 0; dx < size; dx++) {
    //             grid.cells[newY + dy][newX + dx] = this;
    //         }
    //     }

    //     this.x = newX;
    //     this.y = newY;
    //     return true;
    // }