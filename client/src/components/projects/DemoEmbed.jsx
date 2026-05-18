import React from 'react';

const DemoEmbed = ({ project }) => {
  const demo = project.demo;

  if (!demo || demo.type !== 'iframe') {
    return (
      <div className="flex h-96 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80">
        <div className="text-center px-6">
          <div className="mb-4 text-4xl">🎬</div>
          <h3 className="text-lg font-mono text-gray-400 uppercase tracking-widest">
            Demo Embed Pending
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Interactive demo for "{project.title}" coming soon
          </p>
        </div>
      </div>
    );
  }

  const title = demo.label || project.title;
  const height = demo.height || 640;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_0_120px_rgba(15,23,42,0.25)]">
      <div className="w-full overflow-hidden bg-black/20">
        <iframe
          title={title}
          src={demo.src}
          className="w-full border-0"
          style={{ minHeight: height }}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-4 border-t border-white/10 bg-slate-950/90 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">{demo.label || 'Embedded Demo'}</p>
          <p className="mt-2 text-sm text-gray-300 max-w-2xl">
            View the living visual direction bible prototype directly in the case study.
          </p>
        </div>
        <a
          href={demo.src}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
        >
          Open full case study
        </a>
      </div>
    </div>
  );
};

export default DemoEmbed;
