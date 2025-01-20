export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(grid) {
        const imageData = this.ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
    
        // Iterate over active particles and set pixel data
        for (const particle of grid.activeParticles) {
            const pixelIndex = (particle.y * canvas.width + particle.x) * 4;
    
            // Set RGBA values
            data[pixelIndex] = particle.color.r;     // Red
            data[pixelIndex + 1] = particle.color.g; // Green
            data[pixelIndex + 2] = particle.color.b; // Blue
            data[pixelIndex + 3] = particle.color.a; // Alpha (255 for opaque)
        }
    
        this.ctx.putImageData(imageData, 0, 0); // Render the updated imageData
    }
}



// this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

// for (const particle of grid.activeParticles) {
//     this.ctx.fillStyle = particle.color;
//     this.ctx.fillRect(
//         particle.x * particle.size,
//         particle.y * particle.size,
//         particle.size,
//         particle.size
//     );
// }