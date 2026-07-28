<p align="center">
  <img src="https://testparity.com/brand/testparity-readme-banner.jpg" alt="TestParity" width="100%">
</p>

# Parity Website

VitePress documentation site for Parity, the structural test parity and coverage validation CLI.

## Prerequisites

- Node.js 20 or newer
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev -- --host 127.0.0.1 --port 3002
```

Open the printed local URL and verify the guide pages under `/guide/`.

## Testing

Install the pinned Chromium runtime once, then run the mobile navigation regression test:

```bash
npx playwright install chromium
npm run test:e2e
```

The test command builds the site, starts an isolated preview on port `43173`, and runs Chromium at `390×844`.

## Build

```bash
npm run build
npm run preview
```

The production build is written to `.vitepress/dist/`.

## Content Sources

- `index.md` is the landing page.
- `guide/*.md` contains public guide documentation.
- Canonical product specifications live in the CLI repository at `../parity/specs/`.
- The specs guide page summarizes the canonical spec set and links the site navigation to the public traceability story.

## Deployment Notes

This is a static site. The production workflow runs `npm ci`, audits dependencies, installs Chromium, and executes `npm run test:e2e` before Vercel builds and deploys the site.

Before deployment, verify:

- `npm run test:e2e` exits successfully.
- `/` renders the landing page.
- `/guide/getting-started` renders the onboarding guide.
- `/guide/specs` renders the specs and traceability overview.
- Desktop and mobile widths have no horizontal overflow.
