import { describe, expect, it } from "vitest";
import { createBibTexExportResponse } from "./bibtex";

describe("createBibTexExportResponse", () => {
  it("returns a portable BibTeX export", async () => {
    const response = createBibTexExportResponse();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/x-bibtex; charset=utf-8");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-disposition")).toBe('attachment; filename="notero-library.bib"');
    await expect(response.text()).resolves.toContain("@article{utrecht2020asreview,");
  });
});
