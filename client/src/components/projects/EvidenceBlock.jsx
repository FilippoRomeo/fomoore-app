import React from 'react';

const evidenceConfig = {
  archive: {
    label: 'Archive',
    icon: '📦',
    color: 'border-blue-500/30'
  },
  video: {
    label: 'Video',
    icon: '▶',
    color: 'border-red-500/30'
  },
  demo: {
    label: 'Demo',
    icon: '🎮',
    color: 'border-green-500/30'
  },
  github: {
    label: 'GitHub',
    icon: '⚙',
    color: 'border-gray-500/30'
  },
  moodboard: {
    label: 'Moodboard',
    icon: '🎨',
    color: 'border-purple-500/30'
  },
  figma: {
    label: 'Figma',
    icon: '🖼',
    color: 'border-pink-500/30'
  },
  pdf: {
    label: 'PDF',
    icon: '📄',
    color: 'border-orange-500/30'
  },
  prototype: {
    label: 'Prototype',
    icon: '⚡',
    color: 'border-yellow-500/30'
  },
  'asset-pipeline': {
    label: 'Asset Pipeline',
    icon: '🔧',
    color: 'border-cyan-500/30'
  },
  'visual-direction-bible': {
    label: 'Visual Direction Bible',
    icon: '📘',
    color: 'border-sky-500/30'
  },
  'motion-prototype': {
    label: 'Motion Prototype',
    icon: '🎥',
    color: 'border-fuchsia-500/30'
  },
  'fallback-poster-mode': {
    label: 'Fallback Poster Mode',
    icon: '🖼',
    color: 'border-violet-500/30'
  },
  'look-dev-asset-pipeline': {
    label: 'Look-dev Asset Pipeline',
    icon: '🛠',
    color: 'border-teal-500/30'
  },
  'pdf-bible': {
    label: 'PDF Bible',
    icon: '📕',
    color: 'border-orange-500/30'
  }
};

const EvidenceBlock = ({ evidence }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {evidence.map((item) => {
        const config = evidenceConfig[item] || {
          label: item,
          icon: '📋',
          color: 'border-gray-500/30'
        };

        return (
          <div
            key={item}
            className={`flex flex-col items-center justify-center rounded-xl border ${config.color} bg-black/40 px-4 py-6 text-center transition-colors hover:bg-black/60`}
          >
            <div className="text-2xl mb-2">{config.icon}</div>
            <div className="text-xs font-mono uppercase tracking-wider text-gray-300">
              {config.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvidenceBlock;
