import React, { useEffect, useState } from 'react';

const CCTVOverlay = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between p-8 font-mono text-sm text-glitch-green mix-blend-screen">
            {/* Top Bar */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="animate-pulse">● REC</span>
                    <span>CAM 01 [FOMOORE_MAIN]</span>
                </div>
                <div className="text-right">
                    <div>{time.toLocaleDateString()}</div>
                    <div>{time.toLocaleTimeString()}</div>
                </div>
            </div>

            {/* Scanlines & Noise (CSS handled) */}
            <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 2px, 3px 100%'
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

            {/* Bottom Bar */}
            <div className="flex justify-between">
                <div>SYS.STATUS: NORMAL</div>
                <div>LOC: UNKNOWN</div>
            </div>
        </div>
    );
};

export default CCTVOverlay;
