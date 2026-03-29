# PRD: Persistent Recruiter — Core Features (Phase 2)

> **Goal:** Build recruiting-specific features into pm-CRM so it functions as a standalone hiring platform. Candidate pipeline, job postings, landing pages, and discovery videos.
>
> **Repo:** `~/pmOS/projects/pm-crm/`
> **Depends on:** Phase 1 white-label (complete)
> **Reference:** `~/pmOS/projects/persistent-momentum/persistent-recruiter/` (existing feature codebase)

---

## Context

pm-CRM is a rebranded fork of Twenty CRM with full CRM functionality (contacts, companies, pipeline, tasks, email). Phase 1 stripped Twenty branding and applied PM identity.

Phase 2 adds recruiting-specific modules. Twenty already has a Person entity, Company entity, and pipeline stages. We build ON TOP of these, not from scratch.

The existing Persistent Recruiter codebase (Next.js/Turborepo) has working implementations of landing pages, discovery videos, and candidate funnels. Use it as REFERENCE for feature requirements, not for code porting.

---

## Stories

### Story 1: Candidate Custom Object
**What:** Create a Candidate custom object that extends Twenty's existing data model.
**Details:**
- Candidate has: name, email, phone, resume URL, source, current company, current title, LinkedIn URL, status, notes
- Status enum: Applied, Screening, Interview, Offer, Hired, Rejected, Withdrawn
- Candidate links to a Company (the hiring company) and optionally to a Job
- Use Twenty's custom object system if available, or create a proper TypeORM entity
**Acceptance:**
- Candidate appears in sidebar navigation
- CRUD operations work (create, read, update, delete)
- Candidate list view with filtering by status
- Candidate detail page with activity timeline

### Story 2: Job Custom Object
**What:** Create a Job entity for job postings.
**Details:**
- Job has: title, description, requirements, location (remote/onsite/hybrid), salary range, department, status, company
- Status enum: Draft, Active, Paused, Closed, Filled
- Job links to Company
- Candidates can be linked to Jobs (many-to-many)
**Acceptance:**
- Job appears in sidebar navigation
- Job list view with filtering by status
- Job detail page showing linked candidates
- Can assign candidates to jobs from either the job or candidate view

### Story 3: Candidate Pipeline Board
**What:** Kanban-style board view for candidate pipeline, similar to Twenty's existing pipeline views.
**Details:**
- Columns = candidate statuses (Applied → Screening → Interview → Offer → Hired/Rejected)
- Drag and drop to change status
- Filter by Job
- Card shows: name, current title, source, days in stage
**Acceptance:**
- Pipeline board accessible from Candidates section
- Drag and drop updates candidate status
- Filtering by job works
- Cards display key candidate info

### Story 4: Public Job Landing Page
**What:** Public-facing page for each active job that candidates can view and apply from.
**Details:**
- Route: `/jobs/:slug` (public, no auth required)
- Displays: job title, company name, description, requirements, location, salary range
- Application form: name, email, phone, resume upload, cover letter (optional)
- Form submission creates a Candidate record linked to the Job
- Mobile responsive
- Brand colors from brand config
**Acceptance:**
- Public URL loads without authentication
- Job details render correctly
- Application form submits and creates candidate record
- File upload works for resume
- Mobile responsive (375px viewport)
- Playwright screenshot verification

### Story 5: Application Form → Pipeline
**What:** Wire the public application form to the candidate pipeline.
**Details:**
- Form submission creates Candidate with status "Applied"
- Candidate automatically linked to the Job
- Email notification to workspace admin when new application received
- Candidate appears in pipeline board immediately
**Acceptance:**
- Submit application → candidate appears in pipeline with "Applied" status
- Admin receives email notification
- Candidate detail page shows which job they applied to
- Activity timeline shows "Applied via job landing page" event

### Story 6: Candidate Email Templates
**What:** Automated email templates for candidate communication.
**Details:**
- Templates: Application Received, Interview Scheduled, Offer Extended, Rejection
- Templates use brand config for styling
- Sent from workspace email
- Template variables: {{candidate_name}}, {{job_title}}, {{company_name}}, {{interview_date}}
**Acceptance:**
- All 4 templates exist and render correctly
- Variables substitute properly
- Brand styling applied (logo, colors)
- Emails send successfully

---

## Out of Scope (this phase)

- Discovery videos (Phase 3)
- Landing page BUILDER (Phase 3 — Phase 2 uses a single template)
- Job board posting integrations (Indeed, LinkedIn, etc.)
- Interview scheduling calendar integration
- Offer letter generation
- Multi-tenant architecture
- Stripe billing

---

## Done When

1. Candidate and Job objects exist with full CRUD
2. Pipeline board shows candidates in Kanban columns with drag-and-drop
3. Public job landing pages render at `/jobs/:slug`
4. Application form creates candidates in pipeline
5. Email notifications work for new applications
6. All features work with `BRAND=recruiter` branding
7. Playwright screenshots verify UI at mobile + desktop
8. All changes committed to main
