import { Particle } from './particle.js';

export class Stone extends Particle {
    constructor(x, y) {
        super(x, y, { r: 128, g: 128, b: 128, a: 255 }, 'stone', 2, 1, 1);
    }

    update(grid) {
        return;
    }
}