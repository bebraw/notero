import { expect, test } from "@playwright/test";

test("renders the worker home page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Notero" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Library" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Reviews" })).toBeVisible();
  await expect(page.getByText("Agentic software development")).toBeVisible();
  await expect(page.locator('a[href="/api/health"]').first()).toBeVisible();
  await expect(page.locator('a[href="/api/exports/bibtex"]').first()).toBeVisible();
});

test("serves the health endpoint", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.ok()).toBe(true);
  await expect(response.json()).resolves.toEqual({
    ok: true,
    name: "vibe-template-worker",
    routes: ["/", "/api/health", "/api/exports/bibtex"],
  });
});

test("serves the BibTeX export", async ({ request }) => {
  const response = await request.get("/api/exports/bibtex");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/x-bibtex");
  await expect(response.text()).resolves.toContain("@article{utrecht2020asreview,");
});

test("serves the generated stylesheet", async ({ request }) => {
  const response = await request.get("/styles.css");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/css");
  await expect(response.text()).resolves.toContain("--color-app-canvas:#f3eee6");
});
