import React, { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function isUnsafeLiveModel(file = {}) {
  const values = [
    file.url,
    file.servedPath,
    file.localPath,
    file.name,
    file.title,
    file.path,
    file.id,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    values.includes("kenney-modular-space-kit") ||
    values.includes("kenney-space-station-kit") ||
    values.includes("nature-pack-extended") ||
    values.includes("/references/space/") ||
    values.includes("references/space/") ||
    values.endsWith(".obj")
  );
}

function ReferenceAssetFallback({ file }) {
  const path = file.url || file.servedPath || file.localPath || "unavailable";

  return (
    <div className="asset-model-debug" role="img" aria-label={`3D preview disabled for ${file.name || path}`}>
      <strong>Reference asset</strong>
      <span>{file.id || file.name || "Model file"}</span>
      <code>{path}</code>
      {file.url && <a href={file.url}>Open file</a>}
    </div>
  );
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

function ModelObject({ url, motionEnabled }) {
  const extension = url.split("?")[0].split(".").pop()?.toLowerCase();
  const result = useLoader(extension === "obj" ? OBJLoader : GLTFLoader, url);
  const groupRef = useRef(null);

  const model = useMemo(() => {
    const object = (result.scene || result).clone(true);

    object.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      if (!child.material) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#a8a4a0",
          roughness: 0.5,
          metalness: 0.12,
        });
      }
    });

    return fitObjectToPreview(object);
  }, [result]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !motionEnabled) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.22;
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

class ModelPreviewBoundary extends React.Component {
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

function ModelDebugFallback({ file }) {
  const path = file.url || file.servedPath || file.localPath || "unavailable";

  return (
    <div className="asset-model-debug" role="img" aria-label={`Preview unavailable for ${file.name || path}`}>
      <strong>Preview unavailable</strong>
      <span>{file.id || file.name || "Model file"}</span>
      <code>{path}</code>
      {file.url && <a href={file.url}>Open file</a>}
    </div>
  );
}

export default function AssetModelPreview({ file, onError }) {
  const [failed, setFailed] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const handleError = (error) => {
    console.warn("Model preview failed", {
      id: file.id,
      name: file.name,
      url: file.url,
      error,
    });
    setFailed(true);
  };

  if (isUnsafeLiveModel(file)) {
    return <ReferenceAssetFallback file={file} />;
  }

  if (failed) {
    return <ModelDebugFallback file={file} />;
  }

  return (
    <Canvas className="model-preview-canvas" camera={{ position: [0, 0.15, 4.2], fov: 36 }} dpr={[1, 1.25]}>
      <ambientLight intensity={1.05} />
      <hemisphereLight args={["#eee5d3", "#1c2232", 1.1]} />
      <directionalLight position={[-3, 4, 5]} intensity={2.1} color="#eee5d3" />
      <directionalLight position={[3, 2, 2]} intensity={0.72} color="#d8e5ff" />
      <pointLight position={[2, 1.5, 2.4]} intensity={0.82} color="#c87820" distance={5} decay={2} />
      <ModelPreviewBoundary
        onError={handleError}
        fallback={null}
      >
        <Suspense fallback={null}>
          <ModelObject url={file.url} motionEnabled={!prefersReducedMotion} />
        </Suspense>
      </ModelPreviewBoundary>
    </Canvas>
  );
}
