import { CANVAS_WIDTH, CANVAS_HEIGHT, ATOMIC_SIZE } from '../main.js';

import { Particle } from './particle.js';

// Example: Sand particle subclass
export class Sand extends Particle {
    constructor(x, y) {
        super(x, y, { r: 237, g: 201, b: 175, a: 255 }, 'sand');
    }

    update() {
        if (!this.isActive) return; // Skip update for inactive particles

        this.x += this.vx;
        this.y += this.vy;

        // Apply friction-like effect to reduce velocity gradually
        this.vx *= 0.98; // Simulates air resistance for horizontal movement
        this.vy *= 0.98; // Simulates air resistance for vertical movement

        // Boundary checks to keep the particle within the canvas
        if (this.x < 0 || this.x >= CANVAS_WIDTH / ATOMIC_SIZE - 1) {
            // this.vx *= -0.5; // Reverse horizontal velocity if hitting left/right boundary
            // this.x = Math.floor(this.x); // Snap to grid
        }
        if (this.y < 0 || this.y >= CANVAS_HEIGHT / ATOMIC_SIZE - 1) {
            // this.vy *= -0.5; // Reverse vertical velocity if hitting top/bottom boundary
            this.y = Math.floor(this.y); // Snap to grid
            this.vx = 0; // Stop horizontal motion  
            this.vy = 0; // Stop vertical motion
            this.isActive = false; // Mark particle as inactive
        }


        // // Check for a particle directly below (stacking behavior)
        // const belowY = Math.floor(this.y + 1);
        // const belowParticle = particleManager.findParticleAt(Math.floor(this.x), belowY);

        // if (belowParticle || belowY >= CANVAS_HEIGHT / ATOMIC_SIZE) {
        //     // Stop if there's a particle below or we hit the canvas bottom
        //     this.y = Math.floor(this.y); // Snap to grid
        //     this.vx = 0; // Stop horizontal motion
        //     this.vy = 0; // Stop vertical motion
        //     this.isActive = false; // Mark particle as inactive

        //     // Move this particle to the inactive array
        //     // particleManager.moveToInactive(this);
        // }
    }
}