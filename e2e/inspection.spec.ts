import { readFile } from 'node:fs/promises';
import { test, expect } from './fixtures';

test('date toggles compose with address and status filters and handle empty results', async ({
  page,
}) => {
  const jobs = page.locator('.jobs > button');
  await expect(jobs).toHaveCount(6);
  await page.getByRole('button', { name: 'Today', exact: true }).click();
  await expect(jobs).toHaveCount(2);
  await expect(jobs).toContainText(['24 Lavender Row', '8 Willow Court']);
  await expect(page.getByRole('button', { name: 'Today', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByLabel('Search by address').fill('Willow');
  await expect(jobs).toHaveCount(1);
  await page.getByLabel('Filter by status').selectOption('Completed');
  await expect(page.getByText('No appointments to show', { exact: true })).toBeVisible();
  await page.getByLabel('Filter by status').selectOption('All');
  await page.getByLabel('Search by address').fill('');
  await page.getByRole('button', { name: 'This week', exact: true }).click();
  await expect(jobs).toHaveCount(4);
  await expect(jobs).toContainText([
    '24 Lavender Row',
    '8 Willow Court',
    '15 Ash Grove',
    '42 Rosebery Gardens',
  ]);
  await expect(page.getByRole('button', { name: 'Today', exact: true })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await page.getByRole('button', { name: 'This week', exact: true }).click();
  await expect(jobs).toHaveCount(6);
});

test('inspection validates, preserves its photo draft across reload, and downloads a populated PDF', async ({
  page,
}, testInfo) => {
  await page.getByRole('button', { name: /24 Lavender Row/ }).click();
  await page.getByRole('button', { name: 'Start inspection', exact: true }).click();
  await page.getByRole('button', { name: 'Review report', exact: true }).click();
  await expect(page.getByText('Exterior: choose a condition', { exact: true })).toBeVisible();
  const exterior = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Exterior', exact: true }) });
  await exterior.getByLabel('Condition').selectOption('Needs attention');
  await page.getByRole('button', { name: 'Review report', exact: true }).click();
  await expect(
    page.getByText('Exterior: add a note explaining the issue', { exact: true }),
  ).toBeVisible();
  await exterior.getByLabel('Notes', { exact: true }).fill('Fictional crack beside the door.');
  // Render a nonblank image in the real browser, then upload through the app's file input.
  const image = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 160;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#7547cc';
    ctx.fillRect(0, 0, 240, 160);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Fictional inspection photo', 12, 80);
    return canvas.toDataURL('image/png').split(',')[1];
  });
  await exterior.getByLabel('Add photo').setInputFiles({
    name: 'fictional-property.png',
    mimeType: 'image/png',
    buffer: Buffer.from(image, 'base64'),
  });
  await expect(exterior.getByRole('img')).toBeVisible();
  await exterior.getByLabel('Photo caption').fill('Demo exterior photograph');
  await page.getByLabel('Overall summary').fill('Fictional inspection completed for testing.');
  await expect(page.locator('.save-state')).toHaveText('● Saved');
  await page.reload();
  await page.getByRole('button', { name: /24 Lavender Row/ }).click();
  await page.getByRole('button', { name: 'Resume inspection', exact: true }).click();
  await expect(exterior.getByLabel('Condition')).toHaveValue('Needs attention');
  await expect(exterior.getByLabel('Notes', { exact: true })).toHaveValue(
    'Fictional crack beside the door.',
  );
  await expect(exterior.getByLabel('Photo caption')).toHaveValue('Demo exterior photograph');
  await expect(exterior.getByRole('img')).toBeVisible();
  for (const name of ['Living areas', 'Kitchen', 'Bathroom', 'Bedrooms', 'Safety observations']) {
    await page
      .locator('section')
      .filter({ has: page.getByRole('heading', { name, exact: true }) })
      .getByLabel('Condition')
      .selectOption('Good');
  }
  await page.getByRole('button', { name: 'Review report', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Review your report' })).toBeVisible();
  await page.getByRole('button', { name: 'Complete inspection', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Inspection report', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Edit inspection', exact: true })).toHaveCount(0);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download PDF', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('loophouse-1-report.pdf');
  const pdf = await readFile((await download.path())!);
  expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
  const contents = pdf.toString('latin1');
  for (const value of [
    '24 Lavender Row',
    'Fictional crack beside the door.',
    'Demo exterior photograph',
    'Fictional inspection completed for testing.',
    '/Subtype /Image',
  ]) {
    expect(contents).toContain(value);
  }
  await testInfo.attach('completed-report', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
  await testInfo.attach('inspection-pdf', { body: pdf, contentType: 'application/pdf' });
  await page.reload();
  await page.getByRole('button', { name: /24 Lavender Row/ }).click();
  await page.getByRole('button', { name: /View report/ }).click();
  await expect(page.getByRole('heading', { name: 'Inspection report', exact: true })).toBeVisible();
});

test('date controls and inspection inputs remain usable on a narrow screen', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Today', exact: true }).click();
  await expect(page.locator('.jobs > button')).toHaveCount(2);
  await page.getByRole('button', { name: 'This week', exact: true }).click();
  await expect(page.locator('.jobs > button')).toHaveCount(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await testInfo.attach('mobile-dashboard', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
  await page.getByRole('button', { name: /24 Lavender Row/ }).click();
  await page.getByRole('button', { name: 'Start inspection', exact: true }).click();
  await page.getByLabel('Condition', { exact: false }).first().selectOption('Good');
  await page.getByLabel('Notes', { exact: true }).first().fill('Mobile fictional observation.');
  await expect(page.locator('.save-state')).toHaveText('● Saved');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await testInfo.attach('mobile-inspection', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

for (const width of [1440, 390]) {
  test(`new inspection can be scheduled, persisted and completed at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole('button', { name: 'New inspection', exact: true }).click();
    await page.getByLabel('Property address').fill('Discarded fictional property');
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(page.locator('.jobs > button')).toHaveCount(6);
    await page.getByRole('button', { name: 'Today', exact: true }).click();
    await page.getByLabel('Search by address').fill('Willow');
    await page.getByLabel('Filter by status').selectOption('Completed');
    await page.getByRole('button', { name: 'New inspection', exact: true }).click();
    await page.getByRole('button', { name: 'Create inspection', exact: true }).click();
    await expect(page.getByLabel('Property address')).toBeFocused();
    await page.getByLabel('Property address').fill('   ');
    await page.getByLabel('City / postcode').fill('Fictional York, YO1 1ZZ');
    await page.getByLabel('Appointment date and time').fill('2026-11-20T14:45');
    await page.getByRole('button', { name: 'Create inspection', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('Enter a property address');
    await page.getByLabel('Property address').fill('  12 Fictional Orchard Lane  ');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await testInfo.attach(`new-inspection-${width}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    // Two immediate submissions must still create one record.
    await page.locator('form').evaluate((form: HTMLFormElement) => {
      form.requestSubmit();
      form.requestSubmit();
    });
    await expect(page.locator('.jobs > button')).toHaveCount(7);
    const created = page.getByRole('button', { name: /12 Fictional Orchard Lane/ });
    await expect(created).toContainText('Scheduled');
    await expect(created).toContainText('20 Nov 2026, 14:45');
    await expect(page.getByLabel('Search by address')).toHaveValue('');
    await expect(page.getByLabel('Filter by status')).toHaveValue('All');
    await expect(page.getByRole('button', { name: 'Today', exact: true })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    await page.reload();
    await created.click();
    await expect(page.getByText('Fictional York, YO1 1ZZ', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'Start inspection', exact: true }).click();
    await page
      .getByLabel('Notes', { exact: true })
      .first()
      .fill('Fictional new property observation.');
    await expect(page.locator('.save-state')).toHaveText('● Saved');
    await page.reload();
    await created.click();
    await page.getByRole('button', { name: 'Resume inspection', exact: true }).click();
    await expect(page.getByLabel('Notes', { exact: true }).first()).toHaveValue(
      'Fictional new property observation.',
    );
    for (const select of await page.getByLabel('Condition', { exact: false }).all())
      await select.selectOption('Good');
    await page.getByRole('button', { name: 'Review report', exact: true }).click();
    await page.getByRole('button', { name: 'Complete inspection', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Inspection report', exact: true }),
    ).toBeVisible();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PDF', exact: true }).click();
    const pdf = await readFile((await (await downloadPromise).path())!);
    for (const value of [
      '12 Fictional Orchard Lane',
      'Fictional York',
      'Fictional new property observation.',
    ])
      expect(pdf.toString('latin1')).toContain(value);
  });
}

test('new inspection keeps entries after a storage failure and retries without duplicates', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'New inspection', exact: true }).click();
  await page.getByLabel('Property address').fill('55 Fictional Birch Road');
  await page.getByLabel('City / postcode').fill('Fictional Bristol');
  await page.getByLabel('Appointment date and time').fill('2026-11-21T10:15');
  await page.evaluate(() => {
    const original = IDBObjectStore.prototype.add;
    IDBObjectStore.prototype.add = function (...args) {
      if (this.name === 'jobs') {
        IDBObjectStore.prototype.add = original;
        throw new DOMException('Fictional storage failure', 'QuotaExceededError');
      }
      return original.apply(this, args);
    };
  });
  await page.getByRole('button', { name: 'Create inspection', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Could not create the inspection');
  await expect(page.getByLabel('Property address')).toHaveValue('55 Fictional Birch Road');
  await expect(page.getByLabel('Appointment date and time')).toHaveValue('2026-11-21T10:15');
  await page.getByRole('button', { name: 'Create inspection', exact: true }).click();
  await expect(page.locator('.jobs > button')).toHaveCount(7);
  await page.reload();
  await expect(page.getByRole('button', { name: /55 Fictional Birch Road/ })).toHaveCount(1);
});
