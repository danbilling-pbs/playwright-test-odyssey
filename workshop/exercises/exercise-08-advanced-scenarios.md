# Exercise 8: Advanced Scenarios

**Time:** 25 minutes  
**Objective:** Handle complex user workflows and advanced testing concepts

## What You Will Learn
- How to test multi-step workflows
- How to handle dynamic content
- How to test complex business scenarios

## Instructions

### Step 1: Complete User Journey Test (15 minutes)
Create: `tests/user-journey.spec.js`

This test simulates a complete user experience:

```javascript
const { test, expect } = require('@playwright/test');

test('Complete user journey: Browse → Filter → Compare → Book', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Step 1: Browse all events
  const initialEventCount = await page.locator('[role="main"] > div > div').count();
  console.log(`Found ${initialEventCount} events initially`);
  
  // Step 2: Filter by interests  
  await page.getByRole('button', { name: 'Concerts' }).click();
  const concertCount = await page.locator('[role="main"] > div > div').count();
  console.log(`Found ${concertCount} concerts`);
  
  // Step 3: Compare prices by reading all concert events
  const concertPrices = await page.locator('[role="main"] > div > div').all();
  let cheapestEvent = null;
  let lowestPrice = Infinity;
  
  for (const event of concertPrices) {
    const priceText = await event.locator('text=/£\\d+\\.\\d+/').textContent();
    const price = parseFloat(priceText.replace('£', ''));
    
    if (price < lowestPrice) {
      lowestPrice = price;
      cheapestEvent = event;
    }
  }
  
  console.log(`Cheapest concert costs £${lowestPrice}`);
  
  // Step 4: Book the cheapest concert
  await cheapestEvent.click();
  
  // Step 5: Complete booking
  await page.getByRole('textbox', { name: 'Full Name:' }).fill('Budget Conscious User');
  await page.getByRole('textbox', { name: 'Email:' }).fill('budget@example.com');
  await page.getByRole('textbox', { name: 'Card Number:' }).fill('1234 5678 9012 3456');
  await page.getByRole('textbox', { name: 'CVV:' }).fill('123');
  await page.getByRole('textbox', { name: 'Cardholder Name:' }).fill('BUDGET USER');
  
  await page.getByRole('button', { name: 'Complete Purchase' }).click();
  
  // Step 6: Verify purchase
  await expect(page.getByText('Purchase Successful!')).toBeVisible();
  await expect(page.getByText(`Total Paid: £${lowestPrice.toFixed(2)}`)).toBeVisible();
});
```

### Step 2: Test Concurrent User Scenarios (10 minutes)
Simulate multiple users affecting inventory:

```javascript
test('Multiple users buying tickets simultaneously', async ({ browser }) => {
  // Create two browser contexts (like two different users)
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  
  const user1 = await context1.newPage();
  const user2 = await context2.newPage();
  
  // Both users navigate to the same event
  await user1.goto('http://localhost:3000');
  await user2.goto('http://localhost:3000');
  
  await user1.getByText('Stand-Up Spectacular').click();
  await user2.getByText('Stand-Up Spectacular').click();
  
  // User 1 starts booking process
  await user1.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('5');
  await user1.getByRole('textbox', { name: 'Full Name:' }).fill('User One');
  await user1.getByRole('textbox', { name: 'Email:' }).fill('user1@example.com');
  
  // User 2 also starts booking
  await user2.getByRole('spinbutton', { name: 'Number of Tickets:' }).fill('3');
  await user2.getByRole('textbox', { name: 'Full Name:' }).fill('User Two');
  await user2.getByRole('textbox', { name: 'Email:' }).fill('user2@example.com');
  
  // Complete payment info for both
  const cardInfo = {
    cardNumber: '1234 5678 9012 3456',
    cvv: '123',
    cardholder: 'TEST USER'
  };
  
  // User 1 completes first
  await user1.getByRole('textbox', { name: 'Card Number:' }).fill(cardInfo.cardNumber);
  await user1.getByRole('textbox', { name: 'CVV:' }).fill(cardInfo.cvv);
  await user1.getByRole('textbox', { name: 'Cardholder Name:' }).fill(cardInfo.cardholder);
  
  await user1.getByRole('button', { name: 'Complete Purchase' }).click();
  
  // Verify first purchase
  await expect(user1.getByText('Purchase Successful!')).toBeVisible();
  
  // User 2 tries to complete
  await user2.getByRole('textbox', { name: 'Card Number:' }).fill(cardInfo.cardNumber);
  await user2.getByRole('textbox', { name: 'CVV:' }).fill(cardInfo.cvv);
  await user2.getByRole('textbox', { name: 'Cardholder Name:' }).fill(cardInfo.cardholder);
  
  await user2.getByRole('button', { name: 'Complete Purchase' }).click();
  
  // What happens? Document the behavior
  // Both purchases successful? Error handling? Inventory correctly managed?
  
  await context1.close();
  await context2.close();
});
```

## Advanced Testing Concepts Covered
- **User Journey Testing:** End-to-end workflows
- **Dynamic Content:** Handling changing data
- **Concurrent Users:** Simulating real-world usage
- **Business Logic:** Complex scenario validation

## Expected Outcomes
- You can test complete user workflows  
- You understand how to handle dynamic content
- You can simulate complex, real-world scenarios

## Real-World Applications
- E-commerce checkout processes
- Booking systems under load
- Multi-user collaboration tools
- Financial transaction systems

## Discussion Points
- How would you test this application under heavy load?
- What other user journeys should be tested?
- How would you test the application across different devices?
- What monitoring would you add for production?