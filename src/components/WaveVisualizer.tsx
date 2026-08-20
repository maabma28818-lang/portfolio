"use client";

import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WaveVisualizerProps {
  activeColor: string;
  idleColor: string;
}

function TerrainWireframe({ isActive, activeColor, idleColor }: { isActive: boolean, activeColor: string, idleColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 10, 32, 32), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const positionAttribute = geometry.attributes.position;
    
    meshRef.current.rotation.z = time * 0.05;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      
      let z = 0;
      
      if (isActive) {
        const distance = Math.sqrt(x * x + y * y);
        const spike = Math.sin(distance * 5 - time * 10) * 0.5;
        const noise = Math.cos(x * 10 + time * 5) * Math.sin(y * 10 + time * 5) * 0.3;
        z = spike + noise;
      } else {
        z = Math.sin(x * 1.5 + time) * 0.2 + Math.cos(y * 1.5 + time) * 0.2;
      }
      
      positionAttribute.setZ(i, z);
    }
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <meshBasicMaterial 
        color={isActive ? activeColor : idleColor} 
        wireframe={true} 
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  );
}

export default function WaveVisualizer({ activeColor, idleColor }: WaveVisualizerProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsActive(!isActive);
        }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full glass border border-white/10 hover:bg-white/10 transition-colors group flex items-center gap-2"
      >
        <span 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: isActive ? activeColor : idleColor, animation: isActive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none' }} 
        />
        <Activity className="w-4 h-4" style={{ color: isActive ? activeColor : idleColor }} />
        <span className="text-xs font-mono text-white/60 hidden md:block">
          {isActive ? 'ACTIVE' : 'IDLE'}
        </span>
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-0 bg-transparent rounded-3xl overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }} gl={{ alpha: true }}>
          <TerrainWireframe isActive={isActive} activeColor={activeColor} idleColor={idleColor} />
        </Canvas>
      </motion.div>
    </>
  );
}
