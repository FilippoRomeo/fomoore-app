import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

const Terrain = () => {
    const meshRef = useRef();
    const { mouse, viewport } = useThree();

    // Generate initial vertices
    const { geometry, initialPositions, colors } = useMemo(() => {
        const size = 128;
        const segments = 64;
        const geo = new THREE.PlaneGeometry(size, size, segments, segments);
        const count = geo.attributes.position.count;
        const pos = geo.attributes.position;
        const initialPos = new Float32Array(count * 3);
        const cols = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2 + Math.random() * 0.5;

            pos.setZ(i, z);
            initialPos[i * 3] = x;
            initialPos[i * 3 + 1] = y;
            initialPos[i * 3 + 2] = z; // Store initial Z

            // Color
            const color = new THREE.Color();
            if (z > 1) color.set('#22c55e');
            else if (z < -1) color.set('#ef4444');
            else color.set('#afe90eff');

            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;
        }

        geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
        return { geometry: geo, initialPositions: initialPos, colors: cols };
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        const pos = meshRef.current.geometry.attributes.position;
        const count = pos.count;

        // Mouse interaction
        // Convert mouse screen coords (-1 to 1) to world coords roughly
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const x = initialPositions[i * 3];
            const y = initialPositions[i * 3 + 1];
            const initialZ = initialPositions[i * 3 + 2];

            // Distance to mouse (projected on plane)
            // We need to account for the mesh rotation (-Math.PI/2 on X)
            // The mesh X is World X. The mesh Y is World -Z.
            // So we compare Mesh X with Mouse X, and Mesh Y with Mouse Y (roughly, since camera is tilted/positioned)

            const dx = x - mouseX * 20; // Scale factor for mouse influence area
            const dy = y - mouseY * 20;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Multiple wave patterns for organic movement
            let z = initialZ;
            z += Math.sin(x * 0.15 + time * 2) * 0.8; // Wave 1
            z += Math.cos(y * 0.15 + time * 1.5) * 0.8; // Wave 2
            z += Math.sin((x + y) * 1 + time * 3) * 0.5; // Diagonal wave
            z += Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2) * 0.4;
            z += Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2) * 0.6; // Radial wave
            z += Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2) * 0.8;
            // Mouse interaction: Ripple/Push
            if (dist < 15) {
                const force = (15 - dist) / 15;
                z += Math.sin(dist * 0.5 - time * 5) * force * 5; // Ripple
            }

            pos.setZ(i, z);
        }

        pos.needsUpdate = true;

        // Keep mesh position FIXED - no forward movement
        // meshRef.current.position stays at [0, 0, -10]
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
            <primitive object={geometry} attach="geometry" />
            <meshBasicMaterial
                vertexColors
                wireframe
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const Particles = () => {
    const count = 1000;
    const mesh = useRef();

    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 100; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
        }
        return pos;
    });

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
        mesh.current.rotation.z = state.clock.elapsedTime * 0.02;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.5}
                color="#22c55e"
                transparent
                opacity={0.9}
                sizeAttenuation
            />
        </points>
    );
};

const TechBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
                <fog attach="fog" args={['#000000', 5, 40]} />

                {/* Main Interactive Terrain */}
                <Terrain />

                {/* Additional Grid Layers for Depth */}
                {/* Vertical Grid Wall - Left */}
                <mesh rotation={[0, Math.PI / 4, 0]} position={[-30, 0, -20]}>
                    <planeGeometry args={[60, 60, 30, 30]} />
                    <meshBasicMaterial
                        color="#22c55e"
                        wireframe
                        transparent
                        opacity={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Vertical Grid Wall - Right */}
                <mesh rotation={[0, -Math.PI / 4, 0]} position={[30, 0, -20]}>
                    <planeGeometry args={[60, 60, 30, 30]} />
                    <meshBasicMaterial
                        color="#ef4444"
                        wireframe
                        transparent
                        opacity={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Ceiling Grid */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 20, 0]}>
                    <planeGeometry args={[100, 100, 40, 40]} />
                    <meshBasicMaterial
                        color="#1c61c1ff"
                        wireframe
                        transparent
                        opacity={0.15}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Background Grid Wall */}
                <mesh rotation={[0, 0, 0]} position={[0, 0, -50]}>
                    <planeGeometry args={[120, 80, 50, 40]} />
                    <meshBasicMaterial
                        color="#22c55e"
                        wireframe
                        transparent
                        opacity={0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                <Particles />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-30"></div>
        </div>
    );
};

export default TechBackground;
