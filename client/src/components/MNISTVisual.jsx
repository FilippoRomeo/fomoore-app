import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlitchCube = ({ position, index }) => {
    const meshRef = useRef();
    const [scale, setScale] = React.useState(1);
    const [color, setColor] = React.useState('#22c55e');

    useFrame((state) => {
        if (!meshRef.current) return;

        // Rotate
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + index * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index * 0.2;

        // Random glitch
        if (Math.random() > 0.98) {
            setScale(0.5 + Math.random() * 0.8);
            setColor(Math.random() > 0.5 ? '#22c55e' : '#ef4444');

            setTimeout(() => {
                setScale(1);
                setColor('#22c55e');
            }, 100);
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                wireframe={Math.random() > 0.7}
            />
        </mesh>
    );
};

const MNISTVisual = () => {
    const cubePositions = useMemo(() => {
        const positions = [];
        const gridSize = 4;
        const spacing = 2.5;

        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                for (let z = 0; z < 2; z++) {
                    positions.push([
                        (x - gridSize / 2) * spacing,
                        (y - gridSize / 2) * spacing,
                        (z - 0.5) * spacing
                    ]);
                }
            }
        }
        return positions;
    }, []);

    return (
        <div className="w-full h-full relative bg-black">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#22c55e" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ef4444" />
                <pointLight position={[0, 0, 10]} intensity={1.5} color="#ffffff" />

                {cubePositions.map((pos, idx) => (
                    <GlitchCube key={idx} position={pos} index={idx} />
                ))}

                <fog attach="fog" args={['#000000', 10, 25]} />
            </Canvas>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]"></div>
        </div>
    );
};

export default MNISTVisual;
