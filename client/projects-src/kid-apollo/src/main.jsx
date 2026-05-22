import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Disc3,
  ExternalLink,
  Film,
  Gauge,
  Mail,
  Music2,
  Package,
  Rocket,
  Smartphone,
  Sparkles,
  Tv,
  Volume2,
} from "lucide-react";

import {
  appendixReferences,
  primaryReferences,
  referenceGroups,
  references,
  supportingReferences,
} from "./data/references.js";
import useRoomObjects from "./hooks/useRoomObjects.js";
import pdfPages from "./data/pdfText.json";
import "./styles.css";

const FallbackPreview = React.lazy(() => import("./components/FallbackPreview.jsx"));
const FinalArtTracker = React.lazy(() => import("./components/FinalArtTracker.jsx"));
const MoodboardAssetPack = React.lazy(() => import("./components/MoodboardAssetPack.jsx"));
const WorldPreview = React.lazy(() => import("./components/MotionPrototype.jsx"));
const RoomObjectLookdevPreviews = React.lazy(() => import("./components/RoomObjectLookdevPreviews.jsx"));

const ASSETS = {
  heroRocket: "/assets/hero/rocket-reference.jpg",
  room: "/assets/room/room-reference.jpg",
  roomVideo: "/assets/uploads/room-reference-video.mp4",
  starfield: "/assets/hero/starfield-nasa-hero.jpg",
  saucer: "/assets/references/space/toy-flying-saucer.jpg",
  tinRocket: "/assets/references/rocket/tin-rocket-skyexpress.jpg",
  apolloPatch: "/assets/references/materials/apollo-11-patch.jpg",
  recordPlayer: "/assets/references/objects/record-player.jpg",
  crtTv: "/assets/references/objects/crt-tv.jpg",
  vinyl: "/assets/references/objects/vinyl-record.svg",
};

const MOODBOARD_ASSETS = {
  catalog: "/assets/moodboard/catalog.json",
  selection: "/assets/moodboard-selected/selection.json",
  wideBackup: "/assets/moodboard-selected/selection-wide.json",
  chromeColor: "/assets/moodboard/materials/chrome/metal009_1k-jpg_color.jpg",
  redMetalColor: "/assets/moodboard/materials/red-painted-metal/paintedmetal009_1k-jpg_color.jpg",
  goatFabricColor: "/assets/moodboard/materials/fabric-goat/fabric016_1k-jpg_color.jpg",
  roomFloor: "/assets/moodboard/models/room/floor.glb",
  roomWall: "/assets/moodboard/models/room/wall.glb",
  roomRoundWindow: "/assets/moodboard/models/room/wall-window-round.glb",
  fireSheet: "/assets/moodboard/sprites/fire/firesheet.png",
  fireSheet5x5: "/assets/moodboard/sprites/fire/firesheet5x5.png",
  engineLoop: "/assets/moodboard/sounds/sci-fi/spaceengine_000.ogg",
  thrusterFire: "/assets/moodboard/sounds/sci-fi/thrusterfire_000.ogg",
  impactMetal: "/assets/moodboard/sounds/sci-fi/impactmetal_000.ogg",
};

const NAV = [
  ["Position", "#position"],
  ["Visual DNA", "#visual-dna"],
  ["Launch", "#launch"],
  ["Rocket", "#rocket"],
  ["Companion", "#companion"],
  ["Motion", "#motion-prototype"],
  ["Room", "#room"],
  ["References", "#references"],
];

const DIRECTIVES = [
  {
    title: "The rocket is the public myth.",
    body:
      "It must read as an icon before it reads as a 3D model: compact chrome mass, apollo-red accents, dominant amber porthole, and a small amount of hand-built imperfection.",
  },
  {
    title: "The porthole is the threshold.",
    body:
      "It is not a decorative circle. It is the outside CTA, the transition mask, and the interior window. Every motion and label decision should support that continuity.",
  },
  {
    title: "The room is the private music world.",
    body:
      "Links belong to physical objects. Record player means listen, screen means watch, phone means follow, envelope means sign up, vinyl shelf means store.",
  },
];

const DESIGN_DNA = [
  ["Near black", "#0A0A09", "Void, contrast, cinematic restraint."],
  ["Chrome", "#A8A4A0", "Rocket body, trims, fixtures, worn object feel."],
  ["Warm cream", "#C8C0B2", "Labels, paper, fallback surfaces, readable UI."],
  ["Apollo red", "#7A1C1C", "Identity marks, fins, warnings, poster accents."],
  ["Amber glow", "#C87820", "Porthole, focus states, interaction rhythm."],
  ["Deep slate", "#1C2232", "Interior fill light and exterior bridge tone."],
];

const EXPERIENCE = [
  ["01", "Earth", "Launchpad, ignition cue, goat scramble, and liftoff."],
  ["02", "Space", "Quiet drift, porthole pulse, goat behaviour, soft asteroid feedback."],
  ["03", "Threshold", "Tap the porthole; camera push and circular reveal carry the user inside."],
  ["04", "Room", "Warm music-world diorama with object-led navigation."],
  ["05", "Poster mode", "Same world and link hierarchy when 3D is unavailable."],
];

const PRODUCTION_RULES = [
  "Online assets are look-dev/proxy material only: geometry, texture, sprite, and sound tests.",
  "Commissioned final art remains custom: rocket, goat, room composition, decals, poster still, and SFX.",
  "Use /assets/moodboard-selected/selection.json as the client-facing shortlist.",
  "Keep /assets/moodboard-selected/selection-wide.json as the broad backup.",
  "Keep /assets/moodboard/catalog.json as the full raw library.",
  "Room objects currently include proxies and manual-needed assets; they are not final production art.",
  "Mobile first: every section must survive a 390px viewport and a mid-range device.",
  "Motion has a switch: reduced-motion users still get the full content map.",
  "References must defend a decision. If they only decorate the board, they leave.",
];

const FEATURED_CATEGORIES = [
  {
    categoryKey: "rocket",
    kicker: "Form language",
    decision: "Build the rocket like a brand object, not a spaceship.",
    image: ASSETS.heroRocket,
  },
  {
    categoryKey: "materials",
    kicker: "Surface identity",
    decision: "Use decals and wear marks as the Kid Apollo signature system.",
    image: ASSETS.apolloPatch,
  },
  {
    categoryKey: "room",
    kicker: "Interior world",
    decision: "Make the room a contained music diorama with navigable objects.",
    image: ASSETS.room,
  },
  {
    categoryKey: "hotspots",
    kicker: "Interaction",
    decision: "Labels attach to objects and explain the affordance without becoming a HUD.",
    image: null,
  },
];

const DECISION_SYSTEM = {
  launch: {
    label: "Launch sequence",
    decision: "Earth, ignition, goat scramble, liftoff, drift handoff.",
    why:
      "The experience should not drop the user into space without context. The launch makes the rocket feel like it left somewhere real, and turns the goat into part of the world before the porthole becomes the main action.",
    rules: [
      "Pad idle, ignition cue, goat scramble, liftoff, Earth recede, drift handoff.",
      "Prototype fireball is procedural shader-based for look-dev: compact, short, hot-core, amber noisy edge. Final production can choose between shader fire, sprite-sheet billboard, or soft-particle depth fade depending on mobile performance.",
      "Fireball length target: shorter than the reference, about 0.8x to 1.2x rocket body height maximum.",
      "Shape: compact and cartoonish, tapered at the nozzle, slightly bulbous lower down, with a soft fade at the bottom.",
      "Look: dense white/yellow core, amber/orange outer flame, and a soft noisy edge.",
      "Do not add post-processing, bloom, or heavy particle systems for the prototype fireball.",
      "Final-pass soft particles and depth fade can be explored only if sprite billboards visibly clip through rocket or launchpad geometry.",
      "First visit can play the full beat; return visits can skip or shorten it.",
      "The launch is a cinematic intro, not a game state.",
    ],
    extract: [
      "Wallace & Gromit gives handmade launch absurdity.",
      "Tintin gives rocket silhouette confidence.",
      "The current fire sprite pack is temporary timing material only.",
    ],
    avoid: [
      "Treating launch as a loading screen.",
      "Mobile particle overload.",
      "Skip button visible from frame zero.",
      "Arcade countdown energy.",
      "Long realistic flamethrower plume.",
    ],
    implication:
      "Prototype the fireball and goat scramble cheaply first. Final launch depends on custom rocket, custom goat animation, and a controlled fire/smoke loop.",
  },
  rocket: {
    label: "Rocket",
    decision: "The rocket is a cinematic toy vehicle, not a game vehicle.",
    why:
      "It can be lightly directed so the world feels alive, but it must still read first as the Kid Apollo icon and the carrier of the porthole threshold.",
    rules: [
      "Compact chrome toy-rocket silhouette with dominant amber porthole.",
      "Input is gentle: drag, tilt, or parallax drift only.",
      "Asteroids create repair beats, not a score/challenge loop.",
      "The porthole always remains the highest-priority action.",
    ],
    avoid: [
      "Arcade steering.",
      "Score, lives, levels, or fail states.",
      "Asteroids becoming navigation.",
      "Mascot tutorial behaviour.",
    ],
    extract: [
      "Tintin gives silhouette confidence and thumbnail clarity.",
      "Wallace & Gromit gives handmade charm and awkward object logic.",
      "Tom Sachs gives repair marks, decals, tape, and built-object evidence.",
      "Moodboard materials provide chrome, red metal, and goat fabric look-dev atoms.",
    ],
    implication:
      "Use the moodboard pack for blockout materials and timing tests only. The final rocket silhouette, decals, porthole, goat behaviour, and launch beat remain custom art direction.",
  },
  companion: {
    label: "Companion / goat",
    decision: "The goat gives scale, warmth, and comic timing without becoming navigation.",
    why:
      "The goat should make the rocket feel inhabited and alive. It is a behaviour layer, not a mascot tutorial or a second interface.",
    rules: [
      "Scramble during ignition.",
      "Cling during liftoff.",
      "Peek and wave at the porthole during arrival.",
      "Idle outside the rocket during space drift.",
      "Repair beat after asteroid soft-contact.",
      "Pfff reaction after near-miss.",
      "Thumbs-up during successful room transition.",
    ],
    extract: [
      "Stop-motion craft references guide material softness.",
      "The goat fabric texture is a look-dev atom, not final character material.",
      "The behaviour list becomes the animation brief.",
    ],
    avoid: [
      "Clickable mascot actions.",
      "Speech bubbles or tutorials.",
      "Over-animating every idle second.",
      "Letting the goat compete with the porthole CTA.",
    ],
    implication:
      "Keep goat animation modular: short authored clips that queue and return to idle. Final model and rig remain commissioned deliverables.",
  },
  outer: {
    label: "Outer space",
    decision: "Space is a quiet stage for the rocket, not a navigation system.",
    why:
      "The scene needs enough depth to feel alive, but not enough spectacle to compete with the porthole.",
    rules: [
      "Sparse starfield, slow drift, no nebula wallpaper.",
      "Space travel is expressed through layered parallax: far star dust, mid-depth stars, rare near streaks, and occasional light sweeps across the rocket.",
      "Movement suggests upward travel without becoming warp speed or a game obstacle field.",
      "Asteroids are atmospheric until they enter the rocket’s soft-contact zone.",
      "Near-miss and contact create feedback beats, not objectives.",
      "No hover labels or links on asteroids.",
      "The porthole remains the only exterior action with priority.",
    ],
    extract: [
      "Sparse starfield gives scale and calm.",
      "Toy saucer keeps the world playful without adding function.",
      "Space Toys category stays an appendix pool, not a style dump.",
    ],
    avoid: [
      "Planets, lens flare, and dramatic sci-fi spectacle.",
      "Clickable debris.",
      "Crowding the frame with collector-toy clutter.",
      "Identical repeated streaks.",
      "Constant comets.",
      "Bright background effects that compete with the porthole.",
    ],
    implication:
      "Prototype asteroid contact as one rate-limited feedback beat only: near-miss, soft shake, dent decal, goat repair, return to idle. No score, health, fail state, or arcade steering.",
  },
  porthole: {
    label: "Porthole transition",
    decision: "The porthole is the proof of concept: CTA, mask, and interior window.",
    why:
      "This is the moment where the website stops feeling like a page and becomes an entrance into the artist world.",
    rules: [
      "Immediate tap flash under 200ms.",
      "Camera push and glass fade lead into circular reveal.",
      "Total transition target: 1.8 to 2.2 seconds.",
      "Reduced motion swaps camera push for a 400ms cross-fade.",
    ],
    extract: [
      "Awwwards circular reveal references give mask mechanics.",
      "GSAP discussion informs sequencing.",
      "TWA, submarine portholes, and 2001 inform threshold patience and physicality.",
    ],
    avoid: [
      "Generic page fade.",
      "Portal effect that feels like a game or loading screen.",
      "Copying film imagery or architecture.",
    ],
    implication:
      "Prototype timing early, then replace primitives with final model assets. Never leave this as only a written instruction.",
  },
  room: {
    label: "Room",
    decision: "The room is the navigation layer and emotional payoff.",
    why:
      "The user should feel they entered a private music space, not a spaceship interior or a product menu.",
    rules: [
      "Slightly elevated cutaway camera.",
      "Warm amber primary light with slate-blue bridge tone.",
      "Six link objects, each with a physical reason.",
      "Ambient objects support the room but do not all become links.",
    ],
    extract: [
      "Uploaded room gives the project-specific anchor.",
      "Cornell gives contained-world object poetry.",
      "Matterport and Belafonte references give whole-room readability.",
    ],
    avoid: [
      "Photoreal scan copy.",
      "Wes Anderson imitation.",
      "Clutter that does not support music or navigation.",
    ],
    implication:
      "Resolve room layout as a production map: object placement, camera angle, label positions, and fallback crop should come from one content model.",
  },
  hotspots: {
    label: "Hotspots",
    decision: "Object first, label second, pulse third.",
    why:
      "The interface works because the physical object already explains the action before the UI appears.",
    rules: [
      "Labels remain HTML/CSS overlays, not 3D text meshes.",
      "Cream pill labels with amber focus cue and thin anchors.",
      "First touch reveals, second touch follows link.",
      "Reduced motion shows labels by default and suppresses pulse loops.",
    ],
    extract: [
      "model-viewer and Drei Html prove DOM-over-3D overlay patterns.",
      "ThingLink and P3D show annotation logic to restyle away from SaaS defaults.",
    ],
    avoid: [
      "Gaming reticles.",
      "Default tooltip styling.",
      "Canvas-only controls with poor accessibility.",
    ],
    implication:
      "Implement hotspot state in accessible HTML, then position against the 3D scene. Keyboard and mobile behaviour must be designed, not added later.",
  },
  fallback: {
    label: "Fallback",
    decision: "Fallback is an editorial poster mode, not an error state.",
    why:
      "Most users arrive from social on mobile. If 3D fails, the artist still needs a fast, branded route to listening and following.",
    rules: [
      "LISTEN: smartlink is the primary CTA.",
      "WATCH: YouTube.",
      "FOLLOW: Instagram + TikTok in fallback; one phone object in the room.",
      "SIGN UP: Laylo.",
      "VINYL: kidapollo.co.uk.",
      "MERCH: coming soon, visible but non-interactive.",
      "TRY 3D / ENTER ROOM is optional discovery.",
    ],
    extract: [
      "Linktree gives hierarchy to exceed, not a visual style to copy.",
      "Awwwards music interfaces suggest polish and pacing.",
      "Apple motion guidelines keep the fallback accessible.",
    ],
    avoid: [
      "Template link-in-bio look.",
      "Apology copy.",
      "Inert buttons or missing focus states.",
    ],
    implication:
      "Ship the fallback as a client-presentable poster with real anchors. The poster still and final object art remain commissioned deliverables.",
  },
  production: {
    label: "Performance / production",
    decision: "Performance is a creative constraint, not a late technical clean-up.",
    why:
      "A 3D artist site that takes too long to show something interesting has failed the concept, even if the assets look good.",
    rules: [
      "First content visible fast; 3D progressively enhances.",
      "Custom where identity matters; source where time matters.",
      "No mobile post-processing spectacle.",
      "Reduced-motion and fallback paths are first-class.",
    ],
    extract: [
      "Bruno Simon, Lusion, Active Theory, and Apple sit in the appendix as polish/performance references.",
      "The PDF sets GLB, draw-call, and motion-budget expectations.",
    ],
    avoid: [
      "Beautiful heavy scene that fails mobile.",
      "Building complex mascot animation before the porthole transition.",
      "Treating fallback as a last-minute safety net.",
    ],
    implication:
      "Build functional first, prototype the porthole early, compress assets, and keep the content map independent from the 3D scene.",
  },
};

function groupByKey(key) {
  return referenceGroups.find((group) => group.key === key);
}

function refsFor(key, limit = 3) {
  return references.filter((ref) => ref.category === key).slice(0, limit);
}

function pageText(page) {
  return pdfPages.find((item) => item.page === page)?.text || "";
}

function excerpt(page, search, fallback) {
  const text = pageText(page).replace(/\s+/g, " ").trim();
  if (!text) return fallback;
  const index = text.toLowerCase().indexOf(search.toLowerCase());
  if (index < 0) return fallback;
  const start = Math.max(0, index - 80);
  return `${text.slice(start, index + 420).trim()}...`;
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SourceLink({ href, children, className = "" }) {
  if (!href) return <span className={className}>{children}</span>;

  const external = href.startsWith("http");
  return (
    <a
      className={cn("source-link", className)}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
      {external ? <ExternalLink aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
    </a>
  );
}

function LazyOnVisible({ children, fallback, className = "", rootMargin = "360px" }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
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
    }, { rootMargin });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  );
}

function ImageBlock({ src, alt, className = "", loading = "lazy", decoding = "async", fetchPriority, width, height }) {
  if (!src) {
    return (
      <div className={cn("image-fallback", className)}>
        <Boxes aria-hidden="true" />
        <span>Linked reference</span>
      </div>
    );
  }

  return (
    <img
      className={cn("image-block", className)}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
    />
  );
}

function Label({ children }) {
  return <span className="label">{children}</span>;
}

function DecisionPanel({ data, dark = false }) {
  if (!data) return null;

  const columns = [
    ["Visual rules", data.rules || []],
    ["Extract from references", data.extract || []],
    ["Avoid", data.avoid || []],
  ].filter(([, items]) => items.length > 0);

  return (
    <article className={cn("decision-panel", dark && "dark-panel")}>
      <div className="decision-lead">
        <Label>{data.label}</Label>
        <h3>{data.decision}</h3>
        <p>{data.why}</p>
      </div>
      <div className="decision-columns">
        {columns.map(([title, items]) => (
          <div className="decision-column" key={title}>
            <strong>{title}</strong>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="production-implication">
        <Sparkles aria-hidden="true" />
        <div>
          <strong>Production implication</strong>
          <p>{data.implication || "Production implication to be confirmed in the next pass."}</p>
        </div>
      </div>
    </article>
  );
}

function Hero() {
  const heroEvidence = primaryReferences.slice(0, 3);

  return (
    <header className="hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src={ASSETS.starfield}
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <nav className="topbar" aria-label="Main">
        <a className="brand" href="#top" aria-label="Kid Apollo home">
          <Rocket aria-hidden="true" />
          Kid Apollo
        </a>
        <div className="nav-links">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="hero-inner" id="top">
        <div className="hero-copy">
          <Label>Living visual direction</Label>
          <h1>Moodboard system for website.</h1>
          <p>
            This website turns the direction into a clear argument: what the world is, what each reference proves,
            what must be built custom, and what the production should avoid.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#position">
              Read the direction <ArrowRight aria-hidden="true" />
            </a>
            <a className="button secondary" href="#references">
              Review sources <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="hero-evidence" aria-label="Primary evidence">
          <div className="evidence-image">
            <img
              src={ASSETS.heroRocket}
              alt="Kid Apollo rocket reference"
              width="1170"
              height="770"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="evidence-list">
            {heroEvidence.map((ref) => (
              <SourceLink key={ref.id} href={ref.url}>
                <strong>{ref.id}</strong>
                {ref.title}
              </SourceLink>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
}

function Section({ id, eyebrow, title, intro, children, dark = false }) {
  return (
    <section id={id} className={cn("section", dark && "section-dark")}>
      <div className="section-inner">
        <div className="section-heading">
          <Label>{eyebrow}</Label>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function PositionSection() {
  return (
    <Section
      id="position"
      eyebrow="01 / Position"
      title="This is not a moodboard. It is a decision document."
      intro={excerpt(
        1,
        "Every decision inside connects back",
        "Every decision connects back to one idea: the porthole is the portal into Kid Apollo's world."
      )}
    >
      <div className="directive-grid">
        {DIRECTIVES.map((item) => (
          <article className="directive" key={item.title}>
            <CheckCircle2 aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="arc-strip">
        {EXPERIENCE.map(([number, title, body]) => (
          <div className="arc-item" key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function VisualDna() {
  return (
    <Section
      id="visual-dna"
      eyebrow="02 / Visual DNA"
      title="A restrained palette, stronger hierarchy, and less decorative repetition."
      intro={excerpt(
        3,
        "The visual DNA is built from four elements",
        "The visual DNA is built from material language, sticker language, labels, and glow behavior."
      )}
      dark
    >
      <div className="dna-layout">
        <div className="palette-panel">
          {DESIGN_DNA.map(([name, color, role]) => (
            <div className="swatch-row" key={name}>
              <span className="swatch" style={{ backgroundColor: color }} />
              <div>
                <strong>{name}</strong>
                <small>{color}</small>
              </div>
              <p>{role}</p>
            </div>
          ))}
        </div>
        <div className="motion-panel">
          <Volume2 aria-hidden="true" />
          <h3>Motion should feel expensive because it is restrained.</h3>
          <p>
            The page now avoids endless repeated cards and uses pacing instead: large evidence, precise notes,
            source links, and compact appendix entries. Interaction cues are described as production rules, not
            decorative UI samples.
          </p>
          <div className="metric-row">
            <span>3s</span>
            <p>Porthole pulse cycle</p>
          </div>
          <div className="metric-row">
            <span>1.8s</span>
            <p>Portal transition target</p>
          </div>
          <div className="metric-row">
            <span>0</span>
            <p>Clickable asteroids</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function EvidenceFeature({ categoryKey, kicker, decision, image }) {
  const group = groupByKey(categoryKey);
  const items = refsFor(categoryKey, 3);

  if (!group) return null;

  return (
    <article className="evidence-feature">
      <div className="feature-media">
        <ImageBlock src={image || items.find((item) => item.image)?.image} alt={group.title} />
      </div>
      <div className="feature-copy">
        <Label>{kicker}</Label>
        <h3>{decision}</h3>
        <p>{group.interpretation || group.note}</p>
        <div className="reference-mini-list">
          {items.map((ref) => (
            <ReferenceMini key={ref.id} item={ref} />
          ))}
        </div>
      </div>
    </article>
  );
}

function ReferenceMini({ item }) {
  return (
    <div className="reference-mini">
      <div>
        <span>{item.id}</span>
        <h4>{item.title}</h4>
        <p>{item.oneLine || item.caption}</p>
      </div>
      <SourceLink href={item.url} className="icon-link">
        Source
      </SourceLink>
    </div>
  );
}

const ROOM_OBJECT_POSITIONS = {
  "record-player": { x: 32, y: 72, rotate: -3, primary: true },
  "crt-tv": { x: 68, y: 48, rotate: 2 },
  phone: { x: 54, y: 65, rotate: -5 },
  "envelope-poster": { x: 43, y: 43, rotate: -8 },
  "vinyl-shelf": { x: 22, y: 53, rotate: 5 },
  "merch-box": { x: 78, y: 76, rotate: -2 },
};

const ROOM_OBJECT_ICONS = {
  "record-player": Disc3,
  "crt-tv": Tv,
  phone: Smartphone,
  "envelope-poster": Mail,
  "vinyl-shelf": Music2,
  "merch-box": Package,
};

function roomObjectStatus(status) {
  return status === "manual-needed" ? "manual" : status;
}

function roomObjectTargetLabel(object) {
  if (!Array.isArray(object.hrefKeys) || object.hrefKeys.length < 2) return "";
  return object.hrefKeys
    .map((key) => (key === "tiktok" ? "TikTok" : key.charAt(0).toUpperCase() + key.slice(1)))
    .join(" / ");
}

function RoomObjectAnnotations({ objects, loading }) {
  return (
    <div className="room-object-annotation-layer" aria-label="Manifest-driven room object labels">
      {objects.map((object) => {
        const position = ROOM_OBJECT_POSITIONS[object.id] || { x: 50, y: 50, rotate: 0 };
        const status = roomObjectStatus(object.status);
        const targetLabel = roomObjectTargetLabel(object);
        const className = cn(
          "room-object-annotation",
          position.primary && "primary",
          object.disabled && "disabled",
          status === "manual" && "manual",
          loading && "loading"
        );

        return (
          <div
            key={object.id}
            className={className}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${position.rotate || 0}deg)`,
            }}
            aria-disabled={object.disabled ? "true" : undefined}
          >
            <strong>{object.label}</strong>
            <span>{object.action}</span>
            {targetLabel && <small>{targetLabel}</small>}
            <em className="room-object-annotation-status">{status}</em>
          </div>
        );
      })}
    </div>
  );
}

function RoomObjectMap({ objects, loading, error }) {
  return (
    <div className="object-map" aria-label="Manifest-driven room object map">
      {objects.map((object) => {
        const Icon = ROOM_OBJECT_ICONS[object.id] || Boxes;
        const targetLabel = roomObjectTargetLabel(object);
        return (
          <div className={cn("object-row", object.disabled && "disabled")} key={object.id}>
            <Icon aria-hidden="true" />
            <div>
              <strong>{object.label}</strong>
              <span>
                {object.action}
                {targetLabel ? ` · ${targetLabel}` : ""} · {roomObjectStatus(object.status)}
              </span>
            </div>
          </div>
        );
      })}
      <p className="room-object-map-note">
        {error
          ? "Room object map shown from the approved fallback list."
          : loading
            ? "Preparing room object map..."
            : "Room object labels are proxy/look-dev only. Final room objects remain custom production art."}
      </p>
    </div>
  );
}

function DirectionSections() {
  const roomObjects = useRoomObjects();

  return (
    <>
      <Section
        id="launch"
        eyebrow="03 / Launch"
        title="The experience starts on Earth, not in empty space."
        intro="The launch beat gives the rocket a place of origin: pad idle, ignition cue, goat scramble, liftoff, Earth recede, and then the calmer space drift."
      >
        <DecisionPanel data={DECISION_SYSTEM.launch} />
      </Section>

      <Section
        id="rocket"
        eyebrow="04 / Evidence"
        title="References now support specific production decisions."
        intro={excerpt(
          4,
          "The rocket is not a vehicle",
          "The rocket is not a vehicle. It is an icon."
        )}
      >
        <DecisionPanel data={DECISION_SYSTEM.rocket} />
        <div className="feature-stack">
          {FEATURED_CATEGORIES.slice(0, 2).map((item) => (
            <EvidenceFeature key={item.categoryKey} {...item} />
          ))}
        </div>
      </Section>

      <Section
        id="outer-space"
        eyebrow="05 / Exterior world"
        title="Outer space stays quiet so the porthole can lead."
        intro={excerpt(
          5,
          "The outer space environment is not a backdrop",
          "The outer space environment is a supporting character, and supporting characters know when to be quiet."
        )}
        dark
      >
        <DecisionPanel data={DECISION_SYSTEM.outer} dark />
        <div className="evidence-row">
          {refsFor("outer-space", 3).map((ref) => (
            <ReferenceCard key={ref.id} item={ref} />
          ))}
        </div>
      </Section>

      <Section
        id="companion"
        eyebrow="06 / Companion"
        title="The goat is a behaviour layer, not a second interface."
        intro="The companion sells scale, warmth, and comic timing across launch, drift, asteroid feedback, and arrival without competing with the porthole."
      >
        <DecisionPanel data={DECISION_SYSTEM.companion} />
        <div className="evidence-row">
          {refsFor("mascot", 3).map((ref) => (
            <ReferenceCard key={ref.id} item={ref} />
          ))}
        </div>
      </Section>

      <Section
        id="motion-prototype"
        eyebrow="07 / Interactive World Preview"
        title="Interactive World Preview"
        intro="First prototype slice: rocket drift, porthole tap, and room arrival. Earth launch and the full goat behaviour system are documented here and land as the next production pass."
      >
        <DecisionPanel data={DECISION_SYSTEM.porthole} />
        <LazyOnVisible fallback={<div className="prototype-loading">World preview queued...</div>}>
          <React.Suspense fallback={<div className="prototype-loading">Loading world preview...</div>}>
            <WorldPreview />
          </React.Suspense>
        </LazyOnVisible>
        <div className="proof-panel">
          <div className="proof-col">
            <strong>What this proves</strong>
            <ul>
              <li>The porthole is the main interaction — not a button, a threshold</li>
              <li>The goat placement adds life and scale without proving the full behaviour system yet</li>
              <li>Asteroids give depth and feedback, but never become navigation</li>
              <li>Rocket motion is ambient float, not game control</li>
              <li>The room reveal is the emotional payoff, not a transition effect</li>
              <li>Fallback keeps the same content map without 3D</li>
            </ul>
          </div>
          <div className="proof-col">
            <strong>Avoid</strong>
            <ul>
              <li>Playable spaceship controls</li>
              <li>Clickable asteroids or floating nav</li>
              <li>Mascot tutorials or speaking animations</li>
              <li>Generic page fades or slide transitions</li>
              <li>Linktree fallback styling or apology copy</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="room"
        eyebrow="08 / Spatial system"
        title="The room and hotspots are explained as an interface, not as decoration."
        intro={excerpt(
          7,
          "Every clickable object",
          "Every clickable object must have a physical reason to be clickable."
        )}
        dark
      >
        <DecisionPanel data={DECISION_SYSTEM.room} dark />
        <div className="room-layout">
          <div className="room-visual">
            <ImageBlock src={ASSETS.room} alt="Kid Apollo room reference" width="1170" height="770" />
            <RoomObjectAnnotations objects={roomObjects.objects} loading={roomObjects.loading} />
          </div>
          <RoomObjectMap {...roomObjects} />
        </div>
        <LazyOnVisible
          className="room-lookdev-previews"
          fallback={<div className="room-lookdev-previews room-lookdev-shell">Room object previews queued...</div>}
        >
          <React.Suspense fallback={<div className="room-lookdev-previews room-lookdev-shell">Loading room object previews...</div>}>
            <RoomObjectLookdevPreviews objects={roomObjects.objects} />
          </React.Suspense>
        </LazyOnVisible>
        <div className="feature-stack compact">
          {FEATURED_CATEGORIES.slice(2, 3).map((item) => (
            <EvidenceFeature key={item.categoryKey} {...item} />
          ))}
        </div>
      </Section>

      <Section
        id="hotspots"
        eyebrow="09 / Hotspot language"
        title="Labels are interface evidence, not decorative stickers."
        intro="The hotspot system must preserve object affordance, accessibility, and reduced-motion behaviour."
      >
        <DecisionPanel data={DECISION_SYSTEM.hotspots} />
        <EvidenceFeature {...FEATURED_CATEGORIES[3]} />
      </Section>
    </>
  );
}

function FallbackAndProduction() {
  return (
    <Section
      id="production"
      eyebrow="08 / Fallback and production"
      title="Fallback becomes poster mode: a polished artist landing page."
      intro="Poster mode is the primary mobile experience when 3D is unavailable. The asset packs shown below are proxy/look-dev material; final art remains commissioned."
    >
      <div className="production-stack">
        <LazyOnVisible fallback={<div className="apollo-poster">Poster mode queued...</div>}>
          <React.Suspense fallback={<div className="apollo-poster">Loading poster mode...</div>}>
            <FallbackPreview heroImage={ASSETS.heroRocket} />
          </React.Suspense>
        </LazyOnVisible>
        <DecisionPanel data={DECISION_SYSTEM.fallback} />

        <div className="rule-list">
          <DecisionPanel data={DECISION_SYSTEM.production} />
          <LazyOnVisible fallback={<div className="asset-pack-shell">Asset pack queued...</div>}>
            <React.Suspense fallback={<div className="asset-pack-shell">Loading asset pack...</div>}>
              <MoodboardAssetPack assets={MOODBOARD_ASSETS} />
            </React.Suspense>
          </LazyOnVisible>
          <LazyOnVisible fallback={<div className="final-art-tracker">Final art tracker queued...</div>}>
            <React.Suspense fallback={<div className="final-art-tracker">Loading final art tracker...</div>}>
              <FinalArtTracker />
            </React.Suspense>
          </LazyOnVisible>
          <div className="production-rules-list">
            {PRODUCTION_RULES.map((rule) => (
              <div className="rule-row" key={rule}>
                <CheckCircle2 aria-hidden="true" />
                <p>{rule}</p>
              </div>
            ))}
          </div>
          <div className="performance-card">
            <Gauge aria-hidden="true" />
            <div>
              <h3>Performance is part of the direction.</h3>
              <p>
                Creative decisions, so the page reads like
                pre-production guidance rather than a decorative gallery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ReferenceCard({ item, featured = false }) {
  const extract = Array.isArray(item.extract) ? item.extract : item.extract ? [item.extract] : [];
  const avoid = Array.isArray(item.avoid) ? item.avoid : item.avoid ? [item.avoid] : [];

  return (
    <article className={cn("reference-card", featured && "featured")}>
      <div className="reference-image">
        <ImageBlock src={item.image} alt={item.title} />
      </div>
      <div className="reference-body">
        <div className="reference-meta">
          <span>{item.id}</span>
          <span>{item.tier}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.caption || item.oneLine}</p>
        <SourceLink href={item.url}>{item.source || "Source"}</SourceLink>

        {(extract.length > 0 || avoid.length > 0) && (
          <div className="extract-grid">
            {extract.length > 0 && (
              <div>
                <strong>Extract</strong>
                <p>{extract.slice(0, featured ? 5 : 3).join(", ")}</p>
              </div>
            )}
            {avoid.length > 0 && (
              <div>
                <strong>Avoid</strong>
                <p>{avoid.slice(0, featured ? 5 : 3).join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ReferenceSystem() {
  const usefulSupporting = supportingReferences.slice(0, 8);
  const usefulAppendix = appendixReferences.slice(0, 8);

  return (
    <Section
      id="references"
      eyebrow="09 / Reference system"
      title="References: curated first, appendix second."
      intro="Primary references carry the argument. Supporting references add production detail. Appendix references stay compact. Every source must defend a decision."
      dark
    >
      {/* Per-category groups with anchor IDs for deep linking from the strip */}
      {referenceGroups.map((group) => {
        const primaries = references
          .filter((r) => r.category === group.key && r.tier === "primary")
          .slice(0, 3);
        if (primaries.length === 0) return null;
        return (
          <div key={group.key} id={`ref-${group.key}`} className="ref-group">
            <div className="ref-group-header">
              <Label>{group.key.replace(/-/g, " ")}</Label>
              <h3>{group.title}</h3>
              {group.note && <p>{group.note}</p>}
            </div>
            <div className="reference-lead-grid">
              {primaries.map((ref, i) => (
                <ReferenceCard key={ref.id} item={ref} featured={i === 0} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="appendix-grid">
        <div>
          <h3>Supporting references</h3>
          {usefulSupporting.map((ref) => (
            <ReferenceMini key={ref.id} item={ref} />
          ))}
        </div>
        <div>
          <h3>Appendix sources</h3>
          {usefulAppendix.length > 0 ? (
            usefulAppendix.map((ref) => <ReferenceMini key={ref.id} item={ref} />)
          ) : (
            <p className="muted-copy">No appendix references have been marked yet.</p>
          )}
        </div>
      </div>
    </Section>
  );
}

function SourceIndex() {
  return (
    <section className="source-index" aria-label="All reference categories">
      <div className="section-inner">
        <div className="source-index-head">
          <Label>All categories</Label>
          <p>
            {referenceGroups.length} groups, {references.length} references. The appendix is intentionally compact so the
            main story stays readable.
          </p>
        </div>
        <div className="category-strip">
          {referenceGroups.map((group) => (
            <a key={group.key} href={`#ref-${group.key}`}>
              <strong>{group.title}</strong>
              <span>{refsFor(group.key, 99).length} refs</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <main>
      <Hero />
      <PositionSection />
      <VisualDna />
      <DirectionSections />
      <FallbackAndProduction />
      <ReferenceSystem />
      <SourceIndex />
      <footer className="footer">
        <Film aria-hidden="true" />
        <p>Kid Apollo Visual Direction. Needed as a decision-led reference document.</p>
      </footer>
    </main>
  );
}

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(<App />);
}
