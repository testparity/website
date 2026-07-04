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
npm run dev -- --host 127.0.0.1 --port 4173
```

Open the printed local URL and verify the guide pages under `/guide/`.

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

This is a static site. A deployment pipeline should run `npm ci` and `npm run build`, then publish `.vitepress/dist/` to the selected static host.

Before deployment, verify:

- `npm run build` exits successfully.
- `/` renders the landing page.
- `/guide/getting-started` renders the onboarding guide.
- `/guide/specs` renders the specs and traceability overview.
- Desktop and mobile widths have no horizontal overflow.
