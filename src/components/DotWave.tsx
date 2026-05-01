import { useEffect, useRef } from "react";

const DotWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let dots: any[] = [];
    let mouse = { x: -999, y: -999 };
    let t = 0;
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
      
      dots = [];
      const cols = Math.floor(W / 22);
      const rows = Math.floor(H / 22);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            bx: (i + 0.5) * (W / cols),
            by: (j + 0.5) * (H / rows),
            phase: i * 0.18 + j * 0.12,
            phase2: i * 0.07 - j * 0.09,
            ripple: 0,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      dots.forEach((d) => {
        const dx = d.bx - mouse.x,
          dy = d.by - mouse.y;
        if (Math.sqrt(dx * dx + dy * dy) < 130) d.ripple = 1;
      });
    };

    const handleMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    const draw = (ts: number) => {
      t = ts * 0.00045;
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        const wave =
          Math.sin(t * 1.1 + d.phase) * 7 +
          Math.sin(t * 0.6 + d.phase2) * 4 +
          Math.sin(t * 1.9 + d.phase * 0.5) * 2;
        const x = d.bx;
        const y = d.by + wave;
        const dx = x - mouse.x,
          dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - dist / 130);
        d.ripple = Math.max(0, (d.ripple || 0) - 0.025);
        const boost = Math.max(near, d.ripple);
        const alpha = 0.18 + boost * 0.82;
        const radius = 1.5 + boost * 3.5;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.6).toFixed(2)})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Give the DOM a tiny bit to render the parent container size
    setTimeout(resize, 100);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
};

export default DotWave;
