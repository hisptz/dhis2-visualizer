import puppeteer from "puppeteer";
import {config} from "dotenv";


config()

export async function getImage(id: string): Promise<string> {
		const timeout = parseInt(process.env.VISUALIZER_TIMEOUT ?? "5000");
		const browser = await puppeteer.launch({
				headless: "new",
				args: [
						'--no-sandbox',
						'--disable-web-security',
						'--disable-setuid-sandbox'
				],
		});
		const page = await browser.newPage();

		await page.goto(`http://localhost:5000/${id}`);
		await Promise.race([
				page.waitForSelector(".highcharts-container", {
						visible: true,
						timeout,
				}),
				page.waitForSelector("#error-container", {
						visible: true,
						timeout,
				}),
				page.waitForSelector(".tablescrollbox", {
						visible: true,
						timeout,
				}),

				page.waitForSelector('[data-test="visualization-container"]', {
						visible: true,
						timeout,
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
}
