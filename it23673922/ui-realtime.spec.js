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

test('Neg_Fun_0001 - Missing spaces in sentence', async ({ page }) => {
  await page.locator('textarea').first().fill('mamage dharayanavaa');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toContainText('ගෙදර'); // FAIL expected
});

test('Neg_Fun_0002 - Slang heavy input', async ({ page }) => {
  await page.locator('textarea').first().fill('ela machan supiri');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toContainText('සුපිරි'); // FAIL expected
});

/* ---------------- POSITIVE UI TESTS ---------------- */

test('Pos_UI_0001 - Real-time output updates for short input', async ({ page }) => {
  await page.locator('textarea').first().type('mata bath oonee');
  await page.waitForTimeout(1500);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_UI_0002 - UI handles interrogative input', async ({ page }) => {
  await page.locator('textarea').first().fill('api heta enavaa?');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();

  // Check output is generated
  await expect(outputBox).not.toHaveText('');

  // Check question mark is preserved (UI behavior)
  await expect(outputBox).toContainText('?');
});   //pass

/* ---------------- NEGATIVE UI TESTS ---------------- */

test('Neg_UI_0001 - Clear input does not clear output', async ({ page }) => {
  const input = page.locator('textarea').first();
  const outputBox = page.locator('.whitespace-pre-wrap').first();

  await input.fill('mama yanna hadhannee');
  await page.waitForTimeout(1500);

  await input.fill('');
  await page.waitForTimeout(1500);

  await expect(outputBox).not.toHaveText(''); // FAIL expected
});

test('Neg_UI_0002 - Extra spaces are not normalized', async ({ page }) => {
  await page.locator('textarea').first().fill('mama   gedhara   yanavaa');
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).toContainText('   '); // FAIL expected
});

// Mideum length tests can be flaky due to varying response times



/* ---------------- POSITIVE FUNCTIONAL TESTS (M) ---------------- */

test('Pos_Fun_0003 - Convert medium daily compound sentence', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama office yanna kalin gedhara inna amma ta call ekak gaththa saha eya hariyata inne kiyala ahagaththa'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_Fun_0004 - Convert polite request sentence', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'karuNaakaralaa mage document tika review karalaa heta davase email ekak vidihata evanna puLuvandha kiyala ahanna oonee'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

/* ---------------- NEGATIVE FUNCTIONAL TESTS (M) ---------------- */

test('Neg_Fun_0003 - Mixed English and slang heavy sentence', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'machan mata adha office ekee meeting ekak thiyenavaa eka Zoom walin nam join wenna wenne late unoth please kiyala msg ekak dhaapan'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS (robustness)
});

test('Neg_Fun_0004 - Sentence with missing punctuation', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama gedhara yanavaa heta api trip eka kandy valata yamudha kiyala plan ekak haduwa'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS (robustness)
});

/* ---------------- POSITIVE UI TESTS (M) ---------------- */

test('Pos_UI_0003 - Real-time output update for medium input', async ({ page }) => {
  await page.locator('textarea').first().type(
    'mama dhaen vaeda karanavaa namuth passe api poddak kathaa karala decisions ganna puluvan wei'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_UI_0004 - UI handles mixed Singlish and English input', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'api heta meeting eka Teams walin thiyenavaa eka WhatsApp group eke share karanna puLuvandha'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

/* ---------------- NEGATIVE UI TESTS (M) ---------------- */

test('Neg_UI_0003 - Clear medium input does not clear output', async ({ page }) => {
  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('.whitespace-pre-wrap').first();

  await inputBox.fill(
    'mama iiLaGa sathiyee leave ganna hadhannee nam eeka HR ta kiyala approval eka ganna oonee'
  );
  await page.waitForTimeout(2000);

  await inputBox.fill('');
  await page.waitForTimeout(2000);

  await expect(outputBox).not.toHaveText(''); // FAIL expected
});

test('Neg_UI_0004 - Extra spaces not normalized in medium input', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama   gedhara   yanavaa   nam   passe   api   kathaa   karamu'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // FAIL expected
});
