import puppeteer from "puppeteer";


export async function getImage(id: string): Promise<string> {
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-web-security',
            '--disable-setuid-sandbox'
        ],
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });
    const page = await browser.newPage();

    await page.goto(`http://localhost:5000/${id}`);
    try {
        await Promise.race([
            page.waitForSelector(".highcharts-container", {
                visible: true,
                timeout: 20000,
            }),
            page.waitForSelector("#error-container", {
                visible: true,
                timeout: 20000,
            }),
            page.waitForSelector(".tablescrollbox", {
                visible: true,
                timeout: 20000,
            }),

            page.waitForSelector('[data-test="visualization-container"]', {
                visible: true,
                timeout: 20000,
            }),
        ]);
        await new Promise((r) => setTimeout(r, 2000)); //Due to highchart animation
        const imageBuffer = (await page?.screenshot({
            type: "jpeg",
            quality: 100,
            fullPage: true,
            captureBeyondViewport: false,
            fromSurface: true,
        })) as Buffer;
        await browser.close();
        if (imageBuffer) {
            return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
        }
    } catch (e) {
        const imageBuffer = await page?.screenshot() as Buffer;
        await browser.close();
        if (imageBuffer) {
            return `data:image/png;base64,${imageBuffer.toString('base64')}`;
        }
    }
    return '';
}
