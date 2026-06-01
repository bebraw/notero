import { describe, expect, it } from "vitest";
import { appRoutes } from "../app-routes";
import { renderHomePage } from "./home";

describe("renderHomePage", () => {
  it("renders the Citefold workspace and stylesheet wiring", () => {
    const html = renderHomePage(appRoutes);

    expect(html).toContain("Citefold");
    expect(html).toContain("Research Library");
    expect(html).toContain("Library");
    expect(html).toContain("Reviews");
    expect(html).toContain("Agentic software development");
    expect(html).toContain("utrecht2020asreview");
    expect(html).toContain("/api/exports/bibtex");
    expect(html).toContain("/api/review/evidence");
    expect(html).toContain('rel="stylesheet" href="/styles.css"');
    expect(html).not.toContain("Stryker was here!");
    expect(html).not.toContain("vibe-template Worker");
    expect(html.match(/<li[ >]/g)).toHaveLength(appRoutes.length + 5);
  });
});
