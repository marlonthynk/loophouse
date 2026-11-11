# LoopHouse

A small property inspection application for exploring Linear Loops. Built with React, TypeScript, IndexedDB and client-side PDF generation.

## Run locally

Install Node.js 22 or later, then:

```sh
npm ci
npm run dev
```

Open the address printed by Vite. Use the fictional jobs to start an inspection, add observations and photos, and complete and download a report. Changes are stored in this browser and origin. Reset demo clears all inspections and photos.

## Checks

```sh
npm run format:check
npm test
npm run build
```

Run `npm run format` to format the source and configuration files with Prettier.

For complete browser verification, install Chromium once and run:

```sh
npm run browser:install
npm run verify
npm run test:report
```

See [TESTING.md](TESTING.md) for the isolated fictional fixtures, reports, cloud setup and plan-before-code workflow. Browser tests use port 4175 and do not reset your development browser's data. An unavailable browser is reported as pending verification, never as a pass.

Data is local to the browser, can be cleared or evicted, and does not sync across devices. Use fictional data. The safety section is a demo, not a regulatory assessment.

See [BUILD-PLAN.md](BUILD-PLAN.md) for the scope and [EXPERIMENT-JOURNAL.md](EXPERIMENT-JOURNAL.md) for the learning record.
