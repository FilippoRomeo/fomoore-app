import React from 'react';
import ThermalModel from '../../components/ThermalModel';
import MNISTThermal from '../../components/MNISTThermal';
import ProjectCard from './ProjectCard';

const previewMap = {
  'glitch-bot': <ThermalModel shape="box" />,
  'spray-bot': <ThermalModel shape="sphere" />,
  'mnist-classifier': <MNISTThermal />
};

const ProjectGrid = ({ projects, onOpenProject }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onOpen={() => onOpenProject(project.id)}
        preview={previewMap[project.id]}
      />
    ))}
  </div>
);

export default ProjectGrid;
