import React from 'react';

const Card = ({ children, className = '', title, meta }) => (
  <div className={`relative backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] group ${className}`}>
    <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-white/20 rounded-tl-lg"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-white/20 rounded-tr-lg"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-white/20 rounded-bl-lg"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-white/20 rounded-br-lg"></div>

    {(title || meta) && (
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
        {title && <h3 className="text-sm font-mono text-gray-300 uppercase tracking-wider">{title}</h3>}
        {meta && <span className="text-xs font-mono text-gray-600">{meta}</span>}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

export default Card;
