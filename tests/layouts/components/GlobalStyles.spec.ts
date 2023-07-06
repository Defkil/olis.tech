import { expect, test } from "@playwright/test";

test("body should have font family and background color", async ({ page }) => {
  const body = await page.locator("body");
  await expect(body).toHaveCSS("font-family", /./);
  await expect(body).toHaveCSS("background-color", /./);
});
