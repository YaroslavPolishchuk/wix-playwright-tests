import { test, expect } from "@playwright/test";
import { PageFactory } from "../factories/pageFactory";
import { UserFactory } from "../factories/userFactory";
import _ from "lodash";

test("Successful Sign-Up", async ({ page }) => {    

    //pages init
    const testUser = UserFactory.getUser()
    const homePage = PageFactory.getHomePage(page);
    const productPage = PageFactory.getProductPage(page);
    const cartPage = PageFactory.getCartPage(page);

    await homePage.navigateTo("https://www.demoblaze.com");

    await test.step("Sign up as a new user", async () => {
        await homePage.signUp(testUser);
    });

    await test.step("Log in as registered user", async () => {
        await homePage.login(testUser);
    });

    await test.step("Fill cart with some products", async () => {
        await homePage.selectRandomProduct();
        await productPage.addToCart(testUser);
        await homePage.selectRandomProduct();
        await productPage.addToCart(testUser);
    });

    await test.step("Assert cart state (Products added)", async () => {
        await homePage.goToCart();
        const uiCart = await cartPage.getCart();
        const expectedItems = testUser.getItemsInCart();
        expect(_.isEqual(uiCart, expectedItems));
    });
});

