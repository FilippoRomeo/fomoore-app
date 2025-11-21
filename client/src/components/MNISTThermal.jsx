import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ThermalDigit = ({ digit, position, index }) => {
    const meshRef = useRef();
    const [glitchActive, setGlitchActive] = useState(false);
    const [currentDigit, setCurrentDigit] = useState(digit);

    // Create canvas texture with digit
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'transparent';
        ctx.clearRect(0, 0, 128, 128);
        ctx.font = 'bold 100px Arial';
        ctx.fillStyle = glitchActive ? '#ef4444' : '#3b82f6';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentDigit.toString(), 64, 64);

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, [currentDigit, glitchActive]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index * 0.2;

            // Glitch effect - randomly change digit
            const rotationPhase = (state.clock.elapsedTime * 0.3 + index) % (Math.PI * 2);
            const shouldGlitch = Math.sin(rotationPhase * 4) > 0.95;

            if (shouldGlitch && !glitchActive) {
                setGlitchActive(true);
                setCurrentDigit(Math.floor(Math.random() * 10));
                setTimeout(() => {
                    setGlitchActive(false);
                    setCurrentDigit(digit);
                }, 100 + Math.random() * 200);
            }

            // Apply glitch distortion
            if (glitchActive && meshRef.current) {
                meshRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.2;
                meshRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.2;
            } else if (meshRef.current) {
                meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0], 0.1);
                meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1);
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh ref={meshRef} position={position}>
                <planeGeometry args={[1.2, 1.2]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    side={THREE.DoubleSide}
                    emissive={glitchActive ? "#00ff00" : "#f59e0b"}
                    emissiveIntensity={glitchActive ? 1.5 : 0.5}
                    roughness={0.2}
                    metalness={1}
                />
            </mesh>
        </Float>
    );
};

const MNISTThermal = () => {
    const digitPositions = useMemo(() => {
        const positions = [];
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const radius = 3;

        digits.forEach((digit, i) => {
            const angle = (i / digits.length) * Math.PI * 2;
            positions.push({
                digit,
                position: [
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    (Math.random() - 0.5) * 2
                ],
                index: i
            });
        });

        return positions;
    }, []);

    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />

                {digitPositions.map(({ digit, position, index }) => (
                    <ThermalDigit
                        key={index}
                        digit={digit}
                        position={position}
                        index={index}
                    />
                ))}

                <Environment preset="city" />
            </Canvas>

            {/* Overlay for "Scan" effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
        </div>
    );
};

export default MNISTThermal;
