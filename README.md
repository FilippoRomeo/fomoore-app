# Filippo Romeo Portfolio Archive

A Vite + React portfolio site for showcasing creative technology work, AI prototypes, WebGL systems, app demos, design studies, and production case studies.

The site is structured as a reusable project archive rather than a single hardcoded portfolio page. Projects are defined in a central data file and rendered through shared card/modal components, so new projects can be added without rewriting the main app structure.

## Purpose

This site is used to present work for future clients, employers, collaborators, and studio opportunities.

It is designed to support multiple project formats:

- Interactive web / Three.js demos
- AI and machine learning prototypes
- Archived client websites
- Moodboards and production-direction bibles
- Figma or design process studies
- PDF evidence / case-study documents
- Video-based work
- Full-stack app demos
- Asset and look-development pipelines

## Current structure

```txt
src/
  App.jsx
  index.css

  data/
    projects.js

  components/
    layout/
      Card.jsx
      SectionTitle.jsx

    projects/
      ProjectGrid.jsx
      ProjectCard.jsx
      ProjectModal.jsx

    Brand3D.jsx
    ThermalModel.jsx
    TechBackground.jsx
    GlitchSeparator.jsx
    ScrollProgress.jsx
    MNISTCanvas.jsx
    MNISTVisual.jsx
    MNISTThermal.jsx