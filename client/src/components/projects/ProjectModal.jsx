import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ProjectVisual from './ProjectVisual';
import ProjectLivePanel from './ProjectLivePanel';

const evidenceLabels = {
  archive: 'Archive',
  video: 'Video',
  demo: 'Demo',
  github: 'GitHub',
  moodboard: 'Moodboard',
  figma: 'Figma',
  pdf: 'PDF',
  prototype: 'Prototype',
  'asset-pipeline': 'Asset Pipeline',
  'visual-direction-bible': 'Visual Direction Bible',
  'motion-prototype': 'Motion Prototype',
  'fallback-poster-mode': 'Fallback Poster Mode',
  'look-dev-asset-pipeline': 'Look-dev Asset Pipeline',
  'pdf-bible': 'PDF Bible'
};

const SectionHeading = ({ children }) => (
  <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500">
    {children}
  </h3>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const paragraphs = project.longDescription ? project.longDescription.split('\n\n') : [project.summary];
  const githubLinks = project.links?.filter((link) => link.type === 'github') || [];
  const assetLinks = project.links?.filter((link) => link.type !== 'github') || [];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative mx-auto my-8 w-full max-w-4xl rounded-2xl border border-white/10 bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="sticky top-4 right-4 z-20 float-right w-10 h-10 rounded-full bg-black/70 border border-white/10 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="clear-both" />

        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-slate-950">
          <ProjectVisual projectId={project.id} variant={project.visual?.variant} />
          <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-green-300">
            {project.fileCode}
          </div>
          <div className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-300">
            {project.status}
          </div>
        </div>

        <header className="border-b border-white/10 px-8 pb-6 pt-8">
          <p className="text-[10px] font-mono text-green-500 tracking-[0.35em] uppercase">
            FILE CODE: {project.fileCode}
          </p>
          <h2 className="mt-1 text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
          <p className="mt-1 text-sm text-gray-500 uppercase tracking-widest">{project.type}</p>
          <p className="mt-4 max-w-2xl text-gray-400 leading-relaxed">{project.summary}</p>
          {project.category && (
            <span className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gray-400">
              {project.category}
            </span>
          )}
        </header>

        <section className="border-b border-white/10 px-8 py-6">
          <SectionHeading>IDENTITY / DESIGN</SectionHeading>
          <div className="space-y-3 text-sm leading-relaxed text-gray-400">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 px-8 py-6">
          <SectionHeading>DEV</SectionHeading>
          <div className="flex flex-wrap gap-6">
            <div className="min-w-48 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">ROLE</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{project.role}</p>
            </div>
            <div className="min-w-48 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">STACK</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.stack?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {githubLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
            >
              <span>{link.label}</span>
              <span className="text-gray-300">↗</span>
            </a>
          ))}
        </section>

        <section className="border-b border-white/10 px-8 py-6">
          <SectionHeading>LIVE</SectionHeading>
          <ProjectLivePanel project={project} onClose={onClose} />
        </section>

        <section className="px-8 py-6">
          <SectionHeading>ASSETS</SectionHeading>
          {project.evidence?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.evidence.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gray-300"
                >
                  {evidenceLabels[item] || item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Asset links pending.</p>
          )}

          {assetLinks.length > 0 && (
            <div className="mt-5 space-y-3">
              {assetLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external !== false ? '_blank' : undefined}
                  rel={link.external !== false ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
                >
                  <span>
                    <span className="block">{link.label}</span>
                    {link.note && <span className="mt-1 block text-xs text-gray-500">{link.note}</span>}
                  </span>
                  <span className="text-gray-300">↗</span>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProjectModal;
