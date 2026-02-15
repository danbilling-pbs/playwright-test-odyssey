# Exercise 7: Data-Driven Testing

**Time:** 20 minutes  
**Objective:** Run the same test with different data sets

## What You Will Learn
- How to test multiple scenarios efficiently
- How to use test data files
- How to create parameterised tests

## The Scenario
You want to test booking tickets for different event types with various customer data.

## Instructions

### Step 1: Create Test Data (5 minutes)
Create: `data/customers.json`

```json
[
  {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "cardNumber": "1234 5678 9012 3456",
    "cvv": "123",
    "cardholder": "JOHN SMITH",
    "quantity": 1
  },
  {
    "name": "Sarah Jones",
    "email": "sarah.jones@example.com", 
    "cardNumber": "9876 5432 1098 7654",
    "cvv": "456",
    "cardholder": "SARAH JONES",
    "quantity": 3
  },
  {
    "name": "Mike Brown",
    "email": "mike.brown@example.com",
    "cardNumber": "5555 4444 3333 2222",
    "cvv": "789",
    "cardholder": "MIKE BROWN",
    "quantity": 5
  }
]
```

### Step 2: Create Data-Driven Test (15 minutes)
Create: `tests/data-driven.spec.js`

```javascript
const { test, expect } = require('@playwright/test');
const customers = require('../data/customers.json');

// Test each customer data set
for (const customer of customers) {
  test(`Book tickets for ${customer.name}`, async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Open any available event
    await page.getByText('Classic Cinema Night').click();
    
    // Use the customer data
    await page.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill(customer.quantity.toString());
    await page.getByRole('textbox', { name: 'Full Name:' }).fill(customer.name);
    await page.getByRole('textbox', { name: 'Email:' }).fill(customer.email);
    await page.getByRole('textbox', { name: 'Card Number:' }).fill(customer.cardNumber);
    await page.getByRole('textbox', { name: 'CVV:' }).fill(customer.cvv);
    await page.getByRole('textbox', { name: 'Cardholder Name:' }).fill(customer.cardholder);
    
    // Complete purchase
    await page.getByRole('button', { name: 'Complete Purchase' }).click();
    
    // Verify success with correct customer name
    await expect(page.getByText('Purchase Successful!')).toBeVisible();
    await expect(page.getByText(`Name: ${customer.name}`)).toBeVisible();
    await expect(page.getByText(`Tickets: ${customer.quantity}`)).toBeVisible();
    
    // Close confirmation
    await page.getByRole('button', { name: 'Close' }).click();
  });
}
```

### Alternative: Parameterised Tests
For more control, use Playwright's test.describe.parallel:

```javascript
test.describe('Booking with different customers', () => {
  for (const customer of customers) {
    test(`${customer.name} books ${customer.quantity} tickets`, async ({ page }) => {
      // Same test logic as above
    });
  }
});
```

## Benefits of Data-Driven Testing
- **Efficiency:** Test multiple scenarios quickly
- **Coverage:** Ensure various data combinations work
- **Maintenance:** Update test data without changing test code

## Real-World Applications
- Testing different user roles
- Testing various input combinations  
- Testing across different environments
- Regression testing with historical data

## Expected Outcomes
- You understand parameterised testing
- You can separate test data from test logic
- You can run comprehensive data scenarios

## Extension Activities
1. Create invalid customer data and test error handling
2. Test different events with the same customer data
3. Add more customer fields (phone number, address)
4. Create test data for edge cases (very long names, special characters)