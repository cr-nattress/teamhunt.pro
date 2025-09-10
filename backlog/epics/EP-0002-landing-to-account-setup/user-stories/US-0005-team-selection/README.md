# User Story: Team Selection

## Overview

- **ID**: US-0005-team-selection
- **Epic**: [EP-0002-landing-to-account-setup](../../README.md)
- **Owner**: Frontend Team
- **Priority**: High
- **Status**: Ready
- **Story Points**: 3
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Story

**As a** participant  
**I want** to choose a team for the selected event  
**So that** my progress and uploads are associated with the correct team

## Context

Flows: `planning/userflows/New Participant #1/prompt.md`  
Sitemap: `planning/sitemaps/README.landing-auth.md`

## Acceptance Criteria

### Functional Requirements

- [ ] **Given** I chose an event **When** I open Team Selection **Then** I see a list of teams (or empty state).
- [ ] **Given** teams exist **When** I select one **Then** my session stores event + team and I proceed.
- [ ] **Given** no teams exist **When** I open the view **Then** I see guidance or an option to be auto-assigned.

### Non-Functional Requirements

- [ ] **Accessibility**: Team buttons/cards are keyboard navigable with visible focus.
- [ ] **Usability**: Clear CTAs and back navigation.

## Definition of Done

- [ ] UI implemented; integrates with mock/real teams API
- [ ] Unit tests + Playwright smoke
- [ ] Docs updated
