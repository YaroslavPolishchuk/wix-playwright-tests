import { Page } from "playwright-core";
import { BasePage } from "../base/BasePage";
import { CartPageElements } from "./elements/CartPageElements";
import { User } from "../models/User";

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

    async placeOrder(user:User):Promise<void>{
        await (await this.element(this.elements.placeOrderBtn)).click();
        await this.fillPlaceOrder(user);
        await (await this.element(this.elements.purchaseBtn)).click();
    }

    async fillPlaceOrder(user:User):Promise<void>{
        await this.fillText(this.elements.nameFld,user.getName());
        await this.fillText(this.elements.countryFld,user.country);
        await this.fillText(this.elements.cityFld,user.city);
        await this.fillText(this.elements.cardFld,user.creditcard);
        await this.fillText(this.elements.monthFld,user.month);
        await this.fillText(this.elements.yearFld,user.year.toString());
    }    

    async checkPurchase():Promise<boolean>{
        let thankCard=await this.element(this.elements.thankfullBlock);
        return await thankCard.isVisible();
    }
}
