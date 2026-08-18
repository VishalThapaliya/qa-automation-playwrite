import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    private addBackpackButton: Locator;
    private cartIcon: Locator;
    private checkoutButton: Locator;
    private firstnameInput: Locator;
    private lastnameInput: Locator;
    private zipInput: Locator;
    private continueButton: Locator;
    private finishButton: Locator;
    private confirmationHeader: Locator;


    constructor(page: Page) {
        this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstnameInput = page.locator('[data-test="firstName"]');
        this.lastnameInput = page.locator('[data-test="lastName"]');
        this.zipInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationHeader = page.locator('[data-test="complete-header"]');
    }

    async addBackpackToCart(): Promise<void> {
        await this.addBackpackButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async startCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async getBuyerInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstnameInput.fill(firstName);
        await this.lastnameInput.fill(lastName);
        await this.zipInput.fill(zipCode);
        await this.continueButton.click();
    }

    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }

    async getConfirmationText(): Promise<string> {
        return await this.confirmationHeader.textContent() ?? '';
    }
}