const { test, expect } = require("@playwright/test");

test("@Web Client App login", async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "ala123sobhan+pw1@gmail.com";
  const pass = "Ala123sobhan";
  const productName = "Zara".toUpperCase();
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(page).toHaveTitle("Let's Shop");
  console.log(await page.locator(".login-title").textContent());

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(pass);
  await page.locator("[value='Login']").click();
  await expect(
    page.locator("//div[@aria-label='Login Successfully']")
  ).toContainText("Login Successfully");

  //await page.waitForLoadState('networkidle');

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const zaraLocator = await page.locator(".card-body b").nth(0);
  await expect(zaraLocator).toContainText(productName);
});

test("UI Controls", async ({ page }) => {
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
});

test("child window", async ({ browser }) => {
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
});

test("e2e ecommerce flow", async ({ page }) => {
  const email = "ala123sobhan+pw1@gmail.com";
  const pass = "Ala123sobhan";
  const productName = "ZARA COAT 3";
  const country = "India";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(pass);
  await page.locator("[value='Login']").click();
  await expect(
    page.locator("//div[@aria-label='Login Successfully']")
  ).toBeVisible();

  const products = page.locator(".card-body");
  await products.first().waitFor();
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  //await page.waitForLoadState('networkidle');
  await page
    .locator("button[class='btn btn-custom'] label")
    .waitFor({ state: "visible" });
  await page.locator("button[routerlink='/dashboard/cart']").click();
  await page
    .locator("div[class='cartSection'] h3")
    .waitFor({ state: "visible" });

  const total = await page
    .locator(".totalRow span:nth-child(2)")
    .nth(1)
    .textContent();
  await page.locator(".totalRow button[type='button']").click();

  expect(await page.locator("label[type='text']").textContent()).toEqual(email);

  await page
    .locator("input[placeholder='Select Country']")
    .pressSequentially("Ind");
  await page.locator(".ta-results").waitFor({ state: "visible" });

  const dropdown = page.locator(".ta-results");
  const btnCount = await dropdown.locator("button").count();

  for (let i = 0; i < btnCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === country) {
      console.log(text);
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await page.locator(".input.ddl").nth(0).selectOption("06");
  await page.locator(".input.ddl").nth(1).selectOption("30");

  await page.locator(".btnn.action__submit.ng-star-inserted").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  console.log(
    total +
      "," +
      (await page
        .locator("td[class='line-item product-info-column'] div[class='title']")
        .textContent())
  );
  let actualPrice = await page
    .locator("td[class='line-item product-info-column'] div[class='title']")
    .textContent();
  actualPrice = actualPrice?.replace(/\s+/g, "");
  await expect(actualPrice).toEqual(total);
});
