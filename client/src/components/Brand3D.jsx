import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { EffectComposer, Glitch, Noise, ChromaticAberration, Scanline, Bloom } from '@react-three/postprocessing';

// --- Configuration ---
const FONT_URL = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';
const GLYPHS = '0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const COLOR_REVEALED = '#ffffff';
const COLOR_HIDDEN = '#22c55e'; // Green
const HOVER_RADIUS = 1.5; // Radius in world units for the "flashlight"

const DecipherChar = ({ char, position, mousePos }) => {
  const groupRef = useRef();
  const [displayChar, setDisplayChar] = useState(char);
  const [isRevealed, setIsRevealed] = useState(false);

  // Random offset for "floating" glitch
  const randomOffset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // 1. Calculate distance to mouse ray
    const dist = mousePos.current.distanceTo(groupRef.current.position);
    const revealed = dist < HOVER_RADIUS;

    if (revealed !== isRevealed) {
      setIsRevealed(revealed);
    }

    // 2. Glitch Logic
    if (revealed) {
      // Stable
      if (displayChar !== char) setDisplayChar(char);

      // Smoothly reset position/rotation
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);

    } else {
      // Chaos
      if (state.clock.elapsedTime % 0.1 < 0.05) {
        setDisplayChar(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }

      // Jitter
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, Math.sin(state.clock.elapsedTime * 10 + randomOffset) * 0.5, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(state.clock.elapsedTime * 5 + randomOffset) * 0.5, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        font={FONT_URL}
        fontSize={1.8}
        letterSpacing={-0.5}
        anchorX="center"
        anchorY="middle"
      >
        {displayChar}
        <meshStandardMaterial
          color={isRevealed ? COLOR_REVEALED : COLOR_HIDDEN}
          emissive={isRevealed ? COLOR_REVEALED : COLOR_HIDDEN}
          emissiveIntensity={isRevealed ? 0.5 : 2}
          toneMapped={false}
        />
      </Text>
    </group>
  );
};

const Scene = () => {
  const { viewport, camera, pointer } = useThree();
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const planeRef = useRef();

  // Update mouse position in 3D space
  useFrame(() => {
    if (planeRef.current) {
      // Raycast to the invisible plane at Z=0
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        // Smoothly interpolate for less jittery feel
        mousePos.current.lerp(intersects[0].point, 0.2);
      }
    }
  });

  // Responsive layout
  const scale = Math.min(viewport.width / 12, 1);

  const line1 = "FILIPPO";
  const line2 = "ROMEO";

  const spacing = 1.0;

  return (
    <group scale={[scale, scale, scale]}>

      {/* Invisible Plane for Raycasting */}
      <mesh ref={planeRef} visible={false} position={[0, 0, 0]}>
        <planeGeometry args={[20, 10]} />
      </mesh>

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Line 1 */}
        <group position={[0, 0.8, 0]}>
          {line1.split('').map((char, i) => (
            <DecipherChar
              key={`l1-${i}`}
              char={char}
              position={[(i - (line1.length - 1) / 2) * spacing, 0, 0]}
              mousePos={mousePos}
            />
          ))}
        </group>

        {/* Line 2 */}
        <group position={[0, -0.8, 0]}>
          {line2.split('').map((char, i) => (
            <DecipherChar
              key={`l2-${i}`}
              char={char}
              position={[(i - (line2.length - 1) / 2) * spacing, 0, 0]}
              mousePos={mousePos}
            />
          ))}
        </group>
      </Float>

      <Sparkles count={30} scale={12} size={3} speed={0.4} opacity={0.2} color={COLOR_HIDDEN} />
    </group>
  );
};

const Brand3D = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative z-20 cursor-crosshair">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={COLOR_HIDDEN} />

        <React.Suspense fallback={<mesh position={[0, 0, 0]}><boxGeometry /><meshBasicMaterial color="red" /></mesh>}>
          <Scene />
        </React.Suspense>

        {/* <EffectComposer>
            <Glitch 
                delay={[1.5, 3.5]} 
                duration={[0.6, 1.0]} 
                strength={[0.3, 1.0]} 
                mode={THREE.Vector2.GlitchMode.SPORADIC} 
                active 
                ratio={0.85} 
            />
            <ChromaticAberration 
                offset={[0.002, 0.002]} 
                radialModulation={false}
                modulationOffset={0}
            />
            <Noise opacity={0.1} />
            <Scanline density={1.5} opacity={0.05} />
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
        </EffectComposer> */}
      </Canvas>

      <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
        <p className="text-[10px] font-mono text-green-500/50 tracking-widest animate-pulse">
          HOVER TO DECRYPT
        </p>
      </div>
    </div>
  );
};

export default Brand3D;
