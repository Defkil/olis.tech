import { expect, test } from "@playwright/test";

test("Should have posts on page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const windows = page.locator(".window");
  expect(await windows.count()).toBeGreaterThan(1);
});
