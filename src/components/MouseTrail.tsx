import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      const points = pointsRef.current;
      points.push({ x: e.clientX, y: e.clientY, age: 0 });

      // Keep maximum points
      if (points.length > 25) {
        points.shift();
      }

      // Generate spark particles when the cursor transitions with speed
      const prevPoint = points[points.length - 2];
      if (prevPoint) {
        const dx = e.clientX - prevPoint.x;
        const dy = e.clientY - prevPoint.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (speed > 1.5) {
          const spawnCount = Math.min(Math.floor(speed / 3), 5);
          for (let i = 0; i < spawnCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * speed * 0.12 + 0.4;
            sparksRef.current.push({
              x: e.clientX,
              y: e.clientY,
              vx: Math.cos(angle) * velocity + (dx * 0.05),
              vy: Math.sin(angle) * velocity + (dy * 0.05),
              size: Math.random() * 2 + 1,
              color: Math.random() > 0.5 ? '#38bdf8' : '#a855f7', // neon blue or purple
              alpha: 1.0,
              decay: Math.random() * 0.03 + 0.02,
            });
          }
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;
      const sparks = sparksRef.current;

      // 1. Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02; // soft gravitative fall
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // Decrement the points trail naturally over frame ticks if mouse stationary
      points.forEach((p) => {
        p.age += 1;
      });

      // Filter point limits
      pointsRef.current = points.filter((p) => p.age < 25);

      // 2. Render connected smooth Bézier / linear queue ribbon
      if (pointsRef.current.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer glow pass
        ctx.shadowBlur = 14;

        for (let i = 0; i < pointsRef.current.length - 1; i++) {
          const p1 = pointsRef.current[i];
          const p2 = pointsRef.current[i + 1];

          const factor = i / pointsRef.current.length;
          const widthVal = factor * 5.5;

          // Interpolate from Purple (tail) to Cyan (head)
          const r = Math.floor(168 - (168 - 56) * factor);
          const g = Math.floor(85 + (189 - 85) * factor);
          const b = Math.floor(247 + (248 - 247) * factor);
          const color = `rgba(${r}, ${g}, ${b}, ${factor * 0.8})`;

          ctx.strokeStyle = color;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.65)`;
          ctx.lineWidth = widthVal;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Inner glowing white core
        ctx.shadowBlur = 0;
        for (let i = 0; i < pointsRef.current.length - 1; i++) {
          const p1 = pointsRef.current[i];
          const p2 = pointsRef.current[i + 1];

          const factor = i / pointsRef.current.length;
          const widthVal = factor * 1.5;

          ctx.strokeStyle = `rgba(255, 255, 255, ${factor * 0.9})`;
          ctx.lineWidth = widthVal;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="mouse-trail-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-[999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
