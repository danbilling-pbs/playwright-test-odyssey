// spec: test-plans/ticketyboo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Event Browsing and Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('Concert Filter Functionality', async ({ page }) => {
    // Click on the 'Concerts' filter button
    await page.getByRole('button', { name: 'Concerts' }).click();

    // Verify only concert events are displayed
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jazz Night' })).toBeVisible();
    
    // Verify film and comedy events are hidden
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Marathon' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Improv Night' })).not.toBeVisible();

    // Verify concert event details
    await expect(page.getByText('£65.00')).toBeVisible();
    await expect(page.getByText('O2 Arena, London')).toBeVisible();
    await expect(page.getByText('£42.00')).toBeVisible();
    await expect(page.getByText('Jam Café, Nottingham')).toBeVisible();
  });

  test('Film Filter Functionality', async ({ page }) => {
    // Click on the 'Films' filter button
    await page.getByRole('button', { name: 'Films' }).click();

    // Verify only film events are displayed
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Marathon' })).toBeVisible();
    
    // Verify concert and comedy events are hidden
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jazz Night' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Improv Night' })).not.toBeVisible();

    // Verify film event details
    await expect(page.getByText('£12.50')).toBeVisible();
    await expect(page.getByText('Broadway Cinema, Nottingham')).toBeVisible();
    await expect(page.getByText('£16.50')).toBeVisible();
    await expect(page.getByText('Showcase Cinema, Bristol')).toBeVisible();
  });

  test('Comedy Filter Functionality', async ({ page }) => {
    // Click on the 'Comedy' filter button
    await page.getByRole('button', { name: 'Comedy' }).click();

    // Verify only comedy events are displayed
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Improv Night' })).toBeVisible();
    
    // Verify concert and film events are hidden
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jazz Night' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Marathon' })).not.toBeVisible();

    // Verify comedy event details
    await expect(page.getByText('£28.00')).toBeVisible();
    await expect(page.getByText('The Comedy Store, Manchester')).toBeVisible();
    await expect(page.getByText('£20.00')).toBeVisible();
    await expect(page.getByText('Komedia, Bath')).toBeVisible();
  });

  test('All Events Filter Reset', async ({ page }) => {
    // Apply a filter first (e.g., Concerts)
    await page.getByRole('button', { name: 'Concerts' }).click();
    
    // Verify filter is applied (only concerts visible)
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).not.toBeVisible();

    // Click 'All Events' to reset filter
    await page.getByRole('button', { name: 'All Events' }).click();

    // Verify all 6 events are displayed again
    await expect(page.getByRole('heading', { name: 'Rock Legends Live' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Cinema Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stand-Up Spectacular' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Jazz Night' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sci-Fi Marathon' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Improv Night' })).toBeVisible();
  });
});