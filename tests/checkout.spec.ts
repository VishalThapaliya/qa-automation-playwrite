import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("should complete a checkout successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await checkoutPage.addBackpackToCart();
    await checkoutPage.goToCart();
    await checkoutPage.startCheckout();
    await checkoutPage.getBuyerInformation('Bishal', 'Thapaliya', '38000');
    await checkoutPage.finishCheckout();
    
    const confirmationText = await checkoutPage.getConfirmationText();
    expect(confirmationText).toContain('Thank you');
});