'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Controls {
  rotationSpeed: number;
  showOrbits: boolean;
  showLabels: boolean;
  showTrails: boolean;
  timeScale: number;
  isPaused: boolean;
}

export default function SolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [controls, setControls] = useState<Controls>({
    rotationSpeed: 1,
    showOrbits: true,
    showLabels: true,
    showTrails: false,
    timeScale: 1,
    isPaused: false
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // ====================================================
    // 1. SET UP SCENE, CAMERA, & RENDERER
    // ====================================================
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 300, 800);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // ====================================================
    // 2. LIGHTING
    // ====================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 5000);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // ====================================================
    // 3. TEXTURE LOADER
    // ====================================================
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    
    // ====================================================
    // 4. THE SUN WITH AURA & SOLAR FLARES
    // ====================================================
    const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      emissive: 0xffaa00,
      shininess: 100
    });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);
    
    const auraGeometry = new THREE.SphereGeometry(24, 32, 32);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const auraMesh = new THREE.Mesh(auraGeometry, auraMaterial);
    sunMesh.add(auraMesh);
    
    const flareTexture = textureLoader.load("https://threejs.org/examples/textures/lensflare/lensflare0.png");
    const solarFlares: THREE.Sprite[] = [];
    for (let i = 0; i < 5; i++) {
      const spriteMaterial = new THREE.SpriteMaterial({
        map: flareTexture,
        color: 0xffaa00,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(30, 30, 1);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const flareDistance = 22 + Math.random() * 4;
      sprite.position.set(
        flareDistance * Math.sin(phi) * Math.cos(theta),
        flareDistance * Math.sin(phi) * Math.sin(theta),
        flareDistance * Math.cos(phi)
      );
      sprite.userData.phase = Math.random() * Math.PI * 2;
      sunMesh.add(sprite);
      solarFlares.push(sprite);
    }
    
    // ====================================================
    // 5. PLANETS
    // ====================================================
    
    // Mercury
    const mercuryPivot = new THREE.Object3D();
    scene.add(mercuryPivot);
    const mercuryMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x888888, specular: 0x222222, shininess: 5 })
    );
    mercuryMesh.position.set(100, 0, 0);
    mercuryPivot.add(mercuryMesh);
    
    // Venus
    const venusPivot = new THREE.Object3D();
    scene.add(venusPivot);
    const venusMesh = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xF5DEB3, specular: 0xBBBBBB, shininess: 20 })
    );
    venusMesh.position.set(150, 0, 0);
    venusPivot.add(venusMesh);
    
    // Earth & Moon
    const earthPivot = new THREE.Object3D();
    scene.add(earthPivot);
    
    const earthTexture = textureLoader.load("https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg");
    const earthBump = textureLoader.load("https://threejs.org/examples/textures/earthbump1k.jpg");
    const earthSpec = textureLoader.load("https://threejs.org/examples/textures/earthspec1k.jpg");
    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: earthBump,
        bumpScale: 0.5,
        specularMap: earthSpec,
        specular: new THREE.Color("grey"),
        shininess: 15
      })
    );
    earthMesh.position.set(200, 0, 0);
    earthPivot.add(earthMesh);
    
    const moonPivot = new THREE.Object3D();
    earthMesh.add(moonPivot);
    const moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    moonMesh.position.set(20, 0, 0);
    moonPivot.add(moonMesh);
    
    // Mars
    const marsPivot = new THREE.Object3D();
    scene.add(marsPivot);
    const marsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xAA0000 })
    );
    marsMesh.position.set(250, 0, 0);
    marsPivot.add(marsMesh);
    
    // Jupiter
    const jupiterPivot = new THREE.Object3D();
    scene.add(jupiterPivot);
    const jupiterTexture = textureLoader.load("https://threejs.org/examples/textures/jupiter2_2048.jpg");
    const jupiterMesh = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshPhongMaterial({ map: jupiterTexture })
    );
    jupiterMesh.position.set(300, 0, 0);
    jupiterPivot.add(jupiterMesh);
    
    // Jupiter's Galilean moons
    const jupiterMoonPivots: { pivot: THREE.Object3D; speed: number }[] = [];
    const jupiterMoons = [
      { radius: 0.6, orbit: 30, speed: 0.02 },
      { radius: 0.6, orbit: 40, speed: 0.018 },
      { radius: 0.7, orbit: 50, speed: 0.015 },
      { radius: 0.65, orbit: 60, speed: 0.012 }
    ];
    jupiterMoons.forEach(data => {
      const pivot = new THREE.Object3D();
      jupiterMesh.add(pivot);
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(data.radius, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0xaaaaaa })
      );
      moon.position.set(data.orbit, 0, 0);
      pivot.add(moon);
      jupiterMoonPivots.push({ pivot: pivot, speed: data.speed });
    });
    
    // Saturn
    const saturnPivot = new THREE.Object3D();
    scene.add(saturnPivot);
    const saturnMesh = new THREE.Mesh(
      new THREE.SphereGeometry(9, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xffcc66, emissive: 0x886600, shininess: 30 })
    );
    saturnMesh.position.set(350, 0, 0);
    saturnPivot.add(saturnMesh);
    
    const saturnRing = new THREE.Mesh(
      new THREE.RingGeometry(11, 15, 32),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    saturnRing.rotation.x = Math.PI / 2;
    saturnMesh.add(saturnRing);
    
    // Saturn's moons
    const saturnMoonPivots: { pivot: THREE.Object3D; speed: number }[] = [];
    const saturnMoons = [
      { radius: 2.5, orbit: 30, speed: 0.01 },
      { radius: 1.5, orbit: 40, speed: 0.012 }
    ];
    saturnMoons.forEach(data => {
      const pivot = new THREE.Object3D();
      saturnMesh.add(pivot);
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(data.radius, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0xdddddd })
      );
      moon.position.set(data.orbit, 0, 0);
      pivot.add(moon);
      saturnMoonPivots.push({ pivot: pivot, speed: data.speed });
    });
    
    // Uranus
    const uranusPivot = new THREE.Object3D();
    scene.add(uranusPivot);
    const uranusMesh = new THREE.Mesh(
      new THREE.SphereGeometry(4.5, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x66ffff })
    );
    uranusMesh.position.set(400, 0, 0);
    uranusPivot.add(uranusMesh);
    
    // Neptune
    const neptunePivot = new THREE.Object3D();
    scene.add(neptunePivot);
    const neptuneMesh = new THREE.Mesh(
      new THREE.SphereGeometry(4.5, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x3333ff })
    );
    neptuneMesh.position.set(500, 0, 0);
    neptunePivot.add(neptuneMesh);
    
    // ====================================================
    // 6. ASTEROID BELT
    // ====================================================
    const asteroidBelt = new THREE.Group();
    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 220 + Math.random() * (280 - 220);
      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = (Math.random() - 0.5) * 10;
      const asteroid = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshPhongMaterial({ color: 0x888888 })
      );
      asteroid.position.set(x, y, z);
      asteroidBelt.add(asteroid);
    }
    scene.add(asteroidBelt);
    
    // ====================================================
    // 7. CONTAINER WITH MINI BALLS
    // ====================================================
    const miniContainerPivot = new THREE.Object3D();
    miniContainerPivot.rotation.x = Math.PI / 2;
    scene.add(miniContainerPivot);
    const miniContainerMesh = new THREE.Mesh(
      new THREE.SphereGeometry(30, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x00ffff, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
    );
    const miniContainerGroup = new THREE.Group();
    miniContainerGroup.add(miniContainerMesh);
    
    interface MiniBall {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
    }
    
    const miniBalls: MiniBall[] = [];
    for (let i = 0; i < 20; i++) {
      const miniBall = new THREE.Mesh(
        new THREE.SphereGeometry(2, 16, 16),
        new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff })
      );
      miniBall.position.copy((function(){
        const u = Math.random(), v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = (30 - 2) * Math.cbrt(Math.random());
        return new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
      })());
      miniContainerGroup.add(miniBall);
      const velocity = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize().multiplyScalar(0.5);
      miniBalls.push({ mesh: miniBall, velocity: velocity });
    }
    
    miniContainerPivot.add(miniContainerGroup);
    miniContainerGroup.position.set(500, 0, 0);
    
    // ====================================================
    // 8. PHYSICS FOR MINI BALLS
    // ====================================================
    function updateMiniBalls() {
      for (let i = 0; i < miniBalls.length; i++) {
        const ball = miniBalls[i];
        ball.mesh.position.add(ball.velocity);
        if (ball.mesh.position.length() > (30 - 2)) {
          const normal = ball.mesh.position.clone().normalize();
          const dot = ball.velocity.dot(normal);
          ball.velocity.sub(normal.multiplyScalar(2 * dot));
          ball.mesh.position.copy(normal.multiplyScalar(30 - 2));
        }
      }
      for (let i = 0; i < miniBalls.length; i++) {
        for (let j = i+1; j < miniBalls.length; j++) {
          const ballA = miniBalls[i], ballB = miniBalls[j];
          const diff = ballA.mesh.position.clone().sub(ballB.mesh.position);
          const distance = diff.length();
          if (distance < 4 && distance > 0) {
            const n = diff.clone().normalize();
            const relativeVel = ballA.velocity.clone().sub(ballB.velocity);
            const speed = relativeVel.dot(n);
            if (speed < 0) {
              const impulse = n.clone().multiplyScalar(-speed);
              ballA.velocity.add(impulse);
              ballB.velocity.sub(impulse);
              const overlap = 4 - distance;
              ballA.mesh.position.add(n.clone().multiplyScalar(overlap/2));
              ballB.mesh.position.sub(n.clone().multiplyScalar(overlap/2));
            }
          }
        }
      }
    }
    
    // ====================================================
    // 9. ANIMATION LOOP
    // ====================================================
    function animate() {
      if (!controls.isPaused) {
        requestAnimationFrame(animate);
        
        const speedFactor = controls.rotationSpeed * controls.timeScale;
        
        mercuryPivot.rotation.y += 0.005 * speedFactor;
        venusPivot.rotation.y += 0.00375 * speedFactor;
        earthPivot.rotation.y += 0.003 * speedFactor;
        moonPivot.rotation.y += 0.0125 * speedFactor;
        marsPivot.rotation.y += 0.0025 * speedFactor;
        jupiterPivot.rotation.y += 0.002 * speedFactor;
        jupiterMoonPivots.forEach(item => { 
          item.pivot.rotation.y += item.speed * 0.25 * speedFactor;
        });
        saturnPivot.rotation.y += 0.00175 * speedFactor;
        saturnMoonPivots.forEach(item => { 
          item.pivot.rotation.y += item.speed * 0.25 * speedFactor;
        });
        uranusPivot.rotation.y += 0.0015 * speedFactor;
        neptunePivot.rotation.y += 0.00125 * speedFactor;
        
        asteroidBelt.rotation.y += 0.00125 * speedFactor;
        
        miniContainerPivot.rotation.y += 0.0025 * speedFactor;
        updateMiniBalls();
        
        const t = performance.now() * 0.005;
        solarFlares.forEach(flare => {
          const scaleFactor = 30 * (1 + 0.2 * Math.sin(t + flare.userData.phase));
          flare.scale.set(scaleFactor, scaleFactor, 1);
        });
        
        renderer.render(scene, camera);
      }
    }
    
    animate();
    
    // ====================================================
    // 10. HANDLE WINDOW RESIZING
    // ====================================================
    function handleResize() {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [controls]);

  return (
    <div className="relative min-h-screen bg-black">
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Controls Panel */}
      <div className="absolute top-4 right-4 z-10 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 w-64 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Rotation Speed</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={controls.rotationSpeed}
            onChange={(e) => setControls(prev => ({ ...prev, rotationSpeed: parseFloat(e.target.value) }))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Time Scale</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={controls.timeScale}
            onChange={(e) => setControls(prev => ({ ...prev, timeScale: parseFloat(e.target.value) }))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={controls.showOrbits}
              onChange={(e) => setControls(prev => ({ ...prev, showOrbits: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm text-gray-300">Show Orbits</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={controls.showLabels}
              onChange={(e) => setControls(prev => ({ ...prev, showLabels: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm text-gray-300">Show Labels</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={controls.showTrails}
              onChange={(e) => setControls(prev => ({ ...prev, showTrails: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm text-gray-300">Show Trails</span>
          </label>
        </div>

        <button
          onClick={() => setControls(prev => ({ ...prev, isPaused: !prev.isPaused }))}
          className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
        >
          {controls.isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-4 left-4 z-10"
      >
        <Link
          href="/simulations"
          className="inline-flex items-center text-gray-400 hover:text-white group transition-colors duration-200"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Simulations
        </Link>
      </motion.div>
    </div>
  );
} 