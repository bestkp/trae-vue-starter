<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  isRocket?: boolean;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let animationId = 0;
let lastTime = 0;
let resizeHandler: (() => void) | null = null;

const colors = ['#ff0000', '#ffa500', '#ffff00'];

const createRocket = (x: number) => {
  if (!canvasRef.value) return;
  
  const angle = -Math.PI / 2 + (Math.random() * 0.2 - 0.1);
  const speed = 8 + Math.random() * 2;
  particles.push({
    x,
    y: canvasRef.value.height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    alpha: 1,
    color: '#ffffff',
    size: 2.5,
    isRocket: true
  });
};

const createExplosion = (x: number, y: number, count = 80) => {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 3 + Math.random() * 3;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 1 + Math.random() * 1.5
    });
  }
};

const update = () => {
  particles = particles.filter(p => p.alpha > 0.1);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.isRocket) {
      p.vy += 0.1;
      if (Math.abs(p.vy) < 1) {
        createExplosion(p.x, p.y);
        p.alpha = 0;
      }
    } else {
      p.vy += 0.1;
      p.alpha *= 0.95;
    }
  });
};

const draw = () => {
  if (!ctx || !canvasRef.value) return;
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  particles.forEach(p => {
    if (!ctx) return;
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
};

const animate = (currentTime: number) => {
  // const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  update();
  draw();

  if (Math.random() < 0.02 && canvasRef.value) {
    createRocket(Math.random() * canvasRef.value.width);
  }

  animationId = requestAnimationFrame(animate);
};

const handleClick = (e: MouseEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect();
  if (rect) {
    const x = e.clientX - rect.left;
    createRocket(x);
  }
};

const initCanvas = () => {
  if (!canvasRef.value) return;
  
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  if (!ctx) return;

  resizeHandler = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeHandler();
  window.addEventListener('resize', resizeHandler);
};

onMounted(() => {
  initCanvas();
  lastTime = performance.now();
  animationId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  particles = [];
  ctx = null;
});
</script>

<template>
  <canvas
    ref="canvasRef"
    @click="handleClick"
    class="fireworks-canvas"
  />
</template>

<style scoped>
.fireworks-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  cursor: pointer;
}
</style>