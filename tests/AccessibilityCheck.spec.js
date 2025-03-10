import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test("accessibility check", async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client");
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]); 

});