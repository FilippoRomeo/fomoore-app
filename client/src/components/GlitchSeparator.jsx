import React from 'react';

const GlitchSeparator = () => {
    const randomHex = Array(50).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    return (
        <div className="w-full py-12 overflow-hidden relative group">
            <div className="absolute inset-0 bg-green-500/5 skew-y-1 group-hover:skew-y-3 transition-transform duration-500"></div>

            {/* Scrolling Data Stream */}
            <div className="flex whitespace-nowrap font-mono text-xs text-green-500/30 tracking-widest animate-marquee">
                {Array(10).fill(randomHex).map((hex, i) => (
                    <span key={i} className="mx-4">
                        0x{hex.toUpperCase()} // SYSTEM_CHECK //
                    </span>
                ))}
            </div>

            {/* Glitch Line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50 mt-2"></div>
        </div>
    );
};

export default GlitchSeparator;
