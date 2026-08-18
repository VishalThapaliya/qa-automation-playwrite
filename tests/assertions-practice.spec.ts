import { test, expect } from "@playwright/test";

test("explore common assertions", async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
    await expect(page.locator('.login_logo')).toContainText('Swag');

    await expect(page.locator('#login-button')).toBeVisible();
    await expect(page.locator('#login-button')).toBeEnabled();

    await expect(page.locator('.error-button')).toHaveCount(0);

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await expect(page.locator('.shopping_cart_link')).toHaveAttribute('data-test', 'shopping-cart-link');
});