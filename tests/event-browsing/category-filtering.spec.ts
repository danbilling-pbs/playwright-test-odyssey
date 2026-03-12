// spec: test-plans/ticketyboo-comprehensive-test-plan-updated.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Event Browsing and Display', () => {
  test('Event Category Filtering', async ({ page }) => {
    // Navigate to the application homepage
    await page.goto('http://localhost:3000/');

    // Click on 'All Events' filter button
    await page.getByRole('button', { name: 'All Events' }).click();

    // Verify All Events button becomes active and all 6 events are displayed
    await expect(page.getByText('Rock Legends Live')).toBeVisible();
    await expect(page.getByText('Classic Cinema Night')).toBeVisible();
    await expect(page.getByText('Stand-Up Spectacular')).toBeVisible();
    await expect(page.getByText('Jazz Night')).toBeVisible();
    await expect(page.getByText('Sci-Fi Marathon')).toBeVisible();
    await expect(page.getByText('Improv Night')).toBeVisible();

    // Click on 'Concerts' filter button to filter only concert events
    await page.getByRole('button', { name: 'Concerts' }).click();

    // Verify only concert events are displayed
    await expect(page.getByText('Rock Legends Live')).toBeVisible();
    await expect(page.getByText('Jazz Night')).toBeVisible();

    // Click on 'Films' filter button to show only film events
    await page.getByRole('button', { name: 'Films' }).click();

    // Verify only film events are displayed
    await expect(page.getByText('Classic Cinema Night')).toBeVisible();
    await expect(page.getByText('Sci-Fi Marathon')).toBeVisible();

    // Click on 'Comedy' filter button to show only comedy events
    await page.getByRole('button', { name: 'Comedy' }).click();

    // Verify only comedy events are displayed
    await expect(page.getByText('Stand-Up Spectacular')).toBeVisible();
    await expect(page.getByText('Improv Night')).toBeVisible();

    // Return to 'All Events' filter to verify all events display again
    await page.getByRole('button', { name: 'All Events' }).click();

    // Verify all events are displayed again and filter state resets properly
    await expect(page.getByText('Rock Legends Live')).toBeVisible();
    await expect(page.getByText('Classic Cinema Night')).toBeVisible();
    await expect(page.getByText('Stand-Up Spectacular')).toBeVisible();
    await expect(page.getByText('Jazz Night')).toBeVisible();
    await expect(page.getByText('Sci-Fi Marathon')).toBeVisible();
    await expect(page.getByText('Improv Night')).toBeVisible();
  });
});