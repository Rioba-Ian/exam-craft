/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--line)',
        input: 'var(--line)',
        ring: 'var(--forest)',
        background: 'var(--paper)',
        foreground: 'var(--ink)',
        primary: {
          DEFAULT: 'var(--forest)',
          foreground: 'var(--white)',
        },
        secondary: {
          DEFAULT: 'var(--sienna)',
          foreground: 'var(--white)',
        },
        destructive: {
          DEFAULT: 'var(--red)',
          foreground: 'var(--white)',
        },
        muted: {
          DEFAULT: 'var(--paper2)',
          foreground: 'var(--muted)',
        },
        accent: {
          DEFAULT: 'var(--mint)',
          foreground: 'var(--forest)',
        },
        popover: {
          DEFAULT: 'var(--white)',
          foreground: 'var(--ink)',
        },
        card: {
          DEFAULT: 'var(--white)',
          foreground: 'var(--ink)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--forest)',
          'primary-foreground': 'var(--white)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--forest)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['Inconsolata', 'monospace'],
      },
    },
  },
  plugins: [],
}
