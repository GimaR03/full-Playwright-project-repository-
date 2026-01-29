const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
});

/* ---------------- POSITIVE FUNCTIONAL TESTS ---------------- */

test('Pos_Fun_0001 - Convert simple daily sentence', async ({ page }) => {
  await page.locator('textarea').first().fill('mama gedhara yanavaa');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_Fun_0002 - Convert greeting question', async ({ page }) => {
  await page.locator('textarea').first().fill('oyaata kohomadha?');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).toContainText('ද'); // PASS (question form)
});

/* ---------------- NEGATIVE FUNCTIONAL TESTS ---------------- */

test('Neg_Fun_0003 - Missing spaces in sentence', async ({ page }) => {
  await page.locator('textarea').first().fill('mamage dharayanavaa');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toContainText('ගෙදර'); // FAIL expected
});

test('Neg_Fun_0004 - Slang heavy input', async ({ page }) => {
  await page.locator('textarea').first().fill('ela machan supiri');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toContainText('සුපිරි'); // FAIL expected
});

/* ---------------- POSITIVE UI TESTS ---------------- */

test('Pos_UI_0005 - Real-time output updates for short input', async ({ page }) => {
  await page.locator('textarea').first().type('mata bath oonee');
  await page.waitForTimeout(1500);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_UI_0006 - UI handles interrogative input', async ({ page }) => {
  await page.locator('textarea').first().fill('api heta enavaa?');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();

  // Check output is generated
  await expect(outputBox).not.toHaveText('');

  // Check question mark is preserved (UI behavior)
  await expect(outputBox).toContainText('?');
});   //pass

/* ---------------- NEGATIVE UI TESTS ---------------- */

test('Neg_UI_0007 - Clear input does not clear output', async ({ page }) => {
  const input = page.locator('textarea').first();
  const outputBox = page.locator('.whitespace-pre-wrap').first();

  await input.fill('mama yanna hadhannee');
  await page.waitForTimeout(1500);

  await input.fill('');
  await page.waitForTimeout(1500);

  await expect(outputBox).not.toHaveText(''); // FAIL expected
});

test('Neg_UI_0008 - Extra spaces are not normalized', async ({ page }) => {
  await page.locator('textarea').first().fill('mama   gedhara   yanavaa');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).toContainText('   '); // FAIL expected
});
// End of file it23673922/ui-realtime.spec.js