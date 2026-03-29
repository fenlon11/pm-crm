# pm-CRM

## Status
- **Stage:** Active build — White-label Phase 1
- **Priority:** HIGH — This is the platform foundation for all PM products
- **Last updated:** 2026-03-29

## What It Is

A permanent fork of Twenty CRM, white-labeled as the platform that powers all Persistent Momentum products. First product: Persistent Recruiter.

Active brand controlled by `BRAND` env var. One codebase, multiple products.

| Brand | Env Value | Description |
|-------|-----------|-------------|
| Persistent Recruiter | `recruiter` | Candidate pipeline, landing pages, discovery videos |
| Persistent Momentum Sales | `sales` | B2B sales pipeline CRM |
| Persistent Marketer | `marketer` | Social automation, SEO, content (future) |

## Current Sprint

See `PRD-WHITE-LABEL.md` for the active build scope.

8 stories: package rename → remove unused → disable telemetry → brand config → frontend brand → backend brand → seed cleanup → visual QA.

## Metrics
- MRR: $0
- Users: 0

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Jotai, Linaria, Vite |
| Backend | NestJS, TypeORM, PostgreSQL, Redis, GraphQL (Yoga) |
| Workers | BullMQ |
| Monorepo | Nx workspace, Yarn 4 |
| Dev tools | Jest, Playwright E2E, Storybook |

## Paths
- Repo: `~/pmOS/projects/pm-crm/`
- GitHub: `fenlon11/pm-crm`
- PRD: `PRD-WHITE-LABEL.md` (current)
- Reference codebase: `~/pmOS/projects/persistent-momentum/persistent-recruiter/`

## Decisions
- Permanent fork — not staying mergeable with upstream Twenty
- `BRAND` env var switches between products from one codebase
- `twenty-website` and `twenty-zapier` get deleted
- Telemetry and analytics disabled
- Domain: persistentmomentum.com (Cloudflare DNS)
