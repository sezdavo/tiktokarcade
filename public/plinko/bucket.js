function Bucket(x, y, w, h) {
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


}

// Give all buckets a show function
Bucket.prototype.show = function() {
    fill(254,208,11);
    stroke(254,208,11);
    var pos = this.body.position;
    push();
    // Draw bucket box 1
    translate(pos.x, pos.y);
    rectMode(CENTER);
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