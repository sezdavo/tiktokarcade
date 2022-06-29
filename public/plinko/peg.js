function Peg(x, y, r) {
    // Create additional options for object
    var options = {
        isStatic: true,
        restitution: 4,
        friction: 0,
        collisionFilter: {
            category: 0x0001,
            mask: 0x0010
        }
    }
    // Create particle
    this.body = Bodies.circle(x,y,r, options);
    // Set object ID for collision detection
    this.body.label = "peg";

    // Circle doesnt keep track of radius so add radius property
    this.r = r;
    // Tell the particle to be in the world
    World.add(world, this.body);


}

// Give all particles a show function
Peg.prototype.show = function() {
    fill(0, 255, 00);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0, this.r*2);
    pop();
}