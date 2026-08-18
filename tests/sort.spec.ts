import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// Locators
//   data-test="product-sort-container"
//   data-test="inventory-item-price"
//    data-test="inventory-item-name"

test('should sort products from low to high correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numbericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numbericPrices].sort((a, b ) => a - b);

    expect(sortedPrices).toEqual(numbericPrices);
});

test('should sort products by name from Z to A correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const items = await page.locator('data-test="inventory-item-name"').allTextContents();
    const sortedItems = [...items].sort().reverse();

    expect(sortedItems).toEqual(items);
});