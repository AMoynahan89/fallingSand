export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(grid) {
        const imageData = this.ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
     
        // Iterate over active particles and set pixel data
        for (const particle of grid.activeParticles) {
            const size = particle.size;
            const startX = particle.x * size;
            const startY = particle.y * size;
    
            for (let dy = 0; dy < size; dy++) {
                for (let dx = 0; dx < size; dx++) {
                    const pixelX = startX + dx;
                    const pixelY = startY + dy;

                    if (pixelX >= 0 && pixelX < canvas.width && pixelY >= 0 && pixelY < canvas.height) {
                        const pixelIndex = (pixelY * canvas.width + pixelX) * 4;
                        
                        data[pixelIndex] = particle.color.r;     // Red
                        data[pixelIndex + 1] = particle.color.g; // Green
                        data[pixelIndex + 2] = particle.color.b; // Blue
                        data[pixelIndex + 3] = particle.color.a; // Alpha (255 for opaque)
                    }
                }
            }
        }
        
        this.ctx.putImageData(imageData, 0, 0); // Render the updated imageData
    }
}