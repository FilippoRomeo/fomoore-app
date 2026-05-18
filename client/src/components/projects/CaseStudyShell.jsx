import React from 'react';
import Card from '../layout/Card';
import EvidenceBlock from './EvidenceBlock';
import DemoEmbed from './DemoEmbed';

const CaseStudyShell = ({ project }) => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <p className="font-mono text-xs text-green-500 mb-3">{project.fileCode}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
        {project.subtitle && (
          <p className="text-lg text-gray-400 mb-4">{project.subtitle}</p>
        )}
        <p className="text-gray-400 leading-relaxed max-w-3xl">{project.summary}</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12">
        {/* Left Column: Description & Evidence */}
        <div className="space-y-8">
          {project.longDescription && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Overview</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {project.demo && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Living Visual Direction Bible</h2>
              <DemoEmbed project={project} />
            </div>
          )}

          {project.evidence && project.evidence.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Evidence</h2>
              <EvidenceBlock evidence={project.evidence} />
            </div>
          )}

          {project.processNotes && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-mono text-sm text-gray-300 uppercase tracking-wider mb-3">
                Process Notes
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.processNotes}</p>
            </div>
          )}
        </div>

        {/* Right Column: Metadata Cards */}
        <div className="space-y-6">
          {project.role && (
            <Card title="Role">
              <p className="text-sm text-gray-400 leading-relaxed">{project.role}</p>
            </Card>
          )}

          {project.stack && project.stack.length > 0 && (
            <Card title="Stack">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {project.year && (
            <Card title="Year">
              <p className="text-sm text-gray-400">{project.year}</p>
            </Card>
          )}

          {project.status && (
            <Card title="Status">
              <p className="text-sm text-gray-400">{project.status}</p>
            </Card>
          )}
        </div>
      </div>

      {/* Links Section */}
      {project.links && project.links.length > 0 && (
        <div className="border-t border-white/10 pt-8">
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-colors hover:bg-white/10"
              >
                <span className="font-mono text-sm text-gray-300 uppercase tracking-wider">
                  {link.label}
                </span>
                <span className="text-xs text-gray-600">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyShell;
