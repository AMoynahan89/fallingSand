// Particles
export class Particle {
    constructor(x, y, color, type, density = 1) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.color = {
            r: color.r || 0,
            g: color.g || 0,
            b: color.b || 0,
            a: color.a !== undefined ? color.a : 255,
        };
        this.type = type;
        this.density = density;
    }

    update() {
        throw new Error('Subclasses must implement this method');
    }
}

export class Stone extends Particle {
    constructor(x, y) {
        super(x, y, { r: 128, g: 128, b: 128, a: 255 }, 'stone', 2, 1, 1);
    }

    update() {
        return;
    }
}

// export class Sand extends Particle {
//     constructor(x, y) {
//         super(x, y, { r: 237, g: 201, b: 175, a: 255 }, 'sand');
//     }

//     update() {
//         if (this.move(this.x, this.y + 1)) return; // Try moving down
//         const fallDir = Math.random() < 0.5 ? -1 : 1;
//         if (fallDir === -1 && this.move(this.x - 1, this.y + 1)) return; // Try moving down-left
//         if (fallDir === 1 && this.move(this.x + 1, this.y + 1)) return; // Try moving down-right
//     }
// }

// export class Water extends Particle {
//     constructor(x, y) {
//         super(x, y, { r: 0, g: 191, b: 255, a: 255 }, 'water', 2, 0, 1);
//     }

//     update() {
//         if (this.move(this.x, this.y + 1)) return; // Try moving down
        
//         const fallDir = Math.random() < 0.5 ? -1 : 1;
//         if (fallDir === -1 && this.move(this.x - 1, this.y)) return; // Try moving left
//         if (fallDir === 1 && this.move(this.x + 1, this.y)) return; // Try moving right
//     }
// }

export const particleTypes = [
    { pName: 'sand', type: 'sand'},
    { pName: 'water', type: 'water'},
    { pName: 'stone', type: 'stone'},
];

// Grid
const HEIGHT = 600;
const WIDTH = 800;

const canvas = document.getElementById('canvas');   
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(WIDTH, HEIGHT);

// State for mouse interactions
let mouseX = 0;
let mouseY = 0;
let mouseIsDown = false;

// Mouse events
canvas.addEventListener('mousedown', (event) => {
    mouseIsDown = true;
    drawParticle(event);
});
canvas.addEventListener('mouseup', () => { mouseIsDown = false });
canvas.addEventListener('mousemove', updateMousePosition);

function updateMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX  = Math.floor(event.clientX - rect.left);
    mouseY = Math.floor(event.clientY - rect.top);
}

let count = 0;
function drawParticle(event) {
    if (!mouseIsDown) return;
    count++;
    const index = (mouseY * WIDTH + mouseX) * 4; // 4 values per pixel
    imgData.data[index + 0] = 255; // R value
    imgData.data[index + 1] = 255; // G value
    imgData.data[index + 2] = 255; // B value
    imgData.data[index + 3] = 255; // A value
    ctx.putImageData(imgData, 0, 0);
    setTimeout(drawParticle, 1); // Repeat
}


function gameLoop() {
    drawParticle();
    requestAnimationFrame(gameLoop);
}

gameLoop();