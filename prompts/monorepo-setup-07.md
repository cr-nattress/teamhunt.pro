Prompt 7 — Backlog system (epics, stories, tasks + prompts)

Goal: File-based backlog with MADR-style docs and task prompts for agents.

Under /backlog:

## Structure
backlog/
  README.md
  epics/
    EP-0001-v1_vail-winter-quest/
      README.md
      user-stories/
        US-0001-create-events/
          README.md
          tasks/
            TS-0001-api-create-event/
              README.md
              prompt.md
  templates/
    epic.README.md
    user-story.README.md
    task.README.md
    task.prompt.md
  index.jsonl

## Templates content (concise, as described below):
- epic.README.md: fields ID/Owner/Version/Status/Goal/Motivation/Scope/KPIs/Dependencies/Risks + Acceptance Criteria + Breakdown + Links
- user-story.README.md: Story (As a… I want… so that…), Acceptance Criteria, Non-functional, Tasks
- task.README.md: DoD checklist, Context, Artifacts
- task.prompt.md: SYSTEM/OBJECTIVE/SCOPE/ACCEPTANCE CRITERIA/CONSTRAINTS/DELIVERABLES/REPO COMMANDS/CHECKLIST/WHEN UNSURE/OUTPUT

## Seed example for EP-0001/US-0001/TS-0001 similar to earlier; include TS-0001 prompt to implement POST /v1/events in services/api.

Include backlog/README.md explaining conventions and ID formats.
