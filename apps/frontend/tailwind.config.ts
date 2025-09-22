import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FDE2EC',   // rosado pastel suave
          DEFAULT: '#F8AFCB', // rosado medio elegante
          dark: '#C77995',    // acento más oscuro
        },
        neutral: {
          light: '#FAFAFA',
          DEFAULT: '#888888',
          dark: '#2E2E2E',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
        xl: '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,0.08)',
        pastel: '0 6px 16px rgba(248, 175, 203, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
