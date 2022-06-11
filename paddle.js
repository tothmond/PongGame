const speed = 0.01

export default class paddle{
    constructor(paddleElement){
        this.paddleElement = paddleElement
        this.reset()
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"))
    }

    set position(value){
        this.paddleElement.style.setProperty("--position", value)
    }

    reset(){
        this.position = 50
    }



    update(delta, ballHeight){
        this.position += speed * delta * (ballHeight - this.position)
    }

    rect(){
        return this.paddleElement.getBoundingClientRect()
    }



}