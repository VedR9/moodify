export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'sp-green':    '#1DB954',
        'sp-green-h':  '#1ed760',
        'sp-black':    '#000000',
        'sp-dark':     '#121212',
        'sp-card':     '#181818',
        'sp-elevated': '#282828',
        'sp-hover':    '#2A2A2A',
        'sp-muted':    '#A7A7A7',
        'sp-subtle':   '#6A6A6A',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
