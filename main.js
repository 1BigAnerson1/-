const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Planet {
  x;
  y;

  pX;

  pY;

  atmosphere;

  radius;

  constructor(x, y, size, atmosphere = 'red', radius = 50) {
    this.size = size;
    this.pX = x;
    this.pY = y;
    this.atmosphere = atmosphere;
    this.radius = radius;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.atmosphere;
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

let SPEED_MULT = 0.2;

let alpha = 0;

const planets = [
  new Planet(200, 200, 30, 'red', 80),
  new Planet(200, 200, 30, 'blue', 210),
  new Planet(200, 200, 30, 'green', 110),
  new Planet(200, 200, 30, 'gold', 96),
];

let planet;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const planetIndex in planets) {
    planet = planets[planetIndex];
    planet.move();
    planet.render(ctx);
  }
  window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);
