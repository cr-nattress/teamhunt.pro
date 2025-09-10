# User Story: Join Today’s Event

## Overview

- **ID**: US-0002-join-todays-event
- **Epic**: [EP-0002-landing-to-account-setup](../../README.md)
- **Owner**: Frontend Team
- **Priority**: High
- **Status**: Ready
- **Story Points**: 5
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Story

**As a** new participant  
**I want** to find and join today’s event  
**So that** I can start the hunt with the correct context

## Context

Flows reference: `planning/userflows/New Participant #1/prompt.md`
Related sitemap: `planning/sitemaps/README.landing-auth.md`

## Acceptance Criteria

### Functional Requirements

- [ ] **Given** I open `/join` **When** events are available today **Then** I see a list of event cards on `/join/events`.
- [ ] **Given** there are no events **When** I open `/join/events` **Then** I see a friendly empty state and guidance.
- [ ] **Given** I select an event **When** I confirm **Then** my session stores the chosen event and I’m advanced toward team selection or hunt start.

### Non-Functional Requirements

- [ ] **Performance**: List renders within 150ms after data fetch (local dev).
- [ ] **Accessibility**: Cards keyboard-focusable, proper labels; empty-state announced.
- [ ] **Usability**: Clear CTA to proceed; back links to change selection.

## Definition of Done

- [ ] Code complete with routes `/join` and `/join/events`
- [ ] Unit tests and E2E smoke for happy path and empty state
- [ ] Reviewed and approved
- [ ] Docs updated in Docusaurus (Joining Events)
- [ ] Deployed to preview

## Dependencies

### Upstream Dependencies

- Events API or mock

### Downstream Dependencies

- Team selection flow

## Design & Research

### Design Assets

- Wireframes for event list and empty states

## Tasks Breakdown

- [ ] TS-000X-events-route — Implement `/join` and `/join/events` routes
- [ ] TS-000X-events-api — Wire data fetch (mock or service)
- [ ] TS-000X-tests — Add unit + Playwright tests

## Risks & Assumptions

- Assumes events are time-bounded to “today” with clear filter logic.
