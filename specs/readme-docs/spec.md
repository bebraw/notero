# Feature: README Docs

## Blueprint

### Context

The README is the first surface contributors see. It should identify Citefold's
research-library purpose clearly near the top, keep the basic runtime and
verification commands easy to find, and move detailed development workflow notes
to `docs/development.md`.

### Architecture

- **Primary document:** `README.md`
- **Current workflow summary:** product purpose, current routes, minimal runtime
  commands, verification commands, and documentation pointers in `README.md`
- **Development detail:** `docs/development.md`
- **Non-goal:** no long-form setup guide or screenshot maintenance requirement
  in the README

### Anti-Patterns

- Do not make readers infer the app purpose from source files alone before they
  understand the research-library direction.
- Do not imply that generated code becomes authoritative just because CI passes.
- Do not let the README drift away from the actual commands, ports, or current
  route surface.
- Do not duplicate long development workflow documentation that belongs in
  `docs/development.md`.

## Contract

### Definition of Done

- [ ] The README identifies Citefold as a web-first research workspace near the
      top.
- [ ] The README identifies the current app as a Cloudflare Worker served with
      Wrangler.
- [ ] The README lists the current primary routes.
- [ ] The README explains how vendored ASDLC guidance relates to repo-specific architecture, spec, and ADR documents.
- [ ] The README reflects the current runtime and verification commands.
- [ ] Detailed setup and workflow notes remain linked through
      `docs/development.md` instead of duplicated in the README.

### Regression Guardrails

- `README.md` should let a new reader understand the product idea, current app,
  and rendering model before they start exploring the source tree.
- `README.md` should describe the current documentation contract accurately, including that specs and ADRs remain authoritative over generated code.
- `README.md` should continue to describe the current route surface and
  verification flow accurately.
- `README.md` should describe the current runtime pin source accurately when the repo toolchain changes.
- `README.md` should describe the supported host platform baseline accurately when local development constraints change.
- `README.md` should stay concise and point detailed development setup to
  `docs/development.md`.

### Verification

- **Repo check:** `git diff --check`
- **Docs check:** `npm run format:check`

### Scenarios

**Scenario: Reader opens the README**

- Given: the repo is viewed locally or on Git hosting
- When: the reader starts at the top of the document
- Then: they can tell quickly that Citefold is a web-first research workspace for
  PDFs, reviews, observations, and BibTeX export

**Scenario: Contributor follows the README**

- Given: the current Citefold baseline
- When: the contributor reads the runtime, verification, and source layout sections
- Then: the commands, ports, and file locations match the current repo behavior

**Scenario: Contributor evaluates generated changes**

- Given: a contributor or agent proposes code generated with AI assistance
- When: they read the README documentation notes
- Then: they understand that specs and ADRs remain the durable source of truth and that CI passing does not replace those documents

**Scenario: Reader needs development detail**

- Given: the reader needs local CI, test, toolchain, or write-boundary details
- When: they scan the README
- Then: they are pointed to `docs/development.md` instead of reading a long
  duplicated setup guide in the README
