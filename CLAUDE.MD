# CLAUDE.MD — Repository Rules

This file records **Rules** that must be followed by both humans and AI assistants when working inside the `teamhunt-monorepo`.

Each rule is created after a **recurring mistake** has been observed and fixed.  
Once written here, the rule is permanent unless deliberately deprecated.

---

## Rule Template
```md
### Rule N: <Short Title>
**Context:** (the recurring mistake)
**Fix:** (how we corrected it)
**Rule:** (the persistent guidance to follow in the future)
```

## Current Rules

### Rule 1: Long-term Context
**Context:** Complex bugs/features often lose exploration history once closed.
**Fix:** Create temporary /backlog/context/*.md logs, persist "Lesson Learned" in /docs/guides/lessons-learned.mdx, delete temp logs.
**Rule:** Always capture and distill complex work into permanent lessons.

<!-- Append new rules below this line -->
<!-- Example: Rule 2: Rule Following will be added once first mistake is observed -->