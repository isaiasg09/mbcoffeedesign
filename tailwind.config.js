/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#14100D',
        roast: '#1E1713',
        mocha: '#2B201A',
        crema: '#F3E9DC',
        latte: '#D9C3A5',
        caramel: '#C98B4B',
        amber: '#E8A857',
        cinnamon: '#8A4B2A',
        sage: '#7C8B6F',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        ui: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'studio-radial':
          'radial-gradient(circle at 50% 40%, rgba(232, 168, 87, 0.14), rgba(20, 16, 13, 0) 68%)',
        'vignette-noir':
          'radial-gradient(circle at center, transparent 45%, rgba(20, 16, 13, 0.88) 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0%, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '50%': { transform: 'scale(1.06) translate3d(-1%, -1%, 0)' },
          '100%': { transform: 'scale(1) translate3d(0, 0, 0)' },
        },
        steamFloat: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scaleY(1)' },
          '50%': { transform: 'translate3d(0, -14px, 0) scaleY(1.04)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        kenburns: 'kenburns 26s ease-in-out infinite',
        steamFloat: 'steamFloat 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
