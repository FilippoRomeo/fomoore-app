import React from 'react';

const SectionTitle = ({ children, id }) => (
  <div className="flex items-end gap-4 mb-16 border-b border-white/10 pb-4">
    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{children}</h2>
    <span className="font-mono text-xs text-gray-500 mb-1.5">ID: {id || Math.floor(Math.random() * 9000) + 1000}</span>
  </div>
);

export default SectionTitle;
