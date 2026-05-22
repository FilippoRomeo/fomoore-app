import React, { Suspense, lazy, useState } from 'react';

const liveComponents = {
  mnist: lazy(() => import('../MNISTCanvas'))
};

const PlaceholderBlock = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-white/10 bg-slate-950/80 p-6 ${className}`}>
    {children}
  </div>
);

const LaunchMNISTPanel = ({ project }) => {
  const [isLaunched, setIsLaunched] = useState(false);
  const LiveComponent = liveComponents[project.live?.component];

  return (
    <>
      <PlaceholderBlock>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-green-400">
              {project.live?.label || 'Interactive component'}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
              Launch the classifier interface from this archive entry. It opens as the current MNIST full-screen shell.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsLaunched(true)}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-mono uppercase tracking-widest text-white transition-colors hover:bg-white/10"
          >
            Launch Demo
          </button>
        </div>
      </PlaceholderBlock>

      {/* TODO: Split MNISTCanvas into inline content and modal shell so this panel can render the classifier directly. */}
      {isLaunched && LiveComponent && (
        <Suspense fallback={null}>
          <LiveComponent
            onClose={() => setIsLaunched(false)}
            onTrainingCountChange={() => {}}
            onTrainingStatusChange={() => {}}
          />
        </Suspense>
      )}
    </>
  );
};

const ProjectLivePanel = ({ project }) => {
  const live = project.live || {};

  if (live.mode === 'component') {
    if (live.component === 'mnist') {
      return <LaunchMNISTPanel project={project} />;
    }

    return (
      <PlaceholderBlock>
        <p className="text-sm text-gray-400">Interactive component pending.</p>
      </PlaceholderBlock>
    );
  }

  if (live.mode === 'video') {
    return (
      <div className="space-y-4">
        {live.embedSrc && (
          <iframe
            title={live.label || project.title}
            src={live.embedSrc}
            className="aspect-video w-full rounded-2xl border border-white/10 bg-slate-950"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
        {live.href && (
          <a
            href={live.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
          >
            <span>Open video in new tab</span>
            <span className="text-gray-300">↗</span>
          </a>
        )}
      </div>
    );
  }

  if (live.mode === 'external') {
    return (
      <PlaceholderBlock>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-green-400">
          {live.label || 'External project'}
        </p>
        {live.note && <p className="mt-3 text-sm leading-relaxed text-gray-400">{live.note}</p>}
        {live.href && (
          <a
            href={live.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
          >
            <span>Open in new tab</span>
            <span className="text-gray-300">↗</span>
          </a>
        )}
      </PlaceholderBlock>
    );
  }

  if (live.mode === 'embed') {
    return live.embedSrc ? (
      <iframe
        title={live.label || project.title}
        src={live.embedSrc}
        className="aspect-video w-full rounded-2xl border border-white/10 bg-slate-950"
        allowFullScreen
        loading="lazy"
      />
    ) : (
      <PlaceholderBlock>
        <p className="text-sm text-gray-400">Embedded output pending.</p>
      </PlaceholderBlock>
    );
  }

  if (live.mode === 'archived') {
    return (
      <PlaceholderBlock>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-green-400">
          {live.label || 'Archived project'}
        </p>
        {live.note && <p className="mt-3 text-sm leading-relaxed text-gray-400">{live.note}</p>}
        <p className="mt-4 text-sm text-gray-500">Demo available on request.</p>
      </PlaceholderBlock>
    );
  }

  if (live.mode === 'pending') {
    return (
      <PlaceholderBlock className="flex h-48 items-center justify-center text-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-green-400">
            {live.label || 'Live output pending'}
          </p>
          {live.note && <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">{live.note}</p>}
        </div>
      </PlaceholderBlock>
    );
  }

  return (
    <PlaceholderBlock>
      <p className="text-sm text-gray-400">Live output pending.</p>
    </PlaceholderBlock>
  );
};

export default ProjectLivePanel;
