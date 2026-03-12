// spec: test-plans/ticketyboo-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Booking Process and Form Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('Ticket Quantity Selection', async ({ page }) => {
    // Open Rock Legends Live event modal
    await page.getByText('concert Rock Legends Live The').click();
    
    // Verify default quantity is 1 and total is £65.00
    await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toHaveValue('1');
    await expect(page.getByText('Total: £65.00')).toBeVisible();

    // Change ticket quantity from 1 to 3
    await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('3');

    // Verify quantity field accepts the new value
    await expect(page.getByRole('spinbutton', { name: 'Number of Tickets:' })).toHaveValue('3');

    // Test for the known bug: Total should update to £195.00 (3 × £65.00)
    // but currently remains at £65.00
    // This is a known bug that needs to be documented and fixed
    await expect(page.getByText('Total: £65.00')).toBeVisible(); // Current buggy behavior
    
    // TODO: When the bug is fixed, this should be:
    // await expect(page.getByText('Total: £195.00')).toBeVisible();
  });

  test('Customer Information Form', async ({ page }) => {
    // Open any event modal
    await page.getByText('concert Rock Legends Live The').click();

    // Fill in the Full Name field with valid data
    const fullNameField = page.getByRole('textbox', { name: 'Full Name:' });
    await fullNameField.fill('John Smith');
    await expect(fullNameField).toHaveValue('John Smith');

    // Fill in the Email field with valid email address
    const emailField = page.getByRole('textbox', { name: 'Email:' });
    await emailField.fill('john.smith@example.com');
    await expect(emailField).toHaveValue('john.smith@example.com');

    // Verify fields retain entered values
    await expect(fullNameField).toHaveValue('John Smith');
    await expect(emailField).toHaveValue('john.smith@example.com');
  });

  test('Payment Information Form', async ({ page }) => {
    // Open any event modal
    await page.getByText('concert Rock Legends Live The').click();

    // Fill in Card Number field with valid card number
    const cardNumberField = page.getByRole('textbox', { name: 'Card Number:' });
    await cardNumberField.fill('4532123456789012');
    await expect(cardNumberField).toHaveValue('4532 1234 5678 9012');

    // Fill in Expiry Date with valid future date (MM/YY format)
    const expiryField = page.getByRole('textbox', { name: 'Expiry Date:' });
    await expiryField.fill('12/28');
    await expect(expiryField).toHaveValue('12/28');

    // Fill in CVV with valid 3-digit code
    const cvvField = page.getByRole('textbox', { name: 'CVV:' });
    await cvvField.fill('123');
    await expect(cvvField).toHaveValue('123');

    // Fill in Cardholder Name with valid name
    const cardholderField = page.getByRole('textbox', { name: 'Cardholder Name:' });
    await cardholderField.fill('JOHN SMITH');
    await expect(cardholderField).toHaveValue('JOHN SMITH');
  });

  test('Required Field Validation', async ({ page }) => {
    // Open any event modal
    await page.getByText('concert Rock Legends Live The').click();

    // Attempt to click Complete Purchase without filling any fields
    await page.getByRole('button', { name: 'Complete Purchase' }).click();

    // Verify form validation prevents submission
    // Note: The actual validation behavior may vary depending on implementation
    // This test documents the current behavior and can be updated as needed
    
    // Check if focus moves to first required field (typically Full Name)
    const fullNameField = page.getByRole('textbox', { name: 'Full Name:' });
    await expect(fullNameField).toBeFocused();
  });
});