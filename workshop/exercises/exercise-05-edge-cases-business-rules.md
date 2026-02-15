# Exercise 5: Edge Cases & Business Rules

**Time:** 20 minutes  
**Objective:** Test boundary conditions and business logic

## What You Will Learn
- How to identify business rules
- How to test boundary conditions  
- How to test inventory management

## Business Rule Discovery
From our exploration, we discovered:
- **Maximum purchase:** 60 tickets per transaction
- **Inventory tracking:** Tickets decrease after purchase
- **Price calculation:** Total = quantity × price

## Instructions

### Step 1: Test Ticket Quantity Limits (10 minutes)
Create: `tests/business-rules.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test('Test maximum ticket purchase limit', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Open any event with enough tickets
  await page.getByText('Classic Cinema Night').click();
  
  // Try to buy exactly 60 tickets
  await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('60');
  
  // Check the total price updates correctly
  await expect(page.getByText('Total: £750.00')).toBeVisible(); // 60 × £12.50
  
  // Try to buy more than 60 tickets
  await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('61');
  
  // What happens? Document your findings
});
```

### Step 2: Test Inventory Management (10 minutes)
```javascript
test('Test inventory decreases after purchase', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Find an event and note initial ticket count
  const eventCard = page.getByText('Jazz Night');
  const initialTickets = await eventCard.getByText('tickets available').textContent();
  
  // Open the event and make a small purchase
  await eventCard.click();
  
  // Buy 2 tickets
  await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('2');
  
  // Fill in required information
  await page.getByRole('textbox', { name: 'Full Name:' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Email:' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Card Number:' }).fill('1234 5678 9012 3456');
  await page.getByRole('textbox', { name: 'CVV:' }).fill('123');
  await page.getByRole('textbox', { name: 'Cardholder Name:' }).fill('TEST USER');
  
  // Complete the purchase
  await page.getByRole('button', { name: 'Complete Purchase' }).click();
  
  // Check purchase was successful
  await expect(page.getByText('Purchase Successful!')).toBeVisible();
  
  // Close confirmation
  await page.getByRole('button', { name: 'Close' }).click();
  
  // Check if ticket count decreased by 2
  // Add your verification here
});
```

## Investigation Tasks
Research these scenarios:

1. **Boundary Testing**
   - What happens with 0 tickets?
   - What happens with exactly 60 tickets?
   - What happens with 61 tickets?

2. **Price Calculation**
   - Does 1 ticket show correct price?
   - Does 5 tickets calculate correctly?
   - Does 60 tickets calculate correctly?

3. **Inventory Edge Cases**
   - What happens when trying to buy the last ticket?
   - What happens to sold-out events?

## Expected Outcomes
- You can test business rules systematically
- You understand boundary value testing
- You can verify calculations and inventory changes

## Real-World Applications
- E-commerce quantity limits
- Banking transaction limits
- Booking system capacity management