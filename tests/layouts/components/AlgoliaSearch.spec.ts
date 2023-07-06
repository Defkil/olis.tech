import { expect, test } from "@playwright/test";

test("open algolia search with keyboard STRG+K", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Control+K");
  const modal = await page.locator(".DocSearch.DocSearch-Container");
  await expect(modal).toBeVisible();
});

test("algolia search entry should be invisible", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const modal = await page.locator(".docsearch-hidden");
  await expect(modal).not.toBeVisible();
});
