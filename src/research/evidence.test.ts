import { describe, expect, it } from "vitest";
import { assertTraceableEvidence, createEvidenceExport, type EvidenceExport } from "./evidence";

describe("createEvidenceExport", () => {
  it("returns annotations, observations, and syntheses with source links", () => {
    const exportData = createEvidenceExport();

    expect(exportData.annotations).toHaveLength(2);
    expect(exportData.observations).toHaveLength(2);
    expect(exportData.syntheses).toHaveLength(1);
    expect(exportData.observations[0]?.sourceAnnotationIds).toEqual(["ann_asreview_screening_1"]);
    expect(exportData.syntheses[0]?.sourceObservationIds).toEqual(["obs_screening_effort", "obs_traceable_context"]);
  });
});

describe("assertTraceableEvidence", () => {
  it("rejects observations without source annotations", () => {
    const exportData: EvidenceExport = {
      annotations: [],
      observations: [
        {
          id: "obs_orphan",
          itemId: "item_asreview_2020",
          sourceAnnotationIds: [],
          reviewQuestion: "RQ1",
          extractionField: "finding",
          statement: "This should not persist as traceable evidence.",
          authorship: "user",
        },
      ],
      syntheses: [],
    };

    expect(() => assertTraceableEvidence(exportData)).toThrow("Observation obs_orphan has no source annotations");
  });

  it("rejects syntheses without source observations", () => {
    const exportData: EvidenceExport = {
      annotations: [],
      observations: [],
      syntheses: [
        {
          id: "syn_orphan",
          sourceObservationIds: [],
          title: "Orphan synthesis",
          body: "This has no evidence trail.",
          authorship: "llm-assisted",
        },
      ],
    };

    expect(() => assertTraceableEvidence(exportData)).toThrow("Synthesis syn_orphan has no source observations");
  });
});
