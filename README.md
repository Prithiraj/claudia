# Claudia — florist website prototype

Conversion-focused static website for the Claudia Witzke florist listing in Berlin-Alt-Hohenschönhausen.

## Live site

Expected GitHub Pages URL:

<https://prithiraj.github.io/claudia/>

## Project documents

- [`PLAN.md`](./PLAN.md) — evidence baseline, design plan, acceptance criteria.
- [`IMAGE_RIGHTS.md`](./IMAGE_RIGHTS.md) — source/license status for every published photograph.

## Architecture

- Semantic static HTML.
- CSS-only responsive design.
- Small vanilla JavaScript module for navigation, reveal behavior, map loading, gallery, and optional Three.js ambience.
- No npm/build dependency.
- GitHub Pages deployment via the official Pages actions.

## Local preview

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

Pushes to `main` trigger `.github/workflows/pages.yml`.

The workflow packages the static site into a Pages artifact and deploys it to the `github-pages` environment.

## Important pre-launch checks

This repository currently publishes a **prototype**. Before using it as the official commercial website, confirm the current business/operator identity at Hauptstraße 9, the relationship to the separately listed Blumen P&N, exact opening hours, legal imprint details, and owner photo rights.
