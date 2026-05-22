import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, onOpenProject }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onOpen={() => onOpenProject(project.id)}
      />
    ))}
  </div>
);

export default ProjectGrid;
