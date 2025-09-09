# Context Log — Email Service Port Conflict
**Date:** 2025-09-09  
**Related Epic/User Story/Task:** TS-0004 / Setup Email Service Development  
**Status:** ✅ Resolved  

---

## Problem Statement
- Email service fails to start on port 8889 with error: "listen EADDRINUSE: address already in use ::1:3999"
- Multiple Netlify dev services trying to use same internal static server port (3999)
- API service (port 8888) and Media service (port 8890) start successfully
- Email service crashes during startup, preventing complete service stack

## Hypotheses
- H1: Netlify dev uses internal static server port 3999 by default for all services
- H2: Services need different internal ports or configuration to avoid conflicts
- H3: Services should be started sequentially rather than in parallel

## Experiments & Exploration
### Attempt 1: Check service startup logs
- What was tried: Review background bash outputs for all services
- Result: API and Media services use same internal port 3999, Email fails
- Outcome: ❌ failure - confirms port conflict but need solution

### Attempt 2: Investigate Netlify dev configuration options
- What was tried: Check if Netlify dev has internal port configuration
- Result: Found `staticServerPort` configuration option in [dev] section of netlify.toml
- Outcome: ✅ successful - identified the solution

### Attempt 3: Configure different staticServerPort for each service
- What was tried: Added [dev] sections with unique staticServerPort values to each service's netlify.toml
  - API service: staticServerPort = 3998
  - Media service: staticServerPort = 4000  
  - Email service: staticServerPort = 4001
- Result: Email service started successfully on localhost:8889 with "Static server listening to 4001"
- Outcome: ✅ successful - port conflict resolved

## Dead Ends
- Starting services in parallel without port management doesn't work
- Default Netlify dev configuration causes conflicts with multiple services

## Resolution
**Root Cause:** Multiple Netlify dev services attempted to use the same internal static server port (3999) by default, causing EADDRINUSE errors.

**Solution:** Configure unique `staticServerPort` values in each service's netlify.toml file:
```toml
[dev]
  staticServerPort = [unique_port_number]
```

**Implementation:**
- services/api/netlify.toml: `staticServerPort = 3998`
- services/media/netlify.toml: `staticServerPort = 4000`
- services/email/netlify.toml: `staticServerPort = 4001`

**Result:** All services now run simultaneously without port conflicts.

## Lesson Learned
- Netlify dev uses an internal static server port (default 3999) that must be unique across multiple services
- The `staticServerPort` configuration in netlify.toml [dev] section allows customization of this internal port
- Port conflicts in development can be systematically resolved through proper configuration rather than sequential startup workarounds

## Next Steps
- [x] Research Netlify dev internal port configuration options
- [x] Test sequential service startup vs parallel (not needed - parallel works with proper configuration)
- [x] Update service startup scripts with proper port management
- [ ] Append "Lesson Learned" to `/docs/guides/lessons-learned.mdx`
- [ ] Delete this context file once changes are merged