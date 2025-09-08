# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Beatboxx Website** - A modern, responsive marketing website for the Beatboxx mobile app, built with Next.js 14 and deployed to an Ionos VPS. The site features sophisticated animations, glass morphism UI design, and mobile-first responsive layouts.

**Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Radix UI

## Development Commands

### Core Development
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing & Quality
- No test framework configured - manual testing only
- ESLint configured with Next.js core web vitals rules
- TypeScript strict mode enabled

### Deployment
- `./deploy.sh` - Deploy to production VPS (requires SSH access)
- `./deploy-fixed.sh` - Alternative deployment script
- PM2 ecosystem configured for production process management

## Project Structure

### App Router Architecture (Next.js 14)
```
app/
├── layout.tsx          # Root layout with font loading and metadata
├── page.tsx            # Homepage with all sections
├── privacy/page.tsx    # Privacy policy page
└── terms/page.tsx      # Terms of use page
```

### Component Architecture
```
components/
├── AnimatedButton.tsx     # Reusable button with hover animations
├── AppShowcase.tsx        # App screenshot carousel
├── BentoGrid.tsx          # Feature grid with glass morphism
├── FloatingCTA.tsx        # Fixed mobile CTA button
├── HeroPhoneCarousel.tsx  # 3D phone showcase (currently commented out)
├── MobileNav.tsx          # Mobile navigation component
├── MobileShowcase.tsx     # Mobile-optimized app showcase
├── ParticleBackground.tsx # Animated particle effects
└── PhoneMockup.tsx        # iPhone mockup component
```

### Assets & Static Files
```
public/
├── screenshots/           # App screenshots for showcases
├── og.png                # OpenGraph image
└── favicon files         # Various favicon formats
```

## Design System

### Typography
- **Primary Font**: Inter (sans-serif)
- **Display Font**: Space Grotesk (headings)
- **Mono Font**: JetBrains Mono

### Color Palette
```scss
// Primary colors
background: '#F5F3E6' (light) / '#0A0A0A' (dark)
foreground: '#373A2C' (light) / '#FAFAFA' (dark)
primary: '#526526' with light '#D4EC9D' and dark '#2A3513'
accent: '#AEB29E' with vibrant '#8FD14F'
```

### Animation System
- **Framer Motion**: All animations and transitions
- **Custom Keyframes**: 12+ custom animations (fade, slide, morph, glow, etc.)
- **Performance**: Optimized with `will-change` and GPU acceleration
- **Responsive**: Reduced motion respected via CSS media queries

## Key Features & Patterns

### Glass Morphism UI
- Backdrop blur effects with layered gradients
- Border styling with semi-transparent colors
- Multi-layer backgrounds for depth

### Mobile-First Responsive Design
- Breakpoints: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- Progressive enhancement from mobile to desktop
- Touch-friendly interactions and hover states

### Performance Optimizations
- Image optimization with Next.js `<Image>` component
- Lazy loading with `useInView` from react-intersection-observer
- Framer Motion viewport triggers for scroll animations
- Static export compatibility (`unoptimized: true` for images)

## Content Management

### Page Content
- **Hero Section**: TypeScript animation with rotating verbs
- **Features**: Array-driven with icons from Lucide React
- **FAQ Section**: Collapsible items with smooth animations
- **Testimonials**: Real user quotes with star ratings
- **App Showcase**: Screenshot carousel with phone mockups

### SEO & Metadata
- Comprehensive OpenGraph and Twitter card setup
- Structured metadata in `app/layout.tsx`
- Robots.txt configuration for search engines
- Optimized for "beatbox", "beatboxing", "music recording" keywords

## Deployment Architecture

### Production Environment
- **VPS**: Ionos VPS Linux XS (Ubuntu 22.04)
- **Process Manager**: PM2 with ecosystem.config.js
- **Domain**: beatboxx.app with SSL via Let's Encrypt
- **Port**: 3000 (proxied through nginx)

### Deployment Process
1. Local build and test
2. SSH deployment script transfers files
3. PM2 restart with zero-downtime
4. Automatic log rotation and error handling

### Monitoring & Maintenance
- PM2 status monitoring
- Log files in `/logs/` directory (err.log, out.log, combined.log)
- Memory limit: 1GB with auto-restart
- Deployment guides in `maintenance-guide.md` and `vps-setup-guide.md`

## Development Guidelines

### Component Patterns
- **Client Components**: Use `'use client'` for interactive components
- **Animation Hooks**: Consistent use of `useInView` for scroll triggers
- **State Management**: Local state with `useState`, no global state library
- **Event Handling**: Touch-friendly with `whileTap` animations

### Styling Conventions
- **Tailwind Classes**: Mobile-first responsive classes
- **Custom Animations**: Defined in `tailwind.config.ts`
- **Dark Mode**: Class-based dark mode support (currently light-only)
- **Glass Effects**: Consistent backdrop-blur and gradient patterns

### Code Organization
- **Absolute Imports**: Use `@/` for root-level imports
- **Component Co-location**: Related functions and data near components
- **TypeScript**: Strict mode enabled, proper typing for props
- **ESLint**: No unescaped entities rule disabled for marketing copy

## Common Tasks

### Adding New Sections
1. Create component in `/components/`
2. Import and place in `app/page.tsx`
3. Follow glass morphism and animation patterns
4. Test responsive behavior across all breakpoints

### Updating Content
- **Hero Section**: Modify arrays and text in `app/page.tsx`
- **Features**: Update `features` array with new icons and descriptions
- **FAQ**: Add items to `faqs` array in FAQ section
- **Images**: Place in `/public/` and use Next.js `<Image>` component

### Performance Debugging
- **Animation Performance**: Check for excessive re-renders in Framer Motion
- **Image Loading**: Verify Next.js image optimization settings
- **Bundle Size**: Use `npm run build` to check output sizes
- **Mobile Performance**: Test on actual devices, not just browser tools

## Configuration Files

### Essential Configs
- `next.config.js` - Next.js configuration with image optimization
- `tailwind.config.ts` - Complete design system and animations
- `tsconfig.json` - TypeScript configuration with strict mode
- `ecosystem.config.js` - PM2 production process management
- `.eslintrc.json` - ESLint rules for Next.js

### Deployment Scripts
- `deploy.sh` - Main deployment script with VPS configuration
- `setup-ssl.sh` - Let's Encrypt SSL certificate setup
- Multiple backup deployment scripts for different scenarios