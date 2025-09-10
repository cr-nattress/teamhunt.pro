Quick how-to (once all prompts are applied)

cd teamhunt-monorepo && pnpm i

Dev locally:

pnpm dev:landing (Next on :3000)

pnpm dev:organizer (Next on :3001)

pnpm dev:api (Netlify dev on :8888), similarly email (:8889), media (:8890)

E2E locally:

pnpm -F @teamhunt/e2e-ui test

pnpm -F @teamhunt/e2e-api test

Docs & Storybook:

pnpm docs:dev (Docusaurus)

pnpm sb:dev (Storybook)

TypeDoc:

pnpm api:build → writes to docs/reference/

Short version: run prompts 1→10, install, and you've got a production-grade scaffold with Next.js (App Router), Express APIs on Netlify Functions, Playwright E2E, Vitest unit tests, Docusaurus + Storybook + TypeDoc docs, ADRs, and CI guards.

## Deployment

### Netlify Deployment

Each app and service is configured for Netlify deployment with individual `netlify.toml` files:

#### Site Configuration
- **Landing Page**: `apps/landing/` → `https://teamhunt.pro`
- **Organizer App**: `apps/organizer/` → `https://app.teamhunt.pro`
- **API Service**: `services/api/` → `https://api.teamhunt.pro`
- **Email Service**: `services/email/` → `https://email.teamhunt.pro`
- **Media Service**: `services/media/` → `https://media.teamhunt.pro`

#### Setup Steps:
1. Create separate Netlify sites for each app/service
2. Set build directory to the appropriate subfolder (e.g., `apps/landing/`)
3. Configure custom domains in Netlify dashboard
4. Set environment variables in Netlify dashboard (copy from `.env.example`)

#### Deploy Previews:
- CORS is configured to allow `*.netlify.app` domains for deploy previews
- Each push to a feature branch creates preview deployments
- Review apps are automatically built via GitHub Actions

### Vercel Deployment (Optional)

For Vercel preview deployments, configure the following:

#### Required Secrets (GitHub Actions):
- `VERCEL_TOKEN`: Your Vercel auth token
- `VERCEL_ORG_ID`: Your Vercel organization ID  
- `VERCEL_PROJECT_ID`: Your Vercel project ID

#### Setup:
```bash
# Install Vercel CLI
npm i -g vercel@latest

# Link your project
vercel link

# Deploy
vercel --prod
```

The CI workflow will automatically create preview deployments for pull requests when these secrets are configured.

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

- **Supabase**: Database and authentication
- **Service URLs**: Configure for your deployment domains
- **Third-party APIs**: Algolia, email service keys
- **JWT Secret**: For API authentication

### Security

- **CORS**: Configured to allow specific origins (localhost + production domains)
- **Security Headers**: X-Frame-Options, CSP, etc. via `_headers` files
- **Environment**: Sensitive values are templated in `.env.example`