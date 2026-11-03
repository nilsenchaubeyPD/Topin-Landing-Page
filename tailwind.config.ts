import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  // better-ui: hover styles only on hover-capable pointers, so taps don't leave a stuck hover
  future: { hoverOnlyWhenSupported: true },
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      nav: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      // Same values as the :root tokens in globals.css (hex here so Tailwind opacity modifiers work).
      colors: {
        navy: '#0C1638',
        'navy-2': '#1F355A',
        // Primary Blue scale from the Brandbook (OKLCH steps; brand colour at 600)
        blue: {
          DEFAULT: '#2563EB', hover: '#1D52D0', deep: '#0763FF',
          50: '#F0F6FE', 100: '#DCEAFF', 200: '#C2DAFF', 300: '#9EC2FF', 400: '#6EA1FF', 500: '#407FFD',
          600: '#2563EB', 700: '#1D52D0', 800: '#1943AA', 900: '#1A3886', 950: '#122556',
        },
        cyan: { DEFAULT: '#33B5D9', soft: '#CEEEF3' },
        snow: '#FAF6F2',
        stone: '#EFECE4',
        sand: '#D9D5CD',
        green: { DEFAULT: '#465C35', mid: '#66B88C', soft: '#E9F5E0' },
        warm: { DEFAULT: '#65303D', mid: '#E49A52', soft: '#FFF5C8' },
        wine: '#65303D',
        'yellow-soft': '#FFF5C8',
        'red-soft': '#F5ECEC',
        'rec-red': '#E5484D',
        'outline-hover': '#F2EFE8',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        h1: ['60px', { lineHeight: '64px', letterSpacing: '-0.035em', fontWeight: '700' }],
        'h1-lg': ['56px', { lineHeight: '60px', letterSpacing: '-0.035em', fontWeight: '700' }],
        'h1-m': ['44px', { lineHeight: '48px', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2-xl': ['40px', { lineHeight: '46px', letterSpacing: '-0.025em', fontWeight: '500' }],
        'h2-how': ['40px', { lineHeight: '46px', letterSpacing: '-0.025em', fontWeight: '500' }],
        h2: ['40px', { lineHeight: '46px', letterSpacing: '-0.025em', fontWeight: '500' }],
        'h2-faq': ['40px', { lineHeight: '46px', letterSpacing: '-0.025em', fontWeight: '500' }],
        'h2-m': ['32px', { lineHeight: '38px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'card-title': ['26px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        stat: ['44px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
        lead: ['18px', { lineHeight: '28px' }],
        eyebrow: ['13px', { lineHeight: '16px', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      maxWidth: { container: '1200px' },
      borderRadius: { card: '28px', panel: '18px', btn: '14px', pill: '99px' },
      boxShadow: {
        card: '0 20px 40px rgba(12,22,56,.10)',
        'card-hover': '0 28px 56px rgba(12,22,56,.14)',
        float: '0 24px 48px rgba(12,22,56,.14)',
        btn: '0 1px 2px rgba(12,22,56,.12)',
        'btn-hover': '0 2px 6px rgba(12,22,56,.16)',
        video: '0 30px 60px rgba(0,0,0,.35)',
        nav: '0 8px 24px rgba(12,22,56,.06)',
        glow: '0 0 40px rgba(37,99,235,.35)',
      },
      transitionTimingFunction: { 'out-expo': 'cubic-bezier(.22,1,.36,1)' },
      keyframes: {
        'float-a': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'float-b': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(7px)' } },
        'float-c': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(255,255,255,.35)' },
          '100%': { boxShadow: '0 0 0 14px rgba(255,255,255,0)' },
        },
        drift: { '0%': { transform: 'translate(-3px,-2px)' }, '100%': { transform: 'translate(3px,2px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shine: { '0%,80%': { transform: 'translateX(-120%) skewX(-20deg)' }, '100%': { transform: 'translateX(320%) skewX(-20deg)' } },
        caret: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '-200px 0' }, '100%': { backgroundPosition: '200px 0' } },
      },
      animation: {
        'float-a': 'float-a 6s ease-in-out infinite',
        'float-b': 'float-b 7s ease-in-out infinite',
        'float-c': 'float-c 5s ease-in-out infinite',
        blink: 'blink 1.6s ease-in-out infinite',
        'blink-fast': 'blink 1.2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        drift: 'drift 3s ease-in-out infinite alternate',
        marquee: 'marquee 40s linear infinite',
        shine: 'shine 6s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
        shimmer: 'shimmer 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
