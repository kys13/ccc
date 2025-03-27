/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#FF5C35',
          50: '#FFF0EC',
          100: '#FFE1D9',
          200: '#FFC3B3',
          300: '#FFA58C',
          400: '#FF8766',
          500: '#FF5C35',
          600: '#FF4A1F',
          700: '#FF3809',
          800: '#F32D00',
          900: '#DD2900',
        },
        secondary: {
          DEFAULT: '#FF8A3D',
          50: '#FFF4EC',
          100: '#FFE9D9',
          200: '#FFD3B3',
          300: '#FFBD8C',
          400: '#FFA766',
          500: '#FF8A3D',
          600: '#FF7824',
          700: '#FF660B',
          800: '#F25C00',
          900: '#DD5500',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#111827',
            a: {
              color: '#FF5C35',
              '&:hover': {
                color: '#FF3809',
              },
            },
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#111827',
            },
            h3: {
              color: '#111827',
            },
            strong: {
              color: '#111827',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 