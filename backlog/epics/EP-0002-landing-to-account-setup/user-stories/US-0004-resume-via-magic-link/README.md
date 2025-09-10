# User Story: Resume via Magic Link

## Overview

- **ID**: US-0004-resume-via-magic-link
- **Epic**: [EP-0002-landing-to-account-setup](../../README.md)
- **Owner**: Frontend Team
- **Priority**: High
- **Status**: Ready
- **Story Points**: 3
- **Created**: 2025-09-09
- **Last Updated**: 2025-09-09

## Story

**As a** returning participant  
**I want** to enter my email and receive a magic link  
**So that** I can resume my hunt where I left off

## Context

Flows: `planning/userflows/Returning Participant/prompt.md`  
Routes: `/resume`, `/resume/sent`, app re-entry handler `/reenter`

## Acceptance Criteria

### Functional Requirements

- [ ] **Given** I enter a valid email on `/resume` **When** I submit **Then** I see `/resume/sent` with confirmation.
- [ ] **Given** I click the magic link **When** the app opens **Then** I am resumed at the correct hunt/stop.
- [ ] **Given** an invalid email **When** I submit **Then** I see validation feedback.

### Non-Functional Requirements

- [ ] **Accessibility**: Labels and descriptions for inputs and confirmations.
- [ ] **Security**: Token is single-use and short-lived; no sensitive data in URL beyond the token.

## Definition of Done

- [ ] Routes implemented with mocked email delivery (or integration)
- [ ] Unit + E2E tests for request and re-entry
- [ ] Docs updated; preview verified
