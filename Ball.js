const initial_velocity = 0.025
const velocity_increase = 0.0005


export default class Ball{
    constructor(ballElement){
        this.ballElement = ballElement;
        this.reset()
        
        
    }


    get x(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"))
    }


    set x(value){
        this.ballElement.style.setProperty('--x', value)
    }


    get y(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"))
    }


    set y(value){
        this.ballElement.style.setProperty('--y', value)
    }

//bound ball to rectangle to insure it doesn't leave screen
    rect(){
        return this.ballElement.getBoundingClientRect()
    }
// starting instructions everytime game is reset
    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (
          Math.abs(this.direction.x) <= 0.2 ||
          Math.abs(this.direction.x) >= 0.9
        ) {
          const heading = randomNumberBetween(0, 2 * Math.PI)
          this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = initial_velocity
      }
   




    update(delta, paddleRects){
        
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        
        const rect = this.rect()
        // set what to do if ball hits bottom or top of screen using our rect function
        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            // flip direction of y at contact
            this.direction.y *= -1
            this.velocity_increase += (velocity_increase * delta)/2
            console.log(this.velocity_increase)
        }

        if(paddleRects.some(r => isCollision(r,rect))){
            // flip direction of x at contact of paddle
            this.direction.x *= -1
            //speed of ball increases every paddle hit
            this.velocity += velocity_increase * delta
        }


    } 

}

function randomNumberBetween(min,max){
    return Math.random() * (max-min) + min

}

function isCollision(rect1,rect2){
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}


