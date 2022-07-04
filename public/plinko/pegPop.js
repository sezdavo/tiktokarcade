class PegPop{
    constructor(x, y, r ){
        // Circle doesnt keep track of radius so add radius property
        this.r = r;
        this.x = x;
        this.y = y;
        this.scaleFactor = 1
        this.maxScaleFactor = 1.5 
        this.scaleFactorInc = 0.08 
        this.popping = false
        this.growing = true 
        
        this.prevFrameCount = null
        this.minTiming = 1
    }

    startPopping (){
        this.popping = true
        this.growing = true
    }

    pop(frameCount) {
        if(this.prevFrameCount === null ){
            this.prevFrameCount = frameCount
        } 
        let updated = false

        fill(239, 68, 68, 150);
        noStroke()
    
        push();
        translate(this.x, this.y);
        ellipse(0,0, this.r*2*this.scaleFactor);
        
        if(this.popping && frameCount-this.prevFrameCount > this.minTiming){
            updated = true
            if (this.growing) {
                this.scaleFactor += this.scaleFactorInc
            }else if(!this.growing){
                this.scaleFactor -= this.scaleFactorInc
            }
        }
        
        if(this.scaleFactor >= this.maxScaleFactor){
            this.growing = false
        }
        if(this.scaleFactor < 1){
            this.scaleFactor = 1
            this.popping = false
        }
        if(this.scaleFactor > this.maxScaleFactor){
            this.scaleFactor = this.maxScaleFactor
        }
    
        pop();
    
        if (updated) {
            this.prevFrameCount = frameCount
        }
    }
} 
