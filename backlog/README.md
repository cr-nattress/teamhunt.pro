# TeamHunt Backlog System

A file-based backlog management system for organizing development work using MADR-style documentation and structured task prompts for AI agents.

## Overview

This backlog system provides a hierarchical structure for managing product development:

- **Epics**: Large features or initiatives that span multiple sprints
- **User Stories**: User-focused functionality within an epic
- **Tasks**: Specific implementation work for a user story

## Directory Structure

```
backlog/
├── README.md                    # This file - system overview and conventions
├── index.jsonl                  # Machine-readable index of all items
├── templates/                   # Template files for creating new items
│   ├── epic.README.md
│   ├── user-story.README.md
│   ├── task.README.md
│   └── task.prompt.md
├── context/                     # Temporary context logs for complex work
└── epics/
    └── EP-XXXX-[slug]/         # Epic directory
        ├── README.md           # Epic documentation
        └── user-stories/
            └── US-XXXX-[slug]/ # User story directory
                ├── README.md   # User story documentation
                └── tasks/
                    └── TS-XXXX-[slug]/ # Task directory
                        ├── README.md   # Task documentation
                        └── prompt.md   # AI agent prompt
```

## ID Format and Conventions

### Epic IDs
- **Format**: `EP-XXXX-[slug]`
- **Example**: `EP-0001-v1_vail-winter-quest`
- **XXXX**: Zero-padded 4-digit number
- **slug**: Kebab-case description

### User Story IDs
- **Format**: `US-XXXX-[slug]`
- **Example**: `US-0001-create-events`
- **XXXX**: Zero-padded 4-digit number (independent sequence)
- **slug**: Kebab-case description

### Task IDs
- **Format**: `TS-XXXX-[slug]`
- **Example**: `TS-0001-api-create-event`
- **XXXX**: Zero-padded 4-digit number (independent sequence)
- **slug**: Kebab-case description

## Status Values

### Epic Status
- `Draft` - Initial idea, not yet planned
- `Planning` - Being refined and broken down
- `In Progress` - Active development
- `Review` - Under review or testing
- `Done` - Completed and delivered
- `Cancelled` - No longer pursued

### User Story Status
- `Draft` - Initial definition
- `Ready` - Refined and ready for development
- `In Progress` - Active development
- `Review` - Under review or testing
- `Done` - Completed and accepted
- `Cancelled` - No longer needed

### Task Status
- `To Do` - Ready to start
- `In Progress` - Being worked on
- `Review` - Under code review
- `Done` - Completed
- `Blocked` - Cannot proceed due to dependencies

## Priority Levels

- `High` - Critical functionality, blocks other work
- `Medium` - Important but not blocking
- `Low` - Nice to have, can be deferred

## Agent Prompts

Each task includes a `prompt.md` file designed for AI agents to implement the work. These prompts include:

- **SYSTEM**: Agent persona and expertise
- **OBJECTIVE**: Clear goal statement
- **SCOPE**: What's included and excluded
- **ACCEPTANCE CRITERIA**: Specific success measures
- **CONSTRAINTS**: Technical and business limitations
- **DELIVERABLES**: Expected outputs
- **REPOSITORY COMMANDS**: Setup and validation commands
- **IMPLEMENTATION CHECKLIST**: Step-by-step guidance
- **WHEN UNSURE**: Decision-making guidelines
- **OUTPUT FORMAT**: How to report progress and results

## Context Logs for Complex Work

For bugs or features requiring multi-step reasoning or exploration:

1) **Create** a context log: `backlog/context/YYYYMMDD-context-<short-slug>.md`
2) **Update as you work**: capture hypotheses, experiments, dead ends, resolution
3) **Distill & Delete** when done:
   - Copy the **Lesson Learned** into `docs/guides/lessons-learned.mdx`
   - Reference any Epic/Story/Task IDs and PR links
   - Delete the temporary context file

## Creating New Items

### Creating an Epic
1. Create directory: `backlog/epics/EP-XXXX-[slug]/`
2. Copy template: `cp templates/epic.README.md epics/EP-XXXX-[slug]/README.md`
3. Fill in epic details following the template
4. Update `index.jsonl` with new entry

### Creating a User Story
1. Create directory: `backlog/epics/EP-XXXX-[slug]/user-stories/US-XXXX-[slug]/`
2. Copy template: `cp ../../templates/user-story.README.md README.md`
3. Fill in user story details
4. Update epic README.md to reference the new story
5. Update `index.jsonl` with new entry

### Creating a Task
1. Create directory: `backlog/epics/EP-XXXX-[slug]/user-stories/US-XXXX-[slug]/tasks/TS-XXXX-[slug]/`
2. Copy templates:
   - `cp ../../../templates/task.README.md README.md`
   - `cp ../../../templates/task.prompt.md prompt.md`
3. Fill in task details and create agent prompt
4. Update user story README.md to reference the new task
5. Update `index.jsonl` with new entry

---

**System Version**: 1.0  
**Last Updated**: 2024-12-10  
**Maintainer**: TeamHunt Core Team