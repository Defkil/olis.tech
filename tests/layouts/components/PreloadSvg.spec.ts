import { expect, test } from "@playwright/test";

test("svg with height=0,width=0 with patern and symbol should exist", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const preloadSvg = (await page.$("svg"))!;
  expect(preloadSvg).toBeTruthy();
  const preloadSvgHeight = await preloadSvg.getAttribute("height");
  expect(preloadSvgHeight).toBe("0");
  const preloadSvgWidth = await preloadSvg.getAttribute("width");
  expect(preloadSvgWidth).toBe("0");
  const preloadSvgPatern = await page.$("svg > pattern");
  expect(preloadSvgPatern).toBeTruthy();
  const preloadSvgSymbol = await page.$("svg > symbol");
  expect(preloadSvgSymbol).toBeTruthy();
});
