# ADR-032: Make BibTeX And User Data Portable

**Status:** Implemented

**Date:** 2026-06-01

## Context

The target writing workflow remains Overleaf, so Notero must reliably produce
clean BibTeX. At the same time, the product will store PDFs, annotations,
labels, review decisions, extraction fields, observations, and syntheses. If
those records become trapped in an opaque application database, the product
would fail a core researcher requirement: the library and review work must
remain usable outside Notero.

The research-library spec therefore treats BibTeX import/export and durable
data portability as core behavior rather than optional backup features.

## Decision

Notero will be BibTeX-first for citation exchange and portable-by-default for
user-owned research data.

Citation records must preserve imported BibTeX when available, maintain editable
normalized metadata, generate stable citation keys, detect export collisions,
and avoid silently changing existing keys. PDFs, annotations, labels, screening
decisions, extraction data, observations, and syntheses must remain exportable in
documented, non-proprietary formats as those features are implemented.

## Trigger

The research-library specification made BibTeX export a first-class workflow for
Overleaf and added regression guardrails for citation-key stability, annotation
export, extraction export, and user exit.

## Consequences

**Positive:**

- Keeps the product aligned with Overleaf and LaTeX writing workflows.
- Reduces lock-in risk for PDFs, annotations, and review data.
- Makes future import/export tests concrete and automatable.
- Allows internal metadata normalization without discarding original imported
  records.

**Negative:**

- Import/export quality becomes core engineering work, not a peripheral utility.
- Stable citation-key behavior constrains future metadata repair and merge
  workflows.
- Portable annotation and observation formats must be designed and maintained.

**Neutral:**

- CSL, RIS, and other citation formats can be added later, but they do not
  replace BibTeX as the primary writing exchange format.

## Alternatives Considered

### CSL-First Citation Model

CSL JSON is a strong neutral representation for citation metadata, especially
for citation-style rendering. It was not chosen as the primary exchange model
because the user's writing workflow is Overleaf and BibTeX import/export is the
critical path. CSL can still be supported later as an additional format.

### Internal Database Only

This would optimize for the application's internal model and defer exports until
late. It was rejected because it would make citation-key stability, review data
portability, and exit behavior easy to neglect.

### Zotero Sync As The Source Of Truth

This would use Zotero as the backing library and build Notero as a review layer.
It was rejected for the initial direction because the product is explicitly
intended to move away from Zotero's current desktop experience and needs its own
domain model for labels, observations, and review projects.
