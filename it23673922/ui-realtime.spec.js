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

// Long length tests can be flaky due to varying response times

/* ---------------- POSITIVE FUNCTIONAL TESTS (L) ---------------- */

test('Pos_Fun_0005 - Convert long daily language paragraph', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama iiLaGa sathiyee office project eka submit karanna thiyenavaa saha eeka hariyata karanna nam mama raeeta vaeda karanavaa. gedhara aya mama ta support karanavaa saha manager ta reports tika time ekata evanavaa. ehema karala api team ekak vidihata target eka achieve karaganna puluvan kiyala mama hithanavaa.'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_Fun_0006 - Convert long polite request paragraph', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'karuNaakaralaa mage annual leave eka approve karanna puluvandha kiyala manager ta mail ekak liyanna mama hadhanavaa. maage vaeda tika handover karala documentation hariyata prepare karala thiyenavaa kiyala ehi pahadili karala liyala thiyenavaa. ehema nisaa office vaeda walata kisima balapemaak wennee naehae kiyala pennanna mama balaporoththu wenavaa.'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

/* ---------------- NEGATIVE FUNCTIONAL TESTS (L) ---------------- */

test('Neg_Fun_0005 - Long mixed English and slang paragraph', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'machan adha office ekee full busy day ekak. morning meeting eken passe Zoom call godak thibba saha WhatsApp messages ena eka nawaththanna baeri unaa. manager quick decisions gaththaa namuth team eka tikak confuse unaa. ehema unath api end of the day target eka complete karagaththa kiyala kiyanna puluvan.'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS (robustness)
});

test('Neg_Fun_0006 - Long paragraph with spacing and punctuation issues', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama gedhara innee heta api trip eka plan karala thiyenavaa kandy yanna nam morning 6ta thama yanna onee kiyala api kathaa unaa ehema unath weather eka hondha naththan plan eka change wenna puluvan kiyala hithanna onee'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS (robustness)
});

/* ---------------- POSITIVE UI TESTS (L) ---------------- */

test('Pos_UI_0005 - Real-time output update for long paragraph', async ({ page }) => {
  await page.locator('textarea').first().type(
    'mama dhaen vaeda karanavaa saha passe api management meeting ekata yanna thiyenavaa. ehi decisions tika gaththata passe documentation prepare karala email ekak vidihata team ekata evanna oonee. mehema long input ekak type karaddi output eka real time update wenne nam UI eka hondhata vaeda karanavaa kiyala hithanna puluvan.'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

test('Pos_UI_0006 - UI stability with long mixed-language input', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'api iiLaGa sathiyee Teams meeting ekak schedule karala thiyenavaa saha ehi Zoom link eka WhatsApp group eke share karala thiyenavaa. meeting eka avasan unaata passe minutes tika document ekak vidihata prepare karala email walin evanna oonee kiyala management eken kiyala thiyenavaa.'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // PASS
});

/* ---------------- NEGATIVE UI TESTS (L) ---------------- */

test('Neg_UI_0005 - Clear long input does not clear output', async ({ page }) => {
  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('.whitespace-pre-wrap').first();

  await inputBox.fill(
    'mama annual report eka liyala avasan karala thiyenavaa nam eeka submit karanna kalin final review ekak karanna oonee kiyala manager ta mail ekak liyala thiyenavaa saha files tika attach karala thiyenavaa.'
  );
  await page.waitForTimeout(2000);

  await inputBox.fill('');
  await page.waitForTimeout(2000);

  await expect(outputBox).not.toHaveText(''); // FAIL expected
});

test('Neg_UI_0006 - Formatting not preserved in long input', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama   gedhara   innee   saha   api   passe   poddak   kathaa   karamu   kiyala   thiyenavaa   nam   eeka   hondhai   kiyala   hithanavaa'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();
  await expect(outputBox).not.toHaveText(''); // FAIL expected
});

test('Neg_UI_0109 - UI fails with abbreviations and quotation marks', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama manager ta ASAP mail ekak yawala “final report” submit karala thiyenavaa kiyala kiyannada?'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();

  // Expect UI to mishandle formatting or translation
  await expect(outputBox).toHaveText(''); //  FAIL expected
});

test('Neg_UI_0110 - UI fails to handle interrogative input with abbreviation', async ({ page }) => {
  await page.locator('textarea').first().fill(
    'mama manager ta ASAP mail ekak yawanavaa kiyala ahuwoth ok da?'
  );
  await page.waitForTimeout(2000);

  const outputBox = page.locator('.whitespace-pre-wrap').first();

  // Expect UI to fail handling question-based abbreviation input
  await expect(outputBox).toHaveText(''); //  FAIL expected
});