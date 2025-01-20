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