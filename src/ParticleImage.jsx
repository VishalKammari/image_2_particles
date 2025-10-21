import React, { useRef, useEffect } from "react";

const ParticleImage = ({
  src,
  spacing = 12,
  size = 3,
  repelRadius = 120,
  returnForce = 0.08,
  damping = 0.9,
  background = "#000",
  minAlpha = 80,
  maxWidth = 800,
  responsive = true,
  transparent = false,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let mouseX = -9999,
      mouseY = -9999;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    img.onload = () => {
      let scale = 1;
      if (responsive) {
        const maxW = maxWidth || window.innerWidth * 0.8;
        scale = img.width > maxW ? maxW / img.width : 1;
      }

      const w = img.width * scale;
      const h = img.height * scale;

      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);

      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const i = (y * w + x) * 4;
          const a = data[i + 3];
          if (a > minAlpha) {
            const color = `rgba(${data[i]},${data[i + 1]},${data[i + 2]},${a / 255})`;
            particles.push({ x, y, ox: x, oy: y, vx: 0, vy: 0, color });
          }
        }
      }

      requestAnimationFrame(loop);
    };

    function loop() {
      if (!transparent) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (let p of particles) {
        let dx = p.x - mouseX;
        let dy = p.y - mouseY;
        let dist2 = dx * dx + dy * dy;

        if (dist2 < repelRadius * repelRadius) {
          let force =
            (repelRadius * repelRadius - dist2) / (repelRadius * repelRadius);
          p.vx += (dx / 20) * force;
          p.vy += (dy / 20) * force;
        }

        p.vx += (p.ox - p.x) * returnForce;
        p.vy += (p.oy - p.y) * returnForce;

        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      requestAnimationFrame(loop);
    }

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    src,
    spacing,
    size,
    repelRadius,
    returnForce,
    damping,
    background,
    minAlpha,
    maxWidth,
    responsive,
    transparent,
  ]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default ParticleImage;
