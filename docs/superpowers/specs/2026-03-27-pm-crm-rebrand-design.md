# PM CRM Platform — White-Label Fork of Twenty

## Context

Twenty CRM is an open-source CRM running locally at ~/pmOS/projects/twenty. Matt wants to fully fork it and rebrand it as a white-label CRM platform powering two products:

1. **Persistent Recruiter** (`BRAND=recruiter`) — recruiting/talent CRM
2. **Persistent Momentum Sales** (`BRAND=sales`) — general sales pipeline CRM for Persistent Momentum

The sales brand must NOT reference golf, Rabbit Golf, or any PM-specific vertical. It's a clean, generic sales CRM branded under Persistent Momentum.

This is a full fork — no need to stay mergeable with upstream Twenty. The white-label config layer lets one codebase serve both brands.

## Brand Definitions

### Persistent Recruiter (`BRAND=recruiter`)

- **App name**: Persistent Recruiter
- **Tagline**: Modern recruiting, simplified
- **Colors**: Navy dark (`#020617`), slate foreground (`#f1f5f9`), teal accent (TBD, placeholder `#14b8a6`)
- **Logo**: Placeholder "PR" monogram (to be designed later)
- **Seed data**: Sample candidates, jobs, companies, placements
- **Use case**: Candidate tracking, job pipelines, client management

### Persistent Momentum Sales (`BRAND=sales`)

- **App name**: Persistent Momentum
- **Tagline**: Your sales pipeline, simplified
- **Colors**: Navy dark (`#020617`), slate foreground (`#f1f5f9`), blue accent matching PM logo
- **Logo**: Existing PM "PP" monogram (`projects/persistent-momentum/persistent-momentum-website/public/logo.png`)
- **Seed data**: Sample leads, companies, deals, contacts
- **Use case**: General B2B sales pipeline, outreach tracking, deal management

## Architecture

### White-Label Config (`packages/pm-crm-shared/src/brand/brand.config.ts`)

```typescript
type BrandConfig = {
  id: 'recruiter' | 'sales';
  appName: string;
  tagline: string;
  colors: {
    accent: string;
    background: string;
    foreground: string;
  };
  logo: {
    primary: string;      // path relative to public/
    favicon: string;      // path relative to public/
  };
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  seedProfile: 'recruiter' | 'sales';
  disabledFeatures: string[];
};
```

Active brand selected via `BRAND` env var. `getBrandConfig()` utility reads this and returns the config. Used by both frontend and backend.

### Env Var Flow

```
.env: BRAND=recruiter|sales

Frontend reads → injects into theme, document title, favicon, meta tags
Backend reads → seed data profile, email sender name, OpenAPI title, AI prompts
```

## Changes Required

### Phase 1: Strip Twenty Identity (Full Fork)

**Package renames:**

| Old | New |
|-----|-----|
| `twenty-front` | `pm-crm-front` |
| `twenty-server` | `pm-crm-server` |
| `twenty-shared` | `pm-crm-shared` |
| `twenty-ui` | `pm-crm-ui` |
| `twenty-emails` | `pm-crm-emails` |
| `twenty-docker` | `pm-crm-docker` |
| `twenty-e2e-testing` | `pm-crm-e2e-testing` |

**Packages to remove:**
- `twenty-website` (Twenty's docs site — not needed)
- `twenty-zapier` (can be re-added later if needed)

**Files to update:**
- `package.json` (root + all packages) — name fields
- `nx.json` — all target references
- `tsconfig.base.json` — path aliases
- `index.html` — title, meta tags, OG tags, Twitter cards, script comments
- `manifest.json` — name, short_name
- `docker-compose*.yml` — service names, image names

**Code changes:**
- `config-variables.ts` — set `TELEMETRY_ENABLED=false`, `ANALYTICS_ENABLED=false` as defaults
- Remove/disable support chat config (Twenty-specific)
- Update AI system prompts in `ai-chat/constants/` and `ai-agent/constants/` — replace "Twenty" references
- Update `base-schema.utils.ts` — OpenAPI title
- Update seed data (remove twenty.com references)
- Update `enterprise-public-key.constant.ts` — remove Twenty's enterprise key

### Phase 2: White-Label Config Layer

**New files:**
- `packages/pm-crm-shared/src/brand/brand.config.ts` — brand definitions
- `packages/pm-crm-shared/src/brand/get-brand-config.ts` — config reader
- `packages/pm-crm-front/public/brands/recruiter/` — recruiter logo, icons
- `packages/pm-crm-front/public/brands/sales/` — PM logo, icons

**Frontend integration:**
- Theme provider reads brand config for accent color
- `index.html` gets dynamic title injection via the existing `window._env_` mechanism
- Favicon and manifest served based on brand
- Login page Logo component uses brand logo path
- Remove hardcoded Twenty OG image URLs

**Backend integration:**
- `getBrandConfig()` available server-side
- Email templates use brand name as sender
- Seed data command accepts `--brand` flag
- OpenAPI/GraphQL schema descriptions reference brand name

### Phase 3: Asset Replacement

**Icon generation:**
- Generate all icon sizes (iOS, Android, Windows) from PM logo for `sales` brand
- Generate placeholder icons for `recruiter` brand
- Replace `twenty-logo.svg` in integrations folder

**Email templates:**
- Update footer text, sender name, logo in `pm-crm-emails`

## What Stays the Same

- All core CRM functionality (contacts, companies, pipelines, notes, tasks, email, calendar)
- Auth system (email/password, Google, Microsoft, SSO) — fully self-hosted
- Database schema and migrations engine
- GraphQL API structure
- Background workers (BullMQ)
- Redis and PostgreSQL setup
- Dev tooling (Nx, Vite, Linaria, Jest)

## Verification

1. `BRAND=sales yarn start` — loads PM branding, no "Twenty" anywhere in UI
2. `BRAND=recruiter yarn start` — loads Recruiter branding, no "Twenty" anywhere in UI
3. `grep -ri "twenty" packages/pm-crm-front/src/ packages/pm-crm-server/src/` returns only internal code references (module names, not user-facing strings)
4. Email templates render with correct brand name
5. OpenAPI docs show correct product name
6. All tests pass after rename
