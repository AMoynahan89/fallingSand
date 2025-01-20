export class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: height }, () => Array(width).fill(null));
        this.activeParticles = [];
    }

    addParticle(particle) {
        if (!this.cells[particle.y][particle.x]) {
            this.cells[particle.y][particle.x] = particle;
            this.activeParticles.push(particle);
        }
    }

    updateParticles() {
        for (let i = this.activeParticles.length - 1; i >= 0; i--) {
            const particle = this.activeParticles[i];
            particle.update(this);

            // Clamp particle position to grid boundaries
            particle.x = Math.max(0, Math.min(particle.x, this.width - 1));
            particle.y = Math.max(0, Math.min(particle.y, this.height - 1));

            // Remove particles that are no longer active (e.g., hit the bottom)
            if (particle.y >= this.height - 1) {
                this.activeParticles.splice(i, 1);
            }
        }
    }
}
