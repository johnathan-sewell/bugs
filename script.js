// Game Variables
const fps = 10;
const fpsIntervalMs = 1000 / fps;
let lastFrameTime = 0;
const playSpace = document.getElementById("playSpace");

// Bugs
const bugs = [];

class Bug {
  #el;
  #size = 32;
  #currentSpritePx;
  #positionY;
  #positionX;
  #direction;
  #speed;
  #sprite;
  #totalSprites;

  constructor() {
    this.#sprite = "Pink_Monster_Idle_4.png";
    this.#totalSprites = 4;
    this.#positionY = 0;
    this.#positionX = 0;
    this.#direction = "stop";
    this.#speed = 0;

    this.#el = document.createElement("div");
    this.#el.className = "bug";
    playSpace.appendChild(this.#el);

    this.#currentSpritePx = 0;
    this.#el.style.backgroundPositionX = this.#currentSpritePx + "px";
    this.#el.style.backgroundPositionY = 0 + "px";

    window.addEventListener("keydown", (key) => {
      if (!["ArrowRight", "ArrowLeft"].includes(key.code)) return;

      if (key.code === "ArrowRight") this.#direction = "right";
      if (key.code === "ArrowLeft") this.#direction = "left";

      this.#sprite = "Pink_Monster_Walk_6.png";
      this.#totalSprites = 6;
      if (this.#speed === 0) this.#speed = 2;
    });

    window.addEventListener("keyup", (key) => {
      if (!["ArrowRight", "ArrowLeft"].includes(key.code)) return;

      this.#currentSpritePx = 0;
      this.#sprite = "Pink_Monster_Idle_4.png";
      this.#totalSprites = 4;
      this.#speed = 0;
    });
  }

  update() {
    const lastSpritePx = this.#size * this.#totalSprites - 1;
    this.#currentSpritePx = this.#currentSpritePx + this.#size;
    if (this.#currentSpritePx > lastSpritePx) {
      this.#currentSpritePx = 0;
    }

    if (this.#direction === "right") this.#positionX += this.#speed; // move right
    if (this.#direction === "left") this.#positionX -= this.#speed; // move left

    // increase speed
    if (this.#speed && this.#speed < 8) this.#speed++;
  }

  render() {
    // Draw your game elements here
    this.#el.style.backgroundPositionX = this.#currentSpritePx * -1 + "px";
    this.#el.style.backgroundImage = `url(./${this.#sprite})`;

    this.#el.style.transform = `translate(${this.#positionX}px, ${
      this.#positionY
    }px) scaleX(${this.#direction === "left" ? -2 : 2}) scaleY(${2})`;
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
