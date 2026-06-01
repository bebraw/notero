import { libraryItems, serializeBibTex } from "../research/library";

export function createBibTexExportResponse(): Response {
  return new Response(serializeBibTex(libraryItems), {
    status: 200,
    headers: {
      "content-type": "text/x-bibtex; charset=utf-8",
      "cache-control": "no-store",
      "content-disposition": 'attachment; filename="citefold-library.bib"',
    },
  });
}
