import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed left-6 bottom-6 w-[60vw] max-w-md h-12 hidden md:flex flex-row items-center justify-between z-50 font-mono text-[10px] text-gray-600 select-none pointer-events-none">
            <div className="h-px w-full bg-gray-800 absolute left-0 bottom-2"></div>

            {/* Timecodes */}
            {[0, 25, 50, 75, 100].map((val) => (
                <div key={val} className="relative pb-4">
                    <span className="opacity-50">{val < 10 ? `0${val}` : val}:00</span>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-2 w-px bg-gray-600"></div>
                </div>
            ))}

            {/* Seek Head with REC dot */}
            <div
                className="absolute bottom-0 h-8 w-4 flex flex-col items-center justify-end pb-2 transition-all duration-100 ease-out"
                style={{ left: `${scrollProgress * 100}%` }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                    <span className="text-red-500 font-bold tracking-tighter text-[8px]">REC</span>
                </div>
                <div className="w-px h-full bg-green-500"></div>
            </div>
        </div>
    );
};

export default ScrollProgress;
