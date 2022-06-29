// Module aliases for easier scripting
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var ballBuffer = [];
var balls = [];
var pegs = [];
var bounds = [];
var cols = 11;
var rows = 10;

// Setup engine
function setup() {
    // Define canvas size (game window)
    createCanvas(600, 600);
    // Define engine and create world
    engine = Engine.create();
    world = engine.world;
    engine.gravity.y = 1.5;
    // Spawn first ball (only here so ball at very start, remove when spawning balls based on gifts)
    newBall();
    // Define spacing of columns and rows
    var spacing = width/cols;
    // Use nested loop to iterate through each row and place each column
    for (var j = 0; j < rows; j++) { 
        for (var i = 0 ; i < cols; i++) {
            var x = i * spacing;
            if (j % 2 == 0){
                x += spacing / 2;
            }
            var y = spacing + j * spacing;
            var p = new Peg(x, y, 6);
            pegs.push(p);
        }
    }
    
    var b = new Boundary(width/2, height + 50, width, 100 );
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

// Function spawns a new ball
function addBallToBuffer(){
    var p = new Ball(300 + getRandomFloat(-10, 10, 2), 10, 8);
    ballBuffer.push(p);
}
 
function newBall(){
    if(ballBuffer.length > 0){
        let ball = ballBuffer[0]
        ball.addToWorld()
        balls.push(ball)
        ballBuffer.shift()
    }
}
function draw() {
    // Spawn new particle every 60 frames (~2seconds)
    if (frameCount % 15 == 0) {
        newBall();
    }
    background(51);
    // Update the engine 
    Engine.update(engine);
    // Draw balls into world
    for (var i = 0; i < balls.length; i++) {
        balls[i].show();
        // If ball is off screen 
        if (balls[i].isOffScreen()) {
            // Tell matter.js it doesnt exists anymore
            World.remove(world, balls[i].body)
            balls.splice(i,1);
            // Since we are removing from an array we have to decrease i by 1 in order to not skip any elements
            i--;
        }
    }
    // Draw pegs into world
    for (var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }
}