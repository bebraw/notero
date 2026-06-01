import { describe, expect, it } from "vitest";
import { createEvidenceExportResponse } from "./evidence";

describe("createEvidenceExportResponse", () => {
  it("returns a portable evidence export", async () => {
    const response = createEvidenceExportResponse();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-disposition")).toBe('attachment; filename="notero-evidence.json"');
    const body = await response.json();

    expect(body.observations[0]).toMatchObject({
      id: "obs_screening_effort",
      sourceAnnotationIds: ["ann_asreview_screening_1"],
    });
    expect(body.syntheses[0]).toMatchObject({
      id: "syn_review_workflow",
      authorship: "llm-assisted",
    });
  });
});
