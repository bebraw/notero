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
  it("rejects annotations that reference missing items", () => {
    const exportData: EvidenceExport = {
      annotations: [
        {
          id: "ann_missing_item",
          itemId: "item_missing",
          page: 1,
          selectedText: "orphan annotation",
          note: "No source paper.",
          labels: ["traceability"],
        },
      ],
      observations: [],
      syntheses: [],
    };

    expect(() => assertTraceableEvidence(exportData)).toThrow("Annotation ann_missing_item references missing item item_missing");
  });

  it("rejects observations that reference missing items", () => {
    const exportData: EvidenceExport = {
      annotations: [],
      observations: [
        {
          id: "obs_missing_item",
          itemId: "item_missing",
          sourceAnnotationIds: ["ann_missing"],
          reviewQuestion: "RQ1",
          extractionField: "finding",
          statement: "This points at a missing paper.",
          authorship: "user",
        },
      ],
      syntheses: [],
    };

    expect(() => assertTraceableEvidence(exportData)).toThrow("Observation obs_missing_item references missing item item_missing");
  });

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

  it("rejects observations that reference missing annotations", () => {
    const exportData: EvidenceExport = {
      annotations: [],
      observations: [
        {
          id: "obs_missing_annotation",
          itemId: "item_asreview_2020",
          sourceAnnotationIds: ["ann_missing"],
          reviewQuestion: "RQ1",
          extractionField: "finding",
          statement: "This points at a missing annotation.",
          authorship: "user",
        },
      ],
      syntheses: [],
    };

    expect(() => assertTraceableEvidence(exportData)).toThrow(
      "Observation obs_missing_annotation references missing annotation ann_missing",
    );
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

  it("rejects syntheses that reference missing observations", () => {
    const exportData: EvidenceExport = {
      annotations: [],
      observations: [],
      syntheses: [
        {
          id: "syn_missing_observation",
          sourceObservationIds: ["obs_missing"],
          title: "Missing observation",
          body: "This has an invalid evidence trail.",
          authorship: "llm-assisted",
        },
      ],
    };

    expect(() => assertTraceableEvidence(exportData)).toThrow(
      "Synthesis syn_missing_observation references missing observation obs_missing",
    );
  });
});
