import { Page } from "playwright-core";
import { BasePage } from "../base/BasePage";
import { User } from "../models/User";
import { HomePageElements } from "./elements/HomePageElements";


export class HomePage extends BasePage {
    private elements = HomePageElements;

    constructor(page: Page) {
        super(page);
    }

    async signUp(user: User): Promise<void> {
        await (await this.element(this.elements.signUpBtn)).click();
        await this.fillText(this.elements.loginFldReg, user.getName());
        await this.fillText(this.elements.passFldReg, user.getPassword());
        await (await this.element(this.elements.signUpModal)).click();
        await this.waitForDialog();
    }

    async login(user: User): Promise<void> {
        await (await this.element(this.elements.loginBtn)).click();
        await this.fillText(this.elements.loginFld, user.getName());
        await this.fillText(this.elements.passFld, user.getPassword());        
        await (await this.element(this.elements.logInModal)).click();        
    }
    async logout(): Promise<void> {
        await (await this.element(this.elements.logOut)).click();
        
        
    }

    async selectRandomProduct():Promise<void>{                    
        let productsOnPage =await (await this.element(this.elements.product)).all();                
       await productsOnPage[Math.floor(Math.random()*productsOnPage.length)].click();       
    }

    async successfullSignUp(): Promise<boolean> {
        let message;
        this.page.on('dialog', async dialog => {
            message = dialog.message();
            dialog.accept();
        });
        return message == "" ? true : false;
    }

    async goToCart():Promise<void>{
        (await this.element(this.elements.cartBtn)).click();
    }
}
