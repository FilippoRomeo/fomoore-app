import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
    const nameRef = useRef(null);
    const subRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial State
        gsap.set(nameRef.current, { text: "FILIPPO ROMEO" });

        // Glitch/Scramble Effect to FOMOORE
        tl.to(nameRef.current, {
            duration: 2,
            text: {
                value: "FOMOORE",
                delimiter: "",
            },
            ease: "none",
            delay: 1,
            onUpdate: function () {
                // Optional: Add random characters during transition for glitch effect
                // This is a simple implementation, can be enhanced
            }
        })
            .from(subRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out"
            }, "-=0.5");

    }, []);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-deep-black text-white">
            <div className="z-10 text-center">
                <h1
                    ref={nameRef}
                    className="text-6xl md:text-9xl font-bold tracking-tighter font-sans glitch-text"
                    style={{ textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}
                >
                    FILIPPO ROMEO
                </h1>
                <p
                    ref={subRef}
                    className="mt-4 text-xl md:text-2xl font-mono text-gray-400 tracking-widest"
                >
                    FULL STACK DEVELOPER
                </p>
            </div>

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-0 opacity-20" />
        </section>
    );
};

export default Hero;
