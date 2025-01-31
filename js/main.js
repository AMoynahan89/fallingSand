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


// State for mouse interactions
// let mouseX = 0;
// let mouseY = 0;

// // Mouse events
// let mouseIsDown = false;
// canvas.addEventListener('mousedown', (event) => { 
//     mouseIsDown = true;
//     deployParticles();
//     // updateMousePosition(event);
// });
// canvas.addEventListener('mouseup', () => { mouseIsDown = false });
// canvas.addEventListener('mousemove', updateMousePosition);

// // Update the mouse position
// function updateMousePosition(event) {
//     const rect = canvas.getBoundingClientRect();
//     mouseX = event.clientX - rect.left;
//     mouseY = event.clientY - rect.top;
// }






// Mapping (x, y) to the ImageData array
// If you have an ImageData object of width w, the index in the data array for a pixel at (x, y) is calculated as:

// index = (y * w + x) * 4

// Breaking it Down Each row has w pixels. Each pixel has 4 values (R, G, B, A) in sequence.
// To access the first value (Red) of the pixel at (x, y), we find its starting index using (y * w + x) * 4.
// The corresponding indices for the RGBA values are:
// Red = index
// Green = index + 1
// Blue = index + 2
// Alpha = index + 3
// Example: Getting a Pixel's RGBA
// javascript
// Copy
// Edit
// function getPixel(imgData, x, y) {
//     const { width, data } = imgData;
//     const index = (y * width + x) * 4;
//     return {
//         r: data[index],     // Red
//         g: data[index + 1], // Green
//         b: data[index + 2], // Blue
//         a: data[index + 3]  // Alpha
//     };
// }
// Example: Setting a Pixel's RGBA
// javascript
// Copy
// Edit
// function setPixel(imgData, x, y, r, g, b, a) {
//     const { width, data } = imgData;
//     const index = (y * width + x) * 4;
//     data[index] = r;     // Red
//     data[index + 1] = g; // Green
//     data[index + 2] = b; // Blue
//     data[index + 3] = a; // Alpha
// }
// Use Case: Looping Through the Image
// javascript
// Copy
// Edit
// for (let y = 0; y < imgData.height; y++) {
//     for (let x = 0; x < imgData.width; x++) {
//         const pixel = getPixel(imgData, x, y);
//         console.log(`Pixel at (${x}, ${y}):`, pixel);
//     }
// }
