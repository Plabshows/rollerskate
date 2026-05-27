const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.airbnb.es/rooms/1024510940350409748', { waitUntil: 'networkidle2' });
    
    const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src.includes('muscache.com/im/pictures'));
    });
    
    console.log(JSON.stringify(images, null, 2));
    await browser.close();
})();
