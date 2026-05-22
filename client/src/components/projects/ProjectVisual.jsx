import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, TorusKnot, Icosahedron, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ThermalObject = ({ geometry, colors }) => {
  const meshRef = useRef();
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

    const rotationPhase = (state.clock.elapsedTime * 0.3) % (Math.PI * 2);
    const shouldGlitch = Math.sin(rotationPhase * 4) > 0.95;

    if (shouldGlitch && !glitchActive) {
      setGlitchActive(true);
      setGlitchIntensity(Math.random());
      setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
    }

    if (glitchActive) {
      meshRef.current.position.x = (Math.random() - 0.5) * 0.1 * glitchIntensity;
      meshRef.current.position.y = (Math.random() - 0.5) * 0.1 * glitchIntensity;
      meshRef.current.scale.setScalar(1 + (Math.random() - 0.5) * 0.1 * glitchIntensity);
    } else {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
    }
  });

  const materialProps = {
    color: colors.base,
    emissive: colors.emissive,
    emissiveIntensity: glitchActive ? 1.5 : 0.5,
    roughness: 0.2,
    metalness: 1,
    distort: glitchActive ? colors.glitchDistort : colors.distort,
    speed: glitchActive ? colors.glitchSpeed : colors.speed
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {geometry === 'skinsuit' && (
        <Icosahedron args={[1.2, 1]} ref={meshRef}>
          <MeshDistortMaterial
            {...materialProps}
            color={glitchActive ? colors.glitchColor : colors.base}
            emissive={glitchActive ? colors.glitchEmissive : colors.emissive}
          />
        </Icosahedron>
      )}
      {geometry === 'glitch-box' && (
        <Icosahedron args={[1.2, 0]} ref={meshRef}>
          <MeshDistortMaterial
            {...materialProps}
            color={glitchActive ? colors.glitchColor : colors.base}
            emissive={glitchActive ? colors.glitchEmissive : colors.emissive}
          />
        </Icosahedron>
      )}
      {geometry === 'spray-orb' && (
        <Sphere args={[1.2, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial
            {...materialProps}
            color={glitchActive ? colors.glitchColor : colors.base}
            emissive={glitchActive ? colors.glitchEmissive : colors.emissive}
          />
        </Sphere>
      )}
      {geometry === 'mnist' && (
        <TorusKnot args={[1, 0.3, 128, 16]} ref={meshRef}>
          <MeshDistortMaterial
            {...materialProps}
            color={glitchActive ? colors.glitchColor : colors.base}
            emissive={glitchActive ? colors.glitchEmissive : colors.emissive}
          />
        </TorusKnot>
      )}
      {geometry === 'apollo-rocket' && (
        <TorusKnot args={[0.9, 0.35, 128, 16]} ref={meshRef}>
          <MeshDistortMaterial
            {...materialProps}
            color={glitchActive ? colors.glitchColor : colors.base}
            emissive={glitchActive ? colors.glitchEmissive : colors.emissive}
          />
        </TorusKnot>
      )}
    </Float>
  );
};

const SkinSuitVisual = () => (
  <div className="w-full h-full relative">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

      <ThermalObject
        geometry="skinsuit"
        colors={{
          base: '#4f46e5',
          emissive: '#f59e0b',
          glitchColor: '#ff0000',
          glitchEmissive: '#00ff00',
          distort: 0.35,
          glitchDistort: 0.9,
          speed: 3,
          glitchSpeed: 12
        }}
      />

      <Environment preset="city" />
    </Canvas>

    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
  </div>
);

const GlitchBox = () => (
  <div className="w-full h-full relative">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

      <ThermalObject
        geometry="glitch-box"
        colors={{
          base: '#ec4899',
          emissive: '#eab308',
          glitchColor: '#ffff00',
          glitchEmissive: '#00ffff',
          distort: 0.3,
          glitchDistort: 0.9,
          speed: 4,
          glitchSpeed: 12
        }}
      />

      <Environment preset="city" />
    </Canvas>

    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
  </div>
);

const SprayOrb = () => (
  <div className="w-full h-full relative">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

      <ThermalObject
        geometry="spray-orb"
        colors={{
          base: '#8b5cf6',
          emissive: '#3b82f6',
          glitchColor: '#00ff00',
          glitchEmissive: '#ff00ff',
          distort: 0.6,
          glitchDistort: 1.2,
          speed: 2,
          glitchSpeed: 8
        }}
      />

      <Environment preset="city" />
    </Canvas>

    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
  </div>
);

const MNISTVisual = () => {
  const [currentDigit, setCurrentDigit] = useState('4');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDigit((digit) => {
        let nextDigit = digit;

        while (nextDigit === digit) {
          nextDigit = String(Math.floor(Math.random() * 10));
        }

        return nextDigit;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

        <ThermalObject
          geometry="mnist"
          colors={{
            base: '#3b82f6',
            emissive: '#ef4444',
            glitchColor: '#ff0000',
            glitchEmissive: '#00ff00',
            distort: 0.4,
            glitchDistort: 0.8,
            speed: 2,
            glitchSpeed: 8
          }}
        />

        <Environment preset="city" />
      </Canvas>

      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 10
      }}>
        <span style={{
          fontFamily: 'monospace', fontSize: '5rem', fontWeight: 900,
          color: '#22c55e', opacity: 0.18, lineHeight: 1,
          textShadow: '0 0 30px #22c55e',
          userSelect: 'none'
        }}>
          {currentDigit}
        </span>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
    </div>
  );
};

const ApolloRocket = () => (
  <div className="w-full h-full relative">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

      <ThermalObject
        geometry="apollo-rocket"
        colors={{
          base: '#C8C0B2',
          emissive: '#C87820',
          glitchColor: '#ff4400',
          glitchEmissive: '#ffaa00',
          distort: 0.25,
          glitchDistort: 0.7,
          speed: 2,
          glitchSpeed: 8
        }}
      />

      <Environment preset="city" />
    </Canvas>

    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
  </div>
);

const FallbackVisual = () => (
  <div className="w-full h-full relative">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

      <ThermalObject
        geometry="glitch-box"
        colors={{
          base: '#ffffff',
          emissive: '#22c55e',
          glitchColor: '#ffff00',
          glitchEmissive: '#00ffff',
          distort: 0.15,
          glitchDistort: 0.5,
          speed: 2,
          glitchSpeed: 8
        }}
      />

      <Environment preset="city" />
    </Canvas>

    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
  </div>
);

const ProjectVisual = ({ projectId, variant }) => {
  const resolvedVariant = variant || projectId;

  let visual = <FallbackVisual />;

  if (resolvedVariant === 'apollo-rocket' || projectId === 'kid-apollo') {
    visual = <ApolloRocket />;
  } else if (resolvedVariant === 'glitch-box' || projectId === 'glitch-bot') {
    visual = <GlitchBox />;
  } else if (resolvedVariant === 'spray-orb' || projectId === 'spray-bot') {
    visual = <SprayOrb />;
  } else if (resolvedVariant === 'skinsuit' || projectId === 'skinsuit') {
    visual = <SkinSuitVisual />;
  } else if (resolvedVariant === 'mnist' || projectId === 'mnist-classifier') {
    visual = <MNISTVisual />;
  }

  return (
    <div className="relative h-full w-full">
      {visual}
    </div>
  );
};

export default ProjectVisual;
