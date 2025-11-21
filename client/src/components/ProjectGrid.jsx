import React, { useEffect, useState } from 'react';

const ProjectGrid = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Failed to fetch projects:", err));
    }, []);

    return (
        <section className="py-20 px-4 md:px-20 max-w-7xl mx-auto bg-dark-gray/50">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-bold mb-2">PROJECT LOGS</h2>
                    <p className="font-mono text-glitch-green text-sm">ACCESS LEVEL: PUBLIC</p>
                </div>
                <div className="hidden md:block font-mono text-xs text-gray-500">
                    TOTAL_RECORDS: {projects.length}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div key={project._id} className="group relative border border-gray-800 bg-black p-6 hover:border-glitch-green transition-colors duration-300 overflow-hidden">
                        {/* Glitch Overlay on Hover */}
                        <div className="absolute inset-0 bg-glitch-green/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold font-mono">{project.title}</h3>
                            <span className="text-xs font-mono border border-gray-700 px-2 py-1 rounded text-gray-400">REF_{(index + 1).toString().padStart(3, '0')}</span>
                        </div>

                        <p className="text-gray-400 mb-6">{project.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((t, i) => (
                                <span key={i} className="text-xs font-mono text-glitch-blue bg-glitch-blue/10 px-2 py-1 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-glitch-green opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-glitch-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;
