import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test123@gmail.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerDay"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Business").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [ 
    path.join(__dirname, "files", "1.jpeg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
  
    await expect(page.getByText("Astara Resorts")).toBeVisible();
    await expect(page.getByText("Contrary to popular belief, Lorem Ipsum")).toBeVisible();
    await expect(page.getByText("Pune, India")).toBeVisible();
    await expect(page.getByText("Business")).toBeVisible();
    await expect(page.getByText("₹2500 per day")).toBeVisible();
    await expect(page.getByText("1 adults, 1 children")).toBeVisible();
    await expect(page.getByText("4 Star Rating")).toBeVisible();
  
    await expect(
      page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  });
  
  test("should edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
  
    await page.getByRole("link", { name: "View Details" }).first().click();
  
    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue("Astara Resorts ");
    await page.locator('[name="name"]').fill("Astara Resorts UPDATED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
  
    await page.reload();
  
    await expect(page.locator('[name="name"]')).toHaveValue(
      "Astara Resorts UPDATED"
    );
    await page.locator('[name="name"]').fill("Astara Resorts");
    await page.getByRole("button", { name: "Save" }).click();
  });