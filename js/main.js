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
const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(null));
let activeParticles = [];


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

function drawParticle(event) {
    if (!mouseIsDown) return;
    // new Particle(type, x, y)
    // push to activeParticles
    const index = (mouseY * WIDTH + mouseX) * 4; // 4 values per pixel
    imgData.data[index + 0] = 255; // R value
    imgData.data[index + 1] = 255; // G value
    imgData.data[index + 2] = 255; // B value
    imgData.data[index + 3] = 255; // A value
    ctx.putImageData(imgData, 0, 0);
    setTimeout(drawParticle, 1); // Repeat
}

function updateGrid() {
    for (let i = 0; i > activeParticles.length; i++) {

    }
}

function gameLoop() {
    drawParticle();
    updateGrid();
    requestAnimationFrame(gameLoop);
}

gameLoop();



// The data array is a long array containing the red, green, blue & alpha (opacity) values for each pixel on the canvas. The data array is shaped like this:

// // top left pixel [0,0]
// data[0]: Red value for pixel [0,0],
// data[1]: Green value for pixel [0,0],
// data[2]: Blue value for pixel [0,0],
// data[3]: Alpha value for pixel [0,0],

// // next pixel rightward [1,0]
// data[4]: Red value for pixel [1,0],
// data[5]: Green value for pixel [1,0],
// data[6]: Blue value for pixel [1,0],
// data[7]: Alpha value for pixel [1,0],

// // and so on for each pixel on the canvas
// ...
// You can get position of any [x,y] pixel within data like this:

// // the data[] array position for pixel [x,y]
// var n = y * canvas.width + x;
// And then you can fetch that pixel's red, green, blue & alpha values like this:

// var red=data[n];
// var green=data[n+1];
// var blue=data[n+2];
// var alpha=data[n+3];