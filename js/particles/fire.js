import { Particle } from '../../firstDraft/js/particles/particle.js';

export class Fire extends Particle {
    constructor(x, y) {
        super(x, y, 'red', 'fire');
        this.life = 50; // Fire burns for 50 frames
    }

    update(grid) {
        this.life--;
        if (this.life <= 0) {
            grid[this.y][this.x] = null; // Fire burns out
            return;
        }

        // Spread fire to nearby particles
        const neighbors = [
            { x: this.x, y: this.y - 1 }, // Above
            { x: this.x, y: this.y + 1 }, // Below
            { x: this.x - 1, y: this.y }, // Left
            { x: this.x + 1, y: this.y }  // Right
        ];

        neighbors.forEach(({ x, y }) => {
            if (grid[y]?.[x]?.type === 'sand') {
                grid[y][x] = new Fire(x, y); // Turn sand into fire
            }
        });
    }
}
