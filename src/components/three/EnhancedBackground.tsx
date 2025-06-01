/* eslint-disable react/no-unknown-property */
'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshTransmissionMaterial, Sphere } from '@react-three/drei';
import { Points as ThreePoints, Color, Vector3, Vector2 } from 'three';
import * as THREE from 'three';

// Advanced Morphing Geometries
function MorphingGeometries() {
  const groupRef = useRef<THREE.Group>(null);
  const [morphProgress, setMorphProgress] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      setMorphProgress(Math.sin(time * 0.5) * 0.5 + 0.5);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Morphing Crystal */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[-3, 2, -2]}>
          <dodecahedronGeometry args={[0.3 + morphProgress * 0.2, 1]} />
          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.05}
            backside={true}
            color={new Color(`hsl(${250 + morphProgress * 60}, 70%, 60%)`)}
            emissive={new Color(`hsl(${250 + morphProgress * 60}, 70%, 20%)`)}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Refractive Sphere */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere args={[0.25, 32, 32]} position={[3, -1, -1.5]}>
          <meshStandardMaterial
            color={new Color('#4f46e5')}
            emissive={new Color('#7c3aed')}
            emissiveIntensity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* Organic Blob */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.6}>
        <mesh position={[0, 1.5, -3]}>
          <icosahedronGeometry args={[0.4, 2]} />
          <meshStandardMaterial
            color={new Color(`hsl(${280 + morphProgress * 40}, 80%, 60%)`)}
            metalness={0.9}
            roughness={0.1}
            emissive={new Color(`hsl(${280 + morphProgress * 40}, 80%, 30%)`)}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Interactive Neural Network
function NeuralNetwork() {
  const pointsRef = useRef<ThreePoints>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const nodes = useMemo(() => {
    const nodeArray: Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      nodeArray.push(new Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      ));
    }
    return nodeArray;
  }, []);

  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3);
    const conn: number[] = [];
    
    nodes.forEach((node, i) => {
      pos[i * 3] = node.x;
      pos[i * 3 + 1] = node.y;
      pos[i * 3 + 2] = node.z;

      // Create connections to nearby nodes
      nodes.forEach((otherNode, j) => {
        if (i !== j && node.distanceTo(otherNode) < 1.5) {
          conn.push(node.x, node.y, node.z);
          conn.push(otherNode.x, otherNode.y, otherNode.z);
        }
      });
    });

    return { positions: pos, connections: new Float32Array(conn) };
  }, [nodes]);

  useFrame((state) => {
    if (pointsRef.current && lineRef.current) {
      const time = state.clock.elapsedTime;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      // Animate nodes with wave motion and mouse interaction
      for (let i = 0; i < nodes.length; i++) {
        const i3 = i * 3;
        const originalNode = nodes[i];
        
        const wave = Math.sin(time + originalNode.x) * 0.1;
        const mouseInfluence = (mouse.x * 0.5) * Math.exp(-originalNode.distanceTo(new Vector3(mouse.x * 3, mouse.y * 2, 0)) * 0.5);
        
        positions[i3] = originalNode.x + wave + mouseInfluence;
        positions[i3 + 1] = originalNode.y + Math.cos(time + originalNode.y) * 0.1;
        positions[i3 + 2] = originalNode.z + Math.sin(time * 0.5) * 0.05;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      lineRef.current.rotation.y = time * 0.01;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Network Nodes */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Network Connections */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          opacity={0.2}
          color="#00f0ff"
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// Enhanced Particle System with Fluid Dynamics
function FluidParticleSystem() {
  const pointsRef = useRef<ThreePoints>(null);
  const { mouse, size } = useThree();
  
  const particleCount = 15000;
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    
    const color1 = new Color('#4f46e5');
    const color2 = new Color('#7c3aed');
    const color3 = new Color('#ec4899');
    const color4 = new Color('#00f0ff');
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create fluid-like distribution
      const radius = Math.random() * 4 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      
      // Initialize velocities
      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Assign colors based on position
      const colorChoice = Math.random();
      let finalColor;
      if (colorChoice < 0.25) finalColor = color1;
      else if (colorChoice < 0.5) finalColor = color2;
      else if (colorChoice < 0.75) finalColor = color3;
      else finalColor = color4;
      
      cols[i3] = finalColor.r;
      cols[i3 + 1] = finalColor.g;
      cols[i3 + 2] = finalColor.b;
    }
    
    return { positions: pos, velocities: vel, colors: cols };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Fluid dynamics simulation
        const centerForce = new Vector3(x, y, z).normalize().multiplyScalar(-0.001);
        const turbulence = new Vector3(
          Math.sin(time * 0.5 + x * 0.1) * 0.002,
          Math.cos(time * 0.3 + y * 0.1) * 0.002,
          Math.sin(time * 0.7 + z * 0.1) * 0.002
        );
        
        // Mouse interaction
        const mouseForce = new Vector3(
          (mouse.x * size.width / 100) - x,
          (mouse.y * size.height / 100) - y,
          0
        ).normalize().multiplyScalar(0.0005);
        
        // Update velocities
        velocities[i3] += centerForce.x + turbulence.x + mouseForce.x;
        velocities[i3 + 1] += centerForce.y + turbulence.y + mouseForce.y;
        velocities[i3 + 2] += centerForce.z + turbulence.z + mouseForce.z;
        
        // Apply damping
        velocities[i3] *= 0.98;
        velocities[i3 + 1] *= 0.98;
        velocities[i3 + 2] *= 0.98;
        
        // Update positions
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Boundary wrapping
        if (Math.abs(positions[i3]) > 5) positions[i3] *= -0.8;
        if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= -0.8;
        if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -0.8;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.005;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Dynamic Holographic Grid
function HolographicGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new Vector2(0, 0) },
    uColor1: { value: new Color('#4f46e5') },
    uColor2: { value: new Color('#00f0ff') },
    uOpacity: { value: 0.15 }
  }), []);

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      float elevation = sin(pos.x * 0.5 + uTime) * 0.1 + sin(pos.z * 0.5 + uTime * 0.7) * 0.1;
      elevation += sin(distance(pos.xz, uMouse * 10.0) * 0.5 - uTime * 2.0) * 0.2;
      
      pos.y += elevation;
      vElevation = elevation;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  
  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uOpacity;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vec3 color = mix(uColor1, uColor2, vElevation + 0.5);
      float alpha = uOpacity * (1.0 - distance(vUv, vec2(0.5)) * 2.0);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (gridRef.current && materialRef.current) {
      const time = state.clock.elapsedTime;
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uMouse.value.set(state.mouse.x, state.mouse.y);
      
      gridRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
      gridRef.current.rotation.z = Math.cos(time * 0.15) * 0.02;
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, -4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 50, 50]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function EnhancedBackground() {
  return (
    <group>
      {/* Advanced particle systems */}
      <FluidParticleSystem />
      
      {/* Interactive neural network */}
      <NeuralNetwork />
      
      {/* Morphing geometries */}
      <MorphingGeometries />
      
      {/* Holographic grid */}
      <HolographicGrid />
      
      {/* Enhanced ambient lighting */}
      <pointLight position={[2, 2, 2]} intensity={0.4} color="#4f46e5" />
      <pointLight position={[-2, -2, -2]} intensity={0.4} color="#7c3aed" />
      <pointLight position={[0, 0, 2]} intensity={0.3} color="#00f0ff" />
      <spotLight 
        position={[0, 5, 0]} 
        angle={0.6} 
        penumbra={1} 
        intensity={0.5} 
        color="#ec4899"
        distance={8}
        decay={2}
      />
    </group>
  );
}
