import { describe, expect, it } from "vitest";
import { libraryItems, serializeBibTex, type LibraryItem } from "./library";

function seedItem(index: number): LibraryItem {
  const item = libraryItems[index];

  if (!item) {
    throw new Error(`Missing seed item at index ${index}`);
  }

  return item;
}

describe("serializeBibTex", () => {
  it("exports stable citation keys and common BibTeX fields", () => {
    const bibtex = serializeBibTex(libraryItems);

    expect(bibtex).toContain("@misc{widing2026asdlc,");
    expect(bibtex).toContain("@article{utrecht2020asreview,");
    expect(bibtex).toContain("title = {Open source software for efficient and transparent reviews}");
    expect(bibtex).toContain("doi = {10.1038/s42256-020-00287-7}");
    expect(bibtex).toContain("url = {https://www.zotero.org/support/kb/annotations_in_database}");
  });

  it("rejects duplicate citation keys before export", () => {
    const firstItem = seedItem(0);
    const secondItem = seedItem(1);
    const duplicateItems: readonly LibraryItem[] = [
      firstItem,
      {
        ...secondItem,
        citation: {
          ...secondItem.citation,
          key: firstItem.citation.key,
        },
      },
    ];

    expect(() => serializeBibTex(duplicateItems)).toThrow("Duplicate citation key: widing2026asdlc");
  });

  it("escapes braces in field values", () => {
    const firstItem = seedItem(0);
    const bibtex = serializeBibTex([
      {
        ...firstItem,
        citation: {
          ...firstItem.citation,
          title: "Use {structured} evidence",
        },
      },
    ]);

    expect(bibtex).toContain("title = {Use \\{structured\\} evidence}");
  });
});
