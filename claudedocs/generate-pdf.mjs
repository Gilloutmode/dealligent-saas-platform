import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load the HTML file - V12 with highlighted RAG variables for visibility
  const htmlPath = path.join(__dirname, 'DEALLIGENT_Analysis_Portfolio_V8.html');
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
    timeout: 120000
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 4000));

  // Generate PDF - let CSS @page handle sizing
  await page.pdf({
    path: path.join(__dirname, 'DEALLIGENT_Analysis_Portfolio_V12.pdf'),
    printBackground: true,
    preferCSSPageSize: true
  });

  console.log('PDF generated successfully: DEALLIGENT_Analysis_Portfolio_V12.pdf');

  await browser.close();
}

generatePDF().catch(console.error);
