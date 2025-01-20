import { Particle } from './particle.js';

// Example: Sand particle subclass
export class Sand extends Particle {
    constructor(x, y) {
        super(x, y, { r: 237, g: 201, b: 175, a: 255 }, 'sand');
    }

    update(grid) {
        if (this.move(grid, this.x, this.y + 1)) return; // Try moving down
        // check density
        const fallDir = Math.random() < 0.5 ? -1 : 1;
        if (fallDir === -1 && this.move(grid, this.x - 1, this.y + 1)) return; // Try moving down-left
        if (fallDir === 1 && this.move(grid, this.x + 1, this.y + 1)) return; // Try moving down-right
    }
    
}