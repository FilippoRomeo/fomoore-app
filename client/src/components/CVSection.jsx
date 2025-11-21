import React from 'react';

const CVSection = () => {
    return (
        <section className="py-20 px-4 md:px-20 max-w-7xl mx-auto">
            <div className="border-l-2 border-glitch-green pl-6 mb-12">
                <h2 className="text-4xl font-bold mb-2">PERSONNEL FILE</h2>
                <p className="font-mono text-glitch-green text-sm">ID: FOMOORE_001 // STATUS: ACTIVE</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Sidebar / Skills */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">CORE SYSTEMS</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-400">
                            <li>[+] REACT / TYPESCRIPT</li>
                            <li>[+] THREE.JS / WEBGL</li>
                            <li>[+] PYTHON / PYTORCH</li>
                            <li>[+] MERN STACK</li>
                            <li>[+] DOCKER / LINUX</li>
                            <li>[+] PHYSICAL COMPUTING</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">DESIGN MODULES</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-400">
                            <li>[+] FIGMA / UI / UX</li>
                            <li>[+] BLENDER / 3D</li>
                            <li>[+] ADOBE SUITE</li>
                            <li>[+] GENERATIVE ART</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">EDUCATION</h3>
                        <ul className="space-y-4 font-mono text-sm text-gray-400">
                            <li>
                                <div className="text-white">MSc CREATIVE COMPUTING</div>
                                <div className="text-xs text-gray-600">UAL (2020-2022)</div>
                            </li>
                            <li>
                                <div className="text-white">BSc WEB & MOBILE DEV</div>
                                <div className="text-xs text-gray-600">UWS (2017-2020)</div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-12">
                    {/* Experience Item */}
                    <div className="group">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-2xl font-bold group-hover:text-glitch-green transition-colors">DEEP LEARNING RESIDENT</h3>
                            <span className="font-mono text-sm text-gray-500">MAR 2025 - PRESENT</span>
                        </div>
                        <p className="text-gray-400 mb-4">THE MACHINE LEARNING INSTITUTE</p>
                        <p className="leading-relaxed text-gray-300">
                            Conducting applied AI research focusing on NLP and generative models. Designing end-to-end ML prototypes using Python and data engineering pipelines.
                            Fine-tuning LLMs for creative applications and exploring human-computer interaction.
                        </p>
                    </div>

                    {/* Experience Item */}
                    <div className="group">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-2xl font-bold group-hover:text-glitch-green transition-colors">CREATIVE DIRECTOR & DEV</h3>
                            <span className="font-mono text-sm text-gray-500">DEC 2020 - PRESENT</span>
                        </div>
                        <p className="text-gray-400 mb-4">CEN SPACE LTD</p>
                        <p className="leading-relaxed text-gray-300">
                            Leading end-to-end creation of interactive digital installations and physical computing experiences.
                            Engineered performant frontend interfaces using React, TypeScript, and Tailwind.
                            Bridging the gap between artistic vision and functional design.
                        </p>
                    </div>

                    {/* Experience Item */}
                    <div className="group">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-2xl font-bold group-hover:text-glitch-green transition-colors">ASSOCIATE LECTURER</h3>
                            <span className="font-mono text-sm text-gray-500">DEC 2021 - JUN 2022</span>
                        </div>
                        <p className="text-gray-400 mb-4">UAL - CREATIVE COMPUTING INSTITUTE</p>
                        <p className="leading-relaxed text-gray-300">
                            Mentored students in algorithm implementation, experience design, and game design.
                            Supported academic projects and student development in creative technologies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CVSection;
