// Module aliases for easier scripting
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
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

// Function spawns a new ball
function newBall(){
    var p = new Ball(300, 10, 10);
    balls.push(p);
}
 
function draw() {
    // Spawn new particle every 60 frames (~2seconds)
    if (frameCount % 60 == 0) {
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