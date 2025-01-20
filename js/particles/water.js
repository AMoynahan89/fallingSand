import { Particle } from './particle.js';

export class Water extends Particle {
    constructor(x, y) {
        super(x, y, { r: 0, g: 191, b: 255, a: 255 }, 'water', undefined, undefined, 0);
    }

    update(grid) {
        if (this.move(grid, this.x, this.y + 1)) return; // Try moving down
        if (this.move(grid, this.x - 1, this.y)) return; // Try moving left
        if (this.move(grid, this.x + 1, this.y)) return; // Try moving right
    }
}