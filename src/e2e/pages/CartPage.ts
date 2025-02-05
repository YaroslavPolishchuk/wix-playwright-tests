import { Page } from "playwright-core";
import { BasePage } from "../base/BasePage";
import { CartPageElements } from "./elements/CartPageElements";

export class CartPage extends BasePage {
    private elements = CartPageElements;

    constructor(page: Page) {
        super(page);
    }

    async getCart(): Promise<Array<string>> {
        let cartItems = await (await this.element(this.elements.cartRow)).all();
        const cartItemsNames = await Promise.all(cartItems.map(async x=>await x.locator("td:nth-child(2)").innerText()));
        return cartItemsNames;
    }
}
