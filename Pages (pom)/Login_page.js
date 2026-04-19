
exports.LoginPage_orangehrm=
class LoginPage_orangehrm{

    constructor(page){
        this.page = page;
        //this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
        this.username = 'input[name="username"]';
        this.password = 'input[name="password"]';
        this.login_Button = 'button[type="submit"]';
    }

    async launch_login_page(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',{ waitUntil: 'domcontentloaded' });
    }

    async login(username,password){
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.page.click(this.login_Button);
    }

}