'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function FractalTunnel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Get the canvas and its context
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make the canvas always fill the browser window
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Global time variable
    let time = 0;
    let offset = 0;

    function animate() {
      // Get all control values
      const sizeFactor = parseFloat((document.getElementById('sizeSlider') as HTMLInputElement).value);
      const tunnelSpeed = parseFloat((document.getElementById('speedSlider') as HTMLInputElement).value);
      const hueOffset = parseFloat((document.getElementById('colorSlider') as HTMLInputElement).value);
      const branchAmplitude = parseFloat((document.getElementById('shapeSlider') as HTMLInputElement).value);
      const maxDepth = parseInt((document.getElementById('depthSlider') as HTMLInputElement).value);
      const baseAngleDeg = parseFloat((document.getElementById('baseAngleSlider') as HTMLInputElement).value);
      const lengthReduction = parseFloat((document.getElementById('lengthReductionSlider') as HTMLInputElement).value);
      const fractalType = (document.getElementById('fractalTypeSelect') as HTMLSelectElement).value;
      const axisRotSpeed = parseFloat((document.getElementById('axisRotationSpeedSlider') as HTMLInputElement).value);
      const tunnelDepth = parseFloat((document.getElementById('tunnelDepthSlider') as HTMLInputElement).value);
      const focalLength = parseFloat((document.getElementById('focalLengthSlider') as HTMLInputElement).value);
      const numLayers = parseInt((document.getElementById('layerCountSlider') as HTMLInputElement).value);
      const trailFade = parseFloat((document.getElementById('trailFadeSlider') as HTMLInputElement).value);

      // Increment time
      time += 0.005;
      offset = time * tunnelSpeed;

      // Draw trailing effect
      if (!ctx || !canvas) return;
      ctx.fillStyle = `rgba(0, 0, 0, ${trailFade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw tunnel layers
      const layerSpacing = tunnelDepth / numLayers;
      for (let i = 0; i < numLayers; i++) {
        const z = i * layerSpacing + offset;
        const scale = 1 / (z * 0.1);
        
        // Calculate lateral movement
        const angle = (z + offset) * 0.1;
        const lateralShift = Math.sin(angle) * 50;
        
        // Calculate initial length based on z-depth
        const initialLength = Math.min(canvas.width, canvas.height) * 0.4;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.translate(lateralShift, 0);
        ctx.rotate(time * 0.3 + z * 0.01);
        ctx.globalAlpha = 1 - z / tunnelDepth;

        drawFractal(0, 0, -Math.PI / 2, initialLength, maxDepth,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
        ctx.restore();
      }

      // Update axis rotation
      const axisAngle = axisRotSpeed * time * 360;
      const axisType = (document.getElementById('axisRotationSelect') as HTMLSelectElement).value;
      if (canvas instanceof HTMLElement) {
        if (axisType === "Front") {
          canvas.style.transform = `rotateX(${axisAngle}deg)`;
        } else if (axisType === "Back") {
          canvas.style.transform = `rotateX(${-axisAngle}deg)`;
        } else if (axisType === "Side") {
          canvas.style.transform = `rotateY(${axisAngle}deg)`;
        } else {
          canvas.style.transform = "none";
        }
      }

      requestAnimationFrame(animate);
    }

    function drawFractal(
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

      const hue = (time * 50 + depth * 15 + hueOffset) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = depth / 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const baseAngleRad = baseAngleDeg * Math.PI / 180;
      const offset = baseAngleRad + Math.sin(time * 2 + depth) * branchAmplitude;

      if (fractalType === "Tree") {
        drawFractal(x2, y2, angle - offset, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
        drawFractal(x2, y2, angle + offset, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
      } else if (fractalType === "Multibranch") {
        drawFractal(x2, y2, angle - offset, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
        drawFractal(x2, y2, angle, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
        drawFractal(x2, y2, angle + offset, length * lengthReduction, depth - 1,
                   hueOffset, branchAmplitude, baseAngleDeg, lengthReduction, fractalType, time);
      }
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Link 
        href="/"
        className="fixed top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        ← Back to Portfolio
      </Link>
      <canvas id="canvas" className="w-full h-full fixed inset-0" ref={canvasRef}></canvas>
      <div id="controls" className="fixed top-4 right-4 bg-black/75 p-4 rounded-lg text-white space-y-4 max-h-[95vh] overflow-y-auto">
        <div className="space-y-2">
          <label className="block">
            Size:
            <input type="range" id="sizeSlider" min="0.5" max="2" step="0.01" defaultValue="1.5" className="w-full" />
          </label>
          <label className="block">
            Tunnel Speed:
            <input type="range" id="speedSlider" min="0.1" max="2" step="0.01" defaultValue="1.5" className="w-full" />
          </label>
          <label className="block">
            Color Offset:
            <input type="range" id="colorSlider" min="0" max="360" step="1" defaultValue="30" className="w-full" />
          </label>
          <label className="block">
            Branch Amplitude:
            <input type="range" id="shapeSlider" min="0" max="1" step="0.01" defaultValue="0.6" className="w-full" />
          </label>
          <label className="block">
            Recursion Depth:
            <input type="range" id="depthSlider" min="3" max="12" step="1" defaultValue="7" className="w-full" />
          </label>
          <label className="block">
            Base Branch Angle (°):
            <input type="range" id="baseAngleSlider" min="0" max="90" step="1" defaultValue="35" className="w-full" />
          </label>
          <label className="block">
            Length Reduction:
            <input type="range" id="lengthReductionSlider" min="0.5" max="0.9" step="0.01" defaultValue="0.65" className="w-full" />
          </label>
          <label className="block">
            Fractal Type:
            <select id="fractalTypeSelect" className="w-full bg-gray-800 rounded p-1">
              <option value="Tree" selected>Tree</option>
              <option value="Multibranch">Multibranch</option>
            </select>
          </label>
        </div>
        <hr className="border-gray-600" />
        <div className="space-y-2">
          <label className="block">
            Axis Rotation:
            <select id="axisRotationSelect" className="w-full bg-gray-800 rounded p-1">
              <option value="None" selected>None</option>
              <option value="Front">Front</option>
              <option value="Back">Back</option>
              <option value="Side">Side</option>
            </select>
          </label>
          <label className="block">
            Axis Rotation Speed:
            <input type="range" id="axisRotationSpeedSlider" min="0" max="5" step="0.01" defaultValue="1.5" className="w-full" />
          </label>
        </div>
        <hr className="border-gray-600" />
        <div className="space-y-2">
          <label className="block">
            Tunnel Depth:
            <input type="range" id="tunnelDepthSlider" min="100" max="600" step="1" defaultValue="600" className="w-full" />
          </label>
          <label className="block">
            Focal Length:
            <input type="range" id="focalLengthSlider" min="100" max="600" step="1" defaultValue="600" className="w-full" />
          </label>
          <label className="block">
            Layer Count:
            <input type="range" id="layerCountSlider" min="10" max="50" step="1" defaultValue="50" className="w-full" />
          </label>
          <label className="block">
            Trail Fade:
            <input type="range" id="trailFadeSlider" min="0" max="0.5" step="0.01" defaultValue="0.05" className="w-full" />
          </label>
        </div>
      </div>
    </div>
  );
} 