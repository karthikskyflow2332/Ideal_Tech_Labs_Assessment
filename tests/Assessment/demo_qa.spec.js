const{test,expect}=require('@playwright/test');

test("Demo QA Automation",async({page})=>{
    // Scenario :    
        // Navigate to the URL: https://demoqa.com/links
        // Handle Alerts, Frames & Windows scenarios
        // Click on Browser Windows
        // Open a new tab and verify
        // Switch back to the original tab and verify

        // Launch URL
        await page.goto("https://demoqa.com/links")
        
        // 1. Handling Alert
        await page.goto("https://demoqa.com/alerts");
       
        // simple alert
        await new Promise(async (resolve) => {
            page.once('dialog', async dialog => {
                console.log('Alert:', dialog.message());
                await dialog.accept();
                resolve();
            });
            await page.locator('#alertButton').click();
        });

        // timer alert
        await new Promise(async (resolve) => {
            page.once('dialog', async dialog => {
                console.log('Timer Alert:', dialog.message());
                await dialog.accept();
                resolve();
            });
            await page.locator('#timerAlertButton').click();
        });


        // confirm alert
        await new Promise(async (resolve) => {
            page.once('dialog', async dialog => {
                console.log('Confirm:', dialog.message());
                await dialog.accept();
                resolve();
            });
            await page.locator('#confirmButton').click();
        });


        // prompt alert
        await new Promise(async (resolve) => {
            page.once('dialog', async dialog => {
                console.log('Prompt:', dialog.message());
                await dialog.accept('Hello');
                resolve();
            });
            await page.locator('#promtButton').click();
        });


        // 2. Handling Frames
        await page.goto('https://demoqa.com/frames');

        const frame1 = page.frameLocator('#frame1');
        const frame1_text = await frame1.locator('h1').textContent();
        console.log('1st Frame Text: ', frame1_text);

        const frame2 = page.frameLocator('#frame2');
        const frame2_text = await frame2.locator('h1').textContent();
        console.log('2nd Frame Text: ', frame2_text);
        
        // 3. Handling Windows
        await page.goto("https://demoqa.com/browser-windows");
        
        // New Tab
        await page.locator("#tabButton").click();
        const new_tab = await page.context().waitForEvent('page');
        await new_tab.waitForLoadState();
        console.log('New Tab URL:', new_tab.url());
        await new_tab.close();

        // New Window
        await page.locator("#windowButton").click();
        const new_window = await page.context().waitForEvent('page');
        await new_window.waitForLoadState();
        console.log('New Window URL:', new_window.url());
        await new_window.close();
});
