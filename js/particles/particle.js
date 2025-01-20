// Particle class
export class Particle {
    constructor(x, y, color, type, gravity = 1) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
        this.gravity = gravity;
    }

    update(grid) {
        throw new Error('Update method must be implemented in subclass')
    }
}