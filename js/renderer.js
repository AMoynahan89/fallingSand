export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(grid) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (const particle of grid.activeParticles) {
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(
                particle.x * particle.size,
                particle.y * particle.size,
                particle.size,
                particle.size
            );
        }
    }
}