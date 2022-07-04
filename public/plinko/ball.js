class Ball{

    constructor(x, y, r, profilePictureUrl, mask) {
        // Create additional options for object
        var options = {
            restitution: 0.6,
            friction: 0.2,
            wireframes: false,
            collisionFilter: {
                category: 0x0010,
                mask: 0x0001
            },
        }
        // Create particle
        this.body = Bodies.circle(x,y,r, options)
        // Set object ID for collision detection
        this.body.label = "ball";
        // set collision properties
        // Circle doesnt keep track of radius so add radius property
        this.r = r;
        this.profilePictureUrl = profilePictureUrl
        this.img = null
        this.mask = mask
        // Tell the particle to be in the world
    }
    addToWorld(){
        World.add(world, this.body);
    }
    // Create function that deletes balls that fall off screen
    isOffScreen() {
        var x = this.body.position.x;
        var y = this.body.position.y;
        return (x < -50 || x > width + 50 || y > height-50);
    }
    loadImage(){
        if(this.img == null && this.profilePictureUrl){
            this.img = loadImage(this.profilePictureUrl)
            this.img.resize(this.r*2, this.r*2)
        }

    }
    rotate_and_draw_image(img_x, img_y, img_width, img_height, img_angle){
        imageMode(CENTER);
        translate(img_x+img_width/2, img_y+img_width/2);
        rotate(img_angle);
        image(this.img, 0, 0, img_width, img_height);
        translate(-(img_x+img_width/2), -(img_y+img_width/2));
        imageMode(CORNER);
      }
    // Give all particles a show function
    show () {
        
        var pos = this.body.position;
        if(this.profilePictureUrl == null){
            fill(255);
            stroke(255);
            push();
            translate(pos.x, pos.y);
            ellipse(0,0, this.r*2);
            pop();
        }else {
            push()
            this.loadImage()
            // this.mask.ellipse(pos.x, pos.y, this.r)
            // this.img.mask(this.mask)
            this.img.mask(imageFilter) 
            this.rotate_and_draw_image(pos.x-this.r, pos.y-this.r, 2*this.r, 2*this.r, this.body.angle)
            // imageMode(CENTER);
            // rotate(this.body.angle)
            // image(this.img, pos.x-this.r, pos.y-this.r, 2*this.r, 2*this.r)
            pop()
        }
    }
}