import { expect, test } from "@playwright/test";
import { SITE_DESCRIPTION, SITE_LINK, SITE_TITLE } from "../../src/const/data";

test("rss has title", async ({ page }) => {
  await page.goto("http://localhost:3000/rss.xml");
  const title = await page.$eval("h2", (el) => el.textContent);
  expect(title).toBe(SITE_TITLE);
});

test("rss has description", async ({ page }) => {
  await page.goto("http://localhost:3000/rss.xml");
  const description = await page.locator("header > p").textContent();
  expect(description).toBe(SITE_DESCRIPTION);
});

test("rss links to website", async ({ page }) => {
  await page.goto("http://localhost:3000/rss.xml");
  const link = await page.locator("header > a").getAttribute("href");
  expect(link).toBe(SITE_LINK);
});

test("rss has items", async ({ page }) => {
  await page.goto("http://localhost:3000/rss.xml");
  const item = await page.locator("body>div>*:nth-child(3)");
  await expect(item).toHaveCount(1);
});
