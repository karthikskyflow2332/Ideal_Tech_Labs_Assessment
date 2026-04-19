class FramesPage {

    constructor(page) {
        this.page = page;
        this.url = "https://demoqa.com/frames";
    }

    async launch_Url_Frames() {
        await this.page.goto(this.url);
    }

    async get_Frame_Text(frameId) {
        const frame = this.page.frameLocator(frameId);
        return await frame.locator('h1').textContent();
    }
}

module.exports = { FramesPage };