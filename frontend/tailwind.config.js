/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00fff9',
          purple: '#ff00ff',
          pink: '#ff71ce',
          green: '#01ffa3',
          yellow: '#fffb96'
        },
        cyber: {
          black: '#0D0D0D',
          dark: '#1A1A1A',
          primary: '#00fff9',
          secondary: '#ff00ff',
          accent: '#ff71ce'
        }
      },
      boxShadow: {
        neon: '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
        'neon-strong': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue), 0 0 40px theme(colors.neon.blue)',
        'neon-purple': '0 0 5px theme(colors.neon.purple), 0 0 20px theme(colors.neon.purple)'
      },
    },
  },
  plugins: [],
}
