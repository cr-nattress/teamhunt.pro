# User Story: Participant Info

## Overview

- **ID**: US-0006-participant-info
- **Epic**: [EP-0002-landing-to-account-setup](../../README.md)
- **Owner**: Frontend Team
- **Priority**: Medium
- **Status**: Ready
- **Story Points**: 3
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Story

**As a** participant  
**I want** to provide basic info (name, email)  
**So that** my team and progress can identify me and send a magic link if needed

## Context

Flows: `planning/userflows/New Participant #1/prompt.md`  
Sitemap: `planning/sitemaps/README.landing-auth.md`

## Acceptance Criteria

### Functional Requirements

- [ ] **Given** I selected an event/team **When** I open Participant Info **Then** I can submit name and email.
- [ ] **Given** invalid input **When** I submit **Then** I see validation feedback.
- [ ] **Given** success **When** I continue **Then** I reach Hunt Start with context stored.

### Non-Functional Requirements

- [ ] **Accessibility**: Labels, descriptions, and error messaging via `aria-live`.

## Definition of Done

- [ ] UI implemented; data persisted to session/backend
- [ ] Unit + Playwright tests
- [ ] Docs updated
