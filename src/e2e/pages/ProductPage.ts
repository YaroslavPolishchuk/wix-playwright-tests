import { Page } from "playwright-core";
import { BasePage } from "../base/BasePage";

import { User } from "../models/User";
import { ProductPageElements } from "./elements/ProductPageElements";



export class ProductPage extends BasePage {
    private elements = ProductPageElements;

    constructor(page: Page) {
        super(page);
    }

    async addToCart(user:User){
        let productName=await (await this.element(this.elements.productNameTxt)).innerText();        
        await (await this.element(this.elements.addCartBtn)).click();
        await this.waitForDialog();        
        user.addToCart(productName);
        await this.goToHome();
    }
}