// const HEIGHT = 600;
// const WIDTH = 800;

// const canvas = document.getElementById('canvas');   
// const ctx = canvas.getContext('2d');
// const imgData = ctx.createImageData(WIDTH, HEIGHT);

// // State for mouse interactions
// let mouseX = 0;
// let mouseY = 0;
// let mouseIsDown = false;

// // Mouse events
// canvas.addEventListener('mousedown', (event) => {
//     mouseIsDown = true;
//     drawParticle(event);
// });
// canvas.addEventListener('mouseup', () => { mouseIsDown = false });
// canvas.addEventListener('mousemove', updateMousePosition);

// function updateMousePosition(event) {
//     const rect = canvas.getBoundingClientRect();
//     mouseX  = Math.floor(event.clientX - rect.left);
//     mouseY = Math.floor(event.clientY - rect.top);
// }

// let count = 0;
// function drawParticle(event) {
//     if (!mouseIsDown) return;
//     count++;
//     const index = (mouseY * WIDTH + mouseX) * 4; // 4 values per pixel
//     imgData.data[index + 0] = 255; // R value
//     imgData.data[index + 1] = 255; // G value
//     imgData.data[index + 2] = 255; // B value
//     imgData.data[index + 3] = 255; // A value
//     ctx.putImageData(imgData, 0, 0);
//     setTimeout(drawParticle, 1); // Repeat
// }


// function gameLoop() {
//     drawParticle();
//     requestAnimationFrame(gameLoop);
// }

// gameLoop();








const HEIGHT = 600;
const WIDTH = 800;
const PARTICLE_SIZE = 10;

const canvas = document.getElementById('canvas');   
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(WIDTH, HEIGHT);

// // State for mouse interactions
// let mouseX = 0;
// let mouseY = 0;
// let mouseIsDown = false;

// // Mouse events
// canvas.addEventListener('mousedown', (event) => {
//     mouseIsDown = true;
//     drawParticle(event);
// });
// canvas.addEventListener('mouseup', () => { mouseIsDown = false });
// canvas.addEventListener('mousemove', updateMousePosition);

// function updateMousePosition(event) {
//     const rect = canvas.getBoundingClientRect();
//     mouseX  = Math.floor(event.clientX - rect.left);
//     mouseY = Math.floor(event.clientY - rect.top);
// }

function drawParticle(mouseX, mouseY) {
    for (let i = 1; i = PARTICLE_SIZE * 4; i++) {
        
        const index = (mouseY * WIDTH + mouseX) * 4; // 4 values per pixel
        imgData.data[index + 0] = 255; // R value
        imgData.data[index + 1] = 255; // G value
        imgData.data[index + 2] = 255; // B value
        imgData.data[index + 3] = 255; // A value
    }
    console.log('mouseX = ', mouseX);
    console.log('mouseY = ', mouseY);

    ctx.putImageData(imgData, 0, 0);
}
        


function gameLoop() {
    for(let i = 0; i < HEIGHT; i += PARTICLE_SIZE) {
        for(let j = 0; j < WIDTH; j += PARTICLE_SIZE) {
            setTimeout(drawParticle(j, i), 5000);
        }
        drawParticle();

    drawParticle();
    requestAnimationFrame(gameLoop);
}

gameLoop();