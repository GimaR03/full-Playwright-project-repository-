const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
});

const inputBox = page => page.locator('textarea').first();
const outputBox = page => page.locator('.whitespace-pre-wrap').first();

/* ================= POSITIVE FUNCTIONAL TEST CASES ================= */

test('Pos_Fun_0001 - Convert simple daily sentence', async ({ page }) => {
  await inputBox(page).fill('mama lidhata yanavaa');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0002 - Convert greeting question', async ({ page }) => {
  await inputBox(page).fill('oyaata kohomadha ?');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0003 - Convert medium daily compound sentence', async ({ page }) => {
  await inputBox(page).fill(
    'mama office yanna kalin gedhara inna amma ta call ekak'
  );
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0004 - Convert polite request sentence', async ({ page }) => {
  await inputBox(page).fill(
    'karuNaakaralaa mage document tika review karalaa heta davase email ekak vidihata'
  );
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0005 - Convert polite annual leave request', async ({ page }) => {
  await inputBox(page).fill(
    'karuNaakaralaa mage annual leave eka approve karanna puluvandha kiyala manager ta mail ekak liyanna'
  );
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0006 - Convert short daily sentence', async ({ page }) => {
  await inputBox(page).fill('mapi passe hamuwemu');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0007 - Convert repeated short daily sentence', async ({ page }) => {
  await inputBox(page).fill('mapi passe hamuwemu');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0008 - Convert long daily language paragraph', async ({ page }) => {
  await inputBox(page).fill(
    'mama iiLaGa sathiyee office project eka submit karanna thiyenavaa eeka hariyata karanna nam mama raeeta vaeda karanavaa'
  );
  await page.waitForTimeout(2500);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0009 - Convert polite document request again', async ({ page }) => {
  await inputBox(page).fill(
    'karuNaakaralaa mage document tika review karalaa heta davase email ekak vidihata'
  );
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0010 - Convert imperative command', async ({ page }) => {
  await inputBox(page).fill('issarahata yanna');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0011 - Convert future travel sentence', async ({ page }) => {
  await inputBox(page).fill('mama gedhara yanavaa heta nuvara yannemi');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0012 - Convert negative sentence', async ({ page }) => {
  await inputBox(page).fill('mama kanne nae.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0013 - Convert past tense sentence', async ({ page }) => {
  await inputBox(page).fill('eyaa iye aava.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0014 - Convert group action sentence', async ({ page }) => {
  await inputBox(page).fill('api okkoma yamu.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0015 - Convert place name sentence', async ({ page }) => {
  await inputBox(page).fill('Colombo valata vahinava.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0016 - Convert currency formatted sentence', async ({ page }) => {
  await inputBox(page).fill('mata Rs. 5000 dhenna.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0017 - Convert repeated emphasis sentence', async ({ page }) => {
  await inputBox(page).fill('hitha hitha inna epaa.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0018 - Convert brand name sentence', async ({ page }) => {
  await inputBox(page).fill('mama YouTube balanava.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0019 - Convert conditional sentence', async ({ page }) => {
  await inputBox(page).fill('vaessa naththan api kataragama yamu.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0020 - Convert interrogative question', async ({ page }) => {
  await inputBox(page).fill('kaedha enne?');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0021 - Repeated emphasis sentence', async ({ page }) => {
  await inputBox(page).fill('hitha hitha inna epaa.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0022 - Multi-word waiting sentence', async ({ page }) => {
  await inputBox(page).fill('poddak inna mama enakal.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0023 - Emotional exclamation with question', async ({ page }) => {
  await inputBox(page).fill('ayyo! mokadha vune?');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0024 - Proper spacing sentence', async ({ page }) => {
  await inputBox(page).fill('gedhara yanna oone.');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_Fun_0025 - Slang colloquial phrase', async ({ page }) => {
  await inputBox(page).fill('ela kiri machan!');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

/* ================= NEGATIVE FUNCTIONAL TESTS ================= */

test('Neg_Fun_0001 - Incorrect spacing input', async ({ page }) => {
  await inputBox(page).fill('mamalidhatayanavaa');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toContainText(' ');
});

test('Neg_Fun_0002 - Slang heavy short input', async ({ page }) => {
  await inputBox(page).fill('ela machan supiri');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toContainText('සුපිරි');
});

test('Neg_Fun_0003 - Long mixed English & slang paragraph', async ({ page }) => {
  await inputBox(page).fill(
    'machan adha office ekee full busy day ekak morning meeting eken passe Zoom call godak thibba saha WhatsApp messages ena eka nawaththanna baeri unaa'
  );
  await page.waitForTimeout(2500);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Neg_Fun_0004 - Abbreviation with quotes & question', async ({ page }) => {
  await inputBox(page).fill(
    'mama manager ta ASAP mail ekak yawala “final report” submit karala thiyenavaa kiyala kiyannada?'
  );
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).toHaveText('');
});

test('Neg_Fun_0005 - Numeric unit glue issue', async ({ page }) => {
  await inputBox(page).fill('10kg dhenna');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Neg_Fun_0006 - Rare slang typo', async ({ page }) => {
  await inputBox(page).fill('appatasiri!!');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).not.toHaveText('');
});

/* ================= POSITIVE UI TESTS ================= */

test('Pos_UI_0001 - UI real-time update with long input', async ({ page }) => {
  await inputBox(page).type(
    'mama dhaen vaeda karanavaa saha passe api management meeting ekata yanna thiyenavaa'
  );
  await page.waitForTimeout(2500);
  await expect(outputBox(page)).not.toHaveText('');
});

test('Pos_UI_0002 - UI handles mixed-language content', async ({ page }) => {
  await inputBox(page).fill(
    'api iiLaGa sathiyee Teams meeting ekak schedule karala thiyenavaa saha ehi Zoom link eka WhatsApp group eke share karala thiyenavaa'
  );
  await page.waitForTimeout(2500);
  await expect(outputBox(page)).not.toHaveText('');
});

/* ================= NEGATIVE UI TESTS ================= */

test('Neg_UI_0001 - Clear input does not clear output', async ({ page }) => {
  const input = inputBox(page);
  const output = outputBox(page);

  await input.fill('mama yanna hadhannee');
  await page.waitForTimeout(1500);
  await input.fill('');
  await page.waitForTimeout(1500);

  await expect(output).not.toHaveText('');
});

test('Neg_UI_0002 - Multiple spaces not normalized', async ({ page }) => {
  await inputBox(page).fill('mama    lidhata    yanavaa');
  await page.waitForTimeout(2000);
  await expect(outputBox(page)).toContainText('   ');
});
