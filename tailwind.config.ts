import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rich, premium metallic gold
        gold: { DEFAULT: '#C59D3F', dark: '#9E7C2F', light: '#E8C775' },
        // Very dark slate/charcoal (less "blue", more premium soft black)
        navy: { DEFAULT: '#17202E', deep: '#0D131C' },
        // Soft, elegant off-white/cream background
        cream: { DEFAULT: '#FCF9F2' },
        ivory: { DEFAULT: '#FFFFFF' },
        jaggery: { DEFAULT: '#8C5A2B' },
        charcoal: { DEFAULT: '#2B2B2B' },
        leaf: { DEFAULT: '#4A6B48' },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;