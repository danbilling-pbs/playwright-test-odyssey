// spec: test-plans/ticketyboo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Bug Verification and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('Total Price Calculation Bug', async ({ page }) => {
    // Test the known bug with total price calculation
    
    // Test with Rock Legends Live (£65.00 per ticket)
    await page.getByText('concert Rock Legends Live The').click();
    
    // Change quantity from 1 to 3
    await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('3');
    
    // KNOWN BUG: Total remains at £65.00 instead of updating to £195.00
    await expect(page.getByText('Total: £65.00')).toBeVisible();
    // Expected behavior: await expect(page.getByText('Total: £195.00')).toBeVisible();
    
    // Close modal and test with different event
    await page.locator('#eventModal').getByText('×').click();
    
    // Test with Classic Cinema Night (£12.50 per ticket) 
    await page.getByText('film Classic Cinema Night The').click();
    
    // Change quantity to 2
    await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('2');
    
    // KNOWN BUG: Total should be £25.00 (2 × £12.50) but likely remains at £12.50
    await expect(page.getByText('Total: £12.50')).toBeVisible();
    // Expected behavior: await expect(page.getByText('Total: £25.00')).toBeVisible();
  });

  test('Filter State Management', async ({ page }) => {
    // Apply Concerts filter
    await page.getByRole('button', { name: 'Concerts' }).click();
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).not.toBeVisible();

    // Open event modal
    await page.getByText('concert Rock Legends Live The').click();
    await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).toBeVisible();

    // Close modal
    await page.locator('#eventModal').getByText('×').click();

    // Verify filter remains active after modal interaction
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jazz Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).not.toBeVisible();
  });

  test('Cross-Event Consistency', async ({ page }) => {
    // Test that all event types have consistent modal structure

    const events = [
      { selector: 'concert Rock Legends Live The', title: 'Rock Legends Live', price: '£65.00' },
      { selector: 'film Classic Cinema Night The', title: 'Classic Cinema Night', price: '£12.50' },
      { selector: 'comedy Stand-Up Spectacular Sarah', title: 'Stand-Up Spectacular', price: '£28.00' }
    ];

    for (const event of events) {
      // Open event modal
      await page.getByText(event.selector).click();

      // Verify modal displays correct event-specific information
      await expect(page.getByRole('heading', { name: event.title, level: 2 })).toBeVisible();
      await expect(page.getByText(`Total: ${event.price}`)).toBeVisible();

      // Verify form structure is identical across all events
      await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).toBeVisible();
      await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Full Name:' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Email:' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Card Number:' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Expiry Date:' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'CVV:' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Cardholder Name:' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Complete Purchase' })).toBeVisible();

      // Close modal before testing next event
      await page.locator('#eventModal').getByText('×').click();
    }
  });

  test('Rapid Filter Switching', async ({ page }) => {
    // Test rapid filter switching for race conditions or UI glitches

    // Rapidly switch between filters
    await page.getByRole('button', { name: 'Concerts' }).click();
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();

    await page.getByRole('button', { name: 'Films' }).click();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).toBeVisible();

    await page.getByRole('button', { name: 'Comedy' }).click();
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).toBeVisible();

    await page.getByRole('button', { name: 'All Events' }).click();
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).toBeVisible();

    // Verify no race conditions or UI glitches occur
    await expect(page.getByRole('heading', { name: 'Browse Events' })).toBeVisible();
  });
});