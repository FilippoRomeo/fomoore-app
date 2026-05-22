import React, { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import {
  FALLBACK_PORTHOLE_OFFSET,
  FALLBACK_ROCKET_POSITION,
  FALLBACK_ROCKET_ROTATION,
  FALLBACK_ROCKET_SCALE,
  ROCKET_PROXY_URL,
} from "../data/rocketProxy.js";

function Starfield() {
  const positions = useMemo(() => {
    const points = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i += 1) {
      points[i * 3] = (Math.random() - 0.5) * 9;
      points[i * 3 + 1] = (Math.random() - 0.5) * 6;
      points[i * 3 + 2] = -1 - Math.random() * 6;
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#eee5d3"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function MiniPorthole({ motionEnabled }) {
  const glowRef = useRef();

  useFrame(({ clock }) => {
    if (!glowRef.current || !motionEnabled) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.8) * 0.12;
    glowRef.current.scale.setScalar(pulse);
    glowRef.current.material.opacity = 0.38 + Math.sin(t * 1.8) * 0.16;
  });

  return (
    <group position={[0, FALLBACK_PORTHOLE_OFFSET.y, FALLBACK_PORTHOLE_OFFSET.z]}>
      <mesh>
        <torusGeometry args={[0.3, 0.055, 16, 48]} />
        <meshStandardMaterial color="#c87820" metalness={0.82} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <ringGeometry args={[0.21, 0.27, 48]} />
        <meshStandardMaterial color="#17130f" roughness={0.62} />
      </mesh>
      <mesh position={[0, 0, 0.024]}>
        <circleGeometry args={[0.22, 48]} />
        <meshStandardMaterial color="#20150d" emissive="#c87820" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.038]}>
        <circleGeometry args={[0.27, 48]} />
        <meshBasicMaterial color="#eee5d3" transparent opacity={0.26} />
      </mesh>
      <mesh ref={glowRef} position={[0, 0, -0.01]}>
        <ringGeometry args={[0.3, 0.48, 48]} />
        <meshBasicMaterial color="#c87820" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function RocketObj({ rocketUrl, onReady }) {
  const obj = useLoader(OBJLoader, rocketUrl);

  const model = useMemo(() => {
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: "#b0aba6",
      metalness: 0.72,
      roughness: 0.24,
    });
    const redMaterial = new THREE.MeshStandardMaterial({
      color: "#6e1818",
      metalness: 0.08,
      roughness: 0.42,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: "#17130f",
      metalness: 0.08,
      roughness: 0.82,
    });

    const clone = obj.clone(true);
    clone.traverse((child) => {
      if (!child.isMesh) return;
      const name = child.name.toLowerCase();
      child.material = /red|fin|nose|cap|stripe|accent/.test(name)
        ? redMaterial
        : /base|rubber|ring|black|tire/.test(name)
          ? darkMaterial
          : chromeMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    });
    return clone;
  }, [obj]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return <primitive object={model} />;
}

class RocketErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function PosterRocket({ rocketUrl, motionEnabled, onReady, onError }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current || !motionEnabled) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = FALLBACK_ROCKET_POSITION[1] + Math.sin(t * 0.5) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.07;
    groupRef.current.rotation.z = Math.sin(t * 0.48) * 0.025;
  });

  return (
    <group
      ref={groupRef}
      scale={FALLBACK_ROCKET_SCALE}
      position={FALLBACK_ROCKET_POSITION}
      rotation={FALLBACK_ROCKET_ROTATION}
    >
      <RocketErrorBoundary onError={onError} resetKey={rocketUrl}>
        <Suspense fallback={null}>
          <RocketObj rocketUrl={rocketUrl} onReady={onReady} />
        </Suspense>
      </RocketErrorBoundary>
      <MiniPorthole motionEnabled={motionEnabled} />
    </group>
  );
}

export default function FallbackMiniScene({ rocketUrl = ROCKET_PROXY_URL, onReady, onError }) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionEnabled = !prefersReducedMotion;

  return (
    <div className="fallback-mini-scene" aria-hidden="true">
      <Canvas className="fallback-mini-canvas" camera={{ position: [0, 0.38, 5.3], fov: 38 }} dpr={[1, 1.35]}>
        <ambientLight intensity={0.58} />
        <directionalLight position={[-3, 4, 4]} intensity={1.35} color="#eee5d3" />
        <pointLight position={[0, 1, 2.8]} intensity={1.35} color="#c87820" distance={5} decay={2} />
        <Starfield />
        <PosterRocket
          rocketUrl={rocketUrl}
          motionEnabled={motionEnabled}
          onReady={onReady}
          onError={onError}
        />
      </Canvas>
    </div>
  );
}
