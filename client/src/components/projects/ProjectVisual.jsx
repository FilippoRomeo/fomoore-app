import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import MNISTThermal from '../MNISTThermal';

const SceneShell = ({ children }) => (
  <Canvas camera={{ position: [0, 0, 3.8], fov: 50 }} style={{ width: '100%', height: '100%' }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[3, 3, 3]} intensity={1} />
    <pointLight position={[-3, -2, -2]} intensity={0.4} color="#C87820" />
    {children}
    <Environment preset="city" />
  </Canvas>
);

const ApolloRocket = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    groupRef.current.rotation.y += 0.004;
  });

  return (
    <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.15}>
      <group ref={groupRef}>
        <mesh>
          <cylinderGeometry args={[0.28, 0.32, 1.4, 12]} />
          <meshStandardMaterial color="#C8C0B2" roughness={0.45} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.98, 0]}>
          <coneGeometry args={[0.28, 0.55, 12]} />
          <meshStandardMaterial color="#7A1C1C" roughness={0.4} metalness={0.25} />
        </mesh>
        {[0, 1, 2].map((fin) => {
          const angle = (fin / 3) * Math.PI * 2;
          return (
            <mesh
              key={fin}
              position={[Math.sin(angle) * 0.3, -0.58, Math.cos(angle) * 0.3]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[0.12, 0.45, 0.24]} />
              <meshStandardMaterial color="#7A1C1C" roughness={0.5} metalness={0.15} />
            </mesh>
          );
        })}
        <mesh position={[0, 0.25, 0.31]}>
          <torusGeometry args={[0.13, 0.035, 8, 24]} />
          <meshStandardMaterial color="#A8A4A0" roughness={0.25} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.25, 0.305]}>
          <circleGeometry args={[0.12, 24]} />
          <meshStandardMaterial color="#C87820" emissive="#C87820" emissiveIntensity={1.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.04, 8, 24]} />
          <meshStandardMaterial color="#7A1C1C" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const DistortedMesh = ({ geometry, color, emissive, emissiveIntensity, distort, speed }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.006;
  });

  return (
    <Float speed={1.6} floatIntensity={0.35} rotationIntensity={0.2}>
      <mesh ref={meshRef}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          distort={distort}
          speed={speed}
          roughness={0.28}
          metalness={0.45}
        />
      </mesh>
    </Float>
  );
};

const GlitchBox = () => (
  <DistortedMesh
    geometry={<icosahedronGeometry args={[1.1, 0]} />}
    color="#ec4899"
    emissive="#eab308"
    emissiveIntensity={0.35}
    distort={0.45}
    speed={2}
  />
);

const SprayOrb = () => (
  <DistortedMesh
    geometry={<sphereGeometry args={[1.1, 32, 32]} />}
    color="#8b5cf6"
    emissive="#3b82f6"
    emissiveIntensity={0.35}
    distort={0.35}
    speed={1.8}
  />
);

const SkinSuitVisual = () => (
  <DistortedMesh
    geometry={<torusKnotGeometry args={[0.8, 0.28, 120, 16]} />}
    color="#3b82f6"
    emissive="#ef4444"
    emissiveIntensity={0.25}
    distort={0.4}
    speed={2}
  />
);

const FallbackVisual = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.008;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.05, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
    </mesh>
  );
};

const ProjectVisual = ({ projectId, variant }) => {
  const resolvedVariant = variant || projectId;
  const scanlineClass = 'absolute inset-0 pointer-events-none scanline-overlay opacity-20';

  if (resolvedVariant === 'mnist' || projectId === 'mnist-classifier') {
    return (
      <div className="relative h-full w-full">
        <MNISTThermal />
      </div>
    );
  }

  let visual = <FallbackVisual />;
  let overlay = null;

  if (resolvedVariant === 'apollo-rocket' || projectId === 'kid-apollo') {
    visual = <ApolloRocket />;
  } else if (resolvedVariant === 'glitch-box' || projectId === 'glitch-bot') {
    visual = <GlitchBox />;
    overlay = <div className={scanlineClass} />;
  } else if (resolvedVariant === 'spray-orb' || projectId === 'spray-bot') {
    visual = <SprayOrb />;
    overlay = <div className={scanlineClass} />;
  } else if (resolvedVariant === 'skinsuit' || projectId === 'skinsuit') {
    visual = <SkinSuitVisual />;
  }

  return (
    <div className="relative h-full w-full">
      <SceneShell>{visual}</SceneShell>
      {overlay}
    </div>
  );
};

export default ProjectVisual;
