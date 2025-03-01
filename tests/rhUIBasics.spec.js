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

test('UI Controls', async ({page}) =>{

    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select[class='form-control']");
    await dropdown.selectOption("consult");

    const radioBtn = page.locator(".radiotextsty").nth(1);
    await radioBtn.click();
    await expect(radioBtn).toBeChecked();

    await page.locator("#okayBtn").click();
    await page.pause();
    
    const checkBox = page.locator("#terms");
    await checkBox.click();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

})

test.only("child window", async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    // Wait for the new page event
    const newPagePromise = context.waitForEvent("page");
   // Click the link
    await documentLink.click();

// Get the new page reference
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();


   
// Now, newPage is a proper Page object, and you can use .locator()
    const text = await newPage.locator(".im-para.red").textContent();
    const domain = text.split("@")[1].split(" ")[0];
    console.log(text.split("@")[1].split(" ")[0]);

    await page.bringToFront(); 
    console.log(await page.locator("label[for='username']").isVisible());    
    await page.locator("input[name='username']").fill(domain);









})