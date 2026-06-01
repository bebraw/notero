# Feature: Research Library

## Blueprint

### Context

Notero is a web-first research workspace for collecting papers, reading PDFs,
annotating evidence, running structured literature reviews, and exporting clean
references for writing in Overleaf.

The product is intentionally not a full Zotero clone. Zotero remains strong as a
general reference manager, but the target workflow here is narrower and more
paper-writing oriented:

- Keep PDF capture, annotation, metadata, and BibTeX export in one workspace.
- Make systematic literature reviews (SLRs) and multivocal literature reviews
  (MLRs) first-class workflows instead of spreadsheet-driven side processes.
- Treat labels as queryable research facets rather than a flat tag cloud.
- Let observations evolve from raw annotations into structured evidence that can
  be synthesized into paper sections.
- Support local LLM assistance only when generated text can remain traceable to
  source papers, annotations, and observations.

The first implementation should optimize for one researcher using the product
across desktop and mobile browsers. Team review workflows, institutional
administration, and word-processor integrations are later concerns.

### Product Position

Notero should do less than Zotero in the first versions:

- No Word, LibreOffice, Google Docs, or Overleaf live citation plugin.
- No universal CSL citation-rendering surface beyond export-oriented metadata.
- No broad web snapshot archiving.
- No automatic subscription full-text retrieval.
- No general-purpose group-library model.
- No requirement to support every Zotero import/export format.

Notero should do more than Zotero for review-to-paper work:

- Review projects are first-class objects with protocol, screening, extraction,
  and synthesis state.
- Screening decisions preserve inclusion/exclusion reasons and audit metadata.
- Extraction fields can link structured observations back to PDF annotations.
- Labels have type, scope, description, and query semantics.
- Local LLM operations are grounded in selected library items and must preserve
  source traceability.
- BibTeX import and export are treated as core workflows, not secondary escape
  hatches.

### Primary Workflows

#### Build A Library

The user imports PDFs, BibTeX entries, or both. The system stores the PDF file,
extracts or accepts citation metadata, detects likely duplicates, and assigns a
stable citation key. The user can search by metadata, labels, annotations, and
eventually indexed PDF text.

#### Read And Annotate

The user opens a PDF on desktop or mobile, creates highlights and notes, labels
annotations, and extracts important passages into observations. An annotation
must remain anchored to the document location it came from.

#### Organize With Labels

The user categorizes papers and observations with typed labels. Labels can be
global or review-scoped. They can describe topic, method, quality, workflow
state, review status, or a custom category. Filtering should combine labels with
metadata and review state.

#### Run An SLR Or MLR

The user creates a review project, records research questions, search sources,
search strings, inclusion criteria, exclusion criteria, and extraction fields.
The user screens candidate papers by title/abstract and full text, records
decisions, extracts observations, and exports review data.

#### Refine Observations

The user turns highlights and notes into evidence statements. Observations can
be grouped by research question, theme, method, finding, limitation, or
contradiction. Local LLM assistance may summarize or cluster observations, but
generated output must link back to the observations and papers it used.

#### Export For Writing

The user exports selected references as BibTeX for Overleaf. The user can also
export extraction tables and observation summaries as CSV, Markdown, or LaTeX
snippets when the data supports it.

### Architecture

- **Entry points:** Web application routes for the library, PDF reader, review
  project workspace, extraction table, label manager, import, and export.
- **Data models:** `LibraryItem`, `Attachment`, `CitationRecord`,
  `Annotation`, `Label`, `ReviewProject`, `ReviewProtocol`,
  `ScreeningDecision`, `ExtractionField`, `Observation`, `Synthesis`, and
  `ExportJob`.
- **Dependencies:** PDF rendering and annotation storage, durable file storage,
  metadata parsing and validation, BibTeX parsing and serialization, search
  indexing, and optional local LLM adapters.
- **Downstream users:** Future UI, storage, import/export, local LLM, and review
  workflow implementations must preserve this spec unless they update it and
  any related ADRs in the same change set.

### Domain Model

#### LibraryItem

A paper or source record. It owns normalized bibliographic metadata, duplicate
detection signals, labels, attachments, and optional review memberships.

Required intent:

- Preserve a stable internal identifier independent of citation keys.
- Store normalized metadata separately from the original imported record.
- Track enough source information to explain where metadata came from.
- Allow one item to belong to multiple review projects.

#### Attachment

A stored file associated with a `LibraryItem`, usually a PDF.

Required intent:

- Preserve original filename and content hash.
- Track MIME type, size, and storage location.
- Support multiple attachments per item later, but optimize for one primary PDF.

#### CitationRecord

The citation metadata used for BibTeX import/export and later citation tooling.

Required intent:

- Preserve the original imported BibTeX when available.
- Maintain a normalized editable representation.
- Generate stable, human-readable citation keys.
- Detect key collisions before export.

#### Annotation

A highlight, note, or area selection anchored to an attachment.

Required intent:

- Preserve document anchor data, page number, selected text when available, note
  content, color or style, and label assignments.
- Be usable as evidence for observations.
- Remain exportable without requiring proprietary PDF-reader state.

#### Label

A typed, queryable categorization object.

Required intent:

- Support global and review-scoped labels.
- Support label types: topic, method, quality, workflow, review, and custom.
- Support optional color, aliases, description, and parent group.
- Avoid silently importing unbounded noisy keyword tags into the user's curated
  label space.

#### ReviewProject

An SLR, MLR, scoping review, mapping study, or related paper-writing project.

Required intent:

- Store research questions, search strategy, inclusion criteria, exclusion
  criteria, extraction schema, candidate set, decisions, and outputs.
- Keep review state separate from global library state.
- Allow the same paper to have different decisions or labels in different
  review projects.

#### ScreeningDecision

A decision about a paper within a review stage.

Required intent:

- Support include, exclude, maybe, and unresolved states.
- Support title/abstract and full-text stages.
- Capture exclusion reason, note, reviewer identity placeholder, and timestamp.
- Preserve an audit trail even before multi-reviewer workflows exist.

#### Observation

A structured evidence statement derived from annotations, notes, or manual
entry.

Required intent:

- Link back to one or more source annotations or papers.
- Carry review question, extraction field, label, and confidence metadata where
  relevant.
- Distinguish user-authored observations from LLM-assisted drafts.

#### Synthesis

A derived summary, cluster, comparison, or draft passage over observations.

Required intent:

- Store the source set used to produce the synthesis.
- Mark whether the text was user-authored, LLM-assisted, or imported.
- Never replace the source observations it summarizes.

### Data Portability

Notero must make user exit straightforward:

- Export selected or complete references as BibTeX.
- Preserve citation keys unless the user explicitly regenerates them.
- Export review decisions and extraction data as CSV or another common tabular
  format.
- Export annotations and observations in a documented, non-proprietary format.
- Keep PDFs recoverable from storage without depending on a hosted service.

### Local LLM Boundary

Local LLM support is optional assistance, not an authority layer.

Allowed LLM tasks:

- Summarize selected annotations or observations.
- Suggest labels or extraction values.
- Cluster observations by theme.
- Draft paper-section outlines from selected evidence.
- Find likely contradictions or gaps across observations.

Required guardrails:

- LLM output must identify its source papers, annotations, or observations.
- LLM output must be reviewable before it changes durable user-authored data.
- Remote LLM providers are out of scope unless a future ADR explicitly accepts
  that privacy and dependency trade-off.
- LLM-generated synthesis must not be treated as a citation source.

### MVP Scope

The first useful version should include:

- PDF upload and durable storage.
- Basic citation metadata editing.
- BibTeX import and export.
- Stable citation key generation and collision handling.
- PDF viewing with highlight and note annotations.
- Typed labels for papers and annotations.
- Library search and filtering by metadata, labels, and review state.
- Review projects with protocol fields, screening states, and exclusion reasons.
- Extraction table with custom fields.
- Observations linked to annotations or papers.
- Export of BibTeX, screening decisions, and extraction data.

Later versions may add:

- Browser capture extension.
- Automatic DOI and metadata repair.
- Full-text PDF indexing.
- Offline-first sync.
- Multi-reviewer conflict resolution.
- ASReview-style active learning for screening prioritization.
- PRISMA flow data and diagrams.
- CSL rendering and additional export formats.
- Overleaf or editor-specific integrations.

### Anti-Patterns

- Do not build a generic Zotero clone before proving the review-to-paper
  workflow.
- Do not make labels a flat, untyped tag cloud.
- Do not store annotations only as opaque PDF-reader state.
- Do not let LLM summaries erase source evidence or become untraceable.
- Do not couple BibTeX export to one writing tool or one hard-coded citation key
  style.
- Do not mix global library metadata with review-specific decisions in a way
  that prevents the same paper from participating in multiple reviews.
- Do not introduce team, institution, or collaboration complexity before the
  single-researcher workflow is coherent.

## Contract

### Definition of Done

- [ ] A user can import or create a `LibraryItem` with citation metadata and a
      primary PDF attachment.
- [ ] A user can annotate a PDF and recover those annotations after reload.
- [ ] A user can assign typed labels to papers and annotations.
- [ ] A user can create a review project with research questions, criteria, and
      extraction fields.
- [ ] A user can screen papers in a review project with stage, decision, reason,
      note, and timestamp.
- [ ] A user can create observations linked to annotations or papers.
- [ ] A user can export selected references as BibTeX with stable citation keys.
- [ ] A user can export screening and extraction data in a portable format.
- [ ] Local LLM output, when implemented, remains opt-in, source-linked, and
      reviewable before persistence.
- [ ] The spec and any related ADRs are updated in the same change set whenever
      these contracts change.
- [ ] Automated tests cover import/export, label queries, annotation
      persistence, review decisions, extraction behavior, and source
      traceability once executable code exists.

### Regression Guardrails

- BibTeX export must not silently change existing citation keys.
- Review-scoped labels and decisions must not leak into global library metadata.
- An observation used in an extraction table must keep a source link to a paper,
  annotation, or explicit manual note.
- An LLM-assisted synthesis must preserve the source set it was generated from.
- Imported metadata must remain distinguishable from user-edited normalized
  metadata.
- Duplicate detection must not delete or merge records without user review.
- PDF files and user-authored annotations must remain exportable.

### Verification

- **Automated tests:** Unit and integration tests for BibTeX parsing and
  serialization, citation key collision handling, label filtering, annotation
  persistence, review-state transitions, extraction field validation, and export
  formats.
- **End-to-end tests:** Browser tests for importing a paper, annotating a PDF,
  labeling it, adding it to a review, screening it, extracting an observation,
  and exporting BibTeX.
- **Coverage target:** Critical behavior in import/export, review decisions,
  annotations, and observation traceability must remain covered by the baseline
  quality gate once implementation begins.

### Scenarios

**Scenario: Import a paper for Overleaf**

- Given: The user has a PDF and a BibTeX entry.
- When: The user imports both into the library.
- Then: The system creates one library item with a primary PDF attachment,
  normalized citation metadata, the original BibTeX record, and a stable
  citation key.

**Scenario: Annotate evidence**

- Given: The user is reading a stored PDF.
- When: The user highlights a passage and adds a note.
- Then: The annotation remains anchored to the PDF location and can be used as a
  source for an observation.

**Scenario: Apply typed labels**

- Given: The user has papers from multiple topics and methods.
- When: The user applies topic and method labels.
- Then: The library can filter by those label types without treating every label
  as an undifferentiated tag.

**Scenario: Screen a review candidate**

- Given: A review project has inclusion and exclusion criteria.
- When: The user excludes a paper during title/abstract screening.
- Then: The system records the stage, decision, exclusion reason, note, and
  timestamp without changing the paper's global library record.

**Scenario: Extract a traceable observation**

- Given: A review project has an extraction field for limitations.
- When: The user creates an observation from a highlighted PDF passage.
- Then: The extraction table can reference that observation and the observation
  links back to the source annotation.

**Scenario: Export writing inputs**

- Given: The user has selected papers and extracted observations for a paper
  section.
- When: The user exports writing inputs.
- Then: The system produces BibTeX with stable citation keys and a portable
  extraction or observation export that preserves source identifiers.

**Scenario: Use local LLM assistance**

- Given: The user has selected observations from a review project.
- When: The user asks a local LLM to summarize them.
- Then: The draft summary remains marked as LLM-assisted and records the source
  observations used to produce it.
