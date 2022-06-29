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
    // Tell the particle to be in the world
    World.add(world, this.body);


}

// Give all buckets a show function
Bucket.prototype.show = function() {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
}