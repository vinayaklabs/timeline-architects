/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'timeline': {
          'dark': '#0a0e27',
          'darker': '#050810',
          'accent': '#00d9ff',
          'accent-dark': '#0099cc',
          'success': '#00ff88',
          'warning': '#ffaa00',
          'danger': '#ff3366',
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 20s linear infinite',
        'branch-grow': 'branch-grow 0.6s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
        'drift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'branch-grow': {
          '0%': { opacity: '0', scaleX: '0' },
          '100%': { opacity: '1', scaleX: '1' },
        },
      },
    },
  },
  plugins: [],
}
