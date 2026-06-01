# ADR-035: Adopt Citefold Product Name

**Status:** Implemented

**Date:** 2026-06-01

## Context

The project was initially specified and implemented under the working name
Notero. That name was useful while the product thesis was still being shaped
around a Zotero-inspired research workflow, but the project now needs a distinct
identity that does not read as a direct Zotero derivative.

The name affects visible UI, package metadata, Worker identity, export
filenames, specs, and ADR language.

## Decision

The product name is Citefold.

Current user-facing product text, package metadata, Worker health identity, and
portable export filenames should use Citefold or `citefold` naming. Historical
ADRs may still mention `vibe-template` where they describe the original template
baseline, but current product docs and app surfaces should use Citefold.

## Trigger

The user selected Citefold as the product direction and asked to update the
README and related material.

## Consequences

**Positive:**

- Citefold gives the product its own identity instead of a Zotero-adjacent
  working name.
- Package, Worker, export, and documentation names now align.
- Future documentation has a clear current name to preserve.

**Negative:**

- Existing local references to Notero need to be updated when touched.
- External consumers of the previous Worker health name or export filenames
  would need to adjust.

**Neutral:**

- The repository directory may remain `notero` locally; the product identity is
  independent of the checkout path.

## Alternatives Considered

### Keep Notero

This was rejected because it stays too close to Zotero and undersells the
product's distinct review-to-paper workflow.

### Rename Only The README

This was rejected because the UI, health response, package metadata, and export
filenames would still expose stale product names.
