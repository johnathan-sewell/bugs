// Game Variables
const fps = 10;
const fpsIntervalMs = 1000 / fps;
let lastFrameTime = 0;

const playSpace = document.getElementById("playSpace");
const bugHeight = 32;

// Sprite constants
const spriteRow = 0;
const firstSpritePx = 127;
const totalSprites = 8;
const lastSpritePx = firstSpritePx + 32 * 7;

// Bugs
const bugs = [];

class Bug {
  #el;
  #currentSpritePx;
  #bugPositionBottomPx = 0;

  constructor() {
    this.#el = document.createElement("div");
    this.#el.className = "bug";
    playSpace.appendChild(this.#el);

    this.#currentSpritePx = firstSpritePx;
    this.#el.style.backgroundPositionX = this.#currentSpritePx + "px";
    this.#el.style.backgroundPositionY = spriteRow * -32 + -3 + "px";
  }

  update() {
    // show next sprite image
    this.#currentSpritePx = this.#currentSpritePx + 32;
    if (this.#currentSpritePx > lastSpritePx) {
      this.#currentSpritePx = firstSpritePx;
    }

    // move bug up
    if (this.#bugPositionBottomPx > playSpace.clientHeight) {
      this.#bugPositionBottomPx = -bugHeight;
    } else {
      this.#bugPositionBottomPx += fps / 2;
    }
  }

  render() {
    // Draw your game elements here
    this.#el.style.backgroundPositionX = this.#currentSpritePx * -1 + "px";
    this.#el.style.bottom = this.#bugPositionBottomPx + "px";
  }
}

// Game Initialization
function init() {
  bugs.push(new Bug());
}

// Update the game state
function update() {
  bugs.forEach((bug) => bug.update());
}

// Render the game to the screen
function render() {
  bugs.forEach((bug) => bug.render());
}

// The main game loop
function gameLoop() {
  const now = Date.now();

  const deltaTime = now - lastFrameTime;

  // Skip frame sooner than fps
  if (deltaTime < fpsIntervalMs) {
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
