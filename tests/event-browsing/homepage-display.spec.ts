// spec: test-plans/ticketyboo-comprehensive-test-plan-updated.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Event Browsing and Display', () => {
  test('Homepage Event Display', async ({ page }) => {
    // Navigate to the application homepage
    await page.goto('http://localhost:3000/');

    // Verify page title shows 'Ticketyboo - Event Tickets'
    expect(await page.evaluate(() => document.title)).toBe('Ticketyboo - Event Tickets');

    // Verify header displays '🎫 Ticketyboo' branding
    await expect(page.getByText('🎫 Ticketyboo')).toBeVisible();

    // Verify tagline 'Your ticket to amazing events!' is visible
    await expect(page.getByText('Your ticket to amazing events!')).toBeVisible();

    // Verify all 6 default events are displayed in a grid layout
    await expect(page.getByText('Rock Legends Live')).toBeVisible();
    await expect(page.getByText('Classic Cinema Night')).toBeVisible();
    await expect(page.getByText('Stand-Up Spectacular')).toBeVisible();
    await expect(page.getByText('Jazz Night')).toBeVisible();
    await expect(page.getByText('Sci-Fi Marathon')).toBeVisible();
    await expect(page.getByText('Improv Night')).toBeVisible();

    // Verify each event card shows event type icon, event name, artist/performer information
    await expect(page.getByText('The Thunder Band')).toBeVisible();

    // Verify venue location with 📍 icon is displayed
    await expect(page.getByText('📍 O2 Arena, London')).toBeVisible();

    // Verify date and time with 📅 icon are shown
    await expect(page.getByText('📅 Sun, Mar 15, 2026 at 19:00')).toBeVisible();

    // Verify price per ticket is displayed
    await expect(page.getByText('£65.00')).toBeVisible();

    // Verify available ticket count is shown
    await expect(page.getByText('150 tickets available')).toBeVisible();
  });
});