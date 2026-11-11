import { test as base, expect } from '@playwright/test';

// Independent fictional fixtures. Never seed a user's browser or depend on today's date.
const appointments = [
  ['1', '24 Lavender Row', '2026-11-12T09:00'],
  ['2', '8 Willow Court', '2026-11-12T11:30'],
  ['3', '15 Ash Grove', '2026-11-13T10:00'],
  ['4', '42 Rosebery Gardens', '2026-11-15T13:00'],
  ['5', '6 Cedar Mews', '2026-11-16T09:30'],
  ['6', '91 Park View', '2026-11-08T14:00'],
].map(([id, address, date]) => ({
  id,
  address,
  date,
  city: 'Fictional London property',
  type: 'Demo property',
  contact: 'Fictional resident',
  access: 'Test fixture only',
}));

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    const knownWarnings: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      // Existing PhotoCard renders once before its blob URL is available.
      if (message.text().includes('An empty string ("")')) knownWarnings.push(message.text());
      else errors.push(message.text());
    });
    // The app works with fallback fonts; tests must not require public internet.
    await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) =>
      route.fulfill({ contentType: 'text/css', body: '' }),
    );
    await page.clock.setFixedTime(new Date('2026-11-12T12:00:00Z'));
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Your inspections' })).toBeVisible();
    await page.evaluate(async (jobs) => {
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('loophouse');
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(['jobs', 'inspections'], 'readwrite');
        tx.objectStore('jobs').clear();
        tx.objectStore('inspections').clear();
        jobs.forEach((job) => tx.objectStore('jobs').put(job));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    }, appointments);
    await page.reload();
    await expect(page.getByRole('button', { name: /24 Lavender Row/ })).toBeVisible();
    await use(page);
    if (knownWarnings.length) {
      await testInfo.attach('known-console-warnings', {
        body: knownWarnings.join('\n'),
        contentType: 'text/plain',
      });
    }
    expect(errors, 'Unexpected browser errors').toEqual([]);
  },
});

export { expect };
