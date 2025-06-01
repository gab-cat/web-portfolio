/* eslint-disable react/no-unknown-property */
'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroContent() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mouse.x * viewport.width * 0.1,
        0.02
      );
      sphereRef.current.position.y = THREE.MathUtils.lerp(
        sphereRef.current.position.y,
        mouse.y * viewport.height * 0.1,
        0.02
      );
    }

    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Main Interactive Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere
          ref={sphereRef}
          args={[1, 64, 64]}
          position={[0, 0, -3]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#7c3aed" : "#4f46e5"}
            attach="material"
            distort={hovered ? 0.8 : 0.4}
            speed={5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* 3D Text Elements */}
      <group ref={textRef} position={[0, 1, 0]}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/roboto.woff"
        >
          Gabriel Angelo
        </Text>
        
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.3}
          color="#7c3aed"
          anchorX="center"
          anchorY="middle"
          font="/fonts/roboto.woff"
        >
          DevSecOps Engineer
        </Text>
      </group>

      {/* Orbital Ring Elements */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={1} floatIntensity={0.3}>
          <mesh
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 3,
              Math.sin((i / 8) * Math.PI * 2) * 0.5,
              Math.sin((i / 8) * Math.PI * 2) * 2,
            ]}
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
