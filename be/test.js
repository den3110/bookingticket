import puppeteer from "puppeteer";
import pako from "pako";
import { Solver } from '@2captcha/captcha-solver'
let receivedResponse = false;
let restartTimeout;

const solver = new Solver("eba30fa3d0e4facf31843be1e58089d9")

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0'
];

function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function restartProcess() {
    console.log("Restarting the process...");
    clearTimeout(restartTimeout);
    receivedResponse = false;
    main();
}

function resetRestartTimeout() {
    clearTimeout(restartTimeout);
    restartTimeout = setTimeout(restartProcess, 30000); // Restart after 30 seconds if no relevant message is received
}

let internalR = setInterval(function () {
    resetRestartTimeout(); // Ensure restart timeout is reset regularly
}, 1000);

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

async function main() {
    const browser = await puppeteer.launch({
        args: ["--disable-blink-features=AutomationControlled", "--no-sandbox"],
        headless: false, // Use the new headless mode
    });

    const page = await browser.newPage();
    await page.setUserAgent(getRandomUserAgent());
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://206.189.89.70/?page_id=21744/", {
        timeout: 90000, // Increase timeout to 90 seconds
        waitUntil: "networkidle0",
    });

    await page.waitForSelector("#loginbutton");
    await page.evaluate(() => {
        const loginButton = document.querySelector("#loginbutton");
        if (loginButton) {
            loginButton.click();
        } else {
            throw new Error('Login button not found');
        }
    });

    await page.waitForSelector("#accountId");
    await page.type("#accountId", "NAMDUOI5");

    await page.waitForSelector("#accountPwd");
    await page.type("#accountPwd", "Anhyeuem12");

    await page.waitForSelector("#signin");
    const imgs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('canvas.sliderBg')).map(item => item.toDataURL());
    });
    
    // imgs sẽ là một mảng chứa tất cả các chuỗi dữ liệu hình ảnh (base64)
    console.log("Hình ảnh từ tất cả các canvas:", imgs.length);
    async function solveCaptcha() {
        try {
            const res = await solver.coordinates({
                body: imgs[1],
                textinstructions: 'Puzzle center',
            });
    
            console.log('Captcha solved!');
            console.log(res);
            const offset = res.data[0].x;
            const sliders = await page.$$('div.slider');
            const slider = sliders[sliders.length - 1];
            const bb = await slider.boundingBox();
            const init = {
                x: bb.x + bb.width / 2,
                y: bb.y + bb.height / 2
            };
    
            // Calculate target coordinates
            const target = {
                x: bb.x + bb.width / 2 + parseFloat(offset) - 20,
                y: res.data[0].y
            };
    
            // Move the mouse to the initial position
            await page.mouse.move(init.x, init.y);
    
            // Click and hold the mouse button
            await page.mouse.down();
    
            // Move the pointer to the target position
            await page.mouse.move(target.x, target.y, {
                steps: randomInt(100, 500)
            });
    
            // Release the mouse button
            await page.mouse.up();
    
            console.log('Slider moved!');
            
        } catch (error) {
            console.log(`Failed to solve the captcha: ${error}`);
        }
    }
    await solveCaptcha();

    // Kiểm tra xem nút "Sign in" đã sẵn sàng chưa và giải lại nếu cần
    let isSignInDisabled = true;
    while (isSignInDisabled) {
        isSignInDisabled = await page.evaluate(() => {
            const signInButton = document.querySelector('input#signin');
            return signInButton && signInButton.disabled;
        });

        if (isSignInDisabled) {
            console.log("Sign-in button still disabled. Retrying captcha...");
            await solveCaptcha();
            await new Promise(resolve => setTimeout(resolve, 500));
        } else {
            console.log("Sign-in button is enabled!");
        }
    }
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 100000 }),
        page.evaluate(() => {
            const signinButton = document.querySelector("#signin");
            if (signinButton) {
                signinButton.click();
            } else {
                throw new Error('Sign in button not found');
            }
        })
    ]);

    await page.waitForSelector("#UserMenu");
    await page.waitForFunction(
        'document.querySelector("body").innerText.includes("NAMDUOI5")',
    );

    const redirectPageUrl = await page.url();
    console.log("Redirect page URL:", redirectPageUrl);

    resetRestartTimeout(); // Initialize the restart timeout

    await page.on("response", async (response) => {
        receivedResponse = true;
        clearTimeout(restartTimeout); // Clear the timeout if a response is received

        try {
            let status = response.status ? response.status() : null;
            if (status) {
                let url = response.url();
                console.log("Response URL:", url);
                if (url.includes("GetLoggedinInfo")) {
                    await delay(500);
                    const urlObject = new URL(redirectPageUrl);
                    const hostName = urlObject.hostname;
                    await page.goto(
                        `https://${hostName}/CheckGame?gameType=BB_LiveGame&subGameType=&dt=NAMDUOI5${new Date().getMilliseconds()}`,
                        {
                            waitUntil: 'networkidle2'
                        }
                    );
                    return;
                }
                if (url.includes("api/Authorize/SignIn")) {
                    let text = await response.text();
                    let jsonData = JSON.parse(text);
                    console.log("SignIn response data:", jsonData);
                }
            }
        } catch (error) {
            console.log("Error processing response:", error);
        }
    });

    await page.setCacheEnabled(true);
    await page.reload({ waitUntil: 'networkidle2' });

    // Simulate user interactions
    await autoScroll(page);
    await page.mouse.move(100, 100);
    await delay(2000);
    await page.mouse.move(200, 200);
    await delay(2000);
    await page.mouse.click(300, 300);
    await delay(2000);
}

main();
