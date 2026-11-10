# LoopHouse — baseline build proposal

Date: 10 November 2026

Status: Approved by Marlon on 10 November 2026; baseline implementation started. See EXPERIMENT-JOURNAL.md for verification and outstanding checks.

Confirmed: LoopHouse name; React and TypeScript.

## Goal

A demo inspector can find a property-inspection job, complete an inspection with photographs, and download a useful PDF report. The application provides a small, understandable codebase for subsequent Linear Loops experiments.

## Experience and screens

Responsive layouts for desktop and phone, with a consistent LoopHouse identity, clear statuses, accessible labelled controls and visible save feedback.

### 1. Jobs dashboard

- Six fictional jobs with property address, appointment date/time, inspection type and status.
- Summary counts for Scheduled, In progress and Completed.
- Search by address and filter by status.
- Open a job, resume its inspection, or view its completed report.

### 2. Job details

- Full address, property type, appointment, fictional contact and access notes.
- Demo inspector's name.
- Start inspection or Resume inspection, depending on status.
- Completed jobs link to the report.

### 3. Inspection form

- Fixed sections: Exterior, Living areas, Kitchen, Bathroom, Bedrooms, and Safety observations. Safety observations are descriptive demo fields, not a regulatory certification.
- Each section has a condition: Good, Needs attention, Urgent, or Not applicable; plus notes.
- Require a condition for every section. Require an explanatory note for Needs attention or Urgent.
- Add optional JPEG, PNG or WebP photos through file upload or a supported phone camera picker. Optimise images before storage; show a useful error for unsupported formats or failed saves.
- Associate photos with a section; allow captions and removal.
- Overall summary and recommended follow-up.
- Autosave drafts, show Saving/Saved/error state, and allow returning to the dashboard and resuming.
- Review report action validates the form and identifies missing answers.

### 4. Report review and completed report

- Review property and inspector details, condition findings, notes, captioned photos and follow-up in a readable summary.
- Return to the form to correct a draft.
- Complete inspection explicitly saves its final state and timestamp; Completed inspections are read-only in this baseline.
- Download an actual PDF directly from the browser, including photos and captions, with page breaks for longer reports. The screen summary and PDF use the same saved inspection data; identical layouts are not required.
- Reopen a completed report and download it again. A PDF generation failure must allow retry without losing the saved inspection.

Flow: Dashboard → Job details → Inspection → Report review → Complete → Download PDF.

## Storage

Use IndexedDB in the browser for the baseline, including photo blobs. This supports the structured records and images without requiring accounts, a server or database provisioning.

| Record | Stored content |
| --- | --- |
| Jobs | Identifier, address, appointment, property details, contact and access notes |
| Inspections | Job identifier, inspector name, lifecycle status, section answers, overall notes, start/update/completion timestamps |
| Photos | Identifier, inspection and section identifiers, optimised image blob, caption and ordering |

Scheduled means the job has not yet started; In progress means a draft exists; Completed means it was explicitly finalised. Keep this lifecycle consistent across dashboard, details and report.

- Seed fictional jobs only when initialising an empty database.
- Persist answers and photos through reloads in the same browser and origin. Show save failures honestly.
- Generate PDFs on demand from saved records; do not store duplicate PDF files in the database.
- Put database operations behind a small storage module so UI components do not depend directly on IndexedDB calls. This leaves a manageable path to server storage later without building that server now.
- Provide a Reset demo data action in a small settings menu, with confirmation before replacing existing local records.

Limits: this is single-user demo storage. Records do not sync between devices, browsers or development/hosted URLs. Clearing site data removes them; browsers may also evict local data. This is suitable for fictional experiments rather than real inspection recordkeeping. Running the full app offline after a fresh navigation is not part of the baseline.

## Build and verification

- React and TypeScript with Vite for the frontend build.
- Client-side PDF generation; specific helper libraries can be selected during implementation.
- Keep inspection rules, storage and PDF generation separate enough to support focused bug-fixing exercises.
- Include setup instructions, agent guidance, a dependency lockfile and GitHub Actions checks for type checking, tests and production build.
- Verify the core journey: start job, edit answers, attach a photo and caption, reload and resume, correct validation errors, complete, download PDF, reopen and download again.
- Verify PDF text, captions and image inclusion, and visually inspect a longer report for clipping and page breaks.
- Check dashboard search/status filters, phone layout, failed-save feedback and reset behaviour.
- Record actual outcomes and useful evidence in EXPERIMENT-JOURNAL.md.

## Boundaries and subsequent work

The baseline uses one demo inspector and seeded jobs. Authentication, creating/scheduling jobs, multiple inspectors, cloud synchronisation and formal inspection standards remain potential future Linear issues.

After the baseline is reviewed, publish the source to GitHub and configure the Linear learning project and first manual bug-fix exercise. The GitHub owner and repository visibility remain to be selected before repository creation. Configuring or enabling Loops is a subsequent step.

## Storage references

- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
