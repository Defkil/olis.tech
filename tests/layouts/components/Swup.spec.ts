import { expect, test } from "@playwright/test";

test("swup will change the content at #swup", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click("text=Impressum");
  await page.waitForTimeout(1000);
  const content = await page.$eval("main", (el) => el.textContent);
  expect(content).toContain("Impressum");
});

test("swup will scroll down after changing the page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click(".js--posts>a:first-child");
  await page.waitForTimeout(1000);
  await expect(page.locator("main")).toBeInViewport();
});
