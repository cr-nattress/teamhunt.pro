# Backlog & Long-term Context

This repo uses a file-based backlog and a lightweight "context log" workflow for complex work.

## Rule 1 — Long-term Context
When a bug or feature requires multi-step reasoning or exploration:

1) **Create** a context log:  
   `backlog/context/YYYYMMDD-context-<short-slug>.md`

2) **Update as you work**: capture hypotheses, experiments, dead ends, resolution.

3) **Distill & Delete** when done:  
   - Copy the **Lesson Learned** into `docs/guides/lessons-learned.mdx`.  
   - Reference any Epic/Story/Task IDs and PR links.  
   - Delete the temporary context file.

### Recommended IDs
- Epics: `EP-####`
- User Stories: `US-####`
- Tasks: `TS-####`

### Quick Start
- Copy `backlog/context/TEMPLATE-context.md` to a new dated file.
- Keep commits small; commit the context log alongside code.
- On completion, append the lesson to `docs/guides/lessons-learned.mdx` and remove the log.

---

## Folder Map
- `backlog/context/` — Temporary context logs (scratchpads, purged when finished).
- `docs/guides/lessons-learned.mdx` — Permanent, curated lessons.