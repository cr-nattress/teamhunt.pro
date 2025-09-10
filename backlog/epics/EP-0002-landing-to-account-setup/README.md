# Epic: Landing Page to Account Creation Flow

## Overview

- **ID**: EP-0002-landing-to-account-setup
- **Owner**: TeamHunt Development Team
- **Version**: 1.0
- **Status**: Draft
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Goal

Implement a complete user journey from public landing page to account creation with Typeform-inspired design, enabling users to discover TeamHunt, understand the value proposition, and seamlessly create organizer accounts.

## Motivation

### Problem Statement

Currently, there is no cohesive public-facing entry point for new users to discover TeamHunt and create accounts. The existing organizer flow assumes users already understand the product and have direct access to the application.

### Business Value

- **User Acquisition**: Provide clear entry point for new organizers to discover and try TeamHunt
- **Conversion Optimization**: Typeform-inspired design proven to increase conversion rates
- **Brand Consistency**: Unified design language across all user touchpoints
- **Market Expansion**: Enable organic discovery and self-service onboarding

### Success Metrics

- Landing page conversion rate (visitor to account creation) > 5%
- Account creation completion rate > 80%
- Time to first hunt creation < 10 minutes
- Design system consistency score > 95%

## Scope

### In Scope

- Public landing page (`apps/landing/`) with marketing content
- Authentication flow with magic link system
- Account creation and setup flow
- Organizer onboarding experience
- Typeform-inspired design system implementation
- Mobile-responsive design across all flows
- Accessibility compliance (WCAG AA)

### Out of Scope

- Participant-facing game experience (covered in separate epic)
- Advanced organizer features (teams, analytics, etc.)
- Payment integration and pricing plans
- Social authentication (Google, GitHub, etc.)
- Multi-language support

## Dependencies

### Prerequisites

- [x] UI/UX Playbook completed (`knowledge/ui-ux-playbook.md`)
- [x] Design tokens implemented (`packages/ui/src/tokens.css`)
- [x] Landing page design specifications (`planning/designs/landing-page-prompt.md`)
- [ ] Magic link authentication system

### Blockers

- None currently identified

### External Dependencies

- Email service for magic link delivery
- Domain configuration for production deployment

## Risks & Assumptions

### Risks

- **Design consistency across apps** - **Impact**: Medium - **Probability**: Low
  - _Mitigation_: Shared design system and regular design reviews
- **Magic link deliverability** - **Impact**: High - **Probability**: Medium
  - _Mitigation_: Implement fallback authentication methods and email service monitoring

### Assumptions

- Users prefer simple, guided onboarding over complex registration forms
- Typeform-style design will resonate with target organizer persona
- Magic link authentication provides sufficient security for MVP
- Mobile traffic will represent 40%+ of landing page visits

## Acceptance Criteria

- [ ] Landing page converts visitors to account creation intent
- [ ] Authentication flow supports magic link with fallback options
- [ ] Account creation is completed in < 3 steps
- [ ] Design system is consistently applied across all pages
- [ ] All flows are fully responsive and accessible
- [ ] Page load times are < 2 seconds on mobile
- [ ] Integration tests cover critical user paths

## User Stories Breakdown

- [ ] [US-0001-public-landing-page](./user-stories/US-0001-public-landing-page/README.md) - Create public landing page with Typeform design
- [ ] [US-0002-auth-magic-link](./user-stories/US-0002-auth-magic-link/README.md) - Implement magic link authentication system
- [ ] [US-0003-account-creation](./user-stories/US-0003-account-creation/README.md) - Build account creation flow
- [ ] [US-0004-organizer-onboarding](./user-stories/US-0004-organizer-onboarding/README.md) - Create guided organizer onboarding

## Timeline

- **Target Start**: 2025-09-10
- **Target Completion**: 2025-09-24
- **Milestones**:
  - Landing Page MVP: 2025-09-13
  - Authentication Flow: 2025-09-17
  - Account Creation: 2025-09-20
  - End-to-End Testing: 2025-09-24

## Resources

### Team

- Frontend Developer: Implementation of React components and Next.js pages
- UI/UX Designer: Design review and usability testing
- DevOps Engineer: Deployment and domain configuration

### Budget/Resources

- Design system development: 3-5 days
- Frontend implementation: 8-10 days
- Testing and optimization: 2-3 days

## Links

- **Designs**: [Landing Page Prompt](../../../planning/designs/landing-page-prompt.md)
- **Technical Specs**: [UI/UX Playbook](../../../knowledge/ui-ux-playbook.md)
- **Sitemap**: [Landing & Auth Sitemap](../../../planning/sitemaps/README.landing-auth.md)
- **Related Epics**: [EP-0001-v1_vail-winter-quest](../EP-0001-v1_vail-winter-quest/README.md)

## Notes

This epic focuses on the foundational user acquisition and onboarding experience. The Typeform-inspired design approach should create a modern, approachable feel that reduces friction in the account creation process.

The magic link authentication approach aligns with the product's philosophy of reducing complexity while maintaining security. This approach also enables seamless cross-device experiences.

---

**Template Version**: 1.0
**Last Template Update**: 2025-09-09
