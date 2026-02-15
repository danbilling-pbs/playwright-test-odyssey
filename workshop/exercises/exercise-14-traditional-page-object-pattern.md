# Exercise 6: Page Object Pattern

**Time:** 25 minutes  
**Objective:** Learn to organise test code using the Page Object Pattern

## What You Will Learn

- How to reduce code duplication
- How to make tests more maintainable
- How to create reusable test components

## The Problem

Without organisation, tests become difficult to maintain:

- Repeated code for common actions
- Hard to update when UI changes
- Difficult to read and understand

## The Solution: Page Objects

Page Objects represent parts of your application as code objects.

## Instructions

### Step 1: Create a Page Object (15 minutes)

Create: `pages/TicketybooPage.js`

```javascript
class TicketybooPage {
  constructor(page) {
    this.page = page;
    
    // Define selectors
    this.concertFilter = page.getByRole('button', { name: 'Concerts' });
    this.filmFilter = page.getByRole('button', { name: 'Films' });
    this.comedyFilter = page.getByRole('button', { name: 'Comedy' });
    this.allEventsFilter = page.getByRole('button', { name: 'All Events' });
  }

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

  async filterBy(category) {
    switch(category.toLowerCase()) {
      case 'concerts':
        await this.concertFilter.click();
        break;
      case 'films':
        await this.filmFilter.click();
        break;
      case 'comedy':
        await this.comedyFilter.click();
        break;
      default:
        await this.allEventsFilter.click();
    }
  }

  async openEvent(eventName) {
    await this.page.getByText(eventName).click();
  }

  async getEventCount() {
    return await this.page.locator('[role="main"] > div > div').count();
  }
}

module.exports = TicketybooPage;
```

### Step 2: Create a Booking Page Object (10 minutes)

Create: `pages/BookingModal.js`

```javascript
class BookingModal {
  constructor(page) {
    this.page = page;
    
    this.quantityInput = page.getByRole('spinbutton', { name: 'Number of Tickets:' });
    this.nameInput = page.getByRole('textbox', { name: 'Full Name:' });
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.cardNumberInput = page.getByRole('textbox', { name: 'Card Number:' });
    this.cvvInput = page.getByRole('textbox', { name: 'CVV:' });
    this.cardholderInput = page.getByRole('textbox', { name: 'Cardholder Name:' });
    this.purchaseButton = page.getByRole('button', { name: 'Complete Purchase' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  async fillBookingForm(customerData) {
    await this.nameInput.fill(customerData.name);
    await this.emailInput.fill(customerData.email);
    await this.cardNumberInput.fill(customerData.cardNumber);
    await this.cvvInput.fill(customerData.cvv);
    await this.cardholderInput.fill(customerData.cardholder);
  }

  async selectQuantity(quantity) {
    await this.quantityInput.fill(quantity.toString());
  }

  async completePurchase() {
    await this.purchaseButton.click();
  }

  async closeConfirmation() {
    await this.closeButton.click();
  }
}

module.exports = BookingModal;
```

### Step 3: Use Page Objects in Tests

Create: `tests/page-object-example.spec.js`

```javascript
const { test, expect } = require('@playwright/test');
const TicketybooPage = require('../pages/TicketybooPage');
const BookingModal = require('../pages/BookingModal');

test('Book tickets using page objects', async ({ page }) => {
  const ticketyboo = new TicketybooPage(page);
  const booking = new BookingModal(page);
  
  // Navigate to the site
  await ticketyboo.goto();
  
  // Filter to show only concerts
  await ticketyboo.filterBy('concerts');
  
  // Open a specific event
  await ticketyboo.openEvent('Rock Legends Live');
  
  // Fill in booking details
  await booking.selectQuantity(2);
  await booking.fillBookingForm({
    name: 'Jane Smith',
    email: 'jane@example.com',
    cardNumber: '1234 5678 9012 3456',
    cvv: '123',
    cardholder: 'JANE SMITH'
  });
  
  // Complete the purchase
  await booking.completePurchase();
  
  // Verify success
  await expect(page.getByText('Purchase Successful!')).toBeVisible();
  
  // Close confirmation
  await booking.closeConfirmation();
});
```

## Benefits of Page Objects

- **Reusable:** Use the same booking form code in multiple tests
- **Maintainable:** Change selectors in one place
- **Readable:** Tests read like user stories

## Expected Outcomes

- You understand the Page Object Pattern
- You can create reusable test components
- Your tests are more organised and maintainable

## Extension Activity

Create page objects for:

- Event filtering functionality
- Purchase confirmation handling
- Error message management
