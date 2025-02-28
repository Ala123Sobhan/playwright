const { test, expect } = require('@playwright/test');
  
 
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "ala123sobhan+pw1@gmail.com";
   const pass = "Ala123sobhan";
   const productName = 'Zara'.toUpperCase();
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await expect(page).toHaveTitle("Let's Shop");
   console.log(await page.locator(".login-title").textContent());

   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill(pass);
   await page.locator("[value='Login']").click();
   await expect(page.locator("//div[@aria-label='Login Successfully']")).toContainText("Login Successfully");

   //await page.waitForLoadState('networkidle');

   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 

   const zaraLocator = await page.locator(".card-body b").nth(0);
   await expect(zaraLocator).toContainText(productName);
   


 
})