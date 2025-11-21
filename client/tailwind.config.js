/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'glitch-green': '#00FF41',
                'glitch-blue': '#00F0FF',
                'deep-black': '#000000',
                'dark-gray': '#0F0F0F',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                flicker: {
                    '0%': { opacity: '0.9' },
                    '5%': { opacity: '0.8' },
                    '10%': { opacity: '0.95' },
                    '15%': { opacity: '0.6' },
                    '20%': { opacity: '0.9' },
                    '50%': { opacity: '0.9' },
                    '55%': { opacity: '0.7' },
                    '60%': { opacity: '0.9' },
                    '100%': { opacity: '0.9' },
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' },
                },
            },
            animation: {
                scanline: 'scanline 8s linear infinite',
                flicker: 'flicker 4s infinite',
                glitch: 'glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite',
            },
        },
    },
    plugins: [],
}
