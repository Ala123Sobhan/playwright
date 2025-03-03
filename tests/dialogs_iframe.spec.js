import { test, expect } from "@playwright/test";

test("dialog accept or dismiss", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    

})

test("handle iframe", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck);    

})


