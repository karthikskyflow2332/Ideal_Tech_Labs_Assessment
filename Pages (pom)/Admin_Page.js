
const { expect } = require('@playwright/test');
class AdminPage_orangehrm {
   
    constructor(page) {
        this.page = page;
        this.admin_menu = '//span[text()="Admin"]';
        this.search_username = '(//input[@class="oxd-input oxd-input--active"])[2]';
        this.search_btn = '(//button[contains(@class,"oxd-button oxd-button--medium")])[2]';

        // User
        this.add_btn = '//button[normalize-space()="Add"]';
        this.user_role_dropdown = '(//div[contains(@class,"oxd-select-text")])[1]';
        this.admin_option = '(//span[text()="Admin"])[2]';
        this.employee_name = 'input[placeholder="Type for hints..."]';
        this.status_dropdown = '(//div[contains(@class,"oxd-select-text")])[4]';
        this.enabled_option = 'text=Enabled';

        this.username_input = 'form input';
        this.password_input = '(//input[@type="password"])[1]';
        this.confirm_password_input = '(//input[@type="password"])[2]';
        this.save_btn = '//button[normalize-space()="Save"]';

        this.no_records = 'span:has-text("No Records Found")';
    }

    async navigate_To_Admin() {
        await this.page.click(this.admin_menu);
    }

    // create user
    async create_User(userRole, empName, status, username, password) {

        await this.page.click(this.add_btn);

        // 1. User Role
        await this.page.click(this.user_role_dropdown);
        await this.page.click(`//span[text()="${userRole}"]`);

        // 2. Employee Name
        await this.page.fill(this.employee_name, empName);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        // 3. Status
        await this.page.click(this.status_dropdown);
        await this.page.click(`text=${status}`);

        // 4. Username
        await this.page.locator(this.username_input).nth(1).fill(username);

        // 5. Password
        await this.page.fill(this.password_input, password);
        await this.page.fill(this.confirm_password_input, password);

        // Save
        await this.page.click(this.save_btn);
    }

    async search_User(username) {
        await this.page.fill(this.search_username, username);
        await this.page.click(this.search_btn);
    }

    async verify_User_Exists(username) {
        const user = this.page.locator(`//div[text()='${username}']`);
        // await expect(user).toBeVisible();
    }

    async edit_User(oldUsername, newUsername) {

        await this.page.click(
            `//div[text()='${oldUsername}']/ancestor::div[@role='row']//i[contains(@class,'bi-pencil-fill')]`
        );

        await this.page.fill(this.search_username, newUsername);

        await this.page.click('//button[normalize-space()="Save"]');
    }

    async delete_User(username) {

        await this.page.click(
            `//div[text()='${username}']/ancestor::div[@role='row']//i[contains(@class,"bi-trash")]`
        );

        await this.page.click('button:has-text("Yes, Delete")');
    }

    async verify_User_Deleted(username) {

        await this.page.fill(this.search_username, username);
        await this.page.click(this.search_btn);

        await expect(this.page.locator(this.no_records)).toBeVisible();
    }
}

module.exports = { AdminPage_orangehrm };