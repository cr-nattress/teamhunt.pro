# Task: Build "How it Works" Workflow Section

## Overview

- **ID**: TS-0003-workflow-section
- **User Story**: [US-0001-public-landing-page](../../README.md)
- **Assignee**: Frontend Developer
- **Priority**: High
- **Status**: To Do
- **Effort**: 6-8 hours
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Description

Implement the "How it Works" section that explains TeamHunt's 4-step workflow process. This section educates visitors about the platform's ease of use and builds confidence in the product through clear, visual step-by-step explanation.

## Context

### Background

This section serves as educational content that reduces barriers to adoption by showing how simple the process is. It bridges the gap between initial interest (hero section) and conversion (trust section), following Typeform's principle of progressive disclosure of information.

### Related Work

- Depends on TS-0001 (Landing app setup)
- Follows after TS-0002 (Hero section)
- Uses similar design patterns for consistency

## Definition of Done

- [ ] **Code**: Workflow section component implemented with TypeScript
- [ ] **Tests**: Unit tests for workflow steps and interactions (>85% coverage)
- [ ] **Integration**: Section integrates seamlessly with landing page layout
- [ ] **Documentation**: Component props and content structure documented
- [ ] **Review**: Code reviewed and approved by team lead
- [ ] **Standards**: Follows Typeform design principles and accessibility standards
- [ ] **Performance**: Section loads efficiently with optimized icons
- [ ] **Security**: No security vulnerabilities in implementation
- [ ] **Accessibility**: Screen reader friendly with proper ARIA labels
- [ ] **Deployment**: Renders correctly in development environment

## Technical Requirements

### Functional Requirements

- **Progressive Storytelling**: Interactive demonstration sequence with staggered reveal (500ms intervals)
- **Sophisticated Typography**: Section headline with attention-grabbing emphasis on "works" using weight contrast (thin + bold combination)
- **Interactive Demonstrations**:
  - Hover-activated micro-previews showing actual interface screenshots for each step
  - Smooth morphing transitions between step previews (0.4s cubic-bezier easing)
  - Progressive disclosure revealing detailed benefits on interaction
- **Emotional Journey Mapping**:
  - Primary: "From scattered ideas to seamless experiences in minutes, not hours"
  - Supporting: "Watch your vision come to life through our guided, delightful workflow"
- **Advanced Interaction Design**:
  - Sequential number animations (counting up from 1-4 with bounce effect)
  - Connecting flow lines with animated progress indication
  - Expandable detail cards with smooth height transitions
  - Touch-friendly interaction zones (minimum 60px on mobile)
- **Workflow Steps with Outcome-Focused Messaging**:
  1. **"Ideas become reality"** - Visual: Organization setup interface preview
  2. **"Creativity flows freely"** - Visual: Hunt designer with drag-drop elements
  3. **"Teams form effortlessly"** - Visual: Team management dashboard
  4. **"Magic happens instantly"** - Visual: Live hunt participation view
- **Conversion Psychology Elements**:
  - "Most organizers complete setup in under 12 minutes" with animated timer
  - Interactive completion badges appearing as user scrolls through steps
  - Subtle urgency indicators: "Join 10,000+ who've simplified their event planning"

### Non-Functional Requirements

- **Performance**: Section renders without blocking main thread
- **Security**: Icons loaded securely without external dependencies
- **Scalability**: Component structure supports easy content updates
- **Maintainability**: Clear separation of content and presentation logic

## Implementation Guidelines

### Architecture

```typescript
// Component structure
interface WorkflowStep {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  order: number;
}

interface WorkflowSectionProps {
  headline?: string;
  subheadline?: string;
  steps?: WorkflowStep[];
  className?: string;
}

// File structure
apps/landing/app/components/
├── workflow/
│   ├── WorkflowSection.tsx      # Main section component
│   ├── WorkflowStep.tsx         # Individual step card
│   ├── WorkflowIcons.tsx        # Icon components
│   └── workflow-data.ts         # Step content data
```

### Technology Stack

- **Framework**: React 18 with Next.js 14 App Router
- **Styling**: Tailwind CSS with design tokens
- **Icons**: Heroicons (outline style for consistency)
- **Layout**: CSS Grid with responsive breakpoints
- **Animation**: CSS transitions for hover states

### Coding Standards

- Use semantic HTML (section, h2, ul/li structure)
- Implement proper heading hierarchy (h2 for section title)
- Use design tokens for all spacing, colors, and typography
- Follow accessibility best practices (descriptive alt text, proper contrast)
- Mobile-first responsive design approach

## Artifacts

### Input Artifacts

- [Landing Page Design Prompt](../../../../../../planning/designs/landing-page-prompt.md)
- Content specifications from design prompt
- Icon requirements and style guide

### Output Artifacts

- [ ] **Code**: `apps/landing/app/components/workflow/WorkflowSection.tsx`
- [ ] **Code**: `apps/landing/app/components/workflow/WorkflowStep.tsx`
- [ ] **Code**: `apps/landing/app/components/workflow/WorkflowIcons.tsx`
- [ ] **Data**: `apps/landing/app/components/workflow/workflow-data.ts`
- [ ] **Tests**: `apps/landing/__tests__/components/workflow/WorkflowSection.test.tsx`
- [ ] **Documentation**: Component usage examples and prop documentation

## Testing Strategy

### Unit Tests

- WorkflowSection renders with default and custom props
- All 4 workflow steps display correctly
- Icons render without errors
- Responsive grid classes apply correctly
- Hover states work on interactive elements
- Content data structure validation

### Integration Tests

- Section integrates with landing page layout
- Responsive breakpoints work as expected
- Icons load and display properly
- No layout shift during component loading

### Manual Testing

- Visual review across different screen sizes
- Icon clarity and alignment verification
- Text readability and hierarchy validation
- Hover interactions on desktop
- Touch interactions on mobile devices

## Dependencies

### Prerequisites

- [x] TS-0001: Landing app setup completed
- [ ] TS-0002: Hero section completed (for layout consistency)
- [x] Heroicons package installed
- [x] Design tokens available

### Blockers

- None currently identified

### External Dependencies

- Heroicons for consistent icon design
- Design token system for styling
- Tailwind CSS for responsive grid system

## Risks & Assumptions

### Technical Risks

- **Icon loading performance** - **Impact**: Low - **Mitigation**: Use SVG icons, optimize bundle size
- **Responsive layout complexity** - **Impact**: Medium - **Mitigation**: Test thoroughly across breakpoints

### Assumptions

- Four-step workflow effectively communicates simplicity
- Icons provide sufficient visual hierarchy and understanding
- Grid layout scales well across all device sizes
- Content length remains relatively stable

## Implementation Notes

### Approach

1. Create workflow data structure with step information
2. Implement WorkflowStep component with icon, title, description
3. Build responsive grid layout for WorkflowSection
4. Add proper semantic HTML structure
5. Implement hover animations and interactions
6. Optimize for performance and accessibility
7. Test across multiple screen sizes and devices

### Gotchas

- Ensure consistent icon sizing across all steps
- Maintain proper aspect ratios for card components
- Test grid layout edge cases (uneven content lengths)
- Verify color contrast meets WCAG AA standards
- Consider loading states for icons

### Resources

- [Heroicons Icon Library](https://heroicons.com/)
- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Tailwind CSS Grid Documentation](https://tailwindcss.com/docs/grid-template-columns)
- Reference implementation in `LandingSplash.tsx` lines 55-121

## Design Specifications

### Layout Structure

```css
/* Desktop layout (4 columns) */
.workflow-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Tablet layout (2 columns) */
@media (max-width: 992px) {
  .workflow-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile layout (1 column) */
@media (max-width: 576px) {
  .workflow-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

### Step Card Design

```css
.workflow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
  transition: all var(--dur-med) var(--ease-standard);
}

.workflow-step:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2);
}
```

### Icon Specifications

```typescript
// Icon container design
const iconContainerClasses = `
  w-12 h-12 mx-auto mb-4
  bg-white rounded-xl
  flex items-center justify-center
  shadow-sm
`;

// Icon size and color
const iconClasses = `
  w-6 h-6
  text-[var(--color-fg-muted)]
`;
```

### Typography Scale

- **Section Headline**: `text-3xl lg:text-4xl font-bold` (--font-4 token)
- **Section Subheadline**: `text-lg` (--font-3 token)
- **Step Title**: `font-semibold text-[var(--color-fg)]` (--font-2 token)
- **Step Description**: `text-sm leading-relaxed` (--font-1 token)

### Content Data Structure

```typescript
export const workflowSteps: WorkflowStep[] = [
  {
    id: "create-organization",
    icon: DocumentTextIcon,
    title: "Create your organization",
    description: "Set up your organization details and contact information.",
    order: 1,
  },
  {
    id: "design-hunt",
    icon: LightBulbIcon,
    title: "Design your hunt",
    description:
      "Create custom challenges, hints, and clues for your participants.",
    order: 2,
  },
  {
    id: "build-teams",
    icon: UsersIcon,
    title: "Build your teams",
    description: "Organize participants and generate team access codes.",
    order: 3,
  },
  {
    id: "share-play",
    icon: ShareIcon,
    title: "Share & play",
    description: "Launch your hunt and share access codes with participants.",
    order: 4,
  },
];
```

### Accessibility Considerations

- Use `<section>` with `aria-labelledby` pointing to section heading
- Implement proper heading hierarchy (h2 → h3)
- Add `role="list"` and `role="listitem"` for screen readers
- Ensure sufficient color contrast (4.5:1 minimum)
- Provide descriptive alt text for icons

## Progress Log

### [To Be Updated] - [Assignee]

Task creation with comprehensive implementation details and design specifications

---

**Template Version**: 1.0
**Last Template Update**: 2025-09-09
