import { Particle } from './particle.js';

// Example: Water particle subclass
export class Water extends Particle {
    constructor(x, y) {
        super(x, y, 'blue', 'water');
    }

    update(grid) {
        // Water behavior: Flow down or sideways
        const below = grid.cells[this.y + 1]?.[this.x];
        if (!below) {
            grid.cells[this.y + 1][this.x] = this;
            grid.cells[this.y][this.x] = null;
        } else if (!grid.cells[this.y + 1]?.[this.x - 1]) {
            grid.cells[this.y + 1][this.x - 1] = this;
            grid.cells[this.y][this.x] = null;
        } else if (!grid.cells[this.y + 1]?.[this.x + 1]) {
            grid.cells[this.y + 1][this.x + 1] = this;
            grid.cells[this.y][this.x] = null;
        }
        this.y++;
    }
}