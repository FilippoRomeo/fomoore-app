import React from 'react';

const Contact = () => {
    return (
        <section className="py-20 px-4 md:px-20 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">INITIATE_COMMUNICATION</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                Transmission lines are open. Send a signal for collaboration, inquiries, or encrypted data exchange.
            </p>

            <a
                href="mailto:filippo@fomoore.space"
                className="inline-block border border-glitch-green text-glitch-green px-8 py-4 font-mono text-lg hover:bg-glitch-green hover:text-black transition-all duration-300 relative overflow-hidden group"
            >
                <span className="relative z-10">SEND_SIGNAL</span>
                <div className="absolute inset-0 bg-glitch-green transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0" />
            </a>

            <div className="mt-20 flex justify-center space-x-8 font-mono text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors">GITHUB</a>
                <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
                <a href="#" className="hover:text-white transition-colors">TWITTER</a>
            </div>

            <footer className="mt-20 text-xs text-gray-700 font-mono">
                © {new Date().getFullYear()} FOMOORE.SPACE // ALL RIGHTS RESERVED // SYSTEM_ID: 8X-99
            </footer>
        </section>
    );
};

export default Contact;
