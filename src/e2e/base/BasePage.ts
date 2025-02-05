import { Page, Locator, expect } from '@playwright/test'

export abstract class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;        
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url,{waitUntil:'domcontentloaded'});
    }

    async element(xpath: string): Promise<Locator> {
        const element = this.page.locator(xpath).first();
        await element.waitFor({ state: 'attached' });        
        return element;
    }

    async fillText(xpath: string, content: string): Promise<void> {
        await this.page.locator(xpath).fill(content);
    }

    async goToHome(): Promise<void> {
        await (await this.element("//*[contains(text(),'Home')]")).click();
    }

    async waitForDialog(): Promise<void> {
         const dialog=await this.page.waitForEvent('dialog');
         await dialog.accept();         
    }
}