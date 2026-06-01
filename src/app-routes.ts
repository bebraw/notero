// Stryker disable all: route labels are static navigation data, not executable behavior.
export const appRoutes = [
  { path: "/", purpose: "Research workspace" },
  { path: "/api/health", purpose: "Health probe" },
  { path: "/api/exports/bibtex", purpose: "BibTeX export" },
  { path: "/api/review/evidence", purpose: "Evidence export" },
];
// Stryker restore all
