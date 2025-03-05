const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../utils/ApiUtils");

const loginPayLoad = {
  userEmail: "ala123sobhan+pw1@gmail.com",
  userPassword: "Ala123sobhan",
};
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

//create order is success
test("@Mock response for no order history", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );

  console.log(await page.locator(".mt-4").textContent());
  await expect(page.locator(".mt-4")).toHaveText(
    "You have No Orders to show at this time. Please Visit Back Us"
  );
});
