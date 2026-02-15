# Exercise 4: Form Validation Testing

**Time:** 15 minutes  
**Objective:** Test form validation and error handling

## What You Will Learn
- How to test form validation
- How to handle error messages
- How to test negative scenarios

## Instructions

### Step 1: Test Empty Form Submission (8 minutes)
Create a test file: `tests/form-validation.spec.js`

```javascript
const { test, expect } = require('@playwright/test');

test('Test booking form validation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Open the first event
  await page.getByText('Rock Legends Live').click();
  
  // Try to submit without filling anything
  await page.getByRole('button', { name: 'Complete Purchase' }).click();
  
  // What happens? Check if form submits or shows errors
  // Add your checks here based on what you observe
});
```

### Step 2: Test Invalid Email (7 minutes)
Add this test:

```javascript
test('Test invalid email validation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Open an event
  await page.getByText('Rock Legends Live').click();
  
  // Fill in name
  await page.getByRole('textbox', { name: 'Full Name:' }).fill('Test User');
  
  // Enter invalid email
  await page.getByRole('textbox', { name: 'Email:' }).fill('invalid-email');
  
  // Try to submit
  await page.getByRole('button', { name: 'Complete Purchase' }).click();
  
  // Check what happens - does it prevent submission?
  // Add your assertions here
});
```

## Questions to Investigate
1. What happens when you submit an empty form?
2. Does the system validate email format?
3. Can you submit without payment information?
4. What error messages (if any) are shown?

## Expected Behaviour vs Actual Behaviour
Document what you find:
- **Expected:** Form should show error messages for missing fields
- **Actual:** [Write what actually happens]

## Expected Outcomes
- You understand how to test form validation
- You can identify gaps between expected and actual behaviour
- You know how to test negative scenarios

## Discussion Points
- Should the application prevent invalid submissions?
- What would make error messages more user-friendly?
- How would you test this manually vs automated?