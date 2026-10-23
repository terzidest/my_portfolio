/** @type {import('tailwindcss').Config} */

// Theme tokens are RGB channels set per theme in src/index.css (:root = light,
// .dark = dark), so one class (`bg-ground`, `text-ink`) themes itself and
// opacity modifiers (`bg-surface/60`) still work.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#2563EB',    // blue-600
          light: '#60A5FA',   // blue-400
        },
        ground: token('ground'),
        surface: {
          DEFAULT: token('surface'),
          raised: token('surface-raised'),
        },
        ink: {
          DEFAULT: token('ink'),
          soft: token('ink-soft'),
          muted: token('ink-muted'),
        },
        line: token('line'),
        neon: token('neon'),
        signal: token('signal'),
        link: {
          DEFAULT: token('link'),
          hover: token('link-hover'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
