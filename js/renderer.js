export class Renderer {
    constructor(ctx, cellSize) {
        this.ctx = ctx;
        this.cellSize = cellSize;
    }

    draw(grid) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();

        for (const particle of grid.activeParticles) {
            this.ctx.fillStyle = particle.color;
            this.ctx.rect(
                particle.x * this.cellSize,
                particle.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        }

        this.ctx.fill();
    }
}



// // Render all particles using a single batch draw
// function drawGrid() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//     ctx.beginPath();

//     for (const particle of activeParticles) {
//         ctx.fillStyle = particle.color;
//         ctx.rect(particle.x * CELL_SIZE, particle.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
//     }

//     ctx.fill(); // Draw all particles in one call
// }