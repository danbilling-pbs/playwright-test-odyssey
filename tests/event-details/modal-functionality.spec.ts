// spec: test-plans/ticketyboo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Event Selection and Detail Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('Concert Event Modal Display', async ({ page }) => {
    // Click on the 'Rock Legends Live' concert event card
    await page.getByRole('heading', { name: 'Rock Legends Live', level: 3 }).click();

    // Verify event detail modal opens with correct information
    await expect(page.getByRole('heading', { name: 'Rock Legends Live', level: 2 })).toBeVisible();
    await expect(page.locator('#eventDetails .event-artist', { hasText: 'The Thunder Band' })).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('O2 Arena, London')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('Sun, Mar 15, 2026')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('19:00')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('£65.00 per ticket')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('150 tickets')).toBeVisible();
    await expect(page.getByText('Experience an unforgettable night of rock music with The Thunder Band!')).toBeVisible();

    // Verify close button is visible
    await expect(page.locator('#eventModal').getByText('×')).toBeVisible();

    // Verify booking form is present
    await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).toBeVisible();
    await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Full Name:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Card Number:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Expiry Date:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'CVV:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Cardholder Name:' })).toBeVisible();

    // Verify total price is correct
    await expect(page.getByText('Total: £65.00')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Complete Purchase' })).toBeVisible();

    // Verify default ticket quantity is 1
    await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toHaveValue('1');
  });

  test('Film Event Modal Display', async ({ page }) => {
    // Click on the 'Classic Cinema Night' film event card
    await page.getByRole('heading', { name: 'Classic Cinema Night', level: 3 }).click();

    // Verify event detail modal opens with correct film information
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night', level: 2 })).toBeVisible();
    await expect(page.locator('#eventDetails .event-artist', { hasText: 'The Godfather' })).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('📍 Venue: Broadway Cinema, Nottingham')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('Fri, Mar 20, 2026')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('20:00')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('£12.50 per ticket')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('200 tickets')).toBeVisible();

    // Verify booking form shows correct pricing for film
    await expect(page.getByText('Total: £12.50')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).toBeVisible();

    // Verify form structure is identical to concert modal
    await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Full Name:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email:' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Complete Purchase' })).toBeVisible();
  });

  test('Comedy Event Modal Display', async ({ page }) => {
    // Click on the 'Stand-Up Spectacular' comedy event card
    await page.getByRole('heading', { name: 'Stand-Up Spectacular', level: 3 }).click();

    // Verify event detail modal opens with correct comedy information
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular', level: 2 })).toBeVisible();
    await expect(page.locator('#eventDetails .event-artist', { hasText: 'Sarah Johnson' })).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('The Comedy Store, Manchester')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('Wed, Mar 25, 2026')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('21:00')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('£28.00 per ticket')).toBeVisible();
    await expect(page.locator('#eventDetails').getByText('74 tickets')).toBeVisible();

    // Verify booking form shows correct pricing for comedy
    await expect(page.getByText('Total: £28.00')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).toBeVisible();

    // Verify all form fields are functional
    await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Full Name:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email:' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Complete Purchase' })).toBeVisible();
  });

  test('Modal Close Functionality', async ({ page }) => {
    // Open any event modal
    await page.getByText('concert Rock Legends Live The').click();
    
    // Verify modal is open
    await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).toBeVisible();
    
    // Click the close button (×)
    await page.locator('#eventModal').getByText('×').click();

    // Verify modal closes completely and user returns to main page
    await expect(page.getByRole('heading', { name: 'Browse Events' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Purchase Tickets' })).not.toBeVisible();

    // Verify no modal content remains visible
    await expect(page.locator('#eventModal')).not.toBeVisible();
  });
});