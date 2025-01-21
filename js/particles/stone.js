import { Particle } from './particle.js';

export class Stone extends Particle {
    constructor(x, y) {
        super(x, y, { r: 169, g: 169, b: 169, a: 255 }, 'stone');
    }

    update(grid) {
        return;
    }
}