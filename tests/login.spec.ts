import { expect, test } from "@playwright/test"

test("should login successfully with the valid credentials", async ({ page }) => {
    await page.goto('/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);
});