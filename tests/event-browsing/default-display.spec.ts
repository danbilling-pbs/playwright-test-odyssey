// spec: test-plans/ticketyboo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Event Browsing and Filtering', () => {
  test('Default Event Display', async ({ page }) => {
    // Navigate to http://localhost:3000/
    await page.goto('http://localhost:3000/');

    // Verify page loads with correct title and header
    await expect(page.getByRole('heading', { name: '🎫 Ticketyboo' })).toBeVisible();

    // Verify filter buttons are present and "All Events" is visible
    await expect(page.getByRole('button', { name: 'All Events' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Concerts' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Films' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Comedy' })).toBeVisible();

    // Verify all 6 events are displayed by checking key events from each category
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jazz Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Marathon' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Improv Night' })).toBeVisible();
  });
});