const { webkit } = require('playwright');
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  await page.goto('http://localhost:3000/french');
  await page.waitForTimeout(2000);
  await browser.close();
})();
