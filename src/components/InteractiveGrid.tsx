import { useEffect, useRef, useState } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create 3D particles
    const particleCount = 70;
    const particles: {
      x: number;
      y: number;
      z: number;
      ox: number;
      oy: number;
      oz: number;
      color: string;
      size: number;
      speed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 250 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      // Spherical coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        color: i % 2 === 0 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(168, 85, 247, 0.5)', // neon blue / purple
        size: Math.random() * 2 + 0.6,
        speed: (Math.random() * 0.2 + 0.05) * 0.005,
      });
    }

    // Grid lines for cinematic grid background
    const rows = 14;
    const cols = 14;
    const spacing = 130;

    let angleX = 0.0008;
    let angleY = 0.0006;

    // Perspective Projection helper
    const project = (x: number, y: number, z: number, cameraDistance = 700) => {
      // Rotate
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate Y
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;

      // Rotate X
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Translate camera
      z2 += cameraDistance;

      if (z2 <= 0) z2 = 1;

      // Perspective scale factor
      const fov = 400;
      const scale = fov / z2;
      const projX = width / 2 + x1 * scale;
      const projY = height / 2 + y2 * scale;

      return { x: projX, y: projY, depth: z2 };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth;
        height = canvas.height = entryHeight;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const animate = () => {
      ctx.fillStyle = '#020617'; // Elegant rich cosmic deep space background to match Immersive UI
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse movement
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.08;
      m.y += (m.ty - m.y) * 0.08;

      // Slowly rotate 3D space based on mouse position
      const mouseFactorX = (m.x - width / 2) / (width / 2);
      const mouseFactorY = (m.y - height / 2) / (height / 2);

      angleX += 0.001 + mouseFactorY * 0.002;
      angleY += 0.0012 + mouseFactorX * 0.002;

      // 1. Draw Spotlight Glowing effect mirroring mouse
      const radialGradient = ctx.createRadialGradient(
        m.x,
        m.y,
        10,
        m.x,
        m.y,
        Math.max(width, height) * 0.45
      );
      radialGradient.addColorStop(0, 'rgba(124, 58, 237, 0.08)'); // neon purple glow
      radialGradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.025)'); // neon blue subtler
      radialGradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Render cinematic geometric Grid Plane
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 1;
      const gridZOffset = -150;
      
      // Horizontal lines in perspective
      for (let r = -rows; r <= rows; r++) {
        ctx.beginPath();
        let started = false;
        for (let c = -cols; c <= cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          const z = gridZOffset + Math.sin((c + r + Date.now() * 0.001) * 0.5) * 20;
          const { x: px, y: py } = project(x, y, z);
          
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // Vertical lines in perspective
      for (let c = -cols; c <= cols; c++) {
        ctx.beginPath();
        let started = false;
        for (let r = -rows; r <= rows; r++) {
          const x = c * spacing;
          const y = r * spacing;
          const z = gridZOffset + Math.sin((c + r + Date.now() * 0.001) * 0.5) * 20;
          const { x: px, y: py } = project(x, y, z);

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // 3. Render 3D Rotating Particles
      particles.forEach((p) => {
        // Rotates on its orbital trajectory
        p.ox = p.ox * Math.cos(p.speed) - p.oz * Math.sin(p.speed);
        p.oz = p.ox * Math.sin(p.speed) + p.oz * Math.cos(p.speed);

        const { x: px, y: py, depth } = project(p.ox, p.oy, p.oz);

        // Alpha based on depth
        const alpha = Math.max(0.1, Math.min(0.9, (800 - depth) / 500));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size > 1.5 ? 6 : 0;

        ctx.beginPath();
        ctx.arc(px, py, p.size * (400 / depth), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 4. Subtle center neon nebula glow
      const cx = width / 2;
      const cy = height / 2;
      const nebula = ctx.createRadialGradient(cx, cy, 50, cx, cy, 350);
      nebula.addColorStop(0, 'rgba(88, 28, 135, 0.07)'); // Deep violet nebula
      nebula.addColorStop(0.6, 'rgba(15, 23, 42, 0.01)');
      nebula.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="cinematic-bg"
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#020617] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000_100%)] opacity-70" />
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Noise dust effect overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
    </div>
  );
}
