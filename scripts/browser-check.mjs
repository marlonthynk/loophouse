import { chromium } from '@playwright/test';

let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<button>Browser ready</button>');
  if ((await page.getByRole('button').textContent()) !== 'Browser ready') {
    throw new Error('Chromium did not render the preflight page');
  }
  console.log(`Chromium ${browser.version()} launched and rendered successfully.`);
} catch (error) {
  console.error('Browser verification unavailable. Run npm run browser:install during setup.');
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
