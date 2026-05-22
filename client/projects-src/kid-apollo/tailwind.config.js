export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0a1024',
        ink: '#111827',
        paper: '#f3ead8',
        cream: '#d8cdb8',
        amber: '#e09b3d',
        rust: '#8b2b25',
        chrome: '#a9a49a',
        slate: '#2d3b55'
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
