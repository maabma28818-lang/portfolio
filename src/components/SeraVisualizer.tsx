"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TerrainWireframe({ isActive }: { isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create geometry once
  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 10, 32, 32), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const positionAttribute = geometry.attributes.position;
    
    // Smoothly pan the terrain
    meshRef.current.rotation.z = time * 0.05;
    
    // Modify vertices for wave/spike effect
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      
      let z = 0;
      
      if (isActive) {
        // Active Mode: Amplitude spikes simulating speech emotion (high frequency)
        const distance = Math.sqrt(x * x + y * y);
        const spike = Math.sin(distance * 5 - time * 10) * 0.5;
        const noise = Math.cos(x * 10 + time * 5) * Math.sin(y * 10 + time * 5) * 0.3;
        z = spike + noise;
      } else {
        // Idle Mode: Gentle oscillating sine waves (low frequency)
        z = Math.sin(x * 1.5 + time) * 0.2 + Math.cos(y * 1.5 + time) * 0.2;
      }
      
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <meshBasicMaterial 
        color={isActive ? "#dc143c" : "#8a2be2"} 
        wireframe={true} 
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  );
}

export default function SeraVisualizer() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click
          setIsActive(!isActive);
        }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-colors group flex items-center gap-2"
      >
        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#dc143c] animate-pulse' : 'bg-[#8a2be2]'}`} />
        <Activity className={`w-4 h-4 ${isActive ? 'text-[#dc143c]' : 'text-[#8a2be2]'}`} />
        <span className="text-xs font-mono text-white/60 hidden md:block">
          {isActive ? 'MIC ON' : 'TEST MODEL'}
        </span>
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-0 bg-[#0a0a0f] rounded-3xl overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-80 z-10 pointer-events-none" />
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }} gl={{ alpha: true }}>
          <TerrainWireframe isActive={isActive} />
        </Canvas>
      </motion.div>
    </>
  );
}
