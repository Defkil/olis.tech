import { expect, test } from "@playwright/test";

test("Datenschutzerklärung", async ({ page }) => {
  await page.goto("http://localhost:3000/datenschutzerklaerung");
  const title = page.locator(".content h1");
  await expect(title).toHaveText("Datenschutzerklärung");
});
