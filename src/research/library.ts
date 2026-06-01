export type CitationRecord = {
  readonly key: string;
  readonly entryType: "article" | "inproceedings" | "misc";
  readonly title: string;
  readonly author: string;
  readonly year: string;
  readonly journal?: string;
  readonly booktitle?: string;
  readonly doi?: string;
  readonly url?: string;
};

export type LibraryItem = {
  readonly id: string;
  readonly citation: CitationRecord;
  readonly attachment: {
    readonly filename: string;
    readonly mimeType: "application/pdf";
    readonly contentHash: string;
  };
  readonly labels: readonly string[];
};

// Stryker disable all: seed records are static library data; serializer behavior is tested below.
export const libraryItems: readonly LibraryItem[] = [
  {
    id: "item_asdlc_2026",
    citation: {
      key: "widing2026asdlc",
      entryType: "misc",
      title: "Agentic software development life cycle",
      author: "Widing, Rasmus",
      year: "2026",
      url: "https://asdlc.io/",
    },
    attachment: {
      filename: "agentic-software-development-life-cycle.pdf",
      mimeType: "application/pdf",
      contentHash: "sha256:asdlc-seed",
    },
    labels: ["method", "architecture"],
  },
  {
    id: "item_asreview_2020",
    citation: {
      key: "utrecht2020asreview",
      entryType: "article",
      title: "Open source software for efficient and transparent reviews",
      author: "van de Schoot, Rens and de Bruin, Jonathan and Schram, Raoul",
      year: "2020",
      journal: "Nature Machine Intelligence",
      doi: "10.1038/s42256-020-00287-7",
    },
    attachment: {
      filename: "open-source-software-efficient-transparent-reviews.pdf",
      mimeType: "application/pdf",
      contentHash: "sha256:asreview-seed",
    },
    labels: ["slr", "screening"],
  },
  {
    id: "item_zotero_reader_2026",
    citation: {
      key: "zotero2026reader",
      entryType: "misc",
      title: "Reference managers and annotation workflows",
      author: "Citefold Research Notes",
      year: "2026",
      url: "https://www.zotero.org/support/kb/annotations_in_database",
    },
    attachment: {
      filename: "reference-managers-annotation-workflows.pdf",
      mimeType: "application/pdf",
      contentHash: "sha256:zotero-reader-seed",
    },
    labels: ["pdf", "export"],
  },
];
// Stryker restore all

export function serializeBibTex(items: readonly LibraryItem[]): string {
  assertUniqueCitationKeys(items);

  return `${items.map((item) => serializeCitationRecord(item.citation)).join("\n\n")}\n`;
}

function serializeCitationRecord(record: CitationRecord): string {
  const fields = [
    ["author", record.author],
    ["title", record.title],
    ["year", record.year],
    ["journal", record.journal],
    ["booktitle", record.booktitle],
    ["doi", record.doi],
    ["url", record.url],
  ].filter((field): field is [string, string] => typeof field[1] === "string" && field[1].length > 0);

  const body = fields.map(([name, value]) => `  ${name} = {${escapeBibTexValue(value)}}`).join(",\n");

  return `@${record.entryType}{${record.key},\n${body}\n}`;
}

function assertUniqueCitationKeys(items: readonly LibraryItem[]): void {
  const keys = new Set<string>();

  for (const item of items) {
    if (keys.has(item.citation.key)) {
      throw new Error(`Duplicate citation key: ${item.citation.key}`);
    }

    keys.add(item.citation.key);
  }
}

function escapeBibTexValue(value: string): string {
  return [...value]
    .map((character) => {
      if (character === "\\") {
        return "\\textbackslash{}";
      }

      if (character === "{") {
        return "\\{";
      }

      if (character === "}") {
        return "\\}";
      }

      return character;
    })
    .join("");
}
