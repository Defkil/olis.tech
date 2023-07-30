import { expect, test } from "@playwright/test";
import { categories } from "../../../src/const/categories";

test("Rendering Categories Buttons", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("header-categories");
  const categoriesData = categories;

  const buttons = await page.$$("button.js--category-button");
  expect(buttons.length).toBe(categoriesData.length);

  for (let i = 0; i < categoriesData.length; i++) {
    const button = buttons[i];
    const category = categoriesData[i];
    const text = await button!.innerText();
    expect(text).toBe(category?.title);
  }
});
