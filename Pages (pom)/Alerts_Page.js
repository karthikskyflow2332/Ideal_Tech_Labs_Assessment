class AlertsPage {

    constructor(page) {
        this.page = page;

        this.url = "https://demoqa.com/alerts";

        this.simple_alert_btn = '#alertButton';
        this.timer_alert_btn = '#timerAlertButton';
        this.confirm_alert_btn = '#confirmButton';
        this.prompt_alert_btn = '#promtButton';
    }

    async launch_Url_Alert() {
        await this.page.goto(this.url);
    }

    async handle_Simple_Alert() {
        await new Promise(async (resolve) => {
            await this.page.once('dialog', async dialog => {
                console.log('Simple Alert:', dialog.message());
                await dialog.accept();
                resolve();
            });

        await this.page.click(this.simple_alert_btn);
         });
    }

    async handle_Timer_Alert() {
        await new Promise(async (resolve) => {
            await this.page.once('dialog', async dialog => {
                console.log('Timer Alert:', dialog.message());
                await dialog.accept();
                resolve();
            });

            await this.page.click(this.timer_alert_btn);
        });
    }

    async handle_Confirm_Alert() {
        await new Promise(async (resolve) => {
            await this.page.once('dialog', async dialog => {
                console.log('Confirm Alert:', dialog.message());
                await dialog.accept();
                resolve();
            });

            await this.page.click(this.confirm_alert_btn);
        });
    }

    async handle_Prompt_Alert(text) {
        await new Promise(async (resolve) => {
            await this.page.once('dialog', async dialog => {
                console.log('Prompt Alert:', dialog.message());
                await dialog.accept(text);
                resolve();
            });

            await this.page.click(this.prompt_alert_btn);
        });
    }
}

module.exports = { AlertsPage };