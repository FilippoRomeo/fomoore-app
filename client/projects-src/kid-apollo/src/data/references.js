// src/data/references.js
// Kid Apollo Living Visual Bible reference pack.
// Rule: React structures and displays references. It must not generate fake rockets,
// fake goats, fake rooms, fake asteroids, or fake visual assets.

const local = {
  heroRocket: "/assets/hero/rocket-reference.jpg",
  room: "/assets/room/room-reference.jpg",
  roomUpload: "/assets/uploads/room-reference.jpg",
  roomVideo: "/assets/uploads/room-reference-video.mp4",

  rocketTin: "/assets/references/rocket/tin-rocket-skyexpress.jpg",
  apolloPatch: "/assets/references/materials/apollo-11-patch.jpg",
  starfield: "/assets/references/space/starfield-nasa.jpg",
  saucer: "/assets/references/space/toy-flying-saucer.jpg",

  recordPlayer: "/assets/references/objects/record-player.jpg",
  crtTv: "/assets/references/objects/crt-tv.jpg",
  vinyl: "/assets/references/objects/vinyl-record.svg",
};

export const referenceGroups = [
  {
    key: "rocket",
    title: "Rocket shape / toy language",
    note:
      "Primary references for the rocket as a memorable object, not a controllable spaceship.",
    interpretation:
      "The Kid Apollo rocket should feel like a collectible music-world object: chunky, porthole-forward, slightly handmade, chrome/tin with dark red accents, and marked with KA decals.",
    items: [
      {
        id: "R01",
        tier: "primary",
        title: "Tintin moon rocket",
        source: "Tintin.com",
        url: "https://www.tintin.com/en/news/6343/a-lunar-project-tintins-rocket",
        image: null,
        oneLine: "Iconic rocket silhouette as a visual totem.",
        caption:
          "Official Tintin source describing the rocket as an unforgettable visual symbol.",
        extract: [
          "totem-like silhouette",
          "instant recognisability",
          "graphic confidence",
          "thumbnail clarity",
        ],
        avoid: [
          "red-white checker copy",
          "literal Tintin nostalgia",
          "making it too clean or heroic",
        ],
        usage:
          "Linked-only. Use as lineage reference, not direct image reuse unless rights are cleared.",
      },
      {
        id: "R02",
        tier: "primary",
        title: "Wallace & Gromit / A Grand Day Out",
        source: "Wallace & Gromit official site",
        url: "https://www.wallaceandgromit.com/films/a-grand-day-out",
        image: null,
        oneLine: "Homemade rocket charm and domestic absurdity.",
        caption:
          "Official page describes Wallace and Gromit travelling to the moon after building a homemade rocket.",
        extract: [
          "handmade construction",
          "comic softness",
          "slightly awkward object logic",
          "warm craft imperfection",
        ],
        avoid: [
          "copying the orange rocket",
          "cheese gag",
          "turning the mascot into the protagonist",
        ],
        usage:
          "Linked-only. Use as tonal reference for handmade charm.",
      },
      {
        id: "R03",
        tier: "primary",
        title: "Tom Sachs — A Space Program",
        source: "Tom Sachs Studio",
        url: "https://www.tomsachs.com/exhibitions/a-space-program",
        image: null,
        oneLine: "Bricolage space-object language: patched, built, repaired.",
        caption:
          "Sachs’s site frames the work through bricolage and simple materials such as foam-core and hot glue.",
        extract: [
          "visible seams",
          "repair patches",
          "tape and decals",
          "studio-built object evidence",
        ],
        avoid: [
          "too much NASA literalism",
          "cynical art-world tone",
          "overly rough DIY mess",
        ],
        usage:
          "Linked-only. Use as material/process reference.",
      },
      {
        id: "R04",
        tier: "primary",
        title: "Hero rocket reference",
        source: "Local project asset",
        url: local.heroRocket,
        image: local.heroRocket,
        oneLine: "Current local rocket visual anchor.",
        caption:
          "Temporary visual anchor for silhouette, scale, and porthole placement.",
        extract: [
          "overall rocket read",
          "porthole-forward composition",
          "playful object energy",
        ],
        avoid: [
          "treating it as final production asset",
          "repeating it across every section",
        ],
        usage: "Local project asset.",
      },
      {
        id: "R05",
        tier: "supporting",
        title: "Tin Rocket Skyexpress",
        source: "Local asset / Wikimedia Commons reference",
        url: local.rocketTin,
        image: local.rocketTin,
        oneLine: "Tin toy proportions and worn object charm.",
        caption:
          "Real tin rocket reference for material seams, toy gravity, and collectible surface feel.",
        extract: [
          "worn tin",
          "seams",
          "object weight",
          "collectible toy character",
        ],
        avoid: [
          "exact toy identity",
          "antique-only nostalgia",
          "copying colour/markings",
        ],
        usage:
          "Local downloaded reference. Check original source licence/credit before public reuse.",
      },
    ],
  },

  {
    key: "materials",
    title: "Materials, decals and identity marks",
    note:
      "References for mission-patch logic, stickers, labels, and surface identity on the rocket.",
    interpretation:
      "Use mission-patch structure without copying NASA: KA badge, SIDE A sticker, small release/tour marks, repair patch, dark red and chrome/tin material zones.",
    items: [
      {
        id: "M01",
        tier: "supporting",
        title: "Apollo 11 patch",
        source: "Local reference asset",
        url: local.apolloPatch,
        image: local.apolloPatch,
        oneLine: "Patch logic for compact identity marks.",
        caption:
          "Useful for badge hierarchy and circular emblem composition.",
        extract: [
          "circular badge system",
          "symbolic mark hierarchy",
          "small readable emblem",
        ],
        avoid: [
          "direct NASA branding",
          "official mission names",
          "implied affiliation",
        ],
        usage:
          "Local downloaded reference. Treat as design research only.",
      },
      {
        id: "M02",
        tier: "supporting",
        title: "Apollo Mission Patches",
        source: "NASA Science",
        url: "https://science.nasa.gov/resource/apollo-mission-patches/",
        image: null,
        oneLine: "Mission-patch family and emblem hierarchy.",
        caption:
          "NASA source for Apollo flight crew patches.",
        extract: [
          "badge families",
          "symbolic hierarchy",
          "circular composition",
        ],
        avoid: [
          "direct patch reuse",
          "NASA logos",
          "official insignia in final branding",
        ],
        usage:
          "Linked-only. Verify NASA media and emblem rules before any reuse.",
      },
      {
        id: "M03",
        tier: "appendix",
        title: "Human Spaceflight Mission Patches",
        source: "NASA",
        url: "https://www.nasa.gov/gallery/human-spaceflight-mission-patches/",
        image: null,
        oneLine: "Broad patch-system reference library.",
        caption:
          "Large NASA gallery across Mercury, Gemini, Apollo, Shuttle, ISS, and newer crew missions.",
        extract: [
          "patch taxonomy",
          "families of marks",
          "small-format storytelling",
        ],
        avoid: [
          "official-style parody",
          "copying agency identity",
        ],
        usage: "Linked-only.",
      },
      {
        id: "M04",
        tier: "primary",
        title: "Sticker / decal system",
        source: "Production direction",
        url: null,
        image: null,
        oneLine: "The identity layer that makes the rocket belong to Kid Apollo.",
        caption:
          "KA decal, SIDE A sticker, tour/release mark, music detail, and repair label become the repeated surface language across rocket and room.",
        extract: [
          "KA decal hierarchy",
          "SIDE A music reference",
          "tour/release sticker",
          "repair label",
          "surface storytelling",
        ],
        avoid: [
          "generic space stickers",
          "second monogram",
          "NASA cosplay",
          "too many marks",
        ],
        usage:
          "Description-only production reference. Build custom; no external image required.",
      },
    ],
  },

  {
    key: "outer-space",
    title: "Outer space atmosphere",
    note:
      "Space is a stage, not a navigation system. Asteroids and props are decorative only.",
    interpretation:
      "Use a sparse starfield, slow drifting toy-like objects, and tiny signal/satellite details. Do not turn asteroids into links.",
    items: [
      {
        id: "S01",
        tier: "appendix",
        title: "Sparse starfield",
        source: "Local NASA reference asset",
        url: local.starfield,
        image: local.starfield,
        oneLine: "Quiet cosmic depth without spectacle.",
        caption:
          "Reference for restrained space atmosphere and negative space.",
        extract: [
          "darkness",
          "scale",
          "calm depth",
          "background restraint",
        ],
        avoid: [
          "nebula wallpaper",
          "dramatic sci-fi spectacle",
          "over-detailed cosmic imagery",
        ],
        usage:
          "Local downloaded reference. Verify source/credit.",
      },
      {
        id: "S02",
        tier: "appendix",
        title: "Toy flying saucer",
        source: "toy-flying-saucer.jpg",
        url: local.saucer,
        image: null,
        oneLine: "Playful secondary cosmic prop.",
        caption:
          "Useful for background charm and toy-world atmosphere.",
        extract: [
          "small prop scale",
          "toy absurdity",
          "decorative cosmic detail",
        ],
        avoid: [
          "making props clickable",
          "competing with the rocket",
        ],
        usage:
          "Local downloaded reference. Verify source/credit.",
      },
      {
        id: "S03",
        tier: "appendix",
        title: "Space Toys category",
        source: "Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/Category:Space_toys",
        image: null,
        oneLine: "Research pool for toy-space objects.",
        caption:
          "Useful source pool for rockets, spaceships, saucers, and tin space toys.",
        extract: [
          "secondary object families",
          "playful props",
          "toy-world language",
        ],
        avoid: [
          "overfilling the space scene",
          "random collector-board feeling",
        ],
        usage: "Linked-only source pool.",
      },
    ],
  },

  {
    key: "mascot",
    title: "Mascot / repair beat",
    note:
      "The goat/sheep is a small companion and rare repair moment, not a protagonist.",
    interpretation:
      "Use a soft, low-complexity creature with limited animation: idle, blink, inspect, repair spark, return. Do not over-characterise it.",
    items: [
      {
        id: "G01",
        tier: "primary",
        title: "Wallace & Gromit craft reference",
        source: "Wallace & Gromit official site",
        url: "https://www.wallaceandgromit.com/films/a-grand-day-out",
        image: null,
        oneLine: "Handmade companion-world charm.",
        caption:
          "Reference for small character actions that feel warm and handmade.",
        extract: [
          "domestic humour",
          "soft timing",
          "handmade imperfection",
          "gentle repair-beat tone",
        ],
        avoid: [
          "making the mascot the lead",
          "big slapstick animation",
          "overly childish behaviour",
        ],
        usage: "Linked-only tonal reference.",
      },
      {
        id: "G02",
        tier: "supporting",
        title: "Stylized Sheep",
        source: "Sketchfab / AmauryEspinoza",
        url: "https://sketchfab.com/3d-models/stylized-sheep-fe4497f9f5044f3abc8886fccd30df3d",
        image: null,
        oneLine: "Low-poly sheep direction for mobile-friendly mascot form.",
        caption:
          "Useful for compact companion silhouette and low-detail performance logic.",
        extract: [
          "simple silhouette",
          "low-poly restraint",
          "mobile-friendly character scale",
        ],
        avoid: [
          "game mascot energy",
          "overly expressive face",
        ],
        usage: "Linked-only. Check licence before use.",
      },
      {
        id: "G03",
        tier: "supporting",
        title: "Goat Character",
        source: "Sketchfab / Cheah Nick Feng",
        url: "https://sketchfab.com/3d-models/goat-character-e638ac1084db4d6084f315a7afecd0e5",
        image: null,
        oneLine: "Goat-specific silhouette direction.",
        caption:
          "Potential reference for goat shape if the mascot becomes more goat than sheep.",
        extract: [
          "goat profile",
          "horn/ear silhouette",
          "small companion body",
        ],
        avoid: [
          "humanoid character acting",
          "main-character framing",
        ],
        usage: "Linked-only. Check licence before use.",
      },
      {
        id: "G04",
        tier: "appendix",
        title: "Fantastic Mr. Fox puppet tone",
        source: "Searchlight Pictures / Wes Anderson lineage",
        url: "https://www.searchlightpictures.com/fantastic-mr-fox/",
        image: null,
        oneLine: "Handmade puppet warmth without protagonist energy.",
        caption:
          "Tonal reference for tactile character material and restrained stop-motion charm.",
        extract: [
          "puppet material feel",
          "contained expression",
          "handmade character warmth",
        ],
        avoid: [
          "copying character designs",
          "over-cinematic mascot framing",
          "making the mascot the brand lead",
        ],
        usage:
          "Linked-only tonal reference. Do not scrape or reproduce film imagery.",
      },
      {
        id: "G05",
        tier: "appendix",
        title: "Jiří Trnka / Czech stop-motion",
        source: "Czech Film Center",
        url: "https://www.filmcenter.cz/en/people/1023-jiri-trnka",
        image: null,
        oneLine: "Classic puppet restraint and crafted movement.",
        caption:
          "Useful as lineage for gentle, low-frequency puppet motion and tactile staging.",
        extract: [
          "puppet restraint",
          "crafted imperfection",
          "quiet character movement",
        ],
        avoid: [
          "dark folklore tone",
          "complex character acting",
          "nostalgia pastiche",
        ],
        usage:
          "Linked-only tonal reference. Use for movement language, not visual copying.",
      },
    ],
  },

  {
    key: "porthole",
    title: "Porthole / portal transition",
    note:
      "The porthole is outside CTA, transition mask, and then a secondary window inside.",
    interpretation:
      "Build the transition as a motivated sequence: glow cue, tap, camera push, reflection fade, circular reveal, room arrival.",
    items: [
      {
        id: "P01",
        tier: "primary",
        title: "Material Design circular reveal",
        source: "Awwwards",
        url: "https://www.awwwards.com/inspiration/material-design-transitions-circular-reveal",
        image: null,
        oneLine: "Clear circular reveal behaviour.",
        caption:
          "Useful for porthole-as-mask mechanics, not for final style.",
        extract: [
          "radial mask logic",
          "timing structure",
          "state transition continuity",
        ],
        avoid: [
          "flat Material Design look",
          "generic app transition feeling",
        ],
        usage: "Linked-only inspiration reference.",
      },
      {
        id: "P02",
        tier: "supporting",
        title: "Circle Reveal Animation",
        source: "Awwwards",
        url: "https://www.awwwards.com/inspiration/circle-reveal-animation",
        image: null,
        oneLine: "Portal-like circular reveal motion.",
        caption:
          "Reference for expanding circle/mask behaviour.",
        extract: [
          "circular reveal",
          "mask expansion",
          "motion continuity",
        ],
        avoid: [
          "generic transition demo",
          "overly slick web-award style",
        ],
        usage: "Linked-only inspiration reference.",
      },
      {
        id: "P03",
        tier: "supporting",
        title: "GSAP circular transition discussion",
        source: "GSAP Community",
        url: "https://gsap.com/community/forums/topic/33773-circular-transition-to-reveal-nextprevious-section/",
        image: null,
        oneLine: "Technical precedent for circular section reveal.",
        caption:
          "Useful precedent for timing the porthole-to-room reveal.",
        extract: [
          "iris reveal timeline",
          "mask behaviour",
          "GSAP sequencing",
        ],
        avoid: [
          "copying demo visuals",
          "making it feel like regular page navigation",
        ],
        usage: "Linked-only production reference.",
      },
      {
        id: "P04",
        tier: "primary",
        title: "TWA Flight Center threshold",
        source: "Eero Saarinen / TWA Hotel",
        url: "https://www.twahotel.com/history",
        image: null,
        oneLine: "Architectural threshold, warm interior glow, and portal-like entry.",
        caption:
          "Lineage reference for treating the porthole as a threshold moment rather than a generic button.",
        extract: [
          "threshold architecture",
          "warm interior reveal",
          "curved frame language",
          "arrival drama",
        ],
        avoid: [
          "literal airport aesthetic",
          "mid-century set dressing",
          "copying architecture forms",
        ],
        usage:
          "Linked-only lineage reference. Use for spatial feeling and threshold logic.",
      },
      {
        id: "P05",
        tier: "supporting",
        title: "Submarine porthole industrial design",
        source: "Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/Category:Portholes",
        image: null,
        oneLine: "Brass ring, rivets, thick glass, and subtle distortion.",
        caption:
          "Source pool for physical porthole construction details that can inform the portal rim.",
        extract: [
          "brass ring",
          "thick glass",
          "rivets",
          "physical threshold",
        ],
        avoid: [
          "nautical theme",
          "literal submarine UI",
          "overbuilt industrial grit",
        ],
        usage:
          "Linked-only source pool. Verify licences before using any specific image.",
      },
      {
        id: "P06",
        tier: "appendix",
        title: "2001 iris transition lineage",
        source: "Stanley Kubrick / Warner Bros.",
        url: "https://www.warnerbros.com/movies/2001-space-odyssey",
        image: null,
        oneLine: "Circular reveal patience and camera restraint.",
        caption:
          "Tonal reference for slow circular transition discipline, not a visual source to reproduce.",
        extract: [
          "patient camera movement",
          "circular transition lineage",
          "restraint",
        ],
        avoid: [
          "copying film imagery",
          "cold sci-fi seriousness",
          "overly monumental tone",
        ],
        usage:
          "Linked-only tonal reference. Do not scrape or reproduce film imagery.",
      },
    ],
  },

  {
    key: "room",
    title: "Room / dollhouse / contained world",
    note:
      "The room is the navigation layer and the emotional payoff. It should feel warm, musical, and object-rich.",
    interpretation:
      "Use the uploaded room as the primary anchor, supported by Cornell-style contained worlds and Matterport-style dollhouse readability.",
    items: [
      {
        id: "RM01",
        tier: "primary",
        title: "Uploaded room reference",
        source: "Project upload",
        url: local.room,
        image: local.room,
        oneLine: "Primary anchor for the inner world.",
        caption:
          "Cutaway feel, real furniture density, lived-in warmth, and music-room context.",
        extract: [
          "room-as-object",
          "furniture density",
          "music context",
          "imperfect lived-in detail",
          "annotation potential",
        ],
        avoid: [
          "photorealistic copy",
          "raw scan artefacts",
          "dark sci-fi room",
        ],
        usage: "Project-provided local asset.",
      },
      {
        id: "RM02",
        tier: "supporting",
        title: "Room reference video",
        source: "Project upload",
        url: local.roomVideo,
        image: local.room,
        oneLine: "Motion and atmosphere reference for the room.",
        caption:
          "Useful for understanding the lived-in behaviour, warmth, and object relationships.",
        extract: [
          "real room behaviour",
          "warmth",
          "spatial depth",
          "music environment",
        ],
        avoid: [
          "literal documentary recreation",
          "overloading the final room",
        ],
        usage: "Project-provided local video.",
      },
      {
        id: "RM03",
        tier: "primary",
        title: "Joseph Cornell boxes",
        source: "Guggenheim Venice",
        url: "https://www.guggenheim-venice.it/en/art/artists/joseph-cornell/",
        image: null,
        oneLine: "Contained poetic worlds made from objects.",
        caption:
          "Cornell’s Aviary, Hotel, Observatory, and Medici boxes are useful lineage for small worlds inside containers.",
        extract: [
          "contained-world logic",
          "object poetry",
          "intimate display",
          "cabinet/diorama thinking",
        ],
        avoid: [
          "museum austerity",
          "too much surrealist obscurity",
        ],
        usage: "Linked-only museum reference.",
      },
      {
        id: "RM04",
        tier: "supporting",
        title: "Matterport Dollhouse View",
        source: "Matterport Support",
        url: "https://support.matterport.com/s/article/Matterport-Viewing-Modes-3D-Dollhouse-360-and-Video?language=en_US",
        image: null,
        oneLine: "Whole-room cutaway readability.",
        caption:
          "Matterport describes Dollhouse View as a 3D representation that shows the full structure at a glance.",
        extract: [
          "room-as-object readability",
          "cutaway overview",
          "whole-structure visibility",
        ],
        avoid: [
          "real-estate UI",
          "grey corporate scan aesthetic",
        ],
        usage: "Linked-only documentation reference.",
      },
      {
        id: "RM05",
        tier: "supporting",
        title: "Matterport Dollhouse labels",
        source: "Matterport Blog",
        url: "https://matterport.com/blog/dollhouse-view-just-got-upgrade",
        image: null,
        oneLine: "Labels inside a dollhouse-style spatial view.",
        caption:
          "Reference for labels helping wayfinding and directing attention inside dollhouse view.",
        extract: [
          "spatial labels",
          "room annotations",
          "attention guidance",
        ],
        avoid: [
          "property-tour styling",
          "overly functional corporate labels",
        ],
        usage: "Linked-only documentation reference.",
      },
      {
        id: "RM06",
        tier: "supporting",
        title: "Belafonte cutaway / The Life Aquatic",
        source: "Searchlight Pictures",
        url: "https://www.searchlightpictures.com/the-life-aquatic-with-steve-zissou/",
        image: null,
        oneLine: "Contained cross-section room logic.",
        caption:
          "Lineage reference for seeing a whole contained world at once while preserving character and production design.",
        extract: [
          "cutaway readability",
          "room-as-stage",
          "contained world",
          "object-led storytelling",
        ],
        avoid: [
          "copying film stills",
          "Wes Anderson imitation",
          "over-symmetrical dollhouse styling",
        ],
        usage:
          "Linked-only tonal reference. Do not scrape or reproduce film imagery.",
      },
      {
        id: "RM07",
        tier: "appendix",
        title: "Studio Ghibli interior warmth",
        source: "Studio Ghibli",
        url: "https://www.ghibli.jp/works/",
        image: null,
        oneLine: "Warm lived-in rooms with objects that imply a life beyond frame.",
        caption:
          "Tonal reference for warmth, small domestic details, and object memory. Use sparingly.",
        extract: [
          "warm domestic light",
          "lived-in detail",
          "object memory",
        ],
        avoid: [
          "copying animation frames",
          "anime styling",
          "overusing the reference visually",
        ],
        usage:
          "Linked-only tonal reference. Do not scrape or reproduce film imagery.",
      },
    ],
  },

  {
    key: "objects",
    title: "Room object links",
    note:
      "Every link needs a physical reason. Object first, label second, pulse third.",
    interpretation:
      "The record player, TV, phone, envelope/poster, vinyl shelf, and merch box become the interface. Avoid floating buttons except in fallback mode.",
    items: [
      {
        id: "O01",
        tier: "primary",
        title: "Record player",
        source: "Local external reference asset",
        url: local.recordPlayer,
        image: local.recordPlayer,
        oneLine: "Physical object for Listen.",
        caption:
          "Strongest music affordance in the room.",
        extract: [
          "turntable shape",
          "tactile listening cue",
          "music object familiarity",
        ],
        avoid: [
          "generic streaming play icon",
          "DJ club styling",
        ],
        usage: "Local downloaded reference. Verify source/credit.",
      },
      {
        id: "O02",
        tier: "primary",
        title: "CRT TV",
        source: "Local external reference asset",
        url: local.crtTv,
        image: local.crtTv,
        oneLine: "Physical object for Watch.",
        caption:
          "Screen-as-portal logic for video links.",
        extract: [
          "retro screen mass",
          "video object clarity",
          "watch affordance",
        ],
        avoid: [
          "floating YouTube button",
          "generic modern monitor",
        ],
        usage: "Local downloaded reference. Verify source/credit.",
      },
      {
        id: "O03",
        tier: "primary",
        title: "Vinyl record",
        source: "Local external reference asset",
        url: local.vinyl,
        image: local.vinyl,
        oneLine: "Physical object for Vinyl / Store.",
        caption:
          "Music-commerce object language.",
        extract: [
          "record form",
          "shelf/store association",
          "tactile commerce",
        ],
        avoid: [
          "flat e-commerce icon",
          "generic shopping button",
        ],
        usage: "Local downloaded reference.",
      },
      {
        id: "O04",
        tier: "appendix",
        title: "Record Players category",
        source: "Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/Category:Record_players",
        image: null,
        oneLine: "Source pool for record-player object variety.",
        caption:
          "Research category for different record-player forms.",
        extract: [
          "platter",
          "tonearm",
          "mechanical audio object",
        ],
        avoid: [
          "random object dump",
          "uncredited reuse",
        ],
        usage: "Linked-only source pool.",
      },
      {
        id: "O05",
        tier: "appendix",
        title: "CRT Television Sets category",
        source: "Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/Category:CRT_television_sets",
        image: null,
        oneLine: "Source pool for physical TV/watch objects.",
        caption:
          "Reference pool for CRT TV forms and vintage screen objects.",
        extract: [
          "screen volume",
          "retro display shape",
          "video affordance",
        ],
        avoid: [
          "over-nostalgic retro cliché",
        ],
        usage: "Linked-only source pool.",
      },
      {
        id: "O06",
        tier: "supporting",
        title: "Envelope / poster sign-up object",
        source: "Production direction",
        url: null,
        image: null,
        oneLine: "Physical invitation logic for mailing list sign-up.",
        caption:
          "The sign-up action should live on an envelope, pinned poster, note, or show flyer so it has a reason to exist in the room.",
        extract: [
          "paper invitation",
          "mailing-list affordance",
          "poster/flyer tactility",
        ],
        avoid: [
          "floating form button",
          "generic newsletter icon",
          "corporate modal styling",
        ],
        usage: "Description-only production reference.",
      },
      {
        id: "O07",
        tier: "supporting",
        title: "Cardboard merch box",
        source: "Production direction",
        url: null,
        image: null,
        oneLine: "Quiet coming-soon commerce object.",
        caption:
          "A taped box, shipping label, or half-open merch carton can hold the future merch state without pretending the store is ready.",
        extract: [
          "shipping label",
          "coming-soon tactility",
          "dimmed object state",
        ],
        avoid: [
          "full e-commerce platform",
          "shopping-cart default",
          "fake available products",
        ],
        usage: "Description-only production reference.",
      },
      {
        id: "O08",
        tier: "appendix",
        title: "Ambient music-room objects",
        source: "Production direction",
        url: null,
        image: null,
        oneLine: "Cassette, notebook, keyboard, speaker, and cables as supporting detail.",
        caption:
          "Ambient objects should make the room feel used, but only six objects carry navigation.",
        extract: [
          "music-room density",
          "non-clickable atmosphere",
          "artist process cues",
        ],
        avoid: [
          "every object becoming a link",
          "clutter without purpose",
          "prop-shopping moodboard feel",
        ],
        usage: "Description-only production reference.",
      },
    ],
  },

  {
    key: "hotspots",
    title: "Hotspot / spatial UI",
    note:
      "The UI should be object-attached, calm, and legible. Not a game HUD.",
    interpretation:
      "Use cream pill labels, subtle amber pulse, thin anchor lines, and reduced-motion labels visible by default.",
    items: [
      {
        id: "H01",
        tier: "supporting",
        title: "model-viewer annotations",
        source: "Google model-viewer",
        url: "https://modelviewer.dev/examples/annotations",
        image: null,
        oneLine: "Object-attached DOM hotspot logic.",
        caption:
          "Documentation shows hotspots added through child elements whose slot begins with hotspot.",
        extract: [
          "object-attached labels",
          "position-based hotspots",
          "DOM overlay logic",
        ],
        avoid: [
          "default product-demo styling",
          "generic tooltip look",
        ],
        usage: "Linked-only documentation reference.",
      },
      {
        id: "H02",
        tier: "supporting",
        title: "ThingLink 3D annotations",
        source: "ThingLink",
        url: "https://www.thinglink.com/blog/guide-to-3d/",
        image: null,
        oneLine: "Hotspots as text/media/link gateways.",
        caption:
          "ThingLink describes interactive 3D model hotspots that can contain text, images, video, questions, web links, or embeds.",
        extract: [
          "interactive tags",
          "media/link hotspots",
          "content gateway logic",
        ],
        avoid: [
          "education platform styling",
          "SaaS annotation look",
        ],
        usage: "Linked-only documentation reference.",
      },
      {
        id: "H03",
        tier: "supporting",
        title: "P3D annotations",
        source: "P3D",
        url: "https://p3d.in/faq/annotations",
        image: null,
        oneLine: "Clickable 3D annotations with focus behaviour.",
        caption:
          "P3D describes hotspots that annotate models and can control camera focus.",
        extract: [
          "clickable callouts",
          "camera focus",
          "nested hotspots",
        ],
        avoid: [
          "SaaS default callout styling",
        ],
        usage: "Linked-only reference.",
      },
      {
        id: "H04",
        tier: "supporting",
        title: "React Three Fiber / Drei Html overlays",
        source: "Drei documentation",
        url: "https://drei.docs.pmnd.rs/misc/html",
        image: null,
        oneLine: "HTML/CSS labels attached to 3D positions.",
        caption:
          "Implementation reference for keeping hotspot labels as DOM overlays rather than 3D text meshes.",
        extract: [
          "DOM overlay labels",
          "accessible HTML controls",
          "3D-positioned UI",
        ],
        avoid: [
          "3D text meshes",
          "unreadable perspective labels",
          "canvas-only interaction",
        ],
        usage: "Linked-only implementation reference.",
      },
    ],
  },

  {
    key: "fallback",
    title: "Mobile fallback and CTA hierarchy",
    note:
      "The fallback is a finished, branded product path, not an error state.",
    interpretation:
      "Use a clean artist landing-page layout: static image, Listen primary, secondary links, audio toggle, no-WebGL copy, Enter Room optional.",
    items: [
      {
        id: "F01",
        tier: "primary",
        title: "Linktree music templates",
        source: "Linktree",
        url: "https://linktr.ee/s/templates/music",
        image: null,
        oneLine: "Musician-specific link hierarchy.",
        caption:
          "Useful for understanding standard music landing-page link priorities.",
        extract: [
          "Listen first",
          "music/social/store hierarchy",
          "fast mobile access",
        ],
        avoid: [
          "generic Linktree look",
          "template aesthetic",
        ],
        usage: "Linked-only reference.",
      },
      {
        id: "F02",
        tier: "supporting",
        title: "Awwwards Music Interfaces",
        source: "Awwwards",
        url: "https://www.awwwards.com/awwwards/collections/music-interfaces/",
        image: null,
        oneLine: "Music-interface inspiration pool.",
        caption:
          "Awwwards collection around music players, audio visualisers, playlists, and music-interface UI.",
        extract: [
          "music UI rhythm",
          "audio control treatment",
          "premium interface feel",
        ],
        avoid: [
          "overbuilding fallback",
          "award-site gimmicks",
        ],
        usage: "Linked-only inspiration pool.",
      },
      {
        id: "F03",
        tier: "supporting",
        title: "Apple Human Interface Guidelines — Motion",
        source: "Apple Developer",
        url: "https://developer.apple.com/design/human-interface-guidelines/motion",
        image: null,
        oneLine: "Motion should support understanding, not decorate.",
        caption:
          "Apple advises avoiding unnecessary motion for frequent UI interactions.",
        extract: [
          "motion restraint",
          "accessibility sensitivity",
          "purposeful feedback",
        ],
        avoid: [
          "Apple luxury imitation",
          "over-polished product-page feeling",
        ],
        usage: "Linked-only design guideline reference.",
      },
      {
        id: "F04",
        tier: "appendix",
        title: "Bruno Simon portfolio",
        source: "Bruno Simon",
        url: "https://bruno-simon.com/",
        image: null,
        oneLine: "Playful performant Three.js world as web product.",
        caption:
          "Appendix inspiration for mobile-friendly interactive 3D polish and responsiveness.",
        extract: [
          "playful 3D performance",
          "clear interaction model",
          "progressive polish",
        ],
        avoid: [
          "turning Kid Apollo into a game",
          "copying interaction mechanics",
          "vehicle control language",
        ],
        usage: "Linked-only inspiration. Do not copy structure or mechanics.",
      },
      {
        id: "F05",
        tier: "appendix",
        title: "Lusion",
        source: "Lusion",
        url: "https://lusion.co/",
        image: null,
        oneLine: "Cinematic web 3D polish and interaction restraint.",
        caption:
          "Appendix reference for high-end 3D web craft and confident visual pacing.",
        extract: [
          "cinematic web pacing",
          "interaction polish",
          "technical craft",
        ],
        avoid: [
          "agency-showreel tone",
          "overbuilt effects",
          "performance-heavy spectacle",
        ],
        usage: "Linked-only inspiration.",
      },
      {
        id: "F06",
        tier: "appendix",
        title: "Active Theory",
        source: "Active Theory",
        url: "https://activetheory.net/",
        image: null,
        oneLine: "Interactive web experience craft and performance ambition.",
        caption:
          "Appendix reference for premium real-time experience direction, not a style target.",
        extract: [
          "real-time experience polish",
          "scene confidence",
          "mobile ambition",
        ],
        avoid: [
          "copying agency aesthetics",
          "overcomplicating the artist site",
          "spectacle over music",
        ],
        usage: "Linked-only inspiration.",
      },
      {
        id: "F07",
        tier: "appendix",
        title: "Apple product page pacing",
        source: "Apple",
        url: "https://www.apple.com/",
        image: null,
        oneLine: "Shipped mobile-first product storytelling discipline.",
        caption:
          "Appendix reference for pacing, performance expectations, and hierarchy. Not a visual style to imitate.",
        extract: [
          "mobile polish",
          "controlled reveal rhythm",
          "clear hierarchy",
        ],
        avoid: [
          "Apple aesthetic imitation",
          "tech-luxury gloss",
          "overly generic product tone",
        ],
        usage: "Linked-only pacing reference.",
      },
      {
        id: "F08",
        tier: "supporting",
        title: "Soft particle fireball reference",
        source: "Local visual direction note",
        url: null,
        image: null,
        oneLine: "Compact soft flame reference for launch direction.",
        caption:
          "Visual direction only; final method remains a production choice.",
        extract: [
          "compact flame",
          "soft edge",
          "hot core",
          "noisy amber rim",
        ],
        avoid: [
          "long plume",
          "tech-demo realism",
          "mobile particle overload",
        ],
        usage:
          "Visual direction only; final method remains a production choice.",
      },
    ],
  },

  {
    key: "board-logic",
    title: "Board logic and editorial moodboard behaviour",
    note:
      "The site should feel like a curated visual bible, not a dashboard.",
    interpretation:
      "Use references as blocks of thought: image, caption, source, extraction, decision. Avoid dumping research links without visual hierarchy.",
    items: [
      {
        id: "B01",
        tier: "appendix",
        title: "Are.na",
        source: "Are.na",
        url: "https://www.are.na/",
        image: null,
        oneLine: "Reference-board thinking as structured blocks.",
        caption:
          "Are.na describes itself as software for saving and organising important content, and as a toolkit for assembling new worlds from old scraps.",
        extract: [
          "block/channel logic",
          "curated references",
          "thoughtful visual grouping",
        ],
        avoid: [
          "bare Are.na clone",
          "unformatted link dump",
        ],
        usage: "Linked-only product reference.",
      },
      {
        id: "B02",
        tier: "supporting",
        title: "Apple product story pacing",
        source: "Apple",
        url: "https://www.apple.com/",
        image: null,
        oneLine: "Editorial product-section pacing.",
        caption:
          "Use as pacing reference only: large visuals, restrained copy, clear hierarchy.",
        extract: [
          "section rhythm",
          "image-first hierarchy",
          "confident whitespace",
        ],
        avoid: [
          "Apple aesthetic imitation",
          "tech-luxury tone",
        ],
        usage: "Linked-only broad pacing reference.",
      },
      {
        id: "B03",
        tier: "supporting",
        title: "Decision-led reference rule",
        source: "Production rule",
        url: null,
        image: null,
        oneLine: "References must support a decision, not decorate the board.",
        caption:
          "Every reference should answer what to extract, what to avoid, and how it changes production. If it cannot do that, it belongs in the appendix or should be removed.",
        extract: [
          "decision-led curation",
          "evidence hierarchy",
          "production implication",
        ],
        avoid: [
          "pretty-but-unexplained imagery",
          "equal-weight source dumps",
          "moodboard repetition",
        ],
        usage: "Visible editorial rule for the whole site.",
      },
    ],
  },
];

export const categories = referenceGroups.map((group) => ({
  key: group.key,
  title: group.title,
  note: group.note,
}));

export const references = referenceGroups.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    category: group.key,
  }))
);

export const primaryReferences = references.filter((ref) => ref.tier === "primary");
export const supportingReferences = references.filter((ref) => ref.tier === "supporting");
export const appendixReferences = references.filter((ref) => ref.tier === "appendix");
