# Task: Implement Hero Section with Primary CTA

## Overview

- **ID**: TS-0002-hero-section
- **User Story**: [US-0001-public-landing-page](../../README.md)
- **Assignee**: Frontend Developer
- **Priority**: High
- **Status**: To Do
- **Effort**: 6-8 hours
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Description

Implement the landing page hero section following Typeform's minimalist design principles. This includes the main headline, supporting copy, primary call-to-action button, and optional visual element, all optimized for conversion and accessibility.

## Context

### Background

The hero section is the most critical part of the landing page for conversion. It must immediately communicate value proposition, build trust, and guide users toward account creation. The design must follow the exact specifications from the landing page prompt while using the established design system.

### Related Work

- Depends on TS-0001 (Landing app setup)
- Uses design patterns from `apps/organizer/app/new-organizer/components/steps/LandingSplash.tsx`
- Foundation for subsequent landing page sections

## Definition of Done

- [ ] **Code**: Hero section component implemented with TypeScript
- [ ] **Tests**: Unit tests for all interactive elements (>85% coverage)
- [ ] **Integration**: Component integrates with Next.js layout
- [ ] **Documentation**: Component props and usage documented
- [ ] **Review**: Code reviewed and approved by team lead
- [ ] **Standards**: Follows Typeform design principles and coding standards
- [ ] **Performance**: Images optimized, no layout shift (CLS < 0.1)
- [ ] **Security**: External links properly secured
- [ ] **Accessibility**: WCAG AA compliance verified
- [ ] **Deployment**: Works correctly in development environment

## Technical Requirements

### Functional Requirements

- **Dynamic Visual Storytelling**: Scroll-triggered animation sequence revealing headline word-by-word with 200ms stagger
- **Sophisticated Typography**: Extra-large expressive headings (text-7xl lg:text-8xl) with ligature-rich font loading and tight line spacing (1.05)
- **Interactive Micro-Interactions**:
  - Logo morphing animation on hover with 0.3s cubic-bezier transition
  - Magnetic hover effect where CTA subtly follows cursor within 50px radius
  - Breathing animation on primary CTA (subtle scale 1.0 to 1.02 every 3s)
- **Emotional Messaging**:
  - Primary: "Turn ordinary spaces into extraordinary adventures that create lasting memories"
  - Supporting: "Watch teams bond, laugh, and discover while you effortlessly orchestrate unforgettable experiences"
- **Advanced Social Proof**:
  - Animated success metrics: "Join 10,000+ event organizers creating memories" with counter animation
  - Rotating customer testimonials carousel (3-5 testimonials, 4s rotation)
- **Interactive Elements**:
  - Animated background particles (20-30 particles) responding to mouse movement with subtle parallax
  - Progressive content reveal sequence: logo → headline → subheadline → social proof → CTA → testimonials
  - Mobile gesture recognition for testimonial swiping

### Non-Functional Requirements

- **Performance**: Hero section fully interactive in < 800ms, animations at 60fps
- **Security**: All animations use transform/opacity only, no layout thrashing
- **Scalability**: Modular animation system supporting A/B test variations
- **Maintainability**: Intersection Observer API for scroll triggers, CSS custom properties for timing
- **Accessibility**: Respects prefers-reduced-motion, maintains 4.5:1 contrast ratio on all text

## Implementation Guidelines

### Architecture

```typescript
// Component structure
interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showIcon?: boolean;
}

// File structure
apps/landing/app/components/
├── hero/
│   ├── HeroSection.tsx     # Main component
│   ├── HeroIcon.tsx        # Minimalist icon component
│   └── HeroCTA.tsx         # CTA button component
```

### Technology Stack

- **Framework**: React 18 with Next.js 14 App Router
- **Styling**: Tailwind CSS with design tokens
- **Icons**: Heroicons or custom SVG components
- **Animation**: CSS transitions with design token durations
- **Typography**: Inter font with design token scales

### Coding Standards

- Use semantic HTML (header, h1, p, button elements)
- Implement proper heading hierarchy (h1 for main headline)
- Use design tokens exclusively for spacing, colors, typography
- Follow accessibility best practices (ARIA labels, keyboard navigation)
- Implement responsive design with mobile-first approach

## Artifacts

### Input Artifacts

- [Landing Page Design Prompt](../../../../../../planning/designs/landing-page-prompt.md)
- Design tokens from `packages/ui/src/tokens.css`
- Reference implementation in `LandingSplash.tsx`

### Output Artifacts

- [ ] **Code**: `apps/landing/app/components/hero/HeroSection.tsx`
- [ ] **Tests**: `apps/landing/__tests__/components/hero/HeroSection.test.tsx`
- [ ] **Documentation**: Component documentation with usage examples
- [ ] **Storybook**: Component stories for design review (if applicable)

## Testing Strategy

### Unit Tests

- Component renders with default props
- Headline and subheadline display correctly
- Primary CTA button triggers onClick handler
- Secondary CTA navigates to correct URL
- Icon displays when showIcon prop is true
- Responsive classes applied correctly

### Integration Tests

- Hero section integrates with Next.js routing
- CTAs work with Next.js Link component
- Design tokens load and apply correctly
- Font loading doesn't cause layout shift

### Manual Testing

- Visual review on desktop (1920x1080, 1366x768)
- Visual review on mobile (375x667, 414x896)
- CTA hover and focus states work correctly
- Text remains readable at all screen sizes
- Page loads without console errors

## Dependencies

### Prerequisites

- [x] TS-0001: Landing app setup completed
- [x] Design tokens available in `@teamhunt/ui`
- [ ] Content and copy approved by marketing team

### Blockers

- None currently identified

### External Dependencies

- Heroicons package for icon components
- Next.js Link component for navigation
- @teamhunt/ui Button component (or create landing-specific version)

## Risks & Assumptions

### Technical Risks

- **Font loading performance** - **Impact**: Medium - **Mitigation**: Use next/font with preload
- **Image optimization complexity** - **Impact**: Low - **Mitigation**: Use next/image with proper sizing

### Assumptions

- Typeform-inspired design will resonate with target audience
- Single primary CTA will outperform multiple options
- Inter font provides good readability across all devices
- Mobile-first approach will serve desktop users effectively

## Implementation Notes

### Approach

1. Create hero section component with TypeScript interfaces
2. Implement responsive layout with Tailwind CSS Grid/Flexbox
3. Add minimalist icon using SVG component
4. Implement CTA buttons with proper hover states
5. Add smooth animations using CSS transitions
6. Optimize for performance (image loading, font display)
7. Test accessibility with screen readers and keyboard navigation

### Gotchas

- Ensure CTA buttons meet minimum touch target size (44px)
- Use proper semantic HTML for SEO and accessibility
- Implement proper contrast ratios for all text elements
- Avoid layout shift during font loading
- Test hover states don't interfere with mobile touch events

### Resources

- [Typeform Design Principles](https://www.typeform.com/help/brand-guidelines/)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/AA/)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- Reference: `apps/organizer/app/new-organizer/components/steps/LandingSplash.tsx`

## Design Specifications

### Layout (Desktop)

```css
/* Two-column layout on desktop */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 80vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Content column */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
```

### Layout (Mobile)

```css
/* Single column stack on mobile */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 4rem 1rem;
  }
}
```

### Typography Scale

- **Headline**: `text-5xl lg:text-6xl` (uses --font-5 token)
- **Subheadline**: `text-xl lg:text-2xl` (uses --font-3 token)
- **CTA Button**: `text-lg` (uses --font-3 token)

### Color Usage

- **Background**: `bg-[var(--color-bg)]` (white)
- **Headline**: `text-[var(--color-fg)]` (near-black)
- **Subheadline**: `text-[var(--color-fg-muted)]` (gray)
- **Primary CTA**: `bg-[var(--color-primary)]` with `text-[var(--color-primary-ink)]`
- **Icon**: `bg-[var(--color-primary)]` with white icon

### Animation Specifications

```css
/* CTA hover animation */
.cta-button {
  transition: all var(--dur-med) var(--ease-standard);
}

.cta-button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* Section entrance animation */
.hero-section {
  animation: slideIn var(--dur-med) var(--ease-standard);
}
```

## Progress Log

### [To Be Updated] - [Assignee]

Task creation and detailed requirements specification completed

---

**Template Version**: 1.0
**Last Template Update**: 2025-09-09
