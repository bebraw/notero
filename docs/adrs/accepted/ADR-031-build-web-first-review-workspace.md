# ADR-031: Build Web-First Review Workspace

**Status:** Accepted

**Date:** 2026-06-01

## Context

The research-library spec defines Notero as a tool for collecting papers,
annotating PDFs, running SLR and MLR workflows, refining observations, and
exporting writing inputs for Overleaf. The tempting alternative is to start by
recreating Zotero's broad reference-management surface, including desktop-first
workflows, word-processor plugins, group libraries, web snapshots, and many
import/export formats.

That would dilute the first product into a general reference manager before the
review-to-paper workflow is proven. The project needs a clear initial product
boundary that supports mobile and desktop use without taking on native desktop
application complexity.

## Decision

Notero will be a web-first, single-researcher review workspace before it is a
general Zotero replacement.

The first product architecture should prioritize browser-based library
management, PDF reading, annotation, labeling, review projects, extraction, and
export. Native desktop applications, word-processor plugins, generic web
snapshot archiving, institutional administration, and broad collaboration
features are out of scope until the core review-to-paper workflow is coherent.

## Trigger

The initial research-library specification selected a narrower product thesis:
do less than Zotero as a general reference manager, but do more for structured
review work and paper-writing preparation.

## Consequences

**Positive:**

- Keeps early implementation focused on paper-writing speed rather than feature
  parity with mature reference managers.
- Supports desktop and mobile access through one web surface.
- Leaves room to design review-specific concepts, such as screening and
  extraction, as first-class workflows.

**Negative:**

- Users who need native desktop behavior, offline-first sync, or Word/LibreOffice
  plugins will not be served by the first versions.
- Some Zotero replacement expectations must be explicitly rejected or deferred.
- Browser PDF interaction and file storage become core product risks.

**Neutral:**

- The product remains compatible with later native shells or integrations if a
  future ADR accepts that scope.

## Alternatives Considered

### Full Zotero Clone

This would pursue parity with Zotero across desktop library management, plugins,
snapshots, sync, and broad format support. It was rejected because parity work
would consume the early roadmap before proving the differentiated SLR, MLR, and
observation-refinement workflows.

### Desktop-First Reference Manager

This would start with a native macOS or cross-platform desktop application. It
was rejected for the initial product because the user explicitly needs mobile
and desktop access, and a native-first approach would add packaging, sync, and
platform complexity before the domain model is validated.

### Review Tool Only

This would skip reference-management and PDF-library concerns and focus only on
screening and extraction. It was rejected because the product thesis depends on
connecting PDFs, annotations, metadata, observations, and BibTeX export in one
workspace.
