import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6D2E46',
          secondary: '#A26769',
          accent: '#ECE2D0',
          bg: '#FAF7F2',
          dark: '#2D1B2E',
          muted: '#8B7082',
        },
        success: '#4A7C59',
        warning: '#C4923A',
        danger: '#C0392B',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        lg: '12px',
        md: '8px',
      },
    },
  },
  plugins: [],
};

export default config;
