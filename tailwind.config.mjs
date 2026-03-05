/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cosmic: {
          deep: '#0a0e27',
          blue: '#1a2847',
        },
        neural: {
          teal: '#2dd4bf',
        },
        golden: {
          core: '#f59e0b',
          glow: '#fbbf24',
        },
        lavender: {
          soft: '#c4b5fd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(45, 212, 191, 0.3)',
        'glow-md': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glow-lg': '0 0 40px rgba(251, 191, 36, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};