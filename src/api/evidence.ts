import { createEvidenceExport } from "../research/evidence";

export function createEvidenceExportResponse(): Response {
  return Response.json(createEvidenceExport(), {
    headers: {
      "cache-control": "no-store",
      "content-disposition": 'attachment; filename="notero-evidence.json"',
    },
  });
}
