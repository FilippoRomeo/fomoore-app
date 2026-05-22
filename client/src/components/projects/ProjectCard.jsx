import React from 'react';
import ProjectVisual from './ProjectVisual';

const ProjectCard = ({ project, onOpen }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${project.title}`}
      className="relative flex h-full cursor-pointer flex-col backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] group"
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-white/20 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-white/20 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-white/20 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-white/20 rounded-br-lg"></div>

      <div className="relative h-48 shrink-0 overflow-hidden bg-slate-950">
        <ProjectVisual projectId={project.id} variant={project.visual?.variant} />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-green-300">
          {project.fileCode}
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-300">
          {project.status}
        </div>
        {project.category && (
          <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gray-400">
            {project.category}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">{project.type}</p>
        <h3 className="text-lg font-bold leading-snug text-white">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">{project.summary}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto w-full rounded-full border border-white/10 bg-white/5 py-2.5 text-center text-sm font-mono uppercase tracking-widest text-white transition-colors group-hover:border-white/20 group-hover:bg-white/10">
          {project.ctaLabel || 'View Project'}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
