const HEIGHT = 600;
const WIDTH = 800;

const canvas = document.getElementById('canvas');   
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(WIDTH, HEIGHT);

for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 0] = 0; // R value
    imgData.data[i + 1] = 0; // G value
    imgData.data[i + 2] = 255; // B value
    imgData.data[i + 3] = 255; // A value
}

ctx.putImageData(imgData, 0, 0);


function gameLoop() {

    requestAnimationFrame(gameLoop);
}

gameLoop();