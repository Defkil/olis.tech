import { expect, test } from "@playwright/test";
import { SITE_TITLE } from "../../../src/const/data";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(SITE_TITLE + " - Start");
});
