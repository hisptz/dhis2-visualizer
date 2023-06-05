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
    await Promise.race([
        page.waitForSelector(".highcharts-container", {visible: true, timeout: 20000}),
        page.waitForSelector('.tablescrollbox', {visible: true, timeout: 20000})
    ]);
    await page.waitForTimeout(3000);
    const imageBuffer = await page?.screenshot() as Buffer;
    await browser.close();
    if (imageBuffer) {
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }
    return '';
}
