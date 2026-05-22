import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { gsap } from "gsap";
import { RotateCcw, Disc3, Tv, Smartphone, Mail, Music2, Package } from "lucide-react";
import { LINK_TARGETS } from "../data/linkTargets.js";
import {
  PORTHOLE_OFFSET,
  ROCKET_PROXY_POSITION,
  ROCKET_PROXY_ROTATION,
  ROCKET_PROXY_SCALE,
  ROCKET_PROXY_URL,
} from "../data/rocketProxy.js";
import { FALLBACK_ROOM_OBJECTS, normalizeRoomObjects } from "../data/roomObjects.js";

// ─── Asteroid ────────────────────────────────────────────────────────────────

function Asteroid({ position, scale, rotSpeed, fallSpeed, phase }) {
  const ref = useRef();
  const base = useRef(position);
  const yPosition = useRef(position[1]);

  useFrame(({ clock }) => {
    if (!ref.current || phase !== "idle") return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * rotSpeed * 0.7;
    ref.current.rotation.y = t * rotSpeed;
    ref.current.position.x = base.current[0] + Math.sin(t * 0.11 + base.current[2]) * 0.55;
    yPosition.current -= fallSpeed;

    if (yPosition.current < -5.2) {
      yPosition.current = 5.2 + Math.random() * 2.4;
      base.current = [
        (Math.random() - 0.5) * 14,
        yPosition.current,
        -4.5 - Math.random() * 7,
      ];
    }

    ref.current.position.y = yPosition.current + Math.cos(t * 0.08 + base.current[0]) * 0.18;
    ref.current.position.z = base.current[2];
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#5a544d" roughness={0.9} metalness={0.08} />
    </mesh>
  );
}

// ─── Goat mascot (procedural) ────────────────────────────────────────────────

function GoatMascot({ headRef }) {
  const s = 0.21;
  return (
    <group scale={s}>
      {/* body */}
      <mesh>
        <capsuleGeometry args={[0.78, 1.05, 8, 12]} />
        <meshStandardMaterial color="#e2dbd0" roughness={0.84} />
      </mesh>
      {/* head */}
      <group ref={headRef} position={[0, 1.34, 0.46]}>
        <mesh>
          <sphereGeometry args={[0.6, 16, 12]} />
          <meshStandardMaterial color="#e2dbd0" roughness={0.84} />
        </mesh>
        {/* snout */}
        <mesh position={[0, -0.22, 0.48]}>
          <sphereGeometry args={[0.3, 12, 8]} />
          <meshStandardMaterial color="#d0c8bc" roughness={0.88} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.25, 0.1, 0.52]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#17130f" />
        </mesh>
        <mesh position={[0.25, 0.1, 0.52]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#17130f" />
        </mesh>
        {/* left ear */}
        <mesh position={[-0.54, 0.52, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.11, 0.36, 6, 8]} />
          <meshStandardMaterial color="#ccc4b8" roughness={0.88} />
        </mesh>
        {/* right ear */}
        <mesh position={[0.54, 0.52, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.11, 0.36, 6, 8]} />
          <meshStandardMaterial color="#ccc4b8" roughness={0.88} />
        </mesh>
        {/* left horn */}
        <mesh position={[-0.26, 0.88, 0]} rotation={[0.28, 0, 0.38]}>
          <coneGeometry args={[0.075, 0.4, 8]} />
          <meshStandardMaterial color="#beb2a2" roughness={0.7} />
        </mesh>
        {/* right horn */}
        <mesh position={[0.26, 0.88, 0]} rotation={[0.28, 0, -0.38]}>
          <coneGeometry args={[0.075, 0.4, 8]} />
          <meshStandardMaterial color="#beb2a2" roughness={0.7} />
        </mesh>
      </group>
      {/* legs */}
      {[[-0.4, -1.08, 0.26], [0.4, -1.08, 0.26], [-0.34, -1.08, -0.28], [0.34, -1.08, -0.28]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.12, 0.1, 0.88, 8]} />
          <meshStandardMaterial color="#d6cfc4" roughness={0.88} />
        </mesh>
      ))}
      {/* small red KA visor patch on chest */}
      <mesh position={[0, 0.32, 0.8]}>
        <circleGeometry args={[0.2, 12]} />
        <meshStandardMaterial color="#6e1818" roughness={0.5} />
      </mesh>
    </group>
  );
}

// ─── Travel background ──────────────────────────────────────────────────────

function StarLayer({ layer, motionEnabled, phase, parallax = [0.2, 0.08] }) {
  const pointsRef = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = motionEnabled ? clock.getElapsedTime() : 0.8;
    pointsRef.current.position.x = mouse.x * parallax[0];
    pointsRef.current.position.y = mouse.y * parallax[1];
    pointsRef.current.material.uniforms.uTime.value = t;

    if (!motionEnabled || phase !== "idle") return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array;

    for (let i = 0; i < layer.speeds.length; i += 1) {
      const yIndex = i * 3 + 1;
      positions[yIndex] -= layer.speeds[i];

      if (positions[yIndex] < layer.bounds.bottom) {
        positions[i * 3] = (Math.random() - 0.5) * layer.bounds.width;
        positions[yIndex] = layer.bounds.top + Math.random() * layer.bounds.reentry;
        positions[i * 3 + 2] = layer.bounds.zMin - Math.random() * layer.bounds.zRange;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[layer.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[layer.sizes, 1]} />
        <bufferAttribute attach="attributes-aAlpha" args={[layer.alphas, 1]} />
        <bufferAttribute attach="attributes-aWarmth" args={[layer.warmths, 1]} />
        <bufferAttribute attach="attributes-aTwinkle" args={[layer.twinkles, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          attribute float aSize;
          attribute float aAlpha;
          attribute float aWarmth;
          attribute float aTwinkle;
          uniform float uTime;
          varying float vAlpha;
          varying float vWarmth;

          void main() {
            vWarmth = aWarmth;
            float twinkle = 0.86 + sin(uTime * aTwinkle + position.x * 1.7) * 0.14;
            vAlpha = aAlpha * twinkle;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (260.0 / max(1.0, -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          precision mediump float;
          varying float vAlpha;
          varying float vWarmth;

          void main() {
            vec2 p = gl_PointCoord - vec2(0.5);
            float d = length(p);
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            vec3 cool = vec3(0.78, 0.86, 1.0);
            vec3 warm = vec3(1.0, 0.9, 0.66);
            vec3 color = mix(cool, warm, vWarmth);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </points>
  );
}

function TravelStarfield({ phase, motionEnabled }) {
  const layers = useMemo(() => {
    function makeLayer({ count, width, top, bottom, reentry, zMin, zRange, speed, size, alpha }) {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
      const sizes = new Float32Array(count);
      const alphas = new Float32Array(count);
      const warmths = new Float32Array(count);
      const twinkles = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * width;
        positions[i * 3 + 1] = bottom + Math.random() * (top - bottom + reentry);
        positions[i * 3 + 2] = zMin - Math.random() * zRange;
        speeds[i] = speed[0] + Math.random() * speed[1];
        sizes[i] = size[0] + Math.random() * size[1];
        alphas[i] = alpha[0] + Math.random() * alpha[1];
        warmths[i] = Math.random();
        twinkles[i] = 0.5 + Math.random() * 2.0;
    }

      return {
        positions,
        speeds,
        sizes,
        alphas,
        warmths,
        twinkles,
        bounds: { width, top, bottom, reentry, zMin, zRange },
      };
    }

    return {
      far: makeLayer({
        count: 150,
        width: 22,
        top: 6.4,
        bottom: -5.8,
        reentry: 1.2,
        zMin: -10,
        zRange: 8,
        speed: [0.002, 0.004],
        size: [0.025, 0.018],
        alpha: [0.18, 0.2],
      }),
      mid: makeLayer({
        count: 64,
        width: 19,
        top: 6.2,
        bottom: -5.6,
        reentry: 1.4,
        zMin: -5,
        zRange: 6,
        speed: [0.008, 0.013],
        size: [0.035, 0.035],
        alpha: [0.34, 0.32],
      }),
      near: makeLayer({
        count: 18,
        width: 17,
        top: 6.0,
        bottom: -5.4,
        reentry: 1.4,
        zMin: -2.4,
        zRange: 2.8,
        speed: [0.02, 0.022],
        size: [0.055, 0.055],
        alpha: [0.28, 0.28],
      }),
    };
  }, []);

  return (
    <>
      <StarLayer layer={layers.far} motionEnabled={motionEnabled} phase={phase} parallax={[0.1, 0.04]} />
      <StarLayer layer={layers.mid} motionEnabled={motionEnabled} phase={phase} parallax={[0.24, 0.1]} />
      <StarLayer layer={layers.near} motionEnabled={motionEnabled} phase={phase} parallax={[0.4, 0.16]} />
    </>
  );
}

function PassingLightSweeps({ phase, motionEnabled, rocketLightRef }) {
  const groupRef = useRef();

  const passes = useMemo(
    () => [
      { x: -2.8, y: 6.8, z: 2.2, speed: 0.026, color: "#d8e5ff", intensity: 0.42, distance: 5.8, delay: 0 },
      { x: 2.4, y: 9.6, z: 1.8, speed: 0.018, color: "#c87820", intensity: 0.34, distance: 5.2, delay: 2.8 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    if (!motionEnabled || phase !== "idle") {
      groupRef.current.children.forEach((light) => {
        light.intensity = 0;
      });
      if (rocketLightRef?.current) rocketLightRef.current.intensity = 0;
      return;
    }

    groupRef.current.children.forEach((light, i) => {
      const data = passes[i];
      const sweepWindow = Math.max(0, 1 - Math.abs(light.position.y - 0.2) / 2.2);
      light.intensity = data.intensity * sweepWindow * (0.86 + Math.sin(t * 1.2 + i) * 0.12);

      light.position.y -= data.speed;
      light.position.x = data.x + Math.sin(t * 0.35 + i) * 0.28;

      if (light.position.y < -4.8) {
        light.position.y = 7.4 + data.delay;
      }
    });

    if (rocketLightRef?.current) {
      rocketLightRef.current.intensity = Math.min(
        0.42,
        groupRef.current.children.reduce((sum, light) => sum + light.intensity, 0) * 0.35
      );
    }
  });

  return (
    <group ref={groupRef}>
      {passes.map((light) => (
        <pointLight
          key={light.color}
          position={[light.x, light.y, light.z]}
          color={light.color}
          intensity={light.intensity}
          distance={light.distance}
          decay={2}
        />
      ))}
    </group>
  );
}

function PassingComets({ phase, motionEnabled }) {
  const groupRef = useRef();

  const meteors = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const foreground = i === 0 || i === 3;
        return {
        key: i,
        x: -6.5 + Math.random() * 13,
        y: 5.5 + i * 2.6 + Math.random() * 2,
        z: foreground ? -2.8 - Math.random() * 1.2 : -6 - Math.random() * 6,
        speed: foreground ? 0.032 + Math.random() * 0.014 : 0.018 + Math.random() * 0.012,
        drift: (Math.random() - 0.5) * 0.012,
        length: foreground ? 0.85 + Math.random() * 0.65 : 0.44 + Math.random() * 0.6,
        width: foreground ? 0.046 : 0.028,
        opacity: foreground ? 0.2 + Math.random() * 0.14 : 0.1 + Math.random() * 0.12,
        rotation: (Math.random() - 0.5) * 0.24,
        cooldown: 6 + i * 2.4,
      };
      }),
    []
  );

  useFrame(() => {
    if (!groupRef.current || !motionEnabled || phase !== "idle") return;

    groupRef.current.children.forEach((meteor, i) => {
      const data = meteors[i];
      meteor.position.y -= data.speed;
      meteor.position.x += data.drift;

      if (meteor.position.y < -5.6 || meteor.position.x < -9.2 || meteor.position.x > 9.2) {
        meteor.position.set(-6.5 + Math.random() * 13, 6.2 + data.cooldown + Math.random() * 2.2, data.z);
      }
    });
  });

  if (!motionEnabled) return null;

  return (
    <group ref={groupRef}>
      {meteors.map((meteor) => (
        <group
          key={meteor.key}
          position={[meteor.x, meteor.y, meteor.z]}
          rotation={[0, 0, meteor.rotation]}
        >
          <mesh>
            <planeGeometry args={[meteor.width, meteor.length]} />
            <meshBasicMaterial
              color="#eee5d3"
              transparent
              opacity={meteor.opacity}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh>
            <planeGeometry args={[meteor.width * 3.4, meteor.length * 0.55]} />
            <meshBasicMaterial
              color="#c87820"
              transparent
              opacity={meteor.opacity * 0.28}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh position={[0, -meteor.length * 0.48, 0]}>
            <sphereGeometry args={[meteor.width * 1.7, 10, 10]} />
            <meshBasicMaterial
              color="#c87820"
              transparent
              opacity={meteor.opacity + 0.14}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ProceduralRocketFire({
  visible = true,
  motionEnabled = true,
  intensity = 1,
  intensityRef = null,
}) {
  const groupRef = useRef();
  const lightRef = useRef();

  const firePlanes = useMemo(
    () => [
      { rotation: [0, 0, 0], key: "front" },
      { rotation: [0, Math.PI / 3, 0], key: "left" },
      { rotation: [0, -Math.PI / 3, 0], key: "right" },
    ],
    []
  );

  const shader = useMemo(
    () => ({
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;

        uniform float uTime;
        uniform float uIntensity;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 4; i++) {
            value += amp * noise(p);
            p *= 2.03;
            amp *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = vUv;
          float y = uv.y;
          float x = abs(uv.x - 0.5) * 2.0;
          float time = uTime * 0.85;

          float turbulence = fbm(vec2(uv.x * 3.6 + sin(time + y * 5.0) * 0.11, y * 5.6 - time * 1.15));
          float noisyEdge = (turbulence - 0.5) * 0.2;

          float width = mix(0.13, 0.48, smoothstep(0.04, 0.5, y));
          width *= 1.0 - smoothstep(0.62, 1.0, y) * 0.42;
          width += noisyEdge;

          float edge = 1.0 - smoothstep(width, width + 0.17, x);
          float topFade = smoothstep(0.03, 0.15, y);
          float bottomFade = 1.0 - smoothstep(0.02, 0.24, y);
          float verticalFade = topFade * (1.0 - bottomFade);

          float coreWidth = width * 0.34;
          float core = 1.0 - smoothstep(coreWidth, coreWidth + 0.15, x);
          core *= smoothstep(0.15, 0.34, y) * (1.0 - smoothstep(0.68, 0.98, y));

          float rim = smoothstep(width * 0.55, width + 0.06, x) * edge;
          float noisyRim = rim * smoothstep(0.36, 0.82, turbulence);

          vec3 coreColor = vec3(1.0, 0.92, 0.55);
          vec3 bodyColor = vec3(1.0, 0.48, 0.08);
          vec3 rimColor = vec3(0.55, 0.12, 0.02);

          vec3 color = mix(bodyColor, coreColor, core);
          color = mix(color, rimColor, noisyRim * 0.78);
          color *= 1.0 + core * 0.6;

          float alpha = edge * verticalFade;
          alpha *= 0.6 + turbulence * 0.42;
          alpha = max(alpha, core * 0.76);
          alpha *= uIntensity;

          if (alpha < 0.01) discard;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  );

  const materials = useMemo(
    () =>
      firePlanes.map(
        (plane) =>
          new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            uniforms: {
              uTime: { value: 0 },
              uIntensity: { value: intensity },
            },
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
          })
      ),
    [firePlanes, intensity, shader]
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: intensity },
        },
        vertexShader: shader.vertexShader,
        fragmentShader: `
          precision mediump float;

          uniform float uTime;
          uniform float uIntensity;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float y = uv.y;
            float x = abs(uv.x - 0.5) * 2.0;
            float width = mix(0.22, 0.76, smoothstep(0.04, 0.48, y));
            width *= 1.0 - smoothstep(0.64, 1.0, y) * 0.45;
            float mask = 1.0 - smoothstep(width, width + 0.34, x);
            float fade = smoothstep(0.03, 0.16, y) * (1.0 - smoothstep(0.0, 0.25, y));
            float pulse = 0.88 + sin(uTime * 3.8 + y * 7.0) * 0.08;
            float alpha = mask * fade * pulse * 0.22 * uIntensity;
            gl_FragColor = vec4(vec3(1.0, 0.42, 0.05), alpha);
          }
        `,
      }),
    [intensity, shader.vertexShader]
  );

  useFrame(({ clock }) => {
    const value = visible ? intensityRef?.current?.value ?? intensity : 0;
    const t = motionEnabled ? clock.getElapsedTime() : 0.62;
    const flicker = motionEnabled ? 0.92 + Math.sin(t * 8.3) * 0.06 + Math.sin(t * 15.1) * 0.035 : 1;
    const finalIntensity = value * flicker;

    materials.forEach((material) => {
      material.uniforms.uTime.value = t;
      material.uniforms.uIntensity.value = finalIntensity;
    });
    glowMaterial.uniforms.uTime.value = t;
    glowMaterial.uniforms.uIntensity.value = finalIntensity;

    if (lightRef.current) {
      lightRef.current.intensity = finalIntensity * 1.7;
    }

    if (groupRef.current) {
      groupRef.current.scale.x = 1 + (motionEnabled ? Math.sin(t * 5.1) * 0.025 : 0);
      groupRef.current.scale.z = 1 + (motionEnabled ? Math.cos(t * 4.4) * 0.025 : 0);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.05, 0]}>
      <pointLight ref={lightRef} position={[0, 0.42, 0.22]} color="#c87820" intensity={1.4} distance={2.3} decay={2} />

      <mesh position={[0, -0.03, 0]}>
        <planeGeometry args={[1.08, 1.68, 1, 1]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {firePlanes.map((plane, index) => (
        <mesh key={plane.key} rotation={plane.rotation}>
          <planeGeometry args={[0.82, 1.58, 1, 1]} />
          <primitive object={materials[index]} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ─── Rocket body / proxy ─────────────────────────────────────────────────────

function RocketPortholeLayer({ glowRef, glassRef, onPortholeClick }) {
  return (
    <>
      {/* ── porthole ── */}
      <group position={[0, PORTHOLE_OFFSET.y, PORTHOLE_OFFSET.z]}>
        {/* brass rim */}
        <mesh>
          <torusGeometry args={[0.31, 0.057, 16, 48]} />
          <meshStandardMaterial color="#c87820" metalness={0.84} roughness={0.18} />
        </mesh>
        {/* inner dark ring */}
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[0.22, 0.28, 48]} />
          <meshStandardMaterial color="#17130f" roughness={0.6} />
        </mesh>
        {/* interior glow surface */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.22, 48]} />
          <meshStandardMaterial
            color="#20150d"
            emissive="#c87820"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* glass (clickable) */}
        <mesh
          ref={glassRef}
          position={[0, 0, 0.036]}
          onClick={(e) => { e.stopPropagation(); onPortholeClick(); }}
          onPointerOver={() => { document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { document.body.style.cursor = ""; }}
        >
          <circleGeometry args={[0.28, 48]} />
          <meshBasicMaterial color="#eee5d3" transparent opacity={0.38} />
        </mesh>
        {/* outer glow ring (pulsing ref) */}
        <mesh ref={glowRef} position={[0, 0, -0.01]}>
          <ringGeometry args={[0.3, 0.48, 48]} />
          <meshBasicMaterial color="#c87820" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* decal: KA */}
      <Html position={[0, 0.68, 0.54]} center>
        <span className="rocket-decal">KA</span>
      </Html>
      {/* decal: SIDE A */}
      <Html position={[0, -0.26, 0.54]} center>
        <span className="rocket-decal muted">SIDE A</span>
      </Html>
      {/* decal: SIGNAL */}
      <Html position={[0.42, 0.44, 0.34]} center>
        <span className="rocket-decal muted" style={{ fontSize: "0.42rem" }}>SIGNAL</span>
      </Html>
    </>
  );
}

function ProceduralRocketHull() {
  return (
    <>
      {/* chrome hull */}
      <mesh>
        <capsuleGeometry args={[0.52, 1.62, 16, 32]} />
        <meshStandardMaterial color="#b0aba6" metalness={0.7} roughness={0.22} />
      </mesh>

      {/* apollo-red nose cone */}
      <mesh position={[0, 1.13, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.52, 0.9, 32]} />
        <meshStandardMaterial color="#6e1818" roughness={0.42} metalness={0.08} />
      </mesh>

      {/* 3 fins at 120° intervals */}
      {[0, 120, 240].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <mesh
            key={deg}
            position={[Math.sin(a) * 0.5, -0.94, Math.cos(a) * 0.5]}
            rotation={[0, -a, 0.36]}
          >
            <boxGeometry args={[0.2, 0.84, 0.1]} />
            <meshStandardMaterial color="#6e1818" roughness={0.44} metalness={0.05} />
          </mesh>
        );
      })}

      {/* equator chrome band */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.53, 0.034, 12, 48]} />
        <meshStandardMaterial color="#d4cfc8" metalness={0.84} roughness={0.16} />
      </mesh>

      {/* black rubber base ring */}
      <mesh position={[0, -0.88, 0]}>
        <torusGeometry args={[0.5, 0.055, 12, 48]} />
        <meshStandardMaterial color="#17130f" roughness={0.88} />
      </mesh>
    </>
  );
}

function RocketBody({ glowRef, glassRef, onPortholeClick }) {
  return (
    <>
      <ProceduralRocketHull />
      <RocketPortholeLayer
        glowRef={glowRef}
        glassRef={glassRef}
        onPortholeClick={onPortholeClick}
      />
    </>
  );
}

function RocketProxyModel({ glowRef, glassRef, onPortholeClick }) {
  const obj = useLoader(OBJLoader, ROCKET_PROXY_URL);

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
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = /red|fin|nose|cap|stripe|accent/.test(name)
        ? redMaterial
        : /base|rubber|ring|black|tire/.test(name)
          ? darkMaterial
          : chromeMaterial;
    });
    return clone;
  }, [obj]);

  return (
    <>
      <primitive
        object={model}
        scale={ROCKET_PROXY_SCALE}
        position={ROCKET_PROXY_POSITION}
        rotation={ROCKET_PROXY_ROTATION}
      />
      <RocketPortholeLayer
        glowRef={glowRef}
        glassRef={glassRef}
        onPortholeClick={onPortholeClick}
      />
    </>
  );
}

class RocketProxyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function RocketProxyWithFallback({ glowRef, glassRef, onPortholeClick }) {
  const fallback = (
    <RocketBody
      glowRef={glowRef}
      glassRef={glassRef}
      onPortholeClick={onPortholeClick}
    />
  );

  return (
    <RocketProxyErrorBoundary resetKey={ROCKET_PROXY_URL} fallback={fallback}>
      <Suspense fallback={fallback}>
        <RocketProxyModel
          glowRef={glowRef}
          glassRef={glassRef}
          onPortholeClick={onPortholeClick}
        />
      </Suspense>
    </RocketProxyErrorBoundary>
  );
}

// ─── Main scene ───────────────────────────────────────────────────────────────

function WorldPreviewScene({ phase, motionEnabled, roomOpacityRef, onPortholeClick }) {
  const rocketGroup = useRef();
  const portholeGlow = useRef();
  const portholeGlass = useRef();
  const fireIntensityRef = useRef({ value: 1 });
  const goatGroupRef = useRef();
  const goatHeadRef = useRef();
  const rocketSweepLightRef = useRef();
  const { camera } = useThree();

  const asteroids = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        position: [
          (Math.random() - 0.5) * 16,
          1 + Math.random() * 7,
          -4.5 - Math.random() * 7,
        ],
        scale: 0.1 + Math.random() * 0.26,
        rotSpeed: 0.003 + Math.random() * 0.009,
        fallSpeed: 0.008 + Math.random() * 0.009,
      })),
    []
  );

  useEffect(() => {
    camera.position.set(0, 0.2, 6.2);
    camera.lookAt(0, 0.1, 0);
  }, [camera]);

  // ── GSAP enter sequence ──
  useEffect(() => {
    if (!rocketGroup.current || !portholeGlow.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.killTweensOf([
        camera.position,
        rocketGroup.current?.position,
        portholeGlow.current?.scale,
        portholeGlass.current?.material,
        fireIntensityRef.current,
        roomOpacityRef.current,
      ]);

      if (phase === "idle") {
        camera.position.set(0, 0.2, 6.2);
        rocketGroup.current.position.set(0, 0, 0);
        fireIntensityRef.current.value = 1;
        return;
      }

      if (!motionEnabled) {
        fireIntensityRef.current.value = 0.05;
        gsap.to(roomOpacityRef.current, { value: 1, duration: 0.4, ease: "power1.out" });
        return;
      }

      const tl = gsap.timeline();

      // porthole flash
      tl.to(portholeGlow.current.scale, { x: 1.9, y: 1.9, z: 1.9, duration: 0.13, ease: "power2.out" })
        .to(portholeGlow.current.scale, { x: 1, y: 1, z: 1, duration: 0.14, ease: "power2.in" })
        // flame dims
        .to(fireIntensityRef.current, { value: 0.05, duration: 0.38, ease: "power1.out" }, 0.08)
        // glass fades
        .to(portholeGlass.current?.material ?? {}, { opacity: 0.05, duration: 0.44, ease: "power1.out" }, 0.1)
        // camera push into porthole
        .to(camera.position, { z: 2.08, y: 0.1, duration: 1.22, ease: "power2.inOut" }, 0.24)
        .to(rocketGroup.current.position, { z: 1.05, duration: 1.22, ease: "power2.inOut" }, 0.24)
        // iris reveal
        .to(roomOpacityRef.current, { value: 1, duration: 0.64, ease: "power2.out" }, 1.2);
    });

    return () => ctx.revert();
  }, [camera, motionEnabled, phase, roomOpacityRef]);

  // ── idle animation loop ──
  useFrame(({ clock }) => {
    if (!motionEnabled) return;
    const t = clock.getElapsedTime();

    if (rocketGroup.current && phase === "idle") {
      rocketGroup.current.position.y = Math.sin(t * 0.52) * 0.13;
      rocketGroup.current.rotation.z = Math.sin(t * 0.52) * 0.034;
    }

    if (portholeGlow.current && phase === "idle") {
      const pulse = 1 + Math.sin(t * 2.1) * 0.15;
      portholeGlow.current.scale.setScalar(pulse);
      portholeGlow.current.material.opacity = 0.52 + Math.sin(t * 2.1) * 0.22;
    }

    if (goatGroupRef.current && phase === "idle") {
      goatGroupRef.current.position.y = Math.sin(t * 0.76) * 0.03;
    }

    if (goatHeadRef.current && phase === "idle") {
      // slowly looks toward porthole
      goatHeadRef.current.rotation.y = Math.sin(t * 0.38) * 0.16 + 0.12;
    }

  });

  return (
    <>
      <ambientLight intensity={0.52} />
      <hemisphereLight intensity={0.58} color="#eee5d3" groundColor="#1c2232" />
      <directionalLight position={[-3, 4, 5]} intensity={1.48} color="#eee5d3" />
      {/* warm amber point light near porthole */}
      <pointLight position={[0, 0.18, 2.0]} intensity={1.55} color="#c87820" distance={5} decay={2} />
      <pointLight ref={rocketSweepLightRef} position={[0, 0.2, 2.7]} color="#d8e5ff" intensity={0} distance={4.6} decay={2} />
      <PassingLightSweeps motionEnabled={motionEnabled} phase={phase} rocketLightRef={rocketSweepLightRef} />

      {/* ── Moving Starfield ── */}
      <TravelStarfield motionEnabled={motionEnabled} phase={phase} />
      <PassingComets motionEnabled={motionEnabled} phase={phase} />

      {/* ── Asteroids ── */}
      {asteroids.map((a) => (
        <Asteroid
          key={a.id}
          position={a.position}
          scale={a.scale}
          rotSpeed={a.rotSpeed}
          fallSpeed={a.fallSpeed}
          phase={phase}
        />
      ))}

      {/* ── Rocket ── */}
      <group ref={rocketGroup} rotation={[0.04, -0.14, 0]}>
        <RocketProxyWithFallback
          glowRef={portholeGlow}
          glassRef={portholeGlass}
          onPortholeClick={onPortholeClick}
        />

        <ProceduralRocketFire motionEnabled={motionEnabled} intensityRef={fireIntensityRef} />

        {/* goat mascot — perched left of porthole */}
        <group ref={goatGroupRef} position={[-0.74, 0.42, 0.46]}>
          <GoatMascot headRef={goatHeadRef} />
        </group>
      </group>
    </>
  );
}

// ─── Room reveal content ──────────────────────────────────────────────────────

const ROOM_OBJECT_POSITIONS = {
  "record-player": { x: 33, y: 71, rotate: -3, primary: true },
  "crt-tv": { x: 68, y: 48, rotate: 2 },
  phone: { x: 54, y: 66, rotate: -5 },
  "envelope-poster": { x: 43, y: 44, rotate: -8 },
  "vinyl-shelf": { x: 22, y: 52, rotate: 5 },
  "merch-box": { x: 79, y: 76, rotate: -2 },
};

const ROOM_OBJECT_ICONS = {
  "record-player": Disc3,
  "crt-tv": Tv,
  phone: Smartphone,
  "envelope-poster": Mail,
  "vinyl-shelf": Music2,
  "merch-box": Package,
};

function roomObjectTargetLabel(item) {
  if (!Array.isArray(item.hrefKeys) || item.hrefKeys.length < 2) return "";
  return item.hrefKeys
    .map((key) => (key === "tiktok" ? "TikTok" : key.charAt(0).toUpperCase() + key.slice(1)))
    .join(" / ");
}

const ROOM_OBJECTS = normalizeRoomObjects(FALLBACK_ROOM_OBJECTS).map((item) => {
  const position = ROOM_OBJECT_POSITIONS[item.id] || { x: 50, y: 50, rotate: 0 };
  return {
    id: item.id,
    object: item.label,
    label: item.action,
    href: LINK_TARGETS[item.hrefKey],
    detail: roomObjectTargetLabel(item),
    icon: ROOM_OBJECT_ICONS[item.id] || Package,
    disabled: item.disabled || item.hrefKeys.includes("merch"),
    ...position,
  };
});

function linkProps(href) {
  return href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

function RoomObjectHotspot({ item, active }) {
  const Icon = item.icon;
  const style = {
    left: `${item.x}%`,
    top: `${item.y}%`,
    transform: `translate(-50%, -50%) rotate(${item.rotate || 0}deg)`,
  };

  const className = [
    "room-object-hotspot",
    item.primary && "primary",
    item.disabled && "disabled",
    active && "is-active",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="room-object-pulse" aria-hidden="true" />
      <span className="room-object-icon">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="room-object-label">
        <strong>{item.object}</strong>
        <em>{item.label}</em>
        {item.detail && <small>{item.detail}</small>}
      </span>
    </>
  );

  if (item.disabled || !item.href) {
    return (
      <div
        className={className}
        style={style}
        aria-disabled="true"
        aria-label={`${item.object}: ${item.label}`}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      className={className}
      style={style}
      href={item.href}
      aria-label={`${item.object}: ${item.label}`}
      {...linkProps(item.href)}
    >
      {content}
    </a>
  );
}
// ─── Export ───────────────────────────────────────────────────────────────────

export default function WorldPreview() {
  const [phase, setPhase] = useState("idle");
  const [roomOpacity, setRoomOpacity] = useState(0);
  const roomOpacityRef = useRef({ value: 0 });
  const maskRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionEnabled = !prefersReduced;

  useEffect(() => {
    let frame;
    const tick = () => {
      const v = roomOpacityRef.current.value;
      setRoomOpacity(v);
      if (maskRef.current) {
        const r = 8 + v * 84;
        maskRef.current.style.clipPath = `circle(${r}% at 50% 46%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  function enter() {
    if (phase !== "idle") return;
    roomOpacityRef.current.value = 0;
    setPhase("entering");
  }

  function replay() {
    roomOpacityRef.current.value = 0;
    setRoomOpacity(0);
    if (maskRef.current) maskRef.current.style.clipPath = "circle(8% at 50% 46%)";
    setPhase("idle");
  }

  const linksVisible = roomOpacity > 0.88;

  return (
    <div className="world-preview">
      <div className="prototype-stage">
        <Canvas camera={{ position: [0, 0.2, 6.2], fov: 45 }} dpr={[1, 1.6]}>
          <WorldPreviewScene
            phase={phase}
            motionEnabled={motionEnabled}
            roomOpacityRef={roomOpacityRef}
            onPortholeClick={enter}
          />
        </Canvas>

        {/* ── room reveal overlay ── */}
        <div
          ref={maskRef}
          className="room-reveal-mask"
          style={{
            opacity: roomOpacity,
            clipPath: "circle(8% at 50% 46%)",
            pointerEvents: roomOpacity > 0.5 ? "auto" : "none",
          }}
        >
          <div className="room-reveal-panel">
            <div
              className="room-reveal-bg"
              style={{ backgroundImage: "url(/assets/room/room-reference.jpg)" }}
            />
            <div className="room-reveal-overlay" />
            <div className="room-reveal-content" style={{ opacity: linksVisible ? 1 : 0 }}>
              <div>
                <span className="arrival-chip">arrival</span>
                <strong className="arrival-title">You're in.</strong>
              </div>

              <div className="room-object-layer" aria-label="Artist links placed as room objects">
                {ROOM_OBJECTS.map((item) => (
                  <RoomObjectHotspot key={item.id} item={item} active={linksVisible} />
                ))}
              </div>

              <button type="button" className="room-replay spatial" onClick={replay}>
                <RotateCcw size={13} aria-hidden="true" />
                Back to rocket
              </button>
            </div>
          </div>
        </div>

        {/* ── enter button (idle only) ── */}
        {phase === "idle" && (
          <div className="prototype-controls">
            <button type="button" className="prototype-enter" onClick={enter}>
              Tap porthole · Enter
            </button>
            <button type="button" className="prototype-replay" onClick={replay} aria-label="Replay">
              <RotateCcw aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* timeline strip */}
      <div className="prototype-timeline" aria-label="Experience phases">
        {["Exterior", "Glow", "Push", "Iris", "Arrival", "Room"].map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>

      <p className="prototype-note">
        Prototype scene — primitive geometry and sourced look-dev assets test timing, porthole behaviour,
        mascot placement, and object-led room navigation. Final models, textures, animation, and room object
        placement replace these in production.
      </p>
    </div>
  );
}
