import { Page } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

export class PageFactory {
    static getHomePage(page: Page): HomePage {
        return new HomePage(page);
    }
    static getProductPage(page: Page): ProductPage {
        return new ProductPage(page);
    }
    static getCartPage(page: Page): CartPage {
        return new CartPage(page);
    }
}