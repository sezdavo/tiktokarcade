// Module aliases for easier scripting
var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

var engine;
var world;
var ballBuffer = [];
var balls = [];
var pegs = [];
var bounds = [];
var cols = 11;
var rows = 10;
var nLayers = 7;



// Setup engine
function setup() {
    // Define canvas size (game window)
    createCanvas(600, 700);
    // Define engine and create world
    engine = Engine.create();
    world = engine.world;
    engine.gravity.y = 1;
    // Set up collision detection for point scoring
    function collision(event){
        console.log(event);
        // var pairs = event.pairs;
        // for (var i = 0; i < pairs.length; i++){
        //     var labelA = pairs[i].bodyA.label;
        //     var labelB = pairs[i].bodyB.label;
        //     if (labelA == 'ball' && labelB == 'ball'){
        //         console.log('two balls collided');
        //     }
        // }
    }
    // Assign a 'collisionStart' event in this engine to the function
    Events.on(engine, 'collisionStart', collision);
    // Spawn first ball (only here so ball at very start, remove when spawning balls based on gifts)
    newBall();
    // Define spacing of columns and rows
    var spacing = 70;
    var spacingY = 60;
    // Use nested loop to iterate through each layer and place corresponding pegs
    // Define starting variables for each layer
    var startPosX = (width / 2 ) - spacing;
    var startPosY = 80;
    var nPegs = 3;
    // First iterate through each layer of pegs (Y direction)
    for (var j = 0; j < nLayers; j++) { 
        // For each layer iterate through and place each peg (X direction)
        // Define layers height
        var y = startPosY;
        for (var i = 0 ; i < nPegs; i++) {
            var x = startPosX + (i * spacing)
            var p = new Peg(x, y, 8);
            // push the new object into peg array
            pegs.push(p);
        }
        startPosX = startPosX - (0.5 * spacing);
        startPosY += spacingY;
        nPegs += 1
    }

    
    var b = new Boundary(width/2, height + 50, width, 100 );
    bounds.push(b);
    for (var i = 0 ; i < nPegs + 1; i++) {
        var x = startPosX + (0.5*spacing) + (i * spacing);
        var h = 200;
        var w = 10;
        var y = height - h / 2;
        var b = new Boundary(x,y,w,h);
        bounds.push(b);
    }
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

// Function spawns a new ball
function addBallToBuffer(){
    var p = new Ball(300 + getRandomFloat(-10, 10, 2), 10, 16);
    // push the new ball into ball array
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
    // Update the engine (second arg is time step variable default = 16.666)
    Engine.update(engine, 16.666);
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
    // Draw boundaries into world
    // The boundaries should help stop a ball triggering multiple buckets
    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }

}