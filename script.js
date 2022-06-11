
import Ball from "./Ball.js"
import paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new paddle(document.getElementById("player-paddle"))
const computerPaddle = new paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

// update loop to call functions and update positions per frame

let lastTime

function update(time){

    if(lastTime != null){
        
        const delta = time - lastTime
        // update code
        //ball.update(delta, [playerPaddle.rect(),computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        //document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if(isLoss()){
            handleLoss()
        }
        
    }

    lastTime = time;
    window.requestAnimationFrame(update)

}

function isLoss() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
 
}

function handleLoss(){
    const rect = ball.rect()
    if (rect.right >= window.innerWidth){playerScore.textContent = parseInt(playerScore.textContent) + 1}
    if (rect.left <= 0){computerScore.textContent = parseInt(computerScore.textContent) + 1}
    ball.reset()
    computerPaddle.reset()

}



document.addEventListener("mousemove", e => {
    playerPaddle.position = e.y / window.innerHeight * 100
})
window.requestAnimationFrame(update)