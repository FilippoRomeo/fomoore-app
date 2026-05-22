# Kid Apollo — Living Visual Direction Bible

React / Three.js / GSAP / Tailwind implementation of the Kid Apollo visual direction bible.

## What this is

A web-native, interactive art-direction prototype using the uploaded PDF text as the source spine. It does not generate fake reference images. References are real external sources with working URLs. Public/Commons/NASA images are embedded where appropriate; uncertain portfolio/platform references are linked-only.

## Install

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Export to PDF

Open the page in Chrome, press Print, choose Save as PDF, enable background graphics, and use A4 portrait.

## Key logic locked

- Asteroids are decorative only.
- Links live inside the room.
- Outer world has subtle tilt only, not flight.
- Porthole is the portal and transition mask.
- Once inside, porthole becomes secondary atmosphere/window.
- Fallback UI is a basic link-safe mobile screen.
