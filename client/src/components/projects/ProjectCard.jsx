import React from 'react';

const ProjectCard = ({ project, onOpen, preview }) => {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] group">
      <div className="relative h-48 overflow-hidden bg-slate-950">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : preview ? (
          <div className="absolute inset-0 overflow-hidden">{preview}</div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
            <div className="text-[10px] uppercase tracking-[0.4em] text-green-400">{project.type}</div>
            <div className="text-sm font-bold leading-snug">{project.subtitle || project.title}</div>
          </div>
        )}

        <button
          onClick={onOpen}
          type="button"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0"
        />

        <div className="absolute left-4 top-4 rounded-full bg-black/70 border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-green-300">
          {project.fileCode}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-black/70 border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-300">
          {project.status}
        </div>
      </div>

      <div className="flex h-full flex-col p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onOpen}
          type="button"
          className="mt-auto inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-green-600"
        >
          {project.ctaLabel || 'View Project'}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
