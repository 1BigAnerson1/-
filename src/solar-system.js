import { PlanetRender } from './renders.js';

class Planet {
  speed;
  position;
  size;
  atmosphere;
  radius;
  alpha;
  planetRender;

  constructor(center, speed = 0.1, radius = 50, planetRender) {
    this.center = center;
    this.speed = speed;
    this.radius = radius;
    this.alpha = 0;
    this.position = new Position(center.x, center.y);
    this.planetRender = planetRender;
  }

  move() {
    if (this.speed !== 0) {
      this.position.x = this.radius * Math.sin(this.alpha) + this.center.x;
      this.position.y = this.radius * Math.cos(this.alpha) + this.center.y;
      this.alpha += (this.speed * Math.PI) / 180;
    }
  }

  render(ctx) {
    if (this.planetRender) {
      this.planetRender.render(ctx, this.position);
    } else {
      ctx.beginPath();
      ctx.fillStyle = this.atmosphere;
      ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
}
class Position {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Earth extends Planet {
  moon;
  constructor(center) {
    super(center, 2.3, 110, new PlanetRender(30, 'blue'));
    this.moon = new Planet(
      this.position,
      3.2,
      50,
      new PlanetRender(10, '#aaa')
    );
  }

  move() {
    super.move();
    this.moon.move();
  }

  render(ctx) {
    super.render(ctx);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(this.position.x + 10, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.moon.render(ctx);
  }
}

export { Planet, Position, Earth };
