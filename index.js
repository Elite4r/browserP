import puppeteer from "puppeteer"
import { exec } from "node:child_process"
import { promisify } from "node:util"

// find path to crhomium
const { stdout: chromiumPath } = await promisify(exec)("which chromium")

const browser = await puppeteer.launch({
  headless: false,
	defaultViewport: null,
  args: ["--no-sandbox", "--disable-setuid-sandbox", '--start-maximized', '--start-fullscreen'],
  executablePath: chromiumPath.trim()
});

await new Promise(res => setTimeout(res, 1500))

const page = await browser.newPage()
// go to replit's front page
await page.goto("https://chat.lmsys.org/", {
  waitUntil: "networkidle2"
})

// wait for page to render
await new Promise(res => setTimeout(res, 1500))

await page.evaluate(() => {
	location.reload()
    document.addEventListener('contextmenu', event => event.preventDefault())
});