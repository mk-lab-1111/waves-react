/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0C12',
        bgElevated: '#12151D',
        bgCard: '#161A24',
        line: 'rgba(255,255,255,0.06)',
        ink: '#FFFFFF',
        inkSoft: '#D9DCE5',
        inkFaint: '#A3A9B8',
        gold: '#E8C896',
        goldSoft: 'rgba(232,200,150,0.15)',
        goldLine: 'rgba(232,200,150,0.35)',
      },
      fontFamily: {
        serif: ['Shippori Mincho', 'serif'],
        sans: ['Zen Kaku Gothic New', 'sans-serif'],
      },
      animation: {
        idlePulse: 'idlePulse 6s ease-in-out infinite',
      },
      keyframes: {
        idlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
