# Changelog

All notable changes to this portfolio are documented in this file.

The format is inspired by Keep a Changelog and follows date-based entries.

## [2026-03-31]

### Added

- Added `docs/README.md` as a full technical handbook.
- Added `docs/API.md` with endpoint contracts and curl examples.
- Added `docs/CHANGELOG.md` for ongoing project history.
- Added screenshots under `docs/assets/`:
  - `portfolio-home.png`
  - `portfolio-overview.png`
- Added critical-flow test suite with Vitest + Testing Library:
  - `src/test/critical/keyboard-shortcuts.test.tsx`
  - `src/test/critical/command-palette.test.tsx`
  - `src/test/critical/contact-form.test.tsx`
- Added test runtime setup file:
  - `src/test/setup.ts`
- Added npm scripts:
  - `npm test`
  - `npm run test:watch`

### Changed

- Upgraded `vite.config.ts` to include Vitest test configuration (`jsdom`, setup file, globals).
- Expanded `docs/README.md` with screenshot + GIF slots section for visual walkthroughs.
- Converted blog/write-ups route to designed Coming Soon experience (`src/pages/Blog.tsx`).
- Improved Contact form logic and reliability (`src/components/portfolio/ContactForm.tsx`):
  - explicit EmailJS payload mapping
  - honeypot anti-bot field
  - client-side rate limiting
  - clearer error diagnostics

### Fixed

- Fixed EmailJS delivery flow issues caused by missing/incorrect configuration and payload mapping.
- Fixed `{{title}}` template variable population by mapping it from message.
- Resolved test runner compatibility by pinning `jsdom` to a Node-compatible version.
- Cleaned root-level documentation encoding and structure for readability.

## [Unreleased]

### Planned

- Add real GIF recordings for all key interactions listed in docs visual walkthrough.
- Add CI workflow to run lint + build + tests on each push.
- Add accessibility and keyboard-navigation coverage tests for nav and dialogs.
