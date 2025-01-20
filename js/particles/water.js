import { Particle } from './particle.js';

export class Water extends Particle {
    constructor(x, y) {
        super(x, y, 2, 'blue', 'water');
    }

    update(grid) {
        if (this.move(grid, this.x, this.y + 1)) return; // Try moving down
        if (this.move(grid, this.x - 1, this.y)) return; // Try moving left
        if (this.move(grid, this.x + 1, this.y)) return; // Try moving right
    }
}
