const { test } = require('@playwright/test');

import { AlertsPage } from '../../Pages (pom)/Alerts_page';
import { FramesPage } from '../../Pages (pom)/Frames_Page';
import { WindowsPage } from '../../Pages (pom)/Windows_page';

test("Demo QA Automation using POM", async ({ page }) => {

    //test.setTimeout(60000);

    // Alerts
    const alerts = new AlertsPage(page);
    await alerts.launch_Url_Alert();

    await alerts.handle_Simple_Alert();
    await page.waitForTimeout(5000);
    await alerts.handle_Timer_Alert();
    await alerts.handle_Confirm_Alert();
    await alerts.handle_Prompt_Alert("Hello");

    // Frames
    const frames = new FramesPage(page);
    await frames.launch_Url_Frames();

    const frame1_Text = await frames.getFrameText('#frame1');
    console.log("1st Frame Text:", frame1_Text);

    const frame2_Text = await frames.getFrameText('#frame2');
    console.log("2nd Frame Text:", frame2_Text);

    // Windows
    const windows = new WindowsPage(page);
    await windows.launch_Url_Window();
    await windows.open_New_Tab();
    await windows.open_New_Window();

});