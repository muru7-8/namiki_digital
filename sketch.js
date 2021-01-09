
let x, y;


function setup(){
    x = windowWidth;
    y = windowHeight;

    createCanvas(x - 20, y - 20);
}

function draw(){
    background(0);
    ellipse(x / 2, y / 2, 200);

    fill(255);
    textSize(20);
    text("orientacion: " + deviceOrientation, 100, 100);
    text("ace X: " + accelerationX, 100, 120);
    text("ace Y: " + accelerationY, 100, 140);
    text("ace Z: " + accelerationZ, 100, 160);
    text("rot X: " + rotationX, 100, 180);
    text("rot Y: " + rotationY, 100, 200);
    text("rot Z: " + rotationZ, 100, 220);
}