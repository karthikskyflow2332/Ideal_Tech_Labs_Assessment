const{test,expect}=require('@playwright/test');

import { LoginPage_orangehrm } from '../../Pages (pom)/Login_page';
import { AdminPage_orangehrm } from '../../Pages (pom)/Admin_Page';

test("OrangeHRM_using POM ",async({page})=>{

    test.setTimeout(1200000);

    const username = 'Admin';
    const password = 'admin123';

    const new_username = 'idealtechlabs123';
    const new_password = 'ideal@12345';
    const updated_username = 'updateduserideal123';

   // Login
    const login = new LoginPage_orangehrm(page);
    await login.launch_login_page();
    await login.login('Admin','admin123');
    await page.waitForTimeout(1500);

   // Admin page
    const admin = new AdminPage_orangehrm(page);
    await admin.navigate_To_Admin();
    await admin.create_User("Admin","Peter Mac Anderson","Enabled",new_username,new_password);
    
    await admin.search_User(new_username);
    await admin.verify_User_Exists(new_username);
    await admin.edit_User(new_username, updated_username);

    await admin.verify_User_Exists(updated_username);
    await admin.delete_User(updated_username);
    await admin.verify_User_Deleted(updated_username);

   
    await page.waitForTimeout(2500);

})