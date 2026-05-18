import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import Card from '../layout/Card';

const evidenceLabels = {
  archive: 'Archive',
  video: 'Video',
  demo: 'Demo',
  github: 'GitHub',
  moodboard: 'Moodboard',
  figma: 'Figma',
  pdf: 'PDF',
  prototype: 'Prototype',
  'asset-pipeline': 'Asset Pipeline'
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/10 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative border-b border-white/10">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title}
              className="w-full max-h-[520px] object-contain bg-black"
            />
          ) : (
            <div className="flex h-72 items-center justify-center bg-slate-950 text-center px-6">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-green-400 mb-3">{project.type}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">{project.summary}</p>
              </div>
            </div>
          )}

          <div className="absolute left-6 bottom-6 px-3 py-1 rounded-full bg-black/70 border border-green-500/30 text-green-400 text-[10px] font-mono tracking-widest uppercase">
            {project.status}
          </div>
        </div>

        <div className="p-6 md:p-10 grid md:grid-cols-[1.5fr_1fr] gap-10">
          <div>
            <p className="font-mono text-xs text-green-500 mb-3">{project.fileCode}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{project.summary}</p>

            {project.longDescription?.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-sm text-gray-400 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            {project.evidence?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-mono text-white uppercase tracking-widest mb-3">Evidence</h3>
                <div className="flex flex-wrap gap-2">
                  {project.evidence.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-gray-300"
                    >
                      {evidenceLabels[item] || item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <Card title="Role">
              <p className="text-sm text-gray-400 leading-relaxed">{project.role}</p>
            </Card>

            <Card title="Stack">
              <div className="flex flex-wrap gap-2">
                {project.stack?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            {project.links?.length > 0 && (
              <Card title="Links">
                <div className="space-y-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors hover:bg-white/10"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="h-4 w-4 text-gray-300" />
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
