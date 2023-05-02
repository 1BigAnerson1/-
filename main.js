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

const planets = [
  new Planet(100, 200),
  new Planet(200, 200),
  new Planet(300, 100),
  new Planet(200, 300),
];

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (const planetIndex in planets) {
    let planet = planets[planetIndex];
    planet.x = R * Math.sin(alpha) + planet.pX;
    planet.y = R * Math.sin(alpha) + planet.pY;
    alpha += (SPEED_MULT * Math.PI) / 180;
    ctx.fillStyle = 'red';
    ctx.arc(x, y, 50, 0, Math.PI * 2);
  }
  ctx.fill();
  window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);
