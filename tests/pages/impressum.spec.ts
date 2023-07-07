import { expect, test } from "@playwright/test";

test("Impressum", async ({ page }) => {
  await page.goto("http://localhost:3000/impressum");
  const title = page.locator(".content h1");
  await expect(title).toHaveText("Impressum");
});
