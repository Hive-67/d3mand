/*
 * D3MAND — Guardian's Codex
 * Starfield Canvas — fond spatial éternel avec twinkle.
 * Tokens : noir spatial, ponctuation or et cobalt très diluée.
 */
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  twinkle: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let stars: Star[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = [];
      const density = Math.min(300, Math.floor((W * H) / 6000));
      for (let i = 0; i < density; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#080A0E";
      ctx.fillRect(0, 0, W, H);

      const g = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 450);
      g.addColorStop(0, "rgba(201,168,76,0.05)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.2, H * 0.75, 0, W * 0.2, H * 0.75, 380);
      g2.addColorStop(0, "rgba(74,123,255,0.035)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        s.twinkle += 0.02;
        const alpha = s.a * (0.55 + 0.45 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,216,232,${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    draw();

    const onResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}
