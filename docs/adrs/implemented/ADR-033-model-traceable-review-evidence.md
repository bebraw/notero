# ADR-033: Model Traceable Review Evidence

**Status:** Implemented

**Date:** 2026-06-01

## Context

The research-library spec targets SLR and MLR work, where the important output
is not only a bibliography but a defensible evidence trail. Zotero-style notes
and flat tags are not enough for review workflows that need screening decisions,
exclusion reasons, extraction fields, evidence statements, and later synthesis.

Local LLM assistance may help summarize or cluster observations, but generated
text is useful only when it remains grounded in source papers and reviewable by
the researcher.

## Decision

Citefold will model review evidence explicitly through review projects,
screening decisions, typed labels, annotations, observations, and syntheses.

Annotations must remain anchored to PDF locations. Observations must link back
to source papers, annotations, or explicit manual notes. Extraction data should
reference observations where possible. Synthesis records, including local
LLM-assisted drafts, must preserve the source set they summarize and must not
replace the underlying observations.

## Trigger

The research-library specification introduced `ReviewProject`,
`ScreeningDecision`, `Label`, `Annotation`, `Observation`, and `Synthesis` as
core domain concepts and added traceability guardrails for extraction and LLM
output.

## Consequences

**Positive:**

- Makes review work auditable instead of spreadsheet-only or note-only.
- Allows extraction tables to connect directly to PDF evidence.
- Keeps LLM-assisted summaries subordinate to source-linked observations.
- Supports multiple review projects over the same global library item.

**Negative:**

- The domain model is more complex than a simple paper-plus-tags library.
- UI workflows must make traceability useful without adding excessive data entry
  friction.
- Importing existing notes or annotations from other tools may require mapping
  incomplete provenance into this model.

**Neutral:**

- Multi-reviewer conflict resolution can build on the same model later, but it
  is not required for the first single-researcher implementation.

## Alternatives Considered

### Flat Tags And Notes

This would keep the model close to a traditional reference manager: papers,
attachments, tags, and notes. It was rejected because it cannot represent review
stage, exclusion reasons, extraction fields, or source-linked synthesis without
ad hoc conventions.

### Spreadsheet Extraction Outside The App

This would use Citefold only for PDFs and citations while keeping screening and
extraction in external CSV or spreadsheet tools. It was rejected because the
core product value comes from linking extraction and synthesis back to PDF
annotations and library metadata.

### Chat Over PDFs

This would make an LLM assistant the primary interface for summarization and
review work. It was rejected because chat output without durable observations
and source traceability is hard to audit and can drift away from the evidence
needed for paper writing.
