import { ATOMIC_SIZE } from "../main.js";

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

    // Helper method to move the particle
    move(grid, newX, newY) {
        if (this.withinBounds(grid, newX, newY)) {
            const targetCell = grid.cells[newY][newX]

            if (this.cellIsEmpty(grid, newX, newY)) {
                grid.cells[newY][newX] = this;
                grid.cells[this.y][this.x] = null;
                this.x = newX;
                this.y = newY;
                return true;
            }
            
            // Case 2: Target cell has a particle with lower density
           else if (this.isMoreDense(grid, newX, newY)) {
                // Swap particles
                const currentX = this.x;
                const currentY = this.y;

                // Move the current particle into the target cell
                grid.cells[newY][newX] = this;
                this.x = newX;
                this.y = newY;

                // Move the target particle into the current particle's old position
                targetCell.x = currentX;
                targetCell.y = currentY;
                grid.cells[currentY][currentX] = targetCell;

                return true;
            }
            return false;
        }
        return false;
    }

    update(grid) {
        throw new Error('Update method must be implemented in subclass')
    }
}