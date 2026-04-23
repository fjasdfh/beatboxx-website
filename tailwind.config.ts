import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: {
          DEFAULT: '#F5F3E6',
          dark: '#0A0A0A'
        },
        foreground: {
          DEFAULT: '#373A2C',
          dark: '#FAFAFA'
        },
        primary: {
          DEFAULT: '#526526',
          light: '#D4EC9D',
          dark: '#2A3513'
        },
        accent: {
          DEFAULT: '#AEB29E',
          light: '#D4EC9D',
          vibrant: '#8FD14F'
        },
        muted: {
          DEFAULT: '#AEB29E',
          foreground: '#737373'
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          light: '#E5E7EB',
          dark: '#374151'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 2.5s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '25%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
          '75%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(212 236 157 / 0.5), 0 0 20px rgb(212 236 157 / 0.3)' },
          '100%': { boxShadow: '0 0 20px rgb(212 236 157 / 0.8), 0 0 40px rgb(212 236 157 / 0.5)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#373A2C',
            '--tw-prose-headings': '#2A3513',
            '--tw-prose-lead': '#373A2C',
            '--tw-prose-links': '#526526',
            '--tw-prose-bold': '#2A3513',
            '--tw-prose-counters': '#737373',
            '--tw-prose-bullets': '#AEB29E',
            '--tw-prose-hr': '#E5E7EB',
            '--tw-prose-quotes': '#373A2C',
            '--tw-prose-quote-borders': '#D4EC9D',
            '--tw-prose-captions': '#737373',
            '--tw-prose-code': '#2A3513',
            '--tw-prose-pre-code': '#F5F3E6',
            '--tw-prose-pre-bg': '#2A3513',
            '--tw-prose-th-borders': '#E5E7EB',
            '--tw-prose-td-borders': '#E5E7EB',
            h1: { fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: '700' },
            h2: { fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: '700' },
            h3: { fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: '600' },
            h4: { fontFamily: 'Space Grotesk, system-ui, sans-serif', fontWeight: '600' },
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: '#8FD14F',
              textUnderlineOffset: '3px',
              transition: 'color 0.15s ease',
              '&:hover': { color: '#8FD14F' },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#D4EC9D33',
              padding: '0.15rem 0.35rem',
              borderRadius: '0.3rem',
              fontWeight: '500',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '3px',
              paddingLeft: '1.25rem',
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [typography],
}
export default config
