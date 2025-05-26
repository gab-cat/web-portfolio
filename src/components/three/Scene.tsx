/* eslint-disable react/no-unknown-property */
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Background from './Background';

interface SceneProps {
  className?: string
}

export default function Scene({ className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <color attach="background" args={['#000']} />
        <fog attach="fog" args={['#000', 3, 6]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Background />
      </Canvas>
    </div>
  );
} 