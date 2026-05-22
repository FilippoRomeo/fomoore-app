import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Boxes, Disc3, FileBox, Image as ImageIcon, Sparkles } from "lucide-react";
import { assetUrl, normalizeAssetObject, normalizeAssetUrl } from "../utils/assetUrl.js";

const DEFAULT_SELECTION = assetUrl("assets/moodboard-selected/selection.json");
const ROOM_OBJECTS_MANIFEST = assetUrl("assets/room-objects/manifest.json");
const LazyAssetModelPreview = React.lazy(() => import("./AssetModelPreview.jsx"));

// Maximum items rendered per bucket section on first paint.
// Clicking "Show more" reveals the next page. Items beyond the
// visible slice are NOT mounted – no img src, no audio, no model.
const BUCKET_PAGE_SIZE = 24;

const BUCKETS = [
  {
    key: "materials",
    title: "Material studies",
    description: "Chrome, Apollo red, brass, fabric, paper, cardboard, rubber, vinyl, wall, and wood look-dev maps.",
    match: (role, file) =>
      /chrome|red metal|brass|fabric|paper|cardboard|concrete|wall|wood|rubber|vinyl|material/i.test(role) ||
      file.url?.includes("/materials/"),
  },
  {
    key: "room",
    title: "Room blockout",
    description: "Room geometry, object proxies, walls, floor, and music-world navigation atoms.",
    match: (role, file) =>
      /room blockout|room geometry|room|wall|floor|object|proxy|listen|watch|follow|signup|vinyl|merch/i.test(role) ||
      file.url?.includes("/models/room/") ||
      file.url?.includes("/room-objects/"),
  },
  {
    key: "launch",
    title: "Launch / fire",
    description: "Ignition, rocket fire, launch smoke, and Earth-liftoff timing tests.",
    match: (role, file) => /launch|fire|smoke|thruster/i.test(role) || file.url?.includes("/sprites/fire/"),
  },
  {
    key: "space",
    title: "Space / asteroid",
    description: "Space sprites, particle accents, and asteroid blockout support for drift and soft-contact feedback.",
    match: (role, file) =>
      /space|asteroid|particle|impact/i.test(role) ||
      file.url?.includes("/sprites/space/") ||
      file.url?.includes("/models/asteroid/") ||
      file.url?.includes("/models/asteroids/"),
  },
  {
    key: "sound",
    title: "Sound tests",
    description: "Engine, thruster, launch, and asteroid-contact sounds for interaction timing tests.",
    match: (role, file) => file.type === "sound" || /engine|thruster|impact|sound/i.test(role) || file.url?.includes("/sounds/"),
  },
];

function fileNameFromPath(path = "") {
  return path.split("/").filter(Boolean).at(-1) || "Asset";
}

function typeFromUrl(url = "", fallback = "file") {
  const clean = url.split("?")[0].toLowerCase();
  if (/\.(jpg|jpeg|png|webp|gif|svg)$/.test(clean)) return "image";
  if (/\.(gltf|glb|obj)$/.test(clean)) return "model";
  if (/\.(mp3|wav|ogg|m4a)$/.test(clean)) return "sound";
  if (!url) return "manual";
  return fallback;
}

function typeCounts(files = []) {
  return files.reduce(
    (acc, file) => {
      acc[file.type] = (acc[file.type] || 0) + 1;
      return acc;
    },
    { image: 0, model: 0, sound: 0, manual: 0, file: 0, "material-set": 0 }
  );
}

function materialFolder(url = "") {
  return url.split("/").slice(0, -1).join("/");
}

function isMaterialMap(file) {
  return file.type === "image" && file.url?.includes("/materials/");
}

function collapseMaterialSets(files = []) {
  const groups = new Map();
  const standalone = [];

  files.forEach((file) => {
    if (!isMaterialMap(file)) {
      standalone.push(file);
      return;
    }

    const key = `${file.role || "material"}|${materialFolder(file.url)}`;
    const current = groups.get(key) || {
      id: `material-${key}`,
      name: file.role || file.name,
      label: file.role || file.name,
      role: file.role || "material study",
      status: file.status || "downloaded",
      type: "material-set",
      url: file.url,
      localPath: materialFolder(file.url),
      maps: [],
    };

    current.maps.push(file);
    groups.set(key, current);
  });

  return [...groups.values(), ...standalone];
}

function classify(files = []) {
  const used = new Set();
  const buckets = BUCKETS.map((bucket) => {
    const bucketFiles = files.filter((file) => {
      const match = bucket.match(file.role || "", file);
      if (match) used.add(file.id || file.url || file.name);
      return match;
    });

    return {
      ...bucket,
      files: bucketFiles,
      count: bucketFiles.length,
    };
  }).filter((bucket) => bucket.files.length > 0);

  const otherFiles = files.filter((file) => !used.has(file.id || file.url || file.name));
  if (otherFiles.length > 0) {
    buckets.push({
      key: "other",
      title: "Other shortlist atoms",
      description: "Additional selected files kept visible without turning the board into a file browser.",
      files: otherFiles,
      count: otherFiles.length,
    });
  }

  return buckets;
}

function prettyType(file) {
  if (file.type === "model") {
    const ext = file.url?.split(".").pop()?.toUpperCase();
    return ext || "Model";
  }
  if (file.type === "sound") return "Audio";
  if (file.type === "manual") return "Manual";
  if (file.type === "material-set") return "Material";
  return file.type || "File";
}

function statusLabel(file) {
  return file.status || (file.type === "manual" ? "manual-needed" : "downloaded");
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

function ModelPreview({ file }) {
  const [wrapRef, visible] = useInView({ rootMargin: "260px" });
  const [failed, setFailed] = useState(false);

  return (
    <div ref={wrapRef} className="asset-preview model">
      {!visible && <div className="model-preview-loading">Model preview queued</div>}
      {visible && failed && (
        <div className="asset-preview unavailable">
          <FileBox size={18} aria-hidden="true" />
          <span>Model preview unavailable</span>
        </div>
      )}
      {visible && !failed && (
        <Suspense fallback={<div className="model-preview-loading">Loading model preview</div>}>
          <LazyAssetModelPreview file={file} onError={() => setFailed(true)} />
        </Suspense>
      )}
    </div>
  );
}

function AssetPreview({ file }) {
  if (file.type === "material-set") {
    return (
      <div className="asset-preview material">
        <div className="asset-material-grid">
          {file.maps.map((map) => (
            <figure key={map.url} className="asset-material-map">
              <img src={map.url} alt={map.name} loading="lazy" decoding="async" />
              <figcaption>{map.name.replace(/^.*?_1k-jpg_?/i, "").replace(/\.[^.]+$/, "")}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (file.type === "image") {
    return (
      <div className="asset-preview image">
        <img src={file.url} alt={file.role || file.label || file.name} loading="lazy" decoding="async" />
      </div>
    );
  }

  if (file.type === "sound") {
    return (
      <div className="asset-preview audio">
        <Disc3 size={150} aria-hidden="true" />
        <audio controls preload="none" src={file.url}>
          <a href={file.url}>Open audio</a>
        </audio>
      </div>
    );
  }

  if (file.type === "model" && file.url) {
    return <ModelPreview file={file} />;
  }

  return (
    <div className="asset-preview unavailable">
      <FileBox size={18} aria-hidden="true" />
      <span>{file.type === "manual" ? "Manual production asset needed" : "Preview unavailable"}</span>
    </div>
  );
}

function AssetCard({ file }) {
  const path =
    file.type === "material-set"
      ? `${file.maps.length} material maps · ${file.localPath}`
      : file.url || file.servedPath || file.localPath || "manual-needed";
  const source = file.sourceUrl || file.sourcePage;

  return (
    <article className="asset-card">
      <AssetPreview file={file} />
      <div className="asset-meta">
        <div>
          <span className={`asset-status status-${statusLabel(file).replace(/[^a-z0-9]+/g, "-")}`}>
            {statusLabel(file)}
          </span>
          <span className="asset-type">{prettyType(file)}</span>
        </div>
        <h4>{file.label || file.role || file.name}</h4>
        {file.action && <p>{file.action}</p>}
        <small>{file.type === "material-set" ? `${file.maps.length} texture maps` : file.name}</small>
        <code className="asset-path">{path}</code>
        <div className="asset-actions">
          {file.url && <a href={file.url}>Open file</a>}
          {source && <a href={source}>Source</a>}
          {path !== "manual-needed" && (
            <button type="button" onClick={() => navigator.clipboard?.writeText(path)}>
              Copy path
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// Renders up to BUCKET_PAGE_SIZE items initially.
// Items beyond the visible slice are NOT mounted – no img src,
// no audio element, no model canvas.
function BucketCard({ bucket }) {
  const [visibleCount, setVisibleCount] = useState(BUCKET_PAGE_SIZE);

  const visibleFiles = bucket.files.slice(0, visibleCount);
  const remaining = bucket.files.length - visibleCount;
  const nextPage = Math.min(remaining, BUCKET_PAGE_SIZE);

  return (
    <article className={`asset-bucket-card asset-bucket-${bucket.key}`}>
      <div className="asset-card-head">
        <span>
          {visibleCount < bucket.count
            ? `${visibleCount} of ${bucket.count} cards`
            : `${bucket.count} visible cards`}
        </span>
        <h3>{bucket.title}</h3>
        <p>{bucket.description}</p>
      </div>

      <div className="asset-grid">
        {visibleFiles.map((file) => (
          <AssetCard key={file.id || file.url || file.name} file={file} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="asset-bucket-more">
          <button
            type="button"
            className="asset-show-more"
            onClick={() => setVisibleCount((n) => n + BUCKET_PAGE_SIZE)}
          >
            Show {nextPage} more asset{nextPage !== 1 ? "s" : ""}{" "}
            <span aria-hidden="true">({remaining} remaining)</span>
          </button>
        </div>
      )}
    </article>
  );
}

function normalizeSelectionFile(file, index) {
  const url = normalizeAssetUrl(file.url || file.servedPath || null);

  return {
    id: file.id || url || `${file.name}-${index}`,
    name: file.name || fileNameFromPath(url),
    label: file.label || null,
    role: file.role || file.type || "uncategorised",
    status: file.status || "downloaded",
    type: file.type || typeFromUrl(url),
    url,
    localPath: file.localPath,
    sourceUrl: file.sourceUrl,
    sourcePage: file.sourcePage,
  };
}

function normalizeRoomObject(object) {
  const url = normalizeAssetUrl(object.url || object.servedPath || null);

  return {
    id: `room-${object.id || object.label}`,
    name: fileNameFromPath(url) || object.asset || object.label,
    label: object.label || object.asset || "Room object",
    action: object.action,
    role: object.role || `${object.action || "room"} object`,
    status: object.status || (url ? "downloaded" : "manual-needed"),
    type: typeFromUrl(url, object.assetType?.includes("model") ? "model" : "manual"),
    url,
    localPath: object.localPath,
    sourcePage: object.sourcePage,
  };
}

function RoomObjectAssetSection() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    note: "",
    files: [],
  });
  const [visibleCount, setVisibleCount] = useState(BUCKET_PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;

    fetch(ROOM_OBJECTS_MANIFEST)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${ROOM_OBJECTS_MANIFEST}`);
        return response.json();
      })
      .then((manifest) => {
        if (cancelled) return;
        const normalizedManifest = normalizeAssetObject(manifest);
        const files = Array.isArray(normalizedManifest.objects)
          ? normalizedManifest.objects.map(normalizeRoomObject)
          : [];
        setState({
          loading: false,
          error: "",
          note: normalizedManifest.note || "",
          files,
        });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: error.message || "Room object manifest failed to load.",
          note: "",
          files: [],
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleFiles = state.files.slice(0, visibleCount);
  const remaining = state.files.length - visibleCount;
  const nextPage = Math.min(remaining, BUCKET_PAGE_SIZE);

  return (
    <article className="asset-bucket-card room-object-assets">
      <div className="asset-card-head">
        <span>
          {state.loading
            ? "loading"
            : visibleCount < state.files.length
              ? `${visibleCount} of ${state.files.length} room objects`
              : `${state.files.length} room objects`}
        </span>
        <h3>Room object look-dev manifest</h3>
        <p>
          Navigation objects are visible here as look-dev assets only. Manual-needed cards mark objects that
          still need custom production art.
        </p>
      </div>

      {state.note && <p className="asset-pack-message">{state.note}</p>}
      {state.loading && <p className="asset-pack-loading">Loading room object manifest...</p>}
      {state.error && <p className="asset-pack-error">{state.error}</p>}

      {!state.loading && !state.error && (
        <>
          <div className="asset-grid">
            {visibleFiles.map((file) => (
              <AssetCard key={file.id} file={file} />
            ))}
          </div>

          {remaining > 0 && (
            <div className="asset-bucket-more">
              <button
                type="button"
                className="asset-show-more"
                onClick={() => setVisibleCount((n) => n + BUCKET_PAGE_SIZE)}
              >
                Show {nextPage} more asset{nextPage !== 1 ? "s" : ""}{" "}
                <span aria-hidden="true">({remaining} remaining)</span>
              </button>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default function MoodboardAssetPack({ assets = {} }) {
  const selectionUrl = assets.selection || DEFAULT_SELECTION;
  const [state, setState] = useState({
    loading: true,
    error: "",
    note: "",
    files: [],
    count: 0,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(selectionUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${selectionUrl}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const normalizedData = normalizeAssetObject(data);
        const files = Array.isArray(normalizedData.files)
          ? normalizedData.files.map(normalizeSelectionFile)
          : [];
        setState({
          loading: false,
          error: "",
          note: normalizedData.note || "",
          files,
          count: Number(normalizedData.count || files.length),
        });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: error.message || "Moodboard selection failed to load.",
          note: "",
          files: [],
          count: 0,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [selectionUrl]);

  const counts = useMemo(() => typeCounts(state.files), [state.files]);
  const displayFiles = useMemo(() => collapseMaterialSets(state.files), [state.files]);
  const buckets = useMemo(() => classify(displayFiles), [displayFiles]);

  return (
    <section className="asset-pack" aria-labelledby="asset-pack-title">
      <div className="asset-pack-head">
        <div>
          <span className="asset-pack-kicker">
            <Sparkles size={13} aria-hidden="true" />
            Served blockout pack
          </span>
          <h3 id="asset-pack-title">Moodboard assets are visible production cards, not download links.</h3>
          <p>
            These downloaded assets are not final Kid Apollo art. They are controlled geometry, texture,
            sprite, and sound material for moodboard, look-dev, and prototype testing. The final rocket,
            goat, porthole, room composition, decals, and poster still remain art-directed.
          </p>
        </div>

        <div className="asset-pack-stats" aria-label="Selected asset counts">
          <strong>{state.loading ? "..." : state.count}</strong>
          <span>selected files</span>
          <small>{counts.image} images / {counts.model} models / {counts.sound} sounds</small>
        </div>
      </div>

      <div className="asset-pack-summary">
        <div>
          <ImageIcon size={16} aria-hidden="true" />
          <strong>Visual review first</strong>
          <p>Images, sounds, room-object proxies, and models render as cards; file links remain secondary.</p>
        </div>
        <div>
          <Boxes size={16} aria-hidden="true" />
          <strong>Pack discipline</strong>
          <p>Use the tight shortlist for client review, keep the raw catalog and wide backup as production reserves.</p>
        </div>
      </div>

      <div className="asset-pack-proof">
        <a href={selectionUrl}>Client shortlist</a>
        {assets.wideBackup && <a href={assets.wideBackup}>Wide backup</a>}
        {assets.catalog && <a href={assets.catalog}>Full raw catalog</a>}
        <span>
          <Boxes size={14} aria-hidden="true" />
          Every selected asset remains visible
        </span>
      </div>

      {state.note && <p className="asset-pack-message">{state.note}</p>}
      {state.loading && <p className="asset-pack-loading">Loading selected production assets...</p>}
      {state.error && <p className="asset-pack-error">{state.error}</p>}

      {!state.loading && !state.error && (
        <div className="asset-pack-grid">
          {buckets.map((bucket) => (
            <BucketCard key={bucket.key} bucket={bucket} />
          ))}
          <RoomObjectAssetSection />
        </div>
      )}
    </section>
  );
}
