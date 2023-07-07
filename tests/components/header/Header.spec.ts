import { expect, test } from "@playwright/test";

test("input click should open search", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const input = page.locator(".header input");
  await input.click();
  await page.waitForTimeout(100);
  const modal = page.locator(".DocSearch-Modal");
  await expect(modal).toBeVisible();
});

test("input text should open search and delete input", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const input = page.locator(".header input");
  await input.type("a");
  await page.waitForTimeout(100);
  const modal = page.locator(".DocSearch-Modal");
  await expect(modal).toBeVisible();
  const inputText = await input.inputValue();
  expect(inputText).toBe("");
});
