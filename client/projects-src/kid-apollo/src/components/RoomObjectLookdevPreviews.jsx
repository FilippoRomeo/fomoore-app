import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Boxes } from "lucide-react";

function statusLabel(status) {
  return status === "manual-needed" ? "manual" : status || "look-dev";
}

function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, visible]);

  return [ref, visible];
}

function fitObjectToPreview(object) {
  const root = new THREE.Group();
  root.add(object);

  object.updateMatrixWorld(true);

  const sourceBox = new THREE.Box3().setFromObject(object);
  const sourceSize = new THREE.Vector3();
  const sourceCenter = new THREE.Vector3();
  sourceBox.getSize(sourceSize);
  sourceBox.getCenter(sourceCenter);

  const maxAxis = Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
  if (!Number.isFinite(maxAxis) || maxAxis <= 0) {
    throw new Error("Model has invalid preview bounds.");
  }

  const horizontalAxis = Math.max(sourceSize.x, sourceSize.z);
  const verticalAxis = sourceSize.y || maxAxis;
  const targetSize = horizontalAxis / verticalAxis > 2.2 ? 1.55 : 1.75;

  object.position.sub(sourceCenter);
  root.scale.setScalar(targetSize / maxAxis);
  root.updateMatrixWorld(true);

  const fittedBox = new THREE.Box3().setFromObject(root);
  const fittedCenter = new THREE.Vector3();
  fittedBox.getCenter(fittedCenter);
  root.position.sub(fittedCenter);

  return root;
}

function RoomObjectModel({ url }) {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, url);

  const model = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material && "envMapIntensity" in child.material) {
        child.material.envMapIntensity = 1.35;
      }
    });

    return fitObjectToPreview(clone);
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.28;
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.035;
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

class RoomObjectPreviewBoundary extends React.Component {
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

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function PreviewFallback({ label, object, manual = false, queued = false, loading = false }) {
  const path = object?.url || object?.servedPath || object?.localPath || "";

  return (
    <div className="room-lookdev-empty" role="img" aria-label={label}>
      <Boxes aria-hidden="true" />
      <span>
        {manual
          ? "Manual build"
          : queued
            ? "Preview queued"
            : loading
              ? "Loading model"
              : "Preview unavailable"}
      </span>
      {!manual && !queued && !loading && (
        <>
          <small>{object?.id || object?.label || "Model file"}</small>
          {path && <code>{path}</code>}
          {object?.url && <a href={object.url}>Open file</a>}
        </>
      )}
    </div>
  );
}

function RoomObjectPreviewCard({ object }) {
  const [cardRef, visible] = useInView({ rootMargin: "260px" });
  const [failed, setFailed] = useState(false);
  const hasPreview = Boolean(object.url);
  const handleError = (error) => {
    console.warn("Room object preview failed", {
      id: object.id,
      label: object.label,
      url: object.url,
      error,
    });
    setFailed(true);
  };
  const targetLabel =
    Array.isArray(object.hrefKeys) && object.hrefKeys.length > 1
      ? object.hrefKeys
          .map((key) => (key === "tiktok" ? "TikTok" : key.charAt(0).toUpperCase() + key.slice(1)))
          .join(" / ")
      : "";

  return (
    <article ref={cardRef} className="room-lookdev-card">
      <div className="room-lookdev-canvas">
        {!hasPreview ? (
          <PreviewFallback label={object.label} object={object} manual />
        ) : !visible ? (
          <PreviewFallback label={object.label} object={object} queued />
        ) : failed ? (
          <PreviewFallback label={object.label} object={object} />
        ) : (
          <RoomObjectPreviewBoundary
            onError={handleError}
            fallback={<PreviewFallback label={object.label} object={object} />}
          >
            <Suspense fallback={<PreviewFallback label={object.label} object={object} loading />}>
              <Canvas camera={{ position: [0, 0.15, 4.2], fov: 36 }} dpr={[1, 1.25]}>
                <ambientLight intensity={1.35} />
                <hemisphereLight intensity={1.55} color="#fff4dd" groundColor="#2a2118" />
                <directionalLight position={[3, 4, 4]} intensity={2.35} color="#fff1d8" />
                <directionalLight position={[-3, 2, 2]} intensity={1.15} color="#d8e5ff" />
                <pointLight position={[-2, 1.5, 2]} intensity={1.15} color="#c87820" />
                <RoomObjectModel url={object.url} />
              </Canvas>
            </Suspense>
          </RoomObjectPreviewBoundary>
        )}
      </div>

      <div className="room-lookdev-copy">
        <div>
          <strong>{object.label}</strong>
          <span>
            {object.action}
            {targetLabel ? ` · ${targetLabel}` : ""}
          </span>
        </div>
        <em>{statusLabel(object.status)}</em>
      </div>
    </article>
  );
}

export default function RoomObjectLookdevPreviews({ objects }) {
  return (
    <section className="room-lookdev-previews" aria-label="Room object look-dev previews">
      <div className="room-lookdev-head">
        <span>Look-dev object previews</span>
        <p>
          Served proxy objects from the room manifest. These are inspection previews only; final room objects remain
          custom art direction.
        </p>
      </div>
      <div className="room-lookdev-grid">
        {objects.map((object) => (
          <RoomObjectPreviewCard key={object.id} object={object} />
        ))}
      </div>
    </section>
  );
}
