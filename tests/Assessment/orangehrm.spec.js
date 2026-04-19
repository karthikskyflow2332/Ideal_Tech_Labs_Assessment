const{test,expect}=require('@playwright/test');

test("OrangeHRM",async({page})=>{

  test.setTimeout(60000);
  // Navigate to the URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  // Login to the application
  // Navigate to the Admin menu
  // Create a new user and verify creation
  // Search for the created user and perform edit operation
  // Delete the user and verify deletion
      
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const username = 'Admin';
  const password = 'admin123';

  const new_username = 'idealtechlabs123';
  const new_password = 'ideal@12345';

  // Login
  await page.goto(url);
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.click('button[type="submit"]');

  // Verify Homepage
  await expect(page.locator('//h6[contains(@class,"oxd-text oxd-text--h6 ")]')).toHaveText('Dashboard');

  // Navigate to Admin menu
  await page.click('//span[text()="Admin"]');

  // Create a new user
  await page.click('//button[normalize-space()="Add"]');
  // 1. user role  
  await page.click('(//div[contains(@class,"oxd-select-text")])[1]');
  await page.click('(//span[text()="Admin"])[2]'); 

  // 2. Employee name
  await page.fill('input[placeholder="Type for hints..."]', 'Peter Mac Anderson'); 
  await page.waitForTimeout(2000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  // 3. Status
  await page.locator('(//div[contains(@class,"oxd-select-text")])[4]').click();
  await page.getByRole('option', { name: 'Enabled' }).click();

  // 4. Username 
  await page.locator('form input').nth(1).fill(new_username);

  // 5. password
  await page.fill('(//input[@type="password"])[1]', new_password);
  await page.fill('(//input[@type="password"])[2]', new_password);

  await page.click('//button[normalize-space()="Save"]');

  // Verify User Creation
  await page.locator('(//input[@class="oxd-input oxd-input--active"])[2]').fill(new_username);
  await page.click('(//button[contains(@class,"oxd-button oxd-button--medium")])[2]');

  console.log("Search button clicked")

  const userRow = page.locator(`//div[text()='${new_username}']`);
  //await expect(userRow).toBeVisible();

  // Edit User
  await page.click(`//div[text()='${new_username}']/ancestor::div[@role='row']//i[contains(@class,'bi-pencil-fill')]`);

  await page.waitForTimeout(2500);

  // Change Username
  const update_username = 'updateduserideal123';
  await page.fill('(//input[@class="oxd-input oxd-input--active"])[2]', update_username);
  await page.click('button:has-text("Save")');

  await page.waitForTimeout(2500);

  // Verify Updated User
  await page.fill('(//input[@class="oxd-input oxd-input--active"])[2]', update_username);
  await page.click('button:has-text("Search")');
  await expect(page.locator(`//div[text()='${update_username}']`)).toBeVisible();

  // Delete User
  await page.click(`//div[text()='${update_username}']/ancestor::div[@role='row']//i[contains(@class,'bi-trash')]`);
  await page.click('button:has-text("Yes, Delete")');
  
  await page.waitForTimeout(2500);

  // Verify Deletion
  await page.fill('(//input[@class="oxd-input oxd-input--active"])[2]', update_username);
  await page.click('button:has-text("Search")');

  const no_records = page.locator('span:has-text("No Records Found")');
  await expect(no_records).toBeVisible();

  await page.waitForTimeout(2500);

})