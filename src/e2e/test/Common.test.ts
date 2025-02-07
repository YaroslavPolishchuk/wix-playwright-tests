import { test, expect } from "@playwright/test";
import { UserFactory } from "../factories/userFactory";
import { PageFactory } from "../factories/pageFactory";
import _ from "lodash";

test("Common functionality", async ({ page }) => {    

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

    await test.step("Order purchase", async () => {
        await cartPage.placeOrder(testUser);
        await cartPage.checkPurchase();        
        expect(await cartPage.checkPurchase());
    });
});

test("Re-Login with saving cart", async ({ page }) => {    

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

    await test.step("Re-log in as registered user", async () => {
        await homePage.logout();
        await homePage.login(testUser);
    });

    await test.step("Assert cart state (Products added)", async () => {
        await homePage.goToCart();
        const uiCart = await cartPage.getCart();
        const expectedItems = testUser.getItemsInCart();
        expect(_.isEqual(uiCart, expectedItems));
    });
});

