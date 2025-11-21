import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, TorusKnot, Icosahedron, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ThermalObject = ({ shape }) => {
    const meshRef = useRef();
    const [glitchActive, setGlitchActive] = useState(false);
    const [glitchIntensity, setGlitchIntensity] = useState(0);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

            // Trigger glitch effect periodically based on rotation
            // Simulate "intersection" when rotation crosses certain angles
            const rotationPhase = (state.clock.elapsedTime * 0.3) % (Math.PI * 2);
            const shouldGlitch = Math.sin(rotationPhase * 4) > 0.95; // Glitch at specific rotation points

            if (shouldGlitch && !glitchActive) {
                setGlitchActive(true);
                setGlitchIntensity(Math.random());
                setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
            }

            // Apply glitch distortion
            if (glitchActive && meshRef.current) {
                meshRef.current.position.x = (Math.random() - 0.5) * 0.1 * glitchIntensity;
                meshRef.current.position.y = (Math.random() - 0.5) * 0.1 * glitchIntensity;
                meshRef.current.scale.setScalar(1 + (Math.random() - 0.5) * 0.1 * glitchIntensity);
            } else if (meshRef.current) {
                meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
                meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
                meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
            }
        }
    });

    const materialProps = {
        color: "#4f46e5",
        emissive: "#f59e0b",
        emissiveIntensity: glitchActive ? 1.5 : 0.5,
        roughness: 0.2,
        metalness: 1,
        distort: glitchActive ? 0.8 : 0.4,
        speed: glitchActive ? 8 : 2
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {shape === 'knot' && (
                <TorusKnot args={[1, 0.3, 128, 16]} ref={meshRef}>
                    <MeshDistortMaterial
                        {...materialProps}
                        color={glitchActive ? "#ff0000" : "#3b82f6"}
                        emissive={glitchActive ? "#00ff00" : "#ef4444"}
                    />
                </TorusKnot>
            )}
            {shape === 'sphere' && (
                <Sphere args={[1.2, 32, 32]} ref={meshRef}>
                    <MeshDistortMaterial
                        {...materialProps}
                        color={glitchActive ? "#00ff00" : "#8b5cf6"}
                        emissive={glitchActive ? "#ff00ff" : "#3b82f6"}
                        distort={glitchActive ? 1.2 : 0.6}
                    />
                </Sphere>
            )}
            {shape === 'box' && (
                <Icosahedron args={[1.2, 0]} ref={meshRef}>
                    <MeshDistortMaterial
                        {...materialProps}
                        color={glitchActive ? "#ffff00" : "#ec4899"}
                        emissive={glitchActive ? "#00ffff" : "#eab308"}
                        distort={glitchActive ? 0.9 : 0.3}
                        speed={glitchActive ? 12 : 4}
                    />
                </Icosahedron>
            )}
        </Float>
    );
};

const ThermalModel = ({ shape = 'knot' }) => {
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

                <ThermalObject shape={shape} />

                <Environment preset="city" />
            </Canvas>

            {/* Overlay for "Scan" effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
        </div>
    );
};

export default ThermalModel;
