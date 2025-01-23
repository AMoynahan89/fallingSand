import { Particle } from './particle.js';

export class Water extends Particle {
    constructor(x, y) {
        super(x, y, { r: 0, g: 191, b: 255, a: 255 }, 'water', 2, 0, 1);
    }

    update(grid) {
        if (this.move(grid, this.x, this.y + 1)) return; // Try moving down
        
        const fallDir = Math.random() < 0.5 ? -1 : 1;
        if (fallDir === -1 && this.move(grid, this.x - 1, this.y)) return; // Try moving left
        if (fallDir === 1 && this.move(grid, this.x + 1, this.y)) return; // Try moving right
    }
}