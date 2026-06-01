# Feature: Stub Worker

## Blueprint

### Context

This project needs a concrete runnable starting point so the research-library
product can evolve behind a tested Worker surface. The root page should stay
minimal and visually restrained while reflecting Citefold's actual product
direction rather than a generic starter shell.

### Architecture

- **Entry points:** `wrangler dev` via `src/worker.ts`
- **Source layout:** `src/worker.ts` routes requests, `src/api/` holds API handlers, and `src/views/` holds HTML rendering modules.
- **Styling pipeline:** `src/tailwind-input.css` compiles to `.generated/styles.css`, which the Worker serves at `/styles.css`.
- **Starter UI contract:** `src/views/home.ts` renders a minimal Citefold research
  workspace with library, review, route, and workflow anchors.
- **Client code boundary:** Worker-rendered HTML must not embed executable browser code inline. Browser behavior belongs in typed TypeScript modules before being served to clients.
- **Data models:** None yet. The stub is stateless.
- **Dependencies:** Wrangler provides the Worker runtime; Playwright and Vitest verify the behavior.

### Anti-Patterns

- Do not let the template drift back into an untestable empty shell with no runnable app surface.
- Do not turn the app into a product-marketing shell that must be dismantled
  before useful research workflows can be built.
- Do not add feature-specific persistence or auth behavior to the stub without updating this spec and the relevant ADRs.
- Do not collapse API handling and rendered views back into one file as the starter evolves.
- Do not move starter styles back into large inline `<style>` blocks.
- Do not add inline `<script>` tags, inline event-handler attributes, or `javascript:` URLs to Worker-rendered HTML.

## Contract

### Definition of Done

- [ ] The template starts locally through Wrangler without extra scaffolding.
- [ ] The root route returns a visible Citefold research workspace.
- [ ] The root route exposes library, review, workflow, and route anchors.
- [ ] The health route returns stable JSON for smoke tests and tooling.
- [ ] The spec is updated in the same change set.
- [ ] Automated tests cover the critical behavior.

### Regression Guardrails

- `GET /` must keep returning HTML with a recognizable Citefold heading.
- `GET /` must keep rendering library and review workspace anchors.
- `GET /` must keep rendering the route index and a visible `/api/health` entry
  point.
- `GET /styles.css` must keep returning the generated stylesheet.
- Worker/view runtime files must remain free of inline executable browser code.
- `GET /api/health` must keep returning HTTP 200 JSON with `ok: true`.
- Unknown routes must return HTTP 404.

### Verification

- **Automated tests:** colocated Vitest files under `src/**/*.test.ts` for module behavior and colocated Playwright files under `src/**/*.e2e.ts` for the browser-visible flow.
- **Coverage target:** Keep the `src/worker.ts`, `src/api/**`, and `src/views/**` branches, lines, functions, and statements above the repo coverage thresholds.

### Scenarios

**Scenario: Researcher opens the workspace**

- Given: the Worker is running locally
- When: the developer visits `/`
- Then: they see a minimal Citefold workspace with library and review sections

**Scenario: Tooling checks app health**

- Given: the Worker is running locally
- When: a tool requests `/api/health`
- Then: it receives a stable JSON response with `ok: true`

**Scenario: Browser requests starter stylesheet**

- Given: the Worker is running locally
- When: the browser requests `/styles.css`
- Then: it receives the generated Tailwind stylesheet through the same local runtime path used by the browser tests

**Scenario: Unknown route**

- Given: the Worker is running locally
- When: a request hits an undefined route
- Then: the Worker returns HTTP 404
