function Ball(x, y, r) {
    // Create additional options for object
    var options = {
        restitution: 0.5,
        friction: 0.2
    }
    // Create particle
    this.body = Bodies.circle(x,y,r, options);
    // Circle doesnt keep track of radius so add radius property
    this.r = r;
    // Tell the particle to be in the world
}
Ball.prototype.addToWorld = function(){
    World.add(world, this.body);
}
// Create function that deletes balls that fall off screen
Ball.prototype.isOffScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height - 50);
}
// Give all particles a show function
Ball.prototype.show = function() {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0, this.r*2);
    pop();
}