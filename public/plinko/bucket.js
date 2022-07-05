class Bucket{

    constructor(x, y, w, h) {
        // Create additional options for object
        var options = {
            isStatic: true
        }
        // Create particle
        this.body = Bodies.rectangle(x,y, w, h, options);
        // Circle doesnt keep track of radius so add radius property
        this.w = w;
        this.h = h;
        // Set object ID for collision detection
        this.body.label = "bucket";
        // Set bucket values for scoring
        this.body.value = null;
        // Tell the particle to be in the world
        World.add(world, this.body);

        this.maxAmp = PI/16
        this.dAmp = PI/20
        this.ampX = 0

        this.period = 10
        this.angle = 0
        this.dx = (TWO_PI / this.period)
        this.jiggling = false
        this.growing = false
        
        this.x = 0
        this.minTiming = 2

        this.prevFrameCount = null
        this.updated = false

    }

    incrementX(frameCount){
        if(this.prevFrameCount === null ){
            this.prevFrameCount = frameCount
        } 

        if(frameCount-this.prevFrameCount > this.minTiming){
            this.prevFrameCount = frameCount
            this.x += this.dx
            this.ampX -= this.dAmp
        }
    }

    calcAngle(frameCount){
        this.incrementX(frameCount)
        this.angle = sin(this.x) * exp(this.ampX) * this.maxAmp
    }
    jiggle(){
        this.jiggling = true
        this.growing = true
        this.ampX = 0
    }
    // Give all buckets a show function
    show(frameCount){
        if(this.jiggling){
            this.calcAngle(frameCount);
        }

        fill(254,208,11);
        stroke(254,208,11);
        var pos = this.body.position;
        push();
        // Draw bucket box 1
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rotate(this.angle);
        rect(0, 0, this.w, this.h, 10);
        // Add bucket text
        // translate(-this.w/2, 0);
        textSize(40);
        fill(28,45,55);
        stroke(28,45,55);
        if (this.body.value < 10){
            text(this.body.value, -10, 13);
        }else{
            text(this.body.value, -22, 13);
        }
        pop();
    }
}
