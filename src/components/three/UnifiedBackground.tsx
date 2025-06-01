/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Vector3, Color } from 'three';

// Enhanced Galaxy Background with slower movement
function GalaxyBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 12000;
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const szs = new Float32Array(particleCount);
    
    const color1 = new Color('#4f46e5');
    const color2 = new Color('#7c3aed');
    const color3 = new Color('#ec4899');
    const color4 = new Color('#00f0ff');
    const color5 = new Color('#8b5cf6');
    
    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy pattern
      const radius = Math.random() * 8 + 2;
      const angle = Math.random() * Math.PI * 2;
      const spiralAngle = radius * 0.3;
      
      pos[i * 3] = Math.cos(angle + spiralAngle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle + spiralAngle) * radius;
      
      // Assign colors based on distance from center
      const distanceFromCenter = radius / 10;
      let color;
      if (distanceFromCenter < 0.3) {
        color = color1;
      } else if (distanceFromCenter < 0.5) {
        color = color2;
      } else if (distanceFromCenter < 0.7) {
        color = color3;
      } else if (distanceFromCenter < 0.9) {
        color = color4;
      } else {
        color = color5;
      }
      
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
      
      szs[i] = Math.random() * 0.5 + 0.1;
    }
    
    return { positions: pos, colors: cols, sizes: szs };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Significantly slower rotation for more subtle effect
      pointsRef.current.rotation.y += 0.0001; // Much slower than before
      pointsRef.current.rotation.x += 0.00005;
      
      // Very gentle floating motion
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Points 
      ref={pointsRef} 
      positions={positions} 
      colors={colors} 
      sizes={sizes}
      stride={3} 
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.003}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

// Floating Geometric Elements
function FloatingGeometries() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.02; // Much slower rotation
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[3, 2, -5]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial 
            color="#4f46e5" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[-4, -1, -6]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color="#7c3aed" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[2, -3, -4]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial 
            color="#ec4899" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.1}>
        <mesh position={[-2, 4, -7]}>
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial 
            color="#00f0ff" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

// Neural Network Connections
function NeuralConnections() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const nodeCount = 30;
    const nodes: Vector3[] = [];
    const connections: number[] = [];
    const lineColors: number[] = [];

    // Generate nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 3
      ));
    }

    // Generate connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 2.5 && Math.random() > 0.7) {
          connections.push(nodes[i].x, nodes[i].y, nodes[i].z);
          connections.push(nodes[j].x, nodes[j].y, nodes[j].z);
          
          // Add colors for the line
          const intensity = Math.random() * 0.5 + 0.1;
          lineColors.push(0.3, 0.4, 0.9, intensity); // Blue
          lineColors.push(0.5, 0.2, 0.8, intensity); // Purple
        }
      }
    }

    return {
      positions: new Float32Array(connections),
      colors: new Float32Array(lineColors)
    };
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.elapsedTime;
      linesRef.current.rotation.y = time * 0.02; // Very slow rotation
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 4]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

interface UnifiedBackgroundProps {
  className?: string;
}

function BackgroundContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={false}
      />
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
      <pointLight position={[-5, -5, -3]} color="#4f46e5" intensity={0.2} />
      <pointLight position={[5, 5, 3]} color="#ec4899" intensity={0.2} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000011', 3, 12]} />
      
      {/* Background elements */}
      <GalaxyBackground />
      <FloatingGeometries />
      <NeuralConnections />
      
      {/* Enhanced post-processing */}
      <EffectComposer>
        <Bloom 
          intensity={0.3} 
          luminanceThreshold={0.9} 
          luminanceSmoothing={0.9} 
          height={300}
        />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
        <Noise opacity={0.015} />
        <Vignette eskil={false} offset={0.05} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function UnifiedBackground({ className }: UnifiedBackgroundProps) {
  return (
    <div className={`fixed inset-0 ${className}`} style={{ zIndex: 0 }}>
      <Canvas 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000011']} />
        <Suspense fallback={null}>
          <BackgroundContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
