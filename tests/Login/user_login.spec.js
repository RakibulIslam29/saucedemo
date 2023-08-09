// @ts-check
const { test, expect, chromium } = require('@playwright/test');

let browser;

test.beforeEach(async ({ page }, testInfo) => {

    testInfo.setTimeout(testInfo.timeout + 100000);

    //force a logout before going to sign in page
    await page.goto('https://www.saucedemo.com/');

});

test.beforeAll( async () =>{

    browser = await chromium.launch();

});

test.afterAll( async () =>{

    await browser.close();

});


test.describe('Does the page load and display all items?', () => {
    
    test('Does the page load and display all items? ', async ({ page }) => {

        const logo = page.getByText('Swag Labs');
        await expect(logo).toBeVisible();

        const AcceptedUsername = page.getByRole('heading', {name: 'Accepted usernames are:'});
        await expect(AcceptedUsername).toBeVisible();

        const userperformance = page.getByText('Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitc');
        await expect(userperformance).toBeVisible();

        const Password = page.getByText('Password for all users:secret_sauce')
        await expect(Password).toBeVisible();

    });

    test('Is it possible to submit empty form?', async ({ page }) => {

        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="login-button"]').click(); // Click Login Button
        await page.locator('[data-test="error"]').isVisible(); // wrong notification

    });

    test('Login with wrong credentials possible?', async ({ page }) =>{

        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('rakib03029'); // Wrong username
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('03029'); // Wrong Password

        await page.locator('[data-test="login-button"]').click(); 
        await page.locator('[data-test="error"]').isVisible(); // wrong notification

    });

    test('Login with valid username & password', async({ page }) =>{

        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user'); // Valid Username
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce'); // valid password

        await page.locator('[data-test="login-button"]').click();

        // Verify Successfully login
        await page.getByText('Swag Labs').isVisible();
        await page.getByText('Products').isVisible();
        
    });
    
});
 