# Citefold

Citefold is a web-first research workspace for collecting papers, annotating PDFs,
running structured literature reviews, refining observations, and exporting
clean BibTeX for Overleaf.

The project is intentionally narrower than Zotero as a reference manager and
more opinionated about the review-to-paper workflow. The first useful product
surface is for one researcher, across desktop and mobile browsers.

## Product Shape

- Capture PDFs and citation metadata into a personal library.
- Keep BibTeX import/export and stable citation keys as first-class workflows.
- Annotate PDFs and turn annotations into traceable observations.
- Organize papers, annotations, and observations with typed labels instead of a
  flat tag cloud.
- Run SLR and MLR projects with screening decisions, exclusion reasons,
  extraction fields, and portable evidence exports.
- Use local LLM assistance only when generated summaries remain linked to source
  papers, annotations, or observations.

## Current App

The app currently runs as a Cloudflare Worker with server-rendered HTML and a
small JSON/API surface.

- `GET /` renders the minimal Citefold workspace shell.
- `GET /api/health` returns route health data.
- `GET /api/exports/bibtex` returns the seed library as BibTeX.
- `GET /api/review/evidence` returns source-linked review evidence as JSON.

## Run Locally

```bash
nvm use
npm install
npm run dev
```

Open `http://127.0.0.1:8787`.

## Verify

```bash
npm run quality:gate
npm run ci:local
```

Use `npm run quality:gate:fast` for quicker iteration. Development details,
tooling notes, and troubleshooting live in [docs/development.md](docs/development.md).

## Project Context

- Product spec: [specs/research-library/spec.md](specs/research-library/spec.md)
- Global architecture rules: [ARCHITECTURE.md](ARCHITECTURE.md)
- Architecture decisions: [docs/adrs/README.md](docs/adrs/README.md)
- Feature specs: [specs/README.md](specs/README.md)
- Agent rules: [AGENTS.md](AGENTS.md)

The repo vendors ASDLC reference material in `.asdlc/`. Repo-specific truth
lives in `ARCHITECTURE.md`, `specs/`, and `docs/adrs/`; code should match those
documents or update them intentionally in the same change.
