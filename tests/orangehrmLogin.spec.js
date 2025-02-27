// @ts-check
import { test, expect } from '@playwright/test';


const testData = [

    {
     "username": "Admin", 
     "password": "admin123", 
     "status": "valid"
    },

    {
        "username": "Admin", 
        "password": "admin", 
        "status": "invalid"
    },

    {
        "username": "Admin1", 
        "password": "admin123", 
        "status": "invalid"
    },
  
    {
        "username": "Admin1", 
        "password": "admin1", 
        "status": "invalid"
    }

]


testData.forEach((data, index) =>{

    test(`Verify login feature for organgeHrm for ${index+1}`, async({page}) => {

        await page.goto("/web/index.php/auth/login");
        await page.locator("//input[@placeholder='Username']").fill(data.username);
        await page.locator("input[type='password']").fill(data.password);
        await page.locator("button[type='submit']").click();
        data.status === "valid" ? 
        await expect(page).toHaveURL("/web/index.php/dashboard/index")
        : await expect(page.locator("//p[text()='Invalid credentials']")).toBeVisible();



    })


})



// test('Verify login with vaid credentials', async ({ page }) => {

//   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  
//   await page.locator("//input[@placeholder='Username']").fill("Admin");

//   await page.locator("input[type='password']").fill("admin123");

//   await page.locator("button[type='submit']").click()

//   await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")


// })


// test('Verify login with vaid username and Invalid password', async ({ page }) => {


//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
//     await page.locator("//input[@placeholder='Username']").fill("Admin")
  
//     await page.locator("input[type='password']").fill("gfrjgvbfh")
  
//     await page.locator("button[type='submit']").click()
  
//     await expect(page.locator("//p[text()='Invalid credentials']")).toBeVisible()
  
//   })

//   test('Verify login with invaid username and valid password', async ({ page }) => {


//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
//     await page.locator("//input[@placeholder='Username']").fill("sdvdsv")
  
//     await page.locator("input[type='password']").fill("admin123")
  
//     await page.locator("button[type='submit']").click()
  
//     await expect(page.locator("//p[text()='Invalid credentials']")).toBeVisible()
  
//   })


//   test('Verify login with invaid username and invalid password', async ({ page }) => {


//     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
//     await page.locator("//input[@placeholder='Username']").fill("sdvdsv")
  
//     await page.locator("input[type='password']").fill("fbghdb")
  
//     await page.locator("button[type='submit']").click()
  
//     await expect(page.locator("//p[text()='Invalid credentials']")).toBeVisible()
  
//   })


