import { escapeHtml } from "./shared";

const appTitle = "Notero";

const reviewRows = [
  {
    key: "agents-review",
    title: "Agentic software development",
    state: "screening",
    count: "37",
  },
  {
    key: "mlr-tools",
    title: "Research-tool workflows",
    state: "extraction",
    count: "18",
  },
];

const libraryRows = [
  {
    citekey: "widing2026asdlc",
    title: "Agentic software development life cycle",
    labels: ["method", "architecture"],
  },
  {
    citekey: "utrecht2020asreview",
    title: "Active learning for systematic reviews",
    labels: ["slr", "screening"],
  },
  {
    citekey: "zotero2026reader",
    title: "Reference managers and annotation workflows",
    labels: ["pdf", "export"],
  },
];

export function renderHomePage(routes: Array<{ path: string; purpose: string }>): string {
  const routeList = routes
    .map(
      (route) =>
        `<li>
          <a class="group flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0" href="${escapeHtml(route.path)}">
            <code class="text-sm font-semibold text-app-accent-strong">${escapeHtml(route.path)}</code>
            <span class="text-sm text-app-text-soft transition group-hover:text-app-accent">${escapeHtml(route.purpose)}</span>
          </a>
        </li>`,
    )
    .join("");

  const reviewList = reviewRows
    .map(
      (review) =>
        `<li class="grid grid-cols-[1fr_auto] gap-4 border-t border-app-line py-4 first:border-t-0 first:pt-0 last:pb-0">
          <div>
            <p class="font-semibold tracking-[-0.02em]">${escapeHtml(review.title)}</p>
            <p class="mt-1 text-sm text-app-text-soft">${escapeHtml(review.key)}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold text-app-accent-strong">${escapeHtml(review.count)}</p>
            <p class="mt-1 text-sm text-app-text-soft">${escapeHtml(review.state)}</p>
          </div>
        </li>`,
    )
    .join("");

  const libraryList = libraryRows
    .map(
      (item) =>
        `<li class="border-t border-app-line py-4 first:border-t-0 first:pt-0 last:pb-0">
          <div class="flex items-start justify-between gap-4">
            <div>
              <code class="text-sm font-semibold text-app-accent-strong">${escapeHtml(item.citekey)}</code>
              <p class="mt-1 leading-6">${escapeHtml(item.title)}</p>
            </div>
            <p class="shrink-0 text-right text-sm text-app-text-soft">${item.labels.map(escapeHtml).join(" / ")}</p>
          </div>
        </li>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(appTitle)}</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body class="min-h-screen bg-app-canvas text-app-text antialiased">
    <main class="mx-auto w-[min(64rem,calc(100vw-2rem))] py-8 sm:py-12">
      <article class="space-y-8">
        <section class="flex flex-col gap-5 border-b border-app-line pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-app-accent">Research Library</p>
            <h1 class="text-5xl leading-[0.92] font-semibold sm:text-7xl">${escapeHtml(appTitle)}</h1>
          </div>
          <dl class="grid grid-cols-3 gap-5 text-right">
            <div>
              <dt class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-app-text-soft">Papers</dt>
              <dd class="mt-2 text-2xl font-semibold">124</dd>
            </div>
            <div>
              <dt class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-app-text-soft">Reviews</dt>
              <dd class="mt-2 text-2xl font-semibold">2</dd>
            </div>
            <div>
              <dt class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-app-text-soft">Notes</dt>
              <dd class="mt-2 text-2xl font-semibold">312</dd>
            </div>
          </dl>
        </section>
        <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="rounded-lg border border-app-line bg-app-surface p-5 shadow-panel">
            <div class="mb-5 flex items-center justify-between gap-4">
              <h2 class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-app-text-soft">Library</h2>
              <a class="text-sm font-semibold text-app-accent-strong hover:text-app-accent" href="/api/exports/bibtex">bibtex</a>
            </div>
            <ul>${libraryList}</ul>
          </div>
          <div class="rounded-lg border border-app-line bg-app-surface p-5 shadow-panel">
            <div class="mb-5 flex items-center justify-between gap-4">
              <h2 class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-app-text-soft">Reviews</h2>
              <span class="text-sm text-app-text-soft">active</span>
            </div>
            <ul>${reviewList}</ul>
          </div>
        </section>
        <section class="grid gap-6 border-t border-app-line pt-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-app-text-soft">Routes</h2>
            <ul class="mt-4 divide-y divide-app-line">${routeList}</ul>
          </div>
          <div class="grid grid-cols-3 gap-3 text-sm">
            <div class="rounded-lg border border-app-line bg-app-surface px-4 py-3">
              <p class="font-semibold">capture</p>
              <p class="mt-1 text-app-text-soft">pdf / bib</p>
            </div>
            <a class="rounded-lg border border-app-line bg-app-surface px-4 py-3 transition hover:border-app-accent/35 hover:bg-app-accent-ghost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/40" href="/api/review/evidence">
              <p class="font-semibold">screen</p>
              <p class="mt-1 text-app-text-soft">include / exclude</p>
            </a>
            <div class="rounded-lg border border-app-line bg-app-surface px-4 py-3">
              <p class="font-semibold">write</p>
              <p class="mt-1 text-app-text-soft">bibtex / csv</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  </body>
</html>`;
}
