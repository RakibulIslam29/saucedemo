// @ts-check
const { test, expect, chromium } = require('@playwright/test');

let browser;

test.beforeEach(async ({ page }, testInfo) => {

    testInfo.setTimeout(testInfo.timeout + 100000);

    await page.goto('https://www.saucedemo.com/');

    await page
        .locator('[data-test="username"]')
        .fill('standard_user');
    await page
        .locator('[data-test="password"]')
        .fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

    await Promise.all([

        page.waitForNavigation({ waitUntil: 'networkidle' })
  
    ]);

});

test.beforeAll( async () =>{

    browser = await chromium.launch();

});

test.afterAll( async () =>{

    await browser.close();

});


test.describe('Does the page load and display all items?', () => {
    
    test(' Verify All items ', async ({ page }) => {

        await page.getByText('Swag Labs').isVisible();
        await page.getByText('Products').isVisible();

        // Verify Sauce Labs Backpack product
        await page.locator('#item_4_title_link').isVisible();
        await page.getByRole('img', { name: 'Sauce Labs Backpack' }).isVisible();
        await page.getByText('Sauce Labs Backpack').isVisible();
        await page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromis').isVisible();
        await page.getByText('$29.99').isVisible();

        // Verify Sauce Labs Bike Light Product
        await page.locator('a[id="item_0_title_link"] div[class="inventory_item_name"]').isVisible();
        await page.locator('img[alt="Sauce Labs Bike Light"]').isVisible();
        await page.getByText('A red light isn\'t the desired state in testing but it sure helps when riding you').isVisible();
        await page.getByText('$9.99').isVisible();

        // Verify Sauce Labs Bolt T-Shirt Product
        await page.locator('a[id="item_1_title_link"] div[class="inventory_item_name"]').isVisible();
        await page.locator('img[alt="Sauce Labs Bolt T-Shirt"]').isVisible();
        await page.getByText('Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Ap').isVisible();
        await page
            .getByText('$15.99')
            .first()
            .isVisible();

        // verfy Sauce Labs Fleece Jacket product
        await page.locator('a[id="item_5_title_link"] div[class="inventory_item_name"]').isVisible();
        await page.locator('img[alt="Sauce Labs Fleece Jacket"]').isVisible();
        await page.getByText('It\'s not every day that you come across a midweight quarter-zip fleece jacket ca').isVisible();
        await page.getByText('$49.99').isVisible();

        // Verify Sauce Labs Onesie Product
        await  page.locator('a[id="item_2_title_link"] div[class="inventory_item_name"]').isVisible();
        await page.locator('img[alt="Sauce Labs Onesie"]').isVisible();
        await page.getByText('Rib snap infant onesie for the junior automation engineer in development. Reinfo').isVisible();
        await page.getByText('$7.99').isVisible();

        // Verify
        await page.locator('a[id="item_3_title_link"] div[class="inventory_item_name"]').isVisible();
        await page.locator('img[alt="Test.allTheThings() T-Shirt (Red)"]').isVisible();
        await page.getByText('This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keybo').isVisible();
        await page
            .getByText('$15.99')
            .nth(1)
            .isVisible();

    });
    
});
 