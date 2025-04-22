import { useEffect, useRef } from 'react';

const FractalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make the canvas fill its container
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Animation parameters
    let time = 0;
    const params = {
      sizeFactor: 0.6,
      tunnelSpeed: 0.18,
      hueOffset: 120,
      branchAmplitude: 1.5,
      maxDepth: 9,
      baseAngleDeg: 35,
      lengthReduction: 0.78,
      fractalType: 'Tree' as const,
      tunnelDepth: 900,
      focalLength: 1800,
      numLayers: 18,
      trailFade: 0.18
    };

    function drawFractal(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      length: number,
      depth: number,
      hueOffset: number,
      branchAmplitude: number,
      baseAngleDeg: number,
      lengthReduction: number,
      fractalType: string,
      time: number
    ) {
      if (depth === 0 || length < 2) return;

      const x2 = x + length * Math.cos(angle);
      const y2 = y + length * Math.sin(angle);

      // Enhanced color variation
      const hue = (time * 60 + depth * 20 + hueOffset) % 360;
      const saturation = 100 + Math.sin(time + depth) * 15;
      const lightness = 60 + Math.cos(time * 0.5 + depth) * 10;
      ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`;
      ctx.lineWidth = depth * 1.8;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const baseAngleRad = baseAngleDeg * Math.PI / 180;
      const offset = baseAngleRad + Math.sin(time * 2.5 + depth) * branchAmplitude;

      if (fractalType === "Tree") {
        drawFractal(ctx, x2, y2, angle - offset, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
        drawFractal(ctx, x2, y2, angle + offset, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
      }
    }

    function animate() {
      if (!canvas || !ctx) return;

      // Increment time
      time += 0.007;

      // Draw trailing effect with slight blur for glow effect
      ctx.fillStyle = `rgba(0, 0, 0, ${params.trailFade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw tunnel layers
      const layerSpacing = params.tunnelDepth / params.numLayers;
      for (let i = 0; i < params.numLayers; i++) {
        let z = (time * params.tunnelSpeed * params.tunnelDepth + i * layerSpacing) % params.tunnelDepth;
        let scale = params.focalLength / (params.focalLength + z);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        let lateralShift = Math.sin(time * 0.7 + z * 0.02) * 50;
        ctx.translate(lateralShift, 0);
        ctx.rotate(time * 0.35 + z * 0.015);
        ctx.globalAlpha = (1 - z / params.tunnelDepth) * 0.95;

        let initialLength = (canvas.height / 3.5) * params.sizeFactor;
        drawFractal(ctx, 0, 0, -Math.PI / 2, initialLength, params.maxDepth,
                   params.hueOffset, params.branchAmplitude, params.baseAngleDeg, 
                   params.lengthReduction, params.fractalType, time);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
};

export default FractalBackground; 