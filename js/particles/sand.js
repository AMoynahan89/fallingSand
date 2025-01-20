import { Particle } from './particle.js';

// Example: Sand particle subclass
export class Sand extends Particle {
    constructor(x, y) {
        super(x, y, 2, 'yellow', 'sand');
    }

    update(grid) {
        if (this.move(grid, this.x, this.y + 1)) return; // Try moving down

        const fallDir = Math.random() < 0.5 ? -1 : 1;
        if (fallDir === -1 && this.move(grid, this.x - 1, this.y + 1)) return; // Try moving down-left
        if (fallDir === 1 && this.move(grid, this.x + 1, this.y + 1)) return; // Try moving down-right
        // const below = grid.cells[this.y + 1]?.[this.x];
        // if (this.y + 1 < grid.height && !below) {
        //     // Move down if possible
        //     grid.cells[this.y + 1][this.x] = this;
        //     grid.cells[this.y][this.x] = null;
        //     this.y++;
        // } else {
        //     // If moving down is not possible, try to fall diagonally
        //     const fallDir = Math.random() < 0.5 ? -1 : 1; // 50% chance for -1 (left) or 1 (right)
           
        //     // Check if we can move diagonally left
        //     if (fallDir === -1 && this.x - 1 >= 0 && !grid.cells[this.y + 1]?.[this.x - 1]) {
        //         grid.cells[this.y + 1][this.x - 1] = this;
        //         grid.cells[this.y][this.x] = null;
        //         this.x--;
        //         this.y++;
        //     }
        //     // Check if we can move diagonally right
        //     else if (fallDir === 1 && this.x + 1 < grid.width && !grid.cells[this.y + 1]?.[this.x + 1]) { 
        //         grid.cells[this.y + 1][this.x + 1] = this;
        //         grid.cells[this.y][this.x] = null;
        //         this.x++;
        //         this.y++;
        //     }
        // }
    }

}

// function updateParticles() {
//     const activeParticles = [];
//     for (let y = 0; y < GRID_HEIGHT; y++) {
//         for (let x = 0; x < GRID_WIDTH; x++) {
//             const particle = grid[y][x];
//             if (particle) activeParticles.push({ particle, x, y });
//         }
//     }

//     activeParticles.forEach(({ particle, x, y }) => {
//         if (y + 1 < GRID_HEIGHT && !grid[y + 1][x]) {
//             grid[y + 1][x] = particle;
//             grid[y][x] = null;
//         }
//     });
// }

