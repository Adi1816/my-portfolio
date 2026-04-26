import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingGeometry({ shape = 'torus', color = '#8b5cf6', position = [0, 0, 0], scale = 1, speed = 0.5 }) {
  const meshRef = useRef();
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + timeOffset;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.5;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus': return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[1, 0]} />;
      case 'sphere': return <sphereGeometry args={[1, 32, 32]} />;
      case 'box': return <boxGeometry args={[1, 1, 1]} />;
      default: return <torusGeometry args={[1, 0.4, 32, 64]} />;
    }
  }, [shape]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}
