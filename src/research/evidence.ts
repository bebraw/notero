import { libraryItems } from "./library";

export type Annotation = {
  readonly id: string;
  readonly itemId: string;
  readonly page: number;
  readonly selectedText: string;
  readonly note: string;
  readonly labels: readonly string[];
};

export type Observation = {
  readonly id: string;
  readonly itemId: string;
  readonly sourceAnnotationIds: readonly string[];
  readonly reviewQuestion: string;
  readonly extractionField: string;
  readonly statement: string;
  readonly authorship: "user" | "llm-assisted";
};

export type Synthesis = {
  readonly id: string;
  readonly sourceObservationIds: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly authorship: "user" | "llm-assisted";
};

export type EvidenceExport = {
  readonly annotations: readonly Annotation[];
  readonly observations: readonly Observation[];
  readonly syntheses: readonly Synthesis[];
};

// Stryker disable all: seed evidence records are static data; traceability rules remain mutated and tested.
export const evidenceExport: EvidenceExport = {
  annotations: [
    {
      id: "ann_asreview_screening_1",
      itemId: "item_asreview_2020",
      page: 2,
      selectedText: "active learning can reduce manual screening effort",
      note: "Use as rationale for prioritised screening.",
      labels: ["screening", "automation"],
    },
    {
      id: "ann_asdlc_traceability_1",
      itemId: "item_asdlc_2026",
      page: 4,
      selectedText: "specs preserve architectural intent for later agents",
      note: "Useful framing for traceable research workflows.",
      labels: ["method", "traceability"],
    },
  ],
  observations: [
    {
      id: "obs_screening_effort",
      itemId: "item_asreview_2020",
      sourceAnnotationIds: ["ann_asreview_screening_1"],
      reviewQuestion: "RQ1",
      extractionField: "workflow benefit",
      statement: "Active-learning screening can prioritise likely-relevant papers before manual review.",
      authorship: "user",
    },
    {
      id: "obs_traceable_context",
      itemId: "item_asdlc_2026",
      sourceAnnotationIds: ["ann_asdlc_traceability_1"],
      reviewQuestion: "RQ2",
      extractionField: "process guardrail",
      statement: "Durable specs give later agents a stable source for project intent.",
      authorship: "user",
    },
  ],
  syntheses: [
    {
      id: "syn_review_workflow",
      sourceObservationIds: ["obs_screening_effort", "obs_traceable_context"],
      title: "Review workflow direction",
      body: "Prioritised screening and durable source-linked observations should be designed as one workflow.",
      authorship: "llm-assisted",
    },
  ],
};
// Stryker restore all

export function createEvidenceExport(): EvidenceExport {
  assertTraceableEvidence(evidenceExport);
  return evidenceExport;
}

export function assertTraceableEvidence(exportData: EvidenceExport): void {
  const itemIds = new Set(libraryItems.map((item) => item.id));
  const annotationIds = new Set(exportData.annotations.map((annotation) => annotation.id));
  const observationIds = new Set(exportData.observations.map((observation) => observation.id));

  for (const annotation of exportData.annotations) {
    if (!itemIds.has(annotation.itemId)) {
      throw new Error(`Annotation ${annotation.id} references missing item ${annotation.itemId}`);
    }
  }

  for (const observation of exportData.observations) {
    if (!itemIds.has(observation.itemId)) {
      throw new Error(`Observation ${observation.id} references missing item ${observation.itemId}`);
    }

    if (observation.sourceAnnotationIds.length === 0) {
      throw new Error(`Observation ${observation.id} has no source annotations`);
    }

    for (const annotationId of observation.sourceAnnotationIds) {
      if (!annotationIds.has(annotationId)) {
        throw new Error(`Observation ${observation.id} references missing annotation ${annotationId}`);
      }
    }
  }

  for (const synthesis of exportData.syntheses) {
    if (synthesis.sourceObservationIds.length === 0) {
      throw new Error(`Synthesis ${synthesis.id} has no source observations`);
    }

    for (const observationId of synthesis.sourceObservationIds) {
      if (!observationIds.has(observationId)) {
        throw new Error(`Synthesis ${synthesis.id} references missing observation ${observationId}`);
      }
    }
  }
}
