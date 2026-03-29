# PRD: pm-CRM White-Label — Phase 1

> **Goal:** Remove all Twenty CRM branding and identity. Apply Persistent Momentum brand. Get pm-CRM running as "Persistent Recruiter" with zero references to Twenty anywhere in the UI, emails, API responses, or metadata.
>
> **Repo:** `~/pmOS/projects/pm-crm/`
> **Branch:** `main` (permanent fork, no upstream sync)

---

## Context

pm-CRM is a permanent fork of Twenty CRM (open-source, self-hosted). It will power the Persistent Momentum SaaS platform. The first product shipping on it is **Persistent Recruiter**.

Twenty's stack: React 18, NestJS, TypeORM, PostgreSQL, Redis, GraphQL (Yoga), Nx monorepo, Yarn 4, Linaria (CSS-in-JS), Jotai (state), Vite.

This PRD covers ONLY the white-label rebrand. No new features. The goal is: `BRAND=recruiter yarn start` loads a fully PM-branded CRM with zero "Twenty" anywhere.

---

## Stories

### Story 1: Package Rename
**What:** Rename all `twenty-*` packages to `pm-*` equivalents.
**Files:** `package.json` (root + all packages), `nx.json`, `tsconfig.base.json`, all internal imports.
**Acceptance:**
- `twenty-front` → `pm-front`
- `twenty-server` → `pm-server`
- `twenty-ui` → `pm-ui`
- `twenty-shared` → `pm-shared`
- `twenty-emails` → `pm-emails`
- `twenty-e2e-testing` → `pm-e2e-testing`
- All `@twenty-*` import paths updated to `@pm-*`
- `yarn install` succeeds with no errors
- `yarn start` boots frontend + backend

### Story 2: Remove Unused Packages
**What:** Delete `twenty-website` and `twenty-zapier` packages.
**Files:** `packages/twenty-website/`, `packages/twenty-zapier/`, `nx.json` references.
**Acceptance:**
- Directories deleted
- No references remain in nx.json, tsconfig, or root package.json
- Build still succeeds

### Story 3: Disable Telemetry and Analytics
**What:** Disable all Twenty telemetry, analytics pings, support chat, and Sentry reporting.
**Files:** Search for telemetry, analytics, sentry, support-chat, intercom across codebase.
**Acceptance:**
- No outbound telemetry calls
- No support chat widget
- No Sentry DSN configured
- Verify by running app and checking network tab — no calls to twenty.com, sentry.io, or analytics endpoints

### Story 4: Brand Config Layer
**What:** Create a brand configuration system controlled by `BRAND` env var.
**File:** `packages/pm-shared/src/brand/brand.config.ts`
**Schema:**
```typescript
interface BrandConfig {
  name: string;           // "Persistent Recruiter"
  shortName: string;      // "PM Recruiter"
  domain: string;         // "persistentmomentum.com"
  colors: {
    primary: string;      // Main brand color
    secondary: string;    // Accent color
    background: string;
    surface: string;
    text: string;
    textLight: string;
  };
  logo: {
    light: string;        // Path to light logo
    dark: string;         // Path to dark logo
    icon: string;         // Path to icon/favicon
  };
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
}
```
**Brands to define:**
- `recruiter` (default) — Persistent Recruiter, navy/teal palette
- `sales` — Persistent Momentum Sales, navy/blue palette
**Acceptance:**
- `BRAND=recruiter` returns recruiter config
- `BRAND=sales` returns sales config
- Default is `recruiter` if BRAND not set
- Config is importable from `@pm-shared/brand`

### Story 5: Frontend Brand Integration
**What:** Wire brand config into the frontend theme, replacing all Twenty-branded elements.
**Files:** Theme provider, Linaria tokens, login page, sidebar, page titles, favicon.
**Acceptance:**
- App name in browser tab = brand name
- Favicon = brand icon
- Login page shows brand logo + name
- Sidebar header shows brand logo
- No "Twenty" text anywhere in the rendered UI
- Color palette matches brand config

### Story 6: Backend Brand Integration
**What:** Wire brand config into backend email templates, OpenAPI metadata, and any server-rendered content.
**Files:** Email templates, OpenAPI spec, server metadata endpoints.
**Acceptance:**
- Emails sent from the app show brand name, not "Twenty"
- OpenAPI/GraphQL schema description uses brand name
- Health endpoint returns brand name

### Story 7: Seed Data Cleanup
**What:** Remove or rebrand all Twenty-specific seed data, demo content, and placeholder text.
**Files:** Seed files, migration fixtures, default workspace data.
**Acceptance:**
- No "Twenty" in any seed data
- Demo workspace uses PM branding
- AI assistant prompts reference PM, not Twenty

### Story 8: Visual QA
**What:** Full visual verification that no Twenty branding remains.
**Process:**
1. Run `BRAND=recruiter yarn start`
2. Playwright screenshots at login, dashboard, contacts, companies, pipeline, settings
3. Both mobile (375x812) and desktop (1440x900)
4. Search entire rendered DOM for "twenty" (case insensitive)
5. Check all network requests — no calls to twenty.com domains
**Acceptance:**
- Zero instances of "Twenty" in any screenshot
- Zero network calls to Twenty-owned domains
- All pages render correctly with new branding
- Both mobile and desktop layouts verified

---

## Out of Scope (this PRD)

- New features (candidate pipeline, landing pages, discovery videos)
- Custom UI redesign beyond color/logo/font changes
- Production deployment
- Stripe billing integration
- Multi-tenant architecture changes

---

## Done When

1. `BRAND=recruiter yarn start` loads with Persistent Recruiter branding everywhere
2. `BRAND=sales yarn start` loads with Persistent Momentum Sales branding everywhere
3. Zero instances of "Twenty" in UI, emails, API responses, or network calls
4. All existing CRM features work (contacts, companies, pipeline, tasks, email)
5. Playwright screenshots confirm clean branding at both viewports
6. All changes committed to main branch
