// Game Variables
let fps = 10;
let fpsIntervalMs = 1000 / fps;
let lastFrameTime = 0;

let bugSprite;
const bugRow = 0;
const spriteSpace = 31;
const firstSprite = -98 - spriteSpace;
const totalSprites = 8;
let positionBottom = 0;


const bug = document.getElementById("bug");

// Game Initialization
function init() {
    // block = -98
    bugSprite = firstSprite;

    // Initialize game elements here
    bug.style.backgroundPositionX = bugSprite + "px";
    bug.style.backgroundPositionY = bugRow * -32 + -3 + "px";
    bug.style.bottom = bug.style.bottom + "px";

}

// Update the game state
function update() {
    bugSprite = bugSprite - 32;
    if(bugSprite < firstSprite - (totalSprites * spriteSpace)){
       bugSprite = firstSprite;
    }

    
    if (positionBottom === window.innerHeight) {
        positionBottom = 0;
    } else {
        positionBottom+=2;
    }
    

}

// Render the game to the screen
function render() {
    // Draw your game elements here
    console.log("rendered");
    bug.style.backgroundPositionX = bugSprite + "px";
    bug.style.bottom = positionBottom + "px";
}

// The main game loop
function gameLoop() {
    const now = Date.now();
    
    const deltaTime = now - lastFrameTime;

    if (deltaTime < fpsIntervalMs) {
        console.log("Skipping");
        return requestAnimationFrame(gameLoop);
    }
    // Update the game state
    update(deltaTime);

    // Render the game
    render();

    // Set lastTime to current timestamp
    lastFrameTime = now;

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game
init();
requestAnimationFrame(gameLoop);

