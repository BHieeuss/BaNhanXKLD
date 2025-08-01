import { AfterViewInit, Component } from '@angular/core';

/**
 * Cherry Blossoms Animation Component
 * Creates a beautiful sakura (cherry blossom) falling animation effect
 */
@Component({
  selector: 'app-cherry-blossoms',
  template: `<canvas
    id="sakura-canvas"
    style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: block; pointer-events: none; z-index: 9999;"
  ></canvas>`,
  standalone: true,
})
export class CherryBlossomsComponent implements AfterViewInit {
  // ===== LIFECYCLE METHODS =====
  ngAfterViewInit(): void {
    this.initCherryBlossoms();
  }

  // ===== ANIMATION INITIALIZATION =====
  private initCherryBlossoms() {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return;

    const canvas = document.getElementById(
      'sakura-canvas'
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ===== CONFIGURATION =====
    const cherryBlossoms: any[] = [];
    const petalCount = 40;
    const petalColors = [
      '#FFB6C1',
      '#FFC0CB',
      '#FFCCCB',
      '#FFE4E1',
      '#F8BBD9',
      '#FDBCB4',
      '#FFFFFF',
    ];

    // ===== UTILITY FUNCTIONS =====
    function randomBetween(a: number, b: number) {
      return Math.random() * (b - a) + a;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for (let i = 0; i < petalCount; i++) {
        if (cherryBlossoms[i]) {
          cherryBlossoms[i].x = randomBetween(0, canvas.width);
          cherryBlossoms[i].y = randomBetween(-canvas.height, 0);
        }
      }
    }

    // ===== INITIALIZATION =====
    resizeCanvas();

    for (let i = 0; i < petalCount; i++) {
      cherryBlossoms.push({
        x: randomBetween(0, canvas.width),
        y: randomBetween(-canvas.height, 0),
        size: randomBetween(12, 22),
        speed: randomBetween(0.5, 2.0),
        rotation: randomBetween(0, 360),
        rotationSpeed: randomBetween(-2, 2),
        swaySpeed: randomBetween(0.2, 1.0),
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: randomBetween(0.7, 1.0),
      });
    }

    window.addEventListener('resize', resizeCanvas);

    // ===== DRAWING FUNCTIONS =====
    function drawCherryBlossom(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity;

      const petalSize = size / 3;

      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * 72 * Math.PI) / 180);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petalSize);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.7, color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');

        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#FFB6C1';
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.ellipse(
          0,
          -petalSize / 2,
          petalSize / 2,
          petalSize,
          0,
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      ctx.fillStyle = '#FFD700';
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, size / 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FF69B4';
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45 * Math.PI) / 180;
        const dotX = Math.cos(angle) * (size / 6);
        const dotY = Math.sin(angle) * (size / 6);
        ctx.beginPath();
        ctx.arc(dotX, dotY, size / 20, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.restore();
    }

    function drawCherryBlossoms() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petalCount; i++) {
        const petal = cherryBlossoms[i];
        drawCherryBlossom(
          ctx,
          petal.x,
          petal.y,
          petal.size,
          petal.rotation,
          petal.color,
          petal.opacity
        );
      }

      moveCherryBlossoms();
    }

    // ===== ANIMATION FUNCTIONS =====
    function moveCherryBlossoms() {
      for (let i = 0; i < petalCount; i++) {
        const petal = cherryBlossoms[i];
        petal.y += petal.speed;
        petal.x += Math.sin(petal.y / 100) * petal.swaySpeed;
        petal.rotation += petal.rotationSpeed;

        if (Math.random() < 0.01) {
          petal.swaySpeed = randomBetween(-1.0, 1.0);
        }

        if (petal.y > canvas.height + 50) {
          petal.y = randomBetween(-100, -50);
          petal.x = randomBetween(0, canvas.width);
          petal.rotation = randomBetween(0, 360);
          petal.color =
            petalColors[Math.floor(Math.random() * petalColors.length)];
          petal.size = randomBetween(12, 22);
          petal.speed = randomBetween(0.5, 2.0);
        }

        if (petal.x > canvas.width + 50) {
          petal.x = -50;
        } else if (petal.x < -50) {
          petal.x = canvas.width + 50;
        }
      }
    }

    function animate() {
      drawCherryBlossoms();
      requestAnimationFrame(animate);
    }

    // ===== START ANIMATION =====
    animate();
  }
}
