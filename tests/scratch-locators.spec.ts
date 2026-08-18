import { test } from "@playwright/test";

test("explore role-based locators", async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    const usernameByRole = page.getByRole('textbox', { name: 'Username'});
    console.log("Found by role: ", await usernameByRole.count());

    const loginText = page.getByText('Swag Labs');
    console.log("Found by text: ", await loginText.count());

    const usernameByPlaceholder = page.getByPlaceholder('Username');
    console.log("Found by placeholder: ", await usernameByPlaceholder.count());
})