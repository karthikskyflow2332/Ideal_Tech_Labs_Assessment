class WindowsPage {

    constructor(page) {
        this.page = page;
        this.url = "https://demoqa.com/browser-windows";

        this.tab_button = "#tabButton";
        this.window_button = "#windowButton";
    }

    async launch_Url_Window() {
        await this.page.goto(this.url);
    }

    async open_New_Tab() {
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(this.tab_button)
        ]);

        await newTab.waitForLoadState();
        console.log("New Tab URL:", newTab.url());

        await newTab.close();
    }

    async open_New_Window() {
        const [newWindow] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click(this.window_button)
        ]);

        await newWindow.waitForLoadState();
        console.log("New Window URL:", newWindow.url());

        await newWindow.close();
    }
}

module.exports = { WindowsPage };