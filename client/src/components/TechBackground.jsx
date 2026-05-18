import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Terrain = () => {
    const lineRef = useRef();
    const { mouse, viewport } = useThree();
    const tempColor = useMemo(() => new THREE.Color(), []);

    const { positions, colors, meta, totalVertices } = useMemo(() => {
        const size = 128;
        const segments = 64;
        const step = size / segments;
        const half = size / 2;

        const lineCount = (segments + 1) * segments * 2;
        const totalVertices = lineCount * 2;

        const positions = new Float32Array(totalVertices * 3);
        const colors = new Float32Array(totalVertices * 3);
        const meta = [];

        let ptr = 0;

        const pushSegment = (x1, y1, x2, y2, stringId, direction) => {
            positions[ptr * 3] = x1;
            positions[ptr * 3 + 1] = y1;
            positions[ptr * 3 + 2] = 0;

            colors[ptr * 3] = 1;
            colors[ptr * 3 + 1] = 1;
            colors[ptr * 3 + 2] = 1;

            meta.push({ x: x1, y: y1, stringId, direction });
            ptr++;

            positions[ptr * 3] = x2;
            positions[ptr * 3 + 1] = y2;
            positions[ptr * 3 + 2] = 0;

            colors[ptr * 3] = 1;
            colors[ptr * 3 + 1] = 1;
            colors[ptr * 3 + 2] = 1;

            meta.push({ x: x2, y: y2, stringId, direction });
            ptr++;
        };

        // Horizontal strings
        for (let row = 0; row <= segments; row++) {
            const y = -half + row * step;

            for (let col = 0; col < segments; col++) {
                const x1 = -half + col * step;
                const x2 = x1 + step;

                pushSegment(x1, y, x2, y, row, "horizontal");
            }
        }

        // Vertical strings
        for (let col = 0; col <= segments; col++) {
            const x = -half + col * step;

            for (let row = 0; row < segments; row++) {
                const y1 = -half + row * step;
                const y2 = y1 + step;

                pushSegment(x, y1, x, y2, col + 1000, "vertical");
            }
        }

        return { positions, colors, meta, totalVertices };
    }, []);

    useFrame((state) => {
        if (!lineRef.current) return;

        const time = state.clock.elapsedTime;

        // lineRef.current.rotation.x = -Math.PI / 2;
        // lineRef.current.rotation.z = Math.sin(time * 0.12) * 0.08;
        // lineRef.current.rotation.y = time * 0.03;
        lineRef.current.rotation.x = -Math.PI / 2;
lineRef.current.rotation.y = Math.sin(time * 0.18) * 0.18;
lineRef.current.rotation.z = time * 0.035;
        const geometry = lineRef.current.geometry;
        const posAttr = geometry.attributes.position;
        const colorAttr = geometry.attributes.color;

        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < totalVertices; i++) {
            const { x, y, stringId, direction } = meta[i];

            const dx = x - mouseX * 20;
            const dy = y - mouseY * 20;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2;

            z += Math.sin(x * 0.15 + time * 2) * 0.8;
            z += Math.cos(y * 0.15 + time * 1.5) * 0.8;
            z += Math.sin((x + y) * 0.4 + time * 3) * 0.5;
            z += Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 2) * 0.8;

            if (dist < 15) {
                const force = (15 - dist) / 15;
                z += Math.sin(dist * 0.5 - time * 5) * force * 5;
            }

            const twistAmount = Math.sin(time * 0.5) * 0.8;
            const twist = y * 0.015 * twistAmount;

            const cosT = Math.cos(twist);
            const sinT = Math.sin(twist);

            const twistedX = x * cosT - z * sinT;
            const twistedZ = x * sinT + z * cosT;

            posAttr.setX(i, twistedX);
            posAttr.setY(i, y);
            posAttr.setZ(i, twistedZ);

            const stringOffset = stringId * 0.017;
            const directionalOffset = direction === "horizontal" ? 0 : 0.18;

            const hue =
                (
                    time * 0.035 +
                    stringOffset +
                    directionalOffset +
                    Math.sin(time * 0.5 + stringId * 0.2) * 0.04
                ) % 1;

            tempColor.setHSL(hue, 0.9, 0.55);

            colorAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
        }

        posAttr.needsUpdate = true;
        colorAttr.needsUpdate = true;
    });

    return (
        <lineSegments ref={lineRef} position={[0, 0, -10]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={totalVertices}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={totalVertices}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>

            <lineBasicMaterial
                vertexColors
                transparent
                opacity={0.7}
            />
        </lineSegments>
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

        const time = state.clock.elapsedTime;

        mesh.current.rotation.y = time * 0.05;
        mesh.current.rotation.z = time * 0.02;

        mesh.current.material.color.setHSL((time * 0.05) % 1, 0.9, 0.55);
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
