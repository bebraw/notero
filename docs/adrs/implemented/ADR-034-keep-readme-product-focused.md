# ADR-034: Keep README Product Focused

**Status:** Implemented

**Date:** 2026-06-01

## Context

ADR-020 kept a committed README screenshot and required README image reference as
part of the template baseline. That made sense while the repository presented a
starter UI. The project has now moved from generic `vibe-template` framing to
Citefold, a specific research-library product.

The README should now communicate the product idea, current route surface, and
essential commands quickly. Long development workflow notes and screenshot
maintenance guidance make the entry point heavier than the project needs.

## Decision

The README will stay product-focused and concise.

It will describe Citefold's purpose, current app routes, minimal local run
commands, verification commands, and pointers to durable project context.
Detailed development setup remains in `docs/development.md`. The README no
longer requires an application screenshot reference.

## Trigger

The user asked to update the README to capture the basic idea, keep it to the
point, and extract development documentation to separate files where useful.

## Consequences

**Positive:**

- The README now starts with the research-library idea instead of template
  mechanics.
- Development details remain available without dominating the project entry
  point.
- UI changes no longer imply README screenshot maintenance.

**Negative:**

- Readers no longer see an immediate rendered screenshot in the README.
- The committed screenshot asset may become archival unless a later decision
  reintroduces screenshot usage.

**Neutral:**

- Screenshot tooling remains outside the automated development loop.
- `docs/development.md` remains the home for setup, local CI, and tooling notes.

## Alternatives Considered

### Keep The Screenshot In The README

This was rejected because the screenshot requirement adds maintenance pressure
and makes the README less focused on the product idea.

### Move All Development Notes Out Of The Repo

This was rejected because the tooling and local CI workflow are still important
repo context. They belong in `docs/development.md`, not in the README.
