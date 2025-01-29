export class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: height }, () => Array(width).fill(null));
        this.activeParticles = [];
        this.inactiveParticles = [];
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

            // Remove particles that are no longer active (e.g., stopped moving)
            // if (!particle.isActive) {
            //     this.activeParticles.splice(i, 1);
            //     this.inactiveParticles.push(particle);
            // }
        }
    }
}