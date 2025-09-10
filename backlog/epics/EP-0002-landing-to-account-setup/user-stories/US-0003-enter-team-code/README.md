# User Story: Enter Team Access Code

## Overview

- **ID**: US-0003-enter-team-code
- **Epic**: [EP-0002-landing-to-account-setup](../../README.md)
- **Owner**: Frontend Team
- **Priority**: High
- **Status**: Ready
- **Story Points**: 3
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Story

**As a** new participant  
**I want** to enter a 5-character team access code  
**So that** I can join the correct team and start the hunt

## Context

Flows reference: `planning/userflows/New Participant #2/prompt.md`  
Sitemap: `planning/sitemaps/README.landing-auth.md` (`/join/team-code`)

## Acceptance Criteria

### Functional Requirements

- [ ] **Given** I navigate to `/join/team-code` **When** I enter a valid 5-char code **Then** the team is selected and I proceed to basic info or Hunt Start.
- [ ] **Given** I enter an invalid code **When** I submit **Then** I see clear validation feedback and can retry.
- [ ] **Given** the code maps to an event **When** successful **Then** my session stores event + team context.

### Non-Functional Requirements

- [ ] **Accessibility**: Code input labeled; error announced via `aria-live`.
- [ ] **Usability**: Auto-advance focus per character (optional); paste support.

## Definition of Done

- [ ] Route `/join/team-code` implemented with validation
- [ ] Unit + Playwright tests for valid/invalid
- [ ] Docs updated in Docusaurus
- [ ] Preview deploy verified

## Dependencies

- Team codes API (or mock)

## Tasks Breakdown

- [ ] TS-000X-team-code-ui — Build input + validation UI
- [ ] TS-000X-team-code-api — Wire code validation
- [ ] TS-000X-tests — Add unit + e2e tests
