/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';
import Background from './EnhancedBackground';

interface SceneProps {
  className?: string
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} color="#4f46e5" intensity={0.3} />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000', 2, 8]} />
      
      {/* Main 3D background */}
      <Background />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

export default function Scene({ className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#000']} />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
} 