# Exercise 3: Your First Playwright Test

**Time:** 20 minutes  
**Objective:** Write and run your first automated test using Playwright

## What You Will Learn
- How to write a basic Playwright test
- How to run tests and see results
- How to use browser inspection tools

## Prerequisites
- Playwright should be installed and configured
- The Ticketyboo application should be running on localhost:3000

## Instructions

### Step 1: Create Your First Test File (5 minutes)
1. Create a new file: `tests/my-first-test.spec.js`
2. Copy this basic structure:

```javascript
const { test, expect } = require('@playwright/test');

test('Basic page load test', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000');
  
  // Check the page title
  await expect(page).toHaveTitle('Ticketyboo - Event Tickets');
  
  // Check the main heading exists
  await expect(page.getByRole('heading', { name: '🎫 Ticketyboo' })).toBeVisible();
});
```

### Step 2: Run Your Test (5 minutes)
1. Open your terminal/command prompt
2. Run: `npx playwright test my-first-test.spec.js`
3. Observe the results

**If the test passes:** ✅ Great! You've written your first test.
**If the test fails:** 📋 Don't worry - debugging is part of testing!

### Step 3: Add More Checks (10 minutes)
Add these checks to your test:

```javascript
test('Check event filtering works', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Click the Concerts filter
  await page.getByRole('button', { name: 'Concerts' }).click();
  
  // Check that the Concerts button is active
  await expect(page.getByRole('button', { name: 'Concerts' })).toHaveClass(/active/);
  
  // Check that concert events are visible
  await expect(page.getByText('Rock Legends Live')).toBeVisible();
});
```

## Common Issues and Solutions

**Problem:** Test fails with "page.getByRole is not a function"
**Solution:** Check your Playwright version is recent

**Problem:** Test fails to find elements
**Solution:** Use `npx playwright codegen localhost:3000` to generate selectors

**Problem:** Application not loading
**Solution:** Check localhost:3000 is running in another terminal

## Expected Outcomes
- You have a working Playwright test
- You understand basic Playwright syntax
- You can run tests and interpret results

## Extension Activity
If you finish early, try:
- Adding a test for the Films filter
- Testing that event cards show price information
- Writing a test that opens and closes an event modal