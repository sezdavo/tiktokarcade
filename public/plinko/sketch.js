// Module aliases for easier scripting
var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
    Render = Matter.Render;

var engine;
var render;
var world;
var ballBuffer = [];
var balls = [];
var pegs = [];
var pegsPop = [];
var bounds = [];
var buckets = [];
var bucketsPop = [];
var cols = 11;
var rows = 10;
var nLayers = 8;
var bucketIDs = [];
var bucketValues = [10,5,3,1,0,1,3,5,10];
var bucketCounters = [0,0,0,0,0,0,0,0,0];
var scoreboard = {};
var randPlayers = ['playerA', 'playerB', 'playerC', 'playerD', 'playerE',]



// Setup engine
function setup() {
    // Define canvas size (game window)
    var canvas = createCanvas(750, 550);
    canvas.parent('game-canvas');

    // Define engine and create world
    engine = Engine.create();
    world = engine.world;
    engine.gravity.y = 1;

    // Set up collision detection for point scoring
    function collision(event){
        // console.log(event.pairs[0]);
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++){
            var pair = pairs[i];
            // IF statement for collision type handling
            // Option 1 is ball and peg, Option 2 is ball and bucket
            // Check if option 1, else assume option 2
            if ("peg" == (pair.bodyA.label||pair.bodyB.label)){
                // Check if body A is peg, if true peg = bodyA, if false peg = bodyB
                // Statement is grabbing peg from collision pair
                var peg = pair.bodyA.label == "peg" ? pair.bodyA : pair.bodyB;
                // console.log(peg)
                // console.log(peg)
                peg.render.fillStyle = '#060a19'
                if(peg.id <= pegsPop.length){
                    pegsPop[parseInt(peg.id)-1].startPopping()
                }
            } else {
                // Assume option 2 and start scoring procedure
                // grab bucket
                var bucket = pair.bodyA.label == "bucket" ? pair.bodyA : pair.bodyB;
                // grab ball
                var ball = pair.bodyA.label == "ball" ? pair.bodyA : pair.bodyB;
                // Get bucket IDs for monitoring distribution
                var idx = bucket.id - bucketIDs[0];
                bucketCounters[idx] += 1;
                // Use values to calculate score
                var score = bucket.value;
                // UPDATE SCOREBOARD
                // Check if player exists on leaderboard
                if (scoreboard[ball.username]){
                    scoreboard[ball.username] += score;
                } else {
                    scoreboard[ball.username] = score;
                }
                // Update leaderboard
                // Create array of all items in scoreboard in format [key, value]
                var scores = Object.keys(scoreboard).map(function(key) {
                    return [key, scoreboard[key]];
                });
                // Sort arrays based on second element (value)
                scores.sort(function(first, second) {
                    return second[1] - first[1];
                });
                // Create a new array with only the first 5 items (top 5 leaders)
                leaderboard = scores.slice(0, 5);
                // Build front end leaderboard
                // Loop through all players in leaderboard and update username + points
                for (i=0; i < leaderboard.length; i++){
                    document.querySelectorAll(".player")[i].querySelector('.username').innerHTML = leaderboard[i][0];
                    document.querySelectorAll(".player")[i].querySelector('.points').innerHTML = leaderboard[i][1];
                }
                // Assign 'isScored' property to ball so that world can remove it from game
                ball.isScored = true;
            }
            

        }
    }
    // Assign a 'collisionStart' event in this engine to the function
    Events.on(engine, "collisionStart", collision);
    // Spawn first ball (only here so ball at very start, remove when spawning balls based on gifts)
    newBall();
    // Define spacing of columns and rows
    var spacing = 70;
    var spacingY = 60;
    // Use nested loop to iterate through each layer and place corresponding pegs
    // Define starting variables for each layer
    var startPosX = (width / 2 ) - spacing;
    // var startPosY = 80;
    var startPosY = 40;
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
            pegsPop.push(new PegPop(x,y,8))
        }
        startPosX = startPosX - (0.5 * spacing);
        startPosY += spacingY;
        nPegs += 1
    }
    // Define ball score processing function
    function processBall(event){
        console.log(event);
    }
    // Place SCORING BUCKETS
    bucketSpacing = 10;
    for (var i = 0 ; i < nPegs - 2; i++) {
        var x = startPosX + spacing + (i*spacing);
        var y = startPosY - spacingY + 50;
        var h = 50;
        var w = 60;
        var bucket = new Bucket(x,y,w,h);
        // Create array containing bucket IDs for identification for scoring
        bucketIDs.push(bucket.body.id);
        bucket.body.value = bucketValues[i];
        buckets.push(bucket);
        // bucketsPop.push(new BucketPop(x,y,w,h));
    }
    // console.log(buckets[0])
    // Events.on(bucket[0], 'ballScored', processBall);
    // for (var i = 0; i < buckets.length; i++){
    //     Events.on(bucket[i], 'ballScored', processBall);
    // }
    // Place bucket boundaries
    var b = new Boundary(width/2, height + 50, width, 100 );
    bounds.push(b);
    
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

// Function spawns a new ball
function addBallToBuffer(){
    // var p = new Ball((width/2) + getRandomFloat(-10, 10, 2), 10, 16);
    var p = new Ball((width/2) + getRandomFloat(-10, 10, 2), -30, 16);
    // Add username to ball (randomly selecting between 5 players for testing)
    p.body.username = randPlayers[getRandomFloat(0,4,0)];
    // p.body.username = userId;
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
    if (frameCount % 60 == 0) {
        addBallToBuffer();
        newBall()
    }
    background(28,45,55);
    // Update the engine (second arg is time step variable default = 16.666)
    Engine.update(engine, 16.666);
    // Draw balls into world
    for (var i = 0; i < balls.length; i++) {
        balls[i].show();
        // If ball is off screen OR isScored (boolean)
        if (balls[i].isOffScreen() || balls[i].body.isScored) {
            // Tell matter.js it doesnt exists anymore
            World.remove(world, balls[i].body);
            balls.splice(i,1);
            // Since we are removing from an array we have to decrease i by 1 in order to not skip any elements
            i--;
        }
    }
    // Draw pegs into world
    for (var i = 0; i < pegs.length; i++) {
        pegsPop[i].pop(frameCount);
        pegs[i].show();
    }
    // Draw buckets into world
    for (var i = 0; i < buckets.length; i++) {
        // bucketsPop[i].pop(frameCount);
        buckets[i].show();
    }
    // Draw boundaries into world
    // The boundaries should help stop a ball triggering multiple buckets
    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }

}