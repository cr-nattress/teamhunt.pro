Prompt 9 — Env, security headers, and Netlify/Vercel previews wiring

Goal: Env examples for each site, CORS policy, security headers, and preview ergonomics.

Add:
## .env.example at repo root (document, do not commit secrets)
APP_BASE_URL=http://localhost:3001
LANDING_BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:8888
EMAIL_BASE_URL=http://localhost:8889
MEDIA_BASE_URL=http://localhost:8890

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=service_role
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Legacy Database Support
DATABASE_URL=postgresql://user:password@host:port/database

ALGOLIA_APP_ID=
ALGOLIA_SEARCH_KEY=
ALGOLIA_INDEX=

## Security headers for apps
Create apps/landing/public/_headers and apps/organizer/public/_headers with:
  /*
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: geolocation=(), camera=(), microphone=()

## CORS (in each service src/app.ts)
- Add minimal CORS middleware that allows origins:
  - http://localhost:3001 and https://app.teamhunt.pro
  - Netlify deploy preview origins (pattern: https://*.netlify.app) — comment this for later tightening

## Netlify notes
- Each app/service already contains netlify.toml
- Document in README how to map sites to subfolders and custom domains

## Vercel (optional previews)
- Add a note to README with VERCEL_* secrets and amondnet/vercel-action usage (already in CI prompt).
