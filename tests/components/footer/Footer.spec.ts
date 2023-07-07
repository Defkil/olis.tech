import { expect, test } from "@playwright/test";
import { SITE_AUTHOR_MAIL } from "../../../src/const/data";

test("check if right email is linked", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const email = page.locator(".footer a[href='mailto:" + SITE_AUTHOR_MAIL + "']");
  await expect(email).toBeVisible();
});
