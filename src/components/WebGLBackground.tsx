"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function PrismCluster() {
  const group = useRef<THREE.Group>(null);

  // Auto-rotate the entire cluster slowly and react to pointer
  useFrame((state) => {
    if (group.current) {
      // Gentle auto-rotation
      group.current.rotation.x += 0.001;
      group.current.rotation.y += 0.002;

      // Pointer reaction
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      // Smooth interpolation
      group.current.rotation.y += (targetX - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.05;
    }
  });

  const materialConfig = {
    transmission: 0.9,
    roughness: 0.1,
    thickness: 1.2,
    ior: 1.5,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  };

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Main Icosahedron */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial {...materialConfig} color="#00f2fe" emissive="#00f2fe" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Floating Torus Knot */}
        <mesh position={[2, 1, -1]} rotation={[Math.PI / 4, 0, 0]}>
          <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
          <meshPhysicalMaterial {...materialConfig} color="#8a2be2" emissive="#8a2be2" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Floating Data Nodes (Small Octahedrons) */}
        <mesh position={[-2, -1, 1]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshPhysicalMaterial {...materialConfig} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[1, -2, -2]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshPhysicalMaterial {...materialConfig} color="#00f2fe" />
        </mesh>
        <mesh position={[-1.5, 2, -1]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial {...materialConfig} color="#8a2be2" />
        </mesh>
      </Float>
    </group>
  );
}

function StarParticles() {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 1000;

  // Generate random positions and phases for organic movement
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Scatter particles in a large sphere
      const r = 10 + Math.random() * 20;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime() * 0.2;
    
    // Simulate turbulence by slightly moving the entire system
    ref.current.rotation.y = time * 0.1;
    ref.current.rotation.z = time * 0.05;

    // Organic drift logic could be implemented here on individual vertices 
    // using a custom shader material for ultimate performance, but simple
    // group rotation combined with PointsMaterial is very cheap.
  });

  return (
    <group>
      <Points ref={ref} positions={positions} frustumCulled={true}>
        <PointMaterial
          transparent
          color="#00f2fe"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#0a0a0f]">
      {/* Ambient background glow to ground the 3D scene */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[150px]" />
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        frameloop="demand" // Auto-pauses when no state changes (note: float/useFrame might force render, so this helps when tab is inactive)
        performance={{ min: 0.5 }} // Allows automatic resolution downscaling
        gl={{ alpha: true, antialias: false }} // antialias false saves performance, we rely on dpr
      >
        <color attach="background" args={["#0a0a0f"]} />
        <fog attach="fog" args={["#0a0a0f", 5, 25]} />
        
        {/* Studio lighting setup */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f2fe" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8a2be2" />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />
        
        <PrismCluster />
        <StarParticles />
        
        {/* Environment map for glass refractions */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
